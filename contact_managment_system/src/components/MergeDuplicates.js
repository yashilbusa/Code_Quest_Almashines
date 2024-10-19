import React from "react";

const MergeDuplicates = ({ contacts, mergeDuplicates }) => {
  const findDuplicates = () => {
    let duplicates = [];
    contacts.forEach((contact, index) => {
      contacts.forEach((otherContact, otherIndex) => {
        if (
          index !== otherIndex &&
          (contact.name === otherContact.name ||
            contact.email === otherContact.email ||
            contact.phone === otherContact.phone)
        ) {
          duplicates.push({ contact, otherContact });
        }
      });
    });
    return duplicates;
  };

  const handleMerge = (contact1, contact2) => {
    // Example merge logic
    const mergedContact = {
      ...contact1,
      phone: contact1.phone || contact2.phone,
      email: contact1.email || contact2.email,
    };
    mergeDuplicates(contact1, contact2, mergedContact);
  };

  const duplicates = findDuplicates();

  return (
    <div>
      <h3>Duplicate Contacts</h3>
      {duplicates.map((pair, index) => (
        <div key={index}>
          <p>{pair.contact.name} - {pair.contact.email} - {pair.contact.phone}</p>
          <p>{pair.otherContact.name} - {pair.otherContact.email} - {pair.otherContact.phone}</p>
          <button onClick={() => handleMerge(pair.contact, pair.otherContact)}>Merge</button>
        </div>
      ))}
    </div>
  );
};

export default MergeDuplicates;
