import React, { createContext, useState } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null)

  // Separate state for each form
  const [registerFormData, setRegisterFormData] = useState({
    name: '',
    email: '',
    password: '',
    skillLevel: [],
    preferredLanguage: []
  })

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })

  const BACKEND_URL = "http://localhost:5000"

  const registerUser = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/register`, registerFormData)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUserData(response.data.user)
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message)
    }
  }

  const loginUser = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/user/login`, loginFormData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      setUserData(response.data.user)
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message)
    }
  }

  const userProfile = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserData(response.data.user)
    } catch (error) {
      console.error("Profile fetch error:", error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user: userData,
        setUserData,
        registerFormData,
        setRegisterFormData,
        loginFormData,
        setLoginFormData,
        registerUser,
        loginUser,
        userProfile
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

