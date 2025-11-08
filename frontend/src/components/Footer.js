import React from 'react';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="clothify-footer">
      <div className="footer-main-row">
        {/* Brand and address COLUMN */}
        <div className="footer-brand-col">
          <div className="clothify-logo-row">
            <span className="clothify-logo">minim</span>
            <span className="clothify-tagline">Wear Your Statement</span>
          </div>
          <div className="footer-address">
            <strong>Corporate Address:</strong>
            <div>A-123, 7th Floor, Modern Corporate Tower,<br/>
              Sector-90, Dubai, UAE (000000)
            </div>
          </div>
          <div className="footer-address">
            <strong>Registered Address:</strong>
            <div>Suite 45, Innovation Road, Dubai Silicon Oasis, Dubai, UAE (000000)</div>
          </div>
          <div className="footer-social-row">
            <a href="https://facebook.com/" className="footer-social-icon" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/" className="footer-social-icon" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com/" className="footer-social-icon" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com/" className="footer-social-icon" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        {/* Links COLUMN */}
        <div className="footer-links-group">
          <div>
            <h4>Company</h4>
            <a href="/">About Us</a>
            <a href="/">Legal</a>
            <a href="/">Privacy Policy</a>
            <a href="/">Careers</a>
            <a href="/">Contact Us</a>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="/">Shop</a>
            <a href="/arrivals">New Arrivals</a>
            <a href="/">Sale</a>
            <a href="/">Blog</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="/">FAQ</a>
            <a href="/">Email</a>
            <a href="/">+971 555 123456</a>
            <a href="/">Returns</a>
          </div>
        </div>
        {/* Subscribe COLUMN - Placed LAST for right alignment */}
        <div className="footer-subscribe-block">
          <div className="footer-subscribe-title">Stay In Style</div>
          <form className="footer-subscribe-form" onSubmit={e => { e.preventDefault(); /* handle subscription */ }}>
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
      <div className="footer-separator"></div>
      <div className="footer-bottom-row">
        <span>&copy; {new Date().getFullYear()} minim. All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
