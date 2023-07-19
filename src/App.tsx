import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/navigation/Navigation";
import Home from "./routes/home/Home";
import TaxFile from "./routes/TaxFile";
import TaxView from "./routes/TaxView";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
// import { useTranslation } from "react-i18next";å

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/file" element={<TaxFile />} />
          <Route path="/display" element={<TaxView />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
