import React, { useState, useEffect } from "react";
import { mockSizes, type Size } from "../../mocks/mock";
import AddProductModal from "../modals/AddProductAdminModal";
import ModifyProductModal from "../modals/ModifyProductAdminModal";
import {
  getAllProducts,
  deleteProduct,
  Product,
} from "../../services/adminProducts";

const AdminProduct: React.FC = () => {
  const [addProductModalOpen, setAddProductModalOpen] = useState(false);
  const [modifyProductModalOpen, setModifyProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Erreur lors de la récupération des produits");
      console.error("Erreur dans fetchProducts:", err);
    }
  };

  const handleModify = (product: Product) => {
    setSelectedProduct(product);
    setModifyProductModalOpen(true);
  };

  const handleDelete = async (productId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await deleteProduct(productId);
        fetchProducts();
      } catch (err) {
        setError("Erreur lors de la suppression du produit");
        console.error("Erreur dans handleDelete:", err);
      }
    }
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([...products, newProduct]);
    setAddProductModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((product) =>
        product.idProduct === updatedProduct.idProduct
          ? updatedProduct
          : product
      )
    );
    setModifyProductModalOpen(false);
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

        {error && (
          <div className="p-4 text-red-700 bg-red-100 border border-red-200">
            {error}
          </div>
        )}

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
            {products.map((product: Product) => (
              <tr key={product.idProduct} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.points}</td>
                <td className="px-6 py-4">
                  {product.sizeStatus ||
                    mockSizes.find((s: Size) => s.idSize === product.sizeId)
                      ?.status}
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
                  <button
                    className="bg-red-800 hover:bg-gray-800 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(product.idProduct)}
                  >
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
          onSubmit={handleAddProduct}
        />
      )}
      {modifyProductModalOpen && selectedProduct && (
        <ModifyProductModal
          onClose={() => setModifyProductModalOpen(false)}
          onSubmit={handleUpdateProduct}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default AdminProduct;
