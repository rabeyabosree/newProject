import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'

function Login() {
  const { loginUser, setLoginFormData, loginFormData } = useContext(UserContext)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  console.log("Login formData:", loginFormData)


  const handleSubmit = (e) => {
    e.preventDefault() // ✅ Fixed
    loginUser()
    console.log("User logged in successfully")
  }

  return (
    <div className='h-screen flex items-center justify-center bg-white'>
      <div className='bg-white p-8 w-full max-w-md rounded shadow-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={loginFormData.email}
            onChange={handleChange}
            className='w-full border border-gray-300 px-4 py-2 rounded'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='current-password'
            value={loginFormData.password}
            onChange={handleChange}
            className='w-full border border-gray-300 px-4 py-2 rounded'
            required
          />
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'
          >
            Login
          </button>
          <p className='text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link to="/register" className='underline text-blue-500 hover:text-blue-700'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
