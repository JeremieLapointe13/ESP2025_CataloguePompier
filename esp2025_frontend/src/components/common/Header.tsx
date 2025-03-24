import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaDollarSign,
  FaUserTie,
} from "react-icons/fa";
// @ts-ignore
import logoServiceIncendie from "../../assets/serviceIncendie.png";
import Points from "../modals/PointsModal";

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [pointsModalOpen, setPointsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 border-b border-black">
      <div className="flex items-center justify-between">
        {/* Gauche du header */}
        <div className="flex items-center space-x-2">
          <img
            src={logoServiceIncendie}
            alt="Service Incendie RDL"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/catalogue")}
          />
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={() => navigate("/catalogue")}
          >
            Service Incendie RDL
          </span>
        </div>

        {/* Droite du header */}
        <div className="flex items-center space-x-4">
          <button className="p-1" onClick={() => navigate("/admin")}>
            {React.createElement(FaUserTie, { className: "text-2xl" })}
          </button>
          <button className="p-1" onClick={() => navigate("/panier")}>
            {React.createElement(FaShoppingCart, { className: "text-2xl" })}
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-1"
            >
              {React.createElement(FaUserCircle, { className: "text-2xl" })}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 whitespace-nowrap rounded shadow-md border bg-white z-10">
                <a
                  href="#profile"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  {React.createElement(FaUser, { className: "mr-2" })}
                  Mon profil
                </a>
                <a
                  href="#orders"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  {React.createElement(FaClipboardList, {
                    className: "mr-2",
                  })}
                  Mes commandes
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPointsModalOpen(true);
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  {React.createElement(FaDollarSign, { className: "mr-2" })}
                  Mes points
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/login");
                  }}
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  {React.createElement(FaSignOutAlt, { className: "mr-2" })}
                  Déconnexion
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      {pointsModalOpen && <Points onClose={() => setPointsModalOpen(false)} />}
    </header>
  );
};

export default Header;
