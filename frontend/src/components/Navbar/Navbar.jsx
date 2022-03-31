import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";

import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../features/auth/authSlice";

const links = [
  { name: "Home", to: "/" },
  { name: "Movies", to: "/movies" },
  { name: "Tv Series", to: "/tvseries" },
];
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [colorizeNavbar, setColorizeNavbar] = useState(false);

  const [offset, setOffset] = useState(0);

  const onLogin = () => {
    console.log("login");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const onLogout = () => {
    console.log("Logout");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 100) {
        setColorizeNavbar(true);
      } else {
        setColorizeNavbar(false);
      }
    };

    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`navbar ${colorizeNavbar && "colorizeNavbar"}`}>
      <div className="container">
        <div className="logo">
          <a href="/"> Kvies </a>
        </div>

        <div className="app__navbar-links">
          {links.map((link) => (
            <a href={link.to} key={link.name}>
              {link.name}
            </a>
          ))}
        </div>

        <div className="right-icons">
          {user ? (
            <>
              <button onClick={() => onLogout()}>
                <FaSignInAlt className="icon" />
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")}>
                <FaSignInAlt className="icon" />
              </button>
              <button onClick={() => navigate("/register")}>
                <FaUser className="icon" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
