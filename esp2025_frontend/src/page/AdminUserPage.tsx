import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import AdminUser from "../components/layout/AdminUser";

const AdminUserPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <AdminUser />
      </div>
      <Footer />
    </div>
  );
};

export default AdminUserPage;
