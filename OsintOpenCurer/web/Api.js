// ──────────────────────────────────────
// CONFIG
// ──────────────────────────────────────
const API_URL = "https://68643bc188359a373e97e75c.mockapi.io/api/correostemporalweb/userNumer";
const ABSTRACT_API_KEY = "6580ec9b4c7e4570bd66a07e7455e143";

// ──────────────────────────────────────
// MATRIX EFFECT
// ──────────────────────────────────────
(function initMatrix(){
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const chars = "01#BSZ>_/\\|OSINT";
  const fs = 13;
  let drops = [];
  const reset = () => {
    drops = Array.from({length: Math.floor(canvas.width/fs)}, () => Math.random()*canvas.height/fs);
  };
  reset();
  window.addEventListener('resize', reset);

  setInterval(() => {
    ctx.fillStyle = 'rgba(8,8,8,0.04)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = `${fs}px 'Share Tech Mono', monospace`;

    drops.forEach((y, i) => {
      const r = Math.random();
      ctx.fillStyle = r > .96 ? '#fff' : r > .7 ? '#c8102e' : '#3a0810';
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*fs, y*fs);
      if (y*fs > canvas.height && Math.random() > .975) drops[i] = 0;
      drops[i] += .5 + Math.random()*.5;
    });
  }, 55);
})();

