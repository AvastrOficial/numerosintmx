   document.addEventListener('DOMContentLoaded', function() {
      // Elementos del DOM
      const inicioLink = document.querySelector('a[data-section="inicio"]');
      const tiendaLink = document.querySelector('a[data-section="tienda"]');
      const faqLink = document.querySelector('a[data-section="faq"]');
      const inicioContent = document.getElementById('inicio-content');
      const tiendaContent = document.getElementById('tienda-content');
      const faqContent = document.getElementById('faq-content');
      const sidebarLinks = document.querySelectorAll('.sidebar-links a');
      const buyButtons = document.querySelectorAll('.btn-buy');
      
      // Función para cambiar entre secciones
      function showSection(section) {
        // Ocultar todo el contenido
        inicioContent.style.display = 'none';
        tiendaContent.style.display = 'none';
        faqContent.style.display = 'none';
        
        // Mostrar la sección seleccionada
        if (section === 'inicio') {
          inicioContent.style.display = 'block';
        } else if (section === 'tienda') {
          tiendaContent.style.display = 'block';
        } else if (section === 'faq') {
          faqContent.style.display = 'block';
        }
        
        // Actualizar clases activas
        sidebarLinks.forEach(link => {
          if (link.getAttribute('data-section') === section) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
      
      // Event listeners para los enlaces
      inicioLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('inicio');
      });
      
      tiendaLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('tienda');
      });
      
      faqLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('faq');
      });
      
      // Event listeners para botones de compra
      buyButtons.forEach(button => {
        button.addEventListener('click', function() {
          const planName = this.closest('.plan-card').querySelector('.plan-name').textContent;
          alert(`¡Gracias por tu interés en el ${planName}! Serás redirigido al proceso de pago.`);
          // Aquí iría la lógica real de redirección al proceso de pago
        });
      });
      
      // Inicializar con la sección de inicio visible
      showSection('inicio');
      
      // Crear partículas para el fondo
      const particlesContainer = document.getElementById('particles-container');
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
        
        particlesContainer.appendChild(particle);
      }
    });
