import { getWeather, getMonthRain } from '../api/weather'

describe('weather API', () => {
  it('gets the weather for a place', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, json: () => ({ current: { temperature_2m: 22 } }) })
    vi.stubGlobal('fetch', fakeFetch)

    const data = await getWeather(1.5, 36.8)

    expect(fakeFetch.mock.calls[0][0]).toContain('latitude=1.5&longitude=36.8')
    expect(data.current.temperature_2m).toBe(22)
  })

  it('asks for the whole month of June', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, json: () => ({}) })
    vi.stubGlobal('fetch', fakeFetch)

    await getMonthRain(1.5, 36.8, 2025, 6)

    expect(fakeFetch.mock.calls[0][0]).toContain('start_date=2025-06-01&end_date=2025-06-30')
  })

  it('throws an error when the server fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(getWeather(1.5, 36.8)).rejects.toThrow('Weather request failed')
  })
})
