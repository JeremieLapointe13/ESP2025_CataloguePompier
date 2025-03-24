import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminPoint from "../components/layout/AdminPoint";

const AdminPointPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AdminPoint />
      <Footer />
    </div>
  );
};

export default AdminPointPage;
