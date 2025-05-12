import Profile from "../components/layout/Profile";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ProfilePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Profile />
      <Footer />
    </div>
  );
};

export default ProfilePage;
