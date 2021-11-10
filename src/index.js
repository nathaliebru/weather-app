//Input and output search a city
function dateUpdate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function forecastDateUpdate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
       <div class="col-2">
         ${forecastDateUpdate(forecastDay.dt)}
         <img src="images/${
           forecastDay.weather[0].description
         }.svg" alt="rain" width="50px" />
         <div class="weather-forecast-temperature">
           <span class="weather-forecast-temperature-min"> ${Math.round(
             forecastDay.temp.min
           )}° </span>
           <span class="weather-forecast-temperature-max"> ${Math.round(
             forecastDay.temp.max
           )}° </span>
         </div>
       </div>
     `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getCoordinates(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "e6510698077be6c89580a721b02f9621";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let icon = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = dateUpdate(
    response.data.dt * 1000
  );
  document.querySelector("#icon").setAttribute("src", `images/${icon}.svg`);

  getCoordinates(response.data.coord);
}

function searchCity(city) {
  let apiKey = "e6510698077be6c89580a721b02f9621";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//Current location button
function searchLocation(position) {
  let apiKey = "e6510698077be6c89580a721b02f9621";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", getCurrentLocation);

//Default city on page
searchCity("Amsterdam");
