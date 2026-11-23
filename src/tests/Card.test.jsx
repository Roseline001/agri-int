import { render, screen } from '@testing-library/react'
import Card from '../components/Card'

describe('Card', () => {
  it('shows the label, value, unit and caption', () => {
    render(<Card label="Temperature" value={24.3} unit="°C" caption="Measured now" />)
    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('24.3')).toBeInTheDocument()
    expect(screen.getByText('°C')).toBeInTheDocument()
    expect(screen.getByText('Measured now')).toBeInTheDocument()
  })

  it('leaves out the caption line when no caption is given', () => {
    const { container } = render(<Card label="Wind" value={12} unit="km/h" />)

    expect(screen.getByText('Wind')).toBeInTheDocument()
    expect(container.querySelectorAll('p')).toHaveLength(2)
  })
})