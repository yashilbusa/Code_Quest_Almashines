import React from "react";
import './styles.css';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div>
      {contacts.map((contact, index) => (
        <div key={index}>
          <p>{contact.name} - {contact.email} - {contact.phone}</p>
          <button onClick={() => deleteContact(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
