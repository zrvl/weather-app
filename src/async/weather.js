const API_KEY = "d6768f9eb86b23d409955d0b6980f88b";

const makeIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getFormatData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ua&appid=${API_KEY}&units=${units}`;

  const data = await fetch(URL)
    .then((response) => response.json())
    .then((data) => data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    name,
    sys: { country },
    wind: { speed },
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export { getFormatData };
