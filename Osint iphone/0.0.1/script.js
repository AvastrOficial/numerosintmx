       // ==================== CONFIGURACIÓN INICIAL ====================
        const API_URL = "Token";
        const TIMEZONE_API_KEY = "Token";
        
        document.addEventListener('DOMContentLoaded', function() {
            const cerrarSesionBtn = document.getElementById('cerrarSesion');
            
            if (cerrarSesionBtn) {
                cerrarSesionBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Mostrar confirmación al usuario
                    const confirmar = confirm('¿Estás seguro de que deseas cerrar sesión?');
                    
                    if (confirmar) {
                        limpiarCacheYRedirigir();
                    }
                });
            }
        });

        function limpiarCacheYRedirigir() {
            try {
                // Intentar limpiar la caché usando Service Workers
                if ('caches' in window) {
                    caches.keys().then(function(names) {
                        names.forEach(function(name) {
                            caches.delete(name);
                        });
                        console.log('Caché limpiada exitosamente');
                    }).catch(function(error) {
                        console.log('Error al limpiar caché:', error);
                    });
                }

                // Limpiar localStorage y sessionStorage
                localStorage.clear();
                sessionStorage.clear();
                
                // Limpiar cookies (función auxiliar)
                limpiarCookies();
                
                // Forzar recarga sin caché y redirigir
                setTimeout(function() {
                    const urlDestino = 'https://numerosintmx.foroactivo.com/';
                    
                    // Intentar redirección con parámetros para evitar caché
                    const timestamp = new Date().getTime();
                    window.location.href = urlDestino + '?nocache=' + timestamp;
                    
                }, 1000);
                
            } catch (error) {
                console.error('Error durante la limpieza:', error);
                // Redirigir incluso si hay error
                window.location.href = 'https://numerosintmx.foroactivo.com/';
            }
        }

        function limpiarCookies() {
            try {
                // Obtener todas las cookies
                const cookies = document.cookie.split(';');
                
                // Eliminar cada cookie
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i];
                    const eqPos = cookie.indexOf('=');
                    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
                    
                    // Establecer fecha de expiración en el pasado
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                }
            } catch (error) {
                console.log('Error al limpiar cookies:', error);
            }
        }

        // Función alternativa para forzar recarga sin caché
        function forzarRecargaSinCache() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (let registration of registrations) {
                        registration.unregister();
                    }
                });
            }
            
            // Método alternativo usando location.replace
            window.location.replace('https://numerosintmx.foroactivo.com/?' + new Date().getTime());
        }
        
        // ==================== ANIMACIONES Y EFECTOS ====================
        
        // Crear partículas para el fondo
        function crearParticulas() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamaño aleatorio
                const size = Math.random() * 5 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Posición inicial aleatoria
                particle.style.left = `${Math.random() * 100}vw`;
                
                // Duración de animación aleatoria
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Retraso aleatorio
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Efecto de escritura para el resultado
        function escribirResultado(texto, elemento, velocidad = 20) {
            elemento.innerHTML = '';
            let i = 0;
            
            function escribirCaracter() {
                if (i < texto.length) {
                    elemento.innerHTML += texto.charAt(i);
                    i++;
                    setTimeout(escribirCaracter, velocidad);
                }
            }
            
            escribirCaracter();
        }
        
        // Animación de carga para botones
        function animarBotonCarga(boton) {
            const textoOriginal = boton.innerHTML;
            boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
            boton.classList.add('loading');
            
            return () => {
                boton.innerHTML = textoOriginal;
                boton.classList.remove('loading');
            };
        }
        
        // ==================== FUNCIONES DE INTERFAZ ====================
        
        // Función para alternar la barra lateral
        function toggleSidebar() {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            sidebar.classList.toggle('active');
            
            if (sidebar.classList.contains('active')) {
                overlay.style.display = 'block';
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
            } else {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }
        }
        
        // Función para copiar el resultado al portapapeles
        function copiarResultado() {
            const resultado = document.getElementById("resultado");
            const textToCopy = resultado.textContent;
            
            if (textToCopy === "Esperando datos..." || !textToCopy.trim()) {
                mostrarNotificacion("No hay contenido para copiar", "warning");
                return;
            }
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                mostrarNotificacion("¡Copiado al portapapeles!");
            }).catch(err => {
                console.error('Error al copiar: ', err);
                fallbackCopyText(textToCopy);
            });
        }
        
        // Fallback para navegadores que no soportan la API del portapapeles
        function fallbackCopyText(text) {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    mostrarNotificacion("¡Copiado al portapapeles!");
                } else {
                    mostrarNotificacion("No se pudo copiar el texto", "error");
                }
            } catch (err) {
                console.error('Fallback error: ', err);
                mostrarNotificacion("No se pudo copiar el texto", "error");
            }
            
            document.body.removeChild(textArea);
        }
        
        // Función para mostrar notificaciones
        function mostrarNotificacion(mensaje, tipo = "success") {
            const notification = document.getElementById("copyNotification");
            
            // Cambiar color según el tipo
            if (tipo === "warning") {
                notification.style.background = "var(--warning)";
                notification.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${mensaje}`;
            } else if (tipo === "error") {
                notification.style.background = "var(--danger)";
                notification.innerHTML = `<i class="fas fa-times-circle"></i> ${mensaje}`;
            } else {
                notification.style.background = "var(--success)";
                notification.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje}`;
            }
            
            notification.classList.add("show");
            
            setTimeout(() => {
                notification.classList.remove("show");
            }, 3000);
        }
        
        // ==================== AUTENTICACIÓN Y USUARIO ====================
        
        // Función para auto-iniciar sesión
        function autoIniciarSesion() {
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');

            const debounce = (func, wait) => {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            };

            const intentarLogin = async () => {
                const username = usernameInput.value.trim();
                const password = passwordInput.value;

                if (username && password) {
                    await iniciarSesion();
                }
            };

            const intentarLoginDebounced = debounce(intentarLogin, 1000);

            usernameInput.addEventListener('input', intentarLoginDebounced);
            passwordInput.addEventListener('input', intentarLoginDebounced);
            
            passwordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    intentarLogin();
                }
            });
        }

        // Función para iniciar sesión
        async function iniciarSesion() {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;

            if (!username || !password) return;

            try {
                const res = await fetch(API_URL);
                const usuarios = await res.json();

                const user = usuarios.find(u =>
                    u.username.toLowerCase() === username.toLowerCase() &&
                    u.password === password
                );

                if (user) {
                    if (user.vip === 0) await verificarTiempoEspera(user);

                    localStorage.setItem('usuario', JSON.stringify(user));
                    document.getElementById('registroModal').style.display = 'none';
                    mostrarInfoUsuario(user);
                    mostrarNotificacion(`¡Bienvenido, ${user.username}!`);
                } else {
                    mostrarNotificacion("Usuario o contraseña incorrectos", "error");
                }
            } catch (error) {
                mostrarNotificacion("Error al conectar con el servidor", "error");
                console.error(error);
            }
        }

        // Función para verificar tiempo de espera (para usuarios no VIP)
        async function verificarTiempoEspera(user) {
            // Simulación de verificación de tiempo de espera
            return new Promise(resolve => setTimeout(resolve, 100));
        }

        // Mostrar información del usuario
        function mostrarInfoUsuario(user) {
            document.getElementById('nickname').textContent = user.username || 'Usuario';
            document.getElementById('saldo').textContent = user.vip === 1 ? 'INFINITO' : user.saldo;
        }

        // Limpiar información del usuario
        function limpiarInfoUsuario() {
            document.getElementById('nickname').textContent = 'Invitado';
            document.getElementById('saldo').textContent = '0';
        }

        // Función para cerrar sesión
        function cerrarSesion() {
            localStorage.removeItem('usuario');
            const modal = document.getElementById('registroModal');
            modal.style.display = 'flex';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            limpiarInfoUsuario();
            mostrarNotificacion("Sesión cerrada correctamente");
        }

        // ==================== GESTIÓN DE IP ====================
        
        // Función para obtener IP
        async function obtenerIP() {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                return data.ip || "0.0.0.0";
            } catch (error) {
                console.error("Error al obtener la IP:", error);
                return "0.0.0.0";
            }
        }

        // Función para alternar visibilidad de IP
        function toggleIp() {
            const ipElement = document.getElementById("ip");
            const buttonIcon = document.querySelector(".ip-btn i");

            if (ipElement.textContent === "***.***.*.**") {
                ipElement.textContent = ipElement.dataset.realip;
                buttonIcon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                ipElement.textContent = "***.***.*.**";
                buttonIcon.classList.replace("fa-eye-slash", "fa-eye");
            }
        }

        // Cargar IP al iniciar
        window.addEventListener("DOMContentLoaded", async () => {
            const ip = await obtenerIP();
            document.getElementById("ip").dataset.realip = ip;
            document.getElementById("ip").textContent = "***.***.*.**";
        }); 

        // ==================== VALIDACIÓN DE TELÉFONO ====================

        // Función principal de validación
        async function validar() {
            const numero = document.getElementById("numero").value.trim();
            const resultado = document.getElementById("resultado");
            const botonValidar = document.getElementById("validarBtn");
            
            // Animación de carga
            const restaurarBoton = animarBotonCarga(botonValidar);

            if (!numero) {
                resultado.textContent = "Por favor ingresa un número válido con código país, ejemplo +528341489238";
                restaurarBoton();
                return;
            }

            // Verificar si el usuario tiene saldo
            const usuarioGuardado = localStorage.getItem('usuario');
            if (!usuarioGuardado) {
                resultado.textContent = "Debes iniciar sesión para usar esta función.";
                restaurarBoton();
                return;
            }

            const user = JSON.parse(usuarioGuardado);
            if (user.vip === 0 && user.saldo <= 0) {
                resultado.textContent = "No tienes saldo suficiente. Recarga en 2 horas o adquiere VIP.";
                restaurarBoton();
                return;
            }

            // Intentar con múltiples APIs para obtener información
            try {
                const info = await obtenerInformacionTelefono(numero);
                mostrarResultado(info);
                
                // Restar saldo si no es VIP
                if (user.vip === 0) {
                    user.saldo -= 1;
                    await fetch(`${API_URL}/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ saldo: user.saldo })
                    });
                    mostrarInfoUsuario(user);
                }
            } catch (error) {
                resultado.textContent = `Error al obtener información: ${error.message}`;
            } finally {
                restaurarBoton();
            }
        }

        // Función para obtener información del teléfono usando API más confiable
        async function obtenerInformacionTelefono(numero) {
            // Limpiar y formatear número
            const numeroLimpio = numero.replace(/\s+/g, '').replace('+', '');
            
            // Información base
            const info = {
                numero: numero,
                numeroLimpio: numeroLimpio,
                valido: false,
                tipo: 'Desconocido',
                pais: 'Desconocido',
                operador: 'Desconocido',
                region: 'Desconocido',
                zonaHoraria: 'Desconocido',
                codigoPostal: 'No disponible',
                lat: null,
                lon: null
            };

            // Detectar país basado en código
            const codigoPais = detectarCodigoPais(numeroLimpio);
            if (codigoPais) {
                info.pais = obtenerNombrePais(codigoPais);
                info.valido = true;
                
                // Para números mexicanos, obtener información básica
                if (codigoPais === '52') {
                    const infoMexico = await obtenerInfoMexico(numeroLimpio);
                    Object.assign(info, infoMexico);
                }
                
                // Obtener coordenadas del país
                const coords = obtenerCoordenadasPorPais(info.pais);
                if (coords) {
                    info.lat = coords.lat;
                    info.lon = coords.lon;
                }
            }

            // Intentar con API más confiable para obtener información
            try {
                const apiInfo = await obtenerInfoDeAPINumVerify(numero);
                if (apiInfo && apiInfo.valido) {
                    // Combinar información de la API con nuestros datos
                    Object.assign(info, apiInfo);
                    console.log("Datos de API NumVerify:", apiInfo);
                }
            } catch (error) {
                console.log("Error con NumVerify, intentando con API alternativa...");
                // Intentar con API alternativa
                try {
                    const apiInfoAlt = await obtenerInfoDeAPIAbstract(numero);
                    if (apiInfoAlt && apiInfoAlt.valido) {
                        Object.assign(info, apiInfoAlt);
                        console.log("Datos de API Abstract:", apiInfoAlt);
                    }
                } catch (errorAlt) {
                    console.log("No se pudo obtener información de API externa");
                }
            }

            // Si tenemos coordenadas pero no código postal, intentar obtenerlo
            if (info.lat && info.lon && info.codigoPostal === 'No disponible') {
                try {
                    const ubicacionInfo = await obtenerCodigoPostalPorCoordenadas(info.lat, info.lon);
                    if (ubicacionInfo.codigoPostal && ubicacionInfo.codigoPostal !== 'No disponible') {
                        info.codigoPostal = ubicacionInfo.codigoPostal;
                        info.region = ubicacionInfo.region || info.region;
                        console.log("Código postal obtenido de ubicación:", ubicacionInfo.codigoPostal);
                    }
                } catch (error) {
                    console.log("No se pudo obtener código postal de la ubicación");
                }
            }

            return info;
        }

        // ==================== FUNCIONES AUXILIARES DE TELÉFONO ====================

        // Función para detectar código de país
        function detectarCodigoPais(numero) {
            const codigosPaises = {
               '52': 'MX'
            };
            
            for (const codigo in codigosPaises) {
                if (numero.startsWith(codigo)) {
                    return codigo;
                }
            }
            
            return null;
        }

        // Función para obtener nombre del país
        function obtenerNombrePais(codigo) {
            const paises = {
                '52': 'México'
            };
            
            return paises[codigo] || 'Desconocido';
        }

        // Función para obtener información específica de México (ahora async)
        async function obtenerInfoMexico(numero) {
            const numeroSinPais = numero.substring(2);
            const info = {
                tipo: 'Móvil',
                operador: 'Desconocido',
                region: 'Desconocido',
                zonaHoraria: 'America/Mexico_City',
                codigoPostal: 'No disponible',
                lat: null,
                lon: null
            };
            
            // Detectar tipo de línea
            if (numeroSinPais.length === 10) {
                const primerDigito = numeroSinPais.charAt(0);
                if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(primerDigito)) {
                    info.tipo = 'Móvil';
                }
            }
            
            // Detectar región en México
            const region = detectarRegionMexico(numeroSinPais);
            if (region) {
                info.region = region;
                
                // OBTENER COORDENADAS ESPECÍFICAS DE LA REGIÓN/MUNICIPIO
                const coords = obtenerCoordenadasPorRegion(region);
                if (coords) {
                    info.lat = coords.lat;
                    info.lon = coords.lon;
                    console.log(`Coordenadas encontradas para ${region}:`, coords);
                } else {
                    console.log(`No se encontraron coordenadas específicas para: ${region}`);
                }
                
                // Asignar zona horaria basada en la región
                if (region.includes('Baja California')) {
                    info.zonaHoraria = 'America/Tijuana';
                } else if (region.includes('Sonora') || region.includes('Sinaloa')) {
                    info.zonaHoraria = 'America/Hermosillo';
                } else if (region.includes('Chihuahua')) {
                    info.zonaHoraria = 'America/Chihuahua';
                } else {
                    info.zonaHoraria = 'America/Mexico_City';
                }
                
                // Intentar obtener código postal basado en la región
                try {
                    const cpInfo = await obtenerCodigoPostalPorRegion(region);
                    if (cpInfo && cpInfo.codigoPostal) {
                        info.codigoPostal = cpInfo.codigoPostal;
                    }
                } catch (error) {
                    console.log("No se pudo obtener código postal para la región:", region);
                }
            }
            
            // Detectar operador en México
            const operador = detectarOperadorMexico(numeroSinPais);
            if (operador) {
                info.operador = operador;
            }
            
            return info;
        }

        // Nueva función para obtener código postal por región
        async function obtenerCodigoPostalPorRegion(region) {
           // Mapeo de regiones a códigos postales aproximados
            const regionesCP = {
                'Ciudad de México': { 
                    codigoPostal: '01000-16999',
                    coordenadas: { lat: 19.4326, lon: -99.1332 }
                },
                'Estado de México': {
                    codigoPostal: '50000-57999',
                    coordenadas: { lat: 19.4969, lon: -99.7233 }
                },
                'Jalisco': {
                    codigoPostal: '44000-49999', 
                    coordenadas: { lat: 20.6597, lon: -103.3496 }
                },
                'Nuevo León': {
                    codigoPostal: '64000-67999',
                    coordenadas: { lat: 25.6866, lon: -100.3161 }
                },
                'Baja California': {
                    codigoPostal: '21000-22999',
                    coordenadas: { lat: 32.6245, lon: -115.4523 }
                },
                'Baja California Sur': {
                    codigoPostal: '23000-23999',
                    coordenadas: { lat: 24.1426, lon: -110.3128 }
                },
                'Sonora': {
                    codigoPostal: '83000-85999',
                    coordenadas: { lat: 29.0892, lon: -110.9619 }
                },
                'Sinaloa': {
                    codigoPostal: '80000-82999',
                    coordenadas: { lat: 24.8049, lon: -107.3940 }
                },
                'Chihuahua': {
                    codigoPostal: '31000-33999',
                    coordenadas: { lat: 28.6353, lon: -106.0889 }
                },
                'Coahuila': {
                    codigoPostal: '25000-27999',
                    coordenadas: { lat: 27.0587, lon: -101.7068 }
                },
                'Durango': {
                    codigoPostal: '34000-35999',
                    coordenadas: { lat: 24.0277, lon: -104.6532 }
                },
                'Puebla': {
                    codigoPostal: '72000-75999',
                    coordenadas: { lat: 19.0414, lon: -98.2063 }
                },
                'Veracruz': {
                    codigoPostal: '91000-93999',
                    coordenadas: { lat: 19.1738, lon: -96.1342 }
                },
                'Yucatán': {
                    codigoPostal: '97000-97999',
                    coordenadas: { lat: 20.9801, lon: -89.6245 }
                },
                'Querétaro': {
                    codigoPostal: '76000-76999',
                    coordenadas: { lat: 20.5881, lon: -100.3881 }
                },
                'Tabasco': {
                    codigoPostal: '86000-86999',
                    coordenadas: { lat: 17.8409, lon: -92.6189 }
                },
                'Guerrero': {
                    codigoPostal: '39000-41999',
                    coordenadas: { lat: 17.5734, lon: -99.5470 }
                },
                'Chiapas': {
                    codigoPostal: '29000-30999',
                    coordenadas: { lat: 16.7569, lon: -93.1292 }
                },
                'Tamaulipas': {
                    codigoPostal: '87000-89999',
                    coordenadas: { lat: 24.2669, lon: -98.8363 }
                }
            };
            
            // Buscar coincidencia parcial en el nombre de la región
            for (const [key, value] of Object.entries(regionesCP)) {
                if (region.includes(key)) {
                    return value;
                }
            }
            
            return null;
        }

        // Nueva función para obtener código postal por coordenadas
        async function obtenerCodigoPostalPorCoordenadas(lat, lon) {
            return new Promise((resolve, reject) => {
                const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
                
                httpGetAsync(url, function(error, response) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    try {
                        const data = JSON.parse(response);
                        console.log("Respuesta OpenStreetMap:", data);
                        
                        const resultado = {
                            codigoPostal: 'No disponible',
                            region: 'Desconocido'
                        };
                        
                        if (data.address) {
                            resultado.codigoPostal = data.address.postcode || 'No disponible';
                            resultado.region = data.address.state || data.address.county || 'Desconocido';
                        }
                        
                        resolve(resultado);
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            });
        }

        // Función para detectar región en México
        function detectarRegionMexico(numeroSinPais) {
            const areas = {
           // Ciudad de México
            '55': 'Ciudad de México',
            '56': 'Ciudad de México',
            
            // Estado de México
            '55': 'Estado de México (compartido con CDMX)',
            '712': 'Tejupilco, Estado de México',
            '713': 'Amatepec, Estado de México',
            '714': 'Sultepec, Estado de México',
            '715': 'Almoloya de Alquisiras, Estado de México',
            '716': 'Ixtapan de la Sal, Estado de México',
            '717': 'Tonatico, Estado de México',
            '718': 'Zacazonapan, Estado de México',
            '719': 'Temascaltepec, Estado de México',
            '722': 'Toluca, Estado de México',
            
            // Jalisco
            '33': 'Guadalajara, Jalisco',
            '312': 'Autlán de Navarro, Jalisco',
            '313': 'Puerto Vallarta, Jalisco',
            '316': 'Ciudad Guzmán, Jalisco',
            '317': 'Lagos de Moreno, Jalisco',
            '321': 'La Barca, Jalisco',
            '326': 'Tepatitlán de Morelos, Jalisco',
            '327': 'Arandas, Jalisco',
            '328': 'Yahualica de González Gallo, Jalisco',
            '343': 'Tequila, Jalisco',
            '345': 'Zapotlanejo, Jalisco',
            '346': 'Ocotlán, Jalisco',
            '347': 'Atotonilco el Alto, Jalisco',
            '348': 'La Manzanilla de la Paz, Jalisco',
            '349': 'Tala, Jalisco',
            '357': 'Tomatlán, Jalisco',
            '358': 'Casimiro Castillo, Jalisco',
            '369': 'Tamazula de Gordiano, Jalisco',
            '371': 'San Juan de los Lagos, Jalisco',
            '372': 'Jalostotitlán, Jalisco',
            '373': 'San Miguel el Alto, Jalisco',
            '374': 'San Julián, Jalisco',
            '375': 'Unión de San Antonio, Jalisco',
            '376': 'Ayotlán, Jalisco',
            '377': 'Jesús María, Jalisco',
            '378': 'Colotlán, Jalisco',
            '384': 'Ameca, Jalisco',
            '385': 'Cocula, Jalisco',
            '386': 'Tequila, Jalisco',
            '387': 'Magdalena, Jalisco',
            '388': 'Ahualulco de Mercado, Jalisco',
            '391': 'El Salto, Jalisco',
            '392': 'Acatlán de Juárez, Jalisco',
            '393': 'Villa Corona, Jalisco',
            '394': 'Zacoalco de Torres, Jalisco',
            '395': 'Atemajac de Brizuela, Jalisco',
            
            // Nuevo León
            '81': 'Monterrey, Nuevo León',
            '821': 'Linares, Nuevo León',
            '823': 'Montemorelos, Nuevo León',
            '824': 'Allende, Nuevo León',
            '825': 'General Terán, Nuevo León',
            '826': 'Doctor Arroyo, Nuevo León',
            '828': 'Aramberri, Nuevo León',
            '829': 'Galeana, Nuevo León',
            
            // Baja California
            '646': 'Mexicali, Baja California',
            '653': 'San Felipe, Baja California',
            '657': 'Ensenada, Baja California',
            '658': 'San Quintín, Baja California',
            '661': 'Tecate, Baja California',
            '664': 'Tijuana, Baja California',
            '665': 'Tijuana, Baja California',
            '686': 'Ensenada, Baja California',
            
            // Baja California Sur
            '612': 'La Paz, Baja California Sur',
            '613': 'Ciudad Constitución, Baja California Sur',
            '614': 'Loreto, Baja California Sur',
            '615': 'Villa Insurgentes, Baja California Sur',
            '616': 'Santa Rosalía, Baja California Sur',
            '624': 'San José del Cabo, Baja California Sur',
            '625': 'Cabo San Lucas, Baja California Sur',
            '626': 'Todos Santos, Baja California Sur',
            '627': 'Santiago, Baja California Sur',
            '628': 'Miraflores, Baja California Sur',
            '629': 'Buena Vista, Baja California Sur',
            '635': 'Guerrero Negro, Baja California Sur',
            '636': 'San Ignacio, Baja California Sur',
            '637': 'Mulegé, Baja California Sur',
            '638': 'Bahía de los Ángeles, Baja California Sur',
            '639': 'Punta Abreojos, Baja California Sur',
            
            // Sonora
            '621': 'Caborca, Sonora',
            '623': 'Puerto Peñasco, Sonora',
            '624': 'San Luis Río Colorado, Sonora',
            '631': 'Nogales, Sonora',
            '632': 'Agua Prieta, Sonora',
            '633': 'Cananea, Sonora',
            '634': 'Naco, Sonora',
            '637': 'Magdalena de Kino, Sonora',
            '638': 'Santa Ana, Sonora',
            '641': 'Cumpas, Sonora',
            '642': 'Moctezuma, Sonora',
            '643': 'Huásabas, Sonora',
            '644': 'Villa Hidalgo, Sonora',
            '645': 'Bacoachi, Sonora',
            '647': 'Altar, Sonora',
            '648': 'Sáric, Sonora',
            '649': 'Imuris, Sonora',
            '651': 'Carbó, Sonora',
            '653': 'Pitiquito, Sonora',
            '662': 'Hermosillo, Sonora',
            
            // Sinaloa
            '667': 'Los Mochis, Sinaloa',
            '668': 'Culiacán, Sinaloa',
            '672': 'Guasave, Sinaloa',
            '673': 'Guanaceví, Sinaloa',
            '674': 'El Fuerte, Sinaloa',
            '675': 'Choix, Sinaloa',
            '676': 'Angostura, Sinaloa',
            '677': 'Mocorito, Sinaloa',
            '687': 'Escuinapa, Sinaloa',
            '689': 'Concordia, Sinaloa',
            '692': 'Elota, Sinaloa',
            '693': 'San Ignacio, Sinaloa',
            '694': 'Mazatlán, Sinaloa',
            '695': 'Rosario, Sinaloa',
            '696': 'Ahome, Sinaloa',
            '697': 'El Carrizo, Sinaloa',
            '698': 'Guamúchil, Sinaloa',
            
            // Chihuahua
            '614': 'Chihuahua, Chihuahua',
            '616': 'Ciudad Juárez, Chihuahua',
            '621': 'Nuevo Casas Grandes, Chihuahua',
            '624': 'Hidalgo del Parral, Chihuahua',
            '625': 'Cuauhtémoc, Chihuahua',
            '626': 'Delicias, Chihuahua',
            '627': 'Camargo, Chihuahua',
            '628': 'Jiménez, Chihuahua',
            '629': 'Meoqui, Chihuahua',
            '635': 'Ojinaga, Chihuahua',
            '636': 'Aldama, Chihuahua',
            '637': 'Guachochi, Chihuahua',
            '638': 'Madera, Chihuahua',
            '639': 'Buenaventura, Chihuahua',
            '648': 'Ahumada, Chihuahua',
            '649': 'Satevó, Chihuahua',
            '652': 'San Francisco de Borja, Chihuahua',
            '656': 'Praxis, Chihuahua',
            
            // Coahuila
            '844': 'Torreón, Coahuila',
            '861': 'Saltillo, Coahuila',
            '862': 'Monclova, Coahuila',
            '863': 'Sabinas, Coahuila',
            '864': 'Acuña, Coahuila',
            '866': 'Piedras Negras, Coahuila',
            '867': 'Nava, Coahuila',
            '869': 'Matamoros, Coahuila',
            '871': 'Frontera, Coahuila',
            '872': 'San Pedro, Coahuila',
            '873': 'Parras, Coahuila',
            '877': 'Zaragoza, Coahuila',
            '878': 'Morelos, Coahuila',
            
            // Durango
            '618': 'Durango, Durango',
            '649': 'Gómez Palacio, Durango',
            '671': 'Lerdo, Durango',
            '674': 'Santiago Papasquiaro, Durango',
            '675': 'Tepehuanes, Durango',
            '676': 'El Salto, Durango',
            '677': 'Canatlán, Durango',
            
            // Puebla
            '222': 'Puebla, Puebla',
            '231': 'Tehuacán, Puebla',
            '232': 'San Martín Texmelucan, Puebla',
            '233': 'Cholula, Puebla',
            '234': 'Izúcar de Matamoros, Puebla',
            '235': 'Atlixco, Puebla',
            '236': 'Huauchinango, Puebla',
            '237': 'Zacatlán, Puebla',
            '238': 'Teziutlán, Puebla',
            '243': 'Libres, Puebla',
            '244': 'Chignahuapan, Puebla',
            '245': 'Tlatlauquitepec, Puebla',
            '246': 'Acatzingo, Puebla',
            '247': 'Tecamachalco, Puebla',
            '248': 'Ciudad Serdán, Puebla',
            '249': 'Chiautla, Puebla',
            '276': 'Tepexi de Rodríguez, Puebla',
            '277': 'Ajalpan, Puebla',
            '278': 'Zinacatepec, Puebla',
            '283': 'San Juan Ixcaquixtla, Puebla',
            '284': 'Tepanco de López, Puebla',

            // Veracruz
            '229': 'Veracruz, Veracruz',
            '271': 'Xalapa, Veracruz',
            '272': 'Orizaba, Veracruz',
            '273': 'Córdoba, Veracruz',
            '274': 'Fortín de las Flores, Veracruz',
            '275': 'Ciudad Mendoza, Veracruz',
            '276': 'Río Blanco, Veracruz',
            '278': 'Poza Rica, Veracruz',
            '279': 'Papantla, Veracruz',
            '283': 'Perote, Veracruz',
            '284': 'Tlacotalpan, Veracruz',
            '285': 'Cosamaloapan, Veracruz',
            '286': 'Tierra Blanca, Veracruz',
            '287': 'Álamo, Veracruz',
            '288': 'Túxpam, Veracruz',
            '294': 'Coatzacoalcos, Veracruz',
            '296': 'Minatitlán, Veracruz',
            '297': 'Acayucan, Veracruz',
            '783': 'Pánuco, Veracruz',
            '785': 'Tantoyuca, Veracruz',
            '786': 'Cerro Azul, Veracruz',
            '789': 'Tempoal, Veracruz',
            
            // Yucatán
            '999': 'Mérida, Yucatán',
            '986': 'Tizimín, Yucatán',
            '988': 'Valladolid, Yucatán',
            '991': 'Tekax, Yucatán',
            '992': 'Oxkutzcab, Yucatán',
            '993': 'Motul, Yucatán',
            '994': 'Sotuta, Yucatán',
            '995': 'Petó, Yucatán',
            '996': 'Espita, Yucatán',
            '997': 'Temozón, Yucatán',
            '998': 'Progreso, Yucatán',
               // Tamaulipas
            '831': 'Nuevo Laredo, Tamaulipas',
            '832': 'Matamoros, Tamaulipas',
            '833': 'Reynosa, Tamaulipas',
            '834': 'Ciudad Victoria, Tamaulipas',
            '835': 'Ciudad Mante, Tamaulipas',
            '836': 'San Fernando, Tamaulipas',
            '839': 'Soto la Marina, Tamaulipas',
            '841': 'Tampico, Tamaulipas',
            '842': 'Ciudad Madero, Tamaulipas',
            '846': 'Valle Hermoso, Tamaulipas',
            '848': 'Miguel Alemán, Tamaulipas',
            '867': 'Camargo, Tamaulipas',
            '891': 'Río Bravo, Tamaulipas',
            '892': 'Ciudad Gustavo Díaz Ordaz, Tamaulipas',
            '893': 'Altamira, Tamaulipas',
            '894': 'Miramar, Tamaulipas',
            '897': 'Xicoténcatl, Tamaulipas',
            '898': 'Aldama, Tamaulipas',
                // Coahuila
            '844': 'Torreón, Coahuila',
            '861': 'Saltillo, Coahuila',
            '862': 'Monclova, Coahuila',
            '863': 'Sabinas, Coahuila',
            '864': 'Acuña, Coahuila',
            '866': 'Piedras Negras, Coahuila',
            '867': 'Nava, Coahuila',
            '869': 'Matamoros, Coahuila',
            '871': 'Frontera, Coahuila',
            '872': 'San Pedro, Coahuila',
            '873': 'Parras, Coahuila',
            '877': 'Zaragoza, Coahuila',
            '878': 'Morelos, Coahuila',

            // Querétaro
            '442': 'Querétaro, Querétaro',
            '412': 'Querétaro',
            '414': 'Querétaro',
            '419': 'Querétaro',
            '427': 'Querétaro',
            '428': 'Querétaro',
            '441': 'Querétaro',
            '443': 'Querétaro',
            '445': 'Querétaro',
            '446': 'Querétaro',
            '447': 'Querétaro',
            '448': 'Querétaro',
            '451': 'Querétaro',
            '455': 'Querétaro',
            '456': 'Querétaro',
            '457': 'Querétaro',
            '458': 'Querétaro',
            '459': 'Querétaro',
            '461': 'Querétaro',
            '463': 'Querétaro',
            '464': 'Querétaro',
            '465': 'Querétaro',
            '466': 'Querétaro',
            '467': 'Querétaro',
            '468': 'Querétaro',
            '469': 'Querétaro',
            '487': 'Querétaro',
              // Tabasco
            '735': 'Villahermosa, Tabasco',
            '913': 'Cárdenas, Tabasco',
            '914': 'Comalcalco, Tabasco',
            '916': 'Huimanguillo, Tabasco',
            '917': 'Macuspana, Tabasco',
            '918': 'Tenosique, Tabasco',
            '932': 'Emiliano Zapata, Tabasco',
            '933': 'Jalapa, Tabasco',
            '934': 'Jonuta, Tabasco',
            '935': 'Balancán, Tabasco',
            '936': 'Nacajuca, Tabasco',
            '937': 'Centla, Tabasco',
            '938': 'Tacotalpa, Tabasco',
            '993': 'Villahermosa, Tabasco',
            '994': 'Villahermosa, Tabasco',

            // Guerrero
            '744': 'Acapulco, Guerrero',
            '721': 'Chilpancingo, Guerrero',
            '725': 'Iguala, Guerrero',
            '727': 'Taxco, Guerrero',
            '732': 'Ciudad Altamirano, Guerrero',
            '733': 'Teloloapan, Guerrero',
            '736': 'Coyuca de Catalán, Guerrero',
            '742': 'Olinalá, Guerrero',
            '754': 'Zihuatanejo, Guerrero',
            '755': 'Ixtapa, Guerrero',
            '756': 'San Marcos, Guerrero',
            '757': 'Técpan de Galeana, Guerrero',
            '758': 'Atoyac de Álvarez, Guerrero',
            '759': 'Cruz Grande, Guerrero',
            '761': 'Chilapa, Guerrero',
            '762': 'Ometepec, Guerrero',
            '767': 'Cuajinicuilapa, Guerrero',
            '781': 'Tlapa, Guerrero',

            // Chiapas
            '961': 'Tuxtla Gutiérrez, Chiapas',
            '916': 'Pichucalco, Chiapas',
            '919': 'San Cristóbal de las Casas, Chiapas',
            '923': 'Comitán, Chiapas',
            '924': 'Arriaga, Chiapas',
            '925': 'Villaflores, Chiapas',
            '926': 'Juárez, Chiapas',
            '927': 'Yajalón, Chiapas',
            '928': 'Ocosingo, Chiapas',
            '929': 'Palenque, Chiapas',
            '931': 'Motozintla, Chiapas',
            '932': 'Ángel Albino Corzo, Chiapas',
            '934': 'Cacahoatán, Chiapas',
            '938': 'La Concordia, Chiapas',
            '962': 'Tapachula, Chiapas',
            '963': 'Huixtla, Chiapas',
            '964': 'Mapastepec, Chiapas',
            '965': 'Acacoyagua, Chiapas',
            '966': 'Escuintla, Chiapas',
            '967': 'Tonalá, Chiapas',
            '968': 'Pijijiapan, Chiapas',
                '993': 'Villahermosa, Tabasco'
            };
            
            for (let i = 3; i >= 2; i--) {
                const codigo = numeroSinPais.substring(0, i);
                if (areas[codigo]) {
                    return areas[codigo];
                }
            }
            
            return 'Desconocido';
        }

        // Función para detectar operador en México
        function detectarOperadorMexico(numeroSinPais) {
          const operadores = {
            // Telcel (85+ prefijos)
            '55': 'Telcel', '56': 'Telcel', '33': 'Telcel', '81': 'Telcel', '83': 'Telcel',
            '87': 'Telcel', '44': 'Telcel', '22': 'Telcel', '27': 'Telcel', '28': 'Telcel',
            '29': 'Telcel', '31': 'Telcel', '32': 'Telcel', '34': 'Telcel', '35': 'Telcel',
            '36': 'Telcel', '37': 'Telcel', '38': 'Telcel', '39': 'Telcel', '41': 'Telcel',
            '42': 'Telcel', '43': 'Telcel', '45': 'Telcel', '46': 'Telcel', '47': 'Telcel',
            '48': 'Telcel', '49': 'Telcel', '51': 'Telcel', '52': 'Telcel', '53': 'Telcel',
            '54': 'Telcel', '57': 'Telcel', '58': 'Telcel', '59': 'Telcel', '61': 'Telcel',
            '62': 'Telcel', '63': 'Telcel', '64': 'Telcel', '65': 'Telcel', '67': 'Telcel',
            '68': 'Telcel', '69': 'Telcel', '71': 'Telcel', '72': 'Telcel', '73': 'Telcel',
            '74': 'Telcel', '75': 'Telcel', '76': 'Telcel', '78': 'Telcel', '79': 'Telcel',
            '82': 'Telcel', '84': 'Telcel', '85': 'Telcel', '86': 'Telcel', '88': 'Telcel',
            '89': 'Telcel', '91': 'Telcel', '92': 'Telcel', '93': 'Telcel', '94': 'Telcel',
            '95': 'Telcel', '96': 'Telcel', '97': 'Telcel', '98': 'Telcel', '99': 'Telcel',
            
            // Movistar (70+ prefijos)
            '221': 'Movistar', '222': 'Movistar', '223': 'Movistar', '224': 'Movistar',
            '225': 'Movistar', '226': 'Movistar', '227': 'Movistar', '228': 'Movistar',
            '229': 'Movistar', '231': 'Movistar', '232': 'Movistar', '233': 'Movistar',
            '234': 'Movistar', '235': 'Movistar', '236': 'Movistar', '237': 'Movistar',
            '238': 'Movistar', '239': 'Movistar', '241': 'Movistar', '242': 'Movistar',
            '243': 'Movistar', '244': 'Movistar', '245': 'Movistar', '246': 'Movistar',
            '247': 'Movistar', '248': 'Movistar', '249': 'Movistar', '251': 'Movistar',
            '252': 'Movistar', '253': 'Movistar', '254': 'Movistar', '255': 'Movistar',
            '256': 'Movistar', '257': 'Movistar', '258': 'Movistar', '259': 'Movistar',
            '261': 'Movistar', '262': 'Movistar', '263': 'Movistar', '264': 'Movistar',
            '265': 'Movistar', '266': 'Movistar', '267': 'Movistar', '268': 'Movistar',
            '269': 'Movistar', '271': 'Movistar', '272': 'Movistar', '273': 'Movistar',
            '274': 'Movistar', '275': 'Movistar', '276': 'Movistar', '277': 'Movistar',
            '278': 'Movistar', '279': 'Movistar', '281': 'Movistar', '282': 'Movistar',
            '283': 'Movistar', '284': 'Movistar', '285': 'Movistar', '286': 'Movistar',
            '287': 'Movistar', '288': 'Movistar', '289': 'Movistar', '291': 'Movistar',
            '292': 'Movistar', '293': 'Movistar', '294': 'Movistar', '295': 'Movistar',
            '296': 'Movistar', '297': 'Movistar', '298': 'Movistar', '299': 'Movistar',
            
            // AT&T (45+ prefijos)
            '551': 'AT&T', '552': 'AT&T', '553': 'AT&T', '554': 'AT&T', '555': 'AT&T',
            '556': 'AT&T', '557': 'AT&T', '558': 'AT&T', '559': 'AT&T', '561': 'AT&T',
            '562': 'AT&T', '563': 'AT&T', '564': 'AT&T', '565': 'AT&T', '566': 'AT&T',
            '567': 'AT&T', '568': 'AT&T', '569': 'AT&T', '571': 'AT&T', '572': 'AT&T',
            '573': 'AT&T', '574': 'AT&T', '575': 'AT&T', '576': 'AT&T', '577': 'AT&T',
            '578': 'AT&T', '579': 'AT&T', '581': 'AT&T', '582': 'AT&T', '583': 'AT&T',
            '584': 'AT&T', '585': 'AT&T', '586': 'AT&T', '587': 'AT&T', '588': 'AT&T',
            '589': 'AT&T', '591': 'AT&T', '592': 'AT&T', '593': 'AT&T', '594': 'AT&T',
            '595': 'AT&T', '596': 'AT&T', '597': 'AT&T', '598': 'AT&T', '599': 'AT&T',
            
            // Unefon (15+ prefijos)
            '991': 'Unefon', '992': 'Unefon', '993': 'Unefon', '994': 'Unefon', '995': 'Unefon',
            '996': 'Unefon', '997': 'Unefon', '998': 'Unefon', '999': 'Unefon', '981': 'Unefon',
            '982': 'Unefon', '983': 'Unefon', '984': 'Unefon', '985': 'Unefon', '986': 'Unefon'
        };

            
            let prefijo = '';
            if (numeroSinPais.length >= 4) {
                prefijo = numeroSinPais.substring(2, 4);
            }
            
            if (operadores[prefijo]) {
                return operadores[prefijo];
            }
            
            return 'Desconocido';
        }

        // ==================== FUNCIONES DE API ====================

        // Función auxiliar para peticiones HTTP
        function httpGetAsync(url, callback) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        callback(null, xmlHttp.responseText);
                    } else {
                        callback(`Error HTTP ${xmlHttp.status}`, null);
                    }
                }
            };
            xmlHttp.open("GET", url, true);
            xmlHttp.send(null);
        }

        // API NumVerify (más confiable)
        function obtenerInfoDeAPINumVerify(numero) {
            return new Promise((resolve, reject) => {
                const apiKey = 'Token';
                const url = `http://apilayer.net/api/validate?access_key=${apiKey}&number=${encodeURIComponent(numero)}&country_code=&format=1`;
                
                httpGetAsync(url, function (error, response) {
                    if (error) {
                        reject(new Error(error));
                        return;
                    }

                    try {
                        const data = JSON.parse(response);
                        console.log("Respuesta NumVerify:", data);
                        
                        if (data.valid) {
                            const info = {
                                valido: data.valid,
                                tipo: data.line_type || 'Desconocido',
                                pais: data.country_name || 'Desconocido',
                                operador: data.carrier || 'Desconocido',
                                region: data.location || 'Desconocido',
                                zonaHoraria: 'Desconocido',
                                codigoPostal: data.postal_code || 'No disponible',
                                lat: null,
                                lon: null
                            };
                            
                            // Obtener coordenadas del país
                            if (info.pais && info.pais !== 'Desconocido') {
                                const coords = obtenerCoordenadasPorPais(info.pais);
                                if (coords) {
                                    info.lat = coords.lat;
                                    info.lon = coords.lon;
                                }
                            }
                            
                            resolve(info);
                        } else {
                            reject(new Error("Número inválido según NumVerify"));
                        }
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            });
        }

        // API Abstract (alternativa)
        function obtenerInfoDeAPIAbstract(numero) {
            return new Promise((resolve, reject) => {
                const url = `https://phonevalidation.abstractapi.com/v1/?api_key=Token&phone=${encodeURIComponent(numero)}`;

                httpGetAsync(url, function (error, response) {
                    if (error) {
                        reject(new Error(error));
                        return;
                    }

                    try {
                        const data = JSON.parse(response);
                        console.log("Respuesta Abstract:", data);
                        
                        const info = {
                            valido: data.valid || false,
                            tipo: data.type || 'Desconocido',
                            pais: data.country?.name || 'Desconocido',
                            operador: data.carrier || 'Desconocido',
                            region: data.location || 'Desconocido',
                            zonaHoraria: data.timezone?.name || 'Desconocido',
                            codigoPostal: data.postal_code || 'No disponible',
                            lat: null,
                            lon: null
                        };
                        
                        // Intentar obtener coordenadas del país
                        if (info.pais && info.pais !== 'Desconocido') {
                            const coords = obtenerCoordenadasPorPais(info.pais);
                            if (coords) {
                                info.lat = coords.lat;
                                info.lon = coords.lon;
                            }
                        }
                        
                        resolve(info);
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            });
        }

        // Función para obtener coordenadas por país
        function obtenerCoordenadasPorPais(pais) {
            const coordenadasPaises = {
                'México': { lat: 23.6345, lon: -102.5528 }
            };
            
            return coordenadasPaises[pais] || null;
        }

        // Función para obtener coordenadas por municipio/ciudad
        function obtenerCoordenadasPorRegion(region) {
            const coordenadasRegiones = {
                // Tamaulipas - Municipios principales
                'Reynosa': { lat: 26.0922, lon: -98.2778 },
                'Matamoros': { lat: 25.8797, lon: -97.5042 },
                'Nuevo Laredo': { lat: 27.4861, lon: -99.5069 },
                'Tampico': { lat: 22.2553, lon: -97.8686 },
                'Ciudad Victoria': { lat: 23.7361, lon: -99.1461 },
                'Ciudad Madero': { lat: 22.2694, lon: -97.8361 },
                'Miramar': { lat: 22.3600, lon: -97.9000 },
                'Altamira': { lat: 22.3925, lon: -97.9389 },
                'El Mante': { lat: 22.7444, lon: -98.9667 },
                'Río Bravo': { lat: 25.9875, lon: -98.0944 },
                'Valle Hermoso': { lat: 25.6714, lon: -97.8139 },
                'San Fernando': { lat: 24.8478, lon: -98.1489 },
                'Soto la Marina': { lat: 23.7661, lon: -98.2069 },

                // Ciudad de México - Alcaldías
                'Álvaro Obregón': { lat: 19.3583, lon: -99.2036 },
                'Azcapotzalco': { lat: 19.4872, lon: -99.1833 },
                'Benito Juárez': { lat: 19.3725, lon: -99.1569 },
                'Coyoacán': { lat: 19.3467, lon: -99.1611 },
                'Cuajimalpa': { lat: 19.3561, lon: -99.2972 },
                'Cuauhtémoc': { lat: 19.4325, lon: -99.1333 },
                'Gustavo A. Madero': { lat: 19.4833, lon: -99.1167 },
                'Iztacalco': { lat: 19.3958, lon: -99.0986 },
                'Iztapalapa': { lat: 19.3578, lon: -99.0928 },
                'La Magdalena Contreras': { lat: 19.3194, lon: -99.2361 },
                'Miguel Hidalgo': { lat: 19.4333, lon: -99.2000 },
                'Milpa Alta': { lat: 19.1925, lon: -99.0236 },
                'Tláhuac': { lat: 19.2667, lon: -99.0056 },
                'Tlalpan': { lat: 19.2950, lon: -99.1625 },
                'Venustiano Carranza': { lat: 19.4333, lon: -99.1000 },
                'Xochimilco': { lat: 19.2606, lon: -99.1056 },

                // Estado de México - Municipios principales
                'Ecatepec': { lat: 19.6097, lon: -99.0600 },
                'Nezahualcóyotl': { lat: 19.4006, lon: -98.9889 },
                'Naucalpan': { lat: 19.4783, lon: -99.2392 },
                'Tlalnepantla': { lat: 19.5367, lon: -99.1947 },
                'Chimalhuacán': { lat: 19.4167, lon: -98.9000 },
                'Toluca': { lat: 19.2925, lon: -99.6539 },
                'Tultitlán': { lat: 19.6450, lon: -99.1694 },
                'Atizapán': { lat: 19.5667, lon: -99.2500 },
                'Ixtapaluca': { lat: 19.3186, lon: -98.8822 },
                'Cuautitlán Izcalli': { lat: 19.6469, lon: -99.2467 },
                'Nicolás Romero': { lat: 19.6250, lon: -99.3069 },
                'Texcoco': { lat: 19.5089, lon: -98.8822 },
                'Chalco': { lat: 19.2647, lon: -98.8972 },
                'Huixquilucan': { lat: 19.3603, lon: -99.3503 },
                'Metepec': { lat: 19.2519, lon: -99.6078 },
                'Zumpango': { lat: 19.7967, lon: -99.0989 },
                'Coacalco': { lat: 19.6314, lon: -99.1056 },
                'La Paz': { lat: 19.3631, lon: -98.9772 },
                'Acolman': { lat: 19.6400, lon: -98.9100 },
                'Lerma': { lat: 19.2875, lon: -99.5119 },
                'Tenango del Valle': { lat: 19.0917, lon: -99.5892 },

                // Jalisco - Municipios principales
                'Guadalajara': { lat: 20.6667, lon: -103.3500 },
                'Zapopan': { lat: 20.7167, lon: -103.4000 },
                'Tlaquepaque': { lat: 20.6333, lon: -103.3167 },
                'Tonalá': { lat: 20.6167, lon: -103.2333 },
                'Puerto Vallarta': { lat: 20.6667, lon: -105.2667 },
                'Lagos de Moreno': { lat: 21.3500, lon: -101.9333 },
                'El Salto': { lat: 20.5167, lon: -103.1833 },
                'Tlajomulco': { lat: 20.4736, lon: -103.4436 },
                'Ocotlán': { lat: 20.3553, lon: -102.7736 },
                'Tepatitlán': { lat: 20.8167, lon: -102.7667 },
                'Autlán': { lat: 19.7667, lon: -104.3667 },
                'Ameca': { lat: 20.5500, lon: -104.0333 },
                'Arandas': { lat: 20.7056, lon: -102.3464 },
                'Ciudad Guzmán': { lat: 19.7047, lon: -103.4619 },

                // Nuevo León - Municipios principales
                'Monterrey': { lat: 25.6667, lon: -100.3167 },
                'Guadalupe': { lat: 25.6833, lon: -100.2500 },
                'San Nicolás': { lat: 25.7500, lon: -100.2833 },
                'San Pedro': { lat: 25.7600, lon: -100.4000 },
                'Santa Catarina': { lat: 25.6833, lon: -100.4500 },
                'Apodaca': { lat: 25.7833, lon: -100.1833 },
                'Escobedo': { lat: 25.7953, lon: -100.1417 },
                'Juárez': { lat: 25.6500, lon: -100.0833 },
                'García': { lat: 25.8167, lon: -100.5833 },
                'Santiago': { lat: 25.4250, lon: -100.1500 },

                // Baja California - Municipios principales
                'Tijuana': { lat: 32.5250, lon: -117.0333 },
                'Mexicali': { lat: 32.6633, lon: -115.4678 },
                'Ensenada': { lat: 31.8578, lon: -116.6058 },
                'Rosarito': { lat: 32.3600, lon: -117.0544 },
                'Tecate': { lat: 32.5728, lon: -116.6256 },
                'San Quintín': { lat: 30.5606, lon: -115.9397 },
                'San Felipe': { lat: 31.0247, lon: -114.8358 },

                // Baja California Sur - Municipios principales
                'La Paz': { lat: 24.1422, lon: -110.3108 },
                'Los Cabos': { lat: 23.0500, lon: -109.7167 },
                'Cabo San Lucas': { lat: 22.8906, lon: -109.9164 },
                'San José del Cabo': { lat: 23.0611, lon: -109.6978 },
                'Ciudad Constitución': { lat: 25.0322, lon: -111.6703 },
                'Loreto': { lat: 26.0119, lon: -111.3486 },
                'Santa Rosalía': { lat: 27.3389, lon: -112.2675 },

                // Sonora - Municipios principales
                'Hermosillo': { lat: 29.0989, lon: -110.9542 },
                'Ciudad Obregón': { lat: 27.4861, lon: -109.9408 },
                'Nogales': { lat: 31.3186, lon: -110.9458 },
                'Guaymas': { lat: 27.9192, lon: -110.8975 },
                'Navojoa': { lat: 27.0814, lon: -109.4461 },
                'San Luis Río Colorado': { lat: 32.4767, lon: -114.7625 },
                'Caborca': { lat: 30.7172, lon: -112.1583 },
                'Puerto Peñasco': { lat: 31.3172, lon: -113.5378 },
                'Agua Prieta': { lat: 31.3292, lon: -109.5481 },

                // Sinaloa - Municipios principales
                'Culiacán': { lat: 24.8069, lon: -107.3939 },
                'Mazatlán': { lat: 23.2167, lon: -106.4167 },
                'Los Mochis': { lat: 25.7836, lon: -108.9936 },
                'Guasave': { lat: 25.5744, lon: -108.4708 },
                'Navolato': { lat: 24.7667, lon: -107.7000 },
                'Ahome': { lat: 25.9167, lon: -109.1667 },
                'El Fuerte': { lat: 26.4186, lon: -108.6183 },
                'Escuinapa': { lat: 22.8322, lon: -105.7756 },

                // Chihuahua - Municipios principales
                'Ciudad Juárez': { lat: 31.7386, lon: -106.4870 },
                'Chihuahua': { lat: 28.6353, lon: -106.0889 },
                'Delicias': { lat: 28.1931, lon: -105.4717 },
                'Parral': { lat: 26.9311, lon: -105.6664 },
                'Cuauhtémoc': { lat: 28.4083, lon: -106.8633 },
                'Nuevo Casas Grandes': { lat: 30.4158, lon: -107.9117 },
                'Camargo': { lat: 27.6833, lon: -105.1667 },
                'Jiménez': { lat: 27.1303, lon: -104.9072 },

                // Coahuila - Municipios principales
                'Saltillo': { lat: 25.4333, lon: -101.0000 },
                'Torreón': { lat: 25.5431, lon: -103.4050 },
                'Monclova': { lat: 26.9069, lon: -101.4203 },
                'Piedras Negras': { lat: 28.7000, lon: -100.5231 },
                'Acuña': { lat: 29.3242, lon: -100.9317 },
                'Matamoros': { lat: 25.5300, lon: -103.2283 },
                'Sabinas': { lat: 27.8556, lon: -101.1158 },
                'San Pedro': { lat: 25.7597, lon: -102.9828 },
                'Frontera': { lat: 26.9281, lon: -101.4514 },

                // Durango - Municipios principales
                'Durango': { lat: 24.0167, lon: -104.6667 },
                'Gómez Palacio': { lat: 25.5611, lon: -103.4983 },
                'Lerdo': { lat: 25.5361, lon: -103.5244 },
                'Santiago Papasquiaro': { lat: 25.0458, lon: -105.4186 },
                'El Salto': { lat: 23.7833, lon: -105.3667 },
                'Vicente Guerrero': { lat: 23.7342, lon: -103.9842 },
                'Canatlán': { lat: 24.5256, lon: -104.7753 },
                'Nombre de Dios': { lat: 23.8486, lon: -104.2469 },

                // Puebla - Municipios principales
                'Puebla': { lat: 19.0333, lon: -98.1833 },
                'Tehuacán': { lat: 18.4617, lon: -97.3928 },
                'San Martín Texmelucan': { lat: 19.2833, lon: -98.4333 },
                'Atlixco': { lat: 18.9061, lon: -98.4361 },
                'San Andrés Cholula': { lat: 19.0511, lon: -98.3039 },
                'Huauchinango': { lat: 20.1772, lon: -98.0528 },
                'Zacatlán': { lat: 19.9333, lon: -97.9667 },
                'Teziutlán': { lat: 19.8167, lon: -97.3667 },
                'Izúcar de Matamoros': { lat: 18.6036, lon: -98.4689 },

                // Veracruz - Municipios principales
                'Veracruz': { lat: 19.1903, lon: -96.1533 },
                'Xalapa': { lat: 19.5333, lon: -96.9167 },
                'Coatzacoalcos': { lat: 18.1500, lon: -94.4333 },
                'Córdoba': { lat: 18.8942, lon: -96.9347 },
                'Poza Rica': { lat: 20.5333, lon: -97.4500 },
                'Minatitlán': { lat: 17.9833, lon: -94.5500 },
                'Orizaba': { lat: 18.8500, lon: -97.1000 },
                'Boca del Río': { lat: 19.1047, lon: -96.1058 },
                'Túxpam': { lat: 20.9578, lon: -97.4081 },
                'Papantla': { lat: 20.4472, lon: -97.3239 },

                // Yucatán - Municipios principales
                'Mérida': { lat: 20.9667, lon: -89.6167 },
                'Valladolid': { lat: 20.6883, lon: -88.2014 },
                'Tizimín': { lat: 21.1425, lon: -88.1647 },
                'Progreso': { lat: 21.2833, lon: -89.6667 },
                'Ticul': { lat: 20.3972, lon: -89.5339 },
                'Tekax': { lat: 20.2028, lon: -89.2858 },
                'Umán': { lat: 20.8833, lon: -89.7500 },
                'Kanasín': { lat: 20.9333, lon: -89.5500 },
                'Hunucmá': { lat: 21.0167, lon: -89.8667 },

                // Querétaro - Municipios principales
                'Querétaro': { lat: 20.5875, lon: -100.3928 },
                'San Juan del Río': { lat: 20.3889, lon: -99.9958 },
                'Corregidora': { lat: 20.5333, lon: -100.4333 },
                'El Marqués': { lat: 20.7500, lon: -100.2500 },
                'Cadereyta': { lat: 20.6917, lon: -99.8167 },
                'Tequisquiapan': { lat: 20.5222, lon: -99.8944 },
                'Amealco': { lat: 20.1875, lon: -100.1458 },
                'Pedro Escobedo': { lat: 20.5000, lon: -100.1417 },

                // Tabasco - Municipios principales
                'Villahermosa': { lat: 17.9892, lon: -92.9281 },
                'Cárdenas': { lat: 18.0000, lon: -93.3667 },
                'Comalcalco': { lat: 18.2633, lon: -93.2239 },
                'Macuspana': { lat: 17.7600, lon: -92.5967 },
                'Tenosique': { lat: 17.4769, lon: -91.4239 },
                'Emiliano Zapata': { lat: 17.7406, lon: -91.7664 },
                'Jalpa de Méndez': { lat: 18.1767, lon: -93.0639 },
                'Paraíso': { lat: 18.3967, lon: -93.2139 },
                'Huimanguillo': { lat: 17.8339, lon: -93.3892 },

                // Guerrero - Municipios principales
                'Acapulco': { lat: 16.8631, lon: -99.8822 },
                'Chilpancingo': { lat: 17.5500, lon: -99.5000 },
                'Iguala': { lat: 18.3450, lon: -99.5414 },
                'Zihuatanejo': { lat: 17.6433, lon: -101.5522 },
                'Taxco': { lat: 18.5567, lon: -99.6058 },
                'Chilapa': { lat: 17.5944, lon: -99.1778 },
                'Tixtla': { lat: 17.5675, lon: -99.3978 },
                'Teloloapan': { lat: 18.3681, lon: -99.8678 },
                'Coyuca de Catalán': { lat: 18.3267, lon: -100.6981 },

                // Chiapas - Municipios principales
                'Tuxtla Gutiérrez': { lat: 16.7528, lon: -93.1167 },
                'Tapachula': { lat: 14.9058, lon: -92.2625 },
                'San Cristóbal': { lat: 16.7372, lon: -92.6375 },
                'Comitán': { lat: 16.2511, lon: -92.1342 },
                'Chiapa de Corzo': { lat: 16.7075, lon: -93.0169 },
                'Palenque': { lat: 17.5094, lon: -91.9825 },
                'Ocosingo': { lat: 16.9064, lon: -92.0939 },
                'Cintalapa': { lat: 16.6875, lon: -93.7111 },
                'Arriaga': { lat: 16.2369, lon: -93.9022 },
                'Tonalá': { lat: 16.0889, lon: -93.7569 }
            };

           // Limpiar y normalizar el nombre de la región
            const regionLimpia = region.trim();
            
            console.log(`Buscando coordenadas para: "${regionLimpia}"`);
            
            // Buscar coincidencia exacta primero
            if (coordenadasRegiones[regionLimpia]) {
                console.log(`Coordenadas EXACTAS encontradas para: ${regionLimpia}`);
                return coordenadasRegiones[regionLimpia];
            }

            // Buscar coincidencia parcial (por si la región viene con texto adicional)
            for (const [key, value] of Object.entries(coordenadasRegiones)) {
                if (regionLimpia.includes(key)) {
                    console.log(`Coordenadas PARCIALES encontradas para: ${regionLimpia} (clave: ${key})`);
                    return value;
                }
            }

            console.log(`No se encontraron coordenadas específicas para: ${regionLimpia}`);
            // Si no encuentra coincidencia, retornar coordenadas del país
            return { lat: 23.6345, lon: -102.5528 };
        }

        // ==================== FUNCIÓN PARA MOSTRAR RESULTADO ====================

        function mostrarResultado(info) {
            const resultado = document.getElementById("resultado");
            
            console.log("Información para mostrar:", info);
            
            // Formatear zona horaria para mostrar hora actual si está disponible
            let zonaHorariaFormateada = info.zonaHoraria || info.timezone || 'No disponible';
            let horaActual = '';
            
            if (zonaHorariaFormateada && zonaHorariaFormateada !== 'Desconocido' && zonaHorariaFormateada !== 'No disponible') {
                try {
                    const ahora = new Date();
                    horaActual = ahora.toLocaleString("es-ES", { 
                        timeZone: zonaHorariaFormateada,
                        hour12: false,
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                } catch (e) {
                    console.error("Error al formatear zona horaria:", e);
                }
            }
            
            let contenido = `
        <div class="resultado-info">
            <div class="info-section">
                <div class="info-header"><i class="fas fa-phone"></i> <strong>NumExtracBsz - Información del Número</strong></div>
                
                <div class="info-item"><i class="fas fa-phone"></i> <strong>Número:</strong> ${info.numero}</div>
                <div class="info-item"><i class="fas fa-check-circle"></i> <strong>¿Válido?:</strong> ${info.valido ? '✅ Sí' : '❌ No'}</div>
                <div class="info-item"><i class="fas fa-mobile-alt"></i> <strong>Formato local:</strong> ${info.numeroLimpio}</div>
                <div class="info-item"><i class="fas fa-globe"></i> <strong>Formato internacional:</strong> +${info.numeroLimpio}</div>
            </div>

            <div class="info-section">
                <div class="info-item"><i class="fas fa-flag"></i> <strong>Código país:</strong> ${detectarCodigoPais(info.numeroLimpio) || 'No disponible'}</div>
                <div class="info-item"><i class="fas fa-map-marked-alt"></i> <strong>País:</strong> ${info.pais}</div>
                <div class="info-item"><i class="fas fa-network-wired"></i> <strong>Operador:</strong> ${info.operador}</div>
                <div class="info-item"><i class="fas fa-phone-volume"></i> <strong>Tipo de línea:</strong> ${info.tipo}</div>
            </div>

            <div class="info-section extended">
                <div class="info-header"><i class="fas fa-clock"></i> <strong>Datos Extendidos</strong></div>
                <div class="info-item"><i class="fas fa-clock"></i> <strong>Zona Horaria:</strong> ${zonaHorariaFormateada}</div>
                ${horaActual ? `<div class="info-item"><i class="fas fa-clock"></i> <strong>Hora actual:</strong> ${horaActual}</div>` : ''}
                <div class="info-item"><i class="fas fa-map"></i> <strong>Región:</strong> ${info.region || info.region_code || 'No disponible'}</div>
                <div class="info-item"><i class="fas fa-mail-bulk"></i> <strong>Código Postal:</strong> ${info.codigoPostal || info.postal_code || 'No disponible'}</div>
            </div>
        </div>
        `;

            resultado.innerHTML = contenido;
            
            // Mostrar mapa con OpenStreetMap (gratuito)
            if (info.lat && info.lon) {
                console.log("Mostrando mapa con coordenadas:", info.lat, info.lon);
                setTimeout(() => {
                    inicializarMapaOpenStreetMap(info.lat, info.lon, info.codigoPostal !== 'No disponible' ? info.codigoPostal : info.pais);
                }, 500);
            } else {
                console.log("No hay coordenadas para mostrar el mapa");
            }
        }

        // ==================== FUNCIONES DE UBICACIÓN ====================

        // Función mejorada para obtener información de ubicación
        function obtenerInfoUbicacion(lat, lon) {
            return new Promise((resolve, reject) => {
                // Primero intentar con OpenStreetMap
                const osmUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`;
                
                httpGetAsync(osmUrl, function (errOsm, respOsm) {
                    if (errOsm) {
                        reject(new Error(errOsm));
                        return;
                    }
                    
                    try {
                        const osmData = JSON.parse(respOsm);
                        const address = osmData.address || {};
                        
                        console.log("Datos completos de OpenStreetMap:", osmData);
                        console.log("Dirección completa:", address);
                        
                        // Obtener código postal - manejar casos donde no esté disponible
                        let postal_code = address.postcode || "No disponible";
                        
                        // Obtener región - usar state si county no está disponible
                        let region_code = address.county || address.state || address.region || 'No disponible';
                        
                        const osm_display_name = osmData.display_name || 'No disponible';
                        
                        console.log("Código postal encontrado:", postal_code);
                        console.log("Región encontrada:", region_code);
                        
                        // Si OSM no devuelve código postal, intentar con otra API
                        if (postal_code === 'No disponible') {
                            obtenerInfoUbicacionAlternativa(lat, lon)
                                .then(altInfo => {
                                    console.log("Datos alternativos:", altInfo);
                                    resolve(altInfo);
                                })
                                .catch((error) => {
                                    console.log("Error en API alternativa:", error);
                                    resolve({
                                        timezone: 'No disponible',
                                        region_code: region_code,
                                        postal_code: postal_code,
                                        osm_display_name: osm_display_name,
                                        lat: lat,
                                        lon: lon
                                    });
                                });
                        } else {
                            // Obtener zona horaria
                            obtenerZonaHoraria(lat, lon)
                                .then(timezone => {
                                    resolve({
                                        timezone: timezone,
                                        region_code: region_code,
                                        postal_code: postal_code,
                                        osm_display_name: osm_display_name,
                                        lat: lat,
                                        lon: lon
                                    });
                                })
                                .catch(() => resolve({
                                    timezone: 'No disponible',
                                    region_code: region_code,
                                    postal_code: postal_code,
                                    osm_display_name: osm_display_name,
                                    lat: lat,
                                    lon: lon
                                }));
                        }
                    } catch (parseError) {
                        console.error("Error parseando datos OSM:", parseError);
                        reject(parseError);
                    }
                });
            });
        }

        // Función para obtener zona horaria
        function obtenerZonaHoraria(lat, lon) {
            return new Promise((resolve, reject) => {
                // Usar API gratuita de timezone
                const tzUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=Token&format=json&by=position&lat=${lat}&lng=${lon}`;
                
                // Alternativa: usar OpenStreetMap para zona horaria
                const osmTzUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
                
                httpGetAsync(osmTzUrl, function (err, resp) {
                    if (err) {
                        // Si falla, devolver zona horaria por defecto para México
                        resolve("America/Mexico_City");
                        return;
                    }
                    
                    try {
                        const data = JSON.parse(resp);
                        // OpenStreetMap no siempre devuelve timezone, así que usamos una por defecto
                        resolve("America/Mexico_City");
                    } catch (parseError) {
                        resolve("America/Mexico_City");
                    }
                });
            });
        }

        // Función auxiliar para obtener información de ubicación alternativa
        function obtenerInfoUbicacionAlternativa(lat, lon) {
            return new Promise((resolve, reject) => {
                // Usar otra API gratuita como alternativa
                const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=es`;
                
                httpGetAsync(url, function(error, response) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    
                    try {
                        const data = JSON.parse(response);
                        resolve({
                            timezone: data.timezone || 'No disponible',
                            region_code: data.principalSubdivision || data.locality || 'No disponible',
                            postal_code: data.postcode || 'No disponible',
                            osm_display_name: data.locality || data.continent || 'No disponible',
                            lat: lat,
                            lon: lon
                        });
                    } catch (parseError) {
                        reject(parseError);
                    }
                });
            });
        }

        // ==================== MAPA CON OPENSTREETMAP (GRATUITO) ====================

        // Función para cargar Leaflet (OpenStreetMap) dinámicamente
        function cargarLeaflet() {
            return new Promise((resolve, reject) => {
                // Verificar si Leaflet ya está cargado
                if (typeof L !== 'undefined') {
                    resolve();
                    return;
                }

                // Cargar CSS de Leaflet
                if (!document.querySelector('link[href*="leaflet"]')) {
                    const leafletCSS = document.createElement('link');
                    leafletCSS.rel = 'stylesheet';
                    leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                    leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
                    leafletCSS.crossOrigin = '';
                    document.head.appendChild(leafletCSS);
                }

                // Cargar JavaScript de Leaflet
                const leafletScript = document.createElement('script');
                leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
                leafletScript.crossOrigin = '';
                
                leafletScript.onload = () => {
                    console.log("Leaflet cargado correctamente");
                    resolve();
                };
                
                leafletScript.onerror = (error) => {
                    console.error("Error cargando Leaflet:", error);
                    reject(error);
                };
                
                document.head.appendChild(leafletScript);
            });
        }

        // Función principal para inicializar mapa con OpenStreetMap
        function inicializarMapaOpenStreetMap(lat, lng, ubicacion) {
            cargarLeaflet().then(() => {
                crearMapaLeaflet(lat, lng, ubicacion);
            }).catch(error => {
                console.error("No se pudo cargar Leaflet:", error);
                mostrarMapaAlternativo(lat, lng, ubicacion);
            });
        }

        // Función para crear el mapa con Leaflet
        function crearMapaLeaflet(lat, lng, ubicacion) {
            try {
                // Eliminar mapa existente si hay uno
                const mapaExistente = document.getElementById('map-container');
                if (mapaExistente) {
                    mapaExistente.remove();
                }
                
                // Crear contenedor para el mapa
                const mapContainer = document.createElement('div');
                mapContainer.className = 'map-container';
                mapContainer.id = 'map-container';
                mapContainer.style.marginTop = '20px';
                mapContainer.style.border = '1px solid var(--caqui-claro)';
                mapContainer.style.borderRadius = 'var(--border-radius)';
                mapContainer.style.padding = '15px';
                mapContainer.style.background = 'var(--hueso)';
                
                let tituloMapa = 'Mapa de ubicación';
                if (ubicacion && ubicacion !== 'No disponible') {
                    tituloMapa = `Mapa - ${ubicacion}`;
                }
                
                mapContainer.innerHTML = `
                    <div class="info-header" style="margin-bottom: 15px;">
                        <i class="fas fa-map-marked-alt"></i> 
                        <strong>${tituloMapa}</strong>
                    </div>
                    <div id="leaflet-map" style="height: 300px; width: 100%; border-radius: var(--border-radius); z-index: 1;"></div>
                    <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--gray);">
                        <i class="fas fa-info-circle"></i> 
                        ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Área aproximada'}
                        <br><small>Mapa proporcionado por OpenStreetMap</small>
                    </div>
                `;
                
                // Agregar el mapa al resultado
                const resultado = document.getElementById("resultado");
                resultado.appendChild(mapContainer);
                
                // Inicializar el mapa de Leaflet
                const map = L.map('leaflet-map').setView([lat, lng], 10);
                
                // Añadir capa de OpenStreetMap
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    maxZoom: 19
                }).addTo(map);
                
                // Crear icono personalizado
                const customIcon = L.divIcon({
                    className: 'custom-marker',
                    html: '<i class="fas fa-map-marker-alt" style="color: var(--danger); font-size: 24px;"></i>',
                    iconSize: [24, 24],
                    iconAnchor: [12, 24]
                });
                
                // Añadir marcador personalizado
                const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                
                // Texto del popup
                let popupText = `<strong>${ubicacion}</strong>`;
                if (ubicacion !== 'No disponible' && !ubicacion.includes('Código Postal')) {
                    popupText += `<br><small>Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}</small>`;
                }
                
                marker.bindPopup(popupText).openPopup();
                
                // Añadir círculo para área aproximada
                L.circle([lat, lng], {
                    color: 'var(--danger)',
                    fillColor: 'var(--danger)',
                    fillOpacity: 0.1,
                    radius: 5000 // 5km de radio
                }).addTo(map);
                
                console.log("Mapa OpenStreetMap inicializado correctamente");
                
            } catch (error) {
                console.error("Error al crear mapa Leaflet:", error);
                mostrarMapaAlternativo(lat, lng, ubicacion);
            }
        }

        // Función alternativa si Leaflet falla
        function mostrarMapaAlternativo(lat, lng, ubicacion) {
            try {
                // Eliminar mapa existente si hay uno
                const mapaExistente = document.getElementById('map-container');
                if (mapaExistente) {
                    mapaExistente.remove();
                }
                
                // Crear contenedor para el mapa
                const mapContainer = document.createElement('div');
                mapContainer.className = 'map-container';
                mapContainer.id = 'map-container';
                mapContainer.style.marginTop = '20px';
                mapContainer.style.border = '1px solid var(--caqui-claro)';
                mapContainer.style.borderRadius = 'var(--border-radius)';
                mapContainer.style.padding = '15px';
                mapContainer.style.background = 'var(--hueso)';
                
                let tituloMapa = 'Mapa de ubicación';
                if (ubicacion && ubicacion !== 'No disponible') {
                    tituloMapa = `Mapa - ${ubicacion}`;
                }
                
                // Usar imagen estática de OpenStreetMap como fallback
                const zoom = 10;
                
                // Alternativa con OpenStreetMap static (gratuito)
                const osmStaticUrl = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=${zoom}&size=600,300&l=map&pt=${lng},${lat},pm2rdl`;
                
                mapContainer.innerHTML = `
                    <div class="info-header" style="margin-bottom: 15px;">
                        <i class="fas fa-map-marked-alt"></i> 
                        <strong>${tituloMapa}</strong>
                    </div>
                    <div style="height: 300px; width: 100%; border-radius: var(--border-radius); background: var(--light); display: flex; align-items: center; justify-content: center; flex-direction: column; overflow: hidden;">
                        <img src="${osmStaticUrl}" 
                             alt="Mapa de ubicación" 
                             style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--border-radius);"
                             onerror="this.style.display='none'">
                        <div style="text-align: center; padding: 20px; color: var(--gray); position: absolute;">
                            <i class="fas fa-map-marker-alt" style="color: var(--danger); font-size: 2rem; margin-bottom: 10px;"></i><br>
                            <strong>${ubicacion}</strong><br>
                            <small>Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}</small>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--gray);">
                        <i class="fas fa-info-circle"></i> 
                        ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Área aproximada'}
                    </div>
                `;
                
                // Agregar el mapa al resultado
                const resultado = document.getElementById("resultado");
                resultado.appendChild(mapContainer);
                
                console.log("Mapa alternativo mostrado");
                
            } catch (error) {
                console.error("Error mostrando mapa alternativo:", error);
            }
        }

        // ==================== INICIALIZACIÓN ====================

        document.addEventListener('DOMContentLoaded', function() {
            const registroForm = document.getElementById('registroForm');
            const toggleLink = document.getElementById('toggleLink');
            const toggleText = document.getElementById('toggleText');
            const formTitle = document.getElementById('formTitle');
            const submitBtn = document.getElementById('submitBtn');
            const registerFields = document.getElementById('registerFields');
            const messageDiv = document.getElementById('message');
            const loadingDiv = document.getElementById('loading');
            const cerrarSesionBtn = document.getElementById('cerrarSesion');
            
            let isLoginMode = true;
            
            // Verificar si hay un usuario guardado
            const usuarioGuardado = localStorage.getItem('usuario');
            if (usuarioGuardado) {
                const user = JSON.parse(usuarioGuardado);
                mostrarInfoUsuario(user);
                document.getElementById('registroModal').style.display = 'none';
            }

            // Inicializar auto-login
            autoIniciarSesion();
            
            // Crear partículas para el fondo
            crearParticulas();

            // Asociar botón de cerrar sesión
            cerrarSesionBtn.addEventListener('click', cerrarSesion);
            
            // Función para alternar entre login y registro
            toggleLink.addEventListener('click', function(e) {
                e.preventDefault();
                
                isLoginMode = !isLoginMode;
                
                if (isLoginMode) {
                    formTitle.innerHTML = '<i class="fas fa-user-shield"></i> Iniciar Sesión';
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingresar';
                    toggleText.textContent = '¿No tienes una cuenta? ';
                    toggleLink.textContent = 'Regístrate';
                    registerFields.style.display = 'none';
                } else {
                    formTitle.innerHTML = '<i class="fas fa-user-plus"></i> Crear Cuenta';
                    submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Registrarse';
                    toggleText.textContent = '¿Ya tienes una cuenta? ';
                    toggleLink.textContent = 'Inicia Sesión';
                    registerFields.style.display = 'block';
                }
                
                // Limpiar mensajes
                hideMessage();
            });
            
            // Manejar el envío del formulario
            registroForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value;
                
                if (isLoginMode) {
                    // Modo login
                    iniciarSesion();
                } else {
                    // Modo registro
                    const confirmPassword = document.getElementById('confirmPassword').value;
                    
                    if (password !== confirmPassword) {
                        showMessage('Las contraseñas no coinciden', 'error');
                        return;
                    }
                    
                    registerUser(username, password);
                }
            });
            
            // Funciones auxiliares para mostrar/ocultar mensajes y carga
            function showMessage(text, type) {
                messageDiv.textContent = text;
                messageDiv.className = `message ${type}`;
                messageDiv.style.display = 'block';
            }
            
            function hideMessage() {
                messageDiv.style.display = 'none';
            }
            
            function showLoading() {
                loadingDiv.style.display = 'block';
            }
            
            function hideLoading() {
                loadingDiv.style.display = 'none';
            }
            
            // Función para registrar usuario
            async function registerUser(username, password) {
                showLoading();
                hideMessage();
                
                // Obtener la fecha actual
                const now = new Date();
                const fechaRegistro = now.toISOString().split('T')[0];
                const dia = now.getDate();
                
                // Obtener la IP del usuario (simulada para este ejemplo)
                const ip = "192.168.1.1"; // En un caso real, esto vendría de una API de IP
                
                // Datos para enviar a la API
                const userData = {
                    username: username,
                    password: password,
                    ip: ip,
                    fecha_registro: fechaRegistro,
                    dia: dia,
                    saldo: 5,
                    bloqueado_hasta: null,
                    vip: 0
                };
                
                try {
                    const response = await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    
                    const data = await response.json();
                    hideLoading();
                    showMessage('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.', 'success');
                    
                    // Cambiar a modo login después del registro exitoso 
                    isLoginMode = true;
                    formTitle.innerHTML = '<i class="fas fa-user-shield"></i> Iniciar Sesión';
                    submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Ingresar';
                    toggleText.textContent = '¿No tienes una cuenta? ';
                    toggleLink.textContent = 'Regístrate';
                    registerFields.style.display = 'none';
                    
                    // Limpiar formulario
                    registroForm.reset();
                } catch (error) {
                    hideLoading();
                    console.error('Error:', error);
                    showMessage('Error al crear la cuenta. Inténtalo de nuevo.', 'error');
                }
            }
        });

        // Cargar Leaflet cuando se carga la página (pre-cargar para mejor performance)
        document.addEventListener('DOMContentLoaded', function() {
            // Pre-cargar Leaflet en segundo plano
            setTimeout(() => {
                cargarLeaflet().then(() => {
                    console.log("Leaflet pre-cargado correctamente");
                }).catch(error => {
                    console.log("Leaflet no se pudo pre-cargar, se cargará cuando sea necesario");
                });
            }, 1000);
        });
        
        // Añadir estilos CSS para el marcador personalizado
        const style = document.createElement('style');
        style.textContent = `
            .custom-marker {
                background: transparent;
                border: none;
            }
            .leaflet-popup-content {
                font-family: Arial, sans-serif;
            }
            .leaflet-popup-content strong {
                color: var(--dark);
            }
        `;
        document.head.appendChild(style);
