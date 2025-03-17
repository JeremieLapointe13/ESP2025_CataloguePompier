import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import CataloguePage from "./page/CataloguePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
