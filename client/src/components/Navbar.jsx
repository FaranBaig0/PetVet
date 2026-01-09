import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">
        <p>PetVet.</p>
      </div>

      <div className="icons">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to="#">Features</Link></li>

          {/* ROLE BASED OPTIONS */}
          {user?.role === "doctor" && <li><Link to="/doctors">My Patients</Link></li>}
          {user?.role === "client" && <li><Link to="#">Doctors</Link></li>}
          {user?.role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
          

        </ol>
      </div>

      <div className="register">
        <ol>
          {!user ? (
            <>
              <li><Link to="/login">Log in</Link></li>
              <li><Link to="/signup" className="elevated">Get Started</Link></li>
            </>
          ) : (
            <>
              <li><b>{user.name}</b></li>
              <li>
                <button onClick={logout} className="elevated">
                  Logout
                </button>
              </li>
            </>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Navbar;
