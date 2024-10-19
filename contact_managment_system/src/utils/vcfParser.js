export const parseVCF = (fileContent) => {
    const contacts = [];
    const lines = fileContent.split('\n');
    
    let contact = {};
    lines.forEach(line => {
      if (line.startsWith('FN:')) {
        contact.name = line.split(':')[1];
      } else if (line.startsWith('EMAIL:')) {
        contact.email = line.split(':')[1];
      } else if (line.startsWith('TEL:')) {
        contact.phone = line.split(':')[1];
      } else if (line.startsWith('END:VCARD')) {
        contacts.push(contact);
        contact = {};
      }
    });
    
    return contacts;
  };
  