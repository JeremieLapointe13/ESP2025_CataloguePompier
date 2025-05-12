import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      <p className="text-lg">Bienvenue sur votre profil !</p>
      <p className="text-lg">
        Ici, vous pouvez gérer vos informations personnelles.
      </p>
    </div>
  );
};

export default Profile;
