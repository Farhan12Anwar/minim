import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import './styles/CartPage.css';
import Footer from './Footer';
import Header from './Header';

function getRecommendations(product, products) {
  if (!product || !products) return [];
  let recTypes = [];
  if (product.type === 'Shirt') recTypes = ['Pants', 'Shoes', 'Cap', 'Short'];
  else if (product.type === 'Pants') recTypes = ['Shirt', 'Shoes', 'Cap'];
  else if (product.type === 'Shoes') recTypes = ['Pants', 'Shirt', 'Cap'];
  else recTypes = ['Shirt', 'Pants', 'Shoes'];
  return products.filter(
    p => recTypes.includes(p.type) && p._id !== product._id
  ).slice(0, 2);
}

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [toast, setToast] = React.useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleRemove(productId) {
    await removeFromCart(productId);
    setToast('Product removed.');
    setTimeout(() => setToast(''), 1200);
  }

  // Get cart product details from products array
  const cartProducts = cart.items.map(item => ({
    ...item.product,
    quantity: item.quantity
  }));

  // Bundle logic: Check for "complete the look" bundle in cart
  let bundleMain = null, bundleAddons = [], bundleTotal = 0, bundleDiscount = 0, afterDiscount = 0;
  if (!loading && cartProducts.length >= 2) {
    for (let prod of cartProducts) {
      // Try each as main product; look for matching bundle in cart
      const recs = getRecommendations(prod, products);
      const recIds = recs.map(r => r._id);
      const allInCart = recIds.every(id => cartProducts.some(cp => cp._id === id));
      if (allInCart && recs.length) {
        bundleMain = prod;
        bundleAddons = recs.filter(rec => cartProducts.some(cp => cp._id === rec._id));
        break;
      }
    }
  }
  if (bundleMain && bundleAddons.length) {
    const bundleItems = [bundleMain, ...bundleAddons];
    bundleTotal = bundleItems.reduce((sum, prod) => sum + (prod.price || 0), 0);
    bundleDiscount = Math.round(bundleTotal * 0.1);
    afterDiscount = bundleTotal - bundleDiscount;
  }

  const total = cart.items?.reduce((sum, item) =>
    sum + (item.product?.price ?? 0) * item.quantity, 0);

  return (
    <div className="minimal-cart-page">
      <Header />
      <main>
        <section className="cart-section animated-fade">
          <h2 className="cart-title">Your Cart</h2>
          {cart.items?.length === 0 ? (
            <div className="cart-empty">Your cart is empty.</div>
          ) : (
            <>
              <div className="cart-table">
                {cart.items.map(item => (
                  <div className="cart-row animated-card" key={item.product._id}>
                    <img className="cart-img" src={item.product.imageUrl} alt={item.product.name} />
                    <div className="cart-info">
                      <div className="cart-prodname">{item.product.name}</div>
                      <div className="cart-proddesc">{item.product.description}</div>
                      <div className="cart-qty">
                        Quantity: {item.quantity}
                        <button className="cart-remove-btn animated-btn"
                          onClick={() => handleRemove(item.product._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">${item.product.price}</div>
                  </div>
                ))}
              </div>
              <div className="cart-total-row">
                <span>Total:</span>
                <span className="cart-total">${bundleMain && afterDiscount ? afterDiscount : total}</span>
              </div>
              {bundleMain && afterDiscount && (
                <div style={{color: '#22d179', fontWeight: 600, marginBottom: "18px", fontSize: "1.05em"}}>
                  Bundle discount applied! <s style={{color:"#888"}}>${bundleTotal}</s> <span style={{color: "#22d179"}}>${afterDiscount}</span>
                  <span style={{
                    color: "#2063f7",
                    background: "#e6f6f5",
                    borderRadius: "7px",
                    padding: "2px 8px",
                    marginLeft: "10px"
                  }}>You save ${bundleDiscount}!</span>
                </div>
              )}
              <button className="checkout-btn animated-btn" disabled>
                Checkout (Coming Soon)
              </button>
            </>
          )}
          {toast && <div className="minimal-toast">{toast}</div>}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default CartPage;
