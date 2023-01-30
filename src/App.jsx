import { useEffect, useState } from "react";
import { getFormatData } from "./async/weather";
import "./App.css";
import hotBackImg from "./assets/hot.jpg";
import coldBackImg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";

function App() {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState(hotBackImg);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormatData(city, units);
      setWeather(data);
      const changeWeather = units === "metric" ? 10 : 60;
      if (data.temp <= changeWeather) {
        setBg(coldBackImg);
      } else {
        setBg(hotBackImg);
      }
    };
    fetchData();
  }, [units, city]);

  const handleUnits = (e) => {
    const btn = e.currentTarget;
    const currentUnit = btn.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    btn.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg}` }}>
      <div className="wrapper">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                className="section__input"
                type="text"
                name="city"
                placeholder="Enter City..."
                onKeyDown={enterPressed}
              />
              <button className="section__btn" onClick={(e) => handleUnits(e)}>
                °F
              </button>
            </div>
            <div className="section section__temperature">
              <div className="section__temperature-icon">
                <h3 className="section__temperature-name">
                  {`${weather.name}, ${weather.country}`}
                </h3>
                <img
                  className="section__temperature-img"
                  src={weather.iconURL}
                  alt="weatherIcon"
                />
                <h3 className="section__temperature-text">
                  {weather.description}
                </h3>
              </div>
              <div className="temperature">
                <h1 className="temperature__num">{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

// d6768f9eb86b23d409955d0b6980f88b;

//https: api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export default App;
