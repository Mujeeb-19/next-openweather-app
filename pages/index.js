// pages/index.js
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = async () => {
    setError("");
    setWeatherData(null);

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setLoading(true);
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather`;
      const response = await axios.get(url, {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather App</h1>
      <div style={{ margin: "10px 0" }}>
        <label htmlFor="city" style={{ marginRight: "5px" }}>
          City:
        </label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          aria-label="City name input"
        />
        <button onClick={handleSearch} style={{ marginLeft: "5px" }}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Weather in {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Feels Like: {weatherData.main.feels_like} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
