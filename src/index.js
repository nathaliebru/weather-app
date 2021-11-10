// //Display current day and time
// let currentTime = new Date();

// let days = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// let currentDay = days[currentTime.getDay()];

// let currentHour = currentTime.getHours();
// if (currentHour < 10) {
//   currentHour = `0${currentHour}`;
// }

// let currentMinutes = currentTime.getMinutes();
// if (currentMinutes < 10) {
//   currentMinutes = `0${currentMinutes}`;
// }
// let date = document.querySelector("#date");
// date.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
         ${day}
         <img src="images/rain.svg" alt="rain" width="50px" />
         <div class="weather-forecast-temperature">
           <span class="weather-forecast-temperature-min"> 10° </span>
           <span class="weather-forecast-temperature-max"> 14° </span>
         </div>
       </div>
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  console.log(response.data.daily);
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
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
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
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let buttonCurrent = document.querySelector("#current-location");
buttonCurrent.addEventListener("click", getCurrentLocation);

//Fahrenheit en Celsius conversion
function changeToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(temperatureFahrenheit);
}

function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector(".temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let celsiusTemperature = null;

//Default city on page
searchCity("Amsterdam");
