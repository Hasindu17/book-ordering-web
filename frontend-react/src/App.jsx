import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
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
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-10 py-5 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-indigo-400">

          📚 BookVerse

        </h1>

        <div className="flex gap-6 text-sm">

          <Link to="/" className="hover:text-indigo-400">
            Home
          </Link>

          <Link to="/register" className="hover:text-indigo-400">
            Register
          </Link>

        </div>

      </nav>

      {/* HERO */}

      <section className="text-center py-24 px-5">

        <h2 className="text-6xl font-bold leading-tight">

          Discover Amazing Books

        </h2>

        <p className="text-slate-400 mt-6 text-lg">

          Buy books directly from authors and sellers

        </p>

      </section>

      {/* ADD BOOK FORM */}

      <section className="px-10 mb-20">

        <div className="bg-slate-900 rounded-2xl p-8 max-w-2xl mx-auto">

          <h3 className="text-3xl font-bold mb-6 text-indigo-400">

            Add New Book

          </h3>

          <form onSubmit={addBook} className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700"
              required
            />

            <button
              type="submit"
              className="
                w-full
                bg-indigo-500
                hover:bg-indigo-600
                py-4
                rounded-xl
                text-lg
                transition
              "
            >

              Add Book

            </button>

          </form>

        </div>

      </section>

      {/* BOOK GRID */}

      <section className="px-10 pb-20">

        <h3 className="text-3xl font-bold mb-10">

          Marketplace Books

        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {books.map((book) => (

            <div
              key={book.id}
              className="
                bg-slate-900
                rounded-2xl
                overflow-hidden
                shadow-lg
                hover:scale-105
                transition
              "
            >

              <div className="h-52 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-5xl">

                📖

              </div>

              <div className="p-6">

                <span className="text-indigo-400 text-sm">

                  {book.category}

                </span>

                <h4 className="text-2xl font-bold mt-2">

                  {book.title}

                </h4>

                <p className="text-slate-400 mt-2">

                  Author: {book.author}

                </p>

                <p className="text-green-400 text-xl font-bold mt-4">

                  Rs. {book.price}

                </p>

                <button
                  className="
                    mt-5
                    w-full
                    bg-indigo-500
                    hover:bg-indigo-600
                    py-3
                    rounded-xl
                    transition
                  "
                >

                  Order Now

                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  )
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<Register />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App