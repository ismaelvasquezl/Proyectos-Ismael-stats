# Vitalae — Sitio Web (v2.1)

Sitio web profesional para Vitalae · Bienestar y Ciencia. Estático, mobile-first, listo para GitHub Pages.

## Archivos

- `index.html` — Sitio completo
- `logo.jpg` — Logo de Vitalae
- `apps-script.gs` — Backend en Google Apps Script (contador + guardado del quiz en Sheets)

---

## Correcciones de esta versión (v2.1)

### 1. La "pelota que gira" ya no acelera en desktop
El keyframe se llamaba `rotate`, colisionando con la nueva propiedad CSS `rotate` estandarizada. Además, 40 segundos era demasiado rápido para el radio grande del hero en desktop. Ahora:
- Keyframe renombrado a `heroOrbitRotate` (sin colisiones)
- Duración duplicada a **80 segundos** (efecto contemplativo real)
- Agregado `will-change: transform` para performance

### 2. El contador de visitas ahora sí cuenta
El problema: el servicio externo `counterapi.com` era poco confiable (soft-limits, JSONP intermitente). **Solución:** ahora el contador vive en tu propio Google Apps Script — el mismo que guarda las respuestas del quiz. Ventajas:
- Sin dependencias externas
- Sin CORS (Apps Script sirve JSONP nativo)
- Puedes ver el histórico en la hoja "Contador" de tu Sheet
- Datos 100% tuyos

### 3. Las respuestas del quiz ahora sí se guardan
El problema original: la URL del Apps Script no estaba pegada (el placeholder `REPLACE_WITH_YOUR_APPS_SCRIPT_URL` seguía intacto). Además, agregué **doble estrategia** para robustez:
- **POST** al Apps Script (rápido, silencioso)
- **JSONP fallback** en paralelo (confirmable, evita cualquier issue de CORS)

Si POST falla por CORS en algún navegador, el JSONP siempre funciona. Además, ahora hay confirmación visual "✓ Respuestas guardadas" en el modal al terminar.

---

## Configuración (paso a paso — ~5 minutos)

### Paso 1: Instalar el Apps Script

1. Abre tu Google Sheet:
   https://docs.google.com/spreadsheets/d/1CvDz8odzYO9t4-dRMjMcvqw41LfTZlJ0-6PnzJ51Vps/edit

2. Menú → **Extensiones → Apps Script**

3. Se abre editor. Borra todo el código que aparece.

4. Copia **todo** el contenido de `apps-script.gs` y pégalo.

5. Ctrl+S para guardar (te pedirá nombre → ponle "Vitalae").

### Paso 2: Desplegar como Web App

1. Arriba a la derecha: **Desplegar → Nueva implementación**

2. Ícono ⚙️ junto a "Seleccionar tipo" → **Aplicación web**

3. Configura:
   - **Descripción:** Vitalae endpoint
   - **Ejecutar como:** Yo (tu-email@gmail.com)
   - **Quién tiene acceso:** ⚠️ **Cualquier persona** ← paso crítico

4. **Desplegar**

5. Autorizar permisos:
   - Elegir tu cuenta
   - "Google no verificó esta app" → **Configuración avanzada** (abajo izquierda)
   - **Ir a Vitalae (no seguro)**
   - **Permitir**

6. Copia la URL que termina en `/exec`. Se ve así:
   `https://script.google.com/macros/s/AKfycbz...largo.../exec`

### Paso 3: Verificar que el endpoint funciona

Antes de configurar el sitio, **pega la URL directamente en el navegador**. Debes ver algo como:

```json
{"status":"ok","service":"Vitalae endpoint","timestamp":"2026-07-01T...","actions":["visit","count","save"]}
```

Si ves esto, funciona. Si no, revisa que hayas elegido "Cualquier persona" en el paso 2.

### Paso 4: Configurar el sitio

Abre `index.html` en un editor. Busca:

```javascript
APPS_SCRIPT_URL: 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL',
```

Reemplaza por:

```javascript
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfy.../exec',
```

Guarda y sube el `index.html` a GitHub.

### Paso 5: Probar en el sitio real

1. Abre tu sitio publicado en un navegador
2. Deberías ver el contador de visitas animarse (esquina inferior izquierda)
3. Completa el quiz que aparece
4. Ve a tu Google Sheet — deberías ver dos hojas nuevas:
   - **Contador** con "Visitas totales" incrementándose
   - **Respuestas** con tu respuesta del quiz

---

## Diagnóstico si algo no funciona

Si algo se ve mal, puedes habilitar el modo debug. Edita `index.html` y cambia:

```javascript
DEBUG: false
```

Por:

```javascript
DEBUG: true
```

Abre el sitio, abre las **herramientas de desarrollo** (F12) → **Console**. Verás mensajes de diagnóstico detallados.

### Contador muestra "—"
Significa que el Apps Script no respondió a tiempo (8 segundos). Causas:
- URL mal pegada (que empiece con `https://script.google.com/macros/s/` y termine en `/exec`)
- No configuraste "Cualquier persona" en el despliegue
- El script está aún propagándose (espera 1-2 minutos tras desplegar)

### Respuestas del quiz no aparecen en Sheets
- Verifica en Console de tu navegador que no diga "Apps Script URL no configurada"
- Abre la URL del Web App directamente — si ves el JSON de status, funciona
- Revisa que la hoja "Respuestas" no la hayas renombrado
- Espera unos segundos y refresca el Sheet — Google a veces demora en mostrar filas nuevas

### El popup no aparece en tu segunda visita
Es intencional. El popup respeta al usuario: solo aparece una vez cada 7 días (localStorage). Para forzarlo:
- Modo incógnito, o
- Abre DevTools → Application → Local Storage → borra `vitalae_popup_seen`

---

## Despliegue en GitHub Pages

1. Crea repo público `vitalae` en GitHub
2. Sube `index.html` y `logo.jpg` (no subas `apps-script.gs` — ese vive en tu Sheet)
3. Settings → Pages → Branch main → root → Save
4. Espera 1-2 minutos → sitio en `https://TU-USUARIO.github.io/vitalae/`

## Actualizar el Apps Script sin cambiar la URL

Si algún día tocas el código de `apps-script.gs`:

1. Pega el nuevo código en el editor de Apps Script
2. **Desplegar → Administrar implementaciones** (no "Nueva implementación")
3. Ícono lápiz en tu implementación existente
4. Versión → **Nueva versión**
5. Desplegar

Así mantienes la misma URL y no tienes que actualizar el sitio.
