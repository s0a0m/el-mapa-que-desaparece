import { HITOS_CRONOLOGICOS } from './cronica-historica.js';

const CSV_PATH = './argentina_forest_loss_clean.csv';

export const NOMBRES_OFICIALES_DB = {
  "Buenos Aires": "Buenos Aires", "Catamarca": "Catamarca", "Chaco": "Chaco",
  "Chubut": "Chubut", "CABA": "Ciudad de Buenos Aires", "Cordoba": "Córdoba",
  "Corrientes": "Corrientes", "Entre Rios": "Entre Ríos", "Formosa": "Formosa",
  "Jujuy": "Jujuy", "La Pampa": "La Pampa", "La Rioja": "La Rioja",
  "Mendoza": "Mendoza", "Misiones": "Misiones", "Neuquen": "Neuquén",
  "Rio Negro": "Río Negro", "Salta": "Salta", "San Juan": "San Juan",
  "San Luis": "San Luis", "Santa Cruz": "Santa Cruz", "Santa Fe": "Santa Fe",
  "Santiago del Estero": "Santiago del Estero", "Tierra del Fuego": "Tierra del Fuego",
  "Tucuman": "Tucumán"
};

export const filtroTiempo = {
  modo: 'acumulado',
  anioBase: 2000,
  anioSeleccionado: 2025
};

export let datosCalculados = {
  etiquetaPeriodo: '2001–2025',
  totalNacional: 0,
  serieNacionalAnual: {},
  porProvincia: {}
};

let filasDataset = [];
let estadoVisualActual = { totalNacional: 0, porProvinciaHa: {} };
let idAnimacionActiva = null;
let callbackActualizarInspector = null;
let callbackDatasetListo = null;

export function registrarCallbackInspector(fn) {
  callbackActualizarInspector = fn;
}

export function registrarCallbackDatasetListo(fn) {
  callbackDatasetListo = fn;
}

export function normalizarNombreProvincia(nombre) {
  if (nombre === "Ciudad de Buenos Aires") return "CABA";
  return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function formatearEmisionesCO2(emisionesMg) {
  if (!emisionesMg || emisionesMg <= 0) return "0 t CO₂e";
  if (emisionesMg >= 1000000) {
    return `${(emisionesMg / 1000000).toFixed(1).replace('.', ',')} M t CO₂e`;
  }
  if (emisionesMg >= 10000) {
    return `${(emisionesMg / 1000).toFixed(1).replace('.', ',')} mil t CO₂e`;
  }
  return `${Math.round(emisionesMg).toLocaleString("es-AR")} t CO₂e`;
}

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
    const rawEmis = idxEmis !== -1 ? (parseFloat(cols[idxEmis]) || 0) : 0;
    const driver = idxDriver !== -1 ? cols[idxDriver]?.trim() : '';

    if (province && !isNaN(year)) {
      resultado.push({
        province,
        idSvg: normalizarNombreProvincia(province),
        year,
        lossHa,
        extent2000Ha,
        emissionsMg: lossHa > 0 ? rawEmis : 0,
        driver
      });
    }
  }
  return resultado;
}

export function obtenerPaletaActiva() {
  const limites = filtroTiempo.modo === 'unico'
    ? [0, 300, 2500, 10000, 35000]
    : [0, 5000, 45000, 160000, 600000];

  const coloresPapel = [
    [221, 213, 196],
    [224, 178, 107],
    [212, 122, 42],
    [181, 63, 26],
    [122, 22, 22]
  ];

  return limites.map((limite, i) => ({ limite, rgb: coloresPapel[i] }));
}

export function calcularColorPorHectareas(ha) {
  const paleta = obtenerPaletaActiva();
  if (ha <= 0) {
    const base = paleta[0].rgb;
    return `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
  }

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

export function actualizarCronicaHistorica(anioReferencia) {
  const hitos = HITOS_CRONOLOGICOS || [];
  const hito = hitos.find(h => anioReferencia >= h.rango[0] && anioReferencia <= h.rango[1]) || hitos[hitos.length - 1];
  if (!hito) return;

  const epigrafe = document.getElementById('hito-epigrafe');
  const titulo = document.getElementById('hito-titulo');
  const resumen = document.getElementById('hito-resumen');
  const link = document.getElementById('hito-link');

  if (epigrafe) epigrafe.textContent = hito.epigrafe;
  if (titulo) titulo.textContent = hito.titulo;
  if (resumen) resumen.textContent = hito.resumen;
  if (link) {
    link.href = hito.fuenteUrl;
    link.textContent = `↗ Fuente: ${hito.fuenteTexto}`;
  }
}

function animarTransicionDelta(totalDestino, mapaProvinciasDestino) {
  if (idAnimacionActiva) cancelAnimationFrame(idAnimacionActiva);

  const totalOrigen = estadoVisualActual.totalNacional;
  const provinciasOrigen = { ...estadoVisualActual.porProvinciaHa };

  const duracionMs = 240;
  const inicioTiempo = performance.now();
  const paths = document.querySelectorAll('#mapa-contenedor path.provincia-path');

  function frame(tiempoActual) {
    const transcurrido = tiempoActual - inicioTiempo;
    const t = Math.min(1, transcurrido / duracionMs);
    const ease = 1 - Math.pow(1 - t, 3);

    const totalInterpolado = Math.round(totalOrigen + ease * (totalDestino - totalOrigen));
    estadoVisualActual.totalNacional = totalInterpolado;

    paths.forEach(path => {
      const idSvg = path.getAttribute('id');
      const haInicio = provinciasOrigen[idSvg] ?? 0;
      const haFin = mapaProvinciasDestino[idSvg] ?? 0;
      const haActual = haInicio + ease * (haFin - haInicio);

      estadoVisualActual.porProvinciaHa[idSvg] = haActual;
      path.style.fill = calcularColorPorHectareas(haActual);
    });

    const elDato = document.getElementById('dato-narrativo');
    if (elDato) elDato.textContent = `${totalInterpolado.toLocaleString("es-AR")} ha`;

    if (t < 1) {
      idAnimacionActiva = requestAnimationFrame(frame);
    }
  }

  idAnimacionActiva = requestAnimationFrame(frame);
}

export function recalcularYActualizarVista() {
  if (filasDataset.length === 0) return;

  const { modo, anioBase, anioSeleccionado } = filtroTiempo;
  const agrupadoPorProv = {};
  const serieNacionalAnual = {};

  for (let y = 2001; y <= 2025; y++) {
    serieNacionalAnual[y] = 0;
  }

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
      driversSum: {},
      serieAnual: {}
    };
  });

  filasDataset.forEach(fila => {
    serieNacionalAnual[fila.year] = (serieNacionalAnual[fila.year] || 0) + fila.lossHa;

    const item = agrupadoPorProv[fila.idSvg];
    if (!item) return;

    item.nombreOriginal = fila.province;
    if (fila.extent2000Ha > 0) item.extent2000Ha = fila.extent2000Ha;
    item.serieAnual[fila.year] = fila.lossHa;

    if (fila.lossHa > item.historicalPeakLossHa) {
      item.historicalPeakLossHa = fila.lossHa;
      item.historicalPeakYear = fila.year;
    }

    const entraEnFiltro = modo === 'unico'
      ? (fila.year === anioSeleccionado)
      : (fila.year > anioBase && fila.year <= anioSeleccionado);

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
  const nuevasProvinciasHa = {};

  Object.values(agrupadoPorProv).forEach(prov => {
    prov.lossHa = Math.round(prov.lossHa);
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
    nuevasProvinciasHa[prov.idSvg] = prov.lossHa;
  });

  let etiquetaPeriodo = '';
  const kpiTitulo = document.getElementById('kpi-titulo-periodo');
  if (modo === 'unico') {
    etiquetaPeriodo = `AÑO ${anioSeleccionado}`;
    if (kpiTitulo) kpiTitulo.textContent = `PÉRDIDA NACIONAL EN EL AÑO ${anioSeleccionado}`;
  } else {
    etiquetaPeriodo = anioSeleccionado === 2001 ? `AÑO 2001` : `2001–${anioSeleccionado}`;
    if (kpiTitulo) kpiTitulo.textContent = `PÉRDIDA ACUMULADA (${etiquetaPeriodo})`;
  }

  datosCalculados = {
    etiquetaPeriodo,
    totalNacional,
    serieNacionalAnual,
    porProvincia: agrupadoPorProv
  };

  actualizarCronicaHistorica(anioSeleccionado);
  animarTransicionDelta(totalNacional, nuevasProvinciasHa);

  if (typeof callbackActualizarInspector === 'function') {
    callbackActualizarInspector();
  }
}

export async function inicializarDataset() {
  try {
    const resCsv = await fetch(CSV_PATH);
    if (resCsv.ok) {
      const texto = await resCsv.text();
      filasDataset = parsearCSV(texto);
      recalcularYActualizarVista();
      if (typeof callbackDatasetListo === 'function') {
        callbackDatasetListo(datosCalculados);
      }
    }
  } catch (err) {
    console.error("Error al leer el archivo CSV:", err);
  }
}
