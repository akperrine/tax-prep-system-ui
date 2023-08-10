import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, Button, Card, Fieldset, Form, Label, TextInput, } from "@trussworks/react-uswds";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { getUser } from "../../utils/api/userApi";
const defaultFormInput = {
    email: "",
    password: "",
};
function LoginForm() {
    const [formInput, setFormInput] = useState(defaultFormInput);
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleToggle = () => setShowPassword((showPassword) => !showPassword);
    // update inputs to state
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPayload = {
            ...formInput,
        };
        try {
            await getUser(userPayload)
                .then((data) => {
                dispatch(setUser(data));
                navigate("/");
            })
                .catch((error) => {
                setShowError(true);
                setErrorMessage(error.message);
            });
        }
        catch (error) {
            setFormInput(defaultFormInput);
            setShowPassword(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Card, { children: _jsx(Form, { onSubmit: handleSubmit, large: true, "data-testid": "custom-element", children: _jsxs(Fieldset, { legend: "Sign In", legendStyle: "large", children: [_jsxs("span", { children: ["or ", _jsx(Link, { to: "/signup", children: "Create an account" })] }), _jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(TextInput, { onChange: handleFormChange, className: "usa-input", id: "email", name: "email", type: "email", autoCapitalize: "off", autoCorrect: "off", required: true }), _jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(TextInput, { onChange: handleFormChange, id: "password", name: "password", type: showPassword ? "text" : "password", required: true }), _jsx("p", { className: "usa-form__note", children: _jsx("a", { title: "Show password", 
                                    //   href="javascript:void(0);"
                                    className: "usa-show-password", "aria-controls": "password-sign-in", onClick: handleToggle, children: showPassword ? "Hide password" : "Show password" }) }), _jsx(Button, { type: "submit", children: "Sign in" }), _jsx("p", { children: _jsx(Button, { type: "button", className: "usa-button--base", children: "Google Sign In" }) })] }) }) }), showError && (_jsx(Alert, { type: "error", heading: "User Not Found", headingLevel: "h4", className: "margin-1", children: errorMessage ? errorMessage : "Sorry, something went wrong." }))] }));
}
export default LoginForm;
