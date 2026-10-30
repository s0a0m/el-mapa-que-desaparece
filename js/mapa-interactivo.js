import { CONTEXTO_PROVINCIAS } from './cronica-historica.js';
import {
  NOMBRES_OFICIALES_DB,
  filtroTiempo,
  datosCalculados,
  recalcularYActualizarVista,
  formatearEmisionesCO2
} from './datos-motor.js';

const SVG_MAPA_PATH = './mapa.svg';

let provinciaSeleccionadaId = 'Santiago del Estero';
let timerPeliculaMapa = null;
let reproduciendoPelicula = false;
let peliculaAutoDisparada = false;

export function centrarGeometriaSvg() {
  const svg = document.querySelector('#mapa-contenedor svg');
  if (!svg) return;

  try {
    const bbox = svg.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      const pad = Math.max(bbox.width, bbox.height) * 0.025;
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

function obtenerContextoProvincia(idNormalizado, nombreOriginal) {
  const nombreProvincia = (nombreOriginal || NOMBRES_OFICIALES_DB[idNormalizado] || idNormalizado).trim();
  const dic = CONTEXTO_PROVINCIAS || {};

  if (dic[idNormalizado]) {
    return dic[idNormalizado];
  }

  return {
    region: "TERRITORIO PROVINCIAL",
    driver: "Transformación de Cobertura Arbórea",
    fraseEditorial: `Monitoreo satelital de pérdida de cobertura arbórea (>30% de dosel) en ${nombreProvincia}.`,
    explicacion: `Registros satelitales de pérdida de dosel arbóreo entre 2001 y 2025 en la jurisdicción de ${nombreProvincia}.`,
    noticias: [
      {
        rango: [2001, 2025],
        titulo: `Sistema Nacional de Monitoreo de Bosques Nativos (UMSEF)`,
        fuente: `Ministerio de Ambiente / Argentina.gob.ar`,
        url: "https://www.argentina.gob.ar/ambiente/bosques/umsef"
      }
    ]
  };
}

function renderizarNoticiaPorAnio(ctxData, anioReferencia) {
  const ulNoticias = document.getElementById('prov-noticias');
  const tituloSeccion = document.getElementById('prov-noticias-titulo');
  if (!ulNoticias) return;

  ulNoticias.innerHTML = '';
  const lista = ctxData.noticias || [];
  if (lista.length === 0) return;

  let noticiaElegida = lista.find(n => Array.isArray(n.rango) && anioReferencia >= n.rango[0] && anioReferencia <= n.rango[1]);

  if (!noticiaElegida) {
    if (lista.length >= 3) {
      noticiaElegida = anioReferencia <= 2009 ? lista[0] : (anioReferencia <= 2019 ? lista[1] : lista[lista.length - 1]);
    } else if (lista.length === 2) {
      noticiaElegida = anioReferencia <= 2014 ? lista[0] : lista[1];
    } else {
      noticiaElegida = lista[0];
    }
  }

  if (tituloSeccion) {
    if (Array.isArray(noticiaElegida.rango)) {
      tituloSeccion.textContent = `REFERENCIA DOCUMENTAL (${noticiaElegida.rango[0]}–${noticiaElegida.rango[1]})`;
    } else {
      const epocaLabel = lista.length > 1
        ? (anioReferencia <= 2012 ? 'ETAPA 2001–2012' : 'ETAPA 2013–2025')
        : 'SERIE 2001–2025';
      tituloSeccion.textContent = `REFERENCIA DOCUMENTAL (${epocaLabel})`;
    }
  }

  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = noticiaElegida.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = noticiaElegida.titulo;

  const span = document.createElement('span');
  span.textContent = `Fuente: ${noticiaElegida.fuente}`;

  li.appendChild(a);
  li.appendChild(span);
  ulNoticias.appendChild(li);
}

function renderizarMiniGraficoProvincia(info, ctxData) {
  const contenedor = document.getElementById('prov-grafico-barras');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  const labelHover = document.getElementById('chart-hover-info');

  const valores = [];
  for (let y = 2001; y <= 2025; y++) {
    valores.push(info.serieAnual[y] || 0);
  }
  const maxVal = Math.max(...valores, 1);

  const anioSel = filtroTiempo.anioSeleccionado;
  if (labelHover) {
    const valSel = Math.round(info.serieAnual[anioSel] || 0);
    labelHover.textContent = `Año ${anioSel}: ${valSel.toLocaleString("es-AR")} ha`;
  }

  for (let y = 2001; y <= 2025; y++) {
    const val = Math.round(info.serieAnual[y] || 0);
    const alturaPct = val > 0 ? Math.max(5, Math.round((val / maxVal) * 100)) : 2;

    const enRango = filtroTiempo.modo === 'unico'
      ? (y === filtroTiempo.anioSeleccionado)
      : (y > filtroTiempo.anioBase && y <= filtroTiempo.anioSeleccionado);

    const col = document.createElement('div');
    col.className = `chart-col-zone ${y === 2007 ? 'ley-2007' : ''}`;

    const bar = document.createElement('div');
    bar.className = `chart-bar ${enRango ? 'en-rango' : 'fuera-rango'}`;
    bar.style.height = `${alturaPct}%`;

    col.appendChild(bar);

    const mostrarDatoBarra = () => {
      if (labelHover) {
        labelHover.textContent = `Año ${y}: ${val.toLocaleString("es-AR")} ha`;
      }
      if (ctxData) {
        renderizarNoticiaPorAnio(ctxData, y);
      }
    };

    col.addEventListener('mouseenter', mostrarDatoBarra);
    col.addEventListener('touchstart', mostrarDatoBarra, { passive: true });
    col.addEventListener('click', (e) => {
      e.stopPropagation();
      mostrarDatoBarra();
    });

    contenedor.appendChild(col);
  }
}

export function cerrarDossierMovil() {
  document.getElementById('panel-provincia')?.classList.remove('abierto-movil');
  document.getElementById('dossier-backdrop')?.classList.remove('activo');
  document.body.style.overflow = '';
}

export function abrirInspectorProvincia(idProv, abrirDrawerEnMovil = false) {
  if (idProv) provinciaSeleccionadaId = idProv;
  const targetId = provinciaSeleccionadaId;
  const info = datosCalculados.porProvincia[targetId];
  if (!info) return;

  const nombreConsulta = info.nombreOriginal;
  const lossHa = info.lossHa;
  const extent2000 = Math.round(info.extent2000Ha);
  const ctxData = obtenerContextoProvincia(targetId, nombreConsulta);

  const setTxt = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setTxt('prov-region', ctxData.region);
  setTxt('prov-nombre', nombreConsulta);
  setTxt('prov-frase-editorial', `“${ctxData.fraseEditorial || ctxData.explicacion}”`);

  const alertaRotacion = document.getElementById('prov-alerta-rotacion');
  if (alertaRotacion) {
    alertaRotacion.classList.toggle('oculto', !ctxData.notaRotacion);
  }

  setTxt('prov-label-superficie', `PÉRDIDA (${datosCalculados.etiquetaPeriodo})`);
  setTxt('prov-hectareas', `${lossHa.toLocaleString("es-AR")} ha`);

  let textoPorcentaje = "0% del total nacional";
  if (lossHa > 0 && datosCalculados.totalNacional > 0) {
    const pct = (lossHa / datosCalculados.totalNacional) * 100;
    textoPorcentaje = pct < 0.1
      ? "< 0,1% del total del país"
      : `${pct.toFixed(1).replace('.', ',')}% del total del país`;
  }
  setTxt('prov-porcentaje', textoPorcentaje);

  if (extent2000 > 0 && lossHa > 0) {
    const pctPropio = ((lossHa / extent2000) * 100).toFixed(1).replace('.', ',');
    setTxt('prov-bosque-propio', `${pctPropio}%`);
    setTxt(
      'prov-base-2000',
      ctxData.notaRotacion
        ? `Dosel 2000: ${extent2000.toLocaleString("es-AR")} ha (incl. forestación)`
        : `Dosel base 2000: ${extent2000.toLocaleString("es-AR")} ha`
    );
  } else {
    setTxt('prov-bosque-propio', `0%`);
    setTxt(
      'prov-base-2000',
      extent2000 > 0
        ? `Dosel base 2000: ${extent2000.toLocaleString("es-AR")} ha`
        : `Vegetación árida de copa abierta (<30% dosel)`
    );
  }

  if (filtroTiempo.modo === 'unico') {
    setTxt('prov-label-pico', "RÉCORD HISTÓRICO");
    const hLoss = Math.round(info.historicalPeakLossHa);
    setTxt('prov-peor-anio', hLoss > 0 ? `${info.historicalPeakYear} (${hLoss.toLocaleString("es-AR")} ha)` : "Sin registro");
  } else {
    setTxt('prov-label-pico', "AÑO PICO DEL PERÍODO");
    const pLoss = Math.round(info.peakLossHa);
    setTxt('prov-peor-anio', (lossHa > 0 && pLoss > 0) ? `${info.peakYear} (${pLoss.toLocaleString("es-AR")} ha)` : "Sin registro");
  }

  setTxt(
    'prov-emisiones-dato',
    lossHa > 0 ? `Emisiones: ${formatearEmisionesCO2(info.emissionsMg)}` : `Sin emisiones registradas`
  );

  renderizarMiniGraficoProvincia(info, ctxData);

  setTxt('prov-driver', ctxData.driver || info.dominantDriver);
  setTxt('prov-explicacion', ctxData.explicacion);

  renderizarNoticiaPorAnio(ctxData, filtroTiempo.anioSeleccionado);

  const pathActivo = document.querySelector(`#mapa-contenedor path[id="${targetId}"]`);
  const bordeActivo = document.getElementById('svg-borde-activo');
  if (pathActivo && bordeActivo) {
    document.querySelectorAll('#mapa-contenedor path.provincia-path').forEach(p => p.classList.remove('activa'));
    pathActivo.classList.add('activa');
    bordeActivo.setAttribute('d', pathActivo.getAttribute('d') || '');
    const tr = pathActivo.getAttribute('transform');
    if (tr) bordeActivo.setAttribute('transform', tr);
    else bordeActivo.removeAttribute('transform');
  }

  if (abrirDrawerEnMovil && window.innerWidth <= 1024) {
    const panel = document.getElementById('panel-provincia');
    const backdrop = document.getElementById('dossier-backdrop');
    if (panel) {
      panel.scrollTop = 0;
      panel.classList.add('abierto-movil');
    }
    backdrop?.classList.add('activo');
    document.body.style.overflow = 'hidden';
  }
}

export function detenerPeliculaMapa() {
  reproduciendoPelicula = false;
  if (timerPeliculaMapa) {
    clearInterval(timerPeliculaMapa);
    timerPeliculaMapa = null;
  }
  const btnPlay = document.getElementById('btn-play-mapa');
  if (btnPlay) btnPlay.textContent = 'Reproducir serie (2001–2025)';
}

export function iniciarPeliculaMapa(desdeAnio = 2001) {
  detenerPeliculaMapa();
  reproduciendoPelicula = true;
  filtroTiempo.anioSeleccionado = desdeAnio;

  const btnPlay = document.getElementById('btn-play-mapa');
  if (btnPlay) btnPlay.textContent = 'Pausar reproducción';

  actualizarLimitesControles();
  recalcularYActualizarVista();

  timerPeliculaMapa = setInterval(() => {
    if (filtroTiempo.anioSeleccionado < 2025) {
      filtroTiempo.anioSeleccionado++;
      actualizarLimitesControles();
      recalcularYActualizarVista();
    } else {
      detenerPeliculaMapa();
    }
  }, 450);
}

export function actualizarLimitesControles() {
  const slider = document.getElementById('slider-anio');
  const labelSlider = document.getElementById('label-modo-actual');
  const lecturaAnio = document.getElementById('lectura-anio-mapa');

  if (filtroTiempo.anioSeleccionado < 2001) filtroTiempo.anioSeleccionado = 2001;

  if (labelSlider) {
    labelSlider.textContent = filtroTiempo.modo === 'unico'
      ? "MOSTRANDO EXCLUSIVAMENTE EL AÑO:"
      : "ACUMULADO DESDE 2001 HASTA EL AÑO:";
  }

  if (slider) {
    slider.min = 2001;
    slider.value = filtroTiempo.anioSeleccionado;
  }
  if (lecturaAnio) {
    lecturaAnio.textContent = filtroTiempo.anioSeleccionado;
  }
}

export function inicializarControlesTiempo() {
  const btnAcumulado = document.getElementById('btn-modo-acumulado');
  const btnUnico = document.getElementById('btn-modo-unico');
  const slider = document.getElementById('slider-anio');
  const btnPlay = document.getElementById('btn-play-mapa');
  const btnCerrarMovil = document.getElementById('btn-cerrar-dossier');
  const backdropMovil = document.getElementById('dossier-backdrop');

  btnCerrarMovil?.addEventListener('click', cerrarDossierMovil);
  backdropMovil?.addEventListener('click', cerrarDossierMovil);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarDossierMovil();
  });

  btnPlay?.addEventListener('click', () => {
    if (reproduciendoPelicula) {
      detenerPeliculaMapa();
    } else {
      const inicio = filtroTiempo.anioSeleccionado >= 2025 ? 2001 : filtroTiempo.anioSeleccionado;
      iniciarPeliculaMapa(inicio);
    }
  });

  btnAcumulado?.addEventListener('click', () => {
    detenerPeliculaMapa();
    filtroTiempo.modo = 'acumulado';
    btnAcumulado.classList.add('activo');
    btnUnico?.classList.remove('activo');
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  btnUnico?.addEventListener('click', () => {
    detenerPeliculaMapa();
    filtroTiempo.modo = 'unico';
    btnUnico.classList.add('activo');
    btnAcumulado?.classList.remove('activo');
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  slider?.addEventListener('input', (e) => {
    detenerPeliculaMapa();
    filtroTiempo.anioSeleccionado = parseInt(e.target.value, 10);
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  const seccionMapa = document.getElementById('cap-4');
  if (seccionMapa) {
    const obsMapa = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !peliculaAutoDisparada) {
          peliculaAutoDisparada = true;
          iniciarPeliculaMapa(2001);
        }
      });
    }, { threshold: 0.25 });
    obsMapa.observe(seccionMapa);
  }
}

function inicializarEventosMapa() {
  const svg = document.querySelector('#mapa-contenedor svg');
  if (!svg) return;

  const paths = svg.querySelectorAll('path');
  if (paths.length === 0) return;

  const contenedorPaths = paths[0].parentNode;
  const NS_SVG = 'http://www.w3.org/2000/svg';

  const bordeActivo = document.createElementNS(NS_SVG, 'path');
  bordeActivo.setAttribute('id', 'svg-borde-activo');
  contenedorPaths.appendChild(bordeActivo);

  const bordeHover = document.createElementNS(NS_SVG, 'path');
  bordeHover.setAttribute('id', 'svg-borde-hover');
  contenedorPaths.appendChild(bordeHover);

  const tooltip = document.getElementById('tooltip');

  paths.forEach(path => {
    const idProv = path.getAttribute('id');
    if (!idProv || idProv.startsWith('svg-borde')) return;

    path.classList.add('provincia-path');
    path.setAttribute('tabindex', '0');
    path.setAttribute('role', 'button');
    path.setAttribute('aria-label', NOMBRES_OFICIALES_DB[idProv] || idProv);

    path.addEventListener('mouseenter', () => {
      bordeHover.setAttribute('d', path.getAttribute('d') || '');
      const transform = path.getAttribute('transform');
      if (transform) bordeHover.setAttribute('transform', transform);
      else bordeHover.removeAttribute('transform');
    });

    path.addEventListener('mousemove', (e) => {
      if (!tooltip) return;
      const info = datosCalculados.porProvincia[idProv];
      const nombreMostrar = info ? info.nombreOriginal : (NOMBRES_OFICIALES_DB[idProv] || idProv);
      const hectareasMostrar = info ? info.lossHa.toLocaleString("es-AR") : "0";

      tooltip.innerHTML = `
        <strong>${nombreMostrar}</strong>
        Pérdida (${datosCalculados.etiquetaPeriodo}): <span class="tt-ha">${hectareasMostrar} ha</span>
        <span class="tt-hint">Clic para ver crónica provincial</span>
      `;
      tooltip.classList.remove('oculto');
      tooltip.style.left = `${e.clientX + 16}px`;
      tooltip.style.top = `${e.clientY + 16}px`;
    });

    path.addEventListener('mouseleave', () => {
      bordeHover.removeAttribute('d');
      tooltip?.classList.add('oculto');
    });

    const seleccionarProvincia = () => {
      abrirInspectorProvincia(idProv, true);
    };

    path.addEventListener('click', (e) => {
      e.stopPropagation();
      seleccionarProvincia();
    });

    path.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        seleccionarProvincia();
      }
    });
  });

  centrarGeometriaSvg();
}

export async function cargarSvgMapa() {
  const contenedor = document.getElementById('svg-wrapper');
  if (!contenedor) return;

  try {
    const respuesta = await fetch(SVG_MAPA_PATH);
    if (!respuesta.ok) throw new Error(`HTTP error ${respuesta.status}`);
    const svgTexto = await respuesta.text();
    contenedor.innerHTML = svgTexto;
    inicializarEventosMapa();
  } catch (error) {
    console.error("Error al cargar el archivo SVG del mapa:", error);
    contenedor.innerHTML = `<p>No se pudo cargar ./mapa.svg. Verifica que esté en la raíz de Frontend.</p>`;
  }
}
