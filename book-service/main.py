from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Book, Base

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Book request schema
class BookCreate(BaseModel):
    title: str
    category: str
    author: str
    price: int

# Home route
@app.get("/")
def home():
    return {
        "message": "Book Service Running"
    }

# Get all books
@app.get("/books")
def get_books():

    db: Session = SessionLocal()

    books = db.query(Book).all()

    return books

# Add new book
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