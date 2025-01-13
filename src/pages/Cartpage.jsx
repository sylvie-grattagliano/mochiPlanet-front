import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import  "../assets/cart2.css";

const CartPage = () => {
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    if (user) {
      fetch("http://localhost/mochiPlanet-back/api/cart/view.php", {
        method: "GET",
        credentials: "include", // Inclure les cookies
      })
        .then((response) => {
          // Vérifiez si la réponse HTTP est correcte
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
          return response.json(); // Convertir en JSON
        })
        .then((data) => {
          console.log("Données reçues :", data);
          // Vérifiez si l'API retourne un succès
          if (data.success) {
            setCart(data.data); // Charger les données dans le panier
          } else {
            throw new Error(data.error || "Erreur inconnue lors de la récupération des produits.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du panier :", error);
          alert("Impossible de charger votre panier. Veuillez réessayer plus tard.");
        });
    }
  }, [user]);
  
const handleUpdateQuantity = async (productId, delta) => {
  try {
    console.log(`Updating quantity for product ID: ${productId}, Delta: ${delta}`);
    const response = await fetch("http://localhost/mochiPlanet-back/api/cart/update.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ product_id: productId, quantity_delta: delta }),
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (data.success) {
      setCart(data.data); // Met à jour le panier dans le state
      console.log("Updated Cart State:", data.data);
    } else {
      console.error("Error updating quantity:", data.error);
    }
  } catch (error) {
    console.error("Error during update:", error);
  }
};

const handleRemoveFromCart = async (productId) => {
  try {
    console.log(`Removing product with ID: ${productId}`);
    const response = await fetch("http://localhost/mochiPlanet-back/api/cart/remove.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ product_id: productId }),
    });

    const data = await response.json();
    console.log("Server Response:", data);

    if (data.success) {
      setCart(data.data); // Met à jour le panier dans le state
      console.log("Updated Cart State after removal:", data.data);
    } else {
      console.error("Error removing product:", data.error);
    }
  } catch (error) {
    console.error("Error during removal:", error);
  }
};
  // Calculer le total du panier
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };


  if (loading) return <p>Chargement...</p>;

  if (!user) return <p>Veuillez vous connecter pour accéder à votre panier.</p>;

  return (
    <div className="cart-table">
  <div className="cart-header">
    <span>Image</span>
    <span>Nom du produit</span>
    <span>Prix unitaire</span>
    <span>Quantité</span>
    <span>Total</span>
    <span>Action</span>
  </div>
  {cart.map((item) => (
    <div key={item.id} className="cart-row">
      <img src={item.image} alt={item.name} className="cart-image" />
      <span>{item.name}</span>
      <span>{Number(item.price).toFixed(2)} €</span>
      <div className="cart-quantity">
        <button
          onClick={() => handleUpdateQuantity(item.product_id, -1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => handleUpdateQuantity(item.product_id, 1)}>+</button>
      </div>
      <span>{(item.price * item.quantity).toFixed(2)} €</span>
      <button
        onClick={() => handleRemoveFromCart(item.product_id)}
        className="btn-remove"
      >
        Supprimer
      </button>
    </div>
  ))}
  <div className="cart-total">
    <span>Total à payer :</span>
    <span>{calculateTotal()} €</span>
  </div>
</div>
  );
};

export default CartPage;