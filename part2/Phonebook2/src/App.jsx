import './index.css'
import numbersService from './services/Numbers'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import { useState,useEffect } from 'react'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  )
}
const ErrorAlert = ({ text }) => {
  return (
    <div className='error'>
      <p>{text}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterText, setFilterText] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    numbersService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  },[])
  console.log(typeof persons)

  //formattedPerson and updatePerson are created to avoid id being the first element in person 
  const addPerson = newPerson => {
    if (persons.find(person => person.name === newPerson.name && person.number === newPerson.number)) {
      return alert(`${newPerson.name} or ${newPerson.number} is already added to phonebook`)
    }

    else if (persons.find(person => person.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new?`)){
        const toUpdate = persons.find(person => person.name === newPerson.name)
        numbersService
          .update(toUpdate.id, newPerson)
          .then(response => {setPersons(persons.map(person => 
            person.id === toUpdate.id ? 
              { ...person, number: response.data.number } : 
              person
            ))
        })
        .catch(error => {
          setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
          setPersons(persons.filter(person => person.id !== toUpdate.id))
          return error
        })
    }
  }

  else {
      numbersService
      .create(newPerson)
      .then(response => {
        const formattedPerson = {
          name: response.data.name,
          number: response.data.number,
          id: response.data.id
        }
        setPersons(persons.concat(formattedPerson))
        setNotificationMessage(`Added ${formattedPerson.name}`)
      })
    }
  }
  const removePerson = id => {
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name} ?`))
      numbersService
    .remove(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }
  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filterText.toLowerCase())
  })
  console.log(filteredPersons)

  return (
    <div>
      <h2>Phonebook</h2>
        <ErrorAlert text={errorMessage}/>
        <Notification message={notificationMessage}/>
        <Filter props={{filterText: filterText, onFilterChange: setFilterText}} />
      <h3>Add a new</h3>
          <PersonForm addPerson={addPerson}/>
      <h2>Numbers</h2>
          <Persons persons={filteredPersons} onClick={removePerson} />
    </div>
  )
}

export default App
