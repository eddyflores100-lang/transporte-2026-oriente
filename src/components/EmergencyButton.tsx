import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface EmergencyButtonProps {
  onClick: () => void
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    setIsPressed(true)
    onClick()
    // Reiniciar después de 3 segundos
    setTimeout(() => setIsPressed(false), 3000)
  }

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-50"
      initial={{ scale: 0.8 }}
      animate={{ scale: isPressed ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <button
        onClick={handlePress}
        className="btn-danger flex items-center gap-3 px-8 py-4 rounded-full shadow-hard"
        aria-label="Botón de pánico - Enviar ubicación de emergencia"
      >
        <i className="fas fa-exclamation-triangle text-2xl"></i>
        <span className="font-bold text-lg">EMERGENCIA</span>
      </button>
      
      {/* Indicador de ubicación */}
      <div className="mt-3 text-center">
        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-soft">
          <i className="fas fa-location-dot text-error"></i>
          <span className="text-sm font-medium">Ubicación activa</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default EmergencyButton