// src/components/ContactForm.js
import React, { useState } from "react";
import '../styles.css'; 

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Must be exactly 10 digits
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validate email and phone number
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (name && email && phone) {
      addContact({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Phone (10 digits)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">Add Contact</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default ContactForm;