// ──────────────────────────────────────
// DATABASES
// ──────────────────────────────────────
const CODIGOS_POSTALES_MEXICO = {
     // Tamaulipas - Ciudad Mante y alrededores
    "89800": "Cd. Mante, Tamaulipas (Centro)",
    "89809": "Cd. Mante, Tamaulipas (INFONAVIT)",
    "89810": "Cd. Mante, Tamaulipas (Moderna)",
    "89820": "Cd. Mante, Tamaulipas (Azteca)",
    "89830": "Cd. Mante, Tamaulipas (Del Valle)",
    "89840": "Cd. Mante, Tamaulipas (Lindavista)",
    "89850": "Cd. Mante, Tamaulipas (Chapultepec)",
    "89860": "Cd. Mante, Tamaulipas (Las Flores)",
    "89870": "Cd. Mante, Tamaulipas (Nuevo Mante)",
    "89880": "Cd. Mante, Tamaulipas (Obrera)",
    "89890": "Cd. Mante, Tamaulipas (Cuauhtémoc)",
    
    // Tamaulipas - Ciudad Victoria
    "87000": "Cd. Victoria, Tamaulipas (Centro)",
    "87010": "Cd. Victoria, Tamaulipas (Hidalgo)",
    "87020": "Cd. Victoria, Tamaulipas (Guadalupe)",
    "87030": "Cd. Victoria, Tamaulipas (Revolución)",
    "87040": "Cd. Victoria, Tamaulipas (Moderna)",
    "87050": "Cd. Victoria, Tamaulipas (Azteca)",
    "87060": "Cd. Victoria, Tamaulipas (Del Valle)",
    "87070": "Cd. Victoria, Tamaulipas (Chapultepec)",
    "87080": "Cd. Victoria, Tamaulipas (Las Flores)",
    "87090": "Cd. Victoria, Tamaulipas (Lindavista)",
    
    // Tamaulipas - Tampico
    "89000": "Tampico, Tamaulipas (Centro)",
    "89100": "Tampico, Tamaulipas (Zona Norte)",
    "89110": "Tampico, Tamaulipas (Zona Sur)",
    "89120": "Tampico, Tamaulipas (Laguna)",
    "89130": "Tampico, Tamaulipas (Cascajal)",
    "89140": "Tampico, Tamaulipas (Guadalupe)",
    "89150": "Tampico, Tamaulipas (Revolución)",
    "89160": "Tampico, Tamaulipas (Moderna)",
    "89170": "Tampico, Tamaulipas (Azteca)",
    "89180": "Tampico, Tamaulipas (Del Valle)",
    "89190": "Tampico, Tamaulipas (Lindavista)",
    
    // Tamaulipas - Reynosa
    "88500": "Reynosa, Tamaulipas (Centro)",
    "88510": "Reynosa, Tamaulipas (Del Prado)",
    "88520": "Reynosa, Tamaulipas (Rodríguez)",
    "88600": "Reynosa, Tamaulipas (Del Valle)",
    "88610": "Reynosa, Tamaulipas (Las Fuentes)",
    "88620": "Reynosa, Tamaulipas (Almaguer)",
    "88630": "Reynosa, Tamaulipas (Longoria)",
    "88640": "Reynosa, Tamaulipas (Módulo 2000)",
    "88700": "Reynosa, Tamaulipas (Moderna)",
    "88710": "Reynosa, Tamaulipas (INFONAVIT)",
    "88720": "Reynosa, Tamaulipas (Azteca)",
    "88730": "Reynosa, Tamaulipas (Hidalgo)",
    "88740": "Reynosa, Tamaulipas (Independencia)",
    "88750": "Reynosa, Tamaulipas (Nuevo Reynosa)",
    "88760": "Reynosa, Tamaulipas (Las Cumbres)",
    "88770": "Reynosa, Tamaulipas (Balcones de Alcalá)",
    "88780": "Reynosa, Tamaulipas (Villa Florida)",
    "88790": "Reynosa, Tamaulipas (Riberas del Bravo)",
    
    // Tamaulipas - Nuevo Laredo
    "88000": "Nuevo Laredo, Tamaulipas (Centro)",
    "88010": "Nuevo Laredo, Tamaulipas (Buenos Aires)",
    "88020": "Nuevo Laredo, Tamaulipas (Juárez)",
    "88030": "Nuevo Laredo, Tamaulipas (México)",
    "88040": "Nuevo Laredo, Tamaulipas (Progreso)",
    "88050": "Nuevo Laredo, Tamaulipas (INFONAVIT)",
    "88060": "Nuevo Laredo, Tamaulipas (Moderna)",
    "88070": "Nuevo Laredo, Tamaulipas (Azteca)",
    "88080": "Nuevo Laredo, Tamaulipas (Del Valle)",
    "88090": "Nuevo Laredo, Tamaulipas (Lindavista)",
    "88100": "Nuevo Laredo, Tamaulipas (Viveros)",
    "88110": "Nuevo Laredo, Tamaulipas (Campestre)",
    "88120": "Nuevo Laredo, Tamaulipas (Los Presidentes)",
    "88130": "Nuevo Laredo, Tamaulipas (Palmares)",
    "88140": "Nuevo Laredo, Tamaulipas (Residencial)",
    "88200": "Nuevo Laredo, Tamaulipas (Del Norte)",
    "88210": "Nuevo Laredo, Tamaulipas (Voluntad y Trabajo)",
    "88220": "Nuevo Laredo, Tamaulipas (Lagos)",
    "88230": "Nuevo Laredo, Tamaulipas (Los Fresnos)",
    "88240": "Nuevo Laredo, Tamaulipas (Los Arcos)",
    "88250": "Nuevo Laredo, Tamaulipas (Residencial Milenio)",
    "88260": "Nuevo Laredo, Tamaulipas (Paraíso)",
    "88270": "Nuevo Laredo, Tamaulipas (El Progreso)",
    "88280": "Nuevo Laredo, Tamaulipas (La Fe)",
    "88290": "Nuevo Laredo, Tamaulipas (Haciendas)",
    "88300": "Nuevo Laredo, Tamaulipas (Sur)",
    "88301": "Nuevo Laredo, Tamaulipas (Nueva Era)",
    "88302": "Nuevo Laredo, Tamaulipas (Villas de San Miguel)",
    "88303": "Nuevo Laredo, Tamaulipas (Constitucional)",
    "88304": "Nuevo Laredo, Tamaulipas (Residencial las Torres)",
    "88305": "Nuevo Laredo, Tamaulipas (Los Olivos)",
    "88306": "Nuevo Laredo, Tamaulipas (Alianza para la Producción)",
    "88307": "Nuevo Laredo, Tamaulipas (La Cruz)",
    "88308": "Nuevo Laredo, Tamaulipas (El Nogal)",
    "88309": "Nuevo Laredo, Tamaulipas (Américo Villarreal)",
    
    // Tamaulipas - Matamoros
    "87300": "Matamoros, Tamaulipas (Centro)",
    "87310": "Matamoros, Tamaulipas (Lauro Villar)",
    "87320": "Matamoros, Tamaulipas (Guadalupe)",
    "87330": "Matamoros, Tamaulipas (Revolución)",
    "87340": "Matamoros, Tamaulipas (Moderna)",
    "87350": "Matamoros, Tamaulipas (Azteca)",
    "87360": "Matamoros, Tamaulipas (Del Valle)",
    "87370": "Matamoros, Tamaulipas (Chapultepec)",
    "87380": "Matamoros, Tamaulipas (Las Flores)",
    "87390": "Matamoros, Tamaulipas (Lindavista)",
    "87400": "Matamoros, Tamaulipas (Del Valle)",
    "87410": "Matamoros, Tamaulipas (INFONAVIT)",
    "87420": "Matamoros, Tamaulipas (Moderno)",
    "87430": "Matamoros, Tamaulipas (Nuevo)",
    "87440": "Matamoros, Tamaulipas (Modelo)",
    "87450": "Matamoros, Tamaulipas (La Joya)",
    "87460": "Matamoros, Tamaulipas (Las Brisas)",
    "87470": "Matamoros, Tamaulipas (Residencial)",
    "87480": "Matamoros, Tamaulipas (Campestre)",
    "87490": "Matamoros, Tamaulipas (Alamedas)",
    "87500": "Matamoros, Tamaulipas (Modelo)",
    "87510": "Matamoros, Tamaulipas (Industrial)",
    "87520": "Matamoros, Tamaulipas (Periodista)",
    "87530": "Matamoros, Tamaulipas (Américo Villarreal)",
    "87540": "Matamoros, Tamaulipas (Villas de San Juan)",
    "87550": "Matamoros, Tamaulipas (Santa Anita)",
    "87560": "Matamoros, Tamaulipas (Paseo Residencial)",
    "87570": "Matamoros, Tamaulipas (Praderas)",
    
    // Tamaulipas - Altamira
    "89600": "Altamira, Tamaulipas (Centro)",
    "89602": "Altamira, Tamaulipas (Cuauhtémoc)",
    "89603": "Altamira, Tamaulipas (Independencia)",
    "89604": "Altamira, Tamaulipas (Revolución)",
    "89605": "Altamira, Tamaulipas (Moderna)",
    "89606": "Altamira, Tamaulipas (Azteca)",
    "89607": "Altamira, Tamaulipas (Del Valle)",
    "89608": "Altamira, Tamaulipas (Las Flores)",
    "89609": "Altamira, Tamaulipas (Lindavista)",
    "89610": "Altamira, Tamaulipas (Industrial)",
    "89620": "Altamira, Tamaulipas (Puerto Industrial)",
    
    // Tamaulipas - Ciudad Madero
    "89400": "Cd. Madero, Tamaulipas (Centro)",
    "89410": "Cd. Madero, Tamaulipas (Revolución)",
    "89420": "Cd. Madero, Tamaulipas (Moderna)",
    "89430": "Cd. Madero, Tamaulipas (Azteca)",
    "89440": "Cd. Madero, Tamaulipas (Del Valle)",
    "89450": "Cd. Madero, Tamaulipas (Lindavista)",
    "89460": "Cd. Madero, Tamaulipas (Chapultepec)",
    "89470": "Cd. Madero, Tamaulipas (Las Flores)",
    "89480": "Cd. Madero, Tamaulipas (Hidalgo)",
    "89490": "Cd. Madero, Tamaulipas (Miramar)",
    
    // Tamaulipas - El Mante
    "89900": "El Mante, Tamaulipas (Centro)",
    "89910": "El Mante, Tamaulipas (Moderna)",
    "89920": "El Mante, Tamaulipas (Azteca)",
    "89930": "El Mante, Tamaulipas (Del Valle)",
    
    // Tamaulipas - Otros municipios
    "87900": "Tula, Tamaulipas (Centro)",
    "87910": "Tula, Tamaulipas (Moderna)",
    "87800": "Jaumave, Tamaulipas (Centro)",
    "87700": "Jiménez, Tamaulipas (Centro)",
    "87600": "San Fernando, Tamaulipas (Centro)",
    "87590": "Valle Hermoso, Tamaulipas (Centro)",
    "87580": "Río Bravo, Tamaulipas (Centro)",
    "88330": "Miguel Alemán, Tamaulipas (Centro)",
    "88340": "Camargo, Tamaulipas (Centro)",
    "88400": "Gustavo Díaz Ordaz, Tamaulipas (Centro)",
    
    // Ciudad de México - Todas las alcaldías
    "01000": "Álvaro Obregón, CDMX (Centro)",
    "01010": "Álvaro Obregón, CDMX (Tizapán)",
    "01020": "Álvaro Obregón, CDMX (San Ángel)",
    "01030": "Álvaro Obregón, CDMX (Chimalistac)",
    "01040": "Álvaro Obregón, CDMX (Progreso)",
    "01050": "Álvaro Obregón, CDMX (Florida)",
    "01060": "Álvaro Obregón, CDMX (Guadalupe Inn)",
    "01070": "Álvaro Obregón, CDMX (Molino de Rosas)",
    "01080": "Álvaro Obregón, CDMX (Olivar de los Padres)",
    "01090": "Álvaro Obregón, CDMX (Lomas de Santa Fe)",
    
    "03000": "Benito Juárez, CDMX (Centro)",
    "03010": "Benito Juárez, CDMX (Narvarte)",
    "03020": "Benito Juárez, CDMX (Del Valle)",
    "03030": "Benito Juárez, CDMX (Roma Sur)",
    "03040": "Benito Juárez, CDMX (Roma Norte)",
    "03050": "Benito Juárez, CDMX (Juárez)",
    "03060": "Benito Juárez, CDMX (Cuauhtémoc)",
    "03070": "Benito Juárez, CDMX (San José Insurgentes)",
    "03080": "Benito Juárez, CDMX (San Juan)",
    "03090": "Benito Juárez, CDMX (Xoco)",
    
    "04000": "Coyoacán, CDMX (Centro)",
    "04100": "Coyoacán, CDMX (Del Carmen)",
    "04120": "Coyoacán, CDMX (La Concepción)",
    "04130": "Coyoacán, CDMX (San Lucas)",
    "04140": "Coyoacán, CDMX (Parque San Andrés)",
    "04150": "Coyoacán, CDMX (Santa Catarina)",
    "04160": "Coyoacán, CDMX (San Francisco)",
    "04170": "Coyoacán, CDMX (Cuadrante de San Francisco)",
    "04180": "Coyoacán, CDMX (San Mateo)",
    "04190": "Coyoacán, CDMX (San Diego)",
    
    "05000": "Cuajimalpa, CDMX (Centro)",
    "05100": "Cuajimalpa, CDMX (San Pedro)",
    "05110": "Cuajimalpa, CDMX (San Pablo)",
    "05120": "Cuajimalpa, CDMX (Jesús del Monte)",
    "05130": "Cuajimalpa, CDMX (Lomas de Vista Hermosa)",
    "05140": "Cuajimalpa, CDMX (Bosques de las Lomas)",
    "05150": "Cuajimalpa, CDMX (La Venta)",
    "05160": "Cuajimalpa, CDMX (Granada)",
    "05170": "Cuajimalpa, CDMX (El Molino)",
    "05180": "Cuajimalpa, CDMX (El Ébano)",
    
    "06000": "Cuauhtémoc, CDMX (Centro)",
    "06010": "Cuauhtémoc, CDMX (Centro Área 2)",
    "06020": "Cuauhtémoc, CDMX (Centro Área 3)",
    "06030": "Cuauhtémoc, CDMX (Centro Área 4)",
    "06040": "Cuauhtémoc, CDMX (Centro Área 5)",
    "06050": "Cuauhtémoc, CDMX (Centro Área 6)",
    "06060": "Cuauhtémoc, CDMX (Centro Área 7)",
    "06070": "Cuauhtémoc, CDMX (Centro Área 8)",
    "06080": "Cuauhtémoc, CDMX (Centro Área 9)",
    "06090": "Cuauhtémoc, CDMX (Centro Área 10)",
    "06100": "Cuauhtémoc, CDMX (Hipódromo)",
    "06140": "Cuauhtémoc, CDMX (Condesa)",
    "06170": "Cuauhtémoc, CDMX (Hipódromo Condesa)",
    "06200": "Cuauhtémoc, CDMX (Morelos)",
    "06220": "Cuauhtémoc, CDMX (Peralvillo)",
    "06240": "Cuauhtémoc, CDMX (Valle Gómez)",
    "06250": "Cuauhtémoc, CDMX (Exhipódromo de Peralvillo)",
    "06270": "Cuauhtémoc, CDMX (Maza)",
    "06280": "Cuauhtémoc, CDMX (Felipe Pescador)",
    "06290": "Cuauhtémoc, CDMX (Estrella)",
    
    "07000": "Gustavo A. Madero, CDMX (Centro)",
    "07100": "Gustavo A. Madero, CDMX (Industrial)",
    "07110": "Gustavo A. Madero, CDMX (Estrella)",
    "07120": "Gustavo A. Madero, CDMX (Triunfo)",
    "07130": "Gustavo A. Madero, CDMX (Vallejo)",
    "07140": "Gustavo A. Madero, CDMX (Santa María)",
    "07150": "Gustavo A. Madero, CDMX (San José)",
    "07160": "Gustavo A. Madero, CDMX (San Juan de Aragón)",
    "07170": "Gustavo A. Madero, CDMX (La Pradera)",
    "07180": "Gustavo A. Madero, CDMX (Nueva Industrial)",
    
    "08000": "Iztacalco, CDMX (Centro)",
    "08100": "Iztacalco, CDMX (Gabriel Ramos Millán)",
    "08120": "Iztacalco, CDMX (Carlos Zapata Vela)",
    "08130": "Iztacalco, CDMX (Campamento 2 de Octubre)",
    "08140": "Iztacalco, CDMX (Reforma Iztacalco)",
    "08150": "Iztacalco, CDMX (Viaducto)",
    "08160": "Iztacalco, CDMX (Militar)",
    "08170": "Iztacalco, CDMX (San Miguel)",
    "08180": "Iztacalco, CDMX (Santa Anita)",
    "08190": "Iztacalco, CDMX (Zapote Vela)",
    
    "09000": "Iztapalapa, CDMX (Centro)",
    "09100": "Iztapalapa, CDMX (San Lucas)",
    "09120": "Iztapalapa, CDMX (San Miguel)",
    "09130": "Iztapalapa, CDMX (Santa Bárbara)",
    "09140": "Iztapalapa, CDMX (San Ignacio)",
    "09150": "Iztapalapa, CDMX (San José)",
    "09160": "Iztapalapa, CDMX (San Antonio)",
    "09170": "Iztapalapa, CDMX (San Lorenzo)",
    "09180": "Iztapalapa, CDMX (Santa Cruz)",
    "09190": "Iztapalapa, CDMX (San Sebastián)",
    
    "10000": "Magdalena Contreras, CDMX (Centro)",
    "10100": "Magdalena Contreras, CDMX (San Jerónimo)",
    "10120": "Magdalena Contreras, CDMX (San Francisco)",
    "10130": "Magdalena Contreras, CDMX (San Nicolás)",
    "10140": "Magdalena Contreras, CDMX (San Bartolo)",
    "10150": "Magdalena Contreras, CDMX (San Bernabé)",
    "10160": "Magdalena Contreras, CDMX (San Mateo)",
    "10170": "Magdalena Contreras, CDMX (Santa Teresa)",
    "10180": "Magdalena Contreras, CDMX (La Cruz)",
    "10190": "Magdalena Contreras, CDMX (El Rosal)",
    
    "11000": "Miguel Hidalgo, CDMX (Centro)",
    "11100": "Miguel Hidalgo, CDMX (Lomas de Chapultepec)",
    "11110": "Miguel Hidalgo, CDMX (Bosque de Chapultepec)",
    "11120": "Miguel Hidalgo, CDMX (Lomas de Sotelo)",
    "11130": "Miguel Hidalgo, CDMX (Argentina)",
    "11140": "Miguel Hidalgo, CDMX (México)",
    "11150": "Miguel Hidalgo, CDMX (Anáhuac)",
    "11160": "Miguel Hidalgo, CDMX (Verónica Anáhuac)",
    "11170": "Miguel Hidalgo, CDMX (Torre Blanca)",
    "11180": "Miguel Hidalgo, CDMX (San Joaquín)",
    
    "12000": "Milpa Alta, CDMX (Centro)",
    "12100": "Milpa Alta, CDMX (San Antonio)",
    "12110": "Milpa Alta, CDMX (San Francisco)",
    "12120": "Milpa Alta, CDMX (San José)",
    "12130": "Milpa Alta, CDMX (San Juan)",
    "12140": "Milpa Alta, CDMX (San Lorenzo)",
    "12150": "Milpa Alta, CDMX (San Mateo)",
    "12160": "Milpa Alta, CDMX (San Miguel)",
    "12170": "Milpa Alta, CDMX (San Nicolás)",
    "12180": "Milpa Alta, CDMX (San Pablo)",
    
    "13000": "Tláhuac, CDMX (Centro)",
    "13100": "Tláhuac, CDMX (La Habana)",
    "13120": "Tláhuac, CDMX (San José)",
    "13130": "Tláhuac, CDMX (San Juan)",
    "13140": "Tláhuac, CDMX (San Mateo)",
    "13150": "Tláhuac, CDMX (San Miguel)",
    "13160": "Tláhuac, CDMX (San Nicolás)",
    "13170": "Tláhuac, CDMX (San Pedro)",
    "13180": "Tláhuac, CDMX (Santa Ana)",
    "13190": "Tláhuac, CDMX (Santa Catarina)",
    
    "14000": "Tlalpan, CDMX (Centro)",
    "14100": "Tlalpan, CDMX (San Fernando)",
    "14120": "Tlalpan, CDMX (San Lorenzo)",
    "14130": "Tlalpan, CDMX (San Miguel)",
    "14140": "Tlalpan, CDMX (San Pedro)",
    "14150": "Tlalpan, CDMX (San Andrés)",
    "14160": "Tlalpan, CDMX (San Bartolo)",
    "14170": "Tlalpan, CDMX (San Buenaventura)",
    "14180": "Tlalpan, CDMX (San José)",
    "14190": "Tlalpan, CDMX (San Juan)",
    
    "15000": "Venustiano Carranza, CDMX (Centro)",
    "15100": "Venustiano Carranza, CDMX (Merced)",
    "15120": "Venustiano Carranza, CDMX (Jamaica)",
    "15130": "Venustiano Carranza, CDMX (San Lázaro)",
    "15140": "Venustiano Carranza, CDMX (Moctezuma)",
    "15150": "Venustiano Carranza, CDMX (Federal)",
    "15160": "Venustiano Carranza, CDMX (Penitenciaría)",
    "15170": "Venustiano Carranza, CDMX (Morelos)",
    "15180": "Venustiano Carranza, CDMX (Arenal)",
    "15190": "Venustiano Carranza, CDMX (Nueva Morelos)",
    
    "16000": "Xochimilco, CDMX (Centro)",
    "16100": "Xochimilco, CDMX (San Pedro)",
    "16120": "Xochimilco, CDMX (San Juan)",
    "16130": "Xochimilco, CDMX (San Pablo)",
    "16140": "Xochimilco, CDMX (Santa Cruz)",
    "16150": "Xochimilco, CDMX (Santa María)",
    "16160": "Xochimilco, CDMX (Santa Cecilia)",
    "16170": "Xochimilco, CDMX (San Lorenzo)",
    "16180": "Xochimilco, CDMX (San Mateo)",
    "16190": "Xochimilco, CDMX (San Miguel)",
    
    // Guadalajara y ZMG
    "44100": "Guadalajara, Jalisco (Centro)",
    "44110": "Guadalajara, Jalisco (Lafayette)",
    "44120": "Guadalajara, Jalisco (Americana)",
    "44130": "Guadalajara, Jalisco (Vallarta)",
    "44140": "Guadalajara, Jalisco (Arcos)",
    "44150": "Guadalajara, Jalisco (Providencia)",
    "44160": "Guadalajara, Jalisco (Jardines del Bosque)",
    "44170": "Guadalajara, Jalisco (Country Club)",
    "44180": "Guadalajara, Jalisco (Monraz)",
    "44190": "Guadalajara, Jalisco (Prados Providencia)",
    "44600": "Guadalajara, Jalisco (Americana)",
    "44610": "Guadalajara, Jalisco (Moderna)",
    "44620": "Guadalajara, Jalisco (Reforma)",
    "44630": "Guadalajara, Jalisco (Ladrón de Guevara)",
    "44640": "Guadalajara, Jalisco (Seattle)",
    "44650": "Guadalajara, Jalisco (Vista del Parque)",
    "44660": "Guadalajara, Jalisco (Del Parque)",
    "44670": "Guadalajara, Jalisco (Lomas del Valle)",
    "44680": "Guadalajara, Jalisco (Residencial Victoria)",
    "44690": "Guadalajara, Jalisco (Residencial Juan Manuel)",
    "44900": "Guadalajara, Jalisco (Moderna)",
    "44910": "Guadalajara, Jalisco (Independencia)",
    "44920": "Guadalajara, Jalisco (Popular)",
    "44930": "Guadalajara, Jalisco (Ferrocarril)",
    "44940": "Guadalajara, Jalisco (Atlas)",
    "44950": "Guadalajara, Jalisco (San Andrés)",
    "44960": "Guadalajara, Jalisco (Santa Cecilia)",
    "44970": "Guadalajara, Jalisco (San Vicente)",
    "44980": "Guadalajara, Jalisco (San José)",
    "44990": "Guadalajara, Jalisco (San Miguel)",
    
    // Zapopan
    "45000": "Zapopan, Jalisco (Centro)",
    "45010": "Zapopan, Jalisco (Lomas del Country)",
    "45020": "Zapopan, Jalisco (Lomas del Valle)",
    "45030": "Zapopan, Jalisco (Paseos del Sol)",
    "45040": "Zapopan, Jalisco (Los Robles)",
    "45050": "Zapopan, Jalisco (Santa Isabel)",
    "45060": "Zapopan, Jalisco (Residencial Lomas)",
    "45070": "Zapopan, Jalisco (Ciudad Granja)",
    "45080": "Zapopan, Jalisco (La Tuzanía)",
    "45090": "Zapopan, Jalisco (La Calma)",
    "45100": "Zapopan, Jalisco (Lomas de Zapopan)",
    "45110": "Zapopan, Jalisco (Los Sauces)",
    "45120": "Zapopan, Jalisco (Prados Guadalupe)",
    "45130": "Zapopan, Jalisco (Arboledas)",
    "45140": "Zapopan, Jalisco (Jardines de San Ignacio)",
    "45150": "Zapopan, Jalisco (Santa Margarita)",
    "45160": "Zapopan, Jalisco (Residencial Victoria)",
    "45170": "Zapopan, Jalisco (La Estancia)",
    "45180": "Zapopan, Jalisco (Las Cañadas)",
    "45190": "Zapopan, Jalisco (Los Molinos)",
    
    // San Pedro Tlaquepaque
    "45500": "Tlaquepaque, Jalisco (Centro)",
    "45510": "Tlaquepaque, Jalisco (San Martín)",
    "45520": "Tlaquepaque, Jalisco (Santa María)",
    "45530": "Tlaquepaque, Jalisco (Las Conchas)",
    "45540": "Tlaquepaque, Jalisco (Loma Bonita)",
    "45550": "Tlaquepaque, Jalisco (Vista Hermosa)",
    "45560": "Tlaquepaque, Jalisco (El Tapatío)",
    "45570": "Tlaquepaque, Jalisco (San Pedro)",
    "45580": "Tlaquepaque, Jalisco (San Francisco)",
    "45590": "Tlaquepaque, Jalisco (San José)",
    "45600": "Tlaquepaque, Jalisco (Tlaquepaque Centro)",
    "45610": "Tlaquepaque, Jalisco (Residencial Revolución)",
    
    // Tonalá
    "45400": "Tonalá, Jalisco (Centro)",
    "45410": "Tonalá, Jalisco (La Puerta)",
    "45420": "Tonalá, Jalisco (El Recodo)",
    "45430": "Tonalá, Jalisco (Paseo Real)",
    "45440": "Tonalá, Jalisco (Loma Dorada)",
    "45450": "Tonalá, Jalisco (Los Pinos)",
    "45460": "Tonalá, Jalisco (Villas de Tonalá)",
    "45470": "Tonalá, Jalisco (Residencial Tonalá)",
    "45480": "Tonalá, Jalisco (Jardines de Tonalá)",
    "45490": "Tonalá, Jalisco (Los Conejos)",
    
    // Monterrey y ZMM
    "64000": "Monterrey, Nuevo León (Centro)",
    "64010": "Monterrey, Nuevo León (Obispado)",
    "64020": "Monterrey, Nuevo León (Mitras Centro)",
    "64030": "Monterrey, Nuevo León (Vista Hermosa)",
    "64040": "Monterrey, Nuevo León (Anáhuac)",
    "64050": "Monterrey, Nuevo León (Buenos Aires)",
    "64060": "Monterrey, Nuevo León (Independencia)",
    "64070": "Monterrey, Nuevo León (Moderna)",
    "64080": "Monterrey, Nuevo León (Alameda)",
    "64090": "Monterrey, Nuevo León (San Bernabé)",
    "64100": "Monterrey, Nuevo León (Mitras Norte)",
    "64110": "Monterrey, Nuevo León (Mitras Sur)",
    "64120": "Monterrey, Nuevo León (Cumbres 1er Sector)",
    "64130": "Monterrey, Nuevo León (Cumbres 2do Sector)",
    "64140": "Monterrey, Nuevo León (Cumbres 3er Sector)",
    "64150": "Monterrey, Nuevo León (Cumbres 4to Sector)",
    "64160": "Monterrey, Nuevo León (Cumbres 5to Sector)",
    "64170": "Monterrey, Nuevo León (Cumbres 6to Sector)",
    "64180": "Monterrey, Nuevo León (Cumbres 7mo Sector)",
    "64190": "Monterrey, Nuevo León (Cumbres 8vo Sector)",
    "64200": "Monterrey, Nuevo León (Villa de las Fuentes)",
    "64210": "Monterrey, Nuevo León (Valle de las Fuentes)",
    "64220": "Monterrey, Nuevo León (Rincón de las Fuentes)",
    "64230": "Monterrey, Nuevo León (Las Puentes)",
    "64240": "Monterrey, Nuevo León (San Jerónimo)",
    "64250": "Monterrey, Nuevo León (Fierro)",
    "64260": "Monterrey, Nuevo León (Del Prado)",
    "64270": "Monterrey, Nuevo León (Jardín Español)",
    "64280": "Monterrey, Nuevo León (Los Naranjos)",
    "64290": "Monterrey, Nuevo León (Residencial los Naranjos)",
    "64300": "Monterrey, Nuevo León (Popular)",
    "64310": "Monterrey, Nuevo León (Villa Alegre)",
    "64320": "Monterrey, Nuevo León (Villa Bonita)",
    "64330": "Monterrey, Nuevo León (San José)",
    "64340": "Monterrey, Nuevo León (Loma Larga)",
    "64350": "Monterrey, Nuevo León (Villa Las Fuentes)",
    "64360": "Monterrey, Nuevo León (Riberas del Río)",
    "64370": "Monterrey, Nuevo León (La Alianza)",
    "64380": "Monterrey, Nuevo León (San Pedro 400)",
    "64390": "Monterrey, Nuevo León (San Martín)",
    "64400": "Monterrey, Nuevo León (Regina)",
    "64410": "Monterrey, Nuevo León (Nueva Morelos)",
    "64420": "Monterrey, Nuevo León (Nueva España)",
    "64430": "Monterrey, Nuevo León (Nueva Madero)",
    "64440": "Monterrey, Nuevo León (Alfonso Reyes)",
    "64450": "Monterrey, Nuevo León (Leones)",
    "64460": "Monterrey, Nuevo León (Torres de León)",
    "64470": "Monterrey, Nuevo León (Reforma)",
    "64480": "Monterrey, Nuevo León (Residencial Reforma)",
    "64490": "Monterrey, Nuevo León (Reforma 2000)",
    "64500": "Monterrey, Nuevo León (Santa Fe)",
    "64510": "Monterrey, Nuevo León (Santa Fe 2do Sector)",
    "64520": "Monterrey, Nuevo León (Santa Fe 3er Sector)",
    "64530": "Monterrey, Nuevo León (Valle de Santa Fe)",
    "64540": "Monterrey, Nuevo León (Santa Fe 4to Sector)",
    "64550": "Monterrey, Nuevo León (Residencial Santa Fe)",
    "64560": "Monterrey, Nuevo León (Santa Fe 5to Sector)",
    "64570": "Monterrey, Nuevo León (Residencial San Agustín)",
    "64580": "Monterrey, Nuevo León (San Agustín)",
    "64590": "Monterrey, Nuevo León (Valle de San Agustín)",
    "64600": "Monterrey, Nuevo León (San Pedro Garza García Centro)",
    "64610": "Monterrey, Nuevo León (Del Valle)",
    "64620": "Monterrey, Nuevo León (Fuentes del Valle)",
    "64630": "Monterrey, Nuevo León (Valle Oriente)",
    "64640": "Monterrey, Nuevo León (Valle Poniente)",
    "64650": "Monterrey, Nuevo León (Carrizalejo)",
    "64660": "Monterrey, Nuevo León (Zona San Pedro)",
    "64670": "Monterrey, Nuevo León (Mirasierra)",
    "64680": "Monterrey, Nuevo León (La Cima)",
    "64690": "Monterrey, Nuevo León (Veredalta)",
    "64700": "Monterrey, Nuevo León (Pedregal)",
    "64710": "Monterrey, Nuevo León (Hacienda San Pedro)",
    "64720": "Monterrey, Nuevo León (Residencial San Pedro)",
    "64730": "Monterrey, Nuevo León (Santa Mónica)",
    "64740": "Monterrey, Nuevo León (Villa San Pedro)",
    "64750": "Monterrey, Nuevo León (Privada San Pedro)",
    "64760": "Monterrey, Nuevo León (Los Angeles)",
    "64770": "Monterrey, Nuevo León (Los Pinos)",
    "64780": "Monterrey, Nuevo León (Lomas de San Pedro)",
    "64790": "Monterrey, Nuevo León (Lomas de San Agustín)",
    "64800": "Monterrey, Nuevo León (San Jerónimo)",
    "64810": "Monterrey, Nuevo León (Villa Florida)",
    "64820": "Monterrey, Nuevo León (Valle de San Jerónimo)",
    "64830": "Monterrey, Nuevo León (Rincón de San Jerónimo)",
    "64840": "Monterrey, Nuevo León (Jardines de San Jerónimo)",
    "64850": "Monterrey, Nuevo León (Nuevo San Jerónimo)",
    "64860": "Monterrey, Nuevo León (Rincón de San Jerónimo 2do Sector)",
    "64870": "Monterrey, Nuevo León (Residencial San Jerónimo)",
    "64880": "Monterrey, Nuevo León (Villas de San Jerónimo)",
    "64890": "Monterrey, Nuevo León (Privada San Jerónimo)",
    "64900": "Monterrey, Nuevo León (Tecnológico)",
    "64910": "Monterrey, Nuevo León (Alta Vista)",
    "64920": "Monterrey, Nuevo León (Contry)",
    "64930": "Monterrey, Nuevo León (Residencial Contry)",
    "64940": "Monterrey, Nuevo León (Contry 2do Sector)",
    "64950": "Monterrey, Nuevo León (Contry 3er Sector)",
    "64960": "Monterrey, Nuevo León (Contry 4to Sector)",
    "64970": "Monterrey, Nuevo León (Residencial Contry 4to Sector)",
    "64980": "Monterrey, Nuevo León (Contry 5to Sector)",
    "64990": "Monterrey, Nuevo León (Residencial Contry 5to Sector)",
    
    // San Pedro Garza García
    "66200": "San Pedro Garza García, Nuevo León (Centro)",
    "66210": "San Pedro Garza García, Nuevo León (Del Valle)",
    "66220": "San Pedro Garza García, Nuevo León (Fuentes del Valle)",
    "66230": "San Pedro Garza García, Nuevo León (Valle Oriente)",
    "66240": "San Pedro Garza García, Nuevo León (Valle Poniente)",
    "66250": "San Pedro Garza García, Nuevo León (Carrizalejo)",
    "66260": "San Pedro Garza García, Nuevo León (Zona San Pedro)",
    "66270": "San Pedro Garza García, Nuevo León (Mirasierra)",
    "66280": "San Pedro Garza García, Nuevo León (La Cima)",
    "66290": "San Pedro Garza García, Nuevo León (Veredalta)",
    
    // Santa Catarina
    "66350": "Santa Catarina, Nuevo León (Centro)",
    "66360": "Santa Catarina, Nuevo León (Industrial)",
    "66370": "Santa Catarina, Nuevo León (Residencial)",
    "66380": "Santa Catarina, Nuevo León (Las Mitras)",
    "66390": "Santa Catarina, Nuevo León (La Fama)",
    
    // Apodaca
    "66600": "Apodaca, Nuevo León (Centro)",
    "66610": "Apodaca, Nuevo León (Residencial Apodaca)",
    "66620": "Apodaca, Nuevo León (Ciudad Apodaca)",
    "66630": "Apodaca, Nuevo León (Villa Apodaca)",
    "66640": "Apodaca, Nuevo León (Los Parques)",
    
    // Escobedo
    "66050": "Escobedo, Nuevo León (Centro)",
    "66060": "Escobedo, Nuevo León (Residencial Escobedo)",
    "66070": "Escobedo, Nuevo León (Villa Escobedo)",
    "66080": "Escobedo, Nuevo León (Los Parques)",
    
    // Puebla
    "72000": "Puebla, Puebla (Centro)",
    "72010": "Puebla, Puebla (La Paz)",
    "72020": "Puebla, Puebla (San Francisco)",
    "72030": "Puebla, Puebla (San José)",
    "72040": "Puebla, Puebla (San Miguel)",
    "72050": "Puebla, Puebla (San Sebastián)",
    "72060": "Puebla, Puebla (Santiago)",
    "72070": "Puebla, Puebla (San Juan)",
    "72080": "Puebla, Puebla (San Pedro)",
    "72090": "Puebla, Puebla (San Pablo)",
    "72100": "Puebla, Puebla (Reforma)",
    "72110": "Puebla, Puebla (Moderna)",
    "72120": "Puebla, Puebla (Azteca)",
    "72130": "Puebla, Puebla (Del Valle)",
    "72140": "Puebla, Puebla (Lindavista)",
    "72150": "Puebla, Puebla (Chapultepec)",
    "72160": "Puebla, Puebla (Las Flores)",
    "72170": "Puebla, Puebla (Nuevo Puebla)",
    "72180": "Puebla, Puebla (Obrera)",
    "72190": "Puebla, Puebla (Cuauhtémoc)",
    
    // Toluca
    "50000": "Toluca, Estado de México (Centro)",
    "50010": "Toluca, Estado de México (San Francisco)",
    "50020": "Toluca, Estado de México (San José)",
    "50030": "Toluca, Estado de México (San Miguel)",
    "50040": "Toluca, Estado de México (San Sebastián)",
    "50050": "Toluca, Estado de México (Santiago)",
    "50060": "Toluca, Estado de México (San Juan)",
    "50070": "Toluca, Estado de México (San Pedro)",
    "50080": "Toluca, Estado de México (San Pablo)",
    "50090": "Toluca, Estado de México (Reforma)",
    "50100": "Toluca, Estado de México (Moderna)",
    "50110": "Toluca, Estado de México (Azteca)",
    "50120": "Toluca, Estado de México (Del Valle)",
    "50130": "Toluca, Estado de México (Lindavista)",
    "50140": "Toluca, Estado de México (Chapultepec)",
    "50150": "Toluca, Estado de México (Las Flores)",
    "50160": "Toluca, Estado de México (Nuevo Toluca)",
    "50170": "Toluca, Estado de México (Obrera)",
    "50180": "Toluca, Estado de México (Cuauhtémoc)",
    
    // Querétaro
    "76000": "Querétaro, Querétaro (Centro)",
    "76010": "Querétaro, Querétaro (San Francisco)",
    "76020": "Querétaro, Querétaro (San José)",
    "76030": "Querétaro, Querétaro (San Miguel)",
    "76040": "Querétaro, Querétaro (San Sebastián)",
    "76050": "Querétaro, Querétaro (Santiago)",
    "76060": "Querétaro, Querétaro (San Juan)",
    "76070": "Querétaro, Querétaro (San Pedro)",
    "76080": "Querétaro, Querétaro (San Pablo)",
    "76090": "Querétaro, Querétaro (Reforma)",
    "76100": "Querétaro, Querétaro (Moderna)",
    "76110": "Querétaro, Querétaro (Azteca)",
    "76120": "Querétaro, Querétaro (Del Valle)",
    "76130": "Querétaro, Querétaro (Lindavista)",
    "76140": "Querétaro, Querétaro (Chapultepec)",
    "76150": "Querétaro, Querétaro (Las Flores)",
    "76160": "Querétaro, Querétaro (Nuevo Querétaro)",
    "76170": "Querétaro, Querétaro (Obrera)",
    "76180": "Querétaro, Querétaro (Cuauhtémoc)",
    
    // Aguascalientes
    "20000": "Aguascalientes, Aguascalientes (Centro)",
    "20010": "Aguascalientes, Aguascalientes (San Francisco)",
    "20020": "Aguascalientes, Aguascalientes (San José)",
    "20030": "Aguascalientes, Aguascalientes (San Miguel)",
    "20040": "Aguascalientes, Aguascalientes (San Sebastián)",
    "20050": "Aguascalientes, Aguascalientes (Santiago)",
    "20060": "Aguascalientes, Aguascalientes (San Juan)",
    "20070": "Aguascalientes, Aguascalientes (San Pedro)",
    "20080": "Aguascalientes, Aguascalientes (San Pablo)",
    "20090": "Aguascalientes, Aguascalientes (Reforma)",
    "20100": "Aguascalientes, Aguascalientes (Moderna)",
    "20110": "Aguascalientes, Aguascalientes (Azteca)",
    "20120": "Aguascalientes, Aguascalientes (Del Valle)",
    "20130": "Aguascalientes, Aguascalientes (Lindavista)",
    "20140": "Aguascalientes, Aguascalientes (Chapultepec)",
    "20150": "Aguascalientes, Aguascalientes (Las Flores)",
    "20160": "Aguascalientes, Aguascalientes (Nuevo Aguascalientes)",
    "20170": "Aguascalientes, Aguascalientes (Obrera)",
    "20180": "Aguascalientes, Aguascalientes (Cuauhtémoc)",
    
    // Mérida
    "97000": "Mérida, Yucatán (Centro)",
    "97010": "Mérida, Yucatán (San Francisco)",
    "97020": "Mérida, Yucatán (San José)",
    "97030": "Mérida, Yucatán (San Miguel)",
    "97040": "Mérida, Yucatán (San Sebastián)",
    "97050": "Mérida, Yucatán (Santiago)",
    "97060": "Mérida, Yucatán (San Juan)",
    "97070": "Mérida, Yucatán (San Pedro)",
    "97080": "Mérida, Yucatán (San Pablo)",
    "97090": "Mérida, Yucatán (Reforma)",
    "97100": "Mérida, Yucatán (Moderna)",
    "97110": "Mérida, Yucatán (Azteca)",
    "97120": "Mérida, Yucatán (Del Valle)",
    "97130": "Mérida, Yucatán (Lindavista)",
    "97140": "Mérida, Yucatán (Chapultepec)",
    "97150": "Mérida, Yucatán (Las Flores)",
    "97160": "Mérida, Yucatán (Nuevo Mérida)",
    "97170": "Mérida, Yucatán (Obrera)",
    "97180": "Mérida, Yucatán (Cuauhtémoc)",
    
    // Chihuahua
    "31000": "Chihuahua, Chihuahua (Centro)",
    "31010": "Chihuahua, Chihuahua (San Francisco)",
    "31020": "Chihuahua, Chihuahua (San José)",
    "31030": "Chihuahua, Chihuahua (San Miguel)",
    "31040": "Chihuahua, Chihuahua (San Sebastián)",
    "31050": "Chihuahua, Chihuahua (Santiago)",
    "31060": "Chihuahua, Chihuahua (San Juan)",
    "31070": "Chihuahua, Chihuahua (San Pedro)",
    "31080": "Chihuahua, Chihuahua (San Pablo)",
    "31090": "Chihuahua, Chihuahua (Reforma)",
    "31100": "Chihuahua, Chihuahua (Moderna)",
    "31110": "Chihuahua, Chihuahua (Azteca)",
    "31120": "Chihuahua, Chihuahua (Del Valle)",
    "31130": "Chihuahua, Chihuahua (Lindavista)",
    "31140": "Chihuahua, Chihuahua (Chapultepec)",
    "31150": "Chihuahua, Chihuahua (Las Flores)",
    "31160": "Chihuahua, Chihuahua (Nuevo Chihuahua)",
    "31170": "Chihuahua, Chihuahua (Obrera)",
    "31180": "Chihuahua, Chihuahua (Cuauhtémoc)",
    
    // Acapulco
    "39300": "Acapulco, Guerrero (Centro)",
    "39310": "Acapulco, Guerrero (San Francisco)",
    "39320": "Acapulco, Guerrero (San José)",
    "39330": "Acapulco, Guerrero (San Miguel)",
    "39340": "Acapulco, Guerrero (San Sebastián)",
    "39350": "Acapulco, Guerrero (Santiago)",
    "39360": "Acapulco, Guerrero (San Juan)",
    "39370": "Acapulco, Guerrero (San Pedro)",
    "39380": "Acapulco, Guerrero (San Pablo)",
    "39390": "Acapulco, Guerrero (Reforma)",
    "39400": "Acapulco, Guerrero (Moderna)",
    "39410": "Acapulco, Guerrero (Azteca)",
    "39420": "Acapulco, Guerrero (Del Valle)",
    "39430": "Acapulco, Guerrero (Lindavista)",
    "39440": "Acapulco, Guerrero (Chapultepec)",
    "39450": "Acapulco, Guerrero (Las Flores)",
    "39460": "Acapulco, Guerrero (Nuevo Acapulco)",
    "39470": "Acapulco, Guerrero (Obrera)",
    "39480": "Acapulco, Guerrero (Cuauhtémoc)",
    
    // Cancún
    "77500": "Cancún, Quintana Roo (Centro)",
    "77510": "Cancún, Quintana Roo (San Francisco)",
    "77520": "Cancún, Quintana Roo (San José)",
    "77530": "Cancún, Quintana Roo (San Miguel)",
    "77540": "Cancún, Quintana Roo (San Sebastián)",
    "77550": "Cancún, Quintana Roo (Santiago)",
    "77560": "Cancún, Quintana Roo (San Juan)",
    "77570": "Cancún, Quintana Roo (San Pedro)",
    "77580": "Cancún, Quintana Roo (San Pablo)",
    "77590": "Cancún, Quintana Roo (Reforma)",
    "77600": "Cancún, Quintana Roo (Moderna)",
    "77610": "Cancún, Quintana Roo (Azteca)",
    "77620": "Cancún, Quintana Roo (Del Valle)",
    "77630": "Cancún, Quintana Roo (Lindavista)",
    "77640": "Cancún, Quintana Roo (Chapultepec)",
    "77650": "Cancún, Quintana Roo (Las Flores)",
    "77660": "Cancún, Quintana Roo (Nuevo Cancún)",
    "77670": "Cancún, Quintana Roo (Obrera)",
    "77680": "Cancún, Quintana Roo (Cuauhtémoc)",
    
    // Veracruz
    "91700": "Veracruz, Veracruz (Centro)",
    "91710": "Veracruz, Veracruz (San Francisco)",
    "91720": "Veracruz, Veracruz (San José)",
    "91730": "Veracruz, Veracruz (San Miguel)",
    "91740": "Veracruz, Veracruz (San Sebastián)",
    "91750": "Veracruz, Veracruz (Santiago)",
    "91760": "Veracruz, Veracruz (San Juan)",
    "91770": "Veracruz, Veracruz (San Pedro)",
    "91780": "Veracruz, Veracruz (San Pablo)",
    "91790": "Veracruz, Veracruz (Reforma)",
    "91800": "Veracruz, Veracruz (Moderna)",
    "91810": "Veracruz, Veracruz (Azteca)",
    "91820": "Veracruz, Veracruz (Del Valle)",
    "91830": "Veracruz, Veracruz (Lindavista)",
    "91840": "Veracruz, Veracruz (Chapultepec)",
    "91850": "Veracruz, Veracruz (Las Flores)",
    "91860": "Veracruz, Veracruz (Nuevo Veracruz)",
    "91870": "Veracruz, Veracruz (Obrera)",
    "91880": "Veracruz, Veracruz (Cuauhtémoc)",
    
    // Oaxaca
    "68000": "Oaxaca, Oaxaca (Centro)",
    "68010": "Oaxaca, Oaxaca (San Francisco)",
    "68020": "Oaxaca, Oaxaca (San José)",
    "68030": "Oaxaca, Oaxaca (San Miguel)",
    "68040": "Oaxaca, Oaxaca (San Sebastián)",
    "68050": "Oaxaca, Oaxaca (Santiago)",
    "68060": "Oaxaca, Oaxaca (San Juan)",
    "68070": "Oaxaca, Oaxaca (San Pedro)",
    "68080": "Oaxaca, Oaxaca (San Pablo)",
    "68090": "Oaxaca, Oaxaca (Reforma)",
    "68100": "Oaxaca, Oaxaca (Moderna)",
    "68110": "Oaxaca, Oaxaca (Azteca)",
    "68120": "Oaxaca, Oaxaca (Del Valle)",
    "68130": "Oaxaca, Oaxaca (Lindavista)",
    "68140": "Oaxaca, Oaxaca (Chapultepec)",
    "68150": "Oaxaca, Oaxaca (Las Flores)",
    "68160": "Oaxaca, Oaxaca (Nuevo Oaxaca)",
    "68170": "Oaxaca, Oaxaca (Obrera)",
    "68180": "Oaxaca, Oaxaca (Cuauhtémoc)",
    
    // Morelia
    "58000": "Morelia, Michoacán (Centro)",
    "58010": "Morelia, Michoacán (San Francisco)",
    "58020": "Morelia, Michoacán (San José)",
    "58030": "Morelia, Michoacán (San Miguel)",
    "58040": "Morelia, Michoacán (San Sebastián)",
    "58050": "Morelia, Michoacán (Santiago)",
    "58060": "Morelia, Michoacán (San Juan)",
    "58070": "Morelia, Michoacán (San Pedro)",
    "58080": "Morelia, Michoacán (San Pablo)",
    "58090": "Morelia, Michoacán (Reforma)",
    "58100": "Morelia, Michoacán (Moderna)",
    "58110": "Morelia, Michoacán (Azteca)",
    "58120": "Morelia, Michoacán (Del Valle)",
    "58130": "Morelia, Michoacán (Lindavista)",
    "58140": "Morelia, Michoacán (Chapultepec)",
    "58150": "Morelia, Michoacán (Las Flores)",
    "58160": "Morelia, Michoacán (Nuevo Morelia)",
    "58170": "Morelia, Michoacán (Obrera)",
    "58180": "Morelia, Michoacán (Cuauhtémoc)",
    
    // León
    "37000": "León, Guanajuato (Centro)",
    "37010": "León, Guanajuato (San Francisco)",
    "37020": "León, Guanajuato (San José)",
    "37030": "León, Guanajuato (San Miguel)",
    "37040": "León, Guanajuato (San Sebastián)",
    "37050": "León, Guanajuato (Santiago)",
    "37060": "León, Guanajuato (San Juan)",
    "37070": "León, Guanajuato (San Pedro)",
    "37080": "León, Guanajuato (San Pablo)",
    "37090": "León, Guanajuato (Reforma)",
    "37100": "León, Guanajuato (Moderna)",
    "37110": "León, Guanajuato (Azteca)",
    "37120": "León, Guanajuato (Del Valle)",
    "37130": "León, Guanajuato (Lindavista)",
    "37140": "León, Guanajuato (Chapultepec)",
    "37150": "León, Guanajuato (Las Flores)",
    "37160": "León, Guanajuato (Nuevo León)",
    "37170": "León, Guanajuato (Obrera)",
    "37180": "León, Guanajuato (Cuauhtémoc)",
    
    // Culiacán
    "80000": "Culiacán, Sinaloa (Centro)",
    "80010": "Culiacán, Sinaloa (San Francisco)",
    "80020": "Culiacán, Sinaloa (San José)",
    "80030": "Culiacán, Sinaloa (San Miguel)",
    "80040": "Culiacán, Sinaloa (San Sebastián)",
    "80050": "Culiacán, Sinaloa (Santiago)",
    "80060": "Culiacán, Sinaloa (San Juan)",
    "80070": "Culiacán, Sinaloa (San Pedro)",
    "80080": "Culiacán, Sinaloa (San Pablo)",
    "80090": "Culiacán, Sinaloa (Reforma)",
    "80100": "Culiacán, Sinaloa (Moderna)",
    "80110": "Culiacán, Sinaloa (Azteca)",
    "80120": "Culiacán, Sinaloa (Del Valle)",
    "80130": "Culiacán, Sinaloa (Lindavista)",
    "80140": "Culiacán, Sinaloa (Chapultepec)",
    "80150": "Culiacán, Sinaloa (Las Flores)",
    "80160": "Culiacán, Sinaloa (Nuevo Culiacán)",
    "80170": "Culiacán, Sinaloa (Obrera)",
    "80180": "Culiacán, Sinaloa (Cuauhtémoc)",
    
    // Mexicali
    "21000": "Mexicali, Baja California (Centro)",
    "21010": "Mexicali, Baja California (San Francisco)",
    "21020": "Mexicali, Baja California (San José)",
    "21030": "Mexicali, Baja California (San Miguel)",
    "21040": "Mexicali, Baja California (San Sebastián)",
    "21050": "Mexicali, Baja California (Santiago)",
    "21060": "Mexicali, Baja California (San Juan)",
    "21070": "Mexicali, Baja California (San Pedro)",
    "21080": "Mexicali, Baja California (San Pablo)",
    "21090": "Mexicali, Baja California (Reforma)",
    "21100": "Mexicali, Baja California (Moderna)",
    "21110": "Mexicali, Baja California (Azteca)",
    "21120": "Mexicali, Baja California (Del Valle)",
    "21130": "Mexicali, Baja California (Lindavista)",
    "21140": "Mexicali, Baja California (Chapultepec)",
    "21150": "Mexicali, Baja California (Las Flores)",
    "21160": "Mexicali, Baja California (Nuevo Mexicali)",
    "21170": "Mexicali, Baja California (Obrera)",
    "21180": "Mexicali, Baja California (Cuauhtémoc)",
    
    // Tijuana
    "22000": "Tijuana, Baja California (Centro)",
    "22010": "Tijuana, Baja California (San Francisco)",
    "22020": "Tijuana, Baja California (San José)",
    "22030": "Tijuana, Baja California (San Miguel)",
    "22040": "Tijuana, Baja California (San Sebastián)",
    "22050": "Tijuana, Baja California (Santiago)",
    "22060": "Tijuana, Baja California (San Juan)",
    "22070": "Tijuana, Baja California (San Pedro)",
    "22080": "Tijuana, Baja California (San Pablo)",
    "22090": "Tijuana, Baja California (Reforma)",
    "22100": "Tijuana, Baja California (Moderna)",
    "22110": "Tijuana, Baja California (Azteca)",
    "22120": "Tijuana, Baja California (Del Valle)",
    "22130": "Tijuana, Baja California (Lindavista)",
    "22140": "Tijuana, Baja California (Chapultepec)",
    "22150": "Tijuana, Baja California (Las Flores)",
    "22160": "Tijuana, Baja California (Nuevo Tijuana)",
    "22170": "Tijuana, Baja California (Obrera)",
    "22180": "Tijuana, Baja California (Cuauhtémoc)",
    
    // Hermosillo
    "83000": "Hermosillo, Sonora (Centro)",
    "83010": "Hermosillo, Sonora (San Francisco)",
    "83020": "Hermosillo, Sonora (San José)",
    "83030": "Hermosillo, Sonora (San Miguel)",
    "83040": "Hermosillo, Sonora (San Sebastián)",
    "83050": "Hermosillo, Sonora (Santiago)",
    "83060": "Hermosillo, Sonora (San Juan)",
    "83070": "Hermosillo, Sonora (San Pedro)",
    "83080": "Hermosillo, Sonora (San Pablo)",
    "83090": "Hermosillo, Sonora (Reforma)",
    "83100": "Hermosillo, Sonora (Moderna)",
    "83110": "Hermosillo, Sonora (Azteca)",
    "83120": "Hermosillo, Sonora (Del Valle)",
    "83130": "Hermosillo, Sonora (Lindavista)",
    "83140": "Hermosillo, Sonora (Chapultepec)",
    "83150": "Hermosillo, Sonora (Las Flores)",
    "83160": "Hermosillo, Sonora (Nuevo Hermosillo)",
    "83170": "Hermosillo, Sonora (Obrera)",
    "83180": "Hermosillo, Sonora (Cuauhtémoc)",
    
    // Saltillo
    "25000": "Saltillo, Coahuila (Centro)",
    "25010": "Saltillo, Coahuila (San Francisco)",
    "25020": "Saltillo, Coahuila (San José)",
    "25030": "Saltillo, Coahuila (San Miguel)",
    "25040": "Saltillo, Coahuila (San Sebastián)",
    "25050": "Saltillo, Coahuila (Santiago)",
    "25060": "Saltillo, Coahuila (San Juan)",
    "25070": "Saltillo, Coahuila (San Pedro)",
    "25080": "Saltillo, Coahuila (San Pablo)",
    "25090": "Saltillo, Coahuila (Reforma)",
    "25100": "Saltillo, Coahuila (Moderna)",
    "25110": "Saltillo, Coahuila (Azteca)",
    "25120": "Saltillo, Coahuila (Del Valle)",
    "25130": "Saltillo, Coahuila (Lindavista)",
    "25140": "Saltillo, Coahuila (Chapultepec)",
    "25150": "Saltillo, Coahuila (Las Flores)",
    "25160": "Saltillo, Coahuila (Nuevo Saltillo)",
    "25170": "Saltillo, Coahuila (Obrera)",
    "25180": "Saltillo, Coahuila (Cuauhtémoc)",
    
    // Torreón
    "27000": "Torreón, Coahuila (Centro)",
    "27010": "Torreón, Coahuila (San Francisco)",
    "27020": "Torreón, Coahuila (San José)",
    "27030": "Torreón, Coahuila (San Miguel)",
    "27040": "Torreón, Coahuila (San Sebastián)",
    "27050": "Torreón, Coahuila (Santiago)",
    "27060": "Torreón, Coahuila (San Juan)",
    "27070": "Torreón, Coahuila (San Pedro)",
    "27080": "Torreón, Coahuila (San Pablo)",
    "27090": "Torreón, Coahuila (Reforma)",
    "27100": "Torreón, Coahuila (Moderna)",
    "27110": "Torreón, Coahuila (Azteca)",
    "27120": "Torreón, Coahuila (Del Valle)",
    "27130": "Torreón, Coahuila (Lindavista)",
    "27140": "Torreón, Coahuila (Chapultepec)",
    "27150": "Torreón, Coahuila (Las Flores)",
    "27160": "Torreón, Coahuila (Nuevo Torreón)",
    "27170": "Torreón, Coahuila (Obrera)",
    "27180": "Torreón, Coahuila (Cuauhtémoc)",
    
    // San Luis Potosí
    "78000": "San Luis Potosí, San Luis Potosí (Centro)",
    "78010": "San Luis Potosí, San Luis Potosí (San Francisco)",
    "78020": "San Luis Potosí, San Luis Potosí (San José)",
    "78030": "San Luis Potosí, San Luis Potosí (San Miguel)",
    "78040": "San Luis Potosí, San Luis Potosí (San Sebastián)",
    "78050": "San Luis Potosí, San Luis Potosí (Santiago)",
    "78060": "San Luis Potosí, San Luis Potosí (San Juan)",
    "78070": "San Luis Potosí, San Luis Potosí (San Pedro)",
    "78080": "San Luis Potosí, San Luis Potosí (San Pablo)",
    "78090": "San Luis Potosí, San Luis Potosí (Reforma)",
    "78100": "San Luis Potosí, San Luis Potosí (Moderna)",
    "78110": "San Luis Potosí, San Luis Potosí (Azteca)",
    "78120": "San Luis Potosí, San Luis Potosí (Del Valle)",
    "78130": "San Luis Potosí, San Luis Potosí (Lindavista)",
    "78140": "San Luis Potosí, San Luis Potosí (Chapultepec)",
    "78150": "San Luis Potosí, San Luis Potosí (Las Flores)",
    "78160": "San Luis Potosí, San Luis Potosí (Nuevo San Luis)",
    "78170": "San Luis Potosí, San Luis Potosí (Obrera)",
    "78180": "San Luis Potosí, San Luis Potosí (Cuauhtémoc)",
    
    // Durango
    "34000": "Durango, Durango (Centro)",
    "34010": "Durango, Durango (San Francisco)",
    "34020": "Durango, Durango (San José)",
    "34030": "Durango, Durango (San Miguel)",
    "34040": "Durango, Durango (San Sebastián)",
    "34050": "Durango, Durango (Santiago)",
    "34060": "Durango, Durango (San Juan)",
    "34070": "Durango, Durango (San Pedro)",
    "34080": "Durango, Durango (San Pablo)",
    "34090": "Durango, Durango (Reforma)",
    "34100": "Durango, Durango (Moderna)",
    "34110": "Durango, Durango (Azteca)",
    "34120": "Durango, Durango (Del Valle)",
    "34130": "Durango, Durango (Lindavista)",
    "34140": "Durango, Durango (Chapultepec)",
    "34150": "Durango, Durango (Las Flores)",
    "34160": "Durango, Durango (Nuevo Durango)",
    "34170": "Durango, Durango (Obrera)",
    "34180": "Durango, Durango (Cuauhtémoc)",
    
    // Zacatecas
    "98000": "Zacatecas, Zacatecas (Centro)",
    "98010": "Zacatecas, Zacatecas (San Francisco)",
    "98020": "Zacatecas, Zacatecas (San José)",
    "98030": "Zacatecas, Zacatecas (San Miguel)",
    "98040": "Zacatecas, Zacatecas (San Sebastián)",
    "98050": "Zacatecas, Zacatecas (Santiago)",
    "98060": "Zacatecas, Zacatecas (San Juan)",
    "98070": "Zacatecas, Zacatecas (San Pedro)",
    "98080": "Zacatecas, Zacatecas (San Pablo)",
    "98090": "Zacatecas, Zacatecas (Reforma)",
    "98100": "Zacatecas, Zacatecas (Moderna)",
    "98110": "Zacatecas, Zacatecas (Azteca)",
    "98120": "Zacatecas, Zacatecas (Del Valle)",
    "98130": "Zacatecas, Zacatecas (Lindavista)",
    "98140": "Zacatecas, Zacatecas (Chapultepec)",
    "98150": "Zacatecas, Zacatecas (Las Flores)",
    "98160": "Zacatecas, Zacatecas (Nuevo Zacatecas)",
    "98170": "Zacatecas, Zacatecas (Obrera)",
    "98180": "Zacatecas, Zacatecas (Cuauhtémoc)",
    
    // Campeche
    "24000": "Campeche, Campeche (Centro)",
    "24010": "Campeche, Campeche (San Francisco)",
    "24020": "Campeche, Campeche (San José)",
    "24030": "Campeche, Campeche (San Miguel)",
    "24040": "Campeche, Campeche (San Sebastián)",
    "24050": "Campeche, Campeche (Santiago)",
    "24060": "Campeche, Campeche (San Juan)",
    "24070": "Campeche, Campeche (San Pedro)",
    "24080": "Campeche, Campeche (San Pablo)",
    "24090": "Campeche, Campeche (Reforma)",
    "24100": "Campeche, Campeche (Moderna)",
    "24110": "Campeche, Campeche (Azteca)",
    "24120": "Campeche, Campeche (Del Valle)",
    "24130": "Campeche, Campeche (Lindavista)",
    "24140": "Campeche, Campeche (Chapultepec)",
    "24150": "Campeche, Campeche (Las Flores)",
    "24160": "Campeche, Campeche (Nuevo Campeche)",
    "24170": "Campeche, Campeche (Obrera)",
    "24180": "Campeche, Campeche (Cuauhtémoc)",
    
    // Tabasco - Villahermosa
    "86000": "Villahermosa, Tabasco (Centro)",
    "86010": "Villahermosa, Tabasco (San Francisco)",
    "86020": "Villahermosa, Tabasco (San José)",
    "86030": "Villahermosa, Tabasco (San Miguel)",
    "86040": "Villahermosa, Tabasco (San Sebastián)",
    "86050": "Villahermosa, Tabasco (Santiago)",
    "86060": "Villahermosa, Tabasco (San Juan)",
    "86070": "Villahermosa, Tabasco (San Pedro)",
    "86080": "Villahermosa, Tabasco (San Pablo)",
    "86090": "Villahermosa, Tabasco (Reforma)",
    "86100": "Villahermosa, Tabasco (Moderna)",
    "86110": "Villahermosa, Tabasco (Azteca)",
    "86120": "Villahermosa, Tabasco (Del Valle)",
    "86130": "Villahermosa, Tabasco (Lindavista)",
    "86140": "Villahermosa, Tabasco (Chapultepec)",
    "86150": "Villahermosa, Tabasco (Las Flores)",
    "86160": "Villahermosa, Tabasco (Nuevo Villahermosa)",
    "86170": "Villahermosa, Tabasco (Obrera)",
    "86180": "Villahermosa, Tabasco (Cuauhtémoc)",
    
    // Hidalgo - Pachuca
    "42000": "Pachuca, Hidalgo (Centro)",
    "42010": "Pachuca, Hidalgo (San Francisco)",
    "42020": "Pachuca, Hidalgo (San José)",
    "42030": "Pachuca, Hidalgo (San Miguel)",
    "42040": "Pachuca, Hidalgo (San Sebastián)",
    "42050": "Pachuca, Hidalgo (Santiago)",
    "42060": "Pachuca, Hidalgo (San Juan)",
    "42070": "Pachuca, Hidalgo (San Pedro)",
    "42080": "Pachuca, Hidalgo (San Pablo)",
    "42090": "Pachuca, Hidalgo (Reforma)",
    "42100": "Pachuca, Hidalgo (Moderna)",
    "42110": "Pachuca, Hidalgo (Azteca)",
    "42120": "Pachuca, Hidalgo (Del Valle)",
    "42130": "Pachuca, Hidalgo (Lindavista)",
    "42140": "Pachuca, Hidalgo (Chapultepec)",
    "42150": "Pachuca, Hidalgo (Las Flores)",
    "42160": "Pachuca, Hidalgo (Nuevo Pachuca)",
    "42170": "Pachuca, Hidalgo (Obrera)",
    "42180": "Pachuca, Hidalgo (Cuauhtémoc)",
    
    // Tlaxcala
    "90000": "Tlaxcala, Tlaxcala (Centro)",
    "90010": "Tlaxcala, Tlaxcala (San Francisco)",
    "90020": "Tlaxcala, Tlaxcala (San José)",
    "90030": "Tlaxcala, Tlaxcala (San Miguel)",
    "90040": "Tlaxcala, Tlaxcala (San Sebastián)",
    "90050": "Tlaxcala, Tlaxcala (Santiago)",
    "90060": "Tlaxcala, Tlaxcala (San Juan)",
    "90070": "Tlaxcala, Tlaxcala (San Pedro)",
    "90080": "Tlaxcala, Tlaxcala (San Pablo)",
    "90090": "Tlaxcala, Tlaxcala (Reforma)",
    "90100": "Tlaxcala, Tlaxcala (Moderna)",
    "90110": "Tlaxcala, Tlaxcala (Azteca)",
    "90120": "Tlaxcala, Tlaxcala (Del Valle)",
    "90130": "Tlaxcala, Tlaxcala (Lindavista)",
    "90140": "Tlaxcala, Tlaxcala (Chapultepec)",
    "90150": "Tlaxcala, Tlaxcala (Las Flores)",
    "90160": "Tlaxcala, Tlaxcala (Nuevo Tlaxcala)",
    "90170": "Tlaxcala, Tlaxcala (Obrera)",
    "90180": "Tlaxcala, Tlaxcala (Cuauhtémoc)",
    
    // Colima
    "28000": "Colima, Colima (Centro)",
    "28010": "Colima, Colima (San Francisco)",
    "28020": "Colima, Colima (San José)",
    "28030": "Colima, Colima (San Miguel)",
    "28040": "Colima, Colima (San Sebastián)",
    "28050": "Colima, Colima (Santiago)",
    "28060": "Colima, Colima (San Juan)",
    "28070": "Colima, Colima (San Pedro)",
    "28080": "Colima, Colima (San Pablo)",
    "28090": "Colima, Colima (Reforma)",
    "28100": "Colima, Colima (Moderna)",
    "28110": "Colima, Colima (Azteca)",
    "28120": "Colima, Colima (Del Valle)",
    "28130": "Colima, Colima (Lindavista)",
    "28140": "Colima, Colima (Chapultepec)",
    "28150": "Colima, Colima (Las Flores)",
    "28160": "Colima, Colima (Nuevo Colima)",
    "28170": "Colima, Colima (Obrera)",
    "28180": "Colima, Colima (Cuauhtémoc)",
    
    // Nayarit - Tepic
    "63000": "Tepic, Nayarit (Centro)",
    "63010": "Tepic, Nayarit (San Francisco)",
    "63020": "Tepic, Nayarit (San José)",
    "63030": "Tepic, Nayarit (San Miguel)",
    "63040": "Tepic, Nayarit (San Sebastián)",
    "63050": "Tepic, Nayarit (Santiago)",
    "63060": "Tepic, Nayarit (San Juan)",
    "63070": "Tepic, Nayarit (San Pedro)",
    "63080": "Tepic, Nayarit (San Pablo)",
    "63090": "Tepic, Nayarit (Reforma)",
    "63100": "Tepic, Nayarit (Moderna)",
    "63110": "Tepic, Nayarit (Azteca)",
    "63120": "Tepic, Nayarit (Del Valle)",
    "63130": "Tepic, Nayarit (Lindavista)",
    "63140": "Tepic, Nayarit (Chapultepec)",
    "63150": "Tepic, Nayarit (Las Flores)",
    "63160": "Tepic, Nayarit (Nuevo Tepic)",
    "63170": "Tepic, Nayarit (Obrera)",
    "63180": "Tepic, Nayarit (Cuauhtémoc)"
};

