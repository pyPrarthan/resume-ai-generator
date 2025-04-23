import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(()=>{
    fetch("http://localhost:5000/api/ping")
      .then((res)=> res.json())
      .then((data)=>setMessage(data.message))
      .catch((err)=>console.log("Backend not responding",err));
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-purple-700">
        Resume AI Generator ✨
      </h1>
      <p className="text-lg text-gray-800">Backend says: {message}</p>
    </div>
  );
}
export default App;
