const weatherHistory = [];
const APIRoot = "api.openweathermap.org";
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

function fetchLocation(search) {
    const apiURL = `${APIRoot}/data/2.5/weather?q=${search}&APPID=${APIKey}`

    fetch(apiURL)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        if (!data[0]) {
            alert("Pleae enter valid location.")
        } else {
            fetchWeather(data[0]);
        }
    })
    .catch(function (err) {
        console.error(err)
    })
}

function submitHandle(event) {
    console.log("Submit has been pressed.")

}


searchBar.addEventListener('submit', submitHandle);