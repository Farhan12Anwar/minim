import React from 'react';
import { useCart } from './CartContext';
import './styles/CartPage.css';
import Footer from './Footer';
import Header from './Header';

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [toast, setToast] = React.useState('');

  async function handleRemove(productId) {
    await removeFromCart(productId);
    setToast('Product removed.');
    setTimeout(() => setToast(''), 1200);
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
                    <div className="cart-price">₹{item.product.price}</div>
                  </div>
                ))}
              </div>
              <div className="cart-total-row">
                <span>Total:</span>
                <span className="cart-total">₹{total}</span>
              </div>
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
