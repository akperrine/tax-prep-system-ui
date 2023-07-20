import { Button, ButtonGroup } from "@trussworks/react-uswds";
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home-container">
      <h2>Welcome User</h2>
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
