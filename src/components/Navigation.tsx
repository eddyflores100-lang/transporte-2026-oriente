import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navigation: React.FC = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: 'fas fa-home', label: 'Inicio' },
    { path: '/freight', icon: 'fas fa-th-large', label: 'Servicios' },
    { path: '/trip-history', icon: 'fas fa-receipt', label: 'Actividad' },
    { path: '/profile', icon: 'fas fa-user', label: 'Cuenta' },
  ]

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-[3000] bg-white pb-6 pt-2 border-t border-gray-100"
    >
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
             const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
             return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center py-1 px-4 text-center transition-all cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-0.5 transition-all ${
                  isActive 
                    ? 'bg-green-500' 
                    : 'group-hover:bg-gray-100'
                }`}
                  style={isActive ? { boxShadow: '0 4px 12px rgba(13,159,110,0.3)' } : {}}
                >
                  <i className={`${item.icon} text-[0.9rem] ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}></i>
                </div>
                <span className={`text-[0.6rem] font-bold tracking-wide transition-colors ${
                  isActive ? 'text-green-600' : 'text-gray-400'
                }`}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation