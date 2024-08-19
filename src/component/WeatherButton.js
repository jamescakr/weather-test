import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, setCity, selectedCity, setSelectedCity }) => {
  const handleClick = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  return (
    <div className="box">
      <Button
        variant={selectedCity === "" ? "primary" : "warning"}
        onClick={() => handleClick("")}
      >
        Current Location
      </Button>

      {cities.map((item, index) => (
        <Button
          variant={selectedCity === item ? "primary" : "warning"}
          key={index}
          onClick={() => handleClick(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
