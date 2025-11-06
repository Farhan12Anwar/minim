import React from 'react';
import './styles/Header.css';

function Header() {
  return (
    <header className="header minimal-header custom-header">
      <div className="header-left">
       <a href="/" class="logo">minim</a>
      </div>
      <nav className="minimal-nav custom-nav">
        <a href="/" className="active">HOME</a>
        <a href="/contact">CONTACT</a>
        <a href="/cart" className="right-link">CART</a>
      </nav>
    </header>
  );
}

export default Header;
