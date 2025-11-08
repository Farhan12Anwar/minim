import React from 'react'; 
import { Link } from 'react-router-dom';
import './styles/Header.css';
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  return (
    <header className="header minimal-header custom-header">
      <div className="header-left">
        <Link to="/" className="logo">minim</Link>
      </div>
      <nav className="minimal-nav custom-nav">
        <Link to="/" className="active">HOME</Link>
        <Link to="/contact">CONTACT</Link>
        <Link to="/cart" className="right-link flex items-center gap-2">
          CART
          <FaShoppingCart size={20} />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
