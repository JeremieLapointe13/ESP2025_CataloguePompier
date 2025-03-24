import React from "react";
import { useNavigate } from "react-router-dom";

const AdminHome: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-1 gap-24 p-8">
      <button
        className="bg-gray-800 hover:bg-red-800 text-white w-96 h-52 flex items-center justify-center text-2xl rounded-lg"
        onClick={() => navigate("/admin/users")}
      >
        Gestion des utilisateurs
      </button>
      <button
        className="bg-gray-800 hover:bg-red-800 text-white w-96 h-52 flex items-center justify-center text-2xl rounded-lg"
        onClick={() => navigate("/admin/products")}
      >
        Gestion des produits
      </button>
      <button
        className="bg-gray-800 hover:bg-red-800 text-white w-96 h-52 flex items-center justify-center text-2xl rounded-lg"
        onClick={() => navigate("/admin/points")}
      >
        Gestion des points
      </button>
    </div>
  );
};

export default AdminHome;
