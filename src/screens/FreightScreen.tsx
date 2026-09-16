import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const FreightScreen: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [weight, setWeight] = useState('')
  const [volume, setVolume] = useState('')
  const [distance, setDistance] = useState('')
  const [cargoType, setCargoType] = useState('general')
  const [calculated, setCalculated] = useState(false)
  const [fare, setFare] = useState(0)

  const cargoTypes = [
    { id: 'general', name: t('general_cargo'), factor: 1.0 },
    { id: 'fragile', name: t('fragile'), factor: 1.5 },
    { id: 'perishable', name: t('perishable'), factor: 1.8 },
    { id: 'hazardous', name: t('hazardous'), factor: 2.5 },
    { id: 'bulky', name: t('bulky'), factor: 1.3 },
  ]

  const calculateFare = () => {
    const w = parseFloat(weight) || 0
    const v = parseFloat(volume) || 0
    const d = parseFloat(distance) || 0
    const factor = cargoTypes.find(c => c.id === cargoType)?.factor || 1.0
    // Tarifa base: $0.50 por kg, $2 por m³, $0.30 por km
    const base = (w * 0.5) + (v * 2) + (d * 0.3)
    const total = base * factor
    setFare(Math.round(total * 100) / 100)
    setCalculated(true)
  }

  const reset = () => {
    setWeight('')
    setVolume('')
    setDistance('')
    setCargoType('general')
    setCalculated(false)
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

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8 pt-12"
      >
        <h1 className="text-3xl font-bold text-primary-green">{t('freight_calculator')}</h1>
        <p className="text-medium-gray">{t('freight_calculator')}: cotización instantánea</p>
      </motion.header>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold mb-6 text-dark-gray">{t('cargo_details')}</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-medium-gray">{t('weight_label')}</label>
            <div className="flex items-center">
              <input
                type="number"
                className="input-field flex-1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ej: 500"
              />
              <span className="ml-3 font-medium">kg</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-medium-gray">{t('volume_label')}</label>
            <div className="flex items-center">
              <input
                type="number"
                className="input-field flex-1"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="Ej: 2.5"
              />
              <span className="ml-3 font-medium">m³</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-medium-gray">{t('distance_label')}</label>
            <div className="flex items-center">
              <input
                type="number"
                className="input-field flex-1"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Ej: 120"
              />
              <span className="ml-3 font-medium">km</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-medium-gray">{t('freight_type')}</label>
            <div className="grid grid-cols-2 gap-3">
              {cargoTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setCargoType(type.id)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    cargoType === type.id
                      ? 'border-primary-green bg-light-green text-primary-green'
                      : 'border-light-gray bg-white text-medium-gray'
                  }`}
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm opacity-75">x{type.factor}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex space-x-4">
          <button onClick={calculateFare} className="bg-primary-green text-white font-bold py-3 px-4 rounded-xl flex-1 shadow-md active:scale-[0.98] transition">
            <i className="fas fa-calculator mr-2"></i>
            {t('freight_calculate')}
          </button>
          <button onClick={reset} className="bg-gray-200 text-dark-gray font-bold py-3 px-4 rounded-xl shadow-md active:scale-[0.98] transition">
            <i className="fas fa-redo mr-2"></i>
            {t('reset')}
          </button>
        </div>
      </div>

      {calculated && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-primary-green to-secondary-green text-white rounded-3xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">{t('freight_result')}</h2>
          <div className="text-center py-6">
            <div className="text-5xl font-bold mb-2">${fare.toFixed(2)}</div>
            <p className="opacity-90">{t('usd')}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm opacity-80">{t('weight_label')}</div>
              <div className="font-bold">{weight} kg</div>
            </div>
            <div>
              <div className="text-sm opacity-80">{t('volume_label')}</div>
              <div className="font-bold">{volume} m³</div>
            </div>
            <div>
              <div className="text-sm opacity-80">{t('distance_label')}</div>
              <div className="font-bold">{distance} km</div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm opacity-90 leading-relaxed">
              {t('freight_terms')}
            </p>
            <button 
              onClick={() => {
                alert(t('freight_success'));
                navigate('/trip-history');
              }}
              className="mt-6 w-full bg-white text-primary-green py-3 rounded-xl font-bold hover:bg-gray-100 transition active:scale-[0.98]"
            >
              {t('request_freight')}
            </button>
          </div>
        </motion.div>
      )}

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-md mb-8">
        <h3 className="font-bold mb-4 text-dark-gray">{t('additional_info')}</h3>
        <ul className="space-y-2 text-sm text-medium-gray">
          <li className="flex items-start">
            <div className="mr-3 mt-0.5 bg-green-100 p-1 rounded-full">
              <i className="fas fa-check text-success text-xs"></i>
            </div>
            <span className="leading-snug">{t('freight_info_1')}</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-0.5 bg-green-100 p-1 rounded-full">
              <i className="fas fa-check text-success text-xs"></i>
            </div>
            <span className="leading-snug">{t('freight_info_2')}</span>
          </li>
          <li className="flex items-start">
            <div className="mr-3 mt-0.5 bg-green-100 p-1 rounded-full">
              <i className="fas fa-check text-success text-xs"></i>
            </div>
            <span className="leading-snug">{t('freight_info_3')}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FreightScreen