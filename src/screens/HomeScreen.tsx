import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import { useLanguage } from '../contexts/LanguageContext'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Sleek blue pulse dot for user location
const userIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Location_dot_blue.svg/1024px-Location_dot_blue.svg.png',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

const SetMapCenter: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, 15, { animate: true, duration: 1.5 })
  }, [position, map])
  return null
}

const HomeScreen: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [userPosition, setUserPosition] = useState<[number, number]>([-0.9089, -77.8183])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log("GPS unavailable", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const services = [
    { 
      label: t('ride'), 
      route: '/ride',
      bg: '#E8F7EF',
      iconColor: '#0D9F6E',
      image: '/assets/taxi_3d.png',
    },
    { 
      label: t('freight'), 
      route: '/freight',
      bg: '#FFF3E0',
      iconColor: '#E67E22',
      image: '/assets/delivery_3d.png',
    },
    { 
      label: t('boats'), 
      route: '/boat-map',
      bg: '#E3F2FD',
      iconColor: '#2196F3',
      image: '/assets/boat_3d.png',
    },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans bg-white">
      
      {/* Bright Clean Map */}
      <div className="absolute top-0 inset-x-0 bottom-[48%] z-0">
        {/* @ts-ignore */}
        <MapContainer center={userPosition} zoom={15} zoomControl={false} className="w-full h-full">
          {/* @ts-ignore */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {/* @ts-ignore */}
          <Marker position={userPosition} icon={userIcon} />
          <SetMapCenter position={userPosition} />
        </MapContainer>
        {/* Soft bottom fade to white */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
      </div>

      {/* Top Bar — Clean PedidosYa Style */}
      <div className="absolute top-0 left-0 right-0 z-[2000] flex items-center justify-between px-4 pt-10 pb-4">
        {/* Menu Button — White Circle */}
        <motion.button 
          onClick={() => navigate('/profile')}
          title="Menú"
          aria-label="Menú principal"
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-gray-100"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        >
          <i className="fas fa-user text-gray-700 text-sm"></i>
        </motion.button>

        {/* Location Indicator — Clean Pill */}
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center px-4 py-2.5 rounded-full bg-white border border-gray-100"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        >
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2.5 animate-pulse"></div>
          <span className="text-sm font-bold text-gray-800 tracking-tight">Tena, Ecuador</span>
          <i className="fas fa-chevron-down text-[0.5rem] ml-2 text-gray-400"></i>
        </motion.div>

        {/* SOS Button — Subtle but visible */}
        <motion.button 
          onClick={() => navigate('/safety')}
          title="Emergencia SOS"
          aria-label="Botón de pánico SOS"
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full bg-red-500 flex items-center justify-center"
          style={{ boxShadow: '0 4px 15px rgba(239,68,68,0.35)' }}
        >
          <i className="fas fa-shield-alt text-white text-sm"></i>
        </motion.button>
      </div>

      {/* Bottom Sheet — PedidosYa Style */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 32, delay: 0.1 }}
        className="absolute bottom-0 inset-x-0 z-[2000] bg-white rounded-t-[1.75rem] flex flex-col pt-3"
        style={{ 
          height: '52%',
          boxShadow: '0 -4px 30px rgba(0,0,0,0.06)'
        }}
      >
        {/* Pull Handle */}
        <div className="w-full flex justify-center mb-4">
          <div className="w-9 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="px-5 overflow-y-auto pb-32 flex-1">
          
          {/* Greeting */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-5"
          >
            <h2 className="text-[1.4rem] font-extrabold text-gray-900 tracking-tight leading-tight">
              {t('where_to')} 👋
            </h2>
            <p className="text-sm text-gray-400 mt-1 font-medium">{t('now')}</p>
          </motion.div>

          {/* Search Bar — PedidosYa style rounded */}
          <motion.div 
            onClick={() => navigate('/ride')} 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.22 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl py-3.5 px-4 flex items-center mb-7 cursor-pointer transition-all bg-gray-50 border border-gray-100 hover:border-gray-200"
          >
            <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center mr-3.5">
              <i className="fas fa-search text-white text-xs"></i>
            </div>
            <span className="text-[0.95rem] font-semibold text-gray-400 flex-1">Buscar destino...</span>
            <i className="fas fa-microphone text-gray-300 text-sm"></i>
          </motion.div>

          {/* Services — Large Beautiful Icons à la PedidosYa */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-7"
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Servicios</h3>
            <div className="flex gap-3">
              {services.map((svc, i) => (
                <motion.div 
                  key={i}
                  onClick={() => navigate(svc.route)} 
                  whileTap={{ scale: 0.93 }}
                  className="flex-1 rounded-3xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.05] border border-gray-100/50"
                  style={{ 
                    background: svc.bg,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.03)'
                  }}
                >
                  <img src={svc.image} alt={svc.label} className="w-16 h-16 object-contain mb-2 drop-shadow-md" />
                  <span className="text-[0.78rem] font-extrabold text-gray-800 tracking-tight">{svc.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Access — Saved Places */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.38 }}
          >
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Favoritos</h3>
            
            <div onClick={() => navigate('/ride?dest=casa')} 
              className="flex items-center p-3 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mr-3.5"
                style={{ background: '#E8F7EF' }}
              >
                <i className="fas fa-home text-green-600"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[0.9rem] text-gray-800">{t('home_location')}</h4>
                <p className="text-[0.75rem] text-gray-400 mt-0.5">{t('home_address')}</p>
              </div>
              <i className="fas fa-chevron-right text-[0.55rem] text-gray-300 group-hover:text-green-500 transition-colors"></i>
            </div>
            
            <div onClick={() => navigate('/ride?dest=trabajo')} 
              className="flex items-center p-3 rounded-2xl cursor-pointer transition-all hover:bg-gray-50 group"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mr-3.5"
                style={{ background: '#FFF3E0' }}
              >
                <i className="fas fa-briefcase text-orange-500"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[0.9rem] text-gray-800">{t('work_location')}</h4>
                <p className="text-[0.75rem] text-gray-400 mt-0.5">{t('work_address')}</p>
              </div>
              <i className="fas fa-chevron-right text-[0.55rem] text-gray-300 group-hover:text-green-500 transition-colors"></i>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  )
}

export default HomeScreen