import './App.css'
import { useState, useEffect } from 'react'

const App = () => {

  const[message, setMessage] = useState("")

  useEffect(() => {
    fetch("http://localhost:8000/v1/api/message")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
  }, [])
    
  return( 
 <div>
  <h1 className = "text-3xl text-red-700 p-4" > 
    AICost Auditor
    </h1>
  <h2 className = "text-2xl text-blue-600 p-4" >
     Welcome to the App
     </h2>
     <h2 className = "text-lg text-red-500 p-4" >
       data: {message}
     </h2>
  </div>
  )
}

export default App
