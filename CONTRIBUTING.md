# Contribuir a OrienteGo

Gracias por ayudar a mejorar el prototipo. Mantén los cambios pequeños, verificables y coherentes con el estado documentado del producto.

## Requisitos

- Node.js 22 o superior
- npm 10 o superior

## Verificación local

```bash
npm ci
npm run typecheck
npm run build
```

## Reglas para cambios

1. Describe el flujo o defecto que cambia.
2. Añade pruebas cuando incorpores lógica de negocio.
3. No introduzcas claves secretas ni datos reales de pasajeros o conductores.
4. Mantén las integraciones externas identificadas y documentadas.
5. No presentes estimaciones locales, mapas ilustrativos ni formularios como servicios operativos.
6. Actualiza `docs/PROJECT_STATUS.md` cuando cambie el alcance funcional.

## Checklist del pull request

- [ ] `npm ci` finaliza correctamente.
- [ ] `npm run typecheck` pasa.
- [ ] `npm run build` pasa.
- [ ] No se incluyen secretos ni datos personales.
- [ ] La documentación describe el comportamiento real.
