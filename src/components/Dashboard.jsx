import { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import Sidebar from './Sidebar'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

function Dashboard() {
    const { user } = useContext(AuthContext)
  const name = user.displayName || user.email
  const firstName = name.split(' ')[0]

  return (
    <div className="flex min-h-screen bg-[#F2F5F0]">
      <Sidebar name={name} />

      <main className="flex-1 p-10">
        <h2 className="text-3xl font-semibold text-[#2F4A3A]">
          {getGreeting()}, {firstName}
        </h2>
        <p className="text-[#5E7D67] mt-2">Monitor environmental conditions</p>
      </main>
    </div>
  )
}

export default Dashboard