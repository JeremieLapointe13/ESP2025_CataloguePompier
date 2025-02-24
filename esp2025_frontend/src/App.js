import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Utiliser l'URL publique de votre API
    fetch("https://api-esp2025.jeremielapointe.ca/api/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erreur HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des utilisateurs pistouille le magnifique gyat</h1>
      {loading && <p>Chargement en cours...</p>}
      {error && <p style={{ color: "red" }}>Erreur: {error}</p>}
      {!loading && !error && users.length === 0 && (
        <p>Aucun utilisateur trouvé</p>
      )}
      {users.map((user) => (
        <div key={user.idUser}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
}

export default App;
