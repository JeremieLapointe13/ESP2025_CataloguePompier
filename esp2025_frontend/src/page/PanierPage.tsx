import React from "react";
import Panier from "../components/layout/Panier";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const PanierPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Panier />
      <Footer />
    </div>
  );
};

export default PanierPage;
