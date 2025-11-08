import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './styles/HomePage.css';
import Footer from './Footer';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';

const FILTERS = ["All", "Shirt", "Pants", "Shorts", "Caps", "Shoes"];

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      });
  }, []);

  function handleAddToCart(e, product) {
    e && e.preventDefault(); // Prevent navigation on buttons within links
    addToCart(product).then(() => {
      setToast('Added to cart!');
      setTimeout(() => setToast(''), 1500);
    });
  }

  const filteredProducts = filter === "All"
    ? products
    : products.filter(prod => prod.type === filter);

  return (
    <div className="minimal-home-page">
      <Header />
      <main className="homepage-main">
        <section className="hero-home animated-fade">
          <h1 className="hero-title">Discover Fresh Styles</h1>
          <p className="hero-subtitle">From office essentials to weekend outfits. All-day comfort, timeless look.</p>
          <a href="/shop" className="hero-cta animated-btn">Explore Clothing</a>
        </section>
        <div className="filters-row">
          {FILTERS.map(type => (
            <button
              key={type}
              className={`filter-btn animated-btn${filter === type ? " filter-active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <h2 className="section-title animated-fade">Featured Clothing</h2>
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="minimal-product-card animated-card product-card-link"
              style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
            >
              <div className="minimal-product-img-box">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="minimal-product-info">
                <h3 className="card-title">{product.name}</h3>
                <p className="card-desc">{product.description}</p>
                {/* Price higher in info block */}
                <div className="price-row" style={{ marginTop: 10, marginBottom: 0 }}>
                  <span className="price-text">${product.price}</span>
                </div>
              </div>
              {/* Add to Cart fixed at bottom */}
              <button
                className="maincard-add-btn"
                onClick={e => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </Link>
          ))}
        </div>
        {toast && <div className="minimal-toast">{toast}</div>}
      </main>

      <section className="recommended-section">
        <h2 className="recommended-title">Our Best Seller</h2>
        <div className="recommended-grid">
          {products.slice(0, 3).map(product => (
            <div
              className="recommended-card"
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <div className="recommended-img-box square-img-box">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="recommended-info">
                <h3 className="recommended-name">{product.name}</h3>
                <p className="recommended-desc">{product.description}</p>
              </div>
              <div className="recommended-footer">
                <span className="price-tag">${product.price}</span>
                <span className="recommended-type">{product.type}</span>
              </div>
              <button
                className="rec-add-btn"
                onClick={e => {
                  e.stopPropagation();
                  handleAddToCart(e, product);
                }}
              >
                Add to Cart
              </button>
              <span className="rec-badge">★ Top Pick</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO/LIFESTYLE Section */}
      <section className="promo-section">
        <div className="promo-container">
          <div className="promo-image-col">
            <img
              src="promo.png"
              alt="Clothify Promo"
              className="promo-img spilling-img"
            />
          </div>
          <div className="promo-text-col">
            <h2 className="promo-title">Stay In Style</h2>
            <p className="promo-desc">
              Get the latest style updates.Sign Up to get 30% off on your first order.
            </p>
           
         <form
  className="footer-subscribe-form"
  style={{
    position: 'relative',
    top: '10px',
    left: '75px'
  }}
  onSubmit={e => { e.preventDefault(); /* handle subscription */ }}
>
  <input
    type="email"
    className="footer-subscribe-input"
    placeholder="Enter your email"
    required
  />
  <button className="footer-subscribe-btn" type="submit">
    Subscribe
  </button>
</form>

          </div>
        </div>
      </section>
<div className='spac'></div>
      <Footer />
    </div>
  );
}

export default HomePage;