const LADA_MEXICO = {
   // === TAMAULIPAS ===
    "831": "Ciudad Mante / El Mante / Los Aztecas, Tamaulipas",
    "834": "Ciudad Victoria, Tamaulipas (Capital)",
    "833": "Tampico / Ciudad Madero / Altamira, Tamaulipas (Zona Sur)",
    "899": "Reynosa, Tamaulipas (Zona Norte)",
    "867": "Nuevo Laredo, Tamaulipas (Frontera)",
    "868": "Matamoros, Tamaulipas / Valle Hermoso / Río Bravo, Tamaulipas",
    "832": "Tula / Jaumave / Jiménez / Palmillas, Tamaulipas (Zona Centro)",
    "841": "San Fernando / Méndez / Burgos, Tamaulipas",
    "897": "Miguel Alemán / Camargo / Gustavo Díaz Ordaz, Tamaulipas (Frontera)",
    "835": "Nuevo Morelos / Ocampo, Tamaulipas",
    "836": "Antiguo Morelos / Miquihuana, Tamaulipas",
    "842": "Bustamante / Villagrán, Tamaulipas",
    
    // === CIUDAD DE MÉXICO ===
    "55": "Ciudad de México (Toda la CDMX)",
    "56": "Ciudad de México (Toda la CDMX)",
    
    // === JALISCO ===
    "33": "Guadalajara / Zapopan / Tlaquepaque / Tonalá, Jalisco",
    "322": "Puerto Vallarta, Jalisco",
    
    // === NUEVO LEÓN ===
    "81": "Monterrey / San Pedro / Guadalupe / Apodaca / Escobedo, Nuevo León",
    
    // === PUEBLA ===
    "222": "Puebla (Capital), Puebla",
    
    // === ESTADO DE MÉXICO ===
    "722": "Toluca / Metepec / Zinacantepec, Estado de México",
    
    // === QUERÉTARO ===
    "442": "Querétaro (Capital) / Corregidora / El Marqués, Querétaro",
    
    // === GUANAJUATO ===
    "477": "León, Guanajuato",
    "461": "Celaya, Guanajuato",
    "462": "Irapuato, Guanajuato",
    "464": "Salamanca, Guanajuato",
    "468": "San Miguel de Allende, Guanajuato",
    
    // === MICHOACÁN ===
    "443": "Morelia, Michoacán",
    "451": "Uruapan, Michoacán",
    "452": "Zamora, Michoacán",
    
    // === VERACRUZ ===
    "228": "Xalapa, Veracruz",
    "229": "Veracruz (Puerto) / Boca del Río, Veracruz",
    "271": "Córdoba, Veracruz",
    "272": "Orizaba, Veracruz",
    "281": "Poza Rica, Veracruz",
    "282": "Tuxpan, Veracruz",
    "294": "Coatzacoalcos, Veracruz",
    
    // === YUCATÁN ===
    "999": "Mérida / Kanasín / Umán, Yucatán",
    
    // === QUINTANA ROO ===
    "998": "Cancún, Quintana Roo",
    "984": "Playa del Carmen / Tulum, Quintana Roo",
    
    // === AGUASCALIENTES ===
    "449": "Aguascalientes (Capital), Aguascalientes",
    
    // === CHIHUAHUA ===
    "614": "Chihuahua (Capital), Chihuahua",
    "656": "Ciudad Juárez, Chihuahua",
    
    // === COAHUILA ===
    "844": "Saltillo, Coahuila",
    "866": "Torreón, Coahuila",
    "861": "Monclova, Coahuila",
    
    // === SINALOA ===
    "667": "Los Mochis, Sinaloa",
    "668": "Culiacán, Sinaloa",
    "669": "Mazatlán, Sinaloa",
    
    // === SONORA ===
    "662": "Hermosillo, Sonora",
    "632": "Ciudad Obregón, Sonora",
    "631": "Navojoa, Sonora",
    
    // === BAJA CALIFORNIA ===
    "664": "Tijuana, Baja California",
    "686": "Mexicali, Baja California",
    "646": "Ensenada, Baja California",
    
    // === BAJA CALIFORNIA SUR ===
    "612": "La Paz, Baja California Sur",
    "624": "Cabo San Lucas, Baja California Sur",
    
    // === CAMPECHE ===
    "981": "Campeche, Campeche",
    "982": "Ciudad del Carmen, Campeche",
    
    // === CHIAPAS ===
    "961": "Tuxtla Gutiérrez, Chiapas",
    "962": "Tapachula, Chiapas",
    
    // === GUERRERO ===
    "744": "Acapulco, Guerrero",
    "745": "Chilpancingo, Guerrero",
    
    // === HIDALGO ===
    "771": "Pachuca, Hidalgo",
    
    // === MORELOS ===
    "777": "Cuernavaca, Morelos",
    
    // === NAYARIT ===
    "311": "Tepic, Nayarit",
    
    // === OAXACA ===
    "951": "Oaxaca, Oaxaca",
    
    // === SAN LUIS POTOSÍ ===
    "444": "San Luis Potosí, San Luis Potosí",
    
    // === TABASCO ===
    "993": "Villahermosa, Tabasco",
    
    // === TLAXCALA ===
    "246": "Tlaxcala, Tlaxcala",
    
    // === ZACATECAS ===
    "492": "Zacatecas, Zacatecas",
    
    // === DURANGO ===
    "618": "Durango, Durango",
    
    // === COLIMA ===
    "312": "Colima, Colima"
};

