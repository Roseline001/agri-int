function Card({ label, value, unit, caption }) {
    return (
        <div className="bg-white border border-[#DFE5DC] rounded-2xl p-5 shadow-[0_8px_30px_rgba(31,46,37,0.06)]">
            <p className="text-sm text-[#6B7A70]">{label}</p>
            <p className="text-3xl font-extrabold text-[#1F2E25] mt-2">
                {value} <span className="text-sm font-normal text-[#6B7A70]">{unit}</span>
            </p>
            {caption && <p className="text-xs text-[#5E7D67] mt-1">{caption}</p>}
        </div>
    )
}

export default Card