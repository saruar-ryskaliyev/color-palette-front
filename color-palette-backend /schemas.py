from pydantic import BaseModel, validator
from typing import List, Optional, Dict
import json


from typing import Any, Union
import json

class UserBase(BaseModel):
    username: str
    colors: Optional[List[str]] = []
    palettes: Optional[Dict[str, List[str]]] = {}


    @validator('colors', pre=True)
    def ensure_list_type(cls, v: Any):
        if isinstance(v, str):
            try:
                return json.loads(v)
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON format")
        elif isinstance(v, (list, type(None))):
            return v
        raise TypeError("Invalid type for JSON field")
    
    @validator('palettes', pre=True, each_item=False)
    def ensure_dict_type(cls, v: Any):
        if v is None:
            return {}  # Allows initializing with None to an empty dict
        if isinstance(v, str):  # Attempt to load from JSON string
            try:
                v = json.loads(v)
            except json.JSONDecodeError:
                raise ValueError("Invalid JSON format for 'palettes'")
        if not isinstance(v, dict):
            raise TypeError("Expected a dictionary for 'palettes'")
        for key, value in v.items():
            if not isinstance(value, list):
                raise ValueError(f"Expected a list for key '{key}', got {type(value).__name__}")
            if not all(isinstance(item, str) for item in value):
                raise ValueError(f"All items in list for key '{key}' must be strings")
        return v




class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        orm_mode = True



# Schema for the RevokedToken
class RevokedTokenBase(BaseModel):
    token: str

class RevokedTokenCreate(RevokedTokenBase):
    pass

class RevokedToken(RevokedTokenBase):
    id: int

    class Config:
        orm_mode = True



UserBase.update_forward_refs()