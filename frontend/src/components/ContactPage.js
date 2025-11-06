import React, { useState } from 'react';
import axios from 'axios';
import './styles/ContactPage.css';
import Footer from './Footer';
import Header from './Header';

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [showToast, setShowToast] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/contact', form)
      .then(() => {
        setShowToast(true);
        setForm({ name: '', email: '', message: '' });
        setTimeout(() => setShowToast(false), 3000);
      });
  };

  return (
    <div className="minimal-contact-page">
      <Header />
      <main>
        <section className="contact-form-section animated-fade">
          <h2 className="contact-title">Contact Us</h2>
          <form className="minimal-contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="floating-label">
              <input name="name" value={form.name} onChange={handleChange} required placeholder=" " />
              <label>Your Name</label>
            </div>
            <div className="floating-label">
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder=" " />
              <label>Your Email</label>
            </div>
            <div className="floating-label">
              <textarea name="message" value={form.message} onChange={handleChange} required placeholder=" " rows={4} />
              <label>Your Message</label>
            </div>
            <button type="submit" className="minimal-contact-btn animated-btn">Send Message</button>
          </form>
          {showToast && (<div className="minimal-toast">Message sent! We'll get back to you soon.</div>)}
          <div className="contact-details">
            <div><strong>Support Email:</strong> anwarfarhan339@gmail.com</div>
            <div><strong>Phone:</strong> +91-7095248094</div>
            <div><strong>Hours:</strong> Mon-Fri, 9:00 – 18:00</div>
          </div>
        </section>
      </main>
     <Footer />
    </div>
  );
}

export default ContactPage;
