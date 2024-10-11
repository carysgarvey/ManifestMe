'use client'

import { usePathname } from 'next/navigation'

const TopBar = () => {
  const pathname = usePathname()
  const screenName = pathname === '/chat' ? 'Chat' : 'Home'

  return (
    <header className="bg-white shadow-sm p-4">
      <h2 className="text-xl font-semibold text-text">{screenName}</h2>
    </header>
  )
}

export default TopBar
