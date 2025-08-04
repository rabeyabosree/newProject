import React from 'react'
import Logo from './Logo';
import { useNavigate } from "react-router-dom"



function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  console.log(token)
  const navMenu = [
    { menu: "Home", link: "/home" },
    { menu: "Skill", link: "/skill" },
    { menu: "Challengs", link: "/challengs" },
    { menu: "About", link: "/about" },
    { menu: "Contact", link: "/contact" }
  ];

  return (
    <header className='w-full fixed py-4 flex items-center justify-between px-6 bg-white shadow mx-auto'>

      <Logo />
      <nav>
        <ul className='flex gap-6'>
          {navMenu.map((menu) => (
            <li key={menu.link} className='cursor-pointer hover:text-blue-600 transition'>
              <a href={menu.link}>{menu.menu}</a>
            </li>
          ))}
        </ul>
      </nav>
      {token ? <button onClick={() => navigate("/profile")}>Profile</button> : <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition' onClick={() => navigate("/register")}>
        Register
      </button>}


    </header>
  );
}

export default Navbar;
