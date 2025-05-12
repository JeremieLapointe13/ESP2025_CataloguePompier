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
  points: number;
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
    localStorage.setItem(
      "user",
      JSON.stringify({
        idUser: data.idUser,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        points: data.points,
        isAdmin: data.isAdmin,
      })
    );

    return data;
  } catch (error) {
    console.error("Erreur de connexion:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAdmin = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return false;

  const user = JSON.parse(userJson);
  return user.isAdmin === true;
};

export const getUser = () => {
  const userJson = localStorage.getItem("user");
  return userJson ? JSON.parse(userJson) : null;
};

export const getPoints = () => {
  const userJson = localStorage.getItem("user");
  if (!userJson) return 0;

  const user = JSON.parse(userJson);
  return user.points;
};
