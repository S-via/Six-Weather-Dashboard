const APIKey = "4ebcefcab7254606762fdd9420d2df3a"
const searchForm = document.querySelector('#searchform');
const searchInputValue = document.querySelector('#searchcity');
//search city button
const searchButton = document.querySelector('#citybutton');
// empty container for weather 
const emptyContainer = document.querySelector('#currentweathercontainer');
// empty container for 5 day weather
const emptyFiveContainer = document.querySelector('#fivedayforcast')
// empty div for button id 
const localStorageDiv = document.querySelector('.card');


const formSubmitHandler = function (event) {
    event.preventDefault();
    const city = searchInputValue.value.trim();
    
    if (city) {
        console.log('city added')
        getWeather(city);
        //save to localStorage
        saveWeatherData(city);
        
        // clear input
        searchInputValue.value='';
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
            currentFiveWeather(lat, lon);
            
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
    const currentDate = new Date(weatherData.dt*1000).toLocaleDateString('en-US',{
        month:'2-digit',
        day:'2-digit',
        year:'numeric'
    })
    
    emptyContainer.innerHTML =
    `<h2>${weatherData.name} (${currentDate})</h2>
    <ul>
    <li>Temp: ${weatherData.main.temp} °F</li>
    <li>Wind: ${weatherData.wind.speed} MPH</li>
    <li>Humidity: ${weatherData.main.humidity} %</li></ul>`
}

// Fetch 5 day forecast
const currentFiveWeather = function (lat, lon) {
    const fiveWeather = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
    fetch(fiveWeather)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        displayFiveWeather(data);
    })
    
}
// function to display 5 day forecast
// Xpert learning assistant 

const displayFiveWeather = function (data) {
    const filterData = data.list.filter((_,index)=> index<5);
    
    emptyFiveContainer.innerHTML =`<h2>5-Day Forecast:</h2>`;
    
    filterData.forEach(forecast =>{
        
        const currentDate = new Date(forecast.dt_txt).toLocaleDateString('en-US',{
            month:'2-digit',
            day:'2-digit',
            year:'2-digit'
        })
        
        emptyFiveContainer.innerHTML +=
        
        `<div><ul>
        <li id="date">${currentDate}</li>
        <li>Temp: ${forecast.main.temp} °F</li>
        <li> Wind: ${forecast.wind.speed} MPH</li>
      <li> Humidity: ${forecast.main.humidity} %</li>
      </ul></div>
      `
    })
    
} 
// LOGIC TO SAVE TO LOCAL STORAGE
const saveWeatherData = function(city){
    
    let savedWeatherData =  JSON.parse(localStorage.getItem('weatherData')) || [];
    console.log('before adding', savedWeatherData);
    savedWeatherData.push(city)
    localStorage.setItem('weatherData', JSON.stringify(savedWeatherData));
    console.log('after adding', savedWeatherData);
}


// LOGIC TO DISPLAY DATA 
// Xpert Learning assitant 
const displayWeatherData = function () {
    return;
}
    const displayCity = JSON.parse(localStorage.getItem('weatherData'))|| [];
    // append city to button
    displayCity.forEach(city =>{
        const button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click',() =>{
            getWeather(city);
        });
       
        
        //append button to container
        localStorageDiv.appendChild(button)
    },
    ),
    


document.addEventListener('DOMContentLoaded',displayWeatherData)

    
    