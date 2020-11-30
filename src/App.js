import "./App.css"
import ImageForm from "./components/ImageForm"
import Login from "./components/Login"

import React, { useState, useEffect } from "react"
import auth from "./services/firebase-auth"

function App() {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null,
  })

  const Logout = () => {
    auth.signOut()
  }

  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage: null,
        })
      } else {
        setSession({
          isLoggedIn: false,
          currentUser: null,
          errorMessage: null,
        })
      }
    })
    return () => {
      handleAuth()
    }
  }, [])

  return (
    <div className="App">
      {session.isLoggedIn ? (
        <div>
          <ImageForm />
          <button type="button" onClick={Logout}>
            Logout
          </button>
        </div>
      ) : (
        <Login setSession={setSession} />
      )}
    </div>
  )
}

export default App
