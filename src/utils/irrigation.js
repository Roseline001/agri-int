function sumRain(list) {
    const total = list.reduce((sum, mm) => sum + (mm || 0), 0)
    return Math.round(total * 10) / 10
}

function getIrrigationAdvice(rainPast7, rainNext3) {
    if (rainNext3 >= 10) {
        return { level: 'none', title: 'No irrigation needed', message: 'Good rain is expected in the next 3 days.' }
    }
    if (rainPast7 < 10) {
        return { level: 'irrigate', title: 'Irrigate soon', message: 'The last week was dry and little rain is coming.' }
    }
    return { level: 'watch', title: 'Keep an eye on it', message: 'Recent rain helps, but little more is expected.' }
}

export { sumRain, getIrrigationAdvice }