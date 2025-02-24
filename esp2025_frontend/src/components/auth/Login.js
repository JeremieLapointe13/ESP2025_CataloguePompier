import React from "react";

const Login = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "calc(100vh - 152px)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Connexion</h2>
                  <div
                    className="border-bottom border-success w-25 mx-auto my-3"
                    style={{ borderWidth: "2px !important" }}
                  ></div>
                </div>

                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="Votre adresse email"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Votre mot de passe"
                      required
                    />
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-lg btn-success py-3"
                      style={{
                        backgroundColor: "#2a7d37",
                        borderColor: "#2a7d37",
                      }}
                    >
                      Se connecter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
