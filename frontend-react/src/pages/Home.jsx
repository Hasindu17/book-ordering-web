import { Link } from "react-router-dom";

function Home() {
 return (
  <div className="min-h-screen bg-slate-950 text-white">

   <div className="p-6 flex justify-between">

    <h1 className="text-3xl font-bold text-indigo-400">
      📚 Book Marketplace
    </h1>

    <div className="space-x-4">

      <Link
        to="/login"
        className="bg-indigo-500 px-5 py-2 rounded-lg"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="bg-green-500 px-5 py-2 rounded-lg"
      >
        Register
      </Link>

    </div>
   </div>

   <div className="flex flex-col items-center justify-center h-[80vh]">

      <h1 className="text-6xl font-bold mb-6">
        Buy & Sell Books Online
      </h1>

      <p className="text-slate-400 text-xl">
        Modern Marketplace For Readers & Sellers
      </p>

   </div>

  </div>
 );
}

export default Home;