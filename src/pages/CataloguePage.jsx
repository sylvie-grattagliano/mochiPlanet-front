
import  "../assets/catalogue.css";
import "../assets/style.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const CataloguePage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Appel à l'API pour récupérer les produits
    fetch("http://localhost/mochiPlanet-back/getProducts.php", {
      method: "GET",
      credentials: "include", // Pour inclure les cookies
    })
      .then((response) => {
        console.log("Réponse brute :", response);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données reçues :", data);
        if (data.success === false) {
          throw new Error(data.error || "Erreur lors de la récupération des produits.");
        }
        setProducts(data); // Stocke les produits dans le state
      })
      .catch((err) => {
        // console.error("Erreur lors de l'appel API :", err);
        setError(err.message);
      });
  }, []);


  
  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter des produits au panier.");
      return;
    }

    try {
      const response = await fetch("http://localhost/mochiPlanet-back/api/cart/add.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Produit ajouté au panier !");
      } else {
        alert("Erreur lors de l'ajout au panier : " + data.error);
      }
    } catch (error) {
      console.error("Erreur API :", error);
    }
  };
  

  // if (error) return <p>{error}</p>;



  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card"
          data-id={product.id}
          data-name={product.name}
          data-price={product.price}
        >
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            <strong>{Number(product.price).toFixed(2)} €</strong>
          </p>
          {/* <button onClick={() => console.log("Ajout au panier :", product.id)}> */}
          <button onClick={() => handleAddToCart(product.id)}>Ajouter au panier</button>
              
          {/* Boutons dynamiques */}
          {/* // <a href={`product.php?id=${product.id}`} className="btn-view">
          //   Voir produit
          // </a>a voir pagedetail */}
          {/* <button className="btn-add-to-cart">Ajouter au panier</button> */}
        </div>
      ))}
    </div>
  );
}


export default CataloguePage;
