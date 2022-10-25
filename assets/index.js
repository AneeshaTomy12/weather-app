const timeElement = document.getElementById('time')
const dateElement = document.getElementById('date_now')
const currentWeatherItems = document.getElementById('weather')
const timeZone = document.getElementById('timeZone')
const countryElement = document.getElementById('country')
const weatherForcastElement = document.getElementById('future-forcast')
const currentTempratureElement = document.getElementById('today_temp')

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['jan', 'feb', 'mar', 'april', 'may', 'june', 'july', 'August', 'September', 'October', 'November', 'December']

setInterval(() => {
  const time = new Date()
  const month = time.getMonth()
  const date = time.getDate()
  const day = time.getDay()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const ampm = hour >= 12 ? 'PM' : 'AM'

  timeElement.innerHTML = hour + ':' + minute + '' + `<span id="am-pm">${ampm}</span>`
  dateElement.innerHTML = days[day] + ', ' + date + ' ' + months[month]


}, 1000);
let weather = {
  apiKey: "e7c2cdaec768a6ba400beb5926e9209f",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      this.apiKey

    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    //  
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // const { timeZoneElement } =  data.timezone;
    // const { countryZone } = data.coord.lat+ 'N ' + data.coord.lon+'E';
    // const {cntry}=data.sys.country;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    // document.querySelector(".country").innerHTML=cntry;
    document.querySelector(".timeZone").innerText = data.coord.lat + 'N ' + data.coord.lon + 'E';
    document.querySelector(".country").innerText = data.sys.country;
    document.querySelector(".weatherr").classList.remove("loading");

  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Kerala");