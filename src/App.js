import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherAnimation from "./WeatherAnimation ";
import GoogleAd from "./GoogleAd";
import { Button, message } from "antd";

const apiKey = "9db1211cb9e5a3330940ebd56beb4698";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const App = () => {
  const [city, setCity] = useState("Hanoi");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm lấy dữ liệu thời tiết
  const fetchWeather = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`
      );
      setWeatherData(res.data);
    } catch (error) {
      setWeatherData(null);
      messageApi.error(" Không tìm thấy thành phố hoặc dữ liệu thời tiết.");
    } finally {
      setIsLoading(false);
    }
  };

  // Xác định class nền theo thời tiết
  const weatherMain = weatherData?.weather?.[0]?.main;
  let weatherClass = "";
  if (weatherMain === "Clear") weatherClass = "sunny";
  else if (weatherMain === "Rain") weatherClass = "rainy";
  else if (weatherMain === "Clouds") weatherClass = "cloudy";
  else if (weatherMain === "Thunderstorm") weatherClass = "stormy";

  const appClass = `app ${!isLoading && weatherData === null ? "notfound" : weatherClass}`;

  return (
    <div className={appClass}>
      {contextHolder}
      <h1>Thời tiết</h1>
      <input
        type="text"
        placeholder="Nhập tên thành phố"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <Button type="primary" onClick={fetchWeather} loading={isLoading}>
        Lấy dữ liệu
      </Button>

      <div className="weather-display">
        {isLoading ? (
          <p>Đang tải...</p>
        ) : weatherData ? (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Nhiệt độ: {weatherData.main.temp}°C</p>
            <p>Trạng thái: {weatherData.weather[0].description}</p>
            <WeatherAnimation weather={weatherMain} />
            <GoogleAd />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;