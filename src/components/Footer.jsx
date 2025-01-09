import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/footer.css"; 



function Footer () {

    return (

        <footer class="footer">
    <div class="footer-content">
    <span class="footer-year">© 2025 Mochi Planet</span>
        <Link to="/about.php" class="footer-link">À propos</Link>
        
    </div>
</footer>
    );


}

export default Footer;