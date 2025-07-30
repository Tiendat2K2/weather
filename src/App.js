import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import WeatherAnimation from "./WeatherAnimation ";
import GoogleAd from "./GoogleAd";
import { message } from "antd";

const apiKey = "9db1211cb9e5a3330940ebd56beb4698";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm lấy dữ liệu thời tiết theo tọa độ
  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=vi`
      );
      setWeatherData(res.data);
    } catch (error) {
      setWeatherData(null);
      messageApi.error("Không lấy được thời tiết theo vị trí.");
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy vị trí người dùng khi load app
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          messageApi.error("Không thể truy cập vị trí. Vui lòng bật định vị.");
        }
      );
    } else {
      messageApi.warning("Trình duyệt không hỗ trợ định vị.");
    }
  }, []);

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
      <h1>Thời tiết tại vị trí của bạn</h1>

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
          <p>Không có dữ liệu thời tiết.</p>
        )}
      </div>
    </div>
  );
};


export default App;
