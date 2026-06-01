import { useNavigate } from "react-router-dom"

function Dashboard() {

  const navigate = useNavigate()

  const role = localStorage.getItem("role")

  if (role !== "seller") {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-5xl font-bold text-red-500">
          Access Denied
        </h1>
      </div>
    )
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}

      <div className="w-72 bg-slate-900 border-r border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-indigo-500 mb-12">
          📚 BookHub Seller
        </h1>

        <div className="space-y-5">

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            🏠 Dashboard
          </button>

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            📚 My Books
          </button>

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            ➕ Add Book
          </button>

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            📦 Orders
          </button>

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            📈 Analytics
          </button>

          <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800 transition">
            ⚙ Settings
          </button>

        </div>

        <button
          onClick={logout}
          className="mt-16 bg-red-500 hover:bg-red-600 w-full py-3 rounded-xl font-semibold"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}

      <div className="flex-1 p-10">

        {/* Top Bar */}

        <div className="flex justify-between items-center mb-10">

          <div>
            <h2 className="text-5xl font-bold">
              Seller Dashboard
            </h2>

            <p className="text-slate-400 mt-2">
              Welcome back 👋
            </p>
          </div>

          <input
            type="text"
            placeholder="Search books..."
            className="
              bg-slate-900
              border
              border-slate-700
              px-5
              py-3
              rounded-xl
              outline-none
            "
          />
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">Total Books</p>
            <h3 className="text-5xl font-bold text-indigo-400 mt-3">
              12
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">Orders</p>
            <h3 className="text-5xl font-bold text-green-400 mt-3">
              38
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">Revenue</p>
            <h3 className="text-5xl font-bold text-yellow-400 mt-3">
              Rs.48K
            </h3>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8">
            <p className="text-slate-400">Customers</p>
            <h3 className="text-5xl font-bold text-pink-400 mt-3">
              85
            </h3>
          </div>

        </div>

        {/* Recent Books */}

        <div className="mt-12">

          <h3 className="text-3xl font-bold mb-6">
            Recent Books
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-slate-900 rounded-2xl overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                alt=""
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h4 className="font-bold text-xl">
                  React Mastery
                </h4>

                <p className="text-slate-400 mt-2">
                  Modern React Development
                </p>

                <button className="mt-4 bg-indigo-600 px-4 py-2 rounded-lg">
                  Edit
                </button>

              </div>

            </div>

            <div className="bg-slate-900 rounded-2xl overflow-hidden">

              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                alt=""
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h4 className="font-bold text-xl">
                  Python Cloud
                </h4>

                <p className="text-slate-400 mt-2">
                  DevOps and Cloud Guide
                </p>

                <button className="mt-4 bg-indigo-600 px-4 py-2 rounded-lg">
                  Edit
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard