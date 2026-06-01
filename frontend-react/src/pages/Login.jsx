import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const loginUser = async (e) => {

    e.preventDefault()

    setLoading(true)

    try {

      const response = await fetch(
        "http://localhost:8003/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      )

      const data = await response.json()

      if (data.token) {

        localStorage.setItem(
          "token",
          data.token
        )

        localStorage.setItem(
          "role",
          data.role
        )

        alert("Login Successful")

        navigate("/dashboard")
      }

      else {

        alert(data.message || "Login Failed")
      }

    } catch (error) {

      console.log(error)

      alert("Server Connection Failed")
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-slate-900 rounded-3xl p-10 shadow-2xl border border-slate-800">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-indigo-400">
            📚 Book Marketplace
          </h1>

          <p className="text-slate-400 mt-4">
            Login to your account
          </p>

        </div>

        <form
          onSubmit={loginUser}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
              focus:outline-none
              focus:border-indigo-500
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              p-4
              rounded-xl
              bg-slate-800
              text-white
              border
              border-slate-700
              focus:outline-none
              focus:border-indigo-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              bg-indigo-600
              hover:bg-indigo-700
              rounded-xl
              font-semibold
              transition
            "
          >

            {loading ? "Signing In..." : "Login"}

          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-slate-400">

            Don't have an account?

            <Link
              to="/register"
              className="text-indigo-400 ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login