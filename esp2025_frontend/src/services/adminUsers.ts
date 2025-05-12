const API_URL = process.env.REACT_APP_API_URL;

export interface User {
  idUser: number;
  gradeId: number | null;
  email: string;
  ville: string;
  province: string;
  pays: string;
  noMatricule: number;
  firstName: string;
  lastName: string;
  points: number;
  isAdmin: boolean;
  isActive: boolean;
  password?: string;
  gradeNom?: string;
}

export interface CreateUserDto {
  gradeId: number | null;
  email: string;
  ville: string;
  province: string;
  pays: string;
  noMatricule: number;
  firstName: string;
  lastName: string;
  points: number;
  isAdmin: boolean;
  isActive: boolean;
  password: string;
}

export interface UpdateUserDto {
  idUser: number;
  gradeId: number | null;
  email: string;
  ville: string;
  province: string;
  pays: string;
  noMatricule: number;
  firstName: string;
  lastName: string;
  points: number;
  isAdmin: boolean;
  isActive: boolean;
}

export interface ModifyStatusUserDto {
  idUser: number;
  isActive: boolean;
}

// GetAllUsers
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des utilisateurs");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getAllUsers:", error);
    throw error;
  }
};

// GetUserById
export const getUserById = async (userId: number): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'utilisateur");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    throw error;
  }
};

// CreaterUser
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Erreur lors de la création de l'utilisateur"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans createUser:", error);
    throw error;
  }
};

// DeleteUser
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'utilisateur");
    }
  } catch (error) {
    console.error("Erreur dans deleteUser:", error);
    throw error;
  }
};

// ModifyStatusUser
export const modifyUserStatus = async (
  userId: number,
  isActive: boolean
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idUser: userId, isActive }),
    });

    if (!response.ok) {
      throw new Error(
        "Erreur lors de la modification du statut de l'utilisateur"
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur dans modifyUserStatus:", error);
    throw error;
  }
};

// UpdateUser
export const updateUser = async (
  userId: number,
  userData: UpdateUserDto
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    // Vérifier simplement si la réponse est ok
    if (!response.ok) {
      throw new Error(
        `Erreur lors de la mise à jour de l'utilisateur: ${response.status}`
      );
    }

    // Récupérer et parser la réponse
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as User);
  } catch (error) {
    console.error("Erreur dans updateUser:", error);
    throw error;
  }
};
