from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_router
from routes.blog_routes import router as blog_router

app = FastAPI(title="TechBlog API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(blog_router)


@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Server is running"}
