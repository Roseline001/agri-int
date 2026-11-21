import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

function Sidebar({ name }) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-[#DFE5DC] p-6 flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-[#2F4A3A]">AgriCheck</h1>
        <p className="text-xs tracking-wide text-[#5E7D67]">AGRICULTURAL INTELLIGENCE</p>
      </div>

      <nav className="mt-10 flex flex-col gap-1">
        <p className="bg-[#E4EBE4] text-[#2F4A3A] rounded-lg px-3 py-2">▦ Dashboard</p>
        <p className="text-[#2F4A3A] px-3 py-2">⌖ Locations</p>
      </nav>

      <div className="mt-auto border-t border-[#DFE5DC] pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#8FA98F] text-white flex items-center justify-center">
            {initial}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1F2E25]">{name}</p>
            <p className="text-xs text-[#6B7A70]">Agricultural Explorer</p>
          </div>
        </div>
        <button onClick={() => signOut(auth)} className="mt-4 text-sm text-[#2F4A3A]">
          ↪ Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar