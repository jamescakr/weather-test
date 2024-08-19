import React from "react";

const WeatherBox = ({ weather }) => {
  const celsius = weather?.main.temp;
  const fahrenheit = celsius ? Math.round((celsius * 9) / 5 + 32) : null;
  console.log("weather?", weather);

  const cityName = weather?.name === "Montgomery" ? "Calgary" : weather?.name;

  const weatherIcons = {
    Clear: "/images/clearIcon.png",
    Clouds: "/images/cloudyIcon.png",
    Rain: "/images/rainyIcon.png",
    Snow: "/images/snowyIcon.png",
    Mist: "/images/mistIcon.png",
    Haze: "/images/mistIcon.png",
  };

  const weatherIcon = weatherIcons[weather?.weather[0].main] || "";

  return (
    <div className="weather-box">
      <div>{cityName}</div>
      <h2>
        {Math.round(celsius)}C {fahrenheit}F
      </h2>
      <h3>{weather?.weather[0].description}</h3>
      <img src={weatherIcon} />
    </div>
  );
};

export default WeatherBox;
