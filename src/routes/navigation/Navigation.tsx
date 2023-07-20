import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navItems = [
    <Link className="nav-link" to={"/"}>
      Home
    </Link>,
    <Link className="nav-link" to={"/file"}>
      File taxes
    </Link>,
    <Link className="nav-link" to={"/display"}>
      View Deduction
    </Link>,
    <Link className="nav-link" to={"/profile"}>
      Profile
    </Link>,
    <Link className="nav-link" to={"/login"}>
      Sign Out
    </Link>,
  ];

  const renderNavLinks = () => (
    <ul className="nav-list">
      {navItems.map((link, index) => (
        <li key={index}>{link}</li>
      ))}
    </ul>
  );

  return (
    <>
      <nav className="navbar">
        <img className="logo" src="src/assets/tax-prepped.png" alt="logo" />
        {isLoggedIn && renderNavLinks()}
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
