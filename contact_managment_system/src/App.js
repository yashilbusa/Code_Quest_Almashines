// src/App.js
import React, { useState } from "react";
import './styles.css';
import Login from "./components/Login";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import MergeDuplicates from "./components/MergeDuplicates";
import { importContactsFromVCF, exportContactsToVCF } from "./utils/vcfParser";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Handle VCF Import
  const handleImportVCF = (event) => {
    const file = event.target.files[0];
    if (file) {
      importContactsFromVCF(file)
        .then((importedContacts) => {
          setContacts([...contacts, ...importedContacts]);
        })
        .catch((error) => {
          console.error("Error importing VCF file:", error);
        });
    }
  };

  // Handle VCF Export
  const handleExportVCF = () => {
    exportContactsToVCF(contacts);
  };

  // Filter contacts by search query
  const filteredContacts = contacts.filter((contact) => {
    const searchText = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchText) ||
      contact.email.toLowerCase().includes(searchText) ||
      (contact.tags && contact.tags.some(tag => tag.toLowerCase().includes(searchText)))
    );
  });

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }

  return (
    <div>
      <h1>Contact Manager</h1>
      <input
        type="text"
        placeholder="Search by Name or Email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <ContactForm addContact={addContact} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
      <MergeDuplicates contacts={contacts} mergeDuplicates={mergeDuplicates} />

      {/* Import/Export Section */}
      <h3>Import/Export Contacts</h3>
      <input type="file" accept=".vcf" onChange={handleImportVCF} />
      <button onClick={handleExportVCF}>Export Contacts to VCF</button>
    </div>
  );
};

export default App;
