import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, Outlet } from "react-router-dom";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
function Navigation() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const handleSignOut = () => dispatch(clearUser());
    const navItems = [
        _jsx(Link, { className: "nav-link", to: "/", children: "Home" }),
        _jsx(Link, { className: "nav-link", to: "/file", children: "File taxes" }),
        _jsx(Link, { className: "nav-link", to: "/display", children: "View Filing" }),
        _jsx(Link, { className: "nav-link", to: "/profile", children: "Profile" }),
        _jsx(Link, { className: "nav-link", to: "/", onClick: handleSignOut, children: "Sign Out" }),
    ];
    const renderNavLinks = () => (_jsx("ul", { className: "nav-list", children: navItems.map((link, index) => (_jsx("li", { children: link }, index))) }));
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { className: "navbar", children: [_jsx("img", { className: "logo", src: "src/assets/tax-prepped.png", alt: "logo" }), user !== null && renderNavLinks()] }), _jsx(Outlet, {})] }));
}
export default Navigation;
