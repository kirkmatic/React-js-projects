import React, { useState } from 'react';
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

  const search = async () => {
    const element = document.getElementsByClassName("searchinput");
    if (element[0].value === "") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      setWeatherData({
        humidity: data.main.humidity + " %",
        windSpeed: Math.floor(data.wind.speed)+ " km/h",
        temperature: Math.floor(data.main.temp) + "°C",
        location: data.name,
      });
      
      const weatherIcon = data.weather[0].icon;
      if (weatherIcon === "01d" || weatherIcon === "01n") {
        setWicon(clear_icon);
      } else if (weatherIcon === "02d" || weatherIcon === "02n") {
        setWicon(cloud_icon);
      } else if (weatherIcon === "03d" || weatherIcon === "03n") {
        setWicon(drizzle_icon);
      } else if (weatherIcon === "04d" || weatherIcon === "04n") {
        setWicon(drizzle_icon);
      } else if (weatherIcon === "09d" || weatherIcon === "09n") {
        setWicon(rain_icon);
      } else if (weatherIcon === "10d" || weatherIcon === "10n") {
        setWicon(rain_icon);
      } else if (weatherIcon === "13d" || weatherIcon === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='searchinput' placeholder='Search Location'/>
        <div className='search-icon' onClick={() => search()}>
          <img src={search_icon} alt=""/>
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
