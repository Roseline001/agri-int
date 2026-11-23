
function dayLabel(dateText, totalDays) {
  const date = new Date(dateText)
  if (totalDays > 7) {
    return date.getDate()
  }
  return date.toLocaleDateString('en-GB', { weekday: 'short' })
}

function WeeklyRain({ title, days, amounts }) {
  const cleanAmounts = amounts.map((mm) => mm || 0)
  const wettest = Math.max(...cleanAmounts, 1)

  return (
    <div className="bg-white border border-[#DFE5DC] rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-[#2F4A3A]">{title}</h3>
      <p className="text-xs text-[#6B7A70]">Daily rainfall in mm</p>

      <div className="flex gap-1 mt-6">
        {cleanAmounts.map((mm, index) => (
          <div key={days[index]} className="flex-1 text-center">
            <p className="text-xs text-[#6B7A70]">{mm}</p>
            <div className="h-28 flex items-end mt-1">
              <div
                className="w-full bg-[#5E7D67] rounded-t-md"
                style={{ height: `${(mm / wettest) * 100}%`, minHeight: '2px' }}
              />
            </div>
            <p className="text-xs text-[#2F4A3A] mt-2">{dayLabel(days[index], days.length)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyRain
