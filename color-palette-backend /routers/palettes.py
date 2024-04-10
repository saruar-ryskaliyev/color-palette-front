from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from schemas import UserBase, UserCreate
from auth import decode_access_token
from typing import List
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = decode_access_token(db, token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return user

@router.post("/users/{user_id}/palettes", status_code=status.HTTP_201_CREATED)
async def create_palette(user_id: int, palette_key: str, colors: List[str], db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.palettes is None:
        user.palettes = {}  


    user.palettes[palette_key] = colors

    db.commit()
    return {"message": "Palette created", "palettes": user.palettes}

@router.delete("/users/{user_id}/palettes/{palette_key}")
async def delete_palette(user_id: int, palette_key: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if palette_key not in user.palettes:
        raise HTTPException(status_code=404, detail="Palette not found")

    del user.palettes[palette_key]
    db.commit()
    return {"message": "Palette deleted"}

@router.get("/users/{user_id}/palettes")
async def get_palettes(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.palettes
