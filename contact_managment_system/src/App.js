import React, { useState } from "react";
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import MergeDuplicates from "./components/MergeDuplicates";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const mergeDuplicates = (contact1, contact2, mergedContact) => {
    setContacts(
      contacts
        .filter((contact) => contact !== contact1 && contact !== contact2)
        .concat(mergedContact)
    );
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div>
      <h1>Contact Manager</h1>
      <ContactForm addContact={addContact} />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
      <MergeDuplicates contacts={contacts} mergeDuplicates={mergeDuplicates} />
    </div>
  );
};

export default App;
