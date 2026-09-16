import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const SafetyScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'María González', phone: '+593 99 123 4567', relation: 'Familia' },
    { id: 2, name: 'Carlos Rodríguez', phone: '+593 98 765 4321', relation: 'Amigo' },
    { id: 3, name: 'Policía Nacional', phone: '911', relation: 'Emergencia' },
  ])

  const [safetySettings, setSafetySettings] = useState({
    shareLocation: true,
    autoShareOnRide: true,
    notifyContacts: true,
    soundAlerts: true,
  })

  const handleTestEmergency = () => {
    alert(t('safety_test_alert') || '🚨 Esta es una prueba del sistema de emergencia. En una situación real, tu ubicación sería compartida con tus contactos de emergencia.')
  }

  const handleAddContact = () => {
    const newContact = {
      id: emergencyContacts.length + 1,
      name: t('safety_new_contact') || 'Nuevo Contacto',
      phone: '+593 99 000 0000',
      relation: t('safety_contact') || 'Contacto'
    }
    setEmergencyContacts([...emergencyContacts, newContact])
  }

  return (
    <div className="p-6 pb-24 relative">
      <button 
        onClick={() => navigate('/')}
        title="Volver"
        aria-label="Volver"
        className="absolute top-6 left-6 z-50 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md text-dark-gray hover:bg-gray-100 transition"
      >
        <i className="fas fa-arrow-left"></i>
      </button>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 pt-12"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary-green">Seguridad</h1>
            <p className="text-medium-gray">Tu protección es nuestra prioridad</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-primary-green to-accent-green rounded-full flex items-center justify-center">
            <i className="fas fa-shield-alt text-white text-xl"></i>
          </div>
        </div>
      </motion.header>

      {/* Botón de prueba de emergencia */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card mb-8 bg-gradient-to-r from-error/10 to-error/5 border-2 border-error/20"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-exclamation-triangle text-error text-3xl"></i>
          </div>
          <h3 className="font-bold text-xl mb-2">Prueba el botón de pánico</h3>
          <p className="text-medium-gray mb-6">
            Verifica que el sistema de emergencia funcione correctamente
          </p>
          <button
            onClick={handleTestEmergency}
            className="btn-danger w-full max-w-xs mx-auto"
          >
            <i className="fas fa-play-circle mr-2"></i>
            Ejecutar prueba de emergencia
          </button>
        </div>
      </motion.div>

      {/* Contactos de emergencia */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-lg">Contactos de emergencia</h3>
            <p className="text-sm text-medium-gray">Personas notificadas en caso de emergencia</p>
          </div>
          <button
            onClick={handleAddContact}
            className="btn-secondary py-2 px-4"
          >
            <i className="fas fa-plus mr-2"></i>
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center p-4 bg-light-green/50 rounded-xl"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-user text-secondary-green"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{contact.name}</h4>
                <p className="text-sm text-medium-gray">{contact.relation}</p>
                <p className="text-sm font-medium">{contact.phone}</p>
              </div>
              <div className="flex gap-2">
                <button title="Editar contacto" aria-label="Editar contacto" className="text-info">
                  <i className="fas fa-edit"></i>
                </button>
                <button title="Eliminar contacto" aria-label="Eliminar contacto" className="text-error">
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Configuración de seguridad */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h3 className="font-bold text-lg mb-6">Configuración de seguridad</h3>
        
        <div className="space-y-6">
          {Object.entries(safetySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">
                  {key === 'shareLocation' && 'Compartir ubicación en tiempo real'}
                  {key === 'autoShareOnRide' && 'Compartir automáticamente durante viajes'}
                  {key === 'notifyContacts' && 'Notificar a contactos en emergencia'}
                  {key === 'soundAlerts' && 'Alertas de sonido'}
                </h4>
                <p className="text-sm text-medium-gray">
                  {key === 'shareLocation' && 'Tu ubicación se comparte con la app para mejor servicio'}
                  {key === 'autoShareOnRide' && 'Comparte ubicación automáticamente al iniciar un viaje'}
                  {key === 'notifyContacts' && 'Tus contactos reciben alertas cuando activas el botón de pánico'}
                  {key === 'soundAlerts' && 'Sonidos de alerta para notificaciones importantes'}
                </p>
              </div>
              <button
                onClick={() => setSafetySettings({
                  ...safetySettings,
                  [key]: !value
                })}
                title={`Alternar ${key}`}
                aria-label={`Alternar ${key}`}
                className={`w-12 h-6 rounded-full transition-colors ${value ? 'bg-primary-green' : 'bg-light-gray'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transform transition-transform ${value ? 'translate-x-7' : 'translate-x-1'}`}></div>
              </button>
            </div>
          ))}
        </div>

        {/* Estadísticas de seguridad */}
        <div className="mt-8 pt-6 border-t border-light-gray">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-green">156</div>
              <p className="text-sm text-medium-gray">Viajes seguros</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">100%</div>
              <p className="text-sm text-medium-gray">Conductores verificados</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">0</div>
              <p className="text-sm text-medium-gray">Incidentes</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SafetyScreen