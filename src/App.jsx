
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Layout avec Navbar
import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext"; // Fournisseur d'authentification
import CartPage from "./pages/CartPage"; // Importer la page Panier
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route parent avec Layout */}
          <Route path="/" element={<Layout />}>
            {/* Pages enfants */}
            <Route index element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/cart" element={<CartPage />} /> 
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
