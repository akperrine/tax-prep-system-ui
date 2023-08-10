import { jsx as _jsx } from "react/jsx-runtime";
import LoginForm from "../../components/login-form/LoginForm";
import "./Login.css";
function Login() {
    return (_jsx("div", { className: "login-container", children: _jsx(LoginForm, {}) }));
}
export default Login;
