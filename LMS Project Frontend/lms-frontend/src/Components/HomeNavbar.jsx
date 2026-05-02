import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
function HomeNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">Vcube</Link></div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/placement">Placements</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li></li>
      </ul>

      <div className="auth-buttons">
        {!user ? (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        ) : (
          <div className="profile-row">

            {/* 🔹 Profile */}
            <div className="profile-btn">
              <FaUserCircle className="icon" />
              <span>{user.name}</span>
            </div>

            {/* 🔹 Logout beside */}
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" />
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}

export default HomeNavbar;