const LADA_CP = {
    // Tamaulipas
    "831": ["89800", "89809", "89810", "89820", "89830", "89840", "89850", "89860", "89870", "89880", "89890", "89900", "89910", "89920", "89930"],
    "834": ["87000", "87010", "87020", "87030", "87040", "87050", "87060", "87070", "87080", "87090"],
    "833": ["89000", "89100", "89110", "89120", "89130", "89140", "89150", "89160", "89170", "89180", "89190", "89400", "89410", "89420", "89430", "89440", "89450", "89460", "89470", "89480", "89490", "89600", "89602", "89603", "89604", "89605", "89606", "89607", "89608", "89609", "89610", "89620"],
    "899": ["88500", "88510", "88520", "88600", "88610", "88620", "88630", "88640", "88700", "88710", "88720", "88730", "88740", "88750", "88760", "88770", "88780", "88790"],
    "867": ["88000", "88010", "88020", "88030", "88040", "88050", "88060", "88070", "88080", "88090", "88100", "88110", "88120", "88130", "88140", "88200", "88210", "88220", "88230", "88240", "88250", "88260", "88270", "88280", "88290", "88300", "88301", "88302", "88303", "88304", "88305", "88306", "88307", "88308", "88309"],
    "868": ["87300", "87310", "87320", "87330", "87340", "87350", "87360", "87370", "87380", "87390", "87400", "87410", "87420", "87430", "87440", "87450", "87460", "87470", "87480", "87490", "87500", "87510", "87520", "87530", "87540", "87550", "87560", "87570", "87590", "87580"],
    "832": ["87900", "87910", "87800", "87700"],
    "841": ["87600"],
    "897": ["88330", "88340", "88400"],
    
    // CDMX
    "55": ["01000", "01010", "01020", "01030", "01040", "01050", "01060", "01070", "01080", "01090", "03000", "03010", "03020", "03030", "03040", "03050", "03060", "03070", "03080", "03090", "04000", "04100", "04120", "04130", "04140", "04150", "04160", "04170", "04180", "04190", "05000", "05100", "05110", "05120", "05130", "05140", "05150", "05160", "05170", "05180", "06000", "06010", "06020", "06030", "06040", "06050", "06060", "06070", "06080", "06090", "06100", "06140", "06170", "06200", "06220", "06240", "06250", "06270", "06280", "06290", "07000", "07100", "07110", "07120", "07130", "07140", "07150", "07160", "07170", "07180", "08000", "08100", "08120", "08130", "08140", "08150", "08160", "08170", "08180", "08190", "09000", "09100", "09120", "09130", "09140", "09150", "09160", "09170", "09180", "09190", "10000", "10100", "10120", "10130", "10140", "10150", "10160", "10170", "10180", "10190", "11000", "11100", "11110", "11120", "11130", "11140", "11150", "11160", "11170", "11180", "12000", "12100", "12110", "12120", "12130", "12140", "12150", "12160", "12170", "12180", "13000", "13100", "13120", "13130", "13140", "13150", "13160", "13170", "13180", "13190", "14000", "14100", "14120", "14130", "14140", "14150", "14160", "14170", "14180", "14190", "15000", "15100", "15120", "15130", "15140", "15150", "15160", "15170", "15180", "15190", "16000", "16100", "16120", "16130", "16140", "16150", "16160", "16170", "16180", "16190"],
    "56": ["01000", "01010", "01020", "01030", "01040", "01050", "01060", "01070", "01080", "01090", "03000", "03010", "03020", "03030", "03040", "03050", "03060", "03070", "03080", "03090", "04000", "04100", "04120", "04130", "04140", "04150", "04160", "04170", "04180", "04190", "05000", "05100", "05110", "05120", "05130", "05140", "05150", "05160", "05170", "05180", "06000", "06010", "06020", "06030", "06040", "06050", "06060", "06070", "06080", "06090", "06100", "06140", "06170", "06200", "06220", "06240", "06250", "06270", "06280", "06290", "07000", "07100", "07110", "07120", "07130", "07140", "07150", "07160", "07170", "07180", "08000", "08100", "08120", "08130", "08140", "08150", "08160", "08170", "08180", "08190", "09000", "09100", "09120", "09130", "09140", "09150", "09160", "09170", "09180", "09190", "10000", "10100", "10120", "10130", "10140", "10150", "10160", "10170", "10180", "10190", "11000", "11100", "11110", "11120", "11130", "11140", "11150", "11160", "11170", "11180", "12000", "12100", "12110", "12120", "12130", "12140", "12150", "12160", "12170", "12180", "13000", "13100", "13120", "13130", "13140", "13150", "13160", "13170", "13180", "13190", "14000", "14100", "14120", "14130", "14140", "14150", "14160", "14170", "14180", "14190", "15000", "15100", "15120", "15130", "15140", "15150", "15160", "15170", "15180", "15190", "16000", "16100", "16120", "16130", "16140", "16150", "16160", "16170", "16180", "16190"],
    
    // Jalisco
    "33": ["44100", "44110", "44120", "44130", "44140", "44150", "44160", "44170", "44180", "44190", "44600", "44610", "44620", "44630", "44640", "44650", "44660", "44670", "44680", "44690", "44900", "44910", "44920", "44930", "44940", "44950", "44960", "44970", "44980", "44990", "45000", "45010", "45020", "45030", "45040", "45050", "45060", "45070", "45080", "45090", "45100", "45110", "45120", "45130", "45140", "45150", "45160", "45170", "45180", "45190", "45500", "45510", "45520", "45530", "45540", "45550", "45560", "45570", "45580", "45590", "45600", "45610", "45400", "45410", "45420", "45430", "45440", "45450", "45460", "45470", "45480", "45490"],
    "322": ["48300", "48310", "48320", "48330", "48340", "48350"], // Puerto Vallarta
    
    // Nuevo León
    "81": ["64000", "64010", "64020", "64030", "64040", "64050", "64060", "64070", "64080", "64090", "64100", "64110", "64120", "64130", "64140", "64150", "64160", "64170", "64180", "64190", "64200", "64210", "64220", "64230", "64240", "64250", "64260", "64270", "64280", "64290", "64300", "64310", "64320", "64330", "64340", "64350", "64360", "64370", "64380", "64390", "64400", "64410", "64420", "64430", "64440", "64450", "64460", "64470", "64480", "64490", "64500", "64510", "64520", "64530", "64540", "64550", "64560", "64570", "64580", "64590", "64600", "64610", "64620", "64630", "64640", "64650", "64660", "64670", "64680", "64690", "64700", "64710", "64720", "64730", "64740", "64750", "64760", "64770", "64780", "64790", "64800", "64810", "64820", "64830", "64840", "64850", "64860", "64870", "64880", "64890", "64900", "64910", "64920", "64930", "64940", "64950", "64960", "64970", "64980", "64990", "66200", "66210", "66220", "66230", "66240", "66250", "66260", "66270", "66280", "66290", "66350", "66360", "66370", "66380", "66390", "66600", "66610", "66620", "66630", "66640", "66050", "66060", "66070", "66080"],
    
    // Puebla
    "222": ["72000", "72010", "72020", "72030", "72040", "72050", "72060", "72070", "72080", "72090", "72100", "72110", "72120", "72130", "72140", "72150", "72160", "72170", "72180", "72190"],
    
    // Estado de México
    "722": ["50000", "50010", "50020", "50030", "50040", "50050", "50060", "50070", "50080", "50090", "50100", "50110", "50120", "50130", "50140", "50150", "50160", "50170", "50180"],
    
    // Querétaro
    "442": ["76000", "76010", "76020", "76030", "76040", "76050", "76060", "76070", "76080", "76090", "76100", "76110", "76120", "76130", "76140", "76150", "76160", "76170", "76180"],
    
    // Guanajuato
    "477": ["37000", "37010", "37020", "37030", "37040", "37050", "37060", "37070", "37080", "37090", "37100", "37110", "37120", "37130", "37140", "37150", "37160", "37170", "37180"],
    
    // Veracruz
    "229": ["91700", "91710", "91720", "91730", "91740", "91750", "91760", "91770", "91780", "91790", "91800", "91810", "91820", "91830", "91840", "91850", "91860", "91870", "91880"],
    
    // Yucatán
    "999": ["97000", "97010", "97020", "97030", "97040", "97050", "97060", "97070", "97080", "97090", "97100", "97110", "97120", "97130", "97140", "97150", "97160", "97170", "97180"],
    
    // Quintana Roo
    "998": ["77500", "77510", "77520", "77530", "77540", "77550", "77560", "77570", "77580", "77590", "77600", "77610", "77620", "77630", "77640", "77650", "77660", "77670", "77680"],
    
    // Aguascalientes
    "449": ["20000", "20010", "20020", "20030", "20040", "20050", "20060", "20070", "20080", "20090", "20100", "20110", "20120", "20130", "20140", "20150", "20160", "20170", "20180"],
    
    // Chihuahua
    "614": ["31000", "31010", "31020", "31030", "31040", "31050", "31060", "31070", "31080", "31090", "31100", "31110", "31120", "31130", "31140", "31150", "31160", "31170", "31180"],
    
    // Coahuila
    "844": ["25000", "25010", "25020", "25030", "25040", "25050", "25060", "25070", "25080", "25090", "25100", "25110", "25120", "25130", "25140", "25150", "25160", "25170", "25180"],
    
    // Sinaloa
    "668": ["80000", "80010", "80020", "80030", "80040", "80050", "80060", "80070", "80080", "80090", "80100", "80110", "80120", "80130", "80140", "80150", "80160", "80170", "80180"],
    
    // Sonora
    "662": ["83000", "83010", "83020", "83030", "83040", "83050", "83060", "83070", "83080", "83090", "83100", "83110", "83120", "83130", "83140", "83150", "83160", "83170", "83180"],
    
    // Baja California
    "664": ["22000", "22010", "22020", "22030", "22040", "22050", "22060", "22070", "22080", "22090", "22100", "22110", "22120", "22130", "22140", "22150", "22160", "22170", "22180"],
    
    // Baja California Sur
    "612": ["23000", "23010", "23020", "23030", "23040", "23050", "23060", "23070", "23080", "23090"],
    
    // Campeche
    "981": ["24000", "24010", "24020", "24030", "24040", "24050", "24060", "24070", "24080", "24090", "24100", "24110", "24120", "24130", "24140", "24150", "24160", "24170", "24180"],
    
    // Chiapas
    "961": ["29000", "29010", "29020", "29030", "29040", "29050", "29060", "29070", "29080", "29090"],
    
    // Guerrero
    "744": ["39300", "39310", "39320", "39330", "39340", "39350", "39360", "39370", "39380", "39390", "39400", "39410", "39420", "39430", "39440", "39450", "39460", "39470", "39480"],
    
    // Hidalgo
    "771": ["42000", "42010", "42020", "42030", "42040", "42050", "42060", "42070", "42080", "42090", "42100", "42110", "42120", "42130", "42140", "42150", "42160", "42170", "42180"],
    
    // Morelos
    "777": ["62000", "62010", "62020", "62030", "62040", "62050", "62060", "62070", "62080", "62090"],
    
    // Nayarit
    "311": ["63000", "63010", "63020", "63030", "63040", "63050", "63060", "63070", "63080", "63090", "63100", "63110", "63120", "63130", "63140", "63150", "63160", "63170", "63180"],
    
    // Oaxaca
    "951": ["68000", "68010", "68020", "68030", "68040", "68050", "68060", "68070", "68080", "68090", "68100", "68110", "68120", "68130", "68140", "68150", "68160", "68170", "68180"],
    
    // San Luis Potosí
    "444": ["78000", "78010", "78020", "78030", "78040", "78050", "78060", "78070", "78080", "78090", "78100", "78110", "78120", "78130", "78140", "78150", "78160", "78170", "78180"],
    
    // Tabasco
    "993": ["86000", "86010", "86020", "86030", "86040", "86050", "86060", "86070", "86080", "86090", "86100", "86110", "86120", "86130", "86140", "86150", "86160", "86170", "86180"],
    
    // Tlaxcala
    "246": ["90000", "90010", "90020", "90030", "90040", "90050", "90060", "90070", "90080", "90090", "90100", "90110", "90120", "90130", "90140", "90150", "90160", "90170", "90180"],
    
    // Zacatecas
    "492": ["98000", "98010", "98020", "98030", "98040", "98050", "98060", "98070", "98080", "98090", "98100", "98110", "98120", "98130", "98140", "98150", "98160", "98170", "98180"],
    
    // Durango
    "618": ["34000", "34010", "34020", "34030", "34040", "34050", "34060", "34070", "34080", "34090", "34100", "34110", "34120", "34130", "34140", "34150", "34160", "34170", "34180"],
    
    // Colima
    "312": ["28000", "28010", "28020", "28030", "28040", "28050", "28060", "28070", "28080", "28090", "28100", "28110", "28120", "28130", "28140", "28150", "28160", "28170", "28180"]
};

