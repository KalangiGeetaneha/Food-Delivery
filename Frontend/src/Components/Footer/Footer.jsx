import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className='footer-content-left'>
                <img src={assets.logo} alt="" />
                <p>Dine Dash is a fun, fast-paced food delivery platform that connects users with their favorite local eats. From juicy burgers to cheesy pizza, it brings casual dining straight to your doorstep. The site features a playful, cartoon-inspired design that makes ordering feel effortless and enjoyable. Perfect for quick meals, group orders, or discovering new flavors nearby. Hungry? Dine Dash delivers satisfaction in every bite.
</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className='footer-content-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@dinedash.com</li>
                </ul>
            </div>
       
        </div>
        <hr/>
        <p className="footer-copyright">
            © {new Date().getFullYear()} FoodieApp. All rights reserved.

        </p>

    </div>
  )
}

export default Footer