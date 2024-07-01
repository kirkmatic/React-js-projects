import React, { useState, useEffect } from 'react';
import './weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const api_key = "a9d186aa4ca9ab1f387842b5c6d8e574";
  const [wicon, setWicon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: "64%",
    windSpeed: "19 km/h",
    temperature: "24°C",
    location: "Manila",
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const weatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": drizzle_icon,
    "03n": drizzle_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async () => {
    if (!searchQuery) {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          humidity: `${data.main.humidity}%`,
          windSpeed: `${Math.floor(data.wind.speed)} km/h`,
          temperature: `${Math.floor(data.main.temp)}°C`,
          location: data.name,
        });

        setWicon(weatherIcons[data.weather[0].icon] || clear_icon);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    if (searchQuery) {
      search();
    }
  }, [searchQuery]);

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          className='searchinput'
          placeholder='Search Location'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt="search" />
        </div>
      </div>
      {error && <div className='error-message'>{error}</div>}
      <div className="weather-image">
        <img src={wicon} alt="weather icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="wind icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;