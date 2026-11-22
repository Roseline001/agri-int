import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthContext } from '../AuthContext'
import { getWeather, getMonthRain } from '../api/weather'
import Dashboard from '../components/Dashboard'

vi.mock('../api/weather', () => ({ getWeather: vi.fn(), getMonthRain: vi.fn() }))
vi.mock('firebase/auth', () => ({ signOut: vi.fn() }))
vi.mock('../firebase', () => ({ auth: {} }))
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => null,
  CircleMarker: ({ children }) => <div>{children}</div>,
  Tooltip: ({ children }) => <span>{children}</span>,
}))

const fakeWeather = {
  current: { temperature_2m: 24.3, relative_humidity_2m: 61, precipitation: 0, wind_speed_10m: 12 },
  daily: {
    time: ['2026-11-12', '2026-11-13', '2026-11-14', '2026-11-15', '2026-11-16', '2026-11-17', '2026-11-18', '2026-11-19', '2026-11-20', '2026-11-21'],
    precipitation_sum: [1, 0, 2, 0, 0, 1, 0, 0, 1, 0],
  },
}

function renderDashboard() {
  const user = { uid: 'user1', displayName: 'Roseline Achieng' }
  render(
    <AuthContext.Provider value={{ user, loading: false }}>
      <Dashboard />
    </AuthContext.Provider>
  )
}

describe('Dashboard', () => {
  beforeEach(() => {
    getWeather.mockResolvedValue(fakeWeather)
  })

  it('shows the weather cards and the irrigation advice', async () => {
    renderDashboard()

    expect(await screen.findByText('24.3')).toBeInTheDocument()
    expect(screen.getByText('Irrigate soon')).toBeInTheDocument()
  })

  it('opens the Locations page from the sidebar', async () => {
    renderDashboard()
    await screen.findByText('24.3')

    await userEvent.click(screen.getByText('⌖ Locations'))

    expect(screen.getByText('Your plots')).toBeInTheDocument()
  })

  it('shows the rain for the month picked in Search conditions', async () => {
    getMonthRain.mockResolvedValue({ daily: { time: ['2025-06-01'], precipitation_sum: [5] } })
    renderDashboard()
    await screen.findByText('24.3')

    await userEvent.click(screen.getByText('Jun'))
    await userEvent.click(screen.getByText('Find'))

    expect(await screen.findByText(/Rain in Jun/)).toBeInTheDocument()
  })
})
