import { Outlet, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import TaxFile from "./routes/TaxFile";
import TaxView from "./routes/TaxView";
import Login from "./routes/login/Login";
import Profile from "./routes/Profile";
import SignUp from "./routes/signup/SignUp";
import { useState } from "react";
// import { useTranslation } from "react-i18next";å

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/file" element={<TaxFile />} />
          <Route path="/display" element={<TaxView />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
