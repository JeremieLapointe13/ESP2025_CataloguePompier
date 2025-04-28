const API_URL = process.env.REACT_APP_API_URL;

// Produits généraux
export interface Product {
  idProduct: number;
  categoryId: number;
  supplierId: number;
  sizeId: number;
  fabricTypeId: number | null;
  productNo: string;
  name: string;
  points: number;
  description: string | null;
  imageURL: string | null;
  isActive: boolean;
  quantity: number;
  categoryName?: string;
  supplierName?: string;
  sizeStatus?: string;
  fabricTypeName?: string;
}

// Interface pour créer un produit
export interface CreateProductDto {
  categoryId: number;
  supplierId: number;
  sizeId: number;
  fabricTypeId: number | null;
  productNo: string;
  name: string;
  points: number;
  description: string | null;
  imageURL: string | null;
  isActive: boolean;
  quantity: number;
}

// GetAllProducts
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des produits");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getAllProducts:", error);
    throw error;
  }
};

// GetProductById
export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération du produit");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getProductById:", error);
    throw error;
  }
};

// CreateProduct
export const createProduct = async (
  productData: CreateProductDto
): Promise<Product> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création du produit"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans createProduct:", error);
    throw error;
  }
};

// UpdateProduct
export const updateProduct = async (
  productId: number,
  productData: Product
): Promise<Product> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la mise à jour du produit"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans updateProduct:", error);
    throw error;
  }
};

// DeleteProduct
export const deleteProduct = async (productId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du produit");
    }
  } catch (error) {
    console.error("Erreur dans deleteProduct:", error);
    throw error;
  }
};
