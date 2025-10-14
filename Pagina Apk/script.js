    // Crear partículas de fondo
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Tamaño aleatorio
                const size = Math.random() * 10 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Posición aleatoria
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                
                // Retraso de animación aleatorio
                particle.style.animationDelay = `${Math.random() * 15}s`;
                
                // Color aleatorio dentro de la paleta
                const colors = ['#3E2723', '#5D4037', '#D7CCC8'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = randomColor;
                
                particlesContainer.appendChild(particle);
            }
        }
        
        // Crear líneas de conexión animadas
        function createConnectionLines() {
            const linesContainer = document.getElementById('connectionLines');
            const lineCount = 15;
            
            for (let i = 0; i < lineCount; i++) {
                const line = document.createElement('div');
                line.classList.add('line');
                
                // Grosor aleatorio
                const height = Math.random() * 2 + 1;
                line.style.height = `${height}px`;
                
                // Ancho aleatorio
                const width = Math.random() * 30 + 10;
                line.style.width = `${width}%`;
                
                // Posición vertical aleatoria
                line.style.top = `${Math.random() * 100}%`;
                
                // Retraso de animación aleatorio
                line.style.animationDelay = `${Math.random() * 10}s`;
                
                // Duración de animación aleatoria
                line.style.animationDuration = `${Math.random() * 10 + 10}s`;
                
                linesContainer.appendChild(line);
            }
        }
        
        // Crear puntos animados para móvil
        function createMobileDots() {
            if (window.innerWidth >= 768) return;
            
            const dotsContainer = document.getElementById('mobileDots');
            const dotCount = 20;
            
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('mobile-dot');
                
                // Tamaño aleatorio
                const size = Math.random() * 8 + 4;
                dot.style.width = `${size}px`;
                dot.style.height = `${size}px`;
                
                // Posición aleatoria
                dot.style.left = `${Math.random() * 100}%`;
                dot.style.top = `${Math.random() * 100}%`;
                
                // Retraso de animación aleatorio
                dot.style.animationDelay = `${Math.random() * 8}s`;
                
                // Duración de animación aleatoria
                dot.style.animationDuration = `${Math.random() * 5 + 5}s`;
                
                dotsContainer.appendChild(dot);
            }
        }
        
        // Ocultar loader después de cargar la página
        window.addEventListener('load', function() {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 1500);
            
            createParticles();
            createConnectionLines();
            createMobileDots();
        });
        
        // Efecto de conexión entre botones en escritorio
        function updateConnection() {
            const connection = document.getElementById('connection');
            if (window.innerWidth >= 768) {
                connection.style.display = 'block';
            } else {
                connection.style.display = 'none';
            }
        }
        
        window.addEventListener('resize', function() {
            updateConnection();
            // Recrear puntos móviles si cambia el tamaño de la ventana
            const mobileDots = document.getElementById('mobileDots');
            mobileDots.innerHTML = '';
            createMobileDots();
        });
        
        updateConnection();
