import React from "react";
import ProductDetail from "../components/layout/ProductDetail";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ProductDetailPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <ProductDetail />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
