import { getIrrigationAdvice, sumRain } from '../utils/irrigation'

function Locations({ plots, weatherFor, onOpen }) {
    return (
        <div className="mt-8">
            <h3 className="text-lg font-semibold text-[#2F4A3A]">Your plots</h3>
            <p className="text-sm text-[#6B7A70]">Clicking an area to opens it on the dashboard</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {plots.map((plot) => {
                    const weather = weatherFor(plot)
                    const advice = getIrrigationAdvice(
                        sumRain(weather.daily.precipitation_sum.slice(0, 7)),
                        sumRain(weather.daily.precipitation_sum.slice(7))
                    )

                    return (
                        <button
                            key={plot.id}
                            onClick={() => onOpen(plot)}
                            className="text-left bg-white border border-[#DFE5DC] rounded-2xl p-5 hover:border-[#5E7D67]"
                        >
                            <p className="text-lg font-semibold text-[#1F2E25]">{plot.name}</p>
                            <p className="text-sm text-[#6B7A70]">{plot.crop} · {plot.region}</p>
                            <p className="text-sm text-[#1F2E25] mt-3">
                                {weather.current.temperature_2m} °C · {weather.current.relative_humidity_2m} % humidity
                            </p>
                            <p className="text-sm font-semibold text-[#2F4A3A] mt-3">Irrigation: {advice.title}</p>
                            <p className="text-xs text-[#6B7A70]">{advice.message}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default Locations
