const API_URL = process.env.REACT_APP_API_URL;

// Interfaces
export interface Size {
  idSize: number;
  status: string;
}

export interface FabricType {
  idFabricType: number;
  name: string;
}

export interface Category {
  idCategory: number;
  name: string;
  parentId: number | null;
  level: number;
  description: string;
  subcategories?: Category[];
}

export interface Grade {
  idGrade: number;
  nomGrade: string;
}

// Fonction helper pour les requêtes GET
const fetchWithAuth = async (endpoint: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Non authentifié");
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return await response.json();
};

// Méthode pour récupérer toutes les tailles
export const getAllSizes = async (): Promise<Size[]> => {
  try {
    return await fetchWithAuth("/api/sizes");
  } catch (error) {
    console.error("Erreur dans getAllSizes:", error);
    throw error;
  }
};

// Méthode pour récupérer tous les types de tissus
export const getAllFabricTypes = async (): Promise<FabricType[]> => {
  try {
    return await fetchWithAuth("/api/fabrictypes");
  } catch (error) {
    console.error("Erreur dans getAllFabricTypes:", error);
    throw error;
  }
};

// Méthode pour récupérer toutes les catégories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    return await fetchWithAuth("/api/categories");
  } catch (error) {
    console.error("Erreur dans getAllCategories:", error);
    throw error;
  }
};

// Méthode pour récupérer tous les grades
export const getAllGrades = async (): Promise<Grade[]> => {
  try {
    return await fetchWithAuth("/api/grades");
  } catch (error) {
    console.error("Erreur dans getAllGrades:", error);
    throw error;
  }
};
