
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      setError('Login failed. Please check your details.')
    }
  }

  return (
    <div className="min-h-screen flex bg-[#F5F8F2]">

      {/* Left sidebar */}
      <div className="w-1/3 bg-[#ffffff] text-[#233027] flex flex-col items-left justify-start p-4">
        <h1 className="text-3xl font-bold mb-0">AgriCheck</h1>
        <p className="text-[#6F9F78] text-xs" >
          AGRICULTURAL INTELLIGENCE
        </p>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center p-6">

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg w-full max-w-md">

          <h2 className="text-2xl font-bold text-[#26352B] mb-2">
            Welcome back!
          </h2>

          <p className="text-gray-500 mb-6">
            Login to your AgriCheck account
          </p>

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
            placeholder="Enter your password"
            required
          />

          <p className="text-red-600 text-sm mb-3">{error}</p>

          <button
            type="submit"
            className="bg-[#326B43] text-white p-3 w-full rounded hover:bg-[#245C3A]"
          >
            Sign in
          </button>

          <p className="text-sm text-center mt-5 text-gray-600">
            Don't have an account? <a href="/register" className="text-green-700 font-semibold">Create one</a>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
