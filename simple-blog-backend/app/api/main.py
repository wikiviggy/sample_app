from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, String, Text, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import List, Optional
from uuid import uuid4
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg2://postgres:postgres@db:5432/posts_db")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Post(Base):
    __tablename__ = "posts"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)

Base.metadata.create_all(engine)

class PostOut(BaseModel):
    id: str
    title: str
    content: str
    class Config:
        orm_mode = True

class PostCreate(BaseModel):
    title: str
    content: str

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/posts", response_model=List[PostOut])
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()

@app.get("/api/posts/{post_id}", response_model=PostOut)
def get_post(post_id: str, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@app.post("/api/posts", response_model=PostOut)
def create_post(data: PostCreate, db: Session = Depends(get_db)):
    post = Post(id=str(uuid4()), title=data.title, content=data.content)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

@app.put("/api/posts/{post_id}", response_model=PostOut)
def update_post(post_id: str, data: PostUpdate, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if data.title:
        post.title = data.title
    if data.content:
        post.content = data.content
    db.commit()
    db.refresh(post)
    return post

@app.delete("/api/posts/{post_id}")
def delete_post(post_id: str, db: Session = Depends(get_db)):
    post = db.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}
