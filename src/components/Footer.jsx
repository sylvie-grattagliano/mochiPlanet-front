import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../assets/footer.css"; deja dans layout



function Footer () {

    return (

        <footer className="footer">
    <div className="footer-content">
    <span className="footer-year">© 2025 Mochi Planet</span>
        <Link to="/about.php" className="footer-link">À propos</Link>
        
    </div>
</footer>
    );


}

export default Footer;