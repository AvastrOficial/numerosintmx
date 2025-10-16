# numerosintmx - Validador de Números Telefónicos con Datos Geográficos 

Este proyecto es un **validador de números telefónicos** que utiliza la API junto con otras fuentes como **OpenStreetMap** y **TimeZoneDB** para obtener información detallada sobre un número ingresado.

WEB : 
https://numerosintmx.foroactivo.com
---

## 🚀 ¿Qué es?

Un script en JavaScript que:
- Valida si un número telefónico es válido.
- Obtiene detalles como país, código de país, formato internacional/local, operador, tipo de línea y si fue portado.
- Si faltan datos geográficos clave, realiza consultas a otras APIs para obtener la ubicación precisa y zona horaria.

---

## 🔧 ¿Cómo funciona?

1. El usuario ingresa un número telefónico (incluyendo el código del país).
2. Se realiza una solicitud a la API de para validar y obtener datos del número.
3. Si no se obtiene información como timezone, código de región o código postal:
   - Se consulta a OpenStreetMap (Nominatim) para geolocalizar la ciudad basada en el nombre de la ubicación y país.
   - Luego se consulta a TimeZoneDB con las coordenadas obtenidas para obtener la zona horaria.
4. Se muestra en pantalla toda la información disponible.

---

## 🛠️ Tecnologías utilizadas

- **JavaScript** (puro, sin frameworks)
- **XMLHttpRequest** para llamadas AJAX.
- **OpenStreetMap Nominatim API** – para geocodificación.
- **TimeZoneDB API** – para obtener la zona horaria desde coordenadas geográficas.

---

## 📌 ¿Para qué sirve?

- Verificar la validez y detalles técnicos de un número telefónico.
- Obtener ubicación geográfica detallada y timezone incluso si la API principal no la proporciona.
- Es útil para aplicaciones de:
  - Registro de usuarios con validación telefónica.
  - Sistemas de CRM y soporte técnico.
  - Monitoreo y análisis geográfico de usuarios.

---
<table> <tr> <td align="center"> <a href="https://github.com/AvastrOficial/numerosintmx/graphs/contributors"> <img src="https://contrib.rocks/image?repo=AvastrOficial/numerosintmx" /> </a> </td> </tr> </table>

## 🎨 Diseño y Colores

### Paleta de Colores
![Paleta de Colores](https://github.com/user-attachments/assets/f93d8181-ce8f-4a43-bd55-55fc00e8492c)

### Capturas de Pantalla

#### Vista de Escritorio
![Diseño Desktop](https://github.com/user-attachments/assets/bbbea7dc-f8ee-455d-b0fd-f573b659a282)

#### Vista Móvil
![Diseño Mobile](https://github.com/user-attachments/assets/92a551c5-8c64-4568-af71-ad12244982d8)

