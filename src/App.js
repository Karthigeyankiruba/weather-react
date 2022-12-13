import { useState } from "react";
import "./App.css";
import { UilTemperature, UilTear, UilWind, } from "@iconscout/react-unicons";
import icon from './assets/weather.svg'

const api = {
  key: "10990d4d78c76c5b88cdf3a778906431",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };


  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}

          />
       
        </div>

        {typeof weather.main != "undefined" ? (
          <>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>

            <div className="features">
              <div>
                <UilTemperature size={18} className="" />
                Real fill:
                <span className="font-medium ml-1">{`${weather.main.feels_like.toFixed()}°`}</span>
              </div>
              <div className="flex items-center justify-center font-light text-sm">
                <UilTear size={18} className="" />
                Humidity:
                <span className="font-medium ml-1">{`${weather.main.humidity.toFixed()}%`}</span>
              </div>
              <div className="flex items-center justify-center font-light text-sm">
                <UilWind size={18} className="" />
                Wind :
                <span className="font-medium ml-1">{`${weather.wind.speed.toFixed()}km/h`}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="open">
            <h1>Weather App</h1>
            <img src={icon} alt="" />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
