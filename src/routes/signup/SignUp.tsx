import { Card } from "@trussworks/react-uswds";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="sign-up-container">
      <Card>
        <SignUpForm />
      </Card>
    </div>
  );
}

export default SignUp;
