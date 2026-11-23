import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../AuthContext'
import Sidebar from './Sidebar'
import Card from './Card'
import FarmMap from './FarmMap'
import SearchPanel from './SearchPanel'
import WeeklyRain from './WeeklyRain'
import IrrigationAdvice from './IrrigationAdvice'
import Locations from './Locations'
import { getWeather, getMonthRain } from '../api/weather'
import { plots } from '../data/plots'
import { months, defaultFilters } from '../data/filters'
import { sumRain } from '../utils/irrigation'

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
}

function Dashboard() {
    const { user } = useContext(AuthContext)
    const name = user.displayName || user.email
    const firstName = name.split(' ')[0]
    const storageKey = `agricheck-plot-${user.uid}`
    const lastYear = new Date().getFullYear() - 1

    const [page, setPage] = useState('dashboard')
    const [plot, setPlot] = useState(() => {
        const savedId = localStorage.getItem(storageKey)
        const savedPlot = plots.find((p) => p.id === Number(savedId))
        return savedPlot || plots[0]
    })
    const [weatherList, setWeatherList] = useState([])
    const [error, setError] = useState('')
    const [filters, setFilters] = useState(defaultFilters)
    const [monthRain, setMonthRain] = useState(null)

    useEffect(() => {
        Promise.all(plots.map((p) => getWeather(p.lat, p.lon)))
            .then((results) => setWeatherList(results))
            .catch(() => setError('Could not load the weather, Check your connection.'))
    }, [])

    useEffect(() => {
        localStorage.setItem(storageKey, plot.id)
    }, [plot, storageKey])

    useEffect(() => {
        if (!filters.month) return
        getMonthRain(plot.lat, plot.lon, lastYear, filters.month)
            .then((data) => setMonthRain(data))
            .catch(() => setMonthRain(null))
    }, [plot, filters.month, lastYear])

    function weatherFor(p) {
        return weatherList[plots.indexOf(p)]
    }

    function openPlot(p) {
        setPlot(p)
        setPage('dashboard')
    }

    const weather = weatherFor(plot)
    const rainPast7 = weather ? sumRain(weather.daily.precipitation_sum.slice(0, 7)) : 0
    const rainNext3 = weather ? sumRain(weather.daily.precipitation_sum.slice(7)) : 0

    const visiblePlots = plots.filter((p) => {
        const w = weatherFor(p)
        if (filters.region !== 'All regions' && p.region !== filters.region) return false
        if (!w) return true
        return w.current.temperature_2m <= filters.maxTemp && w.current.relative_humidity_2m >= filters.minHumidity
    })

    return (
        <div className="flex min-h-screen bg-[#F2F5F0]">
            <Sidebar name={name} page={page} onNavigate={setPage} />

            <main className="flex-1 p-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-3xl font-semibold text-[#2F4A3A]">
                            {getGreeting()}, {firstName}
                        </h2>
                        <p className="text-[#5E7D67] mt-2">Monitor environmental conditions</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#8FA98F] text-white flex items-center justify-center">
                        {firstName.charAt(0).toUpperCase()}
                    </div>
                </div>

                {error && <p className="text-red-700 mt-6">{error}</p>}

                {!weather && !error && <p className="text-[#6B7A70] mt-6">Loading weather...</p>}

                {weather && page === 'dashboard' && (
                    <>
                        <div className="flex gap-2 mt-6">
                            <span className="bg-white border border-[#DFE5DC] rounded-full px-3 py-1 text-xs text-[#2F4A3A]">
                                <span className="text-[#5E7D67]">●</span> Live 
                            </span>
                            <span className="bg-white border border-[#DFE5DC] rounded-full px-3 py-1 text-xs text-[#2F4A3A]">
                                Area: {plot.name} · {plot.crop}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                            <Card label="Temperature" value={weather.current.temperature_2m} unit="°C" caption="" />
                            <Card label="Rainfall" value={weather.current.precipitation} unit="mm" caption="" />
                            <Card label="Relative humidity" value={weather.current.relative_humidity_2m} unit="%" caption="" />
                            <Card label="Wind" value={weather.current.wind_speed_10m} unit="km/h" caption="" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                            <section className="lg:col-span-2">
                                <h3 className="text-lg font-semibold text-[#2F4A3A] mb-3">Areas map</h3>
                                <FarmMap plots={visiblePlots} selected={plot} onSelect={setPlot} />
                                {visiblePlots.length === 0 && (
                                    <p className="text-sm text-[#7A4E22] mt-2">
                                        No plots match these conditions. Press Clear to see all plots.
                                    </p>
                                )}
                            </section>

                            <SearchPanel onFind={setFilters} onClear={() => setFilters(defaultFilters)} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                            <section className="lg:col-span-2">
                                {filters.month && monthRain ? (
                                    <WeeklyRain
                                        title={`Rain in ${months[filters.month - 1]} ${lastYear} · ${plot.name}`}
                                        days={monthRain.daily.time}
                                        amounts={monthRain.daily.precipitation_sum}
                                    />
                                ) : (
                                    <WeeklyRain
                                        title={`Last 7 days of rain · ${plot.name}`}
                                        days={weather.daily.time.slice(0, 7)}
                                        amounts={weather.daily.precipitation_sum.slice(0, 7)}
                                    />
                                )}
                            </section>

                            <aside>
                                <IrrigationAdvice rainPast7={rainPast7} rainNext3={rainNext3} />
                            </aside>
                        </div>
                    </>
                )}

                {weather && page === 'locations' && (
                    <Locations plots={plots} weatherFor={weatherFor} onOpen={openPlot} />
                )}
            </main>
        </div>
    )
}

export default Dashboard
