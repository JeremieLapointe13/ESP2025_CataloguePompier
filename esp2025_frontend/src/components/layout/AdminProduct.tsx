import React, { useState } from "react";
import {
  mockProducts,
  mockSizes,
  type Product,
  type Size,
} from "../../mocks/mock";
import AddProductModal from "../modals/AddProductAdminModal";
import ModifyProductModal from "../modals/ModifyProductAdminModal";

const AdminProduct: React.FC = () => {
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [modifyProductModalOpen, setModifyProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleModify = (product: Product) => {
    setSelectedProduct(product);
    setModifyProductModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* En-tête du tableau */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold">Gestion des produits</h2>
          <button
            className="bg-gray-800 hover:bg-red-800 text-white px-4 py-2 rounded"
            onClick={() => setAddProductModalOpen(true)}
          >
            Ajouter
          </button>
        </div>

        {/* Tableau */}
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Nom du produit</th>
              <th className="px-6 py-3 text-left">Points</th>
              <th className="px-6 py-3 text-left">Grandeur</th>
              <th className="px-6 py-3 text-left">Quantité</th>
              <th className="px-6 py-3 text-left">Actif</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product: Product) => (
              <tr key={product.idProduct} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.points}</td>
                <td className="px-6 py-4">
                  {
                    mockSizes.find((s: Size) => s.idSize === product.sizeId)
                      ?.status
                  }
                </td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">
                  <input type="checkbox" checked={product.isActive} readOnly />
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="bg-gray-800 hover:bg-red-800 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleModify(product)}
                  >
                    Modifier
                  </button>
                  <button className="bg-red-800 hover:bg-gray-800 text-white px-3 py-1 rounded">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addProductModalOpen && (
        <AddProductModal
          onClose={() => setAddProductModalOpen(false)}
          onSubmit={() => {}}
        />
      )}
      {modifyProductModalOpen && (
        <ModifyProductModal
          onClose={() => setModifyProductModalOpen(false)}
          onSubmit={() => {}}
          product={selectedProduct as Product}
        />
      )}
    </div>
  );
};

export default AdminProduct;
