import React from "react";
import Commande from "../components/layout/Commande";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const CommandePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Commande />
      </div>
      <Footer />
    </div>
  );
};

export default CommandePage;
