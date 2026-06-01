import Dashboard from './pages/Dashboard'
import { useNavigate } from "react-router-dom"

<Route path="/dashboard" element={<Dashboard />} />

function Dashboard() {

  const navigate = useNavigate()

  const role = localStorage.getItem("role")

  // BLOCK NON SELLERS

  if (role !== "seller") {

    return (

      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">

        <h1 className="text-4xl">

          Access Denied
        </h1>

      </div>
    )
  }

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("role")

    navigate("/login")
  }

  return (

    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}

      <div className="w-72 bg-slate-900 p-8 border-r border-slate-800">

        <h1 className="text-3xl font-bold text-indigo-400 mb-12">

          📚 Seller Panel

        </h1>

        <div className="space-y-6">

          <button className="w-full text-left hover:text-indigo-400">

            Dashboard

          </button>

          <button className="w-full text-left hover:text-indigo-400">

            My Books

          </button>

          <button className="w-full text-left hover:text-indigo-400">

            Orders

          </button>

          <button className="w-full text-left hover:text-indigo-400">

            Analytics

          </button>

        </div>

        <button
          onClick={logout}
          className="
            mt-20
            bg-red-500
            hover:bg-red-600
            px-5
            py-3
            rounded-xl
            w-full
          "
        >

          Logout

        </button>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-10">

        <h2 className="text-5xl font-bold mb-10">

          Seller Dashboard
        </h2>

        {/* CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-2xl">

            <h3 className="text-slate-400">

              Total Books
            </h3>

            <p className="text-5xl font-bold mt-4 text-indigo-400">

              12

            </p>

          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">

            <h3 className="text-slate-400">

              Orders
            </h3>

            <p className="text-5xl font-bold mt-4 text-green-400">

              38

            </p>

          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">

            <h3 className="text-slate-400">

              Revenue
            </h3>

            <p className="text-5xl font-bold mt-4 text-yellow-400">

              Rs. 48K

            </p>

          </div>

        </div>

        {/* RECENT ACTIVITY */}

        <div className="mt-14 bg-slate-900 rounded-2xl p-8">

          <h3 className="text-3xl font-bold mb-6">

            Recent Activity

          </h3>

          <div className="space-y-4 text-slate-300">

            <p>
              ✅ New book added
            </p>

            <p>
              📦 3 new orders received
            </p>

            <p>
              💰 Revenue increased
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard