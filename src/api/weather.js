async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=precipitation_sum&past_days=7&forecast_days=3&timezone=auto`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Weather request failed')
    }
    return response.json()
}

async function getMonthRain(lat, lon, year, month) {
    const lastDay = new Date(year, month, 0).getDate()
    const monthText = String(month).padStart(2, '0')
    const start = `${year}-${monthText}-01`
    const end = `${year}-${monthText}-${lastDay}`

    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=precipitation_sum&timezone=auto`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Rain history request failed')
    }
    return response.json()
}

export { getWeather, getMonthRain }
