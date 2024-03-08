const apiKey = '98ad2f2a977e40544e9730c01523aa3e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const form = document.querySelector('form')
const inputField = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const errorDiv = document.querySelector('.error')
const weather = document.querySelector('.weather')

const weatherImg = document.querySelector('.weather-img')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

const cityName = inputField.value

async function checkWeather(cityName){
    const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

    if(response.status == 404){
        errorDiv.style.display = 'block'
        weather.style.display = 'none'
    } else{

        var data = await response.json();

        if(data.weather[0].main === 'Clouds'){
            weatherImg.src = `./images/clouds.png`
        } else if(data.weather[0].main === 'Clear'){
            weatherImg.src = `./images/clear.png`
        } else if(data.weather[0].main === 'Drizzle'){
            weatherImg.src = `./images/drizzle.png`
        } else if(data.weather[0].main === 'Mist' || data.weather[0].main === 'Smoke' || data.weather[0].main === 'Haze' || data.weather[0].main === 'Dust' || data.weather[0].main === 'Fog' || data.weather[0].main === 'Sand' || data.weather[0].main === 'Ash'){
            weatherImg.src = `./images/mist.png`
        } else if(data.weather[0].main === "Rain"){
            weatherImg.src = `./images/rain.png`
        } else if(data.weather[0].main === 'Snow'){
            weatherImg.src = `./images/snow.png`
        }

        temp.innerHTML = Math.round(data.main.temp) + `°C`
        city.innerHTML = data.name + ", " + data.sys.country
        humidity.innerHTML = data.main.humidity +`%`
        wind.innerHTML = data.wind.speed +` km/h`

        errorDiv.style.display = 'none'
        weather.style.display = 'block'
    }


    console.log(data)
    console.log(data.main.temp)
}

searchButton.addEventListener('click', (e)=>{
    e.preventDefault()
    weather.style.display = 'block'
    checkWeather(inputField.value)
})











