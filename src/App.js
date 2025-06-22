import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherAnimation from "./WeatherAnimation "; // Import animation component

const apiKey = "9db1211cb9e5a3330940ebd56beb4698";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct";

function App() {
  const [city, setCity] = useState("Hanoi");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`
      );
      setWeatherData(res.data);
    } catch (error) {
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const weatherMain = weatherData?.weather?.[0]?.main;
  let weatherClass = "";
  if (weatherMain === "Clear") weatherClass = "sunny";
  else if (weatherMain === "Rain") weatherClass = "rainy";
  else if (weatherMain === "Clouds") weatherClass = "cloudy";
  else if (weatherMain === "Thunderstorm") weatherClass = "stormy";

  return (
    <div className={`app ${weatherClass}`}>
      <h1>Thời tiết</h1>
      <input
        type="text"
        placeholder="Nhập tên thành phố"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Lấy dữ liệu</button>

      <div className="weather-display">
        {isLoading ? (
          <p>Đang tải...</p>
        ) : weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Nhiệt độ: {weatherData.main.temp}°C</p>
            <p>Trạng thái: {weatherData.weather[0].description}</p>

            <WeatherAnimation weather={weatherMain} />
          </div>
        ) : (
          <p>Không thể lấy dữ liệu.</p>
        )}
      </div>
    </div>
  );
}

export default App;
