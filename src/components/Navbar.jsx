import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/style.css"; 
import "../assets/catalogue.css";




function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Définit l'état de connexion
  const handleLogin = () => {
    setIsLoggedIn(true); // Simule une connexion
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Simule une déconnexion
  };

  return (
    <nav className="navbar">
      {/* Logo et Titre */}
      <div className="logo-container">
        <img src="/upload/logo-mochi-2.png" alt="Logo Mochi" className="nav-logo" />
        <span className="site-title">Mochi Planet</span>
      </div>

      {/* Menu Burger burger ou x */}
      <div className="menu-burger" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i> 
      </div>

      {/* Liens de Navigation  onclick ferme le menu burger*/}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
        <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>

        </li>
        <li>
        <Link to="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</Link>
        </li>
        <li>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Mon Panier</Link>
        </li>
      </ul>

      {/* Icônes de Navigation
      <div className="nav-icons">
        <Link to="/login" className="icon-link">
          <i className="fas fa-user"></i>
        </Link>
      </div> */}
      {/* Bouton Connexion/Déconnexion */}
      <div className="nav-icons">
        {!isLoggedIn ? (
          <button className="btn-login" onClick={handleLogin}>
            <i className="fas fa-user"></i> Connexion
          </button>
        ) : (
          <button className="btn-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Déconnexion
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;

