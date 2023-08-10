import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import TaxFile from "./routes/tax-file/TaxFile";
import TaxView from "./routes/tax-view/TaxView";
import Login from "./routes/login/Login";
import Profile from "./routes/Profile";
import SignUp from "./routes/signup/SignUp";
import { useSelector } from "react-redux";
function App() {
    const user = useSelector((state) => state.user.user);
    return (_jsx("div", { className: "app-container", children: user ? (_jsxs(_Fragment, { children: [_jsx(Navigation, {}), _jsx("div", { className: "outlet-container", children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Outlet, {}), children: [_jsx(Route, { index: true, element: _jsx(Home, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) }), _jsx(Route, { path: "/file", element: _jsx(TaxFile, {}) }), _jsx(Route, { path: "/display", element: _jsx(TaxView, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }) }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Navigation, {}), _jsx("div", { className: "outlet-container", children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(Outlet, {}), children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/signup", element: _jsx(SignUp, {}) })] }) }) })] })) }));
}
export default App;
