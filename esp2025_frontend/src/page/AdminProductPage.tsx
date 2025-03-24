import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminProduct from "../components/layout/AdminProduct";

const AdminProductPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AdminProduct />
      <Footer />
    </div>
  );
};

export default AdminProductPage;
