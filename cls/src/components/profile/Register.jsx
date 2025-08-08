import React, { useContext } from 'react'
import { UserContext } from './../../context/userContext';
import { Link } from 'react-router-dom'

function Register() {
    const { registerUser, setRegisterFormData, registerFormData } = useContext(UserContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        registerUser()
        console.log("register successfully")
    }

    return (
        <div className='h-screen flex items-center justify-center bg-[#e9edfa]'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
                <h1 className='text-2xl text-[#DCAE1D] font-bold mb-6 text-center'>Register</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={registerFormData.name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 px-4 py-2 rounded'
                        required
                    />
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={registerFormData.email}
                        onChange={handleChange}
                        className='w-full border border-gray-300 px-4 py-2 rounded'
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='current-password'
                        value={registerFormData.password}
                        onChange={handleChange}
                        className='w-full border border-gray-300 px-4 py-2 rounded'
                        required
                    />

                    <select
                        name='skillLevel'
                        value={registerFormData.skillLevel}
                        onChange={handleChange}
                        className='w-full border border-gray-300 px-4 py-2 rounded'
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select
                        name='preferredLanguage'
                        value={registerFormData.preferredLanguage}
                        onChange={handleChange}
                        className='w-full border border-gray-300 px-4 py-2 rounded'
                    >
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="Ruby">Ruby</option>
                    </select>

                    <button
                        type='submit'
                        className='w-full bg-[#00303F] text-white px-6 py-3 rounded-xl text-base hover:text-[#abb4d1] transition'
                    >
                        Register
                    </button>

                     <p className='text-center mt-2'>You have an account ? <Link to={"/login"} className='underline text-[#DCAE1D] hover:text-[#00303F]'>login</Link> </p>
                </form>
            </div>
        </div>
    )
}

export default Register

