# 📞 Numerosintmx - 0.0.1

Un sistema completo en JavaScript para la **validación, análisis y geolocalización de números telefónicos**, con autenticación de usuarios, interfaz visual moderna y múltiples integraciones API.

---

## 📋 Descripción General

Este sistema permite:

- Validar números telefónicos con APIs externas.
- Geolocalizar mediante coordenadas.
- Gestionar usuarios (login, sesiones, VIP, saldo).
- Visualizar resultados con animaciones, mapas y más.

---

## 🏗️ Arquitectura del Sistema

| Módulo               | Descripción                                                                 |
|----------------------|------------------------------------------------------------------------------|
| 🔐 Autenticación      | Login y registro de usuarios con gestión de sesiones y estado VIP/saldo.    |
| ☎️ Validación         | Análisis multi-API para obtener operador, tipo de línea, país, etc.         |
| 👤 Gestión de Usuarios| Control de saldo, bloqueo y sesión persistente.                             |
| 🌐 Geolocalización    | Mapas interactivos, coordenadas, zona horaria.                              |
| 🎨 Interfaz Visual    | Animaciones, partículas, notificaciones y diseño responsive.                |
| 🧹 Cache              | Limpieza de sesión y redirección automática.                                |

---

## 🔐 APIs Utilizadas

### 📞 Validación de Teléfonos

| API             | Endpoint                                                              | Clave/API Key                                | Funcionalidad                              |
|------------------|----------------------------------------------------------------------|-----------------------------------------------|---------------------------------------------|
| NumVerify        | `http://apilayer.net/api/validate`                                   | `4EKi89ZLwTxCfdkGBHTl8tGjNtALtW4j`             | Validación básica, operador, línea          |
| Abstract API     | `https://phonevalidation.abstractapi.com/v1/`                        | `C762832226674914B8D6AF350B519392`            | Información extendida del número            |

### 🌍 Geolocalización

| API               | Endpoint                                                                 | Funcionalidad                        |
|--------------------|--------------------------------------------------------------------------|--------------------------------------|
| OpenStreetMap      | `https://nominatim.openstreetmap.org/reverse`                           | Geocodificación inversa              |
| BigDataCloud       | `https://api.bigdatacloud.net/data/reverse-geocode-client`              | Localización alternativa             |
| TimezoneDB         | `https://api.timezonedb.com/v2.1/get-time-zone`                         | Zona horaria                         |

### ⚙️ Soporte

| API     | Endpoint                                                                                    | Funcionalidad                      |
|----------|--------------------------------------------------------------------------------------------|------------------------------------|
| MockAPI  | `https://mockapi.io/`                                                                      | Base de datos de usuarios          |
| IPify    | `https://api.ipify.org?format=json`                                                        | Obtención de IP del usuario        |

---

## 🎯 Lógica Principal

```plaintext
1. Captura y limpieza del número
2. Verificación de sesión y saldo
3. Validación primaria (NumVerify)
4. Validación secundaria (Abstract API)
5. Geolocalización (coordenadas, zona horaria, mapa)
6. Renderización visual con animaciones
```

## 🗂️ Estructura de Datos
📄 Objeto de Teléfono
```javascript
{
  numero: "string",
  numeroLimpio: "string",
  valido: boolean,
  tipo: "string",
  pais: "string",
  operador: "string",
  region: "string",
  zonaHoraria: "string",
  codigoPostal: "string",
  lat: number,
  lon: number
}
```

## 👤 Objeto de Usuario
```javascript
{
  id: "string",
  username: "string",
  password: "string",
  ip: "string",
  fecha_registro: "string",
  dia: number,
  saldo: number,
  bloqueado_hasta: null,
  vip: number
}
```

## 🎨 Características de la Interfaz

- 🌌 Partículas	Fondo animado con partículas
- ✍️ Efectos	Animación de escritura para los resultados
- 🔔 Notificaciones	Toasts para errores, éxito, etc.
- 🗺️ Mapas	Leaflet + OpenStreetMap para geolocalización
- 📱 Responsive	Sidebar colapsable, diseño adaptable, touch-friendly
- 💫 Transiciones	Hover, focus, carga, modales y animaciones CSS
- 🔧 Funcionalidades Especiales : 🇲🇽 Para México

## 🗺️ Detección por código de área.
**Identificación de operador (Telcel, Movistar, AT&T, Unefon).
**Mapeo de coordenadas por municipio.
**Zona horaria por estado.

## 👥 Sistema de Usuarios
- Tipo Usuario	Características
- Regular	5 validaciones por sesión
- VIP	Validaciones ilimitadas
- Auto-login	Detección automática de sesión previa
- localStorage	Gestión de sesión y persistencia local

## 🛡️ Seguridad y Manejo de Errores
- 🧹 Limpieza Cache	Al cerrar sesión
- 🔒 Validación	Sanitización de entradas, protección contra inyección
- 🔁 Fallback	Entre APIs en caso de error
- ❗ Manejo Errores	Mensajes claros, reintentos y estados de carga
- 📱 Responsive Design

## 🔧 Diseño adaptable a móviles y tablets.
**Navegación touch-friendly.
**Sidebar colapsable.
**Layout flexible con CSS Grid/Flexbox.

## 🚀 Instalación y Configuración

- Navegador moderno con soporte para:
- JavaScript ES6+
- fetch API
- localStorage
- CSS Grid/Flexbox

---

## ⚙️ Configuración de APIs
**const API_URL = "https://mockapi.io/";
**const TIMEZONE_API_KEY = "Token";

## 🔄 Flujo de Trabajo
1. Inicialización
   - Carga de partículas
   - Verificación de sesión
   - Pre-carga de dependencias

2. Autenticación
   - Detección automática de credenciales
   - Validación con MockAPI

3. Validación
   - Captura y limpieza de número
   - Llamadas multi-API
   - Procesamiento de datos

4. Presentación
   - Resultados formateados
   - Generación de mapa interactivo
   - Animaciones

5. Gestión de Estado
   - Actualización de saldo
   - Persistencia
   - Limpieza

---

## 📊 Características Técnicas
- ⚡ Performance	Lazy loading, debounce en inputs, pre-carga y cache de coordenadas
- 🌐 Compatibilidad	Soporte para navegadores modernos, fallbacks para APIs, degradación elegante
- 🐛 Solución de Problemas

## 🔧Problema	Solución
- APIs no responden	Fallback automático entre servicios
- Sin coordenadas	Uso de ubicación por defecto del país
- Sin saldo	Alerta para recargar o solicitar acceso VIP
- Error en mapa	Mostrar información alternativa sin mapa

---

### 💡 Nota: Este sistema es adaptable y puede extenderse con nuevas APIs o integraciones.
