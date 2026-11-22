import { useContext, useState } from 'react'
import { AuthContext } from './AuthContext'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

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
    <Dashboard />
  )
}

export default App
