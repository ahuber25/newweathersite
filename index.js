const weatherHistory = [];
const APIRoot = "https://api.openweathermap.org";
const APIKey = "9bde15c33710b2091eebc5fac8761c64";

const searchBar = document.querySelector('#searchbar');
const searchText = document.querySelector('#searchtext');
const currentDay = document.querySelector('#today');
const foreCast = document.querySelector('#forecast');
const searchHistory = document.querySelector('#history');

function fetchWeather() {

    const apiURL = `${APIRoot}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`;
    let { lat } = location;
    let { lon } = location;
    let city = location.name;

    fetch(apiURL)
        .then(function (res) {
            return res.json()
        })
        .catch(function (err) {
            console.error(err);
        })

}