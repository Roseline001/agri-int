import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const {user, loading} = useContext(AuthContext)
  const [showRegister, setShowRegister] = useState(false)

  if (loading) {
    return <p className="p-10">Loading...</p>
  }
  if (!user) {
    if (showRegister) {
      return <Register onSwitch={() => setShowRegister(false)} />
    }
    return <Login onSwitch={() => setShowRegister(true)} />
  }
  return (
    <div className='p-10'>
      <h1 className="text-3xl font-bold text-green-800">AgriCheck</h1>
      <p>Logged in as {user.email}</p>
      <button onClick={() => signOut(auth)} className="mt-4 underline">
        Logout
      </button>
    </div>
  )
}

export default App
