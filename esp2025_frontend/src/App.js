import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7063/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des utilisateurs MOUAHAHAHAHAHA</h1>
      {users.map((user) => (
        <div key={user.idUser}>
          {user.firstName} {user.lastName}
        </div>
      ))}
    </div>
  );
}

export default App;
