import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

const API_KEY = "93e8720799e366ff0d24a0e5982dddeb";

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState(null);
  const cities = ["Seoul", "London", "Vancouver", "New York"];

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const backgroundByWeather = () => {
    const mainWeather = weather?.weather[0].main;
    switch (mainWeather) {
      case "Clear":
        return "clear-bg";
      case "Clouds":
        return "clouds-bg";
      case "Rain":
        return "rain-bg";
      case "Snow":
        return "snow-bg";
      default:
        return "default-bg";
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className={backgroundByWeather()}>
      {loading ? (
        <div className="container">
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            setCity={setCity}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </div>
      )}
    </div>
  );
}

export default App;
