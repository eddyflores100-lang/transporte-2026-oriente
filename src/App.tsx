import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomeScreen from './screens/HomeScreen'
import RideScreen from './screens/RideScreen'
import SafetyScreen from './screens/SafetyScreen'
import ProfileScreen from './screens/ProfileScreen'
import VehicleSelection from './screens/VehicleSelection'
import DriverRegistration from './screens/DriverRegistration'
import FreightScreen from './screens/FreightScreen'
import BoatMap from './screens/BoatMap'
import RatingsSystem from './screens/RatingsSystem'
import TripHistory from './screens/TripHistory'
import AuthScreen from './screens/AuthScreen'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <main className="w-full h-full">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/ride" element={<RideScreen />} />
              <Route path="/safety" element={<SafetyScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/vehicle-selection" element={<VehicleSelection />} />
              <Route path="/driver-registration" element={<DriverRegistration />} />
              <Route path="/freight" element={<FreightScreen />} />
              <Route path="/boat-map" element={<BoatMap />} />
              <Route path="/ratings" element={<RatingsSystem />} />
              <Route path="/trip-history" element={<TripHistory />} />
            </Routes>
          </main>
          
          {/* Navegación inferior tipo Uber */}
          <Navigation />
        </div>
      </div>
    </Router>
  )
}

export default App