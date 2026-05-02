import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../styles/header.css";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
   <header className="header">

  <button className="menu-btn" onClick={toggleSidebar}>
    ☰
  </button>

  <h2 className="logo"><Link to="/">Vcube</Link></h2>

  <input className="search" placeholder="Search courses..." />

  <div className="header-menu" ref={dropdownRef}>
    {user ? (
      <div className="profile-box">

        {/* 🔹 Profile Button */}
        <div className="profile-btn" onClick={() => setOpen(!open)}>
          <FaUserCircle className="icon" />
          <span>{user.name.split(" ")[0]}</span>
        </div>

        {/* 🔹 Dropdown */}
        {open && (
          <div className="dropdown">
            <button onClick={logout}>
              <FaSignOutAlt className="icon" />
              Logout
            </button>
          </div>
        )}

      </div>
    ) : (
      <Link to="/login">
        <button className="login-btn">Login</button>
      </Link>
    )}
  </div>

</header>
  );
}

export default Header;