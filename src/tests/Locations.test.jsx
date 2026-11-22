import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Locations from '../components/Locations'
import { plots } from '../data/plots'

const fakeWeather = {
  current: { temperature_2m: 20, relative_humidity_2m: 70 },
  daily: { precipitation_sum: [0, 0, 0, 0, 0, 0, 0, 15, 0, 0] },
}

describe('Locations', () => {
  it('shows every plot with its irrigation advice', () => {
    render(<Locations plots={plots} weatherFor={() => fakeWeather} onOpen={() => {}} />)

    expect(screen.getByText('Kericho')).toBeInTheDocument()
    expect(screen.getAllByText('Irrigation: No irrigation needed')).toHaveLength(4)
  })

  it('opens the plot that was clicked', async () => {
    const onOpen = vi.fn()
    render(<Locations plots={plots} weatherFor={() => fakeWeather} onOpen={onOpen} />)

    await userEvent.click(screen.getByText('Kericho'))

    expect(onOpen).toHaveBeenCalledWith(plots[2])
  })
})
