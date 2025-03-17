import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoRiviereDuLoup from "../../assets/riviere-du-loup-logo.png";
import logoServiceIncendie from "../../assets/serviceIncendie.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec:", email, password);
    navigate("/catalogue");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <img
              src={logoRiviereDuLoup}
              alt="Rivière-du-Loup"
              className="h-16"
            />
          </div>
          <div>
            <img
              src={logoServiceIncendie}
              alt="Service Incendie"
              className="h-20"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Se Connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
