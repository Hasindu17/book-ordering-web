from pydantic import BaseModel

# USER REGISTER

class UserCreate(BaseModel):

    name: str
    email: str
    password: str
    role: str

# USER LOGIN

class UserLogin(BaseModel):

    email: str
    password: str

# BOOK CREATE

class BookCreate(BaseModel):

    title: str
    category: str
    author: str
    price: int