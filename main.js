const apiKey = '98ad2f2a977e40544e9730c01523aa3e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='
// https://api.openweathermap.org/data/2.5/weather?units=imperial&q=Mumbai&appid=98ad2f2a977e40544e9730c01523aa3e

const form = document.querySelector('form')
const inputField = document.querySelector('.search-input')
const metric = document.querySelector('.metric')
const imperial = document.querySelector('.imperial')
const errorDiv = document.querySelector('.error')
const cityTime = document.querySelector('.city-time')
const weather = document.querySelector('.weather')

const metricTempDetails = document.querySelector('.metric-temp-details')
const imperialTempDetails = document.querySelector('.imperial-temp-details')

const weatherImg = document.querySelector('.weather-img')
const metricTemp = document.querySelector('.metric-temp')
const imperialTemp = document.querySelector('.imperial-temp')
const city = document.querySelector('.city')

const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const coordinates = document.querySelector('.coordinates')
const pressure = document.querySelector('.pressure')


setInterval(() => {
    const currentTime = new Date()
    cityTime.innerHTML = `${currentTime.toDateString()} | Indian Standard Time : ${currentTime.toLocaleTimeString()}`
}, 1000);



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

        metricTemp.innerHTML = Math.round(data.main.temp) + `°C` // default
        imperialTemp.innerHTML = Math.round(((9 * data.main.temp) / 5) + 32) + `°F`

        city.innerHTML = data.name + ", " + data.sys.country
        humidity.innerHTML = data.main.humidity + `%`
        wind.innerHTML = data.wind.speed + ` km/h`
        coordinates.innerHTML = data.coord.lon.toFixed(2) + 'E' + ' ' + data.coord.lat.toFixed(2) + 'N'
        pressure.innerHTML = data.main.pressure + ' ' + `mb`

        errorDiv.style.display = 'none'
        weather.style.display = 'flex'

        imperial.addEventListener('click', () => {
            console.log(data)
            metricTemp.style.display = 'none'
            metricTempDetails.style.display = 'none'

            imperialTemp.style.display = 'block'
            imperialTempDetails.style.display = 'flex'

        })
        metricTempDetails.querySelector('.temp-1').innerHTML = `${Math.round(((9 * Number(data.main.feels_like)) / 5) + 32)}°F`
        metricTempDetails.querySelector('.temp-2').innerHTML = `${Math.round(((9 * Number(data.main.temp_min)) / 5) + 32)}°F`
        metricTempDetails.querySelector('.temp-3').innerHTML = `${Math.round(((9 * Number(data.main.temp_max)) / 5) + 32)}°F`

        metric.addEventListener('click', () => {

            console.log(data)
            imperialTemp.style.display = 'none'
            imperialTempDetails.style.display = 'none'

            metricTemp.style.display = 'block'
            metricTempDetails.style.display = 'flex'
        })

        imperialTempDetails.querySelector('.temp-1').innerHTML = `${Math.round(data.main.feels_like)}°C`
        imperialTempDetails.querySelector('.temp-2').innerHTML = `${Math.round(data.main.temp_min)}°C`
        imperialTempDetails.querySelector('.temp-3').innerHTML = `${Math.round(data.main.temp_max)}°C`

    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkWeather();
});