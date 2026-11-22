import { render, screen } from '@testing-library/react'
import WeeklyRain from '../components/WeeklyRain'

describe('WeeklyRain', () => {
  it('shows the title and the rain for each day', () => {
    render(<WeeklyRain title="Last 7 days of rain" days={['2026-11-16', '2026-11-17']} amounts={[4, null]} />)

    expect(screen.getByText('Last 7 days of rain')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('shows date numbers when it is a whole month', () => {
    const days = ['2025-06-01', '2025-06-02', '2025-06-03', '2025-06-04', '2025-06-05', '2025-06-06', '2025-06-07', '2025-06-08']
    render(<WeeklyRain title="Rain in Jun 2025" days={days} amounts={[0, 0, 0, 0, 0, 0, 0, 0]} />)

    expect(screen.getByText('8')).toBeInTheDocument()
  })
})
