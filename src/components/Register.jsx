
import { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebase'

function Register({ onSwitch }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')

    async function handleRegister(e) {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password needs at least 6 characters.')
            return
        }

        if (password !== confirm) {
            setError('Passwords do not match.')
            return
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password)

            await updateProfile(result.user, {
            displayName: name
            })

        } catch (error) {
            setError('Could not create your account. Try again.')
        }
    }

    return (
        <div className="min-h-screen flex bg-[#F5F8F2]">

            <div className="w-1/3 bg-[#ffffff] text-[#233027] flex flex-col items-left justify-start p-4">
                <h1 className="text-3xl font-bold mb-0">AgriCheck</h1>
                <p className="text-[#6F9F78] text-xs">
                    AGRICULTURAL INTELLIGENCE
                </p>
            </div>

            <div className="flex-1 flex items-center justify-center p-6">

                <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg w-full max-w-md">

                    <h2 className="text-2xl font-bold text-[#26352B] mb-2">
                        Create your account
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Start exploring AgriCheck
                    </p>

                    <label className="block mb-1 text-sm">Full name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded mb-4"
                        placeholder="Enter your name"
                        required
                    />

                    <label className="block mb-1 text-sm">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded mb-4"
                        placeholder="Enter your email"
                        required
                    />

                    <label className="block mb-1 text-sm">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded mb-4"
                        placeholder="Create a password"
                        required
                    />

                    <label className="block mb-1 text-sm">Confirm password</label>
                    <input
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className="border border-gray-300 p-3 w-full rounded mb-4"
                        placeholder="Confirm your password"
                        required
                    />

                    <p className="text-red-600 text-sm mb-3">{error}</p>

                    <button
                        type="submit"
                        className="bg-[#326B43] text-white p-3 w-full rounded hover:bg-[#245C3A]"
                    >
                        Create account
                    </button>

                    <p className="text-sm text-center mt-5 text-gray-600">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitch}
                            className="text-green-700 font-semibold"
                        >
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register
