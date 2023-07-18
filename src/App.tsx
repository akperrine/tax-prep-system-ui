import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./routes/Navigation";
import Home from "./routes/Home";
import TaxFile from "./routes/TaxFile";
import TaxView from "./routes/TaxView";
// import { useTranslation } from "react-i18next";å

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="/file" element={<TaxFile />} />
          <Route path="/display" element={<TaxView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;