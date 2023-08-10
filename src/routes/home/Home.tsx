import {
  Button,
  ButtonGroup,
  GridContainer,
  ProcessList,
  ProcessListHeading,
  ProcessListItem,
} from "@trussworks/react-uswds";
import "./Home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Home() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="home-container">
      <ProcessList>
        <ProcessListItem className="padding-bottom-4">
          <ProcessListHeading
            type="p"
            className="font-sans-xl line-height-sans-1"
          >
            Update your profile
          </ProcessListHeading>
        </ProcessListItem>
        <ProcessListItem className="padding-bottom-4">
          <ProcessListHeading
            type="p"
            className="font-sans-xl line-height-sans-1"
          >
            File Your Taxes
          </ProcessListHeading>
        </ProcessListItem>
        <ProcessListItem>
          <ProcessListHeading
            type="p"
            className="font-sans-xl line-height-sans-1"
          >
            View your Taxes
          </ProcessListHeading>
        </ProcessListItem>
      </ProcessList>
      <GridContainer className="margin-bottom-2">
        <div className="usa-hero__callout" style={{ maxWidth: "40rem" }}>
          <h1 className="usa-hero__heading">
            <span className="usa-hero__heading--alt">
              Welcome {user?.firstName}
            </span>
            We're here to make tax season easier
          </h1>
          <p className="text-white">
            Follow the above steps to recieve a simple and easy breakdown of
            your taxes this year.
          </p>
          <Button type="button" className="usa-button margin-top-3" size="big">
            <Link className="nav-link" to={"/file"}>
              File taxes
            </Link>
          </Button>
        </div>
      </GridContainer>

      <ButtonGroup>
        <Button type="button" size="big">
          <Link className="nav-link" to={"/display"}>
            View Deduction
          </Link>
        </Button>
        <Button type="button" size="big">
          <Link className="nav-link padding-2" to={"/profile"}>
            Profile
          </Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Home;
