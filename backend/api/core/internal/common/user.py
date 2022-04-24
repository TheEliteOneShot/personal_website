from fastapi import HTTPException, status
from core.models.user import UserModel
from core.config import get_settings
import core.internal.auth as auth
from typing import Optional
from core.schemas.user import CreateUserSchema

async def get_user_by_username(db_session, username: str):
    return await UserModel.find_by_username(db_session, username)

async def create_user(db_session, new_user: CreateUserSchema):
    user = await get_user_by_username(db_session, new_user.username)
    if user is None:
        new_user.password = await auth.get_password_hash(new_user.password)
        await UserModel.create(db_session, **new_user.dict())
        return True
    else:
        raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, 
        detail="USERNAME_TAKEN"
        )

async def delete_user_by_username(db_session, username: str):
    return await UserModel.delete_by_username(db_session, username)