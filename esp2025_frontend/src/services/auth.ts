const API_URL = process.env.REACT_APP_API_URL;

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  idUser: number;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  expiration: string;
}

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la connexion");
    }

    const data = await response.json();

    // Stocker le token dans le localStorage
    localStorage.setItem("token", data.token);

    return data;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
