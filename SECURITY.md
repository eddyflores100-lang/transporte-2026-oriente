# Política de seguridad

## Alcance

OrienteGo es un prototipo frontend. No almacena ni procesa viajes reales en un backend propio según el estado documentado de esta revisión. No introduzcas datos reales de pasajeros, conductores, documentos, pagos ni ubicaciones privadas en issues o pruebas.

## Reportar vulnerabilidades

Para reportar un problema de seguridad, utiliza la función privada **Report a vulnerability** de GitHub en la pestaña Security del repositorio. No publiques detalles explotables ni credenciales en una incidencia pública.

Incluye:
- archivo, ruta o commit afectado;
- impacto observado;
- pasos mínimos de reproducción con datos ficticios;
- versión y entorno.

## Reglas básicas

- Nunca commits claves secretas, tokens ni credenciales.
- Las claves secretas de Clerk/Stripe deben permanecer en servidor; las variables `VITE_*` son públicas.
- No registres coordenadas precisas, documentos ni información de contacto en logs.
- Trata los servicios de mapas y geocodificación como proveedores externos sujetos a sus términos.
- No habilites viajes, cobros o emergencias reales sin backend, procesos y controles revisados.

No se promete un SLA de respuesta para este prototipo.
