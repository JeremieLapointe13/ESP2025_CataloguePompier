import AdminHome from "../components/layout/AdminHome";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const AdminHomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <AdminHome />
      <Footer />
    </div>
  );
};

export default AdminHomePage;
