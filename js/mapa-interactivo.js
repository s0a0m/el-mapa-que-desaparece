function obtenerContextoProvincia(idNormalizado, nombreOriginal) {
  const nombreProvincia = (nombreOriginal || NOMBRES_OFICIALES_DB[idNormalizado] || idNormalizado).trim();
  const dic = window.CONTEXTO_PROVINCIAS || {};

  const paramsGreenpeace = new URLSearchParams({
    q: `site:greenpeace.org/argentina "${nombreProvincia}" bosques OR desmontes OR incendios`
  });
  const paramsNoticias = new URLSearchParams({
    tbm: 'nws',
    q: `deforestacion desmontes incendios bosques "${nombreProvincia}" Argentina`
  });

  const linksDinamicos = [
    {
      titulo: `Reportes de Greenpeace Argentina sobre ${nombreProvincia}`,
      fuente: `Greenpeace Argentina`,
      url: "https://www.google.com/search?" + paramsGreenpeace.toString()
    },
    {
      titulo: `Noticias recientes sobre bosques e incendios en ${nombreProvincia}`,
      fuente: `Google Noticias`,
      url: "https://www.google.com/search?" + paramsNoticias.toString()
    }
  ];

  if (dic[idNormalizado]) {
    const base = dic[idNormalizado];
    return { ...base, noticias: [...(base.noticias || []), ...linksDinamicos] };
  }

  return {
    region: "TERRITORIO PROVINCIAL",
    driver: "Transformación de Cobertura Arbórea",
    explicacion: `Monitoreo satelital de pérdida de cobertura arbórea (>30% de dosel) en ${nombreProvincia} entre 2001 y 2025.`,
    noticias: linksDinamicos
  };
}

