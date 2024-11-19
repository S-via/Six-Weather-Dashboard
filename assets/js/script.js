const APIKey = "4ebcefcab7254606762fdd9420d2df3a"
const searchForm = document.querySelector('#searchform');
const searchInputValue = document.querySelector('#searchcity');
//search city button
const searchButton = document.querySelector('#citybutton');
// empty container for weather 
const emptyContainer = document.querySelector('#currentweathercontainer');
// empty container for 5 day weather
 

// logic to save data in local storage
/* const savedWeatherData = localStorage.getItem('weatherData');
if (savedWeatherData) {
    displayWeather(JSON.parse(savedWeatherData), true);
}
 */

const formSubmitHandler = function (event) {
    event.preventDefault();
    const city = searchInputValue.value.trim();

    if (city) {
        console.log('city added')
        getWeather(city);
    } else {
        alert('add city')
    }
}
searchButton.addEventListener('click', formSubmitHandler);

// add logic to button to retrieve city names weather allready listed

// FETCH CURRENT
const getWeather = function (city) {
    const queryString = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}
    `
        ;
    fetch(queryString)
        .then(function (response) {

            return response.json();


        }).then(function (data) {
            if (data.length) {
                const lat = data[0].lat;
                const lon = data[0].lon;

                currentWeather(lat, lon);

            }
        })

        .catch(function (error) {
            alert('error connecting')
        })
}
// function  to get current weather using lon  & lat
const currentWeather = function (lat, lon) {
    const cWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(cWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            displayWeather(data);
        }
        );
}

// function to display current weather
const displayWeather = function (weatherData) {
 
            emptyContainer.innerHTML =
                `
            <h2>${weatherData.name}</h2>
             <p>Temp:${weatherData.main.temp}</p><br>
            <p>Wind: ${weatherData.wind.speed}</p><br>
            <p>Humidity:${weatherData.main.humidity} </p><br>
           

            `


        


} 