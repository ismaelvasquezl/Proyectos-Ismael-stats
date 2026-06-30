# Vitalae — Sitio Web

Sitio web profesional para Vitalae · Bienestar y Ciencia. Estático, mobile-first, optimizado para GitHub Pages.

## Archivos

- `index.html` — Sitio completo (HTML + CSS + JS en un solo archivo)
- `logo.jpg` — Logo de Vitalae (referenciado desde index.html)

## Despliegue en GitHub Pages

### Paso 1: Crear el repositorio

1. Entra a https://github.com y crea un repositorio nuevo
2. Nómbralo `vitalae` (o como prefieras). Hazlo público.
3. NO inicialices con README, .gitignore ni licencia (los agregas después)

### Paso 2: Subir los archivos

**Opción A — Por interfaz web (más simple):**

1. En tu repo recién creado, haz clic en "uploading an existing file"
2. Arrastra `index.html` y `logo.jpg` al área de carga
3. Escribe un commit message: "Initial site"
4. Haz clic en "Commit changes"

**Opción B — Por terminal (si tienes git):**

```bash
cd /ruta/donde/descargaste/los/archivos
git init
git add index.html logo.jpg
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/vitalae.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (engranaje arriba a la derecha)
3. En el menú lateral izquierdo, haz clic en **Pages**
4. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Haz clic en **Save**
6. Espera 1-2 minutos. Tu sitio estará disponible en:
   `https://TU-USUARIO.github.io/vitalae/`

### Paso 4 (opcional): Dominio personalizado

Si tienes un dominio propio (ej: `vitalae.cl`):

1. En **Settings → Pages**, escribe tu dominio en "Custom domain"
2. En el panel DNS de tu proveedor de dominio, crea un registro CNAME apuntando a `TU-USUARIO.github.io`
3. Espera la propagación DNS (10-60 minutos)

## Mantenimiento

### Para editar el sitio:

Edita el archivo `index.html` directamente desde GitHub (botón lápiz) o desde tu editor local. Cada vez que hagas commit, GitHub Pages publica los cambios en 1-2 minutos.

### Lugares clave que probablemente quieras editar:

- **Disclaimer del footer**: actualmente dice "Contenido educativo. No reemplaza consulta médica." — puedes agregar tu N° de Superintendencia de Salud
- **Link WhatsApp**: el link `https://walink.co/0y1pj6` aparece en múltiples botones. Si cambia, busca y reemplaza ese string
- **Instagram**: `https://www.instagram.com/vitalaeapp/` aparece en el footer y en los íconos sociales

## Conversión WhatsApp · cómo funciona

Cada CTA del sitio lleva a WhatsApp con un mensaje pre-armado distinto según el contexto:

- Botón hero / header / floating: link directo, sin mensaje
- Botón Medicina del Estilo de Vida: pre-llena "Hola, quiero agendar Medicina del Estilo de Vida"
- Botón Medicina Cannábica: pre-llena "Hola, quiero agendar Medicina Cannábica"
- Botón Medicina General: pre-llena "Hola, quiero agendar Medicina General"
- Botón Suscripción: pre-llena "Hola, me interesa la suscripción de Medicina Cannábica"
- Cuestionario (orientación inicial): pre-llena un mensaje según las respuestas del usuario

Esto te permite saber por qué te están escribiendo desde el primer mensaje, sin formularios ni fricciones.

## Cuestionario inicial · cómo se comporta

No es un modal obligatorio al entrar. Se dispara cuando el usuario hace clic en "Comenzar" en la sección "¿No sabes qué consulta te corresponde?". Esto fue una decisión deliberada — los modales de bienvenida tienen tasas de rebote del 40-60% en sitios de salud.

El flujo: 4 preguntas anónimas (género, edad, consumo previo de cannabis, forma de uso) → recomendación de servicio → CTA a WhatsApp con mensaje contextualizado.

## Soporte técnico

El sitio funciona sin dependencias de servidor. Si algún navegador antiguo presenta problemas:

- Chrome / Edge / Safari modernos: 100% soporte
- Firefox: 100% soporte
- Internet Explorer: no soportado (descontinuado)

Performance esperado en Lighthouse: 95-100 en Performance, Accessibility, Best Practices, SEO.
