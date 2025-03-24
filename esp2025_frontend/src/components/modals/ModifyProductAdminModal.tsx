import React from "react";
import {
  mockSizes,
  mockFabricTypes,
  mockCategories,
  type Product,
} from "../../mocks/mock";

interface ModifyProductModalProps {
  onClose: () => void;
  onSubmit: () => void;
  product: Product;
}

const ModifyProductModal: React.FC<ModifyProductModalProps> = ({
  onClose,
  onSubmit,
  product,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Modifier un produit</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            onClose();
          }}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Nom du produit"
            defaultValue={product.name}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Points"
            defaultValue={product.points}
            className="w-full p-2 border rounded"
          />

          <select
            className="w-full p-2 border rounded"
            defaultValue={product.categoryId}
          >
            <option value="">Sélectionner une catégorie</option>
            {mockCategories
              .flatMap(
                (category) =>
                  category.subcategories?.flatMap((subcat) =>
                    subcat.subcategories ? subcat.subcategories : [subcat]
                  ) || []
              )
              .map((cat) => (
                <option key={cat.idCategory} value={cat.idCategory}>
                  {cat.name}
                </option>
              ))}
          </select>

          <select
            className="w-full p-2 border rounded"
            defaultValue={product.sizeId}
          >
            <option value="">Sélectionner une taille</option>
            {mockSizes.map((size) => (
              <option key={size.idSize} value={size.idSize}>
                {size.status}
              </option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded"
            defaultValue={product.fabricTypeId}
          >
            <option value="">Sélectionner un type de tissu</option>
            {mockFabricTypes.map((fabricType) => (
              <option
                key={fabricType.idFabricType}
                value={fabricType.idFabricType}
              >
                {fabricType.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Numéro de produit"
            defaultValue={product.productNo}
            className="w-full p-2 border rounded"
          />

          <textarea
            placeholder="Description"
            defaultValue={product.description}
            className="w-full p-2 border rounded h-24"
          ></textarea>

          <input
            type="text"
            placeholder="URL de l'image (optionnel)"
            defaultValue={product.imageURL || ""}
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="Fournisseur"
            defaultValue={product.supplier}
            className="w-full p-2 border rounded"
          />

          <input
            type="number"
            placeholder="Quantité"
            defaultValue={product.quantity}
            className="w-full p-2 border rounded"
          />

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={product.isActive}
              />
              Actif
            </label>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-red-800"
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyProductModal;
