# OrienteGo — movilidad y transporte del Oriente ecuatoriano

[![CI](https://github.com/eddyflores100-lang/transporte-2026-oriente/actions/workflows/ci.yml/badge.svg)](https://github.com/eddyflores100-lang/transporte-2026-oriente/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-238636)](LICENSE)

**OrienteGo** es un prototipo de interfaz móvil-first para explorar servicios de movilidad, transporte fluvial y carga en la Amazonía ecuatoriana. El repositorio conserva el nombre técnico `transporte-2026-oriente`; el nombre anterior del concepto era Gosa.

> **Estado del producto: prototipo frontend.** Las pantallas permiten revisar flujos y componentes visuales, pero este repositorio no incluye un backend operativo de viajes, asignación real de conductores, verificación documental, pagos, seguimiento en vivo ni atención de emergencias. No debe utilizarse para solicitar viajes o procesar operaciones reales.

## Qué incluye la interfaz

| Área | Ruta | Alcance actual |
|---|---|---|
| Inicio y mapa | `/` | Vista de inicio, mapa y acceso a servicios |
| Acceso | `/auth` | Pantalla de autenticación preparada para Clerk |
| Viajes | `/ride` | Flujo de solicitud de demostración y búsqueda de ubicaciones |
| Seguridad | `/safety` | Interfaz de opciones de seguridad; no es un servicio de emergencia |
| Perfil | `/profile` | Pantalla de perfil |
| Vehículos | `/vehicle-selection` | Selección visual de tipo de vehículo |
| Registro de conductor | `/driver-registration` | Formulario de demostración; no verifica documentos |
| Fletes | `/freight` | Calculadora local de estimación |
| Transporte fluvial | `/boat-map` | Mapa con puntos y trayectos ilustrativos |
| Calificaciones | `/ratings` | Interfaz de reseñas |
| Historial | `/trip-history` | Vista de historial de demostración |

Las cifras, conductores, matrículas, precios y recorridos de ejemplo que aparecen en la interfaz no representan ofertas ni servicios confirmados.

## Tecnologías

- React 19 y TypeScript
- Vite 6
- React Router 7
- React Leaflet y Leaflet
- Tailwind CSS 3
- Framer Motion
- Clerk React (la autenticación necesita una clave pública de Clerk configurada)
- Stripe.js está incluido como dependencia del frontend; no hay procesamiento de pagos operativo en este repositorio.

## Requisitos

- Node.js 22 o superior
- npm incluido con Node.js

## Instalación local

```bash
git clone https://github.com/eddyflores100-lang/transporte-2026-oriente.git
cd transporte-2026-oriente
npm ci
cp .env.example .env.local
npm run dev
```

Vite inicia el servidor local en [http://localhost:3000](http://localhost:3000).

### Variables de entorno

Configura `VITE_CLERK_PUBLISHABLE_KEY` en `.env.local` si deseas probar el proveedor de autenticación en su entorno de desarrollo.

- La clave publicable de Clerk está diseñada para exponerse en el cliente.
- Nunca pongas una clave secreta de Clerk, Stripe u otro proveedor en variables `VITE_*`, porque Vite las incorpora al bundle del navegador.
- No configures pagos reales: no existe un backend que cree y verifique sesiones de pago.

## Comandos

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor local de desarrollo |
| `npm run typecheck` | Comprueba tipos TypeScript |
| `npm run build` | Genera el build de producción |
| `npm run check` | Ejecuta typecheck y build |
| `npm run preview` | Previsualiza el build local |

## Mapas, ubicación y servicios externos

- El mapa usa teselas de Carto/OpenStreetMap.
- La pantalla de viajes consulta Nominatim para geocodificación cuando se buscan direcciones.
- El navegador puede solicitar permiso de geolocalización. Si el usuario acepta, la aplicación lee la ubicación del dispositivo.
- Estas integraciones dependen de servicios externos y sus condiciones, límites y disponibilidad. No hay un servicio propio de mapas ni un SLA.

No envíes datos personales reales a esta demo. Antes de habilitar usuarios reales, revisa los requisitos de privacidad, consentimiento, retención y seguridad de cada proveedor.

## Estructura del repositorio

```text
src/
  components/   Componentes de navegación e interfaz
  contexts/     Contexto de idioma
  screens/      Pantallas de cada flujo
  App.tsx       Rutas de la aplicación
  main.tsx      Punto de entrada React
  index.css     Estilos globales
public/         Recursos estáticos
docs/           Estado, seguridad y preparación para producción
.github/
  workflows/    Integración continua
```

## Preparación antes de un piloto real

1. Diseñar y desplegar un backend con autenticación y autorización por rol.
2. Crear un modelo de viajes y estados con persistencia, auditoría y controles de acceso.
3. Implementar asignación de conductores y ubicación en tiempo real con consentimiento.
4. Validar licencias, seguros, identidad y documentación mediante un proceso legítimo y revisado.
5. Implementar pagos únicamente en servidor, con webhooks verificados e idempotencia.
6. Definir soporte, cancelaciones, incidentes, privacidad, retención y borrado.
7. Realizar pruebas de accesibilidad, seguridad, carga y escenarios de error antes de cualquier piloto.

Consulta [el estado y los bloqueadores](docs/PROJECT_STATUS.md), la [política de seguridad](SECURITY.md) y la [guía de contribución](CONTRIBUTING.md).

## Desarrollo y contribuciones

```bash
npm ci
npm run check
```

Los pull requests deben describir el cambio y las pruebas ejecutadas. No incluyas secretos, documentos de identidad, ubicaciones privadas ni datos reales de pasajeros o conductores.

- [Código fuente](https://github.com/eddyflores100-lang/transporte-2026-oriente)
- [Incidencias y mejoras](https://github.com/eddyflores100-lang/transporte-2026-oriente/issues)
- [Pull requests](https://github.com/eddyflores100-lang/transporte-2026-oriente/pulls)
- [Versiones](https://github.com/eddyflores100-lang/transporte-2026-oriente/releases)

## Licencia

MIT. Consulta el archivo [LICENSE](LICENSE).

---

*OrienteGo es un prototipo de software independiente. No está afiliado a Uber, a proveedores cartográficos ni a autoridades de transporte.*
