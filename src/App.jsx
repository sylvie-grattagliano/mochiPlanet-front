
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"; 
import CataloguePage from "./pages/CataloguePage";


function App() {
 

  return (
  
    <>
    
      <Router>
      {/* <Navbar />
      <Footer /> */}
      
      <Routes>
        {/* Route parent avec Layout */}
        <Route path="/" element={<Layout />}>
        {/* <Route path="/" element={<h1></h1>}>  */}
        <Route index element={<HomePage />} />
        <Route path="catalogue" element={<CataloguePage />} /> 
          <Route path="/cart" element={<h1>Mon Panier</h1>} />
          <Route path="/login" element={<h1>Connexion</h1>} /> 
          {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        </Route>
      </Routes>
      
    </Router>



  

</>

    
 )
} 

export default App
