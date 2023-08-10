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
import { RootState } from "./redux/store";
// import { useTranslation } from "react-i18next";å

function App() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="app-container">
      {user ? (
        <>
          <Navigation />
          <div className="outlet-container">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Home />} />
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/file" element={<TaxFile />} />
                <Route path="/display" element={<TaxView />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </>
      ) : (
        <>
          <Navigation />
          <div className="outlet-container">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
