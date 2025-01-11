import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/login.css"; // Assurez-vous que le fichier CSS est inclus

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Gestion des erreurs
  const { login } = useAuth();
  const navigate = useNavigate();

  

    const handleLogin = async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
  
      try {
        const response = await fetch("http://localhost/mochiPlanet-back/api/users/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Inclure les cookies
          body: JSON.stringify({ email, password }), // Envoyer les données au backend
        });
  
        const data = await response.json(); // Convertir la réponse en JSON
  
        console.log(data); // Debug : Vérifier la réponse API
  
        if (data.success) {
          login(data.user); // Met à jour le contexte avec l'utilisateur connecté
          navigate("/catalogue"); // Redirige vers la page Catalogue
        } else {
          setError(data.error || "Connexion échouée."); // Affiche une erreur en cas d'échec
        }
      } catch (error) {
        setError("Erreur lors de la connexion."); // Erreur réseau ou serveur
        console.error("Erreur API :", error); // Debug : Vérifier l'erreur dans la console
      }
    };
  

  return (
    <div className="login-container">
      <h1>Connexion</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" // Autocomplétion pour l'email
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-login">
          Se connecter
        </button>
      </form>

      {/* Message d'erreur si la connexion échoue */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;
