// import React from "react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // Récupération de l'utilisateur et fonction logout
  const navigate = useNavigate(); // Navigation programmatique
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger

  // Gérer la déconnexion
  const handleLogout = () => {
    logout(); // Déconnecter l'utilisateur via AuthContext
    navigate("/"); // Rediriger vers la page d'accueil
  };

  // Gérer l'ouverture/fermeture du menu burger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Logo et Titre */}
      <div className="logo-container">
        <img src="/upload/logo-mochi-2.png" alt="Logo Mochi" className="nav-logo" />
        <span className="site-title">Mochi Planet</span>
      </div>

      {/* Menu burger */}
      <div className="menu-burger" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* Liens de navigation */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
        </li>
        <li>
          <Link to="/catalogue" onClick={() => setIsMenuOpen(false)}>Catalogue</Link>
        </li>
        <li>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Mon Panier</Link>
        </li>
      </ul>

      {/* Bouton Connexion/Déconnexion */}
<div className="nav-icons">
  {user ? (
    <div className="user-menu">
      {/* Message Bienvenue pour l'utilisateur connecté */}
      <span className="welcome-message">Bienvenue, {user.first_name} !</span>
      <button className="btn-logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i> Déconnexion
      </button>
    </div>
  ) : (
    <div className="guest-menu">
      {/* Afficher les boutons Connexion et Inscription */}
      <button className="btn-login" onClick={() => navigate("/login")}>
        <i className="fas fa-user"></i> Connexion
      </button>
      <button className="btn-register" onClick={() => navigate("/register")}>
        <i className="fas fa-user-plus"></i> S'inscrire
      </button>
    </div>
  )}
</div>
    </nav>
  );
};

export default Navbar;
