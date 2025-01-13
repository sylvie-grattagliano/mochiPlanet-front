// import React from "react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/style.css";



const Navbar = () => {
  const { user, logout } = useAuth(); // Récupérer l'utilisateur connecté et la fonction logout depuis AuthContext
  const navigate = useNavigate(); // Permet la navigation programmatique
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu burger
  const handleLogout = async () => {
    // Appeler l'API de déconnexion si nécessaire et mettre à jour l'état
    logout();
    navigate("/"); // Rediriger vers la page d'accueil
  };
  const toggleMenu = () => {
    console.log("Menu burger cliqué !");
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
        <i className="fas fa-bars"></i>
      </div>
      
      {/* Liens de navigation */}
      <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
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


      {/* Bouton Connexion/Déconnexion */}
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
