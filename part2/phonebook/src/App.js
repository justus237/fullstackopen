import { useState } from 'react';

import Filter from './components/Filter'

import PersonForm from './components/PersonForm'

import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  
  const [newNumber, setNewNumber] = useState('');
  
  const [searchPersonFilter, setSearchPersonFilter] = useState('');
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  
  const handleFilterChange = (event) => {
    setSearchPersonFilter(event.target.value);
  }
  
  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') return;
    if (persons.some(person => person.name === newName)) {
      console.log(newName);
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      }
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  }
  

  
  const personsToShow = () => {
    if (searchPersonFilter === '') {
      return persons;
    }
    
    return persons.filter(person => person.name.toLowerCase().includes(searchPersonFilter.toLowerCase()));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterValue={searchPersonFilter} changeHandler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} nameChangeHandler={handleNameChange} numberValue={newNumber} numberChangeHandler={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App