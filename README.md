# Vitalae — Sitio Web (Versión 2)

Sitio web profesional para Vitalae · Bienestar y Ciencia. Estático, mobile-first, optimizado para GitHub Pages.

## Archivos

- `index.html` — Sitio completo
- `logo.jpg` — Logo de Vitalae
- `apps-script.gs` — Código para conectar con Google Sheets (ver más abajo)

---

## Novedades en esta versión

1. **Popup automático al ingresar al sitio** — Aparece 2 segundos después de cargar, con animación de entrada elegante (blur, scale, logo animado). No aparece de nuevo por 7 días si el usuario ya lo cerró.

2. **Contador de visitas con "coin"** — Esquina inferior izquierda. Logo circular con anillo dashed animado + contador dinámico. Usa el servicio counterapi.com (gratuito, sin registro, sin problemas de CORS).

3. **Guardado de respuestas del cuestionario en Google Sheets** — Cada respuesta del quiz se guarda automáticamente en tu hoja de cálculo. Requiere configurar Google Apps Script (ver instrucciones abajo).

4. **Optimizaciones aplicadas al sitio completo:**
   - Eliminada dependencia de GSAP (~90KB ahorrados)
   - Preload del logo para mostrar instantáneo
   - Schema.org JSON-LD para SEO (Google entiende que eres organización médica)
   - Meta tags completos (Open Graph, Twitter Cards, keywords)
   - Focus visible mejorado para accesibilidad
   - Cierre del popup con tecla ESC
   - Cierre del menú móvil al hacer clic en un link
   - Passive event listeners para mejor scroll performance
   - Preconnect a los servicios externos (fonts, counter, apps script)

---

## PASO 1: Conectar con Google Sheets

### 1.1 — Abrir Apps Script en tu hoja de cálculo

1. Abre tu Google Sheet: https://docs.google.com/spreadsheets/d/1CvDz8odzYO9t4-dRMjMcvqw41LfTZlJ0-6PnzJ51Vps/edit
2. En el menú superior: **Extensiones → Apps Script**
3. Se abrirá una pestaña nueva con un editor de código
4. Borra todo el código que aparece por defecto (habrá algo como `function myFunction() {}`)
5. Copia TODO el contenido del archivo `apps-script.gs` y pégalo dentro del editor
6. Haz clic en el ícono de **guardar** (💾) o Ctrl+S

### 1.2 — Desplegar como Web App

1. Arriba a la derecha, haz clic en **Desplegar** → **Nueva implementación**
2. Junto a "Seleccionar tipo" haz clic en el ícono de engranaje ⚙️ y elige **Aplicación web**
3. Rellena así:
   - **Descripción:** Vitalae quiz endpoint
   - **Ejecutar como:** Yo (tu-email@gmail.com)
   - **Quién tiene acceso:** ⚠️ **Cualquier persona** (importante — sin este permiso el sitio no puede enviar datos)
4. Haz clic en **Desplegar**

### 1.3 — Autorizar permisos

Google te va a pedir autorizar el script para acceder a tu hoja. Es normal:

1. Elige tu cuenta de Google
2. Verás una pantalla que dice "Google no verificó esta app"
3. Haz clic en **Configuración avanzada** (abajo a la izquierda)
4. Haz clic en **Ir a Vitalae quiz endpoint (no seguro)**
5. Haz clic en **Permitir**

### 1.4 — Copiar la URL de despliegue

Google te mostrará una pantalla con la URL de tu Web App. Tiene esta forma:

```
https://script.google.com/macros/s/AKfyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec
```

Cópiala completa.

### 1.5 — Configurar el sitio

1. Abre `index.html` en un editor de texto
2. Busca la línea (aproximadamente la línea 3010):
   ```javascript
   SHEETS_WEBAPP_URL: 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL',
   ```
3. Reemplaza `'REPLACE_WITH_YOUR_APPS_SCRIPT_URL'` por tu URL, quedando así:
   ```javascript
   SHEETS_WEBAPP_URL: 'https://script.google.com/macros/s/AKfy...tu-url.../exec',
   ```
4. Guarda el archivo

### 1.6 — Verificar que funciona

Después de subir el sitio a GitHub Pages:

1. Abre tu sitio en un navegador (con las herramientas de desarrollo abiertas, opcional)
2. Completa el cuestionario del popup
3. Revisa tu Google Sheet — debería aparecer una fila nueva con "Fecha, Hora, Género, Edad, ..." como encabezados y tu respuesta debajo
4. La hoja se llama "Respuestas" (se crea automáticamente la primera vez)

**¿No funciona?** Verifica:
- Que la URL de Apps Script esté correctamente pegada (que termine en `/exec`)
- Que hayas elegido "Cualquier persona" en "Quién tiene acceso"
- Que hayas autorizado los permisos completos

---

## PASO 2: Contador de visitas

**No requiere configuración.** Ya está funcionando con counterapi.com:

- **Servicio:** counterapi.com (gratuito, sin registro, sin límites prácticos)
- **Namespace:** `vitalae.cl`
- **Métrica:** `view/homepage`
- **Deduplicación:** una sola visita contada por sesión (usa sessionStorage)
- **Fallback:** si el servicio falla, muestra "—" en lugar de romper el diseño

Si algún día quieres ver las estadísticas completas (visitas por día, por hora), puedes acceder a:
`https://counterapi.com/vitalae.cl/view/homepage`

