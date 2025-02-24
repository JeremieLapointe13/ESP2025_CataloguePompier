import React from "react";
import HeaderLogin from "../components/layout/HeaderLogin";
import Login from "../components/auth/Login";

const LoginPage = () => {
  return (
    <div className="login-page d-flex flex-column min-vh-100">
      <HeaderLogin />
      <div className="flex-grow-1 bg-light">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
