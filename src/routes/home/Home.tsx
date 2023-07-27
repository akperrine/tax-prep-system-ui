import { Button, ButtonGroup } from "@trussworks/react-uswds";
import "./Home.css";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h2>Welcome {user?.firstName}</h2>
      <div>Let's get you ready for tax season!</div>
      <ButtonGroup>
        <Button type="button" className="usa-button--accent-cooly">
          <Link className="nav-link" to={"/file"}>
            File taxes
          </Link>
        </Button>
        <Button type="button">
          <Link className="nav-link" to={"/display"}>
            View Deduction
          </Link>
        </Button>
        <Button type="button">
          <Link className="nav-link" to={"/profile"}>
            Profile
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Home;
