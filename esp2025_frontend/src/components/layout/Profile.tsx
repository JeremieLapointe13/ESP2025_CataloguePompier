import React from "react";
import { getUser } from "../../services/auth";

const Profile: React.FC = () => {
  // Récupérer les informations de l'utilisateur
  const userInfo = getUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
            Mon Profil
          </h1>
        </div>

        {userInfo ? (
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 text-center border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {userInfo.firstName} {userInfo.lastName}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {userInfo.email}
              </p>
            </div>

            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">
                    Points
                  </div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {userInfo.points}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <div className="text-sm font-medium text-gray-500">Rôle</div>
                  <div className="mt-1 text-lg font-semibold text-gray-900">
                    {userInfo.isAdmin ? "Administrateur" : "Utilisateur"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
            <p className="text-gray-500">
              Connectez-vous pour voir votre profil
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
