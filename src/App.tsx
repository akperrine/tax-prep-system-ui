import { Route, Routes, redirect, useNavigate } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import TaxFile from "./routes/TaxFile";
import TaxView from "./routes/TaxView";
import Login from "./routes/login/Login";
import Profile from "./routes/Profile";
import SignUp from "./routes/signup/SignUp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
// import { useTranslation } from "react-i18next";å

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (user == null) {
  //     console.log("it is null");
  //     navigate("/login");
  //   }
  // });
  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/file" element={<TaxFile />} />
            <Route path="/display" element={<TaxView />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
