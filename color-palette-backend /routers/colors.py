from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserBase, UserCreate
from auth import decode_access_token



router = APIRouter()

@router.post("/users/{user_id}/colors", response_model=UserBase)
async def add_color(user_id: int, token: str, color: str, db: Session = Depends(get_db)):

    if not decode_access_token(db, token):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if not user.colors:
        user.colors = []  # Ensure it's a list before appending

    if color not in user.colors:
        print("Adding color")
        user.colors.append(color)
        db.commit()
        db.refresh(user)

    print(user.colors)

    return user


@router.delete("/users/{user_id}/colors/{color}", response_model=UserBase)
async def delete_color(user_id: int, token:str, color: str, db: Session = Depends(get_db)):

    if not decode_access_token(db, token):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if color in user.colors:
        user.colors.remove(color)
        db.commit()
        db.refresh(user)
    return user

@router.put("/users/{user_id}/colors/{old_color}/{new_color}", response_model=UserBase)
async def change_color(user_id: int, token: str, old_color: str, new_color: str, db: Session = Depends(get_db)):


    if not decode_access_token(db, token):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if old_color in user.colors:
        index = user.colors.index(old_color)
        user.colors[index] = new_color
        db.commit()
        db.refresh(user)
    return user


@router.get("/users/{user_id}/colors", response_model=UserBase)
async def get_colors(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user