const ddlUnits = document.querySelector("#ddlUnits");
const dvCityCountry = document.querySelector("#dvCityCountry");
const dvCurrDate = document.querySelector("#dvCurrDate");
const dvCurrTemp = document.querySelector("#dvCurrTemp");

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
    }

}

function loadLocationData(locationData) {
    let location = locationData[0].address;
    cityName = location.city;
    countryName = location.country;

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
}
  

async function getWeatherData(lat, lon) {

    let tempUnit = "celsius";
    let windUnit = "kmh";
    let precipUnit = "mm";

    // if toggle value = F
    if (ddlUnits.value === "F") {
        tempUnit = "fahrenheit";
        windUnit = "mph";
        precipUnit = "inch";
    };

 
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&wind_speed_unit=${windUnit}&temperature_unit=${tempUnit}&precipitation_unit=${precipUnit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${Response.status}`)
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }

}

getGeoData();

