import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import WeatherAnimation from "./WeatherAnimation";
import GoogleAd from "./GoogleAd";
import { message } from "antd";

const apiKey = "9db1211cb9e5a3330940ebd56beb4698";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState(""); // Thành phố nhập từ người dùng
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm gọi API theo tên thành phố
  const fetchWeatherByCity = async () => {
    if (!city.trim()) {
      messageApi.warning("Vui lòng nhập tên thành phố.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric&lang=vi`
      );
      setWeatherData(res.data);
    } catch (error) {
      setWeatherData(null);
      messageApi.error("Không tìm thấy thông tin thời tiết cho thành phố này.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm gọi API khi nhấn Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchWeatherByCity();
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
      <h1>Dự báo thời tiết</h1>

      {/* Nhập tên thành phố */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Nhập tên thành phố (VD: Hanoi)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchWeatherByCity}>Xem thời tiết</button>
      </div>

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
        ) : (
          <p>Vui lòng nhập tên thành phố để xem thời tiết.</p>
        )}
      </div>
    </div>
  );
};

export default App;