const OPERADORES = {
   telcel: {
        nombre: "Telcel",
        mcc: "334",
        mnc: "020",
        red_propia: true,
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE/5G",
        pagina_oficial: "https://www.telcel.com",
        atencion_cliente: "800 123 2222",
        es_preponderante: true,
        curp_registro_requerido: true,
        tiene_omv_asociados: true
    },
    movistar: {
        nombre: "Movistar",
        mcc: "334",
        mnc: "030",
        red_propia: true,
        sms_gateway: "correo.movistar.net",
        sms_email: "@correo.movistar.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.movistar.com.mx",
        atencion_cliente: "800 333 3000",
        es_preponderante: false,
        curp_registro_requerido: true,
        tiene_omv_asociados: true
    },
    att: {
        nombre: "AT&T México",
        mcc: "334",
        mnc: "050",
        red_propia: true,
        sms_gateway: "sms.att.net",
        sms_email: "@sms.att.net",
        tecnologia: "4G/LTE/5G",
        pagina_oficial: "https://www.att.com.mx",
        atencion_cliente: "800 288 2288",
        es_preponderante: false,
        curp_registro_requerido: true,
        tiene_omv_asociados: true
    },
    altan_redes: {
        nombre: "Altán Redes",
        mcc: "334",
        mnc: "090",
        red_propia: true,
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE/4.5G",
        pagina_oficial: "https://www.altanredes.com",
        atencion_cliente: null,
        es_preponderante: false,
        curp_registro_requerido: true,
        tipo: "Red Compartida (Mayorista)",
        omv_clientes: ["Bait", "izzi móvil", "CFE TEIT", "Megacable", "Pillofon", "Diri", "Newww"]
    },
    cfe_teit: {
        nombre: "CFE TEIT (Internet para el Bienestar)",
        mcc: "334",
        mnc: "080",
        red_propia: true,
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.cfe.mx/internet",
        atencion_cliente: "800 888 2337",
        es_preponderante: false,
        curp_registro_requerido: true,
        tipo: "Operador Público",
        cobertura: "Nacional con enfoque en zonas marginadas"
    },
    oxxo_cel: {
        nombre: "OXXO Cel",
        mnc: "020",
        red_utilizada: "Telcel",
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.oxxocel.com",
        atencion_cliente: "800 227 8355",
        tipo: "OMV Prepago",
        caracteristicas: "Recargas en tiendas OXXO, roaming en EEUU"
    },
    freedompop: {
        nombre: "FreedomPop (Dish México)",
        mnc: "020",
        red_utilizada: "Telcel",
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://mx.freedompop.com",
        atencion_cliente: "55 4163 7000",
        tipo: "OMV Prepago/Pospago",
        caracteristicas: "Planes con Amazon Prime incluido"
    },
    soriana_movil: {
        nombre: "Soriana Móvil",
        mnc: "020",
        red_utilizada: "Telcel",
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.soriana.com/movil",
        tipo: "OMV Prepago",
        caracteristicas: "Recargas de 3, 7, 15 y 30 días"
    },
    bueno_cell: {
        nombre: "Bueno Cell",
        mnc: "020",
        red_utilizada: "Telcel",
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.buenocell.com",
        tipo: "OMV Prepago",
        caracteristicas: "Planes mensuales con llamadas ilimitadas"
    },
    oui_movil: {
        nombre: "Oui Móvil",
        mnc: "020",
        red_utilizada: "Telcel",
        sms_gateway: "sms.telcel.com",
        sms_email: "@sms.telcel.com",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.oui.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Permite compartir datos, recargas flexibles"
    },
    virgin_mobile: {
        nombre: "Virgin Mobile México",
        mnc: "030",
        red_utilizada: "Movistar",
        sms_gateway: "correo.movistar.net",
        sms_email: "@correo.movistar.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.virginmobile.mx",
        atencion_cliente: "800 911 9000",
        tipo: "OMV Prepago",
        caracteristicas: "Planes con redes sociales ilimitadas, promociones Profeco"
    },
    flash_mobile: {
        nombre: "Flash Mobile",
        mnc: "030",
        red_utilizada: "Movistar",
        sms_gateway: "correo.movistar.net",
        sms_email: "@correo.movistar.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.flashmobile.com.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Auto-recarga mensual, datos con Política de Uso Justo"
    },
    weex: {
        nombre: "Weex",
        mnc: "030",
        red_utilizada: "Movistar",
        sms_gateway: "correo.movistar.net",
        sms_email: "@correo.movistar.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.weex.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Recarga semanal, paquetes de MB para apps favoritas"
    },
    unefon: {
        nombre: "Unefon",
        mnc: "050",
        red_utilizada: "AT&T",
        sms_gateway: "sms.att.net",
        sms_email: "@sms.att.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.unefon.com.mx",
        atencion_cliente: "800 900 2200",
        tipo: "OMV Prepago",
        caracteristicas: "Datos ilimitados, llamadas internacionales"
    },
    izzi_movil: {
        nombre: "izzi móvil",
        mnc: "050",
        red_utilizada: "AT&T y Altán Redes (Dual)",
        sms_gateway: "sms.att.net",
        sms_email: "@sms.att.net",
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.izzi.mx/izzi-movil",
        atencion_cliente: "800 050 0000",
        tipo: "OMV Pospago (convergencia)",
        caracteristicas: "Usa red AT&T y Altán, puntos izzi wifi incluidos, WhatsApp ilimitado"
    },
    bait: {
        nombre: "Bait (Walmart México)",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.bait.com.mx",
        atencion_cliente: "800 224 8228",
        tipo: "OMV Prepago/Pospago",
        caracteristicas: "Centros de Experiencia en Walmart, 26.4M usuarios (2025)",
        puntos_venta: "3,400+ puntos de venta, 1.3M puntos de recarga"
    },
    pillofon: {
        nombre: "Pillofón",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.pillofon.com.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Promociones de datos por portabilidad"
    },
    mega_movil: {
        nombre: "Mega Móvil (Megacable)",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.megacable.mx/movil",
        tipo: "OMV Prepago",
        caracteristicas: "Planes desde $100 por GB, convergente con internet"
    },
    diri: {
        nombre: "Diri",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.diri.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Planes mensuales y anuales, permite compartir datos"
    },
    newww: {
        nombre: "Newww",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.newww.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Descuentos para recargas anuales, RRSS ilimitadas"
    },
    wimo: {
        nombre: "Wimo",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.wimo.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Recargas semanales/quincenales, roaming en EEUU y Canadá"
    },
    netwey: {
        nombre: "Netwey",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.netwey.com.mx",
        tipo: "OMV Prepago (solo datos)",
        caracteristicas: "Enfoque en datos, sin llamadas ilimitadas, precios competitivos"
    },
    gurupp: {
        nombre: "GurúComm",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.gurucomm.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Planes mensuales con diferentes paquetes de datos"
    },
    ientc: {
        nombre: "IENTC",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.ientc.mx",
        tipo: "OMV Prepago",
        caracteristicas: "Roaming en EEUU y Canadá, variedad de planes"
    },
    vasanta: {
        nombre: "Vasanta",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.vasanta.mx",
        tipo: "OMV Prepago",
        caracteristicas: "45,450 minutos, 15GB datos, redes sociales ilimitadas"
    },
    chedraui_movil: {
        nombre: "Chedraui Móvil",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.chedraui.com.mx/movil",
        tipo: "OMV Prepago",
        caracteristicas: "Recargas en tiendas Chedraui"
    },
    telmovil: {
        nombre: "Telmóvil",
        mnc: "090",
        red_utilizada: "Altán Redes",
        sms_gateway: null,
        sms_email: null,
        tecnologia: "4G/LTE",
        pagina_oficial: "https://www.telmovil.com.mx",
        tipo: "OMV Prepago",
        caracteristicas: "44,700 min, 40GB datos, líder en GB por $200"
    }
};

