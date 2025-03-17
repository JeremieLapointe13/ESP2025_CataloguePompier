import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaClipboardList,
  FaDollarSign,
} from "react-icons/fa";
// @ts-ignore
import logoServiceIncendie from "../../assets/serviceIncendie.png";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDropdown = (): void => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogoClick = (): void => {
    navigate("/catalogue");
  };

  const handleCartClick = (): void => {
    navigate("/panier");
  };

  return (
    <header className="w-full bg-white shadow-sm py-3 px-4 border-b border-black">
      <div className="flex items-center justify-between">
        {/* Gauche du header */}
        <div className="flex items-center space-x-2">
          <img
            src={logoServiceIncendie}
            alt="Service Incendie RDL"
            className="h-8 cursor-pointer"
            onClick={handleLogoClick}
          />
          <span
            className="text-lg font-semibold cursor-pointer"
            onClick={handleLogoClick}
          >
            Service Incendie RDL
          </span>
        </div>

        {/* Droite du header */}
        <div className="flex items-center space-x-4">
          <button className="p-1" onClick={handleCartClick}>
            {React.createElement(FaShoppingCart, { className: "text-2xl" })}
          </button>

          <div className="relative">
            <button onClick={toggleDropdown} className="p-1">
              {React.createElement(FaUserCircle, { className: "text-2xl" })}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 whitespace-nowrap rounded shadow-md border bg-white">
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
                  {React.createElement(FaClipboardList, { className: "mr-2" })}
                  Mes commandes
                </a>
                <a
                  href="#profile"
                  className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
                >
                  {React.createElement(FaDollarSign, { className: "mr-2" })}
                  Mes points
                </a>
                <a
                  href="#logout"
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
    </header>
  );
};

export default Header;
