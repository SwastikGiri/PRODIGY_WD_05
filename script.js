const container = document.querySelector('.container')
const search = document.querySelector('.search-bar button')
const weatherbox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click',() => {
    const APIkey = '04c0ccd571b789ac0e382c38536da63e'
    const city = document.querySelector('.search-bar input').value;
    if(city == ''){
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(res => res.json())
    .then((data) => {

        if(data.cod == '404'){
            container.style.height = '400px'
            weatherbox.classList.remove('active')
            weatherDetails.classList.remove('active')
            error404.classList.add('active');
            return
        }

        container.style.height = '555px'
        weatherbox.classList.add('active')
        weatherDetails.classList.add('active')
        error404.classList.remove('active');
        
        const image = document.querySelector('.weather-box img')
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.weather-details .humidity span')
        const wind = document.querySelector('.weather-details .wind span')

        switch(data.weather[0].main){
            case 'Clear':
                image.src = 'images/clear.png'
                break;
            case 'Rain':
                image.src = 'images/rain.png'
                break;
            case 'Snow':
                image.src = 'images/snow.png'
                break;
            case 'Clouds':
                image.src = 'images/cloud.png'
                break;
            case 'Mist':
                image.src = 'images/mist.png'
                break;
            case 'Haze':
                image.src = 'images/mist.png'
                break;
            default:
                image.src = 'images/cloud.png'
        }

        temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`
        description.innerHTML = `${data.weather[0].description}`
        humidity.innerHTML = `${data.main.humidity}%`
        wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`
    })
})