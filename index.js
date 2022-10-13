let weatherHistory = [];
const APIRoot = "api.openweathermap.org";
const APIKey = "9bde15c33710b2091eebc5fac8761c64";

const searchBar = document.querySelector('#searchbar');
const searchText = document.querySelector('#searchtext');
const currentDay = document.querySelector('#today');
const foreCast = document.querySelector('#forecast');
const searchHistory = document.querySelector('#history');



function fetchWeather(location) {

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
    let apiUrl = `${APIRoot}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;

  fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function submitHandle(event) {
    if (!searchText.value) {
        return;
    }
    event.preventDefault();
    let search = searchText.value.trim();
    searchText.value = '';
    fetchLocation()

}

function renderHistory() {
    searchHistory.innerHTML = '';

    for (let i=weatherHistory.length - 1; i>=0; i--) {
        let btn = document.createElement('button');
        btn.setAttribute('type', 'button', 'today forecast', 'datasearch', weatherHistory[i])
        btn.classList.add('btnhistory')
        btn.textContent = weatherHistory[i]
        searchHistory.append(btn);
    }
    
}

function appendHistory(search) {
    if (weatherHistory.indexOf(search) !== -1) {
        return
    }
    weatherHistory.push(search)
    localStorage.setItem('search-history', JSON.stringify(weatherHistory))
    renderHistory();
}

function initHistory() {
    let storedHistory = localStorage.getItem('search-history')
    if (storedHistory) {
        weatherHistory = JSON.parse(storedHistory)
    }
    renderHistory();
}

function handleHistoryClick(event) {
    if (!event.target.matches('.btnhistory')) {
        return;
    }
    let btn = event.target;
    let search = btn.getAttribute('datasearch')
    fetchLocation(search);
}

initHistory();
searchBar.addEventListener('submit', submitHandle);
searchHistory.addEventListener('click', handleHistoryClick);