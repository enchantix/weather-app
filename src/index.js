function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let year = now.getFullYear();
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
let minute = addZero(now.getMinutes());

console.log(`${day}, ${date} ${month} ${year}, ${hour}:${minute}`);

let newDay = document.querySelector("h2, .date-day");
newDay.innerHTML = `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  console.log(input.value);
  let newCity = document.querySelector("h1, .current-city");
  newCity.innerHTML = input.value;
  findCityMetric(input.value);
  findCityImperial(input.value);
  findCitySun(input.value);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

function displayWeatherMetric(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels Like: ${response.data.main.feels_like} °C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/hr`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  document.querySelector(".weather-type").innerHTML =
    response.data.weather[0].main;
}

function displayWeatherImperial(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#feels-like"
  ).innerHTML = `Feels Like: ${response.data.main.feels_like} °F`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mi/hr`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  document.querySelector(".weather-type").innerHTML =
    response.data.weather[0].main;
}

function displaySun(response) {
  let sunrise = document.querySelector(".sr-time");
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunriseHour = sunriseTime.getHours();
  let sunriseMinute = sunriseTime.getMinutes();
  if (sunriseMinute < 10) {
    sunriseMinute = `0${sunriseMinute}`;
  }
  if (sunriseHour < 10) {
    sunriseHour = `0${sunriseHour}`;
  }
  sunrise.innerHTML = `${sunriseHour}:${sunriseMinute}`;

  let sunset = document.querySelector(".ss-time");
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let sunsetHour = sunsetTime.getHours();
  let sunsetMinute = sunsetTime.getMinutes();
  if (sunsetMinute < 10) {
    sunsetMinute = `0${sunsetMinute}`;
  }
  sunset.innerHTML = `${sunsetHour}:${sunsetMinute}`;
}

function findCitySun(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySun);
}

function findCityMetric(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherMetric, displaySun);
}

function findCityImperial(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherImperial, displaySun);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", findCityImperial);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", findCityMetric);
