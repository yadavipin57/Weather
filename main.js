const apiKey = '98ad2f2a977e40544e9730c01523aa3e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
// https://api.openweathermap.org/data/2.5/weather?units=imperial&q=Mumbai&appid=98ad2f2a977e40544e9730c01523aa3e

const form = document.querySelector('form')
const inputField = document.querySelector('.search input')
const metric = document.querySelector('.metric')
const imperial = document.querySelector('.imperial')
const errorDiv = document.querySelector('.error')
const cityTime = document.querySelector('.city-time')
const weather = document.querySelector('.weather')

const weatherImg = document.querySelector('.weather-img')

const celsius = document.querySelector('.celsius')
const fahrenheit = document.querySelector('.fahrenheit')

const city = document.querySelector('.city')

const feelsLike = document.querySelector('.feels-like')
const tempMin = document.querySelector('.temp-min')
const tempMax = document.querySelector('.temp-max')
const feelsLikeFahrenheit = document.querySelectorAll('.feels-like-fahrenheit')
const tempMinFahrenheit = document.querySelectorAll('.temp-min-fahrenheit')
const tempMaxFahrenheit = document.querySelectorAll('.temp-max-fahrenheit')

const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const coordinates = document.querySelector('.coordinates')
const pressure = document.querySelector('.pressure')

const currentTime = new Date()
cityTime.innerHTML = `${currentTime.toDateString()} | Indian Standard Time : ${currentTime.toLocaleTimeString()}`



async function checkWeather() {
    const cityName = inputField.value
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if (response.status == 404) {
        errorDiv.style.display = 'block'
        weather.style.display = 'none'
    } else {

        var data = await response.json();

        if (data.weather[0].main === 'Clouds') {
            weatherImg.src = `./images/clouds.png`
        } else if (data.weather[0].main === 'Clear') {
            weatherImg.src = `./images/clear.png`
        } else if (data.weather[0].main === 'Drizzle') {
            weatherImg.src = `./images/drizzle.png`
        } else if (data.weather[0].main === 'Mist' || data.weather[0].main === 'Smoke' || data.weather[0].main === 'Haze' || data.weather[0].main === 'Dust' || data.weather[0].main === 'Fog' || data.weather[0].main === 'Sand' || data.weather[0].main === 'Ash') {
            weatherImg.src = `./images/mist.png`
        } else if (data.weather[0].main === "Rain") {
            weatherImg.src = `./images/rain.png`
        } else if (data.weather[0].main === 'Snow') {
            weatherImg.src = `./images/snow.png`
        }

        celsius.innerHTML = Math.round(data.main.temp) + `°C` // default
        city.innerHTML = data.name + ", " + data.sys.country
        feelsLike.innerHTML = Math.round(data.main.feels_like) + `°C`
        tempMin.innerHTML = Math.round(data.main.temp_min) + `°C`
        tempMax.innerHTML = Math.round(data.main.temp_max) + `°C`
        humidity.innerHTML = data.main.humidity + `%`
        wind.innerHTML = data.wind.speed + ` km/h`
        coordinates.innerHTML = data.coord.lon.toFixed(2) + 'E' + ' ' + data.coord.lat.toFixed(2) + 'N'
        pressure.innerHTML = data.main.pressure + ' ' + `millibar`

        errorDiv.style.display = 'none'
        weather.style.display = 'flex'

        imperial.addEventListener('click', () => {
            celsius.style.display = 'none'
            feelsLike.style.display = 'none'
            tempMin.style.display = 'none'
            tempMax.style.display = 'none'
            fahrenheit.style.display = 'block'
            feelsLikeFahrenheit.display = 'block'
            tempMinFahrenheit.display = 'block'
            tempMaxFahrenheit.display = 'block'
            fahrenheit.innerHTML = Math.round(((9 * data.main.temp) / 5) + 32) + `°F`
            feelsLikeFahrenheit.innerHTML = Math.round(((9 * data.main.feels_like) / 5) + 32) + `°F`
            tempMinFahrenheit.innerHTML = Math.round(((9 * data.main.temp_min) / 5) + 32) + `°F`
            tempMaxFahrenheit.innerHTML = Math.round(((9 * data.main.temp_max) / 5) + 32) + `°F`
        })

        metric.addEventListener('click', () => {
            celsius.style.display = 'block'
            fahrenheit.style.display = 'none'
            feelsLikeFahrenheit.display = 'none'
            tempMinFahrenheit.display = 'none'
            tempMaxFahrenheit.display = 'none'
        })

    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkWeather();
});