import React from 'react';
import './styles/Footer.css';

function Footer() {
  return (
    <footer className="footer minimal-footer custom-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">minim</span>
          <span className="footer-tagline">Wear Your Statement</span>
        </div>
        <div className="footer-contact">
          <div><strong>Email:</strong> <a href="mailto:your@email.com">anwarfarhan@email.com</a></div>
          <div><strong>Mobile:</strong> <a href="tel:+971555123456">+91 7095248094</a></div>
        </div>
        <div className="footer-socials">
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="footer-icon" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-copyright">
        &copy; {new Date().getFullYear()} Clothify. Crafted with style.
      </div>
    </footer>
  );
}

export default Footer;
