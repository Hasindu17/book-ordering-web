import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const loginUser = async (e) => {

    e.preventDefault()

    const response = await fetch(
      "http://localhost:8001/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    )

    const data = await response.json()

    if (data.access_token) {

      localStorage.setItem(
        "token",
        data.access_token
      )

      localStorage.setItem(
        "role",
        data.role
      )

      alert("Login Successful")

      navigate("/dashboard")
    }

    else {

      alert("Invalid Credentials")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

      <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-indigo-400">

          Login

        </h1>

        <form onSubmit={loginUser} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-800"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-slate-800"
          />

          <button
            className="
              w-full
              bg-indigo-500
              hover:bg-indigo-600
              py-4
              rounded-xl
            "
          >

            Login

          </button>

        </form>

      </div>

    </div>
  )
}

export default Login