import React from "react";
import Catalogue from "../components/layout/Catalogue";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const CataloguePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow">
        <Catalogue />
      </div>
      <Footer />
    </div>
  );
};

export default CataloguePage;
