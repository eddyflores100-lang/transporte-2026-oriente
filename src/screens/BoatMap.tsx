import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom boat icon
const boatIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2971/2971976.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const BoatMap: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [origin, setOrigin] = useState<number | null>(null);
  const [destination, setDestination] = useState<number | null>(null);

  // Puntos fluviales en la Amazonía ecuatoriana
  const riverPoints = [
    {
      id: 1,
      name: "Puerto de Misahuallí",
      position: [-1.0333, -77.6667] as [number, number],
      description: "Embarcadero principal hacia el Napo",
      type: "embarcadero",
    },
    {
      id: 2,
      name: "Puerto de Coca",
      position: [-0.4667, -76.9833] as [number, number],
      description: "Acceso al río Napo",
      type: "puerto",
    },
    {
      id: 3,
      name: "Puerto de Nuevo Rocafuerte",
      position: [-0.9333, -75.4] as [number, number],
      description: "Frontera con Perú",
      type: "frontera",
    },
    {
      id: 4,
      name: "Puerto de Ahuano",
      position: [-1.0667, -77.55] as [number, number],
      description: "Comunidad Kichwa",
      type: "comunidad",
    },
    {
      id: 5,
      name: "Puerto de Pañacocha",
      position: [-0.3333, -75.2833] as [number, number],
      description: "Reserva ecológica",
      type: "reserva",
    },
    {
      id: 6,
      name: "Puerto de Limoncocha",
      position: [-0.4, -76.6167] as [number, number],
      description: "Laguna y biodiversidad",
      type: "laguna",
    },
    {
      id: 7,
      name: "Puerto de Tiputini",
      position: [-0.8167, -75.5333] as [number, number],
      description: "Estación científica",
      type: "cientifico",
    },
    {
      id: 8,
      name: "Puerto de Yasuní",
      position: [-0.9167, -75.6667] as [number, number],
      description: "Entrada al parque nacional",
      type: "parque",
    },
  ];

  // Función para calcular distancia (Haversine simple)
  const calculateDistance = (p1: [number, number], p2: [number, number]) => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
    const dLon = ((p2[1] - p1[1]) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1[0] * Math.PI) / 180) *
        Math.cos((p2[0] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMarkerClick = (id: number) => {
    if (!origin) {
      setOrigin(id);
      setDestination(null);
    } else if (origin === id) {
      setOrigin(null);
      setDestination(null);
    } else if (!destination) {
      setDestination(id);
    } else {
      setOrigin(id);
      setDestination(null);
    }
  };

  const originPoint = riverPoints.find((p) => p.id === origin);
  const destPoint = riverPoints.find((p) => p.id === destination);
  const routeDistance =
    originPoint && destPoint
      ? calculateDistance(originPoint.position, destPoint.position)
      : 0;
  const estimatedTime = routeDistance ? (routeDistance / 25) * 60 : 0; // Asumiendo 25km/h para lancha rápida

  // Rutas fluviales simuladas
  const riverRoutes = [
    {
      points: [
        [-1.0333, -77.6667],
        [-0.4667, -76.9833],
        [-0.3333, -75.2833],
      ],
      name: "Ruta Napo",
    },
    {
      points: [
        [-0.4667, -76.9833],
        [-0.8167, -75.5333],
        [-0.9167, -75.6667],
      ],
      name: "Ruta Yasuní",
    },
  ];

  const center: [number, number] = [-0.8, -76.5];

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
        <h1 className="text-3xl font-bold text-primary-green">
          {t("amazon_navigation")}
        </h1>
        <p className="text-medium-gray">
          {t("tap_to_route")}
        </p>
      </motion.header>

      <div className="bg-white rounded-3xl shadow-md mb-8 p-0 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="font-bold">{t("amazon_navigation")}</h2>
            <p className="text-sm text-medium-gray">
              {t("tap_to_route")}
            </p>
          </div>
          {origin && (
            <button
              onClick={() => {
                setOrigin(null);
                setDestination(null);
              }}
              className="text-xs bg-error/10 text-error px-3 py-1 rounded-full font-bold active:scale-95 transition"
            >
              {t("reset")}
            </button>
          )}
        </div>
        <div className="h-[400px] relative">
          <MapContainer
            center={center}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {riverRoutes.map((route, idx) => (
              <Polyline
                key={idx}
                positions={route.points as any}
                color="#0A5C36"
                weight={2}
                opacity={0.3}
                dashArray="5, 10"
              />
            ))}
            {originPoint && destPoint && (
              <Polyline
                positions={[originPoint.position, destPoint.position]}
                color="#EEFF41"
                weight={4}
                opacity={0.9}
              />
            )}
            {riverPoints.map((point) => (
              <Marker
                key={point.id}
                position={point.position}
                icon={boatIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(point.id),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <strong className="text-primary-green">{point.name}</strong>
                    <br />
                    <span className="text-xs text-medium-gray">
                      {point.description}
                    </span>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => setOrigin(point.id)}
                        className={`text-[10px] px-2 py-1 rounded shadow-sm transition active:scale-95 ${origin === point.id ? "bg-primary-green text-white" : "bg-light-green"}`}
                      >
                        {t("origin") || "Origen"}
                      </button>
                      <button
                        onClick={() => setDestination(point.id)}
                        className={`text-[10px] px-2 py-1 rounded shadow-sm transition active:scale-95 ${destination === point.id ? "bg-secondary-green text-white" : "bg-light-green"}`}
                      >
                        {t("destination") || "Destino"}
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Panel de resultados de ruta */}
        <AnimatePresence>
          {originPoint && destPoint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary-green text-white p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] uppercase opacity-70">
                      {t("distance_label")}
                    </p>
                    <p className="text-xl font-bold">
                      {routeDistance.toFixed(1)} km
                    </p>
                  </div>
                  <div className="w-px h-8 bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-[10px] uppercase opacity-70">
                      {t("est_time") || "Tiempo Est."}
                    </p>
                    <p className="text-xl font-bold">
                      {Math.round(estimatedTime)} min
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    alert(t("boat_success"));
                    navigate('/trip-history');
                  }}
                  className="bg-white text-primary-green px-6 py-2 rounded-xl font-black text-sm shadow-xl hover:bg-gray-100 transition active:scale-95"
                >
                  {t('request_boat')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-4 border-t flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-green rounded-full shadow-lg"></div>
            <span className="text-xs text-medium-gray">{t("boarding_point")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 bg-primary-green opacity-30 rounded-full border-t border-dashed border-white"></div>
            <span className="text-xs text-medium-gray">{t("suggested_routes")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow-md">
          <h3 className="font-bold mb-4 text-dark-gray">{t("active_docks")}</h3>
          <ul className="space-y-2">
            {riverPoints.slice(0, 4).map((point) => (
              <li key={point.id} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-3 ${
                    point.type === "embarcadero"
                      ? "bg-info"
                      : point.type === "puerto"
                        ? "bg-success"
                        : point.type === "comunidad"
                          ? "bg-warning"
                          : "bg-error"
                  }`}
                ></div>
                <div>
                  <div className="font-medium">{point.name}</div>
                  <div className="text-xs text-medium-gray">{point.type}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-md">
          <h3 className="font-bold mb-4 text-dark-gray">{t("upcoming_trips")}</h3>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Misahuallí → Coca</span>
              <span className="font-bold text-primary-green">8:00 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Coca → Yasuní</span>
              <span className="font-bold text-primary-green">10:30 AM</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Nuevo Rocafuerte → Pañacocha</span>
              <span className="font-bold text-primary-green">1:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-md mb-8">
        <h3 className="font-bold mb-4 text-dark-gray">{t("boat_safety_info")}</h3>
        <p className="text-sm text-medium-gray mb-6 leading-relaxed">
          {t("boat_safety_desc")}
        </p>
        <div className="flex items-center text-sm gap-4 flex-wrap">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-info/10 flex items-center justify-center mr-2">
              <i className="fas fa-life-ring text-info"></i>
            </div>
            <span>{t("life_jackets")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center mr-2">
              <i className="fas fa-umbrella-beach text-warning"></i>
            </div>
            <span>{t("sun_protection")}</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center mr-2">
              <i className="fas fa-satellite-dish text-success"></i>
            </div>
            <span>{t("radio_comm")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoatMap;
