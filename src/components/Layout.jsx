
import React from "react";
import { Outlet } from "react-router-dom"; // Permet de rendre les routes enfants
import Navbar from "./Navbar"; // Barre de navigation
import Footer from "./Footer"; // Pied de page (à créer ou personnaliser)

function Layout() {
  return (
    <>
      {/* Barre de navigation */}
      <Navbar />

      {/* Contenu principal données reçues via Outlet) */}
      <main>
        <Outlet />
      </main>

      {/* Pied de page */}
      <Footer />
    </>
  );
}

export default Layout;
