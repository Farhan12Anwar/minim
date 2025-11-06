import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import './styles/ProductPage.css';
import Footer from './Footer';

function ProductPage({ params }) {
  // For demo, extract product id from route:
  const productId = window.location.pathname.split('/').pop();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const { cart, addToCart } = useCart();
  const [toast, setToast] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      });
  }, [productId]);

  // Support for array of thumbnails; else just main image
  const thumbnails = product && product.thumbnails
    ? product.thumbnails
    : product && [product.imageUrl];

  function handleAddToCart() {
    addToCart(product).then(() => {
      setToast('Product added to cart!');
      setTimeout(() => setToast(''), 2000);
    });
  }

  function getSpecs(product) {
  if (!product) return {};
  switch (product.name) {
    case "Cybersecurity Book":
      return {
        MATERIAL: "Printed hardcover, premium infosec content.",
        ARTICLE: "Over 20 security chapters.",
        SIZE: "320 pages.",
        DELIVERY: "Free worldwide shipping."
      };
    case "Python Automation Course":
      return {
        MATERIAL: "Online video lectures, downloadable notebooks.",
        ARTICLE: "15 Python automation projects.",
        SIZE: "9.5 hours on-demand video.",
        DELIVERY: "Lifetime online access."
      };
    case "Cloud Security Training":
      return {
        MATERIAL: "Step-by-step cloud lab exercises.",
        ARTICLE: "6 cloud service case studies.",
        SIZE: "12 downloadable modules.",
        DELIVERY: "Online portal (self-paced)."
      };
    default:
      return {
        MATERIAL: product.material || "Premium materials.",
        ARTICLE: product.article || "1",
        SIZE: product.size || "Standard",
        DELIVERY: product.delivery || "Online.",
      };
  }
}

 if (loading || !product)
    return <div className="minimal-product-page">Loading...</div>;

  // Declare specs after loading
  const specs = getSpecs(product);


  if (loading || !product) return <div className="minimal-product-page">Loading...</div>;

  return (
    <div className="minimal-product-page">
      <header className="header minimal-header">
        <a href="/" class="logo">minim</a>
        <nav className="minimal-nav">
          <a href="/">SHOP</a>
          <a href="/contact">CONTACT</a>
          <a href="/cart" className="right-link">CART ({cart.items.length})</a>
        </nav>
      </header>
      <div className="content-grid">
        {/* Product Details (left) */}
        <section className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-id">{product.sku || product._id}</div>
          <div className="product-price">₹{product.price}</div>
          <div className="product-desc">{product.description}</div>
          <div className="product-specs">
  <div><span>MATERIAL:</span>{specs.MATERIAL}</div>
  <div><span>ARTICLE:</span>{specs.ARTICLE}</div>
  <div><span>SIZE:</span>{specs.SIZE}</div>
  <div><span>DELIVERY:</span>{specs.DELIVERY}</div>
</div>
          <div className="buy-row">
            <button className="minimal-btn" style={{pointerEvents:'none',opacity:0.5}}>−</button>
            <span className="qty">1</span>
            <button className="minimal-btn" style={{pointerEvents:'none',opacity:0.5}}>+</button>
            <button className="add-to-cart-btn animated-btn" onClick={handleAddToCart}>
              ADD TO CART ₹{product.price}
            </button>
          </div>
          {toast && <div className="minimal-toast">{toast}</div>}
        </section>
        {/* Product Image + Thumbnails */}
        <section className="gallery-section">
          <div className="main-img-box">
            <img src={thumbnails[activeImg]} alt={product.name} className="main-product-img" />
          </div>
          <div className="thumb-row">
            {thumbnails.map((src, idx) =>
              <img
                key={idx}
                src={src}
                alt={`Thumb ${idx}`}
                className={`thumb-img ${idx === activeImg ? 'active-thumb' : ''}`}
                onClick={() => setActiveImg(idx)}
              />
            )}
          </div>
        </section>
      </div>
     <Footer />
    </div>
  );
}

export default ProductPage;
