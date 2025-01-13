import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Vérifie si une session est active
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost/mochiPlanet-back/api/users/session.php", {
          method: "POST",
          credentials: "include", // Nécessaire pour inclure les cookies
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user); // Mettre à jour l'utilisateur connecté
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de la session :", error);
      }
    };

    checkSession();
  }, []);

  // Fonction pour se connecter
  const login = (user) => {
    setUser(user);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
