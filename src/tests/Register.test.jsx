import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Register from '../components/Register'


vi.mock('firebase/auth', () => ({ createUserWithEmailAndPassword: vi.fn(), updateProfile: vi.fn() }))
vi.mock('../firebase', () => ({ auth: {} }))

async function fillForm(password, confirm) {
  await userEvent.type(screen.getByPlaceholderText('Enter your name'), 'Roseline')
  await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'roseline@agricheck.com')
  await userEvent.type(screen.getByPlaceholderText('Create a password'), password)
  await userEvent.type(screen.getByPlaceholderText('Confirm your password'), confirm)
  await userEvent.click(screen.getByText('Create account'))
}

describe('Register', () => {
  it('refuses passwords that do not match', async () => {
    render(<Register onSwitch={() => {}} />)

    await fillForm('abcdef', 'abcdeg')

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument()
  })

  it('creates the account when everything is filled in', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({ user: {} })
    render(<Register onSwitch={() => {}} />)

    await fillForm('abcdef', 'abcdef')

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'roseline@agricheck.com', 'abcdef')
  })
})
