import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, Button, Card, Fieldset, Form, Label, TextInput, } from "@trussworks/react-uswds";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../../utils/api/userApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
const defaultFormInput = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};
function SignUpForm() {
    const [formInput, setFormInput] = useState(defaultFormInput);
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inventoryDataPayload = {
            ...formInput,
        };
        try {
            await addUser(inventoryDataPayload).then((data) => {
                dispatch(setUser(data));
                navigate("/");
            });
        }
        catch (error) {
            setShowError(true);
            setErrorMessage(error.message);
        }
    };
    const handleToggle = () => setShowPassword(!showPassword);
    return (_jsxs(_Fragment, { children: [_jsx(Card, { children: _jsx(Form, { onSubmit: handleSubmit, large: true, "data-testid": "custom-element", children: _jsxs(Fieldset, { legend: "Sign Up", legendStyle: "large", children: [_jsxs("span", { children: ["or ", _jsx(Link, { to: "/", children: "Already have an account?" })] }), _jsx(Label, { htmlFor: "firstName", children: "First Name" }), _jsx(TextInput, { onChange: handleFormChange, className: "usa-input", id: "firstName", name: "firstName", type: "text", autoCapitalize: "off", autoCorrect: "off", required: true }), _jsx(Label, { htmlFor: "lastName", children: "Last Name" }), _jsx(TextInput, { onChange: handleFormChange, className: "usa-input", id: "lastName", name: "lastName", type: "text", autoCapitalize: "off", autoCorrect: "off", required: true }), _jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(TextInput, { onChange: handleFormChange, className: "usa-input", id: "email", name: "email", type: "email", autoCapitalize: "off", autoCorrect: "off", required: true }), _jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(TextInput, { onChange: handleFormChange, id: "password", name: "password", type: showPassword ? "text" : "password", pattern: ".{6,}", title: "password must be at least 6 characters" }), _jsx("p", { className: "usa-form__note", children: _jsx("a", { title: "Show password", 
                                    //   href="javascript:void(0);"
                                    className: "usa-show-password", "aria-controls": "password", onClick: handleToggle, children: showPassword ? "Hide password" : "Show password" }) }), _jsx(Button, { type: "submit", children: "Sign up" }), _jsx("p", { children: _jsx(Button, { type: "button", className: "usa-button--base", children: "Sign Up With Google" }) })] }) }) }), showError && (_jsx(Alert, { type: "error", heading: "User Not Found", headingLevel: "h4", className: "margin-1", children: errorMessage == "User Exists"
                    ? "User already exists with this email"
                    : "Sorry, something went wrong." }))] }));
}
export default SignUpForm;
