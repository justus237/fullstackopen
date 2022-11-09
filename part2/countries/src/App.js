import { useState, useEffect } from 'react'
import axios from 'axios'
//import Note from './components/Note'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const MessageForUser = ( { text } ) => <p>{text}</p>
const ResultItem = ( { country } ) => {
  const [showAll, setShowAll] = useState(false)
  return (
    <div>
    {country.name.common}
    <Button handleClick={() => setShowAll(!showAll)} text={showAll ? 'hide' : 'show' } />
    
    {showAll ? <CountryItem country={country} /> : []}
    </div>
  )
}

const DescriptionItem = ( { attribute, value } ) => <p>{attribute} {value}</p>
const Languages = ( { languages } ) => (
  <div>
  <h3>languages:</h3>
  <ul>
  {languages.map(language => <li key={language}>{language}</li>)}
  </ul>
  </div>
)


const Weather = ( { cityName, weatherData } ) => {
  if (Object.keys(weatherData).length === 0) return <MessageForUser text='Loading weather data' />
  const temperature = `${weatherData['main'].temp} Celsius`;
  const wind = `${weatherData.wind.speed} m/s`;
  const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  return (
    <div>
    <h3> Weather in {cityName}</h3>
    <DescriptionItem attribute='temperature' value={temperature} />
    <img src={icon} alt={weatherData.weather[0].main}/>
    <DescriptionItem attribute='wind' value={wind} />
    </div>
  )
}

const CountryItem = ( { country } ) => {
  const [weatherData, setWeatherData] = useState({})
  //ideally you would probably cache the result in the App component instead of fetching it every time a country item is rendered
  useEffect(() => {
    console.log('sending query');
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log('received response');
        setWeatherData(response.data)
      })
  }, [country])
  return (
    <div>
    <h2>{country.name.common}</h2>
    {(country.capital.length === 1) ? <DescriptionItem attribute='capital' value={country.capital[0]} /> : <DescriptionItem attribute='capitals' value={country.capital.join(', ')} />}
    <DescriptionItem attribute='area' value={country.area} />
    <Languages languages={Object.values(country.languages)} />
    <img src={country.flags.png} alt='flag'/>
    <Weather cityName={country.capital[0]} weatherData={weatherData} />
    </div>
  )
}

const Results = ( { countries } ) => {
  if (countries.length > 10) {
    return <MessageForUser text='Too many matches, specify another filter' />
  } else if (countries.length === 1) {
      return <CountryItem country={countries[0]} />
  }
  return (
    countries.map((country, id) => <ResultItem key={country.ccn3} country={country}/>)
  )
}



const App = () => {
  const [searchString, setSearchString] = useState('')
  const [countries, setCountries] = useState([])

  
  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setSearchString(event.target.value)
  }

useEffect(() => {
  console.log('effect');
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('fetched ', response.data.length, 'countries')
      setCountries(response.data)
    })
}, [])


const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchString.toLowerCase()));



console.log(countriesToShow)

  return (
    <div>
    <div>find countries <input value={searchString} onChange={handleSearchInput} /></div>
    <Results countries={countriesToShow} />
    </div>
  )
}

export default App