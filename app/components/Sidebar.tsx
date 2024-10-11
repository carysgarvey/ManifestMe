'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/chat', label: 'Chat' },
    { href: '/career-roadmap', label: 'Career Roadmap' },
    { href: '/resources', label: 'Resources' },
    { href: '/connect-with-artists', label: 'Connect with Artists' },
  ]

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Methix</h1>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="mb-4">
              <Link 
                href={item.href} 
                className={`block p-2 rounded ${pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
