import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const TripHistory: React.FC = () => {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const trips = [
    { id: 1, date: '2026-02-22', driver: 'Carlos M.', vehicle: 'Toyota Hilux', earnings: 25.50, status: 'completed' },
    { id: 2, date: '2026-02-21', driver: 'María L.', vehicle: 'Nissan Frontier', earnings: 32.00, status: 'completed' },
    { id: 3, date: '2026-02-20', driver: 'Juan P.', vehicle: 'Chevrolet D-Max', earnings: 18.75, status: 'completed' },
    { id: 4, date: '2026-02-19', driver: 'Ana S.', vehicle: 'Lancha a motor', earnings: 45.00, status: 'completed' },
    { id: 5, date: '2026-02-18', driver: 'Pedro G.', vehicle: 'Moto', earnings: 12.50, status: 'completed' },
    { id: 6, date: '2026-02-17', driver: 'Carlos M.', vehicle: 'Toyota Hilux', earnings: 28.00, status: 'completed' },
    { id: 7, date: '2026-02-16', driver: 'María L.', vehicle: 'Nissan Frontier', earnings: 30.50, status: 'cancelled' },
    { id: 8, date: '2026-02-15', driver: 'Juan P.', vehicle: 'Chevrolet D-Max', earnings: 22.25, status: 'completed' },
  ]

  const filteredTrips = filter === 'all' ? trips : trips.filter(trip => trip.status === filter)

  const totalEarnings = trips.filter(t => t.status === 'completed').reduce((sum, trip) => sum + trip.earnings, 0)
  const completedTrips = trips.filter(t => t.status === 'completed').length
  const cancelledTrips = trips.filter(t => t.status === 'cancelled').length

  return (
    <div className="p-6 pb-24">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary-green">{t('trip_history')}</h1>
        <p className="text-medium-gray">{t('trip_history_subtitle')}</p>
      </motion.header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-green">${totalEarnings.toFixed(2)}</div>
          <div className="text-sm text-medium-gray">Ganancias totales</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-success">{completedTrips}</div>
          <div className="text-sm text-medium-gray">Viajes completados</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-error">{cancelledTrips}</div>
          <div className="text-sm text-medium-gray">Cancelados</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl font-medium ${filter === 'all' ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-xl font-medium ${filter === 'completed' ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}
        >
          Completados
        </button>
        <button
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-xl font-medium ${filter === 'cancelled' ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}
        >
          Cancelados
        </button>
      </div>

      {/* Trip List */}
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <motion.div
            key={trip.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="card"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                  trip.status === 'completed' ? 'bg-light-green text-primary-green' : 'bg-red-50 text-error'
                }`}>
                  <i className={`fas ${trip.vehicle.includes('Lancha') ? 'fa-ship' : trip.vehicle.includes('Moto') ? 'fa-motorcycle' : 'fa-car'}`}></i>
                </div>
                <div>
                  <h3 className="font-bold">{trip.driver}</h3>
                  <p className="text-sm text-medium-gray">{trip.vehicle}</p>
                  <p className="text-xs text-medium-gray">{trip.date}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  trip.status === 'completed' ? 'text-primary-green' : 'text-error'
                }`}>
                  ${trip.earnings.toFixed(2)}
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  trip.status === 'completed' ? 'bg-light-green text-primary-green' : 'bg-red-50 text-error'
                }`}>
                  {trip.status === 'completed' ? 'Completado' : 'Cancelado'}
                </div>
              </div>
            </div>
            {trip.status === 'completed' && (
              <div className="mt-4 pt-4 border-t border-light-gray flex justify-between text-sm">
                <button className="text-primary-green font-medium">
                  <i className="fas fa-redo mr-2"></i>
                  Solicitar mismo conductor
                </button>
                <button className="text-medium-gray">
                  <i className="fas fa-flag mr-2"></i>
                  Reportar
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="card mt-8">
        <h3 className="font-bold mb-4">Resumen mensual</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-medium-gray">Febrero 2026</span>
            <span className="font-bold">${totalEarnings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-medium-gray">Enero 2026</span>
            <span className="font-bold">$312.75</span>
          </div>
          <div className="flex justify-between">
            <span className="text-medium-gray">Diciembre 2025</span>
            <span className="font-bold">$298.50</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-light-gray">
          <p className="text-sm text-medium-gray">
            <i className="fas fa-info-circle text-primary-green mr-2"></i>
            Las ganancias son netas después de la comisión del 15% de la plataforma. Los pagos se realizan cada lunes.
          </p>
        </div>
      </div>
    </div>
  )
}

export default TripHistory