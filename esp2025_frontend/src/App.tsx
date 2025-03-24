import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import CataloguePage from "./page/CataloguePage";
import ProductDetailPage from "./page/ProductDetailPage";
import PanierPage from "./page/PanierPage";
import AdminHomePage from "./page/AdminHomePage";
import AdminUserPage from "./page/AdminUserPage";
import AdminProductPage from "./page/AdminProductPage";
import AdminPointPage from "./page/AdminPointPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/panier" element={<PanierPage />} />
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/admin/users" element={<AdminUserPage />} />
        <Route path="/admin/products" element={<AdminProductPage />} />
        <Route path="/admin/points" element={<AdminPointPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
