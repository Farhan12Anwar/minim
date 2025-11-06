import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './styles/HomePage.css';
import Footer from './Footer';
import Header from './Header';
import { Link } from 'react-router-dom';



const FILTERS = ["All", "Shirt", "Pants", "Shorts", "Caps", "Shoes"];

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const [toast, setToast] = useState('');

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      });
  }, []);

  function handleAddToCart(product) {
    addToCart(product).then(() => {
      setToast('Added to cart!');
      setTimeout(() => setToast(''), 2000);
    });
  }

  // Filtering logic:
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
          <a href="/" className="hero-cta animated-btn">Explore Clothing</a>
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
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="minimal-product-img-box">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="minimal-product-info">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>
      </div>
      <div className="price-row">
        <span className="price-text">₹{product.price}</span>
      </div>
    </Link>
  ))}
</div>
        {toast && <div className="minimal-toast">{toast}</div>}
      </main>

<section className="recommended-section">
  <h2 className="recommended-title">Recommended For You</h2>
  <div className="recommended-grid">
    {products.slice(0, 3).map(product => (
      <div className="recommended-card" key={product._id}>
        <div className="recommended-img-box">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="recommended-info">
          <h3 className="recommended-name">{product.name}</h3>
          <p className="recommended-desc">{product.description}</p>
        </div>
        <div className="recommended-footer">
          <span className="price-tag">₹{product.price}</span>
          <a href={`/product/${product._id}`} className="details-link recommended-details">View Details</a>
        </div>
        <span className="rec-badge">★ Top Pick</span>
      </div>
    ))}
  </div>
</section>


   <Footer />


    </div>
  );
}

export default HomePage;
