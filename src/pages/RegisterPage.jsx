import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../assets/register.css"; // Utilisez un CSS spécifique pour l'inscription
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const { login } = useAuth(); // Optionnel : Connectez l'utilisateur après inscription
  const navigate = useNavigate();

  // Gestion des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Gestion de l'inscription
  const handleRegister = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(null); // Réinitialise les erreurs

    // Vérification des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost/mochiPlanet-back/api/users/register.php", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // pour inclure les cookies
          body: JSON.stringify({
            name: formData.name,
            first_name: formData.first_name,
            email: formData.email,
            password: formData.password,
          }), // Envoie les données utilisateur
        }
      );

      const data = await response.json(); // pour avoir la réponse  en JSON

      if (data.success) {
        // Connecte l'utilisateur après inscription (optionnel)
        login(data.user);

        // Redirige l'utilisateur
        navigate("/catalogue"); // Redirige vers le catalogue après inscription
      } else {
        // Affiche le message d'erreur renvoyé par l'API
        setError(data.message || "Inscription échouée.");
      }
    } catch (error) {
      setError("Erreur lors de l'inscription. Veuillez réessayer.");
      console.error("Erreur API :", error); // Debug
    }
  };

  return (
    <div className="register-container">
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="first_name">Prénom :</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Prénom"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmez le mot de passe :</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmez le mot de passe"
            required
          />
        </div>
        <button type="submit" className="btn-register">
          S'inscrire
        </button>
      </form>

      {/* Affichage des erreurs */}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RegisterPage;


