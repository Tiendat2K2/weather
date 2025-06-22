import React from "react";
import Lottie from "lottie-react";
import sunAnim from "./animations/sun.json";
import rainAnim from "./animations/rain.json";
import darkCloud from "./animations/darkCloud.json";

const WeatherAnimation = ({ weather }) => {
  if (weather === "Clear") {
    return <Lottie animationData={sunAnim} loop style={{ width: 150 }} />;
  }
  if (weather === "Rain") {
    return <Lottie animationData={rainAnim} loop style={{ width: 150 }} />;
  }
  if (weather === "Clouds" || weather === "Thunderstorm") {
    return <Lottie animationData={darkCloud} loop style={{ width: 200 }} />;
  }
  return null;
};

export default WeatherAnimation;
