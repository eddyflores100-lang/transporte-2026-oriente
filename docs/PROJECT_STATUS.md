# Estado del proyecto y límites de la demo

## Resumen

OrienteGo es actualmente un frontend React/Vite. El repositorio contiene pantallas de navegación, formularios, mapas y cálculos locales. No se encontró una API propia ni un servidor de pedidos en el manifiesto y los archivos principales revisados.

## Matriz de capacidades

| Capacidad | Estado observado |
|---|---|
| Navegación y pantallas de usuario | Implementadas en el frontend |
| Contexto de idioma (español, inglés, kichwa) | Presente |
| Mapa y geolocalización del navegador | Integración cliente |
| Búsqueda de direcciones | Consulta a Nominatim desde el cliente |
| Estimación de fletes | Cálculo local |
| Puntos fluviales y trazados | Datos ilustrativos en el cliente |
| Autenticación | Clerk SDK incluido; requiere configuración y validación |
| API propia de viajes | No localizada en esta revisión |
| Asignación real de conductores | No implementada/verificada |
| Pagos | Stripe.js está en dependencias; no hay backend de cobros |
| Verificación de conductores | No implementada/verificada |
| Emergencias y soporte operativo | No implementados como servicio real |
| Aplicaciones móviles nativas | Capacitor incluido; build nativo no verificado |

## Riesgos que deben cerrarse

- **Datos de demostración:** sustituir conductores, precios, matrículas y estados simulados por datos del servidor antes de presentar el producto como operativo.
- **Ubicación:** explicar el permiso, minimizar precisión y retención, y evitar registros innecesarios de coordenadas.
- **Geocodificación:** revisar los términos y límites de Nominatim; no usar el servicio público como backend de producción.
- **Pagos:** cualquier operación debe crearse y verificarse en servidor. Las claves secretas nunca pueden exponerse mediante variables `VITE_*`.
- **Seguridad:** implementar autorización por rol, validación de entradas, protección contra abuso, auditoría y gestión de incidentes.
- **Operación:** definir procesos reales de soporte, cancelación, verificación y respuesta ante incidentes antes de habilitar viajes.

## Criterios para declarar un piloto

- Backend desplegado con controles de acceso y pruebas automatizadas.
- Flujo de viaje de extremo a extremo con estados persistentes.
- Consentimiento y tratamiento de ubicación documentados.
- Procesos de conductor y vehículo revisados.
- Cobros y reembolsos probados en sandbox con webhooks verificados.
- Políticas de privacidad y soporte publicadas.
- Pruebas de seguridad, accesibilidad, carga y recuperación aprobadas.

No marcar una capacidad como operativa hasta que exista evidencia verificable y pruebas que la cubran.
