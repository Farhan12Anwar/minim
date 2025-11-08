import React from 'react';
import './styles/Header.css';
import { FaShoppingCart } from "react-icons/fa";

function Header() {
  return (
    <header className="header minimal-header custom-header">
      <div className="header-left">
       <a href="/" class="logo">minim</a>
      </div>
      <nav className="minimal-nav custom-nav">
        <a href="/" className="active">HOME</a>
        <a href="/contact">CONTACT</a>
        <a href="/cart" className="right-link flex items-center gap-2">
  CART
  <FaShoppingCart size={20} />
</a>
      </nav>
    </header>
  );
}

export default Header;
