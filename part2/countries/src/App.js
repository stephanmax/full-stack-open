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

const Results = ({results, setCountryDetails}) => {
  if (results === null) {
    return null
  }
  return (
    <ul>
      {results.map(result => <li key={result.name.common}>{result.name.common} <button onClick={() => setCountryDetails(result)}>show</button></li>)}
    </ul>
  )
} 

const CountryInfo = ({country, weather}) => {
  if (country === null || weather === null) {
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
    <h2>Weather in {country.capital[0]}</h2>
    <p><img alt="Weather icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /></p>
    <dl>
      <dt>Temperature</dt>
      <dd>{weather.main.temp} °C</dd>
      <dt>Wind</dt>
      <dd>{weather.wind.speed} m/s</dd>
    </dl>
  </>
}

const App = () => {
  const countries = useRef()

  const [search, setSearch] = useState("")
  const [results, setResults] = useState(null)
  const [message, setMessage] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => countries.current = res.data)
  }, [])

  useEffect(() => {
    if (countryDetails === null) {
      return
    }
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${countryDetails.capital[0]},${countryDetails.name.common}&APPID=${process.env.REACT_APP_APIKEY}&units=metric`)
      .then(res => setWeather(res.data))
  }, [countryDetails])

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
    setResults(filteredCountries)
    setCountryDetails(null)
  }

  return <>
    <p>
      Find countries <input value={search} onChange={changeSearch} />
    </p>
    <Notification message={message} />
    <Results results={results} setCountryDetails={setCountryDetails} />
    <CountryInfo country={countryDetails} weather={weather} />
  </>
}

export default App
