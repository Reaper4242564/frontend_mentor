const ddlUnits = document.querySelector("#ddlUnits");
const dvCityCountry = document.querySelector("#dvCityCountry");
const dvCurrDate = document.querySelector("#dvCurrDate");
const dvCurrTemp = document.querySelector("#dvCurrTemp");
const pFeelsLike = document.querySelector("#pFeelsLike");
const pHumidity = document.querySelector("#pHumidity");
const pWind = document.querySelector("#pWind");
const pPrecipitation = document.querySelector("#pPrecipitation");


let cityName, countryName;

async function getGeoData(city) {
    let search = "lusaka, zambia"
    const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2&addressdetails=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${Response.status}`)
        }

        const result = await response.json();
        console.log(result);
        loadLocationData(result)

        let lat = result[0].lat;
        let lon = result[0].lon;

        getWeatherData(lat, lon);
    } catch (error) {
        console.error(error.message);
    };

};

function loadLocationData(locationData) {
    let location = locationData[0].address;
    cityName = location.city;
    countryName = location.country_code.toUpperCase();

    let dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        weekday: "long"
    };

    let date  = new Intl.DateTimeFormat("en-US", dateOptions).format(new Date());


    console.log(cityName, countryName, date);

    dvCityCountry.textContent = `${cityName}, ${countryName}`;
    dvCurrDate.textContent = date;
  
};
  

async function getWeatherData(lat, lon) {

    let tempUnit = "celsius";
    let windUnit = "kmh";
    let precipUnit = "mm";

    // if toggle value = F
    if (ddlUnits.value == "F") {
        tempUnit = "fahrenheit";
        windUnit = "mph";
        precipUnit = "inch";
    };

 
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,precipitation,wind_speed_10m&wind_speed_unit=${windUnit}&temperature_unit=${tempUnit}&precipitation_unit=${precipUnit}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${Response.status}`)
        };

        const result = await response.json();
        console.log(result);

        loadcurrentWeather(result);
        loadDailyForecast(result);
    } catch (error) {
        console.error(error.message);
    };

};

function loadcurrentWeather(weather) {
    dvCurrTemp.textContent = `${Math.round(weather.current.temperature_2m)}${weather.current_units.temperature_2m}`;
    pFeelsLike.textContent = `${Math.round(weather.current.apparent_temperature)}${weather.current_units.apparent_temperature}`;
    pHumidity.textContent = weather.current.relative_humidity_2m;
    pWind.textContent = `${Math.round(weather.current.wind_speed_10m)} ${weather.current_units.wind_speed_10m}`;
    pPrecipitation.textContent = `${weather.current.precipitation} ${weather.current_units.precipitation}`;
};

function loadDailyForecast(weather) {
    let daily = weather.daily;

    for (let i = 0; i < 7; i++) {
        let day = daily.time[i];
        console.log(day);
    };

};

function getWeatherFileName(code) {

    const weatherCodes = {
        0: "sunny",
        1: "party-cloudly",
        2: "partly-cloudy",
        3: "overcast",
        45: "fog",
        48: "fog",
        51: "drizzle",
        53: "drizzle",
        55: "drizzle",
        56: "drizzle",
        57: "drizzle",
        61: "rain",
        63: "rain",
        65: "rain",
        66: "rain",
        67: "rain",
        80: "rain",
        81: "rain",
        82: "rain",
        71: "snow",
        73: "snow",
        75: "snow",
        77: "snow",
        85: "snow",
        86: "snow",
        95: "storm",
        95: "storm",
        96: "storm",
        99: "storm",
    };

    let fileName = `icon-${weatherCodes[code]}.webp`;

    return fileName;
};

getGeoData();


