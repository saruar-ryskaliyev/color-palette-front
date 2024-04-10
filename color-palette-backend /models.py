from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.mutable import MutableList, MutableDict
from sqlalchemy.types import JSON
import json
from database import Base
from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableList




class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    colors = Column(MutableList.as_mutable(JSON))
    palettes = Column(MutableDict.as_mutable(JSON))




class RevokedToken(Base):
    __tablename__ = "revoked_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True)