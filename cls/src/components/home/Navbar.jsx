import React, { useState } from 'react'
import Logo from './Logo'
import { useNavigate, Link } from "react-router-dom"
import { LuCircleUserRound } from "react-icons/lu"
import { HiMenu, HiX } from "react-icons/hi" // hamburger and close icons

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const navMenu = [
    { menu: "Home", link: "/home" },
    { menu: "Skill", link: "/skill" },
    { menu: "Challenges", link: "/challengs" }, // fix spelling if needed
    { menu: "About", link: "/about" },
    { menu: "Contact", link: "/contact" }
  ]

  // State for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className='w-full fixed top-0 left-0 bg-[#CAE4DB] text-[#00303F] px-6 py-4 flex items-center justify-between z-50'>

      <Logo />

      {/* Desktop menu */}
      <nav className="hidden md:block">
        <ul className='flex gap-6'>
          {navMenu.map(({ menu, link }) => (
            <li key={link} className='cursor-pointer hover:text-[#7a949c] transition'>
              <Link to={link}>{menu}</Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Right side: Profile or Register */}
      <div className='hidden md:flex items-center gap-4'>
        {token ? (
          <button aria-label="Go to profile" onClick={() => navigate("/profile")}>
            <LuCircleUserRound width={42} height={42} />
          </button>
        ) : (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-3xl"
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <nav className="absolute top-full left-0 w-full bg-[#f0fcf8] px-6 py-4 md:hidden shadow-lg ">
          <ul className='flex flex-col gap-4'>
            {navMenu.map(({ menu, link }) => (
              <li
                className='cursor-pointer p-2 rounded-2xl w-[120px] transition-transform duration-300 hover:bg-[#d9e9ec] hover:text-[#004a6e] hover:scale-105'
              >
                <Link to={link} onClick={() => setIsOpen(false)}>{menu}</Link>
              </li>


            ))}
            <li>
              {token ? (
                <button
                  className="w-full text-left mt-6 text-[#00303F]"
                  onClick={() => {
                    setIsOpen(false)
                    navigate("/profile")
                  }}
                >
                  <LuCircleUserRound className="inline mr-2" /> Profile
                </button>
              ) : (
                <button
                  className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
                  onClick={() => {
                    setIsOpen(false)
                    navigate("/register")
                  }}
                >
                  Register
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}

    </header>
  )
}

export default Navbar

