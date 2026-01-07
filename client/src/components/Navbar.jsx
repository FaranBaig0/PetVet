import React from 'react'
import './css/Navbar.css';
const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <div className="logo">
            <p>PetVet .</p>
        </div>
        <div className="icons">
            <ol>
                <li><a href="#">Home</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Doctors</a></li>
                <li><a href="#">Shop</a></li>
                <li><a href="#">AI Checker</a></li>
            </ol>
        </div>
        <div className="register">
          <ol>
            <li><a href="#">Log in</a></li>
            <li><a href="#" className='elevated'>Get Started</a></li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Navbar
