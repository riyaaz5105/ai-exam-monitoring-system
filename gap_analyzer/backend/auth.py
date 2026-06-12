from fastapi import APIRouter, HTTPException
from database import users_collection
from model import RegisterUser, LoginUser

import jwt
import os
import bcrypt

router = APIRouter()

@router.post("/register")
def register(user: RegisterUser):

    existing = users_collection.find_one(
        {"email": user.email}
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password
    })

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(user: LoginUser):
    # print(user)
    db_user = users_collection.find_one(
        {"email": user.email}
    )
    # print(db_user)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    valid = bcrypt.checkpw(
        user.password.encode("utf-8"),
        db_user["password"]
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )

    # print("JWT_SECRET =", os.getenv("JWT_SECRET"))

    token = jwt.encode(
        {"email": db_user["email"]},
        os.getenv("JWT_SECRET"),
        algorithm="HS256"
    )

    return {
        "token": token,
        "name": db_user["name"],
        "email": db_user["email"]
    }