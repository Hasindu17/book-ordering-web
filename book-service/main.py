from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal, engine

from models import (
    Base,
    User,
    Book
)

from schemas import (
    UserCreate,
    UserLogin,
    BookCreate
)

from auth import (
    hash_password,
    verify_password,
    create_access_token
)

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "Book Service Running"
    }


# -----------------------------
# User Registration
# -----------------------------
@app.post("/register")
def register(user: UserCreate):

    db: Session = SessionLocal()

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        return {
            "message": "Username already exists"
        }

    new_user = User(
        username=user.username,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }


# -----------------------------
# User Login
# -----------------------------
@app.post("/login")
def login(user: UserLogin):

    db: Session = SessionLocal()

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:
        return {
            "message": "Invalid Username or Password"
        }

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "message": "Invalid Username or Password"
        }

    token = create_access_token(
        {"sub": db_user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# -----------------------------
# Get All Books
# -----------------------------
@app.get("/books")
def get_books():

    db: Session = SessionLocal()

    books = db.query(Book).all()

    return books


# -----------------------------
# Add New Book
# -----------------------------
@app.post("/books")
def create_book(book: BookCreate):

    db: Session = SessionLocal()

    new_book = Book(
        title=book.title,
        category=book.category,
        author=book.author,
        price=book.price
    )

    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return {
        "message": "Book Added Successfully",
        "book": {
            "id": new_book.id,
            "title": new_book.title,
            "category": new_book.category,
            "author": new_book.author,
            "price": new_book.price
        }
    }

@app.post("/register")
def register(user: UserCreate):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        return {
            "message": "Email already exists"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User registered successfully"
    }
    
@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        return {
            "message": "Invalid email"
        }

    if not verify_password(
        user.password,
        db_user.password
    ):

        return {
            "message": "Invalid password"
        }

    token = create_access_token({

        "sub": db_user.email,
        "role": db_user.role

    })

    return {

        "access_token": token,
        "token_type": "bearer",
        "role": db_user.role
    }
    
