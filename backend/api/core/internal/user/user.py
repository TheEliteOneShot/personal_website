import re

import core.internal.auth as auth
from core.internal.exceptions import BadRequestHTTPException
from core.models.user import UserModel
from core.models.auth import RefreshToken
from core.schemas.user import CreateUserSchema, LoginUserSchema
from fastapi import HTTPException, status


async def get_user_by_username(db_session, username: str):
    return await UserModel.find_by_username(db_session, username)


async def get_user_by_email(db_session, email: str):
    return await UserModel.find_by_email(db_session, email)


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


async def login_user(db_session, user: LoginUserSchema):
    foundUser = None
    if re.fullmatch(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', user.credential):
        foundUser = await get_user_by_email(db_session, user.credential)
    else:
        foundUser = await get_user_by_username(db_session, user.credential)
    if foundUser is not None:
        if await auth.verify_password(user.password, foundUser.password):
            return True
    raise BadRequestHTTPException(
        detail="INVALID_CREDENTIALS"
    )

async def logout_user(db_session, username: str):
    await RefreshToken.delete_by_username(db_session, username)



async def delete_user_by_username(db_session, username: str):
    return await UserModel.delete_by_username(db_session, username)
