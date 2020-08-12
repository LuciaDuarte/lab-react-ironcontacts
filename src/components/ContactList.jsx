import React from 'react';
import contacts from './../contacts.json';

let onlyFiveContacts = contacts.splice(0, 5);

function chooseRandom() {
  let index = Math.floor(Math.random() * (contacts.length - 1));
  return contacts[index];
}

class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts: onlyFiveContacts,
    };
  }

  addContact = () => {
    const item = chooseRandom();
    const list = [...this.state.contacts, item];
    this.setState({
      contacts: list,
    });
  };

  deleteContact(index) {
    const list = [...this.state.contacts];
    list.splice(index, 1);

    this.setState({
      contacts: list,
    });
  }

  sortByName = () => {
    const list = [...this.state.contacts];

    list.sort((firstItem, secondItem) =>
      firstItem.name.localeCompare(secondItem.name)
    );
    this.setState({
      contacts: list,
    });
  };

  sortByPopularity = () => {
    const list = [...this.state.contacts];

    list.sort((firstItem, secondItem) => {
      return firstItem.popularity > secondItem.popularity ? -1 : 1;
    });
    this.setState({
      contacts: list,
    });
  };

  render() {
    return (
      <div className="ContactList">
        <button onClick={this.addContact}>Add Random Contact</button>
        <button onClick={this.sortByName}>Sort by name</button>
        <button onClick={this.sortByPopularity}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          {this.state.contacts.map((contact, index) => {
            return (
              <tbody key={contact.id}>
                <tr>
                  <td>
                    <img src={contact.pictureUrl} alt={contact.name} />
                  </td>
                  <td>{contact.name}</td>
                  <td>{Math.round(contact.popularity * 100) / 100}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => this.deleteContact(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default ContactList;
