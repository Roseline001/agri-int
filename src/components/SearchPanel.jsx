import { useState } from 'react'
import { months, regions, defaultFilters } from '../data/filters'

function SearchPanel({ onFind, onClear }) {
    const [region, setRegion] = useState(defaultFilters.region)
    const [maxTemp, setMaxTemp] = useState(defaultFilters.maxTemp)
    const [minHumidity, setMinHumidity] = useState(defaultFilters.minHumidity)
    const [month, setMonth] = useState(defaultFilters.month)

    function handleFind() {
        onFind({ region, maxTemp, minHumidity, month })
    }

    function handleClear() {
        setRegion(defaultFilters.region)
        setMaxTemp(defaultFilters.maxTemp)
        setMinHumidity(defaultFilters.minHumidity)
        setMonth(defaultFilters.month)
        onClear()
    }

    return (
        <div className="bg-white border border-[#DFE5DC] rounded-2xl p-5">
            <h3 className="font-semibold text-[#2F4A3A] border-b border-[#DFE5DC] pb-2">Search conditions</h3>

            <p className="text-sm font-medium text-[#1F2E25] mt-4">Month</p>
            <div className="grid grid-cols-6 gap-1 mt-2">
                {months.map((name, index) => (
                    <button
                        key={name}
                        onClick={() => setMonth(index + 1)}
                        className={month === index + 1
                            ? 'text-xs rounded py-1 bg-sky-300 text-sky-950'
                            : 'text-xs rounded py-1 border border-[#DFE5DC] text-[#1F2E25]'}
                    >
                        {name}
                    </button>
                ))}
            </div>

            <div className="bg-[#F2F5F0] rounded-xl p-3 mt-4">
                <label htmlFor="maxTemp" className="text-sm text-[#1F2E25]">
                    Maximum temperature: {maxTemp} °C
                </label>
                <div className="h-2 rounded-full bg-linear-to-r from-sky-400 via-yellow-300 to-red-500 mt-2" />
                <input
                    id="maxTemp"
                    type="range"
                    min="10"
                    max="40"
                    value={maxTemp}
                    onChange={(e) => setMaxTemp(Number(e.target.value))}
                    className="w-full accent-[#2F4A3A]"
                />
            </div>

            <div className="bg-[#F2F5F0] rounded-xl p-3 mt-3">
                <label htmlFor="minHumidity" className="text-sm text-[#1F2E25]">
                    Minimum humidity: {minHumidity} %
                </label>
                <div className="h-2 rounded-full bg-linear-to-r from-amber-100 to-sky-500 mt-2" />
                <input
                    id="minHumidity"
                    type="range"
                    min="0"
                    max="100"
                    value={minHumidity}
                    onChange={(e) => setMinHumidity(Number(e.target.value))}
                    className="w-full accent-[#2F4A3A]"
                />
            </div>

            <label htmlFor="region" className="block text-sm text-[#1F2E25] mt-4">Region</label>
            <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border border-[#DFE5DC] rounded-lg p-2 mt-1 text-sm"
            >
                {regions.map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select>

            <p className="text-sm text-[#1F2E25] mt-4">Actions</p>
            <div className="flex gap-2 mt-1">
                <button onClick={handleFind} className="flex-1 bg-sky-500 text-white rounded-lg py-2 text-sm">
                    Find
                </button>
                <button onClick={handleClear} className="flex-1 border border-[#DFE5DC] rounded-lg py-2 text-sm">
                    Clear
                </button>
            </div>
        </div>
    )
}

export default SearchPanel
