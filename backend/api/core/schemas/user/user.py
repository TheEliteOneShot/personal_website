from typing import Optional
from pydantic import BaseModel, EmailStr, Field

class UserSchema(BaseModel):
    id: Optional[int] = Field(
        title="ID",
        description="The ID for the user"
    )
    username: str = Field(
        title="",
        description="",
    )
    firstname: Optional[str] = Field(
        title="",
        description="",
    )
    hashed_password: Optional[str] = Field(
        title="",
        description="",
    )
    lastname: Optional[str] = Field(
        title="",
        description="",
    )
    role: Optional[str] = Field(
        title="",
        description="",
    )
    email: Optional[EmailStr] = Field(
        title="",
        description="",
    )
    disabled: Optional[bool] = Field(
        title="",
        description="",
    )
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "1",
                "username": "User1234",
                "password": "passwordOverTLS",
                "firstname": "John",
                "lastname": "Doe",
                "email": "test@myemail.com",
                "disabled": "False"
            }
        }

class CreateUserSchema(BaseModel):
    username: str = Field(
        title="",
        description="",
    )
    firstname: Optional[str] = Field(
        title="",
        description="",
    )
    password: Optional[str] = Field(
        title="",
        description="",
    )
    lastname: Optional[str] = Field(
        title="",
        description="",
    )
    email: Optional[EmailStr] = Field(
        title="",
        description="",
    )
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "username": "User1234",
                "password": "passwordOverTLS",
                "firstname": "John",
                "lastname": "Doe",
                "email": "test@myemail.com",
            }
        }

class UserResponse(BaseModel):
    id: Optional[int] = Field(
        title="ID",
        description="The ID for the user"
    )
    username: str = Field(
        title="",
        description="",
    )
    firstname: Optional[str] = Field(
        title="",
        description="",
    )
    lastname: Optional[str] = Field(
        title="",
        description="",
    )
    email: Optional[EmailStr] = Field(
        title="",
        description="",
    )
    role: Optional[str] = Field(
        title="",
        description="",
    )
    disabled: Optional[bool] = Field(
        title="",
        description="",
    )
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "1",
                "username": "User1234",
                "firstname": "John",
                "lastname": "Doe",
                "role": "User",
                "email": "test@myemail.com",
                "disabled": "False"
            }
        }