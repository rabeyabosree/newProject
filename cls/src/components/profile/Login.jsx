import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const { loginUser, setLoginFormData, loginFormData } = useContext(UserContext)
  const navigate = useNavigate()

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
    navigate("/")
  }

  return (
    <div className='h-screen flex items-center justify-center bg-[#e9edfa]'>
      <div className='bg-white p-8 w-full max-w-md rounded shadow-md'>
        <h1 className='text-2xl text-[#DCAE1D] font-bold mb-6 text-center'>Login</h1>
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
            className='w-full bg-[#00303F] text-white px-6 py-3 rounded-xl text-base hover:text-[#abb4d1] transition'
          >
            Login
          </button>
          <p className='text-center mt-2 text-sm'>
            Don&apos;t have an account?{' '}
            <Link to="/register" className='underline text-[#DCAE1D] hover:text-[#00303F]'>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
