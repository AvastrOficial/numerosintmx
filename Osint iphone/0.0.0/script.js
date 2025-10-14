        // ==================== CONFIGURACIÓN INICIAL ====================
        const API_URL = "Token Privada";
        const TIMEZONE_API_KEY = "Token";
        
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
            const userPanel = document.getElementById('userPanel');
            const userInfo = document.getElementById('userInfo');
            
            userInfo.innerHTML = `
                <p><strong>Usuario:</strong> ${user.username}</p>
                <p><strong>Saldo:</strong> $${user.saldo}</p>
                <p><strong>Estado VIP:</strong> ${user.vip === 1 ? 'Sí' : 'No'}</p>
                <p><strong>Registro:</strong> ${user.fecha_registro}</p>
            `;
            
            userPanel.style.display = 'block';
        }

        // Limpiar información del usuario
        function limpiarInfoUsuario() {
            const userPanel = document.getElementById('userPanel');
            const userInfo = document.getElementById('userInfo');
            
            userInfo.innerHTML = '';
            userPanel.style.display = 'none';
        }

        // Función para mostrar notificación
        function mostrarNotificacion(mensaje, tipo = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = mensaje;
            notification.className = `notification ${tipo}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 4000);
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

        // Función para crear partículas de fondo
        function crearParticulas() {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
        }

        // ==================== INICIALIZACIÓN ====================

       
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
            const userPanel = document.getElementById('userPanel');
            const userInfo = document.getElementById('userInfo');
            
            userInfo.innerHTML = `
                <p><strong>Usuario:</strong> ${user.username}</p>
                <p><strong>Saldo:</strong> $${user.saldo}</p>
                <p><strong>Estado VIP:</strong> ${user.vip === 1 ? 'Sí' : 'No'}</p>
                <p><strong>Registro:</strong> ${user.fecha_registro}</p>
            `;
            
            userPanel.style.display = 'block';
        }

        // Limpiar información del usuario
        function limpiarInfoUsuario() {
            const userPanel = document.getElementById('userPanel');
            const userInfo = document.getElementById('userInfo');
            
            userInfo.innerHTML = '';
            userPanel.style.display = 'none';
        }

        // Función para mostrar notificación
        function mostrarNotificacion(mensaje, tipo = 'success') {
            const notification = document.getElementById('notification');
            notification.textContent = mensaje;
            notification.className = `notification ${tipo}`;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 4000);
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

        // Función para crear partículas de fondo
        function crearParticulas() {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });
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
            const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');
            
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
            const infoMexico = obtenerInfoMexico(numeroLimpio);
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
            const ubicacionInfo = await obtenerInfoUbicacion(info.lat, info.lon);
            if (ubicacionInfo.postal_code && ubicacionInfo.postal_code !== 'No disponible') {
                info.codigoPostal = ubicacionInfo.postal_code;
                info.region = ubicacionInfo.region_code || info.region;
                console.log("Código postal obtenido de ubicación:", ubicacionInfo.postal_code);
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

// Función para obtener información específica de México
function obtenerInfoMexico(numero) {
    const numeroSinPais = numero.substring(2);
    const info = {
        tipo: 'Móvil',
        operador: 'Desconocido',
        region: 'Desconocido',
        zonaHoraria: 'America/Mexico_City',
        codigoPostal: 'No disponible'
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
    }
    
    // Detectar operador en México
    const operador = detectarOperadorMexico(numeroSinPais);
    if (operador) {
        info.operador = operador;
    }
    
    return info;
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
        const apiKey = 'TOKEN';
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
                        codigoPostal: 'No disponible',
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
        const url = `https://phonevalidation.abstractapi.com/v1/?api_key=TOKEN&phone=${encodeURIComponent(numero)}`;

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
        'México': { lat: 23.6345, lon: -102.5528 },
    };
    
    return coordenadasPaises[pais] || null;
}

