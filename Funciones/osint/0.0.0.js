   // ==================== CONFIGURACIÓN INICIAL ====================
        const API_URL = "https://68643bc188359a373e97e75c.mockapi.io/api/correostemporalweb/userNumer";
        
        // Variable global para controlar si Leaflet está listo
        let leafletReady = false;

        // ==================== INICIALIZACIÓN DE LEAFLET ====================
        function initializeLeaflet() {
            if (typeof L !== 'undefined') {
                leafletReady = true;
                console.log("Leaflet está listo para usar");
            } else {
                console.error("Leaflet no se cargó correctamente");
                // Reintentar después de un tiempo
                setTimeout(initializeLeaflet, 500);
            }
        }

        // ==================== FUNCIONES DE MAPA MEJORADAS ====================
        
        // Función mejorada para obtener coordenadas por código postal
        async function obtenerCoordenadasPorCodigoPostal(codigoPostal, pais) {
            try {
                console.log(`Buscando coordenadas para código postal: ${codigoPostal}, ${pais}`);
                
                // Usar Nominatim (OpenStreetMap) para buscar por código postal
                const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${codigoPostal}&country=${pais}&limit=1`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                console.log("Respuesta de Nominatim:", data);
                
                if (data && data.length > 0) {
                    return {
                        lat: parseFloat(data[0].lat),
                        lon: parseFloat(data[0].lon),
                        displayName: data[0].display_name,
                        boundingbox: data[0].boundingbox
                    };
                } else {
                    console.log("No se encontraron resultados por código postal, buscando por región...");
                    // Si no encuentra por código postal, buscar por nombre de ciudad/región
                    return await obtenerCoordenadasPorRegion(codigoPostal, pais);
                }
            } catch (error) {
                console.error("Error obteniendo coordenadas por código postal:", error);
                return null;
            }
        }
        
        // Función para obtener coordenadas por región/ciudad
        async function obtenerCoordenadasPorRegion(region, pais) {
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(region + ', ' + pais)}&limit=1`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                if (data && data.length > 0) {
                    return {
                        lat: parseFloat(data[0].lat),
                        lon: parseFloat(data[0].lon),
                        displayName: data[0].display_name,
                        boundingbox: data[0].boundingbox
                    };
                }
                return null;
            } catch (error) {
                console.error("Error obteniendo coordenadas por región:", error);
                return null;
            }
        }
        
        // Función para inicializar el mapa con las coordenadas correctas
        async function inicializarMapaConCodigoPostal(codigoPostal, region, pais) {
            try {
                // Esperar a que Leaflet esté listo
                if (!leafletReady) {
                    console.log("Esperando a que Leaflet esté listo...");
                    setTimeout(() => {
                        inicializarMapaConCodigoPostal(codigoPostal, region, pais);
                    }, 500);
                    return;
                }

                // Obtener coordenadas exactas del código postal
                let coordenadas = await obtenerCoordenadasPorCodigoPostal(codigoPostal, pais);
                
                // Si no se encuentran por código postal, intentar por región
                if (!coordenadas) {
                    coordenadas = await obtenerCoordenadasPorRegion(region, pais);
                }
                
                // Si aún no se encuentran, usar coordenadas por defecto de México
                if (!coordenadas) {
                    coordenadas = { 
                        lat: 23.6345, 
                        lon: -102.5528,
                        boundingbox: ['23.0', '24.0', '-103.0', '-102.0']
                    };
                }
                
                console.log("Coordenadas encontradas:", coordenadas);
                
                // Crear o actualizar el mapa
                crearMapaLeaflet(coordenadas, `${codigoPostal}, ${region}, ${pais}`);
                
            } catch (error) {
                console.error("Error inicializando mapa:", error);
                // En caso de error, mostrar mapa alternativo
                mostrarMapaAlternativo(23.6345, -102.5528, "Ubicación aproximada");
            }
        }
        
        // Función para crear el mapa con Leaflet
        function crearMapaLeaflet(coordenadas, ubicacion) {
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
                    <div class="info-header" style="margin-bottom: 15px;">
                        <i class="fas fa-map-marked-alt"></i> 
                        <strong>${tituloMapa}</strong>
                    </div>
                    <div id="leaflet-map"></div>
                    <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--gray);">
                        <i class="fas fa-info-circle"></i> 
                        ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Ubicación basada en código postal'}
                        <br><small>Mapa proporcionado por OpenStreetMap</small>
                    </div>
                `;
                
                // Agregar el mapa al resultado
                const resultado = document.getElementById("resultado");
                resultado.appendChild(mapContainer);
                
                // Inicializar el mapa de Leaflet
                const map = L.map('leaflet-map').setView([coordenadas.lat, coordenadas.lon], 13);
                
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
                const marker = L.marker([coordenadas.lat, coordenadas.lon], { icon: customIcon }).addTo(map);
                
                // Texto del popup
                let popupText = `<strong>${ubicacion}</strong>`;
                if (ubicacion !== 'No disponible') {
                    popupText += `<br><small>Coordenadas: ${coordenadas.lat.toFixed(6)}, ${coordenadas.lon.toFixed(6)}</small>`;
                }
                
                marker.bindPopup(popupText).openPopup();
                
                // Si tenemos bounding box, crear un rectángulo que muestre el área
                if (coordenadas.boundingbox) {
                    const bounds = [
                        [parseFloat(coordenadas.boundingbox[0]), parseFloat(coordenadas.boundingbox[2])],
                        [parseFloat(coordenadas.boundingbox[1]), parseFloat(coordenadas.boundingbox[3])]
                    ];
                    
                    // Crear rectángulo para mostrar el área del código postal
                    const rectangle = L.rectangle(bounds, {
                        color: 'var(--primary)',
                        weight: 2,
                        fillColor: 'var(--primary)',
                        fillOpacity: 0.1
                    }).addTo(map);
                    
                    // Ajustar el mapa para mostrar el rectángulo completo
                    map.fitBounds(bounds);
                } else {
                    // Si no hay bounding box, usar un círculo
                    L.circle([coordenadas.lat, coordenadas.lon], {
                        color: 'var(--primary)',
                        fillColor: 'var(--primary)',
                        fillOpacity: 0.1,
                        radius: 2000 // 2km de radio
                    }).addTo(map);
                }
                
                console.log("Mapa OpenStreetMap inicializado correctamente");
                
            } catch (error) {
                console.error("Error al crear mapa Leaflet:", error);
                mostrarMapaAlternativo(coordenadas.lat, coordenadas.lon, ubicacion);
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
                const zoom = 13;
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
                            <small>Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}</small>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: 10px; font-size: 0.9rem; color: var(--gray);">
                        <i class="fas fa-info-circle"></i> 
                        ${ubicacion === 'No disponible' ? 'Ubicación aproximada basada en el país' : 'Ubicación basada en código postal'}
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
        
        // ==================== FUNCIÓN PARA MOSTRAR RESULTADO MEJORADA ====================
        
        async function mostrarResultado(info) {
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
            
            // Mostrar mapa con las coordenadas correctas basadas en el código postal
            if (info.codigoPostal && info.codigoPostal !== 'No disponible') {
                console.log("Mostrando mapa con código postal:", info.codigoPostal);
                setTimeout(async () => {
                    await inicializarMapaConCodigoPostal(
                        info.codigoPostal, 
                        info.region || 'Desconocido', 
                        info.pais || 'México'
                    );
                }, 500);
            } else if (info.lat && info.lon) {
                // Si no hay código postal pero sí coordenadas, usar esas
                console.log("Mostrando mapa con coordenadas:", info.lat, info.lon);
                setTimeout(() => {
                    if (leafletReady) {
                        crearMapaLeaflet(
                            { lat: info.lat, lon: info.lon }, 
                            info.region || info.pais || 'Ubicación'
                        );
                    }
                }, 500);
            } else {
                console.log("No hay información suficiente para mostrar el mapa");
            }
        }

        // ==================== FUNCIONES RESTANTES ====================
        
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

        // Función para obtener información del teléfono
        async function obtenerInformacionTelefono(numero) {
            // Simulación de obtención de información
            const numeroLimpio = numero.replace(/\s+/g, '').replace('+', '');
            
            // Información de ejemplo para demostración
            const info = {
                numero: numero,
                numeroLimpio: numeroLimpio,
                valido: true,
                tipo: 'Móvil',
                pais: 'México',
                operador: 'Telcel',
                region: 'Victoria, Tamaulipas',
                zonaHoraria: 'America/Mexico_City',
                codigoPostal: '87000', // Código postal de ejemplo
                lat: null,
                lon: null
            };

            return info;
        }

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

            try {
                const info = await obtenerInformacionTelefono(numero);
                mostrarResultado(info);
            } catch (error) {
                resultado.textContent = `Error al obtener información: ${error.message}`;
            } finally {
                restaurarBoton();
            }
        }

        // Función para copiar resultado
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
            });
        }

        // Función para mostrar notificaciones
        function mostrarNotificacion(mensaje, tipo = "success") {
            const notification = document.getElementById("copyNotification");
            
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

        // Crear partículas para el fondo
        function crearParticulas() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                const size = Math.random() * 5 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                particle.style.left = `${Math.random() * 100}vw`;
                
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            crearParticulas();
            initializeLeaflet();
            
            // Simular que el usuario ya está logueado para pruebas
            setTimeout(() => {
                document.getElementById('registroModal').style.display = 'none';
                document.getElementById('nickname').textContent = 'UsuarioDemo';
                document.getElementById('saldo').textContent = '5';
            }, 1000);
        });
