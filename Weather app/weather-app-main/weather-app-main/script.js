async function getGeoData(city) {
    let search = "lusaka, lusaka"
    const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=jsonv2`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${Response.status}`)
        }

        const result = await response.json();
        console.log(result);
        getWeatherData();
    } catch (error) {
        console.error(error.message);
    }

}

async function getWeatherData(city) {
 
    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature`;
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

