import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'
import { useLanguage } from '../contexts/LanguageContext'

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const user = {
    name: 'Edison',
    email: 'edison@example.com',
    phone: '+593 99 999 9999',
    memberSince: 'Febrero 2026',
    totalRides: 24,
    rating: 4.9,
  }

  const menuItems = [
    { icon: 'fas fa-clock-rotate-left', label: t('trip_history'), emoji: '📋', bg: '#E8F7EF', route: '/trip-history' },
    { icon: 'fas fa-wallet', label: t('payment_method'), emoji: '💳', bg: '#EDE9FE', action: () => alert('Métodos de pago próximamente') },
    { icon: 'fas fa-tag', label: t('promotions'), emoji: '🎁', bg: '#FFF3E0', action: () => alert('Promociones próximamente') },
    { icon: 'fas fa-headset', label: t('help_support'), emoji: '🎧', bg: '#E3F2FD', action: () => alert('Soporte próximamente') },
    { icon: 'fas fa-gear', label: t('settings'), emoji: '⚙️', bg: '#F3F4F6', action: () => alert('Configuración próximamente') },
    { icon: 'fas fa-share-nodes', label: t('invite_friends'), emoji: '💌', bg: '#FCE4EC', action: () => alert('Invitar amigos próximamente') },
  ]

  const stats = [
    { value: user.totalRides, label: t('completed_rides'), image: '/assets/taxi_3d.png' },
    { value: '156', label: t('km_traveled'), emoji: '🛣️' },
    { value: '$245', label: t('total_spent'), emoji: '💰' },
    { value: '12', label: t('favorite_drivers'), emoji: '⭐' },
  ]

  return (
    <div className="pb-28 bg-white min-h-screen">
      
      {/* Header */}
      <div className="px-5 pt-12 pb-6" style={{ background: 'linear-gradient(180deg, #E8F7EF 0%, #FFFFFF 100%)' }}>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <motion.button 
            onClick={() => navigate('/')}
            title="Volver"
            aria-label="Volver"
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-100"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
          >
            <i className="fas fa-arrow-left text-gray-600 text-sm"></i>
          </motion.button>
          <span className="text-sm font-bold text-gray-500">Mi cuenta</span>
          <div className="w-10"></div>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center"
        >
          <div className="relative mr-4">
            <div className="w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #0D9F6E 0%, #34D399 100%)' }}
            >
              <i className="fas fa-user text-white text-2xl"></i>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-white"
              style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
            >
              <i className="fas fa-check-circle text-green-500 text-sm"></i>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">{user.name}</h1>
            <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
            <div className="flex items-center mt-1.5 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fas fa-star text-amber-400 text-xs"></i>
              ))}
              <span className="text-gray-500 ml-1.5 text-sm font-bold">{user.rating}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats Row */}
      <div className="px-5 -mt-1">
        <motion.div 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-2"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 + i * 0.05 }}
              className="bg-gray-50 rounded-2xl p-3 text-center border border-gray-100"
            >
              {stat.image ? (
                <img src={stat.image} alt={stat.label} className="w-10 h-10 object-contain mx-auto mb-1" />
              ) : (
                <span className="text-xl">{stat.emoji}</span>
              )}
              <div className="text-lg font-extrabold text-gray-900 mt-1">{stat.value}</div>
              <p className="text-[0.6rem] text-gray-400 mt-0.5 leading-tight font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-5 mt-6 space-y-5">
        {/* Menu Options */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <div className="space-y-1">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => {
                  if (item.route) navigate(item.route);
                  else if (item.action) item.action();
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center p-3.5 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 group"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mr-4"
                  style={{ background: item.bg }}
                >
                  <span className="text-xl">{item.emoji}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-[0.9rem] text-gray-800">{item.label}</h4>
                </div>
                <i className="fas fa-chevron-right text-[0.55rem] text-gray-300 group-hover:text-green-500 transition-colors"></i>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Verified Account */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl p-5 border border-green-100"
          style={{ background: '#F0FDF8' }}
        >
          <div className="flex items-start">
            <div className="mr-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: '#D1FAE5' }}
              >
                <span className="text-xl">🛡️</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[0.9rem] text-gray-800">{t('verified_account')}</h4>
              <p className="text-gray-400 text-[0.78rem] leading-relaxed mt-1 mb-3">
                {t('account_verified_desc')}
              </p>
              <button 
                onClick={() => navigate('/safety')}
                className="px-4 py-2 rounded-xl text-sm font-bold text-green-600 hover:bg-green-50 transition-colors"
                style={{ background: '#D1FAE5' }}
              >
                <i className="fas fa-lock mr-1.5 text-xs"></i>
                {t('security_details')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Language Selector */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
        >
          <LanguageSelector />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            onClick={() => navigate('/auth')}
            className="w-full py-3.5 rounded-2xl text-gray-400 font-bold text-sm border border-gray-100 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all"
          >
            <i className="fas fa-sign-out-alt mr-2 text-xs"></i>
            {t('logout')}
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default ProfileScreen