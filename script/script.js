function cityName(event) {
  event.preventDefault();

  let searchCity = document.querySelector("#search-city");
  let apiKey = "ae7a846b3048f734526a71e1a47e2b4b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchCity.value}`.toLocaleUpperCase().trim();
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
          <div class="date">${day}</div>
          <div>
            <br />
            <img src="img/rain.png" width="30px" />
          </div>
          <br />
          <div>
            <span class="weather-max"> 31° </span>
            <span class="weather-min"> 25° </span>
          </div>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  let iconElement = document.querySelector("#weather-icon");

  let iconCode = response.data.weather[0].icon;
  if ((iconCode = "50d")) {
    iconElement.setAttribute("src", `img/mist.png`);
  }

  let weather = response.data.weather[0].main;

  if (weather == "Clouds") {
    iconElement.setAttribute("src", `img/cloudy.png`);
  }
  if (weather == "Rain") {
    iconElement.setAttribute("src", `img/rain.png`);
  }

  if (weather == "Drizzle") {
    iconElement.setAttribute("src", `img/rain.png`);
  }

  if (weather == "Clear") {
    iconElement.setAttribute("src", `img/sunny.png`);
  }
  if (weather == "Thunderstorm") {
    iconElement.setAttribute("src", `img/thunder.png`);
  }
  if (weather == "Snow") {
    iconElement.setAttribute("src", `img/snow.png`);
  }
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

displayForecast();
