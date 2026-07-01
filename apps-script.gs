/**
 * VITALAE — Google Apps Script para guardar respuestas del cuestionario en Google Sheets
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 *
 * 1. Abre tu Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1CvDz8odzYO9t4-dRMjMcvqw41LfTZlJ0-6PnzJ51Vps/edit
 *
 * 2. Ve al menú: Extensiones → Apps Script
 *
 * 3. Borra todo el código que aparece por defecto (function myFunction() {})
 *
 * 4. Pega TODO este archivo dentro
 *
 * 5. Haz clic en el ícono de guardar (💾)
 *
 * 6. Haz clic en "Desplegar" (arriba derecha) → "Nueva implementación"
 *
 * 7. En "Seleccionar tipo" (ícono engranaje ⚙️) elige "Aplicación web"
 *
 * 8. Configura así:
 *    - Descripción: "Vitalae quiz responses"
 *    - Ejecutar como: "Yo (tu email)"
 *    - Quién tiene acceso: "Cualquier persona"  ← IMPORTANTE
 *
 * 9. Haz clic en "Desplegar"
 *
 * 10. Autoriza los permisos cuando Google te lo pida
 *     (te va a decir "Google no verificó esta app" → clic en "Configuración avanzada"
 *      → "Ir a Vitalae quiz (no seguro)" → Permitir)
 *
 * 11. Copia la URL que Google te muestra (termina en /exec)
 *
 * 12. Abre tu index.html del sitio y busca esta línea:
 *     SHEETS_WEBAPP_URL: 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL',
 *
 *     Reemplaza 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL' por la URL que copiaste.
 *
 * 13. Guarda index.html y súbelo a GitHub. Listo.
 *
 * NOTA: Si algún día necesitas actualizar este código, tienes que hacer
 * "Nueva implementación" nuevamente y actualizar la URL en el sitio.
 */

// ============================
// CONFIGURACIÓN
// ============================
const SHEET_NAME = 'Respuestas'; // Nombre de la hoja donde guardar los datos

// ============================
// FUNCIÓN PRINCIPAL
// ============================
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create sheet with headers if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Fecha',
        'Hora',
        'Género',
        'Edad',
        'Usa cannabis',
        'Forma de uso',
        'Referrer',
        'User Agent'
      ]);
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#2D5F4F');
      headerRange.setFontColor('#FFFFFF');
      sheet.setFrozenRows(1);
      // Set column widths
      sheet.setColumnWidth(1, 100);
      sheet.setColumnWidth(2, 80);
      sheet.setColumnWidth(3, 150);
      sheet.setColumnWidth(4, 120);
      sheet.setColumnWidth(5, 120);
      sheet.setColumnWidth(6, 180);
      sheet.setColumnWidth(7, 200);
      sheet.setColumnWidth(8, 300);
    }

    // Parse timestamp
    const timestamp = new Date(data.timestamp || new Date());
    const fecha = Utilities.formatDate(timestamp, 'America/Santiago', 'yyyy-MM-dd');
    const hora = Utilities.formatDate(timestamp, 'America/Santiago', 'HH:mm:ss');

    // Map values to human-readable Spanish
    const generoMap = {
      'femenino': 'Femenino',
      'masculino': 'Masculino',
      'no-binario': 'No binario',
      'prefiero-no-decir': 'Prefiero no decirlo'
    };
    const edadMap = {
      '18-24': 'Entre 18 y 24 años',
      '25-64': 'Entre 25 y 64 años',
      '65+': '65 años o más'
    };
    const usaMap = {
      'si': 'Sí',
      'no': 'No'
    };
    const formaMap = {
      'alimento': 'Alimento (oral)',
      'vaporizada': 'Vaporización',
      'combustion': 'Combustión'
    };

    // Append the response row
    sheet.appendRow([
      fecha,
      hora,
      generoMap[data.genero] || data.genero || '',
      edadMap[data.edad] || data.edad || '',
      usaMap[data.usa_cannabis] || data.usa_cannabis || '',
      formaMap[data.forma_uso] || data.forma_uso || '',
      data.referrer || '',
      data.user_agent || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================
// FUNCIÓN GET (para verificar que el Web App funciona)
// ============================
// Puedes abrir la URL del Web App en el navegador y debe mostrar:
// { "status": "ok", "service": "Vitalae Quiz Endpoint" }
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      service: 'Vitalae Quiz Endpoint',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================
// FUNCIÓN DE TEST (opcional)
// ============================
// Ejecuta esta función desde el editor de Apps Script para probar la conexión.
// En el menú de Apps Script, selecciona 'testSave' y haz clic en el botón ▶ Ejecutar.
// Debería crear una fila de prueba en tu hoja.
function testSave() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        genero: 'femenino',
        edad: '25-64',
        usa_cannabis: 'no',
        forma_uso: '',
        referrer: 'test',
        user_agent: 'Apps Script Test'
      })
    }
  };
  const result = doPost(testData);
  Logger.log(result.getContent());
}
