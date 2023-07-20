import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";
import { Grid, PrimaryNav } from "@trussworks/react-uswds";

function Navigation() {
  const navItems = [
    <Link className="nav-link" to={"/"}>
      Home
    </Link>,
    <Link className="nav-link" to={"/file"}>
      File taxes
    </Link>,
  ];
  return (
    <>
      <nav className="navbar">
        <img className="logo" src="src/assets/tax-prepped.png" alt="logo" />
        <ul className="nav-list">
          <li>
            <Link className="nav-link" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={"/file"}>
              File taxes
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={"/display"}>
              View Deduction
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={"/profile"}>
              Profile
            </Link>
          </li>
          <li>
            <Link className="nav-link" to={"/login"}>
              Sign Out
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
