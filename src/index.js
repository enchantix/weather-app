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
  findCityMetric();
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

function displayWeatherMetric(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )} °C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} km/hr`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  document.querySelector(".weather-type").innerHTML =
    response.data.weather[0].description;
}

function displayWeatherImperial(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )} °F`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind-speed").innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )} mi/hr`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure} mb`;
  document.querySelector(".weather-type").innerHTML =
    response.data.weather[0].description;
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

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <div class="card" style="width: 10rem;">
        <img
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
          class="card-img-top"
          alt="weather of the hour"
        />
        <div class="card-body forecast-details">
          <h5 class="card-title">${formatHours(forecast.dt * 1000)}</h5>
            <p class="card-text">
              High: <span class="forecast-high">${Math.round(
                forecast.main.temp_max
              )}°</span> <br />
              Low: <span class="forecast-low">${Math.round(
                forecast.main.temp_min
              )}°</span>
            </p>
        </div>
      </div>
    </div>
    `;
  }
}

function findCitySun(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displaySun);
}

function findCityMetric(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherMetric);
  forecastMetric();
  findCitySun();
}

function findCityImperial(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherImperial);
  forecastImperial();
  findCitySun();
}

function favCityMetricSg(location) {
  document.querySelector("h1").innerHTML = document.getElementById(
    "fav-city-sg"
  ).value;
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherMetric);
  forecastMetric();
  findCitySun();
}

function favCityMetricSea(location) {
  document.querySelector("h1").innerHTML = document.getElementById(
    "fav-city-sea"
  ).value;
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherMetric);
  forecastMetric();
  findCitySun();
}

function forecastMetric(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(forecastUrl).then(displayForecast);
}

function forecastImperial(location) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let city = document.querySelector("h1").innerHTML;
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(forecastUrl).then(displayForecast);
}

function currentPositionMetric(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherMetric);
  forecastMetric();
  findCitySun();
}

function currentPositionImperial(position) {
  let apiKey = "b10fbd6ef459c2258d75234428b8c26a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherImperial);
  forecastImperial();
  findCitySun();
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    currentPositionMetric,
    currentPositionImperial
  );
  currentPositionMetric();
}

let pin = document.querySelector(".geolocation");
pin.addEventListener("click", getCurrentPosition);

let favourite = document.querySelector("#fav-city-sg");
favourite.addEventListener("click", favCityMetricSg);

let favourite2 = document.querySelector("#fav-city-sea");
favourite2.addEventListener("click", favCityMetricSea);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", findCityImperial, forecastImperial);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", findCityMetric, forecastMetric);
