const apiKey = '98ad2f2a977e40544e9730c01523aa3e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=mumbai'

const form = document.querySelector('form')
const inputField = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')

const weatherImg = document.querySelector('.weather-icon')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')

async function checkWeather(){
    const response = await fetch(apiUrl + `&appid=${apiKey}`);
    var data = await response.json();

    searchButton.addEventListener('click', ()=>{
        temp.innerHTML = data.main.temp
    })

    console.log(data)
    console.log(data.main.temp)
}


checkWeather()