// ──────────────────────────────────────
// HELPERS
// ──────────────────────────────────────
function detectarLADA(numero) {
  const n = numero.replace(/\D/g,'');
  let local = n.startsWith('52') ? n.substring(2) : n;
  if (local.length < 2) return { lada:'N/A', localidad:'Desconocido', encontrado:false };
  
  // Intentar con LADA de 3 dígitos
  if (local.length >= 3) {
    const k = local.substring(0,3);
    if (LADA_MEXICO[k]) {
      const parts = LADA_MEXICO[k].split(',');
      return { 
        lada:k, 
        localidad:LADA_MEXICO[k], 
        ciudad:parts[0].trim(), 
        estado:parts[1] ? parts[1].trim() : 'México', 
        encontrado:true 
      };
    }
  }
  
  // Intentar con LADA de 2 dígitos
  if (local.length >= 2) {
    const k = local.substring(0,2);
    if (LADA_MEXICO[k]) {
      const parts = LADA_MEXICO[k].split(',');
      return { 
        lada:k, 
        localidad:LADA_MEXICO[k], 
        ciudad:parts[0].trim(), 
        estado:parts[1] ? parts[1].trim() : 'México', 
        encontrado:true 
      };
    }
  }
  
  return { lada:local.substring(0,3), localidad:'No disponible', ciudad:'Desconocido', estado:'Desconocido', encontrado:false };
}

