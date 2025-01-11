import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      fetch("http://localhost/mochiPlanet-back/api/cart/view.php", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCart(data.data);
          } else {
            console.error("Erreur lors de la récupération du panier :", data.error);
          }
        })
        .catch((error) => console.error("Erreur API :", error));
    }
  }, [user]);

  const handleUpdateQuantity = async (productId, delta) => {
    try {
      const response = await fetch("http://localhost/mochiPlanet-back/api/cart/update.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity_delta: delta }),
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data); // Rechargez les données du panier
      } else {
        console.error("Erreur lors de la mise à jour de la quantité :", data.error);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost/mochiPlanet-back/api/cart/remove.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId }),
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.data);
      } else {
        console.error("Erreur lors de la suppression :", data.error);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;

  if (!user) return <p>Veuillez vous connecter pour accéder à votre panier.</p>;

  return (
    <div className="cart-page">
      <h2>Bienvenue, {user.name} !</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>Prix : {item.price.toFixed(2)} €</p>
              <p>Quantité : {item.quantity}</p>
              <button onClick={() => handleUpdateQuantity(item.id, -1)}>-</button>
              <button onClick={() => handleUpdateQuantity(item.id, 1)}>+</button>
              <button onClick={() => handleRemoveFromCart(item.id)}>Supprimer</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
