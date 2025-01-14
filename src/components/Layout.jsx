
import React from "react";
import { Outlet } from "react-router-dom"; // Permet de rendre les routes enfants
import Navbar from "./Navbar"; // Barre de navigation
import Footer from "./Footer"; // Pied de page (à créer ou personnaliser)
import "../assets/layout.css";

function Layout() {
  return (
    <>
    <div className="layout-container"> 
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal données reçues via Outlet) */}
      <main className="content">
      
        <Outlet />
      </main>

      {/* Pied de page */}
      
      <Footer />
      
      </div> 
    </>
  );
}

export default Layout;
