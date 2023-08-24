import { Component } from 'react';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts?.length > 0) {
      this.setState({ contacts: localContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  createContact = data => {
    if (this.isDuplicate(data.name))
      return alert(`${data.name} is already in contacts(( `);
    const newContact = {
      ...data,
      id: nanoid(),
    };
    this.setState(prev => ({
      contacts: [newContact, ...prev.contacts],
    }));
  };
  isDuplicate = name =>
    this.state.contacts.find(contact => contact.name === name);
  handleDelete = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };
  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  filterContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          padding: '20px',
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <div>
          <ContactForm createContact={this.createContact} />
        </div>
        <div>
          <h2>Contacts</h2>
          <Filter
            onChange={this.onFilterChange}
            filteredBy={this.state.filter}
          />
          <ContactList
            contacts={this.filterContacts()}
            handleDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}

export default App;
