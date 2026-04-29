// ============================================
// DATABASES
// ============================================
const LADA_MEXICO = {
 
};

const CODIGOS_POSTALES = {
 
};

const DESCRIPCION_CP = {
  
};

const OPERADORES = {
 
};

// ============================================
// MATRIX EFFECT
// ============================================
(function initMatrix() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const chars = "01#BSZ>_/\\|OSINT";
  const fs = 13;
  let drops = [];
  
  const reset = () => {
    drops = Array.from({ length: Math.floor(canvas.width / fs) }, () => Math.random() * canvas.height / fs);
  };
  reset();
  window.addEventListener('resize', reset);

  setInterval(() => {
    ctx.fillStyle = 'rgba(249,250,251,0.03)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fs}px monospace`;

    drops.forEach((y, i) => {
      const r = Math.random();
      ctx.fillStyle = r > 0.96 ? '#1e7b6e' : r > 0.7 ? '#cbd5e1' : '#e2e8f0';
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5 + Math.random() * 0.5;
    });
  }, 55);
})();

// ============================================
// HELPERS
// ============================================
function detectarLADA(numero) {
  const n = numero.replace(/\D/g, '');
  let local = n.startsWith('52') ? n.substring(2) : n;
  
  if (local.length >= 3) {
    const k3 = local.substring(0, 3);
    if (LADA_MEXICO[k3]) {
      return { lada: k3, localidad: LADA_MEXICO[k3], encontrado: true };
    }
  }
  if (local.length >= 2) {
    const k2 = local.substring(0, 2);
    if (LADA_MEXICO[k2]) {
      return { lada: k2, localidad: LADA_MEXICO[k2], encontrado: true };
    }
  }
  return { lada: 'N/A', localidad: 'Desconocido', encontrado: false };
}

function obtenerCP(ladaInfo) {
  if (!ladaInfo.encontrado) return { codigo: 'N/A', descripcion: 'No disponible' };
  const cps = CODIGOS_POSTALES[ladaInfo.lada];
  if (!cps || cps.length === 0) return { codigo: 'N/A', descripcion: 'Sin datos' };
  return { codigo: cps[0], descripcion: DESCRIPCION_CP[cps[0]] || cps[0], posibles: cps };
}

function syntaxHighlight(obj) {
  return JSON.stringify(obj, null, 2);
}

function showResult(obj) {
  const placeholder = document.getElementById('placeholderMsg');
  if (placeholder) placeholder.style.display = 'none';
  const resultado = document.getElementById('resultado');
  resultado.style.display = 'block';
  resultado.innerHTML = `<pre style="font-family:monospace;font-size:0.8rem;">${JSON.stringify(obj, null, 2)}</pre>`;
}

function limpiarResultado() {
  const resultado = document.getElementById('resultado');
  resultado.style.display = 'none';
  resultado.innerHTML = '';
  const placeholder = document.getElementById('placeholderMsg');
  if (placeholder) placeholder.style.display = 'flex';
}

function copiarResultado() {
  const texto = document.getElementById('resultado').innerText;
  if (!texto) return;
  navigator.clipboard.writeText(texto).then(() => {
    const notif = document.getElementById('copyNotification');
    notif.classList.add('show');
    setTimeout(() => notif.classList.remove('show'), 2500);
  });
}

