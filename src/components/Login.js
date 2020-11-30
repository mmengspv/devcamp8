import React, { useState } from "react"
// import { firebase } from "../services/firebase"
import auth from "../services/firebase-auth"

const Login = ({ setSession }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const checkAccount = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(username, password)

      const { user } = response

      setSession({
        isLoggedIn: true,
        currentUser: user,
      })
    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.errorMessage,
      })
    }
  }

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      User Login
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleUsername}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <button type="button" onClick={checkAccount}>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
