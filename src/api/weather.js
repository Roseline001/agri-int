async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=precipitation_sum&past_days=7&forecast_days=3&timezone=auto`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Weather request failed')
    }
    return response.json()
}

export { getWeather }