import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from './Context/StoreContext'

const Navbar = ({ setshowLogin }) => {

  const [menu, setMenu] = useState("home")

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  const scrollToSection = (sectionId, menuName) => {

    setMenu(menuName)

    navigate("/")

    setTimeout(() => {

      const element = document.getElementById(sectionId)

      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }

    }, 100)
  }

  return (
    <div className='navbar'>

      <Link to='/'>
        <img src={assets.logo} alt="" className='logo' />
      </Link>

      <ul className="navbar-menu">

        <Link
          to='/'
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>

        <li
          onClick={() => scrollToSection("explore-menu", "menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </li>

        <li
          onClick={() => scrollToSection("app-download", "mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile-app
        </li>

        <li
          onClick={() => scrollToSection("footer", "contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact-us
        </li>

      </ul>

      <div className="navbar-right">

        <div className="navbar-search-icon">

          <Link to='/cart'>
            <img src={assets.basket_icon} alt="" />
          </Link>

          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

        </div>

        {!token ? (
          <button onClick={() => setshowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div className='navbar-profile'>

            <img src={assets.profile_icon} alt="" />

            <ul className="nav-profile-dropdown">

              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>

              <hr />

              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>

            </ul>

          </div>
        )}

      </div>

    </div>
  )
}

export default Navbar