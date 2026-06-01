import { useState } from "react";

function AddBook() {

 const [title,setTitle] = useState("");
 const [author,setAuthor] = useState("");
 const [category,setCategory] = useState("");
 const [price,setPrice] = useState("");

 const saveBook = async () => {

   await fetch(
      "http://localhost:8001/books",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          title,
          author,
          category,
          price
        })
      }
   );
 };

 return (

  <div className="min-h-screen bg-slate-950 text-white p-10">

   <h1 className="text-4xl mb-8">
      Add Book
   </h1>

   <div className="max-w-lg space-y-4">

      <input
       className="w-full p-3 rounded bg-slate-800"
       placeholder="Title"
       onChange={(e)=>setTitle(e.target.value)}
      />

      <input
       className="w-full p-3 rounded bg-slate-800"
       placeholder="Author"
       onChange={(e)=>setAuthor(e.target.value)}
      />

      <input
       className="w-full p-3 rounded bg-slate-800"
       placeholder="Category"
       onChange={(e)=>setCategory(e.target.value)}
      />

      <input
       className="w-full p-3 rounded bg-slate-800"
       placeholder="Price"
       onChange={(e)=>setPrice(e.target.value)}
      />

      <button
       onClick={saveBook}
       className="bg-indigo-500 px-5 py-3 rounded"
      >
        Save Book
      </button>

   </div>

  </div>
 );
}

export default AddBook;