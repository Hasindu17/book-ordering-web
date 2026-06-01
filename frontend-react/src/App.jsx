import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Register from "./pages/Register"

function HomePage() {

  const [books, setBooks] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    author: "",
    price: ""
  })

  const fetchBooks = () => {

    fetch("http://localhost:8001/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const addBook = async (e) => {

    e.preventDefault()

    try {

      await fetch("http://localhost:8001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price)
        })
      })

      setFormData({
        title: "",
        category: "",
        author: "",
        price: ""
      })

      fetchBooks()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>

      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/register">Register</Link>
      </nav>

      <h1>📚 Book Marketplace</h1>

      <form onSubmit={addBook}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit">
          Add Book
        </button>

      </form>

      <hr />

      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.category}</p>
          <p>Rs. {book.price}</p>
        </div>
      ))}

    </div>
  )
}

function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

    </Routes>
  )
}

export default App