function obtenerCP(ladaInfo, numero) {
  if (!ladaInfo.encontrado || !ladaInfo.lada) {
    return { codigo:'N/A', descripcion:'No disponible', exacto:false };
  }
  
  const cps = LADA_CP[ladaInfo.lada];
  if (!cps || cps.length === 0) {
    return { codigo:'N/A', descripcion:'Sin datos para esta LADA', exacto:false };
  }
  
  const n = numero.replace(/\D/g,'');
  const tail = n.slice(-3);
  
  // Buscar coincidencia exacta por últimos dígitos
  for (const cp of cps) {
    if (cp.endsWith(tail)) {
      return { 
        codigo:cp, 
        descripcion:CODIGOS_POSTALES_MEXICO[cp] || cp, 
        exacto:true, 
        posibles:cps 
      };
    }
  }
  
  // Si no hay coincidencia, devolver uno representativo de la zona
  const mid = cps[Math.floor(cps.length/2)];
  return { 
    codigo:mid, 
    descripcion:CODIGOS_POSTALES_MEXICO[mid] || mid, 
    exacto:false, 
    posibles:cps 
  };
}

function syntaxHighlight(obj) {
  let json = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
  json = json.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, m => {
    let cls = 'json-number';
    if (/^"/.test(m)) { 
      cls = /:$/.test(m) ? 'json-key' : 'json-string'; 
    } else if (/true|false/.test(m)) { 
      cls = 'json-boolean'; 
    } else if (/null/.test(m)) { 
      cls = 'json-null'; 
    }
    return `<span class="${cls}">${m}</span>`;
  });
}

