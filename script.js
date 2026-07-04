const apiKey = "a7cb74a1c94f4305bb562755260407";

async function getWeather(){

    const city = document.getElementById("city").value.trim();

    if(city===""){
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try{

        const response = await fetch(url);

        const data = await response.json();

        if(data.error){
            alert(data.error.message);
            return;
        }

        document.getElementById("weather").style.display="block";

        document.getElementById("cityName").innerHTML =
        data.location.name + ", " + data.location.country;

        document.getElementById("temp").innerHTML =
        data.current.temp_c + "°C";

        document.getElementById("condition").innerHTML =
        data.current.condition.text;

        document.getElementById("humidity").innerHTML =
        data.current.humidity;

        document.getElementById("wind").innerHTML =
        data.current.wind_kph;

        document.getElementById("icon").src =
        "https:" + data.current.condition.icon;

    }

    catch(error){
        alert("Something went wrong!");
    }

}
document.getElementById("city").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getLocationWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(success, error);

    } else {

        alert("Geolocation is not supported by your browser.");

    }

}

function success(position) {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getWeatherByLocation(latitude, longitude);

}

function error() {

    alert("Location access denied.");

}

async function getWeatherByLocation(lat, lon) {

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("weather").style.display = "block";

        document.getElementById("cityName").innerHTML =
            data.location.name + ", " + data.location.country;

        document.getElementById("temp").innerHTML =
            data.current.temp_c + "°C";

        document.getElementById("condition").innerHTML =
            data.current.condition.text;

        document.getElementById("humidity").innerHTML =
            data.current.humidity;

        document.getElementById("wind").innerHTML =
            data.current.wind_kph;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

    } catch (error) {

        alert("Unable to fetch weather.");

    }

}