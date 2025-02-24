import React from "react";
import logoRiviereDuLoup from "../../assets/riviere-du-loup-logo.jpg";
import logoServiceIncendie from "../../assets/serviceIncendie.png";

const HeaderLogin = () => {
  return (
    <header>
      <div className="container-fluid px-0">
        <div className="row g-0 align-items-center py-3 px-lg-4 px-3 bg-white shadow-sm">
          <div className="col-md-3 col-6 text-md-start text-center mb-md-0 mb-3">
            <img
              src={logoRiviereDuLoup}
              alt="Rivière du Loup"
              className="img-fluid"
              style={{ maxHeight: "90px" }}
            />
          </div>

          <div className="col-md-6 col-12 text-center mb-md-0 mb-3">
            <h1 className="mb-0 fs-2 fw-bold">
              Caserne <span className="text-success">Rivière-du-Loup</span>
            </h1>
            <p className="text-success mb-0 mt-1 fs-5">
              Catalogue d'équipement
            </p>
          </div>

          <div className="col-md-3 col-6 text-md-end text-center">
            <img
              src={logoServiceIncendie}
              alt="Service Incendie"
              className="img-fluid"
              style={{ maxHeight: "90px" }}
            />
          </div>
        </div>

        <div className="border-success border-bottom border-5"></div>
      </div>
    </header>
  );
};

export default HeaderLogin;