// ==================== FUNCIONES DE UBICACIÓN ====================
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
        const tzUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=YOUR_API_KEY&format=json&by=position&lat=${lat}&lng=${lon}`;
        
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

// ==================== FUNCIONES DE VISUALIZACIÓN ====================

// ==================== FUNCIONES DE VISUALIZACIÓN ====================

// Función mejorada para mostrar resultados con mapa
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
<div class="info-section">
    <div class="info-header"><i class="fas fa-phone"></i> <strong>NumExtracBsz - Información del Número</strong></div>
    
    <div class="info-item"><i class="fas fa-phone"></i> <strong>Número:</strong> ${info.numero}</div>
    <div class="info-item"><i class="fas fa-check-circle"></i> <strong>¿Válido?:</strong> ${info.valido ? 'Sí' : 'No'}</div>
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
        
        let tituloMapa = 'Mapa de ubicación';
        if (ubicacion && ubicacion !== 'No disponible') {
            tituloMapa = `Mapa - ${ubicacion}`;
        }
        
        mapContainer.innerHTML = `
            <div class="info-header">
                <i class="fas fa-map-marked-alt"></i> 
                <strong>${tituloMapa}</strong>
            </div>
            <div id="leaflet-map" style="height: 300px; width: 100%; border-radius: 8px; z-index: 1;"></div>
            <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: #666;">
                <i class="fas fa-info-circle"></i> 
                ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Área aproximada'}
                <br><small>Mapa proporcionado por OpenStreetMap</small>
            </div>
        `;
        
        // Agregar el mapa al resultado
        const resultado = document.getElementById("resultado");
        const extendedSection = resultado.querySelector('.info-section.extended');
        if (extendedSection) {
            extendedSection.appendChild(mapContainer);
        } else {
            resultado.appendChild(mapContainer);
        }
        
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
            html: '<i class="fas fa-map-marker-alt" style="color: #e74c3c; font-size: 24px;"></i>',
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
            color: '#e74c3c',
            fillColor: '#e74c3c',
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
        
        let tituloMapa = 'Mapa de ubicación';
        if (ubicacion && ubicacion !== 'No disponible') {
            tituloMapa = `Mapa - ${ubicacion}`;
        }
        
        // Usar imagen estática de OpenStreetMap como fallback
        const zoom = 12;
        const size = '600x300';
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&markers=color:red%7C${lat},${lng}&key=AIzaSyDqjFh7hQ3GXj2Q8Q8Q8Q8Q8Q8Q8Q8Q8Q8`;
        
        // Alternativa con OpenStreetMap static (gratuito)
        const osmStaticUrl = `https://static-maps.yandex.ru/1.x/?ll=${lng},${lat}&z=${zoom}&size=600,300&l=map&pt=${lng},${lat},pm2rdl`;
        
        mapContainer.innerHTML = `
            <div class="info-header">
                <i class="fas fa-map-marked-alt"></i> 
                <strong>${tituloMapa}</strong>
            </div>
            <div style="height: 300px; width: 100%; border-radius: 8px; background: #f8f9fa; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <img src="${osmStaticUrl}" 
                     alt="Mapa de ubicación" 
                     style="max-width: 100%; max-height: 100%; border-radius: 8px;"
                     onerror="this.style.display='none'">
                <div style="text-align: center; padding: 20px; color: #666; ${window.innerWidth > 768 ? 'display: none;' : ''}">
                    <i class="fas fa-map-marker-alt" style="color: #e74c3c; font-size: 2rem; margin-bottom: 10px;"></i><br>
                    <strong>${ubicacion}</strong><br>
                    <small>Coordenadas: ${lat.toFixed(4)}, ${lng.toFixed(4)}</small>
                </div>
            </div>
            <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: #666;">
                <i class="fas fa-info-circle"></i> 
                ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Área aproximada'}
            </div>
        `;
        
        // Agregar el mapa al resultado
        const resultado = document.getElementById("resultado");
        const extendedSection = resultado.querySelector('.info-section.extended');
        if (extendedSection) {
            extendedSection.appendChild(mapContainer);
        } else {
            resultado.appendChild(mapContainer);
        }
        
        console.log("Mapa alternativo mostrado");
        
    } catch (error) {
        console.error("Error mostrando mapa alternativo:", error);
    }
}

// ==================== FUNCIONES DE UTILIDAD ====================

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

// Mostrar información del usuario
function mostrarInfoUsuario(user) {
    document.getElementById('nickname').textContent = user.username || 'Usuario';
    document.getElementById('saldo').textContent = user.vip === 1 ? 'INFINITO' : user.saldo;
}

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
        color: #2c3e50;
    }
    .map-container {
        margin-top: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        background: white;
    }
`;
document.head.appendChild(style);
      
        // ==================== FUNCIONES AUXILIARES ====================
        
        // Mostrar información del usuario
        function mostrarInfoUsuario(user) {
            document.getElementById('nickname').textContent = user.username || 'Usuario';
            document.getElementById('saldo').textContent = user.vip === 1 ? 'INFINITO' : user.saldo;
        }

        // Verificar tiempo de espera para recarga de saldo
        async function verificarTiempoEspera(user) {
            const claveTiempo = `ultimoUso_${user.username}`;
            const ahora = Date.now();
            const tiempoGuardado = localStorage.getItem(claveTiempo);

            if (tiempoGuardado) {
                const diferencia = ahora - Number(tiempoGuardado);
                const DOS_HORAS = 2 * 60 * 60 * 1000;

                if (diferencia >= DOS_HORAS) {
                    user.saldo = 5;
                    await fetch(`${API_URL}/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ saldo: 5 })
                    });
                    localStorage.setItem(claveTiempo, ahora.toString());
                }
            } else {
                localStorage.setItem(claveTiempo, ahora.toString());
            }
        }

        // Obtener usuario por IP
        async function obtenerUsuarioPorIP(ip) {
            try {
                const res = await fetch(API_URL);
                const usuarios = await res.json();
                return usuarios.find(u => u.ip === ip) || null;
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
                return null;
            }
        }

        // Obtener usuario por nombre de usuario
        async function obtenerUsuarioPorUsername(username) {
            const usuarios = await fetch(API_URL).then(res => res.json());
            return usuarios.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
        }
