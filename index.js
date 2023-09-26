// Never put your API key in the JS file, or front-end. This can result in hacking of your API account and data.
// Always secure with some sort of process.env file in the back-end
API_KEY = "";

// Gets the city that user searches and passes it to getWeather
function searchWeather() {
  const location = document.querySelector(".search__bar").value;
  getWeather(location);
}

// Gets weather data for a specific city from api
function getWeather(location) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      location + "&units=imperial&appid=" + API_KEY)
  .then((res) => res.json())
  .then((data)=> {
    displayWeather(data);
    })
  }

// Displays weather
function displayWeather(data) {
  //this is called destructuring assignment, it's useful to to extract values from objects
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity, feels_like } = data.main;
  const { speed } = data.wind;

  document.querySelector(".location").innerText = "Weather in " + name;
  document.querySelector(".weather__icon").src =
    "http://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".temp").innerText = Math.round(temp) + "°F";
  document.querySelector(".description").innerText = description;
  document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".feels_like").innerText =
    "Feels like: " + feels_like + "°F";
}

// Listen for click event on button for searching
document.querySelector(".search__button").addEventListener("click", () => {
  searchWeather();
});

// Listen for enter event in search bar for searching
document.querySelector(".search__bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    searchWeather();
  }
});

// Show weather for Nashville on initial load/render
getWeather("Nashville");
