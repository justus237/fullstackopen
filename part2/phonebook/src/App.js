import { useState, useEffect } from 'react'
import personService from './services/phonebook'

import Filter from './components/Filter'

import PersonForm from './components/PersonForm'

import Persons from './components/Persons'

import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  
  const [newNumber, setNewNumber] = useState('');
  
  const [searchPersonFilter, setSearchPersonFilter] = useState('');
  
  const [errorMessage, setErrorMessage] = useState(null)
  
  const [successMessage, setSuccessMessage] = useState(null)
  

  
  //can probably make this smarter but not sure how
  //ideally you would be able to stack multiple success/error messages on top of each other instead of this
  const popUpErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000);
  }
  
  const popUpSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000);
  }
  
  
  
  useEffect(() => {
    console.log('effect');
    personService
      .getAll()
      .then(initialPersons => {
        console.log('fetched',initialPersons.length, 'people')
        setPersons(initialPersons)
      })
  }, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }
  
  const handleFilterChange = (event) => {
    setSearchPersonFilter(event.target.value);
  }
  
  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
      //server generates ids for us, otherwise deleting causes issues
      //id: persons.length + 1,
    }
    personService
    .create(newPerson)
    .then( returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
      popUpSuccessMessage(`Added ${returnedPerson.name}`);
    })
    .catch( error => {
      console.log(error);
      console.log(newPerson);
      popUpErrorMessage(`Failed adding ${newName}`);
    });
  }
  
  const modifyExistingPerson = () => {
    console.log(newName);
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const originalPerson = persons.find(person => person.name === newName);
      
      console.log(`updating phone number of ${newName} with id ${originalPerson.id}`);
      
      //should probably check if person is undefined
      const modifiedPerson = {...originalPerson, number: newNumber};
      personService
      .update(modifiedPerson.id, modifiedPerson)
      .then( returnedPerson => {
        //duplicated code with adding a new person, should be a separate function
        setPersons(persons.map(person => person.name !== newName ? person : returnedPerson));
        setNewName('');
        setNewNumber('');
        popUpSuccessMessage(`Set number of ${returnedPerson.name} to ${returnedPerson.number}`);
      })
      .catch( error => {
        popUpErrorMessage(`The phone number of ${newName} with id ${originalPerson.id} could not be modified`);
        // should probably only do this if the error is that it does not exist but whatever
        setPersons(persons.filter(person => (person.id !== originalPerson.id)))
      });
    } else {
      console.log('user decided to not modify existing user');
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault();
    if (newName === '' || newNumber === '') return;
    //instead of checking with some first and then using find, it would make more sense to use find immediately to prevent stale information?
    if (persons.some(person => person.name === newName)) {
      modifyExistingPerson();
    } else {
      addNewPerson();
    }
  }
  
  const deletePerson = (id, person) => {
    console.log(`deleting id ${id}`);
    personService
    .deleteEntry(id)
    .then( response => {
      console.log(response)
      popUpSuccessMessage(`Removed ${person.name}`);
      setPersons(persons.filter(person => (person.id !== id)))
    })
    .catch( error => {
      popUpErrorMessage(`Information of ${person.name} has already been removed from server`);
      //remove it locally as well
      setPersons(persons.filter(person => (person.id !== id)));
    });
  }
  

  
  const personsToShow = () => {
    if (searchPersonFilter === '') {
      return persons;
    }
    
    return persons.filter(person => person.name.toLowerCase().includes(searchPersonFilter.toLowerCase()));
  }
  
  //if i delete and add another person within the timeout, the notification will disappear with the original timeout
  return (
    <div>
      <Notification message={successMessage} notificationType='success'/>
      <Notification message={errorMessage} notificationType='error'/>
      <h2>Phonebook</h2>
      <Filter filterValue={searchPersonFilter} changeHandler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleSubmit={addPerson} nameValue={newName} nameChangeHandler={handleNameChange} numberValue={newNumber} numberChangeHandler={handleNumberChange} />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App