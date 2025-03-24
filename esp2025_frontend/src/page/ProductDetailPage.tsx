import React from "react";
import ProductDetail from "../components/layout/ProductDetail";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ProductDetailPage: React.FC = () => {
  return (
    <div>
      <Header />
      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