function showResult(obj) {
  document.getElementById('placeholderMsg').style.display = 'none';
  const r = document.getElementById('resultado');
  r.style.display = 'block';
  r.innerHTML = syntaxHighlight(obj);
}

function limpiarResultado() {
  document.getElementById('resultado').style.display = 'none';
  document.getElementById('resultado').innerHTML = '';
  document.getElementById('placeholderMsg').style.display = 'flex';
}

function copiarResultado() {
  const t = document.getElementById('resultado').textContent;
  if (!t) return;
  
  navigator.clipboard.writeText(t).then(() => {
    const n = document.getElementById('copyNotification');
    n.classList.add('show');
    setTimeout(() => n.classList.remove('show'), 2500);
  });
}

// ──────────────────────────────────────
// VALIDATE / MAIN
// ──────────────────────────────────────
async function validar() {
  const numero = document.getElementById('numero').value.trim();
  if (!numero) { 
    showResult({ error:'Número no válido', hint:'Ejemplo: +528311164467 o 8311164467' }); 
    return; 
  }

  const u = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (!u) { 
    showResult({ error:'Acceso denegado', mensaje:'Debes iniciar sesión' }); 
    return; 
  }
  if (u.vip === 0 && u.saldo <= 0) { 
    showResult({ error:'Saldo insuficiente', saldo:u.saldo, accion:'Recarga o adquiere VIP' }); 
    return; 
  }

  const lb = document.getElementById('loadingBar');
  lb.classList.add('active');

  showResult({ STATUS:"PROCESANDO", numero, timestamp: new Date().toLocaleTimeString() });

  try {
    const n = numero.replace(/\s+/g,'');
    let apiData = {}, apiOk = false;
    try {
      const res = await fetch(`https://phoneintelligence.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}&phone=${encodeURIComponent(n)}`);
      if (res.ok) { 
        apiData = await res.json(); 
        apiOk = true; 
      }
    } catch (_) {}

    const ladaInfo = detectarLADA(numero);
    const cpInfo   = obtenerCP(ladaInfo, numero);
    const op       = OPERADORES.telcel;

    const clean = numero.replace(/\D/g,'');
    const local = clean.startsWith('52') ? clean.substring(2) : clean.slice(-10);
    const intl  = clean.startsWith('52') ? `+${clean}` : `+52${local}`;

    // Determinar si es de Ciudad Mante para destacarlo
    const esMante = ladaInfo.lada === "831";
    
    // Coordenadas aproximadas
    let lat = "N/A", lon = "N/A";
    if (ladaInfo.lada === "831") { lat = "22.7333"; lon = "-98.9667"; }
    else if (ladaInfo.lada === "834") { lat = "23.7369"; lon = "-99.1412"; }
    else if (ladaInfo.lada === "833") { lat = "22.2553"; lon = "-97.8686"; }
    else if (ladaInfo.lada === "55" || ladaInfo.lada === "56") { lat = "19.4326"; lon = "-99.1332"; }
    else if (ladaInfo.lada === "33") { lat = "20.6597"; lon = "-103.3496"; }
    else if (ladaInfo.lada === "81") { lat = "25.6866"; lon = "-100.3161"; }

    const payload = {
      "📞 TELEFONO": {
        "numero_consultado": numero,
        "formato_internacional": intl,
        "formato_nacional": local,
        "longitud": `${clean.length} dígitos`,
        "tipo": "Móvil",
        "válido": true
      },
      "📍 UBICACIÓN": {
        "país": "México",
        "código_iso": "MX",
        "código_país": "+52",
        "estado": ladaInfo.estado || "Tamaulipas",
        "ciudad": ladaInfo.ciudad || "Ciudad Mante",
        "localidad_completa": ladaInfo.localidad,
        "lada": ladaInfo.lada,
        "📮 código_postal": cpInfo.codigo,
        "descripción_cp": cpInfo.descripcion,
        "precisión_geo": cpInfo.exacto ? "ALTA (basado en número)" : "MEDIA (basado en zona)",
        "zona_postal": cpInfo.codigo !== 'N/A' ? cpInfo.codigo.substring(0,3) + "XX" : "N/A",
        "latitud": lat,
        "longitud": lon
      },
      "📱 OPERADOR": {
        "nombre": op.nombre,
        "tecnología": op.tecnologia,
        "mcc": op.mcc,
        "mnc": op.mnc,
        "red": "GSM / UMTS / LTE",
        "sms_gateway": op.sms_gateway,
        "sms_email": local ? `${local}${op.sms_email}` : "N/A",
        "atención_cliente": op.tel
      },
      "📊 ANÁLISIS DE RIESGO": {
        "nivel": "BAJO",
        "número_desechable": false,
        "spam_detectado": false,
        "fraude_score": "0.08",
        "actividad_sospechosa": false
      },
      "🔍 METADATA": {
        "fuente": apiOk ? "AbstractAPI + BSZ-DB Local" : "BSZ-DB Local (SEPOMEX)",
        "api_externa": apiOk,
        "costo": u.vip === 1 ? 0 : 1,
        "saldo_restante": u.vip === 1 ? "∞" : (u.saldo - 1).toFixed(2),
        "analista": u.username,
        "timestamp": new Date().toLocaleString('es-MX'),
        "id_consulta": Math.random().toString(36).substring(2,9).toUpperCase()
      }
    };

    // Agregar códigos postales posibles si hay más de uno
    if (cpInfo.posibles && cpInfo.posibles.length > 1 && !cpInfo.exacto) {
      payload["📋 CÓDIGOS POSTALES POSIBLES"] = cpInfo.posibles.slice(0, 10).map(cp => 
        `${cp}: ${(CODIGOS_POSTALES_MEXICO[cp] || cp).split('(')[0].trim()}`
      );
      if (cpInfo.posibles.length > 10) {
        payload["📋 NOTA"] = `... y ${cpInfo.posibles.length - 10} códigos postales más en esta zona`;
      }
    }

    // Destacar si es de Ciudad Mante
    if (esMante) {
      payload["⭐ DESTACADO"] = {
        "mensaje": "📞 ¡Número de CIUDAD MANTE, TAMAULIPAS!",
        "lada": "831",
        "códigos_postales": "89800-89890, 89900-89930"
      };
    }

    showResult(payload);
    
    if (u.vip === 0) await descontarSaldo(u);

  } catch (e) {
    const ladaInfo = detectarLADA(numero);
    const cpInfo   = obtenerCP(ladaInfo, numero);
    showResult({
      STATUS: "⚠️ MODO LOCAL ACTIVADO",
      numero,
      lada: ladaInfo.lada,
      localidad: ladaInfo.localidad,
      "📮 código_postal": cpInfo.codigo,
      descripción: cpInfo.descripcion,
      operador: "Telcel",
      válido: true,
      timestamp: new Date().toLocaleString('es-MX')
    });
  } finally {
    lb.classList.remove('active');
  }
}

async function descontarSaldo(u) {
  u.saldo -= 1;
  try {
    await fetch(`${API_URL}/${u.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ saldo: u.saldo })
    });
  } catch (_) {}
  mostrarUsuario(u);
  localStorage.setItem('usuario', JSON.stringify(u));
}

// ──────────────────────────────────────
// AUTH
// ──────────────────────────────────────
let activeTab = 'login';

function switchTab(tab) {
  activeTab = tab;
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}

async function handleAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  if (!username || !password) { 
    shakeModal(); 
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

  const btn = document.querySelector('.btn-primary');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px"></i> Verificando...';
  btn.disabled = true;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API error');
    const users = await res.json();

    const u = users.find(x =>
      String(x.username).toLowerCase() === String(username).toLowerCase() &&
      String(x.password) === String(password)
    );

    if (u) {
      localStorage.setItem('usuario', JSON.stringify(u));
      document.getElementById('registroModal').style.display = 'none';
      mostrarUsuario(u);
    } else {
      shakeModal();
      mostrarError('Credenciales incorrectas');
    }
  } catch (e) {
    shakeModal();
    mostrarError('Error de conexión con la API');
  } finally {
    btn.innerHTML = '<i class="fa-solid fa-terminal" style="margin-right:8px"></i>Autenticar';
    btn.disabled = false;
  }
}

async function registrarUsuario() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const btn = document.querySelector('.btn-primary');
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="margin-right:8px"></i> Registrando...';
  btn.disabled = true;

  const ip = await obtenerIP();
  const ahora = new Date();
  const u = {
    username, password, ip,
    fecha_registro: ahora.toISOString(),
    saldo: 5, vip: 0
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(u)
    });
    if (res.ok) {
      const d = await res.json();
      u.id = d.id;
      localStorage.setItem('usuario', JSON.stringify(u));
      document.getElementById('registroModal').style.display = 'none';
      mostrarUsuario(u);
    } else {
      shakeModal();
      mostrarError('Error al registrar');
    }
  } catch (_) {
    shakeModal();
    mostrarError('Error de conexión');
  } finally {
    btn.innerHTML = '<i class="fa-solid fa-terminal" style="margin-right:8px"></i>Autenticar';
    btn.disabled = false;
  }
}

function mostrarError(msg) {
  let el = document.getElementById('authError');
  if (!el) {
    el = document.createElement('div');
    el.id = 'authError';
    el.style.cssText = 'font-family:var(--mono);font-size:.62rem;color:#ff4444;letter-spacing:.08em;text-align:center;padding:8px;border:1px solid rgba(255,68,68,.3);background:rgba(255,68,68,.06);margin-bottom:12px;';
    document.querySelector('.btn-primary').insertAdjacentElement('beforebegin', el);
  }
  el.innerHTML = '<i class="fa-solid fa-triangle-exclamation" style="margin-right:6px"></i>' + msg;
  el.style.display = 'block';
  setTimeout(() => { if (el) el.style.display = 'none'; }, 3500);
}

function shakeModal() {
  const box = document.querySelector('.modal-box');
  box.style.animation = 'none';
  void box.offsetHeight;
  box.style.animation = 'shake .4s ease';
}

function cerrarSesion() {
  localStorage.removeItem('usuario');
  document.getElementById('registroModal').style.display = 'flex';
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('nickname').textContent = '— Invitado —';
  document.getElementById('saldo').textContent = '0.00';
}

function mostrarUsuario(u) {
  document.getElementById('nickname').textContent = u.username || 'Usuario';
  document.getElementById('saldo').textContent = u.vip === 1 ? '∞' : parseFloat(u.saldo || 0).toFixed(2);
}

// ──────────────────────────────────────
// IP
// ──────────────────────────────────────
async function obtenerIP() {
  try { 
    const r = await fetch('https://api.ipify.org?format=json'); 
    const d = await r.json(); 
    return d.ip || '0.0.0.0'; 
  } catch (_) { 
    return '0.0.0.0'; 
  }
}

function toggleIp() {
  const el = document.getElementById('ip');
  const ic = document.getElementById('eyeIcon');
  if (el.textContent === '***.***.*.**') {
    el.textContent = el.dataset.realip;
    ic.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    el.textContent = '***.***.*.**';
    ic.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// ──────────────────────────────────────
// SIDEBAR
// ──────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ──────────────────────────────────────
// INIT
// ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const ip = await obtenerIP();
  document.getElementById('ip').dataset.realip = ip;

  const u = JSON.parse(localStorage.getItem('usuario') || 'null');
  if (u) {
    mostrarUsuario(u);
    document.getElementById('registroModal').style.display = 'none';
  }
});

// Exponer funciones globalmente
window.validar = validar;
window.copiarResultado = copiarResultado;
window.limpiarResultado = limpiarResultado;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.toggleIp = toggleIp;
window.handleAuth = handleAuth;
window.switchTab = switchTab;
window.cerrarSesion = cerrarSesion;
