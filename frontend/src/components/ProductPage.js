import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './styles/ProductPage.css';
import Footer from './Footer';
import Header from './Header';
import { FaShoppingCart } from "react-icons/fa";

function ProductPage({ params }) {
  // For demo, extract product id from route:
  const productId = window.location.pathname.split('/').pop();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const { cart, addToCart } = useCart();
  const [toast, setToast] = useState('');
  const [bundleMsg, setBundleMsg] = useState('');
  const navigate = useNavigate();

  // Fetch product and all products for recommendations
  useEffect(() => {
    setLoading(true);

    // Get active product
    axios.get(`https://minim-th9h.onrender.com/api/products/${productId}`)
      .then(res => setProduct(res.data));

    // Get all products for recommendations in parallel
    axios.get('https://minim-th9h.onrender.com/api/products')
      .then(res => setAllProducts(res.data))
      .finally(() => setLoading(false));
  }, [productId]);

  // Thumbnails support
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

  // Recommendation logic: pick items with complementary types
  function getRecommendations(product, products) {
    if (!product || !products) return [];
    let recTypes = [];
    if (product.type === 'Shirt') recTypes = ['Pants', 'Shoes', 'Cap', 'Short'];
    else if (product.type === 'Pants') recTypes = ['Shirt', 'Shoes', 'Cap'];
    else if (product.type === 'Shoes') recTypes = ['Pants', 'Shirt', 'Cap'];
    else recTypes = ['Shirt', 'Pants', 'Shoes'];
    return products.filter(
      p => recTypes.includes(p.type) && p._id !== product._id
    ).slice(0, 2); // Pick up to 2 complimentary products
  }

  const specs = getSpecs(product);

  if (loading || !product) return <div className="minimal-product-page">Loading...</div>;

  // Compute recommendations
  const recommendations = getRecommendations(product, allProducts);
  const bundleProducts = [product, ...recommendations];
  const bundleTotal = bundleProducts.reduce((sum, prod) => sum + prod.price, 0);
  const bundleDiscount = Math.round(bundleTotal * 0.1);
  const afterDiscount = bundleTotal - bundleDiscount;

  function handleAddBundle() {
    // Add each product to cart
    bundleProducts.forEach(prod => addToCart(prod));
    setBundleMsg('Bundle added to cart! You got a 10% discount.');
    setTimeout(() => setBundleMsg(''), 2500);
  }

  return (
    <div className="minimal-product-page">
       <header className="header minimal-header custom-header">
            <div className="header-left">
             <a href="/" class="logo">minim</a>
            </div>
            <nav className="minimal-nav custom-nav">
              {/* <a href="/" className="active">HOME</a> */}
              <a href="/contact">CONTACT</a>
              <a href="/cart" className="right-link flex items-center gap-2">
        CART
        <FaShoppingCart size={20} />
      </a>
            </nav>
          </header>
      <div className="content-grid">
        {/* Product Details (left) */}
        <section className="product-details">
          <h1 className="product-title">{product.name}</h1>
          {/* <div className="product-id">{product.sku || product._id}</div> */}
          <div className="product-price">${product.price}</div>
          <div className="product-desc">{product.description}</div>
          <div className="product-specs">
            <div><span>MATERIAL:</span>{specs.MATERIAL}</div>
            <div><span>ARTICLE:</span>{specs.ARTICLE}</div>
            <div><span>SIZE:</span>{specs.SIZE}</div>
            <div className="rec-size-row">
  {['S', 'M', 'L', 'XL'].map(size => (
    <button className="size-btn" key={size}>
      {size}
    </button>
  ))}
</div>

          </div>
          <div className="buy-row">
            <button className="minimal-btn" style={{pointerEvents:'none',opacity:0.5}}>−</button>
            <span className="qty">1</span>
            <button className="minimal-btn" style={{pointerEvents:'none',opacity:0.5}}>+</button>
            <button className="add-to-cart-btn animated-btn" onClick={handleAddToCart}>
              ADD TO CART ${product.price}
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

      {/* Complete the Look Section */}
      <section className="complete-look-section">
  <h2 className="complete-look-title">Complete the Look</h2>
  <div className="complete-look-subtitle">
    Pair this {product?.type?.toLowerCase()} with these for a standout style.<br />
    Buy all together and <strong>save 10%!</strong>
  </div>
  <div className="complete-look-fullrow">
    <div className="complete-look-grid">
      <div className="complete-look-card main-card">
        <img src={product?.imageUrl} alt={product?.name} />
        <div className="rec-desc">{product?.name}</div>
        <div className="rec-type">{product?.type}</div>
        <div className="rec-price">${product?.price}</div>
        <div className="rec-description">{product?.description}</div>
      </div>
      {recommendations.map((rec, idx) => (
        <React.Fragment key={rec._id}>
          <div className="plus-divider">+</div>
          <div className="complete-look-card"
              onClick={() => navigate(`/product/${rec._id}`)}
              style={{ cursor: 'pointer' }}>
            <img src={rec.imageUrl} alt={rec.name} />
            <div className="rec-desc">{rec.name}</div>
            <div className="rec-type">{rec.type}</div>
            <div className="rec-price">${rec.price}</div>
            <div className="rec-description">{rec.description}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
  <div className="bundle-row">
    <span>
      Get It For: <s>${bundleTotal}</s> <span className="bundle-discounted">${afterDiscount}</span>
      <span className="bundle-save">You save ${bundleDiscount}!</span>
    </span>
    <button className="bundle-btn" onClick={handleAddBundle}>
      Add All to Cart & Save 10%
    </button>
  </div>
  {bundleMsg && <div className="minimal-toast">{bundleMsg}</div>}
</section>


      <Footer />
    </div>
  );
}

export default ProductPage;
