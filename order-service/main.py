from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Temporary order storage
orders = []

# Order request model
class Order(BaseModel):
    book_id: int
    quantity: int
    customer_name: str

# Home route
@app.get("/")
def home():
    return {"message": "Order Service Running"}

# Get all orders
@app.get("/orders")
def get_orders():
    return orders

# Create new order
@app.post("/orders")
def create_order(order: Order):

    new_order = {
        "id": len(orders) + 1,
        "book_id": order.book_id,
        "quantity": order.quantity,
        "customer_name": order.customer_name
    }

    orders.append(new_order)

    return {
        "message": "Order Created Successfully",
        "order": new_order
    }