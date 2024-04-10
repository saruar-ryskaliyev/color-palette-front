# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import models
import schemas
from database import engine, SessionLocal
from schemas import UserCreate
from models import User
import auth
from routers import auth_router, colors, palettes
from starlette.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to access the server
    allow_credentials=True,  # Allows cookies to be sent and received
    allow_methods=["*"],  # Allows all methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)


app.include_router(auth_router.router)
app.include_router(colors.router)
app.include_router(palettes.router)








