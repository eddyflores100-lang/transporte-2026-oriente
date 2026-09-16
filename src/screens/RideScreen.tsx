import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from 'react-leaflet'
import { useLanguage } from '../contexts/LanguageContext'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

const userIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})

const SetMapCenter: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap()
  useEffect(() => {
    map.flyTo(position, 15, { animate: true })
  }, [position, map])
  return null
}

const FitRouteBounds: React.FC<{ path: [number, number][] }> = ({ path }) => {
  const map = useMap()
  useEffect(() => {
    if (path.length > 1) {
      const bounds = L.polyline(path).getBounds()
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  }, [path, map])
  return null
}

const RideScreen: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()
  
  const searchParams = new URLSearchParams(location.search)
  const destQuery = searchParams.get('dest') || ''

  const [driver, setDriver] = useState({
    name: 'Carlos M.',
    rating: 4.8,
    car: 'Toyota Corolla 2022',
    plate: 'ABC-123',
    eta: '5 min',
    price: '$12.50'
  })

  const [origin, setOrigin] = useState('Mi Ubicación Actual')
  const [destination, setDestination] = useState(destQuery)
  const [rideStatus, setRideStatus] = useState('searching') // searching, found, on_way, completed, rating

  // GPS coordinates
  const [originCoords, setOriginCoords] = useState<[number, number]>([-0.9089, -77.8183]) // default Tena
  const [destCoords, setDestCoords] = useState<[number, number] | null>(null)
  const [isLocating, setIsLocating] = useState(true)
  const [routePath, setRoutePath] = useState<[number, number][]>([])

  // Search Results
  const [originResults, setOriginResults] = useState<any[]>([])
  const [destResults, setDestResults] = useState<any[]>([])
  const [isSearchingOrigin, setIsSearchingOrigin] = useState(false)
  const [isSearchingDest, setIsSearchingDest] = useState(false)

  // Dynamic Ride Data
  const [distanceKm, setDistanceKm] = useState<number>(0)
  const [estimatedPrice, setEstimatedPrice] = useState<number>(1.25)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'kushki' | 'peigo'>('cash')
  const [rating, setRating] = useState<number>(0)

  // Get GPS Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOriginCoords([position.coords.latitude, position.coords.longitude])
          setIsLocating(false)
        },
        (error) => {
          console.log("Error obtaining GPS location", error)
          setIsLocating(false)
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false)
    }
  }, [])

  // Geocode function for Nominatim
  const searchAddress = async (query: string, setResults: (results: any[]) => void, setIsSearching: (val: boolean) => void) => {
    if (!query || query.length < 3) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Ecuador')}&limit=5&accept-language=es`)
      const data = await res.json()
      setResults(data)
    } catch (e) {
      console.error("Geocoding error:", e)
    } finally {
      setIsSearching(false);
    }
  }

  // Handle Search origin (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (origin !== 'Mi Ubicación Actual' && !origin.startsWith('Punto en el mapa')) {
        searchAddress(origin, setOriginResults, setIsSearchingOrigin);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [origin])

  // Handle Search destination (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination && destination !== destQuery && !destination.startsWith('Punto en el mapa')) {
        searchAddress(destination, setDestResults, setIsSearchingDest);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [destination])

  // Geocode initial query string
  useEffect(() => {
    if (destQuery) {
       searchAddress(destQuery, (data) => {
         if (data && data.length > 0) {
           setDestCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)])
           setDestination(data[0].display_name.split(',')[0])
         }
       }, () => {});
    }
  }, [destQuery])

  // OSRM Routing Function
  const [alternativeRoutes, setAlternativeRoutes] = useState<any[]>([])
  
  const getRoute = async (start: [number, number], end: [number, number]) => {
    try {
      // alternatives=true for more options
      const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson&alternatives=true`)
      const data = await res.json()
      if (data.routes && data.routes.length > 0) {
        setAlternativeRoutes(data.routes)
        // Set primary route
        const coords = data.routes[0].geometry.coordinates.map((c: any) => [c[1], c[0]]);
        setRoutePath(coords);
        
        const dist = data.routes[0].distance / 1000; // km
        setDistanceKm(dist);
        // Price: $1.50 base + $0.50/km
        const price = 1.50 + (dist * 0.50);
        setEstimatedPrice(Math.max(1.50, price));
      }
    } catch (e) {
      console.error("Routing error:", e)
    }
  }

  useEffect(() => {
    if (originCoords && destCoords) {
      getRoute(originCoords, destCoords);
    }
  }, [originCoords, destCoords])

  // Map Click Handler Component
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        if (rideStatus === 'searching') {
          setDestCoords([e.latlng.lat, e.latlng.lng])
          setDestination(`Punto en el mapa (${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)})`)
        }
      }
    })
    return null
  }


  return (
    <div className="p-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary-green">{t('your_ride')}</h1>
          <p className="text-medium-gray">{t('configure_route')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/safety')}
            title="Emergencia SOS"
            aria-label="Emergencia SOS"
            className="w-12 h-12 bg-error rounded-full shadow-md flex items-center justify-center hover:bg-red-600 active:scale-95 transition cursor-pointer"
          >
            <i className="fas fa-shield-alt text-xl text-white"></i>
          </button>
          <button onClick={() => navigate('/')} title="Cerrar" aria-label="Cerrar" className="text-error w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <i className="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Origin/Destination Selection box */}
      <div className="card mb-6 shadow-sm border border-gray-100 relative z-[2000]">
         <div className="flex items-center mb-3 relative">
           <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
           <div className="flex-1 relative">
             <input 
               type="text" 
               placeholder={t('origin_placeholder')} 
               className="w-full bg-gray-50 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary-green"
               value={origin}
               onChange={(e) => setOrigin(e.target.value)}
             />
             {isSearchingOrigin && <div className="absolute right-2 top-2"><i className="fas fa-spinner fa-spin text-gray-400"></i></div>}
             
             {originResults.length > 0 && (
               <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-xl mt-1 border border-gray-100 z-[3000] overflow-hidden">
                 {originResults.map((r, i) => (
                   <div 
                     key={i} 
                     onClick={() => {
                       setOriginCoords([parseFloat(r.lat), parseFloat(r.lon)])
                       setOrigin(r.display_name.split(',')[0])
                       setOriginResults([])
                     }}
                     className="p-3 text-xs hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                   >
                     {r.display_name}
                   </div>
                 ))}
               </div>
             )}
           </div>
         </div>
         <div className="h-6 border-l border-gray-300 ml-1 mb-1 relative -top-3"></div>
         <div className="flex items-center relative">
           <div className="w-2 h-2 rounded-sm bg-black mr-3"></div>
           <div className="flex-1 relative">
             <input 
               type="text" 
               placeholder={t('destination_placeholder')} 
               className="w-full bg-gray-50 p-2 rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary-green"
               value={destination}
               onChange={(e) => setDestination(e.target.value)}
             />
             {isSearchingDest && <div className="absolute right-2 top-2"><i className="fas fa-spinner fa-spin text-gray-400"></i></div>}

             {destResults.length > 0 && (
               <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-xl mt-1 border border-gray-100 z-[3000] overflow-hidden">
                 {destResults.map((r, i) => (
                   <div 
                     key={i} 
                     onClick={() => {
                       setDestCoords([parseFloat(r.lat), parseFloat(r.lon)])
                       setDestination(r.display_name.split(',')[0])
                       setDestResults([])
                     }}
                     className="p-3 text-xs hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                   >
                     {r.display_name}
                   </div>
                 ))}
               </div>
             )}
           </div>
         </div>
      </div>

      {/* Alternative Routes Selector (Premium UI) */}
      {alternativeRoutes.length > 1 && rideStatus === 'searching' && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {alternativeRoutes.map((route, idx) => (
            <motion.div
              key={idx}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const coords = route.geometry.coordinates.map((c: any) => [c[1], c[0]]);
                setRoutePath(coords);
                const dist = route.distance / 1000;
                setDistanceKm(dist);
                const price = 1.50 + (dist * 0.50);
                setEstimatedPrice(Math.max(1.50, price));
              }}
              className={`flex-shrink-0 p-3 rounded-2xl border-2 transition cursor-pointer ${
                routePath[0]?.[0] === route.geometry.coordinates[0][1] && route.distance / 1000 === distanceKm
                  ? 'border-primary-green bg-light-green shadow-sm' 
                  : 'border-transparent bg-white shadow-sm hover:border-gray-100'
              }`}
            >
              <p className="text-[10px] text-medium-gray uppercase font-bold tracking-wider">Ruta {idx + 1}</p>
              <div className="flex items-end gap-1 mt-1">
                <span className="text-lg font-bold">${(1.50 + (route.distance / 1000 * 0.50)).toFixed(2)}</span>
                <span className="text-[10px] text-medium-gray mb-1">{(route.distance / 1000).toFixed(1)} km</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mapa Real con OSRM Routing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card h-80 mb-6 relative overflow-hidden p-0 rounded-3xl shadow-lg border-2 border-white"
        style={{ zIndex: 10 }}
      >
        <MapContainer 
          {...{
            center: originCoords,
            zoom: 14,
            scrollWheelZoom: true,
            style: { height: '100%', width: '100%' },
            zoomControl: false
          } as any}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
          />
          <MapEvents />
          <FitRouteBounds path={routePath} />
          
          {/* Ubicación del usuario */}
          <Marker {...({ position: originCoords, icon: userIcon } as any)} />
          
          {/* Destino */}
          {destCoords && (
             <>
               <Marker {...({ position: destCoords } as any)} />
               <SetMapCenter position={destCoords} />
             </>
          )}

          {/* Ruta real (OSRM) */}
          {routePath.length > 1 && (
            <Polyline 
              {...({ 
                positions: routePath, 
                pathOptions: { color: '#0D9F6E', weight: 6, opacity: 0.8 } 
              } as any)} 
            />
          )}

          {/* Ubicación del conductor simulada cerca al origen para efecto si se solicita */}
          {rideStatus !== 'searching' && (
            <Marker {...({ position: [originCoords[0] - 0.002, originCoords[1] - 0.002], icon: driverIcon } as any)} />
          )}

          {!destCoords && <SetMapCenter position={originCoords} />}
        </MapContainer>
        
        {(rideStatus === 'searching' || isLocating) && !destCoords && (
          <div className="absolute inset-0 bg-primary-green/5 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-48 h-48 bg-primary-green/20 rounded-full"
            />
          </div>
        )}
      </motion.div>

      {/* Información del conductor */}
      {(rideStatus === 'found' || rideStatus === 'on_way') && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card mb-6"
        >
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-light-green rounded-full flex items-center justify-center mr-4 shadow-sm border border-primary-green/20">
              <i className="fas fa-user text-3xl text-secondary-green"></i>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{driver.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star ${i < Math.floor(driver.rating) ? 'text-warning' : 'text-light-gray'}`}
                    ></i>
                  ))}
                </div>
                <span className="text-medium-gray">{driver.rating}</span>
              </div>
              <p className="text-sm text-medium-gray">{driver.car} • <span className="font-mono bg-gray-100 px-1 rounded">{driver.plate}</span></p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-green">${estimatedPrice.toFixed(2)}</div>
              <p className="text-sm text-medium-gray">{t('estimated_price')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-light-green rounded-xl shadow-sm border border-primary-green/10">
              <p className="text-sm text-medium-gray">{t('eta')}</p>
              <p className="text-xl font-bold text-primary-green">{Math.max(2, Math.round(distanceKm * 2))} min</p>
            </div>
            <div className="text-center p-3 bg-light-green rounded-xl shadow-sm border border-primary-green/10">
              <p className="text-sm text-medium-gray">{t('distance')}</p>
              <p className="text-xl font-bold text-primary-green">{distanceKm.toFixed(1)} km</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Panel de Estado / Controles */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="card shadow-lg border border-gray-100"
      >
        {rideStatus === 'rating' ? (
          <div className="text-center py-4">
             <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-4xl text-white"></i>
             </div>
             <h2 className="text-2xl font-bold mb-2">{t('ride_completed')}</h2>
             <p className="text-medium-gray mb-6">{t('rate_your_ride')} con {driver.name}</p>
             
             <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                    title={`Calificar ${star} estrellas`}
                    aria-label={`Calificar ${star} estrellas`}
                  >
                    <i className={`fas fa-star text-4xl ${star <= rating ? 'text-warning' : 'text-gray-200'}`}></i>
                  </button>
                ))}
             </div>

             <button 
                disabled={rating === 0}
                onClick={() => {
                  alert("¡Gracias por tu calificación!");
                  navigate('/trip-history');
                }}
                className={`w-full py-3 rounded-xl font-bold transition ${rating > 0 ? 'bg-primary-green text-white shadow-md' : 'bg-gray-200 text-gray-400'}`}
             >
                {t('submit_rating')}
             </button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{t('ride_status')}</h3>
              <div className={`px-3 py-1 text-sm font-bold rounded-full ${rideStatus === 'searching' ? 'bg-warning/20 text-warning' : 'bg-primary-green/20 text-primary-green'}`}>
                {rideStatus === 'searching' ? t('searching_driver') : rideStatus === 'found' ? t('driver_confirmed') : t('on_the_way')}
              </div>
            </div>
            
            <div className="space-y-4 mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm ${rideStatus === 'searching' ? 'bg-primary-green text-white' : 'bg-light-green text-primary-green'}`}>
                  <i className="fas fa-search"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t('searching_driver')}</p>
                  <p className="text-sm text-medium-gray">{t('verifying_zone')}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm ${rideStatus === 'found' || rideStatus === 'on_way' ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}>
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t('driver_confirmed')}</p>
                  <p className="text-sm text-medium-gray">{rideStatus !== 'searching' ? `${driver.name} ${t('driver_accepted')}` : '...'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 shadow-sm ${rideStatus === 'on_way' ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}>
                  <i className="fas fa-car"></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{t('on_the_way')}</p>
                  <p className="text-sm text-medium-gray">{rideStatus === 'on_way' ? t('arriving_in') : '...'}</p>
                </div>
              </div>
            </div>

            {/* Selector de Pagos (Solo activo buscando/pre-confirmacion) */}
            {rideStatus === 'searching' && destCoords && (
              <div className="mb-4 border-t pt-4">
                <h4 className="font-bold mb-3 text-sm">{t('payment_method')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setPaymentMethod('cash')} className={`p-2 rounded-xl text-sm border font-medium flex items-center justify-center gap-2 transition ${paymentMethod === 'cash' ? 'border-primary-green bg-light-green text-primary-green shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><i className="fas fa-money-bill-wave"></i> {t('cash')}</button>
                  <button onClick={() => setPaymentMethod('card')} className={`p-2 rounded-xl text-sm border font-medium flex items-center justify-center gap-2 transition ${paymentMethod === 'card' ? 'border-primary-green bg-light-green text-primary-green shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><i className="fas fa-credit-card"></i> {t('credit_card')}</button>
                  <button onClick={() => setPaymentMethod('kushki')} className={`p-2 rounded-xl text-sm border font-medium flex items-center justify-center gap-2 transition ${paymentMethod === 'kushki' ? 'border-primary-green bg-light-green text-primary-green shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><i className="fas fa-mobile-alt"></i> Kushki</button>
                  <button onClick={() => setPaymentMethod('peigo')} className={`p-2 rounded-xl text-sm border font-medium flex items-center justify-center gap-2 transition ${paymentMethod === 'peigo' ? 'border-primary-green bg-light-green text-primary-green shadow-sm' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}><i className="fas fa-wallet"></i> Peigo</button>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                if (rideStatus === 'searching') {
                  if (!destCoords) {
                    alert('Selecciona un destino antes de continuar');
                    return;
                  }
                  setRideStatus('found')
                } else if (rideStatus === 'found') {
                  setRideStatus('on_way')
                } else if (rideStatus === 'on_way') {
                  setRideStatus('rating')
                }
              }}
              className="btn-primary w-full shadow-md text-lg"
            >
              {rideStatus === 'searching' && !destCoords && t('find_driver')}
              {rideStatus === 'searching' && destCoords && `Solicitar Viaje ($${estimatedPrice.toFixed(2)})`}
              {rideStatus === 'found' && "Simular: Conductor llegó"}
              {rideStatus === 'on_way' && "Simular: Completar Viaje"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default RideScreen