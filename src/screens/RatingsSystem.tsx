import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

const RatingsSystem: React.FC = () => {
  const { t } = useLanguage()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState([
    { id: 1, driver: 'Carlos M.', rating: 5, comment: 'Excelente servicio, puntual y muy amable.', date: '2026-02-20', vehicle: 'Toyota Hilux' },
    { id: 2, driver: 'María L.', rating: 4, comment: 'Buen conductor, seguro y conocedor de las rutas.', date: '2026-02-18', vehicle: 'Nissan Frontier' },
    { id: 3, driver: 'Juan P.', rating: 5, comment: 'Viaje cómodo, me ayudó con el equipaje.', date: '2026-02-15', vehicle: 'Chevrolet D-Max' },
    { id: 4, driver: 'Ana S.', rating: 3, comment: 'Un poco tarde pero el viaje fue seguro.', date: '2026-02-10', vehicle: 'Lancha a motor' },
    { id: 5, driver: 'Pedro G.', rating: 4, comment: 'Muy buena conversación, recomiendo.', date: '2026-02-05', vehicle: 'Moto' },
  ])

  const handleSubmit = () => {
    if (rating === 0) return alert('Por favor selecciona una calificación')
    const newReview = {
      id: reviews.length + 1,
      driver: 'Tú',
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      vehicle: 'Tu viaje',
    }
    setReviews([newReview, ...reviews])
    setRating(0)
    setComment('')
  }

  const drivers = [
    { id: 1, name: 'Carlos M.', avgRating: 4.8, totalTrips: 124, vehicle: 'Toyota Hilux' },
    { id: 2, name: 'María L.', avgRating: 4.9, totalTrips: 89, vehicle: 'Nissan Frontier' },
    { id: 3, name: 'Juan P.', avgRating: 4.7, totalTrips: 203, vehicle: 'Chevrolet D-Max' },
    { id: 4, name: 'Ana S.', avgRating: 4.5, totalTrips: 56, vehicle: 'Lancha a motor' },
    { id: 5, name: 'Pedro G.', avgRating: 4.6, totalTrips: 178, vehicle: 'Moto' },
  ]

  return (
    <div className="p-6 pb-24">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary-green">{t('ratings_title')}</h1>
        <p className="text-medium-gray">{t('ratings_subtitle')}</p>
      </motion.header>

      {/* Top drivers */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Top conductores</h2>
        <div className="space-y-4">
          {drivers.map((driver) => (
            <div key={driver.id} className="flex items-center justify-between p-4 border border-light-gray rounded-xl">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-light-green rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-secondary-green text-xl"></i>
                </div>
                <div>
                  <h3 className="font-bold">{driver.name}</h3>
                  <p className="text-sm text-medium-gray">{driver.vehicle}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-2">{driver.avgRating}</span>
                  <div className="text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(driver.avgRating) ? 'text-yellow-500' : 'text-light-gray'}`}></i>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-medium-gray">{driver.totalTrips} viajes</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add rating */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">{t('rate_driver')}</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('your_rating')}</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-4xl focus:outline-none"
              >
                <i className={`fas fa-star ${star <= rating ? 'text-yellow-500' : 'text-light-gray'}`}></i>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('comment')}</label>
          <textarea
            className="input-field w-full h-32"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comparte tu experiencia con el conductor..."
          />
        </div>
        <button onClick={handleSubmit} className="btn-primary w-full">
          <i className="fas fa-paper-plane mr-2"></i>
          Enviar calificación
        </button>
      </div>

      {/* Recent reviews */}
      <div>
        <h2 className="text-xl font-bold mb-4">Últimas reseñas</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold">{review.driver}</h3>
                  <p className="text-sm text-medium-gray">{review.vehicle} • {review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star ${i < review.rating ? 'text-yellow-500' : 'text-light-gray'} ml-1`}></i>
                  ))}
                </div>
              </div>
              <p className="text-medium-gray">{review.comment}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RatingsSystem