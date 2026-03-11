// Weather App

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "b70793b3a86109aec09a48441e860f72";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityinput.value;

    if(city) {
        try{
            const weatherData = await getweatherData(city);
            displayweatherinfo(weatherData);
        }catch(error) {
            console.log(error);
            displayerror(error);
            
        }
    } else {
        displayerror("Please Enter a City")
    }

})

async function getweatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);

    if(!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
    
}

function displayweatherinfo(data) {
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getweatheremoji(id);

    cityDisplay.classList.add("citydisplay");
    tempDisplay.classList.add("temp");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("desc");
    weatherEmoji.classList.add("emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getweatheremoji(weatherId) {

    switch(true) {
        case (weatherId >= 200 && weatherId < 300) :
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400) :
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600) :
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700) :
            return "❄️";
        case (weatherId >= 700 && weatherId < 800) :
            return "🌁"; 
        case (weatherId === 800) :
            return "🌞";
        case (weatherId >= 801 && weatherId < 810) :
            return "☁️";
        default:
            return "❓" 
    }
}

function displayerror(message) {
    const errordisplay = document.createElement("p")
    errordisplay.textContent = message;
    errordisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisplay);
}