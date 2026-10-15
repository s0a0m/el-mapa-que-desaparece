const CSV_PATH = './argentina_forest_loss_clean.csv';
const API_BASE = 'http://localhost:5031/api/loss';

const CANCHAS_POR_HECTAREA = 1.4;
const TON_CO2_POR_HECTAREA_DEFAULT = 112;
const TON_CO2_AUTO_ANUAL = 4.6;

// Diccionario exacto ID SVG -> Nombre oficial con tildes
const NOMBRES_OFICIALES_DB = {
  "Buenos Aires": "Buenos Aires",
  "Catamarca": "Catamarca",
  "Chaco": "Chaco",
  "Chubut": "Chubut",
  "CABA": "Ciudad de Buenos Aires",
  "Cordoba": "Córdoba",
  "Corrientes": "Corrientes",
  "Entre Rios": "Entre Ríos",
  "Formosa": "Formosa",
  "Jujuy": "Jujuy",
  "La Pampa": "La Pampa",
  "La Rioja": "La Rioja",
  "Mendoza": "Mendoza",
  "Misiones": "Misiones",
  "Neuquen": "Neuquén",
  "Rio Negro": "Río Negro",
  "Salta": "Salta",
  "San Juan": "San Juan",
  "San Luis": "San Luis",
  "Santa Cruz": "Santa Cruz",
  "Santa Fe": "Santa Fe",
  "Santiago del Estero": "Santiago del Estero",
  "Tierra del Fuego": "Tierra del Fuego",
  "Tucuman": "Tucumán"
};

function formatearEmisionesCO2(emisionesMg) {
  if (!emisionesMg || emisionesMg <= 0) return "0 t CO₂e";
  if (emisionesMg >= 1000000) {
    const millones = (emisionesMg / 1000000).toFixed(2).replace('.', ',');
    return `${millones} millones t CO₂e`;
  }
  if (emisionesMg >= 10000) {
    const miles = (emisionesMg / 1000).toFixed(1).replace('.', ',');
    return `${miles} mil t CO₂e`;
  }
  return `${Math.round(emisionesMg).toLocaleString("es-AR")} t CO₂e`;
}

// Memoria principal de las 600 filas del CSV (24 provincias x 25 años)
let filasDataset = [];

// Estado del filtro temporal:
// modo = 'acumulado' (suma desde anioBase + 1 hasta anioSeleccionado; en anioBase es 0 ha)
// modo = 'unico' (muestra únicamente los datos de anioSeleccionado)
let filtroTiempo = {
  modo: 'acumulado',
  anioBase: 2000,
  anioSeleccionado: 2025
};

let datosCalculados = {
  etiquetaPeriodo: '2001–2025',
  cantidadAniosActivos: 25,
  totalNacional: 0,
  totalEmisionesMg: 0,
  porProvincia: {}
};

let estadoVisualActual = {
  totalNacional: 0,
  porProvinciaHa: {}
};

let idAnimacionActiva = null;

// Paleta de Alto Impacto Visual
const PALETA_ALERTA = [
  { limite: 0, rgb: [43, 57, 48] },   // #2b3930 - Sin pérdida / Mínima
  { limite: 5000, rgb: [124, 99, 40] },  // #7c6328 - Baja
  { limite: 45000, rgb: [217, 119, 6] },  // #d97706 - Moderada
  { limite: 160000, rgb: [234, 88, 12] },  // #ea580c - Alta
  { limite: 600000, rgb: [239, 35, 60] }   // #ef233c - Crítica
];

// En modo "1 Año Específico" ajustamos la escala para que un solo año se vea igual de expresivo
const PALETA_ANIO_UNICO = [
  { limite: 0, rgb: [43, 57, 48] },
  { limite: 300, rgb: [124, 99, 40] },
  { limite: 2500, rgb: [217, 119, 6] },
  { limite: 10000, rgb: [234, 88, 12] },
  { limite: 35000, rgb: [239, 35, 60] }
];

function calcularColorPorHectareas(ha) {
  if (ha <= 0) return `rgb(43, 57, 48)`;
  const paleta = filtroTiempo.modo === 'unico' ? PALETA_ANIO_UNICO : PALETA_ALERTA;

  for (let i = 0; i < paleta.length - 1; i++) {
    const actual = paleta[i];
    const siguiente = paleta[i + 1];

    if (ha >= actual.limite && ha <= siguiente.limite) {
      const factor = (ha - actual.limite) / (siguiente.limite - actual.limite);
      const r = Math.round(actual.rgb[0] + factor * (siguiente.rgb[0] - actual.rgb[0]));
      const g = Math.round(actual.rgb[1] + factor * (siguiente.rgb[1] - actual.rgb[1]));
      const b = Math.round(actual.rgb[2] + factor * (siguiente.rgb[2] - actual.rgb[2]));
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  const max = paleta[paleta.length - 1].rgb;
  return `rgb(${max[0]}, ${max[1]}, ${max[2]})`;
}

// Síntesis ambiental por provincia con enlaces oficiales verificados
const CONTEXTO_PROVINCIAS = {
  "Santiago del Estero": {
    region: "GRAN CHACO AMERICANO (CHACO SECO)",
    driver: "Expansión Agropecuaria Permanente (Soja y Ganadería)",
    explicacion: "Epicentro de la deforestación en Argentina. Concentra cerca del 30% de toda la pérdida nacional debido a la reconversión a gran escala de bosque chaqueño seco en tierras agrícolas y pasturas ganaderas.",
    noticias: [
      { titulo: "Los bosques perdidos del Gran Chaco argentino: análisis e impacto", fuente: "Mongabay Latam", url: "https://es.mongabay.com/2020/05/deforestacion-gran-chaco-argentina-bosques/" },
      { titulo: "Monitoreo oficial de la superficie de bosques nativos (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Salta": {
    region: "GRAN CHACO Y SELVA DE YUNGAS",
    driver: "Avance de la Frontera Agroganadera",
    explicacion: "Segunda provincia con mayor pérdida acumulada del país. Los departamentos de Anta, San Martín y Orán concentran los desmontes sobre el bosque chaqueño y la transición pedemontana.",
    noticias: [
      { titulo: "Monitoreo de la superficie de bosques nativos (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" },
      { titulo: "Proyectos en el Parque Chaqueño (Orán, San Martín y Rivadavia)", fuente: "Bosques Nativos y Comunidad", url: "https://www.argentina.gob.ar/ambiente/bosques/comunidad" }
    ]
  },
  "Chaco": {
    region: "GRAN CHACO AMERICANO",
    driver: "Desmonte Mecánico y Extracción Forestal",
    explicacion: "Supera el millón de hectáreas perdidas desde 2001. La presión agroganadera y la extracción maderera (quebracho y algarrobo) amenazan la conectividad biológica de El Impenetrable.",
    noticias: [
      { titulo: "El Chaco perdió más bosques por incendios y deforestación", fuente: "Mongabay Latam", url: "https://es.mongabay.com/short-article/2026/02/argentina-chaco-aumento-deforestacion-incendios-2025/" },
      { titulo: "Monitoreo satelital e Inventario de Bosques Nativos (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Formosa": {
    region: "GRAN CHACO AMERICANO",
    driver: "Reconversión Ganadera y Sistemas Silvopastoriles",
    explicacion: "Integra el bloque de las 4 provincias norteñas que explican el 76% de la pérdida arbórea nacional, impulsada por el cambio de uso de suelo para ganadería extensiva e intensiva.",
    noticias: [
      { titulo: "Análisis sobre desmontes en el Gran Chaco argentino", fuente: "Mongabay Latam", url: "https://es.mongabay.com/2020/05/deforestacion-gran-chaco-argentina-bosques/" },
      { titulo: "Tablero estadístico subnacional de Global Forest Watch", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "Misiones": {
    region: "SELVA PARANAENSE (BOSQUE ATLÁNTICO)",
    driver: "Silvicultura Comercial y Fragmentación Agrícola",
    explicacion: "Las mediciones satelitales en Misiones reflejan tanto la cosecha rotativa de grandes plantaciones forestales (pino y eucalipto) como el desmonte a pequeña escala en bordes de la Selva Paranaense.",
    noticias: [
      { titulo: "Monitoreo de Bosques Nativos y Selva Paranaense (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Tucuman": {
    region: "SELVA DE YUNGAS Y CHACO SEMIÁRIDO",
    driver: "Expansión Agrícola en el Este y Pedemonte",
    explicacion: "Pese a ser la provincia continental más pequeña de Argentina, perdió más de 150.000 hectáreas desde 2001. La reducción del bosque pedemontano y chaqueño disminuye la retención hídrica en las cuencas.",
    noticias: [
      { titulo: "Informes de monitoreo de Yungas y Parque Chaqueño (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Cordoba": {
    region: "ESPINAL Y BOSQUE SERRANO",
    driver: "Incendios Forestales y Urbanización Serrana",
    explicacion: "Tras perder la mayor parte de su bosque de espinal durante el siglo XX, la pérdida actual en Córdoba está fuertemente impulsada por incendios estacionales en las sierras y expansión urbana.",
    noticias: [
      { titulo: "Manejo sostenible y Ley 26.331 de Bosques Nativos", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/manejo-sostenible" }
    ]
  }
};

function obtenerContextoProvincia(idNormalizado, nombreOriginal, lossHa) {
  const nombreProvincia = (nombreOriginal || NOMBRES_OFICIALES_DB[idNormalizado] || idNormalizado).trim();

  const paramsNoticias = new URLSearchParams({
    tbm: 'nws',
    q: `deforestacion desmontes bosques ${nombreProvincia} Argentina`
  });
  const paramsAcademico = new URLSearchParams({
    q: `deforestacion bosque nativo ${nombreProvincia} Argentina`
  });

  const linksDinamicosProvincia = [
    {
      titulo: `Noticias sobre desmontes y bosques en ${nombreProvincia}`,
      fuente: `Google Noticias · Búsqueda directa de ${nombreProvincia}`,
      url: `https://www.google.com/search?${paramsNoticias.toString()}`
    },
    {
      titulo: `Estudios científicos sobre bosques en ${nombreProvincia}`,
      fuente: `Google Académico · Investigaciones en ${nombreProvincia}`,
      url: `https://scholar.google.com/scholar?${paramsAcademico.toString()}`
    }
  ];

  if (CONTEXTO_PROVINCIAS[idNormalizado]) {
    const base = CONTEXTO_PROVINCIAS[idNormalizado];
    return { ...base, noticias: [...linksDinamicosProvincia, ...base.noticias] };
  }
  if (lossHa < 15000) {
    return {
      region: "ESTEPA, MONTE ÁRIDO O PASTIZAL PAMPEANO",
      driver: "Baja Cobertura Forestal Natural e Incendios Localizados",
      explicacion: `${nombreProvincia} registra una pérdida arbórea baja en términos absolutos porque su territorio está dominado naturalmente por estepa patagónica, monte arbustivo árido o pastizal, con poca superficie de bosque denso (>30% de cobertura).`,
      noticias: [
        ...linksDinamicosProvincia,
        { titulo: "Monitoreo de la superficie de bosques nativos (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
      ]
    };
  }
  return {
    region: "BOSQUES NATIVOS Y PLANTACIONES FORESTALES",
    driver: "Incendios Estacionales, Silvicultura y Frontera Agroganadera",
    explicacion: `En ${nombreProvincia}, la pérdida de cobertura combina incendios forestales (frecuentes en bosques andino-patagónicos o del espinal), rotación de plantaciones madereras y avance agropecuario.`,
    noticias: [
      ...linksDinamicosProvincia,
      { titulo: "Informes nacionales de monitoreo de bosques nativos (UMSEF)", fuente: "Argentina.gob.ar", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  };
}

function normalizarNombreProvincia(nombre) {
  if (nombre === "Ciudad de Buenos Aires") return "CABA";
  return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// --- LECTURA DEL CSV LOCAL EN EL NAVEGADOR (CERO SERVIDOR NECESARIO) ---
function parsearCSV(textoCsv) {
  const lineas = textoCsv.trim().split(/\r?\n/);
  if (lineas.length < 2) return [];

  const cabeceras = lineas[0].split(',').map(h => h.trim());
  const idxProv = cabeceras.indexOf('province');
  const idxYear = cabeceras.indexOf('year');
  const idxLoss = cabeceras.indexOf('loss_ha');
  const idxExtent = cabeceras.indexOf('extent_2000_ha');
  const idxEmis = cabeceras.indexOf('emissions_co2e_mg');
  const idxDriver = cabeceras.indexOf('dominant_driver');

  const resultado = [];
  for (let i = 1; i < lineas.length; i++) {
    if (!lineas[i].trim()) continue;
    const cols = lineas[i].split(',');

    const province = cols[idxProv]?.trim();
    const year = parseInt(cols[idxYear], 10);
    const lossHa = parseFloat(cols[idxLoss]) || 0;
    const extent2000Ha = idxExtent !== -1 ? (parseFloat(cols[idxExtent]) || 0) : 0;
    const emissionsMg = idxEmis !== -1
      ? (parseFloat(cols[idxEmis]) || 0)
      : (lossHa * TON_CO2_POR_HECTAREA_DEFAULT);
    const driver = idxDriver !== -1 ? cols[idxDriver]?.trim() : '';

    if (province && !isNaN(year)) {
      resultado.push({
        province,
        idSvg: normalizarNombreProvincia(province),
        year,
        lossHa,
        extent2000Ha,
        // Si en ese año no hubo pérdida de hectáreas, las emisiones por desmonte son 0
        emissionsMg: lossHa > 0 ? emissionsMg : 0,
        driver
      });
    }
  }
  return resultado;
}

async function inicializarDataset() {
  try {
    // 1. Intentamos cargar el CSV local directamente (ideal para Vercel / Netlify / GitHub Pages)
    const resCsv = await fetch(CSV_PATH);
    if (resCsv.ok) {
      const texto = await resCsv.text();
      filasDataset = parsearCSV(texto);
      if (filasDataset.length > 0) {
        recalcularYActualizarVista();
        return;
      }
    }
  } catch (e) {
    console.warn("CSV local no encontrado en la carpeta Frontend, probando API local...", e);
  }

  // 2. Si el usuario aún no copió el CSV a Frontend/, reconstruimos año por año desde la API local .NET
  try {
    const promesas = [];
    for (let y = 2001; y <= 2025; y++) {
      promesas.push(fetch(`${API_BASE}/national?birthYear=${y}`).then(r => r.json()));
    }
    const respuestasPorAnio = await Promise.all(promesas);
    const mapaAcumulado = {};

    respuestasPorAnio.forEach(r => {
      mapaAcumulado[r.year] = {};
      r.provinces_data.forEach(p => {
        const nom = p.province || p.Province;
        mapaAcumulado[r.year][nom] = {
          loss: p.totalLossHa ?? p.TotalLossHa ?? 0,
          emis: p.totalEmissionsMg ?? p.TotalEmissionsMg ?? 0,
          extent: p.extent2000Ha ?? p.Extent2000Ha ?? 0
        };
      });
    });

    filasDataset = [];
    const nombresProv = Object.keys(mapaAcumulado[2001] || {});
    nombresProv.forEach(nom => {
      for (let y = 2001; y <= 2025; y++) {
        const actual = mapaAcumulado[y][nom];
        const sig = y < 2025 ? mapaAcumulado[y + 1][nom] : { loss: 0, emis: 0 };
        const lossAnual = Math.max(0, actual.loss - sig.loss);
        const emisAnual = lossAnual > 0
          ? Math.max(0, actual.emis - sig.emis) || (lossAnual * TON_CO2_POR_HECTAREA_DEFAULT)
          : 0;

        filasDataset.push({
          province: nom,
          idSvg: normalizarNombreProvincia(nom),
          year: y,
          lossHa: lossAnual,
          extent2000Ha: actual.extent,
          emissionsMg: emisAnual,
          driver: ''
        });
      }
    });

    recalcularYActualizarVista();
  } catch (err) {
    document.getElementById('dato-narrativo').innerText = "Falta el CSV";
    document.getElementById('dato-equivalencia').innerText =
      "Copia 'argentina_forest_loss_clean.csv' dentro de tu carpeta Frontend.";
    console.error(err);
  }
}

// --- CÁLCULO EXACTO EN MEMORIA SEGÚN EL MODO Y AÑO ELEGIDO ---
function recalcularYActualizarVista() {
  if (filasDataset.length === 0) return;

  const { modo, anioBase, anioSeleccionado } = filtroTiempo;
  const agrupadoPorProv = {};

  // Inicializar las 24 provincias en 0
  Object.keys(NOMBRES_OFICIALES_DB).forEach(idSvg => {
    agrupadoPorProv[idSvg] = {
      idSvg,
      nombreOriginal: NOMBRES_OFICIALES_DB[idSvg],
      lossHa: 0,
      emissionsMg: 0,
      extent2000Ha: 0,
      peakYear: 0,
      peakLossHa: 0,
      historicalPeakYear: 0,
      historicalPeakLossHa: 0,
      driversSum: {}
    };
  });

  filasDataset.forEach(fila => {
    const item = agrupadoPorProv[fila.idSvg];
    if (!item) return;

    item.nombreOriginal = fila.province;
    if (fila.extent2000Ha > 0) item.extent2000Ha = fila.extent2000Ha;

    // Guardamos el récord histórico 2001-2025 de cada provincia
    if (fila.lossHa > item.historicalPeakLossHa) {
      item.historicalPeakLossHa = fila.lossHa;
      item.historicalPeakYear = fila.year;
    }

    // ¿Entra esta fila en el filtro actual?
    let entraEnFiltro = false;
    if (modo === 'unico') {
      entraEnFiltro = (fila.year === anioSeleccionado);
    } else {
      // Modo acumulado progresivo: si anioSeleccionado == anioBase, no entra ningún año (0 ha)
      entraEnFiltro = (fila.year > anioBase && fila.year <= anioSeleccionado);
    }

    if (entraEnFiltro) {
      item.lossHa += fila.lossHa;
      item.emissionsMg += fila.emissionsMg;

      if (fila.lossHa > item.peakLossHa) {
        item.peakLossHa = fila.lossHa;
        item.peakYear = fila.year;
      }

      if (fila.driver && fila.driver !== 'Sin perturbación dominante' && fila.lossHa > 0) {
        item.driversSum[fila.driver] = (item.driversSum[fila.driver] || 0) + fila.lossHa;
      }
    }
  });

  let totalNacional = 0;
  let totalEmisionesMg = 0;
  const nuevasProvinciasHa = {};

  Object.values(agrupadoPorProv).forEach(prov => {
    prov.lossHa = Math.round(prov.lossHa);
    // Regla estricta: si lossHa es 0, las emisiones por deforestación son 0 (evita el bug de San Juan)
    prov.emissionsMg = prov.lossHa > 0 ? Math.round(prov.emissionsMg) : 0;

    let topDriver = '';
    let maxDriverHa = 0;
    Object.entries(prov.driversSum).forEach(([drv, ha]) => {
      if (ha > maxDriverHa) {
        maxDriverHa = ha;
        topDriver = drv;
      }
    });
    prov.dominantDriver = topDriver;

    totalNacional += prov.lossHa;
    totalEmisionesMg += prov.emissionsMg;
    nuevasProvinciasHa[prov.idSvg] = prov.lossHa;
  });

  // Etiqueta del período y cantidad de años activos
  let etiquetaPeriodo = '';
  let cantidadAniosActivos = 1;

  if (modo === 'unico') {
    etiquetaPeriodo = `Año ${anioSeleccionado}`;
    cantidadAniosActivos = 1;
    document.getElementById('kpi-titulo-periodo').innerText = `PÉRDIDA NACIONAL EN EL AÑO`;
  } else {
    document.getElementById('kpi-titulo-periodo').innerText = `PÉRDIDA NACIONAL ACUMULADA`;
    if (anioSeleccionado <= anioBase) {
      etiquetaPeriodo = `${anioBase} (Base 0 ha)`;
      cantidadAniosActivos = 0;
    } else if (anioSeleccionado === anioBase + 1) {
      etiquetaPeriodo = `Año ${anioSeleccionado}`;
      cantidadAniosActivos = 1;
    } else {
      etiquetaPeriodo = `${anioBase + 1}–${anioSeleccionado}`;
      cantidadAniosActivos = anioSeleccionado - anioBase;
    }
  }

  datosCalculados = {
    etiquetaPeriodo,
    cantidadAniosActivos,
    totalNacional,
    totalEmisionesMg,
    porProvincia: agrupadoPorProv
  };

  animarTransicionDelta(totalNacional, totalEmisionesMg, nuevasProvinciasHa);

  // Si hay una provincia abierta en el inspector lateral, actualizarla en vivo
  const provActiva = document.querySelector('#mapa-contenedor path.provincia-path.activa');
  if (provActiva) {
    abrirInspectorProvincia(provActiva.getAttribute('id'));
  }
}

function animarTransicionDelta(totalDestino, emisionesDestino, mapaProvinciasDestino) {
  if (idAnimacionActiva) cancelAnimationFrame(idAnimacionActiva);

  const totalOrigen = estadoVisualActual.totalNacional;
  const provinciasOrigen = { ...estadoVisualActual.porProvinciaHa };

  const duracionMs = 300;
  const inicioTiempo = performance.now();
  const paths = document.querySelectorAll('#mapa-contenedor path.provincia-path');

  function frame(tiempoActual) {
    const transcurrido = tiempoActual - inicioTiempo;
    const t = Math.min(1, transcurrido / duracionMs);
    const ease = 1 - Math.pow(1 - t, 3);

    const totalInterpolado = Math.round(totalOrigen + ease * (totalDestino - totalOrigen));
    const emisionesInterpoladas = totalDestino > 0
      ? Math.round((totalInterpolado / totalDestino) * emisionesDestino)
      : 0;

    estadoVisualActual.totalNacional = totalInterpolado;

    paths.forEach(path => {
      const idSvg = path.getAttribute('id');
      const haInicio = provinciasOrigen[idSvg] ?? 0;
      const haFin = mapaProvinciasDestino[idSvg] ?? 0;
      const haActual = haInicio + ease * (haFin - haInicio);

      estadoVisualActual.porProvinciaHa[idSvg] = haActual;
      path.style.fill = calcularColorPorHectareas(haActual);
    });

    actualizarTextosNacionales(totalInterpolado, emisionesInterpoladas);

    if (t < 1) {
      idAnimacionActiva = requestAnimationFrame(frame);
    } else {
      document.getElementById('anunciador-accesible').innerText =
        `${totalDestino.toLocaleString("es-AR")} hectáreas en ${datosCalculados.etiquetaPeriodo}`;
    }
  }

  idAnimacionActiva = requestAnimationFrame(frame);
}

function actualizarTextosNacionales(hectareasActuales, emisionesMg) {
  document.getElementById('indicador-anio').innerText = datosCalculados.etiquetaPeriodo;
  document.getElementById('dato-narrativo').innerText = `${hectareasActuales.toLocaleString("es-AR")} ha`;

  if (hectareasActuales <= 0 || datosCalculados.cantidadAniosActivos === 0) {
    document.getElementById('dato-equivalencia').innerText =
      `Punto de partida en cero (${filtroTiempo.anioBase}). Desliza la barra hacia la derecha para avanzar año por año.`;
    document.getElementById('dato-co2-nacional').innerText =
      `Emisiones acumuladas: 0 t CO₂e (Avanza de año para calcular el impacto climático).`;
    return;
  }

  const canchas = Math.round(hectareasActuales * CANCHAS_POR_HECTAREA);
  const cantAnios = Math.max(1, datosCalculados.cantidadAniosActivos);
  const haPorDia = Math.round(hectareasActuales / (cantAnios * 365));

  document.getElementById('dato-equivalencia').innerText =
    `Equivale a ${canchas.toLocaleString("es-AR")} canchas de fútbol profesional (${haPorDia.toLocaleString("es-AR")} hectáreas desmontadas por día en promedio).`;

  const textoCo2 = formatearEmisionesCO2(emisionesMg);
  const autosEquivalentes = Math.round(emisionesMg / TON_CO2_AUTO_ANUAL);

  document.getElementById('dato-co2-nacional').innerText =
    `Emisiones del período: ${textoCo2} (equivale a las emisiones de ${autosEquivalentes.toLocaleString("es-AR")} autos durante un año).`;
}

// --- INSPECTOR DE PROVINCIA (CORREGIDO Y SIN CONTRADICCIONES DE CO2) ---
function abrirInspectorProvincia(idProv) {
  const panel = document.getElementById('panel-provincia');
  const info = datosCalculados.porProvincia[idProv];
  if (!info) return;

  const nombreConsulta = info.nombreOriginal;
  const lossHa = info.lossHa;
  const extent2000 = Math.round(info.extent2000Ha);
  // Si lossHa es 0, emisionesMg es estrictamente 0
  const emisionesMg = lossHa > 0 ? info.emissionsMg : 0;

  panel.classList.remove('oculto');
  document.getElementById('prov-nombre').innerText = nombreConsulta.toUpperCase();
  document.getElementById('prov-label-superficie').innerText =
    `SUPERFICIE DEFORESTADA (${datosCalculados.etiquetaPeriodo.toUpperCase()})`;

  // 1. Hectáreas y equivalencia local
  let textoBosquePropio = "";
  if (extent2000 > 0 && lossHa > 0) {
    const pctPropio = ((lossHa / extent2000) * 100).toFixed(1).replace('.', ',');
    textoBosquePropio = `Representa el ${pctPropio}% de su bosque existente en el año 2000 (${extent2000.toLocaleString("es-AR")} ha). `;
  }

  const canchasProv = Math.round(lossHa * CANCHAS_POR_HECTAREA);
  document.getElementById('prov-hectareas').innerText = `${lossHa.toLocaleString("es-AR")} ha`;
  document.getElementById('prov-equivalencia-local').innerText = lossHa > 0
    ? `${textoBosquePropio}Equivale a ${canchasProv.toLocaleString("es-AR")} canchas de fútbol profesional.`
    : `Sin pérdida arbórea registrada en ${datosCalculados.etiquetaPeriodo}.`;

  // 2. Aporte al total nacional
  let textoPorcentaje = "0% del país";
  if (lossHa > 0 && datosCalculados.totalNacional > 0) {
    const pct = (lossHa / datosCalculados.totalNacional) * 100;
    textoPorcentaje = pct < 0.1
      ? "< 0,1% del país"
      : `${pct.toFixed(1).replace('.', ',')}% del país`;
  }
  document.getElementById('prov-porcentaje').innerText = textoPorcentaje;

  // 3. Pico anual (en el período o récord histórico 2001-2025)
  if (filtroTiempo.modo === 'unico') {
    document.getElementById('prov-label-pico').innerText = "RÉCORD HISTÓRICO (2001–2025)";
    const hLoss = Math.round(info.historicalPeakLossHa);
    document.getElementById('prov-peor-anio').innerText = hLoss > 0
      ? `${info.historicalPeakYear} (${hLoss.toLocaleString("es-AR")} ha)`
      : "Sin pico registrado";
  } else {
    document.getElementById('prov-label-pico').innerText = "PEOR AÑO DEL PERÍODO";
    const pLoss = Math.round(info.peakLossHa);
    document.getElementById('prov-peor-anio').innerText = (lossHa > 0 && pLoss > 0)
      ? `${info.peakYear} (${pLoss.toLocaleString("es-AR")} ha)`
      : "Sin pico en el período";
  }

  // 4. Impacto climático coherente (Si lossHa es 0 -> muestra 0 t CO₂e y sin emisiones)
  if (lossHa > 0 && emisionesMg > 0) {
    const autosProv = Math.round(emisionesMg / TON_CO2_AUTO_ANUAL);
    document.getElementById('prov-co2').innerText = formatearEmisionesCO2(emisionesMg);
    document.getElementById('prov-co2-autos').innerText =
      `Gases liberados al talar o quemar esta biomasa forestal: equivale a las emisiones anuales de ${autosProv.toLocaleString("es-AR")} autos.`;
  } else {
    document.getElementById('prov-co2').innerText = "0 t CO₂e";
    document.getElementById('prov-co2-autos').innerText = "Sin emisiones por deforestación en el período seleccionado.";
  }

  // 5. Causa principal y reportes
  const ctxData = obtenerContextoProvincia(idProv, nombreConsulta, lossHa);
  document.getElementById('prov-region').innerText = ctxData.region;
  document.getElementById('prov-driver').innerText = info.dominantDriver || ctxData.driver;
  document.getElementById('prov-explicacion').innerText = ctxData.explicacion;

  const ulNoticias = document.getElementById('prov-noticias');
  ulNoticias.innerHTML = '';
  ctxData.noticias.forEach(n => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = n.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = `↗ ${n.titulo}`;

    const span = document.createElement('span');
    span.textContent = `Fuente: ${n.fuente}`;

    li.appendChild(a);
    li.appendChild(span);
    ulNoticias.appendChild(li);
  });
}

// --- CONTROLES DE INTERFAZ Y EVENTOS ---
function actualizarLimitesControles() {
  const slider = document.getElementById('slider-anio');
  const inputFin = document.getElementById('input-anio-fin');
  const filaBase = document.getElementById('fila-anio-base');
  const labelSlider = document.getElementById('label-slider');
  const tickMin = document.getElementById('tick-min');
  const tickMid1 = document.getElementById('tick-mid1');
  const tickMid2 = document.getElementById('tick-mid2');

  if (filtroTiempo.modo === 'unico') {
    filaBase.classList.add('oculto');
    labelSlider.innerText = "SELECCIONA EL AÑO ESPECÍFICO:";
    slider.min = 2001;
    inputFin.min = 2001;
    if (filtroTiempo.anioSeleccionado < 2001) {
      filtroTiempo.anioSeleccionado = 2001;
    }
    tickMin.innerText = "2001";
    tickMid1.innerText = "2009";
    tickMid2.innerText = "2017";
  } else {
    filaBase.classList.remove('oculto');
    labelSlider.innerText = "AVANZAR HASTA EL AÑO:";
    slider.min = filtroTiempo.anioBase;
    inputFin.min = filtroTiempo.anioBase;
    if (filtroTiempo.anioSeleccionado < filtroTiempo.anioBase) {
      filtroTiempo.anioSeleccionado = filtroTiempo.anioBase;
    }
    const rango = 2025 - filtroTiempo.anioBase;
    tickMin.innerText = `${filtroTiempo.anioBase} (0 ha)`;
    tickMid1.innerText = Math.round(filtroTiempo.anioBase + rango * 0.33);
    tickMid2.innerText = Math.round(filtroTiempo.anioBase + rango * 0.66);
  }

  slider.value = filtroTiempo.anioSeleccionado;
  inputFin.value = filtroTiempo.anioSeleccionado;
}

function inicializarControlesTiempo() {
  const btnAcumulado = document.getElementById('btn-modo-acumulado');
  const btnUnico = document.getElementById('btn-modo-unico');
  const inputBase = document.getElementById('input-anio-base');
  const inputFin = document.getElementById('input-anio-fin');
  const slider = document.getElementById('slider-anio');

  btnAcumulado.addEventListener('click', () => {
    filtroTiempo.modo = 'acumulado';
    btnAcumulado.classList.add('activo');
    btnUnico.classList.remove('activo');
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  btnUnico.addEventListener('click', () => {
    filtroTiempo.modo = 'unico';
    btnUnico.classList.add('activo');
    btnAcumulado.classList.remove('activo');
    if (filtroTiempo.anioSeleccionado <= 2000) filtroTiempo.anioSeleccionado = 2021;
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  inputBase.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 2000 && val <= 2024) {
      filtroTiempo.anioBase = val;
      // Si el usuario cambia el año base (ej. pone 2020), situamos la barra en 2020 (0 ha) para que avance desde ahí
      filtroTiempo.anioSeleccionado = val;
      actualizarLimitesControles();
      recalcularYActualizarVista();
    }
  });

  slider.addEventListener('input', (e) => {
    filtroTiempo.anioSeleccionado = parseInt(e.target.value, 10);
    inputFin.value = filtroTiempo.anioSeleccionado;
    recalcularYActualizarVista();
  });

  inputFin.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    const minPermitido = filtroTiempo.modo === 'unico' ? 2001 : filtroTiempo.anioBase;
    if (val >= minPermitido && val <= 2025) {
      filtroTiempo.anioSeleccionado = val;
      slider.value = val;
      recalcularYActualizarVista();
    }
  });
}

function prepararEstructuraYLinks() {
  const panelIzq = document.getElementById('panel-izquierdo');
  if (!panelIzq) return;

  let bloqueInferior = panelIzq.querySelector('.bloque-inferior-info');
  if (!bloqueInferior) {
    bloqueInferior = document.createElement('div');
    bloqueInferior.className = 'bloque-inferior-info';
    panelIzq.appendChild(bloqueInferior);
  }

  const co2Box = document.querySelector('.info-co2-box');
  const footer = document.querySelector('.creditos-metodologia');
  if (co2Box && co2Box.parentElement !== bloqueInferior) bloqueInferior.appendChild(co2Box);
  if (footer && footer.parentElement !== bloqueInferior) bloqueInferior.appendChild(footer);

  sincronizarPosicionMapaResponsive();
}

function sincronizarPosicionMapaResponsive() {
  const panelIzq = document.getElementById('panel-izquierdo');
  const mapa = document.getElementById('mapa-contenedor');
  const bloqueInferior = document.querySelector('.bloque-inferior-info');
  const panelProvincia = document.getElementById('panel-provincia');

  if (!panelIzq || !mapa || !bloqueInferior) return;

  if (window.innerWidth <= 1024) {
    if (mapa.parentElement !== panelIzq) {
      panelIzq.insertBefore(mapa, bloqueInferior);
    }
  } else {
    if (mapa.parentElement !== document.body) {
      document.body.insertBefore(mapa, panelProvincia);
    }
  }
}

window.addEventListener('resize', sincronizarPosicionMapaResponsive);

function centrarGeometriaSvg() {
  const svg = document.querySelector('#mapa-contenedor svg');
  if (!svg) return;

  try {
    const bbox = svg.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      const pad = Math.max(bbox.width, bbox.height) * 0.02;
      svg.setAttribute(
        'viewBox',
        `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`
      );
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  } catch (e) {
    console.warn("No se pudo recalcular el viewBox del SVG:", e);
  }
}

function inicializarEventosMapa() {
  const svg = document.querySelector('#mapa-contenedor svg');
  if (!svg) return;

  const paths = svg.querySelectorAll('path');
  if (paths.length === 0) return;

  const contenedorPaths = paths[0].parentNode;

  const bordeActivo = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bordeActivo.setAttribute('id', 'svg-borde-activo');
  contenedorPaths.appendChild(bordeActivo);

  const bordeHover = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  bordeHover.setAttribute('id', 'svg-borde-hover');
  contenedorPaths.appendChild(bordeHover);

  const tooltip = document.getElementById('tooltip');

  paths.forEach(path => {
    const idProv = path.getAttribute('id');
    if (!idProv || idProv.startsWith('svg-borde')) return;

    path.classList.add('provincia-path');

    path.addEventListener('mouseenter', () => {
      bordeHover.setAttribute('d', path.getAttribute('d') || '');
      const transform = path.getAttribute('transform');
      if (transform) bordeHover.setAttribute('transform', transform);
      else bordeHover.removeAttribute('transform');
    });

    path.addEventListener('mousemove', (e) => {
      const info = datosCalculados.porProvincia[idProv];
      const nombreMostrar = info ? info.nombreOriginal : (NOMBRES_OFICIALES_DB[idProv] || idProv);
      const hectareasMostrar = info ? info.lossHa.toLocaleString("es-AR") : "0";

      tooltip.innerHTML = `
                <strong>${nombreMostrar.toUpperCase()}</strong>
                Pérdida (${datosCalculados.etiquetaPeriodo}): <span class="tt-ha">${hectareasMostrar} ha</span>
                <span class="tt-hint">Clic para ver causas, pico histórico y CO₂</span>
            `;
      tooltip.classList.remove('oculto');
      tooltip.style.left = `${e.clientX + 16}px`;
      tooltip.style.top = `${e.clientY + 16}px`;
    });

    path.addEventListener('mouseleave', () => {
      bordeHover.removeAttribute('d');
      tooltip.classList.add('oculto');
    });

    path.addEventListener('click', () => {
      paths.forEach(p => p.classList.remove('activa'));
      path.classList.add('activa');

      bordeActivo.setAttribute('d', path.getAttribute('d') || '');
      const transform = path.getAttribute('transform');
      if (transform) bordeActivo.setAttribute('transform', transform);
      else bordeActivo.removeAttribute('transform');

      abrirInspectorProvincia(idProv);
    });
  });

  centrarGeometriaSvg();
}

document.getElementById('btn-cerrar-panel').addEventListener('click', () => {
  document.getElementById('panel-provincia').classList.add('oculto');
  document.querySelectorAll('#mapa-contenedor path.provincia-path').forEach(p => p.classList.remove('activa'));
  const bordeActivo = document.getElementById('svg-borde-activo');
  if (bordeActivo) bordeActivo.removeAttribute('d');
});

window.addEventListener('DOMContentLoaded', () => {
  prepararEstructuraYLinks();
  inicializarControlesTiempo();
  inicializarEventosMapa();
  actualizarLimitesControles();
  inicializarDataset();
});
