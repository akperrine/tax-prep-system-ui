import { Button } from "@trussworks/react-uswds";
import "./Home.css";
function Home() {
  return (
    <div className="home-container">
      <h2>Welcome User</h2>
      <div>Let's get you ready for tax season!</div>
      <Button type="button" className="usa-button--accent-cooly">
        File Taxes
      </Button>
      <Button type="button">View Taxes</Button>
    </div>
  );
}

export default Home;
