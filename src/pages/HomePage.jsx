

import React from "react";
import "../assets/style.css"; 

function HomePage() {
  return (
    <main>
      {/* Section Hero */}
      <section className="hero">
        <img src="upload/mochi2.jpg" alt="Image Hero" className="hero-image" />
        <div className="hero-content">
          <h1>Bienvenue sur Mochi Planet</h1>
          <p>Découvrez nos Mochis artisanaux pour toutes vos envies sucrées!</p>
        </div>
      </section>

      {/* Section Produits */}
      <div className="produit-mois">
        <h2>Produits du mois</h2>
      </div>

      <section className="product-list">
        <div className="product-grid">
          {/* Produit 1 */}
          <div className="product-card" data-id="1" data-name="Mochi vanille" data-price="2.50">
            <img src="upload/mochi1.jpg" alt="Mochi vanille" />
            <h3>Mochi le Parfait</h3>
            <p>Prix : 2.50 €</p>
            <button className="btn-add-to-cart">Ajouter au panier</button>
            <a href="product.php?id=1" className="btn-view">Voir produit</a>
          </div>

          {/* Produit 2 */}
          <div className="product-card" data-id="2" data-name="Mochi Matcha" data-price="3.00">
            <img src="upload/mochi2.jpg" alt="Mochi Matcha" />
            <h3>Mochi le bonheur</h3>
            <p>Prix : 3.00 €</p>
            <button className="btn-add-to-cart">Ajouter au panier</button>
            <a href="product.php?id=2" className="btn-view">Voir produit</a>
          </div>

          {/* Produit 3 */}
          <div className="product-card" data-id="3" data-name="Dango" data-price="3.50">
            <img src="upload/dango1.jpg" alt="Dango" />
            <h3>Dango</h3>
            <p>Prix : 3.50 €</p>
            <button className="btn-add-to-cart">Ajouter au panier</button>
            <a href="product.php?id=3" className="btn-view">Voir produit</a>
          </div>
        </div>
      </section>

      {/* <a href="cart.php" className="btn-floating-cart">🛒 Voir le Panier</a> */}
    </main>
  );
}

export default HomePage;