Si prefieres cambiar el servicio a algo más profesional (Google Analytics, Plausible, Fathom), avísame y lo integro.

---

## PASO 3: Despliegue en GitHub Pages

### 3.1 — Crear el repositorio

1. Ve a https://github.com y crea un repositorio nuevo
2. Nómbralo `vitalae` (o el nombre que prefieras)
3. Que sea **público**
4. NO inicialices con README, .gitignore ni licencia

### 3.2 — Subir los archivos

**Opción A (web):** En el repo, "uploading an existing file" → arrastra `index.html` y `logo.jpg` → commit.

**Opción B (terminal):**
```bash
cd /ruta/donde/estan/los/archivos
git init
git add index.html logo.jpg
git commit -m "Vitalae site v2"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/vitalae.git
git push -u origin main
```

### 3.3 — Activar GitHub Pages

1. En el repo → **Settings** (engranaje) → **Pages** (menú lateral)
2. En "Source": Branch **main** / Folder **/ (root)**
3. **Save**
4. Espera 1-2 minutos. Tu sitio estará en `https://TU-USUARIO.github.io/vitalae/`

### 3.4 (Opcional) — Dominio propio

Si tienes `vitalae.cl`:
1. En Settings → Pages → "Custom domain": escribe `vitalae.cl`
2. En tu proveedor DNS: registro CNAME apuntando a `TU-USUARIO.github.io`
3. Activa "Enforce HTTPS" una vez propague

---

## Auditoría técnica del sitio (v2)

Estas son las optimizaciones y decisiones técnicas que apliqué en esta versión:

### Performance
- Eliminación total de librerías no usadas (GSAP ~90KB)
- Preload del logo con `fetchpriority="high"`
- Preconnect a `fonts.googleapis.com`, `counterapi.com`, `script.google.com`
- Passive event listeners para scroll (mejor FPS)
- Sin dependencias JavaScript externas (todo en el mismo archivo)

### SEO
- JSON-LD schema.org para MedicalBusiness (Google entiende que eres organización médica)
- Meta tags completos: title, description, keywords, author, robots
- Open Graph completo (link previews en WhatsApp, Instagram, Facebook)
- Twitter Cards
- Idioma es_CL declarado
- Meta viewport para móvil

### Accesibilidad (a11y)
- Focus visible con outline verde primario en todos los elementos interactivos
- aria-live en el contador de visitas (screen readers anuncian cambios)
- Botón de cerrar el popup con aria-label
- Cierre del popup con tecla ESC
- Estructura semántica correcta (main, section, footer, nav)
- Contraste de color verificado
- prefers-reduced-motion respetado

### UX
- El popup NO se muestra a usuarios que ya lo cerraron (cooldown de 7 días vía localStorage)
- El contador de visitas cuenta una sola vez por sesión (sessionStorage)
- Animación del número (0 → valor final con easeOut) al aparecer el contador
- El popup se puede cerrar con ESC, con la X, o haciendo clic afuera
- El menú móvil se cierra automáticamente al hacer clic en un link
- Fallback silencioso en cada llamada externa (nunca se rompe la UI)

### Robustez
- Try-catch alrededor de todas las llamadas a localStorage/sessionStorage (por si el usuario los tiene bloqueados)
- Timeout de 5 segundos en el contador (si el servicio no responde, muestra "—")
- Callback name único con timestamp en el JSONP (evita conflictos)
- Cleanup del script de JSONP después de usarlo
- El envío a Google Sheets es "fire and forget" — no bloquea la UI del usuario si falla

---

## Datos que se guardan en Google Sheets

Cada respuesta del cuestionario genera una fila con:

| Columna | Valor de ejemplo |
|---------|-----------------|
| Fecha | 2026-07-01 |
| Hora | 15:32:41 |
| Género | Femenino |
| Edad | Entre 25 y 64 años |
| Usa cannabis | Sí |
| Forma de uso | Vaporización |
| Referrer | https://instagram.com |
| User Agent | Mozilla/5.0 (iPhone; ...) |

**No se guardan:** IPs, nombres, emails, teléfonos, ni identificadores personales. El cuestionario es 100% anónimo tal como se promete al usuario en el popup.

---

## Mantenimiento y cambios comunes

### Cambiar el link de WhatsApp

Busca todas las apariciones de `walink.co/0y1pj6` en `index.html` y reemplaza.

### Cambiar el delay del popup inicial

En el bloque CONFIG del script, línea `POPUP_DELAY: 2200` (milisegundos). 2200 = 2.2 segundos.

### Cambiar la frecuencia de reaparición del popup

`POPUP_COOLDOWN_DAYS: 7` — si el usuario cierra el popup, no vuelve a aparecer por 7 días. Si lo quieres siempre visible, cambia a `0`.

### Ocultar el contador de visitas

En el CSS busca `.visits-coin {` y agrega `display: none !important;` como primera línea.

### Ver las respuestas del quiz en tiempo real

Solo abre tu Google Sheet. Cada nueva respuesta aparece automáticamente como una fila nueva.

### Actualizar el Apps Script

Si cambias el código de `apps-script.gs`, necesitas:
1. Pegar el nuevo código en el editor de Apps Script
2. Desplegar → **Administrar implementaciones**
3. Editar la implementación existente (ícono lápiz)
4. En "Versión": elige "Nueva versión"
5. Desplegar

**Importante:** No hagas "Nueva implementación" (crea otra URL). Usa "Administrar implementaciones" para actualizar la existente y mantener la misma URL en tu sitio.
