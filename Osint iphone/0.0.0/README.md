# 🌍 Validador Internacional de Números Telefónicos

Aplicación web completa para la **validación y obtención de información de números telefónicos internacionales**, con autenticación de usuarios, sistema de saldo, niveles VIP y visualización geográfica en mapas interactivos.

---

## 📋 Descripción General

Esta plataforma permite validar números telefónicos de forma precisa utilizando múltiples APIs. Incluye funcionalidades avanzadas como:

- Autenticación de usuarios (VIP y regulares)
- Validaciones en tiempo real
- Visualización detallada del número (ubicación, operadora, tipo de línea, zona horaria, etc.)
- Mapas interactivos y diseño moderno
- Sistema de recarga automática y control de uso

---

## 🚀 Funcionalidades Principales

### 🔐 Sistema de Autenticación
- Registro de usuarios con validación de datos
- Inicio de sesión automático con **debounce**
- Gestión de perfiles: usuarios regulares y VIP
- Sistema de saldo:
  - Recarga automática cada 2 horas para usuarios regulares
  - Validaciones ilimitadas para usuarios VIP

### 📞 Validación de Números Telefónicos
- Validación en tiempo real de números internacionales
- Detección de:
  - Operadora
  - Tipo de línea
  - País, región, código postal y zona horaria
- Geolocalización aproximada del número
- Visualización en mapa interactivo usando **OpenStreetMap**

### 🎨 Interfaz de Usuario
- Diseño **responsive** y moderno
- Animaciones de partículas en el fondo
- Efectos de escritura para mostrar resultados
- Notificaciones del sistema
- Mapas interactivos

---

## 💡 Características Adicionales

- 🟢 **Sistema VIP**: Validaciones ilimitadas para usuarios con este rol
- 🔁 **Recarga automática**: Saldo para usuarios regulares cada 2 horas
- 📱 **Interfaz responsive**: Compatible con todos los dispositivos
- 🔄 **Fallbacks múltiples**: Si una API falla, se intenta con otra
- ⚡ **Caché inteligente**: Mejora el rendimiento en consultas repetidas

---

## 🔑 Tokens Requeridos

Para el funcionamiento completo de la aplicación, necesitas las siguientes claves API:

| API | Descripción | Registro |
|-----|-------------|----------|
| `API_URL` | API de usuarios (CRUD) | Personalizado |
| `NUMVERIFY_API_KEY` | Validación de números telefónicos | [NumVerify](https://numverify.com/) (plan gratuito disponible) |
| `ABSTRACT_API_KEY` | Información detallada del número | [Abstract API](https://www.abstractapi.com/) |
| `TIMEZONE_API_KEY` | Zona horaria del número | [TimeZoneDB](https://timezonedb.com/) |

---

## 📦 Instalación y Uso

```bash
# Clona el repositorio
git clone https://github.com/tu_usuario/validador-telefonico.git
cd validador-telefonico
```

# Instala las dependencias
npm install

# Crea un archivo .env con tus claves
cp .env.example .env

# Inicia el servidor
npm start



<img width="494" height="398" alt="image" src="https://github.com/user-attachments/assets/a1a734b4-1156-4ee6-aeb2-285d93bd5095" />
