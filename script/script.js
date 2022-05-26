function cityName(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  searchCity(city.value);
}

function searchCity(city) {
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

searchCity("Balikpapan");

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-daily");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       <img src="img/${forecastDay.weather[0].icon}.png" alt="${
          forecastDay.weather[0].description
        }" class="icon-forecast" id="icon-forecast" width="30px"/>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let descriptionElement = document.querySelector("#description");
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  let humid = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  let currentDate = document.querySelector("#date");

  let h2 = document.querySelector("#city-name");
  let cityName = response.data.name;
  h2.innerHTML = `${cityName}`.toLocaleUpperCase().trim();

  let h1 = document.querySelector("#main-temp");
  celciusTemp = response.data.main.temp;
  h1.innerHTML = Math.round(celciusTemp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  humidityElement.innerHTML = `Humidity ${humid} %`;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weather-icon");
  let iconCode = response.data.weather[0].icon;
  iconElement.setAttribute("src", `img/${iconCode}.png`);

  getForecast(response.data.coord);
}

//convertion

function convertFahrenheit(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  celcius.classList.add("passive");
  fahrenheit.classList.add("active");
  fahrenheit.classList.remove("passive");

  let temperatureElement = document.querySelector("#main-temp");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  celcius.classList.remove("passive");
  fahrenheit.classList.remove("active");
  fahrenheit.classList.add("passive");
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertCelcius);
