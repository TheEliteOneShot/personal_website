from fastapi import Depends, HTTPException, status, APIRouter
from core.config import get_settings
from core.api.deps import get_db
from core.api.deps import get_db, get_current_active_user
from core.internal.auth import create_access_token
from core.internal.user import create_user, delete_user_by_username, login_user
from core.schemas.auth import TokenSchema
from core.schemas.user import CreateUserSchema, UserResponse, UserSchema, LoginUserSchema
from core.api.deps import get_current_user

API_PREFIX = get_settings().USER_API_PREFIX

router = APIRouter(prefix=API_PREFIX)

@router.post("/login", status_code=status.HTTP_200_OK, response_model=TokenSchema)
async def login(payload: LoginUserSchema, db_session = Depends(get_db)):
    await login_user(db_session, payload)
    tokens = await create_access_token(db_session, data={"sub": payload.credential})
    return {"access_token": tokens["access_token"], "refresh_token": tokens["refresh_token"], "token_type": "bearer"}

@router.post("/create", status_code=status.HTTP_201_CREATED, response_model=TokenSchema)
async def create(payload: CreateUserSchema, db_session = Depends(get_db)):
    await create_user(db_session, payload)
    tokens = await create_access_token(db_session, data={"sub": payload.username})
    return {"access_token": tokens["access_token"], "refresh_token": tokens["refresh_token"], "token_type": "bearer"}

@router.delete("/username/{username}", status_code=status.HTTP_200_OK)
async def delete(username: str, db_session = Depends(get_db), user: UserSchema = Depends(get_current_user)):
    if str.lower(user.username) == str.lower(username) or str.lower(user.role) == "admin":
        result = await delete_user_by_username(db_session, username)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"You do not have the required permission to delete the username '{username}'",
        )
    if result:
        return f"The username has been successfully deleted: '{username}'" 
    else:
        return f"The username does not exist: '{username}'"

@router.get("/me/", response_model=UserResponse)
async def read_users_me(current_user: UserSchema = Depends(get_current_active_user)):
    return current_user

@router.get("/me/items/")
async def read_own_items(current_user: UserSchema = Depends(get_current_active_user)):
    return [{"owner": current_user.username, "description": "This came from the database behind an authenticated route."}]
