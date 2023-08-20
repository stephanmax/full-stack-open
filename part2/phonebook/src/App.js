import { useState, useEffect } from 'react'
import personService from './services/persons.js'

const Notification = ({message, type}) => {
  if (message === null) {
    console.log("YEAH")
    return null
  }

  return (
    <p className={`notification ${type}`}>
      {message}
    </p>
  )
}

const Filter = ({filter, changeFilter}) => {
  return (
    <div>
      Filter by name: <input value={filter} onChange={changeFilter} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, changeNewName, changeNewNumber, addEntry}) => {
  return (
    <form onSubmit={addEntry}>
      <div>
        name: <input value={newName} onChange={changeNewName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={changeNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, filter, removePerson}) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        .map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} removePerson={removePerson} />)}
    </ul>
  )
}

const Person = ({name, id, number, removePerson}) => {
  return (
    <li> {name} {number} <button onClick={() => removePerson(id)}>delete</button></li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState({
    message: null,
    type: "success"
  })

  const changeNewName = (e) => {
    setNewName(e.target.value)
  }

  const changeNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }

  const addEntry = (e) => {
    e.preventDefault()
    
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
        const updatedPerson = {
          ...duplicate,
          number: newNumber
        }

        personService
          .update(updatedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNotification({
              message: `Changed number of ${updatedPerson.name} to ${updatedPerson.number}`,
              type: 'success'
            })
            setTimeout(() => {
              setNotification({
                message: null
              })
            }, 3000)
          })
          .catch(error => {
            setNotification({
              message: `${updatedPerson.name} was already removed`,
              type: "error"
            })
            setTimeout(() => {
              setNotification({
                message: null
              })
            }, 3000)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          })
      }

      setNewName("")
      setNewNumber("")
      return
    }

    personService
      .create({
        name: newName,
        number: newNumber
      })
      .then(person => {
        setPersons(persons.concat(person))
        setNewName("")
        setNewNumber("")
      })
    setNotification({
      message: `Added ${newName} with number ${newNumber}`,
      type: 'success'
    })
    setTimeout(() => {
      setNotification({
        message: null
      })
    }, 3000)
  }

  const removePerson = id => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      });
  }

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons));
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} changeFilter={changeFilter} />
      <h2>Add New Entry</h2>
      <PersonForm newName={newName} newNumber={newNumber} changeNewName={changeNewName} changeNewNumber={changeNewNumber} addEntry={addEntry} />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        removePerson={removePerson} />
    </div>
  )
}

export default App
