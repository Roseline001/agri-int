import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchPanel from '../components/SearchPanel'

describe('SearchPanel', () => {
  it('sends the chosen conditions when Find is clicked', async () => {
    const onFind = vi.fn()
    render(<SearchPanel onFind={onFind} onClear={() => {}} />)

    await userEvent.click(screen.getByText('Jun'))
    await userEvent.selectOptions(screen.getByLabelText('Region'), 'Eastern')
    fireEvent.change(screen.getByLabelText(/Maximum temperature/), { target: { value: '30' } })
    await userEvent.click(screen.getByText('Find'))

    expect(onFind).toHaveBeenCalledWith({ region: 'Eastern', maxTemp: 30, minHumidity: 0, month: 6 })
  })

  it('tells the dashboard when Clear is clicked', async () => {
    const onClear = vi.fn()
    render(<SearchPanel onFind={() => {}} onClear={onClear} />)

    await userEvent.click(screen.getByText('Clear'))

    expect(onClear).toHaveBeenCalled()
  })
})
