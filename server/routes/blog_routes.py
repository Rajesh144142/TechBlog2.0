from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId
from datetime import datetime
from database import blogs_collection
from models import BlogCreate, BlogUpdate, BlogResponse
from auth import get_current_user
from typing import List

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


def blog_to_response(blog: dict) -> dict:
    return {
        "id": str(blog["_id"]),
        "title": blog["title"],
        "content": blog["content"],
        "excerpt": blog["content"][:100] + "..." if len(blog["content"]) > 100 else blog["content"],
        "author": blog["author"],
        "author_id": blog["author_id"],
        "tags": blog.get("tags", []),
        "created_at": blog["created_at"],
        "updated_at": blog["updated_at"],
    }


@router.get("")
async def get_all_blogs():
    blogs = await blogs_collection.find().sort("created_at", -1).to_list(100)
    return [blog_to_response(blog) for blog in blogs]


@router.get("/{blog_id}")
async def get_blog(blog_id: str):
    if not ObjectId.is_valid(blog_id):
        raise HTTPException(status_code=400, detail="Invalid blog ID")

    blog = await blogs_collection.find_one({"_id": ObjectId(blog_id)})
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")

    return blog_to_response(blog)


@router.post("")
async def create_blog(blog: BlogCreate, current_user: dict = Depends(get_current_user)):
    now = datetime.utcnow()
    result = await blogs_collection.insert_one({
        "title": blog.title,
        "content": blog.content,
        "tags": blog.tags,
        "author": current_user["name"],
        "author_id": current_user["user_id"],
        "created_at": now,
        "updated_at": now,
    })

    created = await blogs_collection.find_one({"_id": result.inserted_id})
    return blog_to_response(created)


@router.put("/{blog_id}")
async def update_blog(blog_id: str, blog: BlogUpdate, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(blog_id):
        raise HTTPException(status_code=400, detail="Invalid blog ID")

    existing = await blogs_collection.find_one({"_id": ObjectId(blog_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog not found")

    if existing["author_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to update this blog")

    update_data = {k: v for k, v in blog.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()

    await blogs_collection.update_one({"_id": ObjectId(blog_id)}, {"$set": update_data})

    updated = await blogs_collection.find_one({"_id": ObjectId(blog_id)})
    return blog_to_response(updated)


@router.delete("/{blog_id}")
async def delete_blog(blog_id: str, current_user: dict = Depends(get_current_user)):
    if not ObjectId.is_valid(blog_id):
        raise HTTPException(status_code=400, detail="Invalid blog ID")

    existing = await blogs_collection.find_one({"_id": ObjectId(blog_id)})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog not found")

    if existing["author_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="Not authorized to delete this blog")

    await blogs_collection.delete_one({"_id": ObjectId(blog_id)})
    return {"message": "Blog deleted successfully"}

