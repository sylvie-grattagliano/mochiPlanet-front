import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth(); // Récupérer user et logout depuis le contexte
  const navigate = useNavigate(); // Pour naviguer vers d'autres pages

  const handleLogout = () => {
    logout(); // Déconnecter l'utilisateur
    navigate("/"); // Rediriger vers la page d'accueil
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/upload/logo-mochi-2.png" alt="Logo Mochi" className="nav-logo" />
        <span className="site-title">Mochi Planet</span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/catalogue">Catalogue</Link>
        </li>
        <li>
          <Link to="/cart">Mon Panier</Link>
        </li>
      </ul>

      <div className="nav-icons">
        {user ? (
          // Bouton Déconnexion pour les utilisateurs connectés
          <button className="btn-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        ) : (
          // Bouton Connexion pour les utilisateurs non connectés
          <button className="btn-login" onClick={() => navigate("/login")}>
            <i className="fas fa-user"></i> Connexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
