import { useState } from 'react'

const Filter = ({filter, changeFilter}) => {
  return (
    <div>
      Filter by name: <input value={filter} onChange={changeFilter} />
    </div>
  )
}

const PersonForm = ({newName, newNumber, changeNewName, changeNewNumber, addNewPerson}) => {
  return (
    <form onSubmit={addNewPerson}>
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

const Persons = ({persons, filter}) => {
  return (
    <ul>
      {persons
        .filter(person => person.name.toLowerCase().includes(filter))
        .map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </ul>
  )
}

const Person = ({name, number}) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([{
    name: "Arto Hellas",
    number: "040-1234567"
  }]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")

  const changeNewName = (e) => {
    setNewName(e.target.value)
  }

  const changeNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }

  const addNewPerson = (e) => {
    e.preventDefault()
    
    const duplicate = persons.find(person => person.name === newName)
    if (duplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    setPersons(persons.concat({
      name: newName,
      number: newNumber
    }))
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} changeFilter={changeFilter} />
      <h2>Add New Entry</h2>
      <PersonForm newName={newName} newNumber={newNumber} changeNewName={changeNewName} changeNewNumber={changeNewNumber} addNewPerson={addNewPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
