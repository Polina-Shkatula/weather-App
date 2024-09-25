const apiKey = "119b9451f945808c64b1d2ca86788f0c";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
let data  = '';

document.addEventListener('DOMContentLoaded', () => {
    const storedData = JSON.parse(localStorage.getItem('data'));
    checkWeather(storedData.name);
});

const saveData = () =>  {
    localStorage.setItem('data', JSON.stringify(data));
}

async function checkWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);
    data = await response.json();

    if (response.status === 404){
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }else {
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed + "km/h";

        switch(data.weather[0].main) {
            case 'Clouds': 
                weatherIcon.src = "/asset/clouds.png";
                break;
            case 'Clear':
                weatherIcon.src = "/asset/clear.png";
                break;
            case 'Drizzle':
                weatherIcon.src = "/asset/drizzle.png";
                break;
            case 'Humidity':
                weatherIcon.src = "/asset/humidity.png";
                break;
            case 'Mist':
                weatherIcon.src = "/asset/mist.png";
                break;
            case 'Rain':
                weatherIcon.src = "/asset/rain.png";
                break;
        }

        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
    console.log(data);
    console.log(searchBox.value);
    saveData();
}

searchBtn.addEventListener('click', () => {
    if(searchBox.value !== '') {
        checkWeather(searchBox.value);
        document.querySelector('.empty').style.display = "none";
    }
    else {
        document.querySelector('.empty').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
});

searchBox.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && searchBox.value !==  '') {
        checkWeather(searchBox.value);
        document.querySelector('.empty').style.display = "none";
    }
    else if(e.key === 'Enter' && searchBox.value ===  '')  {
        document.querySelector('.empty').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    }
});