import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const VehicleSelection: React.FC = () => {
  const { t } = useLanguage()
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)

  const vehicleTypes = [
    {
      id: 'camionetas',
      name: t('vehicle_pickup'),
      icon: 'fas fa-truck-pickup',
      description: t('vehicle_pickup_desc'),
      capacity: '4-5 pasajeros',
      price: '$$',
      color: 'bg-blue-50 text-blue-700',
    },
    {
      id: 'motos',
      name: t('vehicle_motorcycle'),
      icon: 'fas fa-motorcycle',
      description: t('vehicle_motorcycle_desc'),
      capacity: '1-2 pasajeros',
      price: '$',
      color: 'bg-green-50 text-green-700',
    },
    {
      id: 'lanchas',
      name: t('vehicle_boat'),
      icon: 'fas fa-ship',
      description: t('vehicle_boat_desc'),
      capacity: '6-8 pasajeros',
      price: '$$$',
      color: 'bg-cyan-50 text-cyan-700',
    },
    {
      id: 'camiones',
      name: t('vehicle_truck'),
      icon: 'fas fa-truck',
      description: t('vehicle_truck_desc'),
      capacity: 'Carga pesada',
      price: '$$$$',
      color: 'bg-orange-50 text-orange-700',
    },
    {
      id: 'fletes',
      name: t('vehicle_freight'),
      icon: 'fas fa-boxes',
      description: t('vehicle_freight_desc'),
      capacity: 'Mercancía',
      price: '$$$',
      color: 'bg-purple-50 text-purple-700',
    },
  ]

  const handleSelect = (id: string) => {
    setSelectedVehicle(id)
  }

  return (
    <div className="p-6 pb-24">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary-green">{t('vehicle_selection')}</h1>
        <p className="text-medium-gray">{t('vehicle_selection_subtitle')}</p>
      </motion.header>

      <div className="space-y-6">
        {vehicleTypes.map((vehicle) => (
          <motion.div
            key={vehicle.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`card cursor-pointer border-2 ${
              selectedVehicle === vehicle.id
                ? 'border-primary-green bg-light-green'
                : 'border-light-gray'
            }`}
            onClick={() => handleSelect(vehicle.id)}
          >
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${vehicle.color} mr-4`}>
                <i className={`${vehicle.icon} text-2xl`}></i>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{vehicle.name}</h3>
                  <span className="font-bold text-dark-gray">{vehicle.price}</span>
                </div>
                <p className="text-medium-gray text-sm mb-1">{vehicle.description}</p>
                <div className="flex items-center text-sm">
                  <i className="fas fa-users mr-1"></i>
                  <span className="mr-4">{vehicle.capacity}</span>
                  <i className="fas fa-gas-pump mr-1"></i>
                  <span>{t('vehicle_fuel')}</span>
                </div>
              </div>
              <div className="ml-4">
                <div className={`w-6 h-6 rounded-full border-2 ${
                  selectedVehicle === vehicle.id
                    ? 'bg-primary-green border-primary-green'
                    : 'border-medium-gray'
                }`}>
                  {selectedVehicle === vehicle.id && (
                    <div className="w-2 h-2 bg-white rounded-full m-auto mt-1"></div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedVehicle && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 left-6 right-6"
        >
          <button className="btn-primary w-full">
            {t('confirm_vehicle')} {vehicleTypes.find(v => v.id === selectedVehicle)?.name}
          </button>
        </motion.div>
      )}

      <div className="mt-8 card">
        <h3 className="font-bold mb-2">{t('vehicle_info_title')}</h3>
        <p className="text-medium-gray text-sm">
          {t('vehicle_info_text')}
        </p>
      </div>
    </div>
  )
}

export default VehicleSelection