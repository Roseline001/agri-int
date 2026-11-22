import { useContext, useState, useEffect} from 'react'
import { AuthContext } from '../AuthContext'
import Sidebar from './Sidebar'
import { getWeather } from '../api/weather'
import { plots } from '../data/plots'
import Card from './Card'
import FarmMap from './FarmMap'

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

    const [plot, setPlot] = useState(plots[0])
    const [weather, setWeather] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        getWeather(plot.lat, plot.lon)
            .then((data) => setWeather(data))
            .catch(() => setError('Could not load the weather. Check your connection.'))
    }, [plot])

    function handleSelect(newPlot) {
        setPlot(newPlot)
        setWeather(null)
        setError('')
    }

    return (
        <div className="flex min-h-screen bg-[#F2F5F0]">
        <Sidebar name={name} />

        <main className="flex-1 p-10">
            <h2 className="text-3xl font-semibold text-[#2F4A3A]">
                {getGreeting()}, {firstName}
            </h2>
            <p className="text-[#5E7D67] mt-2">Monitor environmental conditions</p>
            {error && <p className="text-red-700 mt-6">{error}</p>}

            {!weather && !error && <p className="text-[#6B7A70] mt-6">Loading weather...</p>}

            {weather && (
                <>
                    <div className="flex gap-2 mt-6">
                        <span className="bg-white border border-[#DFE5DC] rounded-full px-3 py-1 text-xs text-[#2F4A3A]">
                            <span className="text-[#5E7D67]">●</span> Live · Open-Meteo
                        </span>
                        <span className="bg-white border border-[#DFE5DC] rounded-full px-3 py-1 text-xs text-[#2F4A3A]">
                            Plot: {plot.name} · {plot.crop}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                        <Card label="Temperature" value={weather.current.temperature_2m} unit="°C" caption="Measured now" />
                        <Card label="Rainfall" value={weather.current.precipitation} unit="mm" caption="In the last hour" />
                        <Card label="Relative humidity" value={weather.current.relative_humidity_2m} unit="%" caption="Moisture in the air" />
                        <Card label="Wind" value={weather.current.wind_speed_10m} unit="km/h" caption="At 10 m height" />
                    </div>
                </>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <section className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-[#2F4A3A] mb-3">Plots map</h3>
                    <FarmMap plots={plots} selectedId={plot.id} onSelect={handleSelect} />
                </section>
            </div>
        </main>
    </div>
  )
}

export default Dashboard