import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CataloguePage from "./pages/CataloguePage";
import PanierPage from "./pages/PanierPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/panier" element={<PanierPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
