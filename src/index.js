//Display current day and time
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];

let currentHour = currentTime.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = currentTime.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let h2 = document.querySelector("h2");
h2.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//Input and output search a city
function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-type").innerHTML =
    response.data.weather[0].main;
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

searchCity("Amsterdam");

//Fahrenheit en Celsius
// function changeToFahrenheit() {
//   let temperature = document.querySelector(".temperature");
//   temperature.innerHTML = 57;
// }

// let fahrenheit = document.querySelector("#fahrenheit-link");
// fahrenheit.addEventListener("click", changeToFahrenheit);

// function changeToCelsius() {
//   let temperature = document.querySelector(".temperature");
//   temperature.innerHTML = 14;
// }

// let celsius = document.querySelector("#celsius-link");
// celsius.addEventListener("click", changeToCelsius);

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
