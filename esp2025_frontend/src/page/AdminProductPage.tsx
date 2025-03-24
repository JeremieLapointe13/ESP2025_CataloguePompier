import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminProduct from "../components/layout/AdminProduct";

const AdminProductPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <AdminProduct />
      </div>
      <Footer />
    </div>
  );
};

export default AdminProductPage;
