import { Card } from "@trussworks/react-uswds";
import LoginForm from "../../components/login-form/LoginForm";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <Card>
        <LoginForm />
      </Card>
    </div>
  );
}

export default Login;
