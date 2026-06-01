from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
from models import User
from passlib.context import CryptContext
from jose import jwt

SECRET_KEY = "mysecretkey"

app = FastAPI()

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterSchema(BaseModel):
    name: str
    email: str
    password: str
    role: str

class LoginSchema(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {"message": "Auth Service Running"}

@app.post("/register")
def register(user: RegisterSchema):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }

@app.post("/login")
def login(user: LoginSchema):

    db: Session = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User Not Found"
        )

    valid = pwd_context.verify(
        user.password,
        db_user.password
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = jwt.encode(
        {
            "email": db_user.email,
            "role": db_user.role
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "message": "Login Successful",
        "token": token,
        "role": db_user.role
    }