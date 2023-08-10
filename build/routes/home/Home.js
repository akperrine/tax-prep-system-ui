import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button, ButtonGroup } from "@trussworks/react-uswds";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Home() {
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    return (_jsxs("div", { className: "home-container", children: [_jsxs("h2", { children: ["Welcome ", user?.firstName] }), _jsx("div", { children: "Let's get you ready for tax season!" }), _jsxs(ButtonGroup, { children: [_jsx(Button, { type: "button", className: "usa-button--accent-cooly", children: _jsx(Link, { className: "nav-link", to: "/file", children: "File taxes" }) }), _jsx(Button, { type: "button", children: _jsx(Link, { className: "nav-link", to: "/display", children: "View Deduction" }) }), _jsx(Button, { type: "button", children: _jsx(Link, { className: "nav-link", to: "/profile", children: "Profile" }) })] })] }));
}
export default Home;
