import {useEffect, useRef, useState} from "react"
import axios from "axios"

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <p>{message}</p>
  )
}

const Results = ({results}) => {
  if (results === null) {
    return null
  }

  return (
    <ul>
      {results.map(result => <li key={result}>{result}</li>)}
    </ul>
  )
} 

const CountryInfo = ({country}) => {
  if (country === null) {
    return null
  }

  return <>
    <h1>{country.name.common}</h1>
    <dl>
      <dt>Capital</dt>
      <dd>{country.capital[0]}</dd>
      <dt>Area</dt>
      <dd>{country.area}</dd>
      <dt>Languages</dt>
      <dd>{Object.values(country.languages).join(", ")}</dd>
      <dt>Flag</dt>
      <dd><img src={country.flags.png} alt={`Flag of ${country.name.common}`} /></dd>
    </dl>
  </>
}

const App = () => {
  const countries = useRef()

  const [search, setSearch] = useState("")
  const [results, setResults] = useState(null)
  const [message, setMessage] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => countries.current = res.data)
}, [])

  const changeSearch = event => {
    const filter = event.target.value
    const filteredCountries = countries.current
      .filter(
        c => c.name.common.toLowerCase().includes(filter.toLowerCase())
      )

    setSearch(filter)

    if (filteredCountries.length > 10 && filteredCountries.length > 1) {
      setMessage("Too many matches! Use a more specific filter.")
      setResults(null)
      setCountryDetails(null)
      return
    }
    if (filteredCountries.length === 0) {
      setMessage("No results!")
      setResults(null)
      setCountryDetails(null)
      return
    }
    if (filteredCountries.length === 1) {
      setMessage(null)
      setResults(null)
      setCountryDetails(filteredCountries[0])
      return
    }

    setMessage(null)
    setResults(filteredCountries.map(c => c.name.common))
    setCountryDetails(null)
  }

  return <>
    <p>
      Find countries <input value={search} onChange={changeSearch} />
    </p>
    <Notification message={message} />
    <Results results={results} />
    <CountryInfo country={countryDetails} />
  </>
}

export default App
