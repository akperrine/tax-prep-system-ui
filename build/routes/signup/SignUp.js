import { jsx as _jsx } from "react/jsx-runtime";
import SignUpForm from "../../components/sign-up-form/SignUpForm";
import "./SignUp.css";
function SignUp() {
    return (_jsx("div", { className: "sign-up-container", children: _jsx(SignUpForm, {}) }));
}
export default SignUp;
