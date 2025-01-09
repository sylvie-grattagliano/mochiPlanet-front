import React from "react";
import  "../assets/catalogue.css";
import "../assets/style.css";
import { useEffect } from "react";
import { useState } from "react";

function CataloguePage() {
  const [products, setProducts] = useState([]);

  
  
  useEffect(() => {
    // Récupérer les produits depuis l'API
    fetch("http://localhost/mochiPlanet-back/getProducts.php")
    
      .then((result) => result.json())
      .then((data) => setProducts(data));
    
  }, []);
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
          {/* Boutons dynamiques */}
          <a href={`product.php?id=${product.id}`} className="btn-view">
            Voir produit
          </a>
          <button className="btn-add-to-cart">Ajouter au panier</button>
        </div>
      ))}
    </div>
  );
}


export default CataloguePage;
