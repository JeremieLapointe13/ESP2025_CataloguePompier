import React from "react";
import Header from "../components/common/Header";
import Panier from "../components/layout/Panier";

const PanierPage = () => {
  return (
    <div className="panier-page">
      <Header />
      <Panier />
    </div>
  );
};

export default PanierPage;
