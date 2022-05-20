function cityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchCity.value}`.toLocaleUpperCase().trim();
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  let humid = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  let currentDate = document.querySelector("#date");
  let h1 = document.querySelector("#main-temp");

  celciusTemp = response.data.main.temp;
  h1.innerHTML = Math.round(celciusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  humidityElement.innerHTML = `Humidity ${humid} %`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
}

//convertion

function convertFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  celcius.classList.add("passive");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("passive");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celciusTemp = null;

function convertCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  celcius.classList.remove("passive");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("passive");
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertCelcius);