// ============================================
// VALIDAR NÚMERO
// ============================================
async function validar() {
  const numero = document.getElementById('numero').value.trim();
  if (!numero) {
    showResult({ error: 'Número no válido', ejemplo: '55 1234 5678' });
    return;
  }

  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (!usuario) {
    showResult({ error: 'Acceso denegado', mensaje: 'Debes iniciar sesión' });
    return;
  }

  const loadingBar = document.getElementById('loadingBar');
  loadingBar.classList.add('active');

  try {
    const ladaInfo = detectarLADA(numero);
    const cpInfo = obtenerCP(ladaInfo);
    const op = OPERADORES.telcel;
    
    const limpio = numero.replace(/\D/g, '');
    const internacional = limpio.startsWith('52') ? `+${limpio}` : `+52${limpio.slice(-10)}`;

    const resultado = {
      "TELEFONO": {
        "numero": numero,
        "internacional": internacional,
        "lada": ladaInfo.lada,
        "localidad": ladaInfo.localidad
      },
      "UBICACION": {
        "codigo_postal": cpInfo.codigo,
        "descripcion": cpInfo.descripcion
      },
      "OPERADOR": {
        "nombre": op.nombre,
        "tecnologia": op.tecnologia
      },
      "METADATA": {
        "timestamp": new Date().toLocaleString('es-MX'),
        "analista": usuario.username,
        "saldo_restante": usuario.vip === 1 ? "∞" : (usuario.saldo - 1).toFixed(2)
      }
    };

    showResult(resultado);
    
    if (usuario.vip !== 1) {
      usuario.saldo -= 1;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      mostrarUsuario(usuario);
    }
  } catch (error) {
    showResult({ error: 'Error al procesar', mensaje: error.message });
  } finally {
    loadingBar.classList.remove('active');
  }
}

// ============================================
// AUTHENTICATION
// ============================================
const API_URL = "https://68643bc188359a373e97e75c.mockapi.io/api/correostemporalweb/userNumer";
let activeTab = 'login';

function switchTab(tab) {
  activeTab = tab;
  const tabLogin = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  if (tabLogin) tabLogin.classList.toggle('active', tab === 'login');
  if (tabRegister) tabRegister.classList.toggle('active', tab === 'register');
}

async function handleAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  if (!username || !password) {
    alert('Completa todos los campos');
    return;
  }
  
  if (activeTab === 'login') {
    await iniciarSesion();
  } else {
    await registrarUsuario();
  }
}

async function iniciarSesion() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    
    const user = users.find(u => 
      u.username.toLowerCase() === username.toLowerCase() && 
      u.password === password
    );
    
    if (user) {
      localStorage.setItem('usuario', JSON.stringify(user));
      document.getElementById('registroModal').style.display = 'none';
      mostrarUsuario(user);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

async function registrarUsuario() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  
  const nuevoUsuario = {
    username: username,
    password: password,
    saldo: 5,
    vip: 0,
    fecha_registro: new Date().toISOString()
  };
  
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoUsuario)
    });
    
    if (response.ok) {
      const user = await response.json();
      localStorage.setItem('usuario', JSON.stringify(user));
      document.getElementById('registroModal').style.display = 'none';
      mostrarUsuario(user);
      alert('Registro exitoso! Bienvenido ' + username);
    } else {
      alert('Error al registrar usuario');
    }
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuario');
  document.getElementById('registroModal').style.display = 'flex';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('nickname').textContent = '— Invitado —';
  document.getElementById('saldo').textContent = '0.00';
}

function mostrarUsuario(user) {
  document.getElementById('nickname').textContent = user.username || 'Usuario';
  document.getElementById('saldo').textContent = user.vip === 1 ? '∞' : (user.saldo || 0).toFixed(2);
}

// ============================================
// IP FUNCTIONS
// ============================================
async function obtenerIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '0.0.0.0';
  }
}

function toggleIp() {
  const ipElement = document.getElementById('ip');
  const eyeIcon = document.getElementById('eyeIcon');
  if (ipElement.textContent === '***.***.*.**') {
    ipElement.textContent = ipElement.dataset.realip;
    eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    ipElement.textContent = '***.***.*.**';
    eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ============================================
// INIT
// ============================================
document.addEventListener('DOMContentLoaded', async () => {
  const ip = await obtenerIP();
  const ipElement = document.getElementById('ip');
  ipElement.dataset.realip = ip;
  
  const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (usuario) {
    document.getElementById('registroModal').style.display = 'none';
    mostrarUsuario(usuario);
  }
});

// Exponer funciones globales
window.validar = validar;
window.handleAuth = handleAuth;
window.switchTab = switchTab;
window.cerrarSesion = cerrarSesion;
window.toggleIp = toggleIp;
window.toggleSidebar = toggleSidebar;
window.copiarResultado = copiarResultado;
window.limpiarResultado = limpiarResultado;
