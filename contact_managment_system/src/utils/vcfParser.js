// src/utils/vcfParser.js
import VCF from "vcf";
import './styles.css';

// Function to import contacts from a VCF file
export const importContactsFromVCF = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const vcfData = event.target.result;
      const vCards = VCF.parse(vcfData);
      const contacts = vCards.map((card) => ({
        name: card.get('fn').valueOf() || '',
        email: card.get('email') ? card.get('email').valueOf() : '',
        phone: card.get('tel') ? card.get('tel').valueOf() : '',
      }));
      resolve(contacts);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

// Function to export contacts to a VCF file
export const exportContactsToVCF = (contacts) => {
  const vCards = contacts.map((contact) => {
    const vCard = new VCF();
    vCard.set('fn', contact.name);
    vCard.set('email', contact.email);
    vCard.set('tel', contact.phone);
    return vCard.toString();
  });

  const vcfBlob = new Blob([vCards.join('\n')], { type: 'text/vcard' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(vcfBlob);
  link.download = 'contacts.vcf';
  link.click();
};
