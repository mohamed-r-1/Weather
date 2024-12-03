import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "f565eb65788f87b982f433a34d8ddbb4";

const App = () => {
  const [weather, setWeather] = useState({
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    icon: '',
    error: ''
  });

  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    const cityInput = e.target.elements.city.value;
    const countryInput = e.target.elements.country.value;
    
    if (cityInput && countryInput) {
      setCity(cityInput);
      setCountry(countryInput);
    } else {
      setWeather({ error: 'Please Enter Data' });
    }
  };

  useEffect(() => {
    if (city && country) {
      const fetchWeather = async () => {
        try {
          const apiWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
          const weatherData = await apiWeather.json();

          if (weatherData.cod === 200) {
            setWeather({
              temperature: weatherData.main.temp,
              city: weatherData.name,
              country: weatherData.sys.country,
              humidity: weatherData.main.humidity,
              description: weatherData.weather[0].description,
              icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
              error: ''
            });

            // Fetch 5-day forecast
            const apiForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
            const forecastData = await apiForecast.json();
            setForecast(forecastData.list.filter((item, index) => index % 8 === 0)); // 5-day forecast, 3-hour intervals
          } else {
            setWeather({ error: weatherData.message });
          }
        } catch (error) {
          setWeather({ error: 'Unable to fetch data. Please try again later.' });
        }
      };

      fetchWeather();
    }
  }, [city, country]);

  return (
    <div className='wrapper'>
      <div className='form-container'>
        <Form getWeather={getWeather} />
        <Weather
          temperature={weather.temperature}
          city={weather.city}
          country={weather.country}
          humidity={weather.humidity}
          description={weather.description}
          icon={weather.icon}
          forecast={forecast}
          error={weather.error}
        />
      </div>
    </div>
  );
};

export default App;
