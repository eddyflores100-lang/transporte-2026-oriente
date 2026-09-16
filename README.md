# 🚗 Gosa - Transporte del Oriente

**App de transporte tipo Uber para la región oriental de Ecuador**

## 🌿 Descripción

Gosa es una plataforma de transporte diseñada específicamente para las necesidades de movilidad en la Amazonía ecuatoriana. Conecta a conductores locales con pasajeros de manera segura, confiable y accesible.

## 🎯 Características Principales

### 🚖 Para Pasajeros
- **Solicitud de viajes** en tiempo real
- **Mapa interactivo** con conductores disponibles
- **Tarifas transparentes** y competitivas
- **Perfiles verificados** de conductores
- **Sistema de calificaciones** y reseñas
- **Múltiples métodos de pago**

### 👨‍✈️ Para Conductores
- **Registro sencillo** con verificación de documentos
- **Gestión de viajes** y ganancias
- **Navegación optimizada** para rutas rurales
- **Soporte 24/7** para incidentes
- **Programación flexible** de horarios

### 🏞️ Específico para el Oriente
- **Cobertura en zonas rurales** y comunidades
- **Vehiculos adaptados** para terrenos difíciles (camionetas 4x4)
- **Tarifas especiales** para trayectos largos
- **Idiomas locales** (español, kichwa, shuar)
- **Puntos de referencia** comunitarios

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** con TypeScript
- **Vite** para build y desarrollo rápido
- **React Router** para navegación
- **Leaflet/React-Leaflet** para mapas
- **Axios** para peticiones HTTP
- **CSS Modules** para estilos

### Backend (Próximamente)
- **Node.js** con Express
- **PostgreSQL** con Prisma ORM
- **JWT** para autenticación
- **Socket.io** para tiempo real
- **Stripe API** para pagos

### Despliegue
- **Vercel** para frontend
- **Railway/Render** para backend
- **GitHub Actions** para CI/CD

## 📦 Instalación y Uso Local

### Prerrequisitos
- Node.js 18 o superior
- npm, yarn o pnpm

### Pasos
1. Clonar el repositorio:
```bash
git clone https://github.com/tuusuario/gosa-app.git
cd gosa-app
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Ejecutar en desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## 📁 Estructura del Proyecto

```
gosa-app/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── hooks/         # Custom hooks de React
│   ├── utils/         # Funciones utilitarias
│   ├── types/         # Definiciones de TypeScript
│   ├── styles/        # Estilos globales
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Punto de entrada
├── public/            # Assets estáticos
├── package.json
├── vite.config.ts
└── README.md
```

## 🚀 Despliegue

### Frontend (Vercel)
1. Conectar repositorio GitHub con Vercel
2. Configurar variables de entorno
3. Desplegar automáticamente en cada push

### Backend (Railway)
1. Subir código del backend
2. Configurar base de datos PostgreSQL
3. Establecer variables de entorno
4. Conectar con frontend via CORS

## 📱 Funcionalidades Futuras

### Fase 2
- [ ] **App móvil** React Native
- [ ] **Pagos en efectivo** con código QR
- [ ] **Viajes compartidos** para comunidades
- [ ] **Sistema de paquetes** y envíos

### Fase 3
- [ ] **Integración con GPS** offline
- [ ] **Alertas de seguridad** comunitarias
- [ ] **Reservas anticipadas** para fiestas
- [ ] **Programa de lealtad** para usuarios frecuentes

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Distribuido bajo licencia MIT. Ver `LICENSE` para más información.

## 👥 Equipo

- **Edison** - Fundador y desarrollador principal
- **Comunidades del Oriente** - Testing y feedback
- **Conductores locales** - Validación de requerimientos

## 🌐 Contacto

- **Email**: info@gosa-ec.com
- **Website**: https://gosa-ec.com
- **GitHub**: https://github.com/tuusuario/gosa-app
- **WhatsApp**: +593 99 123 4567

---

**¡Conectando comunidades, un viaje a la vez!** 🌿🚗