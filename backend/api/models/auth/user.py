from pydantic import BaseModel, EmailStr
from typing import Optional

class User(BaseModel):
    username: Optional[str] = None

class UserInDB(User):
    username: str
    hashed_password: str
    full_name: str
    email: EmailStr
    disabled: bool