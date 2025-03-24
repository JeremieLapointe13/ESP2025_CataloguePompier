import React from "react";
import Panier from "../components/layout/Panier";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const PanierPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Panier />
      </div>
      <Footer />
    </div>
  );
};

export default PanierPage;
