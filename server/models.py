from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    name: str
    email: str


class BlogCreate(BaseModel):
    title: str
    content: str
    tags: List[str] = []


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None


class BlogResponse(BaseModel):
    id: str
    title: str
    content: str
    excerpt: str
    author: str
    author_id: str
    tags: List[str]
    created_at: datetime
    updated_at: datetime

