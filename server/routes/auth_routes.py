from fastapi import APIRouter, HTTPException, status
from database import users_collection
from models import UserCreate, UserLogin, UserResponse
from auth import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/signup")
async def signup(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed = hash_password(user.password)
    result = await users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed,
    })

    token = create_access_token({"user_id": str(result.inserted_id), "email": user.email, "name": user.name})

    return {
        "message": "User created successfully",
        "token": token,
        "user": {"id": str(result.inserted_id), "name": user.name, "email": user.email}
    }


@router.post("/login")
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "email": db_user["email"],
        "name": db_user["name"]
    })

    return {
        "message": "Login successful",
        "token": token,
        "user": {"id": str(db_user["_id"]), "name": db_user["name"], "email": db_user["email"]}
    }

