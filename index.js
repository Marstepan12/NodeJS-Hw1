const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
const { argv } = require('yargs');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts().then(contacts => console.table(contacts));
      break;

    case 'get':
      getContactById(id).then(contact => {
        if (contact) {
          console.log(contact);
        } else {
          console.log('Contact not found');
        }
      });
      break;

    case 'add':
      addContact(name, email, phone).then(newContact => {
        console.log('Contact added:', newContact);
      });
      break;

    case 'remove':
      removeContact(id).then(removedContact => {
        if (removedContact) {
          console.log('Contact removed:', removedContact);
        } else {
          console.log('Contact not found');
        }
      });
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);