import { render, screen } from '@testing-library/react'
import IrrigationAdvice from '../components/IrrigationAdvice'

describe('IrrigationAdvice', () => {
  it('says irrigate after a dry week', () => {
    render(<IrrigationAdvice rainPast7={2} rainNext3={1} />)

    expect(screen.getByText('Irrigate soon')).toBeInTheDocument()
  })

  it('says no irrigation when rain is coming', () => {
    render(<IrrigationAdvice rainPast7={2} rainNext3={15} />)

    expect(screen.getByText('No irrigation needed')).toBeInTheDocument()
  })
})
