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
    lastname: Optional[str] = Field(
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
                "id": "The ID for the User",
                "username": "The Username for the User",
                "firstname": "The First Name for the User",
                "lastname": "The Last Name for the User",
                "email": "The Email for the User",
                "disabled": "Whether or not the User Account has been disabled"
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
    disabled: Optional[bool] = Field(
        title="",
        description="",
    )
    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": "The ID for the User",
                "username": "The Username for the User",
                "firstname": "The First Name for the User",
                "lastname": "The Last Name for the User",
                "email": "The Email for the User",
                "disabled": "Whether or not the User Account has been disabled"
            }
        }
