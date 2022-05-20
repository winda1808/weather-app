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

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let descriptionElement = document.querySelector("#description");
  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  let humid = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  let h1 = document.querySelector("#main-temp");
  h1.innerHTML = `${temp} °C`.toLocaleUpperCase().trim();
  descriptionElement.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
  humidityElement.innerHTML = `Humidity ${humid} %`;
}

let now = new Date();

let currentDate = document.querySelector("h3");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

currentDate.innerHTML = `${day} ${hours}:${minutes}`;
