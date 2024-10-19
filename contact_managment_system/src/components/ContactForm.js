import React, { useState } from "react";
import './styles.css';

const ContactForm = ({ addContact }) => {
  const [contact, setContact] = useState({ name: "", email: "", phone: "", tags: [] });

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({ name: "", email: "", phone: "", tags: [] });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={contact.name}
        onChange={(e) => setContact({ ...contact, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => setContact({ ...contact, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) => setContact({ ...contact, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={contact.tags.join(",")}
        onChange={(e) => setContact({ ...contact, tags: e.target.value.split(",") })}
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