function renderizarMiniGraficoProvincia(info) {
  const contenedor = document.getElementById('prov-grafico-barras');
  if (!contenedor) return;
  contenedor.innerHTML = '';

  let labelHover = document.getElementById('chart-hover-info') || document.querySelector('.chart-leyenda');

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

function abrirInspectorProvincia(idProv) {
  const panel = document.getElementById('panel-provincia');
  const info = datosCalculados.porProvincia[idProv];
  if (!panel || !info) return;

  const estabaOculto = panel.classList.contains('oculto');
  const nombreConsulta = info.nombreOriginal;
  const lossHa = info.lossHa;
  const extent2000 = Math.round(info.extent2000Ha);
  const ctxData = obtenerContextoProvincia(idProv, nombreConsulta);

  panel.classList.remove('oculto');
  document.body.classList.add('inspector-abierto');
  if (estabaOculto) {
    guardarEstadoEnHistorial();
  }

  document.getElementById('prov-nombre').textContent = nombreConsulta;
  document.getElementById('prov-label-superficie').textContent =
    `PÉRDIDA (${datosCalculados.etiquetaPeriodo.toUpperCase()})`;
  document.getElementById('prov-hectareas').textContent = `${lossHa.toLocaleString("es-AR")} ha`;

  if (extent2000 > 0 && lossHa > 0) {
    const pctPropio = ((lossHa / extent2000) * 100).toFixed(1).replace('.', ',');
    document.getElementById('prov-bosque-propio').textContent = `${pctPropio}%`;
    document.getElementById('prov-base-2000').textContent = ctxData.notaRotacion
      ? `Dosel 2000: ${extent2000.toLocaleString("es-AR")} ha (incluye rotación forestal)`
      : `Dosel base 2000: ${extent2000.toLocaleString("es-AR")} ha`;
  } else {
    document.getElementById('prov-bosque-propio').textContent = `0%`;
    document.getElementById('prov-base-2000').textContent = extent2000 > 0
      ? `Dosel base 2000: ${extent2000.toLocaleString("es-AR")} ha`
      : `Baja densidad de dosel (>30%)`;
  }

  let textoPorcentaje = "0% del país";
  if (lossHa > 0 && datosCalculados.totalNacional > 0) {
    const pct = (lossHa / datosCalculados.totalNacional) * 100;
    textoPorcentaje = pct < 0.1
      ? "< 0,1% del país"
      : `${pct.toFixed(1).replace('.', ',')}% del país`;
  }
  document.getElementById('prov-porcentaje').textContent = textoPorcentaje;

  if (filtroTiempo.modo === 'unico') {
    document.getElementById('prov-label-pico').textContent = "RÉCORD (2001–2025)";
    const hLoss = Math.round(info.historicalPeakLossHa);
    document.getElementById('prov-peor-anio').textContent = hLoss > 0
      ? `${info.historicalPeakYear} (${hLoss.toLocaleString("es-AR")} ha)`
      : "Sin pico";
  } else {
    document.getElementById('prov-label-pico').textContent = "AÑO PICO DEL PERÍODO";
    const pLoss = Math.round(info.peakLossHa);
    document.getElementById('prov-peor-anio').textContent = (lossHa > 0 && pLoss > 0)
      ? `${info.peakYear} (${pLoss.toLocaleString("es-AR")} ha)`
      : "Sin pico";
  }

  renderizarMiniGraficoProvincia(info);

  document.getElementById('prov-region').textContent = ctxData.region;
  document.getElementById('prov-driver').textContent = ctxData.driver || info.dominantDriver;
  document.getElementById('prov-explicacion').textContent = ctxData.explicacion;

  const ulNoticias = document.getElementById('prov-noticias');
  if (ulNoticias) {
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
}

function actualizarLimitesControles() {
  const slider = document.getElementById('slider-anio');
  const labelSlider = document.getElementById('label-slider');
  const lecturaAnio = document.getElementById('valor-slider-lectura') || document.getElementById('valor-slider-texto');
  const filaBaseVieja = document.getElementById('fila-anio-base');
  const inputFinViejo = document.getElementById('input-anio-fin');

  if (filaBaseVieja) filaBaseVieja.classList.add('oculto');

  if (filtroTiempo.anioSeleccionado < 2001) {
    filtroTiempo.anioSeleccionado = 2001;
  }

  if (labelSlider) {
    labelSlider.textContent = filtroTiempo.modo === 'unico'
      ? "Año seleccionado:"
      : "Acumulado 2001 hasta:";
  }

  if (slider) {
    slider.min = 2001;
    slider.value = filtroTiempo.anioSeleccionado;
  }
  if (lecturaAnio) lecturaAnio.textContent = filtroTiempo.anioSeleccionado;
  if (inputFinViejo) inputFinViejo.value = filtroTiempo.anioSeleccionado;
}

function inicializarControlesTiempo() {
  const btnAcumulado = document.getElementById('btn-modo-acumulado');
  const btnUnico = document.getElementById('btn-modo-unico');
  const slider = document.getElementById('slider-anio');
  const lecturaAnio = document.getElementById('valor-slider-lectura') || document.getElementById('valor-slider-texto');
  const inputFinViejo = document.getElementById('input-anio-fin');

  btnAcumulado?.addEventListener('click', () => {
    filtroTiempo.modo = 'acumulado';
    btnAcumulado.classList.add('activo');
    btnUnico?.classList.remove('activo');
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  btnUnico?.addEventListener('click', () => {
    filtroTiempo.modo = 'unico';
    btnUnico.classList.add('activo');
    btnAcumulado?.classList.remove('activo');
    actualizarLimitesControles();
    recalcularYActualizarVista();
  });

  slider?.addEventListener('input', (e) => {
    filtroTiempo.anioSeleccionado = parseInt(e.target.value, 10);
    if (lecturaAnio) lecturaAnio.textContent = filtroTiempo.anioSeleccionado;
    if (inputFinViejo) inputFinViejo.value = filtroTiempo.anioSeleccionado;
    recalcularYActualizarVista();
  });
}

function centrarGeometriaSvg() {
  const svg = document.querySelector('#mapa-contenedor svg')
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

function cerrarPanelProvincia() {
  const panel = document.getElementById('panel-provincia');
  if (!panel || panel.classList.contains('oculto')) return;

  panel.classList.add('oculto');
  document.body.classList.remove('inspector-abierto');
  document.querySelectorAll('#mapa-contenedor path.provincia-path').forEach(p => p.classList.remove('activa'));
  const bordeActivo = document.getElementById('svg-borde-activo');
  if (bordeActivo) bordeActivo.removeAttribute('d');
}

async function cargarSvgMapa() {
  const contenedor = document.querySelector('#mapa-contenedor .mapa-lienzo-wrapper');
  if (!contenedor) return;

  try {
    const respuesta = await fetch(SVG_MAPA_PATH);
    if (!respuesta.ok) throw new Error(`HTTP error ${respuesta.status}`);
    const svgTexto = await respuesta.text();

    contenedor.innerHTML = svgTexto;
    inicializarEventosMapa();
  } catch (error) {
    console.error("Error al cargar el archivo SVG del mapa:", error);
    contenedor.innerHTML = `<p class="error-carga">No se pudo cargar la cartografía provincial.</p>`;
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
        <span class="tt-hint">Clic para abrir ficha</span>
      `;
      tooltip.classList.remove('oculto');
      tooltip.style.left = `${e.clientX + 16}px`;
      tooltip.style.top = `${e.clientY + 16}px`;
    });

    path.addEventListener('mouseleave', () => {
      bordeHover.removeAttribute('d');
      tooltip?.classList.add('oculto');
    });

    path.addEventListener('click', (e) => {
      e.stopPropagation();
      paths.forEach(p => p.classList.remove('activa'));
      path.classList.add('activa');

      bordeActivo.setAttribute('d', path.getAttribute('d') || '');
      const transform = path.getAttribute('transform');
      if (transform) bordeActivo.setAttribute('transform', transform);
      else bordeActivo.removeAttribute('transform');

      abrirInspectorProvincia(idProv);
    });
  });

  document.getElementById('panel-provincia')?.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  document.getElementById('mapa-contenedor')?.addEventListener('click', () => {
    cerrarPanelProvincia();
  });
  document.getElementById('panel-izquierdo')?.addEventListener('click', () => {
    if (window.innerWidth <= 1024) cerrarPanelProvincia();
  });

  centrarGeometriaSvg();
}

document.getElementById('btn-cerrar-panel')?.addEventListener('click', cerrarPanelProvincia);

window.addEventListener('DOMContentLoaded', async () => {
  inicializarModalZoom();
  inicializarFlujoPresentacion();
  inicializarControlesTiempo();
  await cargarSvgMapa();
  actualizarLimitesControles();
  inicializarDataset();
});
