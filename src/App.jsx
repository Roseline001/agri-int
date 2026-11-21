import { useContext } from 'react'
import { AuthContext } from './AuthContext'

function App() {
  const {user, loading} = useContext(AuthContext)

  if (loading) {
    return <p className="p-10">Loading...</p>
  }
  return (
    <div className='p-10'>
      <h1 className="text-3xl font-bold text-green-800">AgriCheck</h1>
      {user ? <p>Logged in as {user.email}</p> : <p>Not logged in</p>}
    </div>
  )
}

export default App
