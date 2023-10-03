const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function listContacts() {
  return fs.readFile(contactsPath, 'utf-8')
    .then(data => JSON.parse(data))
    .catch(error => {
      console.error('Error reading contacts:', error);
      return [];
    });
}

function getContactById(contactId) {
  return fs.readFile(contactsPath, 'utf-8')
    .then(data => {
      const contacts = JSON.parse(data);
      return contacts.find(contact => contact.id === contactId) || null;
    })
    .catch(error => {
      console.error('Error reading contacts:', error);
      return null;
    });
}

function removeContact(contactId) {
  return fs.readFile(contactsPath, 'utf-8')
    .then(data => {
      const contacts = JSON.parse(data);
      const removedContact = contacts.find(contact => contact.id === contactId);
      const updatedContacts = contacts.filter(contact => contact.id !== contactId);
      return fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
        .then(() => removedContact);
    })
    .catch(error => {
      console.error('Error reading/writing contacts:', error);
      return null;
    });
}

function addContact(name, email, phone) {
  return fs.readFile(contactsPath, 'utf-8')
    .then(data => {
      const contacts = JSON.parse(data);
      const newContact = { id: contacts.length + 1, name, email, phone };
      contacts.push(newContact);
      return fs.writeFile(contactsPath, JSON.stringify(contacts))
        .then(() => newContact);
    })
    .catch(error => {
      console.error('Error reading/writing contacts:', error);
      return null;
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };