import './index.css';

import { useState, useEffect } from 'react';
import getAll from './services/CountryList';
import Filter from './components/Filter';


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [weather, setWeather] = useState('')

  const filteredNations = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  )

  useEffect(() => {
    getAll()
    .then(response => {
      setCountries(response)
    })
  },[])

  useEffect(() => {
    if (filteredNations.length === 1) {
      const api_key = import.meta.env.VITE_SOME_KEY;
      const query = filteredNations[0].capital;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setWeather(data);
          console.log(data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [filteredNations]);
  
  return (
    <div>
      <h1>Countries</h1>
      <Filter props={{filterText: searchCountry, onFilterChange: setSearchCountry}}/>
        <div> 
          <ul>
            {filteredNations.slice(0,10).map((country) => (
              <li key={country.name.common}>{country.name.common}</li>
            ))}
            </ul>
            {filteredNations.length > 0 && filteredNations.length < 2 && ( 
                <div>
                  <h1>{filteredNations[0].name.common}</h1>
                    <p> Capital:  {filteredNations[0].capital}</p>
                    <p> Area: {filteredNations[0].area} km</p> 
                  <h2>Languages</h2>  
                  <ul>
                    {filteredNations[0].languages && Object.values(filteredNations[0].languages).map((language) => (
                      <li key={language}> {language}</li>
                    ))}
                  </ul>
                  <img src={filteredNations[0].flags.png}/>

                  {weather && (
                    <h3>Weather in {filteredNations[0].name.common}
                    <p>Temperature: {weather.main.temp}  °C</p>
                    <div>
                      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} className='icon' />
                    </div>
                      <p>Wind: {weather.wind.speed} m/s</p>
                    </h3>
                    )}
               </div>
            )}
        </div>
    </div>
  )
}

export default App;
