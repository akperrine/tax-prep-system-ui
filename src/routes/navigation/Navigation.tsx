import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";

function Navigation() {
  // Figure out the typing
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(clearUser());

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
    <Link className="nav-link" to={"/"} onClick={handleSignOut}>
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
        {user && renderNavLinks()}
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
