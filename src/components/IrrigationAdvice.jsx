import { getIrrigationAdvice } from '../utils/irrigation'

const colours = {
    none: 'bg-[#E4EBE4] text-[#2F4A3A]',
    watch: 'bg-[#FBF6E6] text-[#6B5A1E]',
    irrigate: 'bg-[#F6EBDD] text-[#7A4E22]',
}

function IrrigationAdvice({ rainPast7, rainNext3 }) {
    const advice = getIrrigationAdvice(rainPast7, rainNext3)

    return (
        <div className="bg-white border border-[#DFE5DC] rounded-2xl p-5">
            <h3 className="text-lg font-semibold text-[#2F4A3A]">Irrigation advice</h3>

            <div className={`rounded-xl p-4 mt-4 ${colours[advice.level]}`}>
                <p className="font-semibold">{advice.title}</p>
                <p className="text-sm mt-1">{advice.message}</p>
            </div>

            <div className="text-sm text-[#2F4A3A] mt-4 space-y-1">
                <p>Rain, last 7 days: <strong>{rainPast7} mm</strong></p>
                <p>Rain, next 3 days: <strong>{rainNext3} mm</strong></p>
            </div>

            <p className="text-xs text-[#6B7A70] mt-4">
                Advice note: Check your soil too.
            </p>
        </div>
    )
}

export default IrrigationAdvice