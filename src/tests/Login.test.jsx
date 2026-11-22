import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Login from '../components/Login'

vi.mock('firebase/auth', () => ({ signInWithEmailAndPassword: vi.fn(), signInWithPopup: vi.fn() }))
vi.mock('../firebase', () => ({ auth: {}, googleProvider: {} }))

describe('Login', () => {
  it('signs in with the email and password typed', async () => {
    render(<Login onSwitch={() => {}} />)

    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'farmer@agricheck.com')
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'secret123')
    await userEvent.click(screen.getByText('Sign in'))

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'farmer@agricheck.com', 'secret123')
  })

  it('shows an error when the password is wrong', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('wrong password'))
    render(<Login onSwitch={() => {}} />)

    await userEvent.type(screen.getByPlaceholderText('Enter your email'), 'farmer@agricheck.com')
    await userEvent.type(screen.getByPlaceholderText('Enter your password'), 'wrong')
    await userEvent.click(screen.getByText('Sign in'))

    expect(await screen.findByText('Wrong email or password. Try again.')).toBeInTheDocument()
  })

  it('opens the Google popup', async () => {
    render(<Login onSwitch={() => {}} />)

    await userEvent.click(screen.getByText('Continue with Google'))

    expect(signInWithPopup).toHaveBeenCalled()
  })
})
