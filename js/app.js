
// ============================================================================
// HISTORIAL DEL NAVEGADOR (BOTONES ATRÁS Y ADELANTE FUNCIONAN SIN SALIR DE LA WEB)
// ============================================================================
function guardarEstadoEnHistorial(reemplazar = false) {
  if (navegandoPorPopstate) return;
  const estado = {
    escena: escenaActiva,
    indiceIntro,
    indiceConclusion
  };
  if (reemplazar) {
    window.history.replaceState(estado, '');
  } else {
    window.history.pushState(estado, '');
  }
}

window.addEventListener('popstate', (e) => {
  const modal = document.getElementById('modal-zoom');
  if (modal && !modal.classList.contains('oculto')) {
    modal.classList.add('oculto');
    return;
  }

  const panelProv = document.getElementById('panel-provincia');
  if (escenaActiva === 'mapa' && panelProv && !panelProv.classList.contains('oculto')) {
    cerrarPanelProvincia();
    return;
  }

  if (e.state && e.state.escena) {
    navegandoPorPopstate = true;
    indiceIntro = e.state.indiceIntro ?? 0;
    indiceConclusion = e.state.indiceConclusion ?? 0;
    irAEscena(e.state.escena, false);
    renderizarIntro();
    renderizarConclusion();
    navegandoPorPopstate = false;
  }
});

function irAEscena(nombreEscena, empujarHistorial = true) {
  escenaActiva = nombreEscena;
  document.getElementById('escena-intro')?.classList.toggle('activa', nombreEscena === 'intro');
  document.getElementById('escena-mapa')?.classList.toggle('activa', nombreEscena === 'mapa');
  document.getElementById('escena-conclusion')?.classList.toggle('activa', nombreEscena === 'conclusion');

  if (nombreEscena === 'mapa') {
    requestAnimationFrame(() => centrarGeometriaSvg());
  }
  if (empujarHistorial) {
    guardarEstadoEnHistorial();
  }
}

// ============================================================================
// VISOR PANTALLA COMPLETA (IMAGEN ÚNICA O GALERÍA CON FLECHAS ‹ ›)
// ============================================================================
let galeriaZoomFrames = null;
let galeriaZoomIdx = 0;

function asegurarModalZoomEnDOM() {
  let modal = document.getElementById('modal-zoom');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modal-zoom';
    modal.className = 'modal-zoom oculto';
    document.body.appendChild(modal);
  }
  return modal;
}

function abrirZoomImagen(src, altTexto) {
  if (!src) return;
  galeriaZoomFrames = null;
  const modal = asegurarModalZoomEnDOM();
  modal.innerHTML = `<img id="modal-zoom-img" src="${src}" alt="${altTexto || 'Imagen ampliada'}">`;
  modal.classList.remove('oculto');
}

function abrirZoomGaleria(frames, idxInicial) {
  if (!frames || !frames.length) return;
  galeriaZoomFrames = frames;
  galeriaZoomIdx = idxInicial || 0;
  const modal = asegurarModalZoomEnDOM();

  const renderFrameModal = () => {
    const f = galeriaZoomFrames[galeriaZoomIdx];
    modal.innerHTML = `
      <div class="zoom-galeria-wrap">
        <button type="button" class="zoom-flecha izq" aria-label="Imagen anterior">‹</button>
        <div class="zoom-galeria-centro">
          <span class="zoom-galeria-fecha">${f.fecha}</span>
          <img id="modal-zoom-img" src="${f.src}" alt="Satélite ${f.fecha}">
        </div>
        <button type="button" class="zoom-flecha der" aria-label="Imagen siguiente">›</button>
      </div>
    `;
    modal.querySelector('.zoom-flecha.izq').addEventListener('click', (e) => {
      e.stopPropagation();
      galeriaZoomIdx = (galeriaZoomIdx - 1 + galeriaZoomFrames.length) % galeriaZoomFrames.length;
      actualizarFrameTimelapse(galeriaZoomIdx);
      renderFrameModal();
    });
    modal.querySelector('.zoom-flecha.der').addEventListener('click', (e) => {
      e.stopPropagation();
      galeriaZoomIdx = (galeriaZoomIdx + 1) % galeriaZoomFrames.length;
      actualizarFrameTimelapse(galeriaZoomIdx);
      renderFrameModal();
    });
  };

  renderFrameModal();
  modal.classList.remove('oculto');
}

function inicializarModalZoom() {
  const modal = asegurarModalZoomEnDOM();
  modal.innerHTML = '';

  modal.addEventListener('click', () => {
    modal.classList.add('oculto');
    galeriaZoomFrames = null;
  });
}

// ============================================================================
// GALERÍA DE INTRODUCCIÓN Y CONCLUSIÓN (CON FLECHAS EN EL TIMELAPSE)
// ============================================================================
let galeriasIntroMontadas = false;
let timerTimelapse = null;
let frameTimelapseActual = 0;
let timelapsePausado = false;

function actualizarFrameTimelapse(nuevoIdx) {
  const imgs = document.querySelectorAll('.timelapse-frame-img');
  const badgeAnio = document.getElementById('timelapse-badge-anio');

  if (imgs.length === 0) return;
  frameTimelapseActual = ((nuevoIdx % imgs.length) + imgs.length) % imgs.length;

  imgs.forEach((img, i) => img.classList.toggle('activa', i === frameTimelapseActual));

  if (badgeAnio && imgs[frameTimelapseActual]) {
    badgeAnio.textContent = imgs[frameTimelapseActual].getAttribute('data-fecha');
  }
}

function iniciarMotorTimelapse() {
  if (timerTimelapse) clearInterval(timerTimelapse);
  timerTimelapse = setInterval(() => {
    const hayTimelapseVisible = document.querySelector('.escena.activa .timelapse-stage');
    if (hayTimelapseVisible && !timelapsePausado) {
      actualizarFrameTimelapse(frameTimelapseActual + 1);
    }
  }, 1800);
}

function crearElementoVisual(slide) {
  const itemDom = document.createElement('div');
  itemDom.className = 'slide-media-item activa';

  if (slide.tipoVisual === 'timelapse') {
    const wrapper = document.createElement('div');
    wrapper.className = 'timelapse-player';

    const stage = document.createElement('div');
    stage.className = 'timelapse-stage';
    stage.style.cursor = 'zoom-in';

    slide.frames.forEach((f, fIdx) => {
      const img = document.createElement('img');
      img.className = `timelapse-frame-img ${fIdx === 0 ? 'activa' : ''}`;
      img.loading = 'eager';
      img.decoding = 'sync';
      img.src = f.src;
      img.alt = `Imagen satelital Gran Chaco (${f.fecha})`;
      img.setAttribute('data-fecha', f.fecha);
      stage.appendChild(img);
    });

    const badge = document.createElement('div');
    badge.id = 'timelapse-badge-anio';
    badge.className = 'timelapse-badge';
    badge.textContent = slide.frames[0].fecha;
    stage.appendChild(badge);

    // Flechas ‹ › para pasar las fotos satelitales manualmente
    const btnAnt = document.createElement('button');
    btnAnt.type = 'button';
    btnAnt.className = 'tl-flecha-galeria izq';
    btnAnt.textContent = '‹';
    btnAnt.setAttribute('aria-label', 'Año anterior');
    btnAnt.addEventListener('click', (e) => {
      e.stopPropagation();
      timelapsePausado = true;
      actualizarFrameTimelapse(frameTimelapseActual - 1);
    });

    const btnSig = document.createElement('button');
    btnSig.type = 'button';
    btnSig.className = 'tl-flecha-galeria der';
    btnSig.textContent = '›';
    btnSig.setAttribute('aria-label', 'Año siguiente');
    btnSig.addEventListener('click', (e) => {
      e.stopPropagation();
      timelapsePausado = true;
      actualizarFrameTimelapse(frameTimelapseActual + 1);
    });

    stage.appendChild(btnAnt);
    stage.appendChild(btnSig);

    // Tocar la imagen abre la galería en pantalla completa con flechas
    stage.addEventListener('click', () => {
      timelapsePausado = true;
      abrirZoomGaleria(slide.frames, frameTimelapseActual);
    });

    wrapper.appendChild(stage);
    itemDom.appendChild(wrapper);

  } else if (slide.tipoVisual === 'comparador') {
    const stack = document.createElement('div');
    stack.className = 'visual-stack';

    stack.innerHTML = `
      <div class="nasa-comparador">
        <img src="${slide.despuesSrc}" onerror="this.onerror=null;this.src='${slide.despuesFallback}';" alt="${slide.titulo} (2019)" class="nasa-img">
        <div class="nasa-capa-antes" style="width: 50%;">
          <img src="${slide.antesSrc}" onerror="this.onerror=null;this.src='${slide.antesFallback}';" alt="${slide.titulo} (2000)" class="nasa-img">
        </div>
        <span class="nasa-tag izq">${slide.etiquetaAntes}</span>
        <span class="nasa-tag der">${slide.etiquetaDespues}</span>
        <input type="range" min="5" max="95" value="50" class="nasa-range" aria-label="Deslizar para comparar antes y después">
      </div>
    `;

    const rangeInput = stack.querySelector('.nasa-range');
    const capaAntes = stack.querySelector('.nasa-capa-antes');
    const imgAntes = capaAntes.querySelector('img');
    const imgDespues = stack.querySelector('.nasa-comparador > img');
    const boxComparador = stack.querySelector('.nasa-comparador');

    const sincronizarAnchoComparador = () => {
      if (boxComparador.offsetWidth > 0) {
        imgAntes.style.width = `${boxComparador.offsetWidth}px`;
      }
    };
    window.addEventListener('resize', sincronizarAnchoComparador);
    setTimeout(sincronizarAnchoComparador, 60);

    let xInicio = 0;
    let huboArrastre = false;

    rangeInput.addEventListener('pointerdown', (e) => {
      xInicio = e.clientX;
      huboArrastre = false;
    });

    rangeInput.addEventListener('pointermove', (e) => {
      if (Math.abs(e.clientX - xInicio) > 6) {
        huboArrastre = true;
      }
    });

    rangeInput.addEventListener('input', (e) => {
      sincronizarAnchoComparador();
      capaAntes.style.width = `${e.target.value}%`;
    });

    rangeInput.addEventListener('click', (e) => {
      if (!huboArrastre) {
        const rect = boxComparador.getBoundingClientRect();
        const clicX = e.clientX - rect.left;
        const corteX = (parseFloat(rangeInput.value) / 100) * rect.width;
        const imgElegida = clicX < corteX ? imgAntes : imgDespues;
        abrirZoomImagen(imgElegida.src, imgElegida.alt);
      }
    });

    itemDom.appendChild(stack);

  } else if (slide.tipoVisual === 'imagen') {
    const figure = document.createElement('figure');
    figure.className = 'foto-documental';

    const img = document.createElement('img');
    img.loading = 'eager';
    img.decoding = 'sync';
    img.alt = slide.titulo;
    img.src = slide.imagenSrc;
    img.style.cursor = 'zoom-in';
    img.onerror = function () {
      this.onerror = null;
      if (slide.imagenFallback) this.src = slide.imagenFallback;
    };
    img.addEventListener('click', () => abrirZoomImagen(img.src, slide.titulo));

    figure.appendChild(img);
    itemDom.appendChild(figure);
  } else {
    itemDom.innerHTML = slide.htmlFijo || slide.visualHtml || '';
  }

  return itemDom;
}

function montarGaleriaIntroEnDOM() {
  if (galeriasIntroMontadas) return;
  const contenedor = document.getElementById('intro-ilustracion');
  if (!contenedor) return;

  const lista = window.DIAPOSITIVAS_INTRO || [];
  contenedor.innerHTML = '';

  lista.forEach((slide, idx) => {
    const itemDom = crearElementoVisual(slide);
    itemDom.classList.toggle('activa', idx === 0);
    itemDom.setAttribute('data-slide-idx', idx);
    contenedor.appendChild(itemDom);
  });

  galeriasIntroMontadas = true;
  iniciarMotorTimelapse();
}

function renderizarIntro() {
  const lista = window.DIAPOSITIVAS_INTRO || [];
  const slide = lista[indiceIntro];
  if (!slide) return;

  montarGaleriaIntroEnDOM();

  document.querySelectorAll('#intro-ilustracion .slide-media-item').forEach((el, idx) => {
    el.classList.toggle('activa', idx === indiceIntro);
  });

  const boxComp = document.querySelector('#intro-ilustracion .slide-media-item.activa .nasa-comparador');
  if (boxComp) {
    const imgInterna = boxComp.querySelector('.nasa-capa-antes img');
    if (imgInterna && boxComp.offsetWidth > 0) {
      imgInterna.style.width = `${boxComp.offsetWidth}px`;
    }
  }

  document.getElementById('intro-titulo').textContent = slide.titulo;
  document.getElementById('intro-texto').textContent = slide.texto;
  document.getElementById('intro-extra').innerHTML = slide.extraHtml || '';
  document.getElementById('intro-contador').textContent = `${indiceIntro + 1} / ${lista.length}`;

  document.getElementById('btn-intro-ant').style.visibility = indiceIntro === 0 ? 'hidden' : 'visible';
  document.getElementById('btn-intro-sig').textContent =
    indiceIntro === lista.length - 1 ? 'Explorar el Mapa (2001–2025) →' : 'Siguiente →';
}

function renderizarConclusion() {
  const lista = window.DIAPOSITIVAS_CONCLUSION || [];
  const slide = lista[indiceConclusion];
  if (!slide) return;

  const contenedorVisual = document.getElementById('conc-ilustracion');
  if (contenedorVisual) {
    contenedorVisual.innerHTML = '';
    contenedorVisual.appendChild(crearElementoVisual(slide));
  }

  document.getElementById('conc-titulo').textContent = slide.titulo;
  document.getElementById('conc-texto').textContent = slide.texto;
  document.getElementById('conc-extra').innerHTML = slide.extraHtml || '';
  document.getElementById('conc-contador').textContent = `${indiceConclusion + 1} / ${lista.length}`;

  const contenedorFuentes = document.getElementById('contenedor-fuentes-final');
  if (contenedorFuentes && window.FUENTES_DOCUMENTALES) {
    const ul = document.createElement('ul');
    ul.className = 'lista-fuentes-compacta';
    window.FUENTES_DOCUMENTALES.forEach(f => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = f.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = `↗ ${f.titulo}`;
      li.appendChild(a);
      ul.appendChild(li);
    });
    contenedorFuentes.appendChild(ul);
  }

  document.getElementById('btn-conc-ant').style.visibility = indiceConclusion === 0 ? 'hidden' : 'visible';
  document.getElementById('btn-conc-sig').textContent =
    indiceConclusion === lista.length - 1 ? '← Volver al Mapa' : 'Siguiente →';
}

function inicializarFlujoPresentacion() {
  const btnTemaViejo = document.getElementById('btn-cambiar-tema');
  if (btnTemaViejo) btnTemaViejo.remove();

  guardarEstadoEnHistorial(true);
  renderizarIntro();
  renderizarConclusion();

  document.getElementById('btn-intro-sig')?.addEventListener('click', () => {
    const lista = window.DIAPOSITIVAS_INTRO || [];
    if (indiceIntro < lista.length - 1) {
      indiceIntro++;
      renderizarIntro();
      guardarEstadoEnHistorial();
    } else {
      irAEscena('mapa');
    }
  });

  document.getElementById('btn-intro-ant')?.addEventListener('click', () => {
    if (indiceIntro > 0) {
      indiceIntro--;
      renderizarIntro();
      guardarEstadoEnHistorial();
    }
  });

  document.getElementById('btn-saltar-al-mapa')?.addEventListener('click', () => irAEscena('mapa'));
  document.getElementById('btn-volver-intro')?.addEventListener('click', () => {
    indiceIntro = 0;
    renderizarIntro();
    irAEscena('intro');
  });

  document.getElementById('btn-ir-conclusion')?.addEventListener('click', () => {
    indiceConclusion = 0;
    renderizarConclusion();
    irAEscena('conclusion');
  });

  document.getElementById('btn-ir-conclusion-mobile')?.addEventListener('click', () => {
    indiceConclusion = 0;
    renderizarConclusion();
    irAEscena('conclusion');
  });

  document.getElementById('btn-volver-mapa')?.addEventListener('click', () => irAEscena('mapa'));

  document.getElementById('btn-conc-sig')?.addEventListener('click', () => {
    const lista = window.DIAPOSITIVAS_CONCLUSION || [];
    if (indiceConclusion < lista.length - 1) {
      indiceConclusion++;
      renderizarConclusion();
      guardarEstadoEnHistorial();
    } else {
      irAEscena('mapa');
    }
  });

  document.getElementById('btn-conc-ant')?.addEventListener('click', () => {
    if (indiceConclusion > 0) {
      indiceConclusion--;
      renderizarConclusion();
      guardarEstadoEnHistorial();
    }
  });

  window.addEventListener('keydown', (e) => {
    const modalZoom = document.getElementById('modal-zoom');
    if (modalZoom && !modalZoom.classList.contains('oculto')) {
      if (e.key === 'Escape') modalZoom.classList.add('oculto');
      if (e.key === 'ArrowRight' && galeriaZoomFrames) {
        modalZoom.querySelector('.zoom-flecha.der')?.click();
      }
      if (e.key === 'ArrowLeft' && galeriaZoomFrames) {
        modalZoom.querySelector('.zoom-flecha.izq')?.click();
      }
      return;
    }

    if (escenaActiva === 'intro') {
      if (e.key === 'ArrowRight') document.getElementById('btn-intro-sig')?.click();
      if (e.key === 'ArrowLeft') document.getElementById('btn-intro-ant')?.click();
    } else if (escenaActiva === 'conclusion') {
      if (e.key === 'ArrowRight') document.getElementById('btn-conc-sig')?.click();
      if (e.key === 'ArrowLeft') document.getElementById('btn-conc-ant')?.click();
    } else if (escenaActiva === 'mapa' && e.key === 'Escape') {
      cerrarPanelProvincia();
    }
  });
}

function obtenerPaletaActiva() {
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

function calcularColorPorHectareas(ha) {
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

function normalizarNombreProvincia(nombre) {
  if (nombre === "Ciudad de Buenos Aires") return "CABA";
  return nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

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

function parsearCSV(textoCsv) {
  const lineas = textoCsv.trim().split(/\r?\n/);
  if (lineas.length < 2) return [];

  const cabeceras = lineas[0].split(',').map(h => h.trim());
  const idxProv = cabeceras.indexOf('province');
  const idxYear = cabeceras.indexOf('year');
  const idxLoss = cabeceras.indexOf('loss_ha');
  const idxExtent = cabeceras.indexOf('extent_2000_ha');
  const idxDriver = cabeceras.indexOf('dominant_driver');

  const resultado = [];
  for (let i = 1; i < lineas.length; i++) {
    if (!lineas[i].trim()) continue;
    const cols = lineas[i].split(',');

    const province = cols[idxProv]?.trim();
    const year = parseInt(cols[idxYear], 10);
    const lossHa = parseFloat(cols[idxLoss]) || 0;
    const extent2000Ha = idxExtent !== -1 ? (parseFloat(cols[idxExtent]) || 0) : 0;
    const driver = idxDriver !== -1 ? cols[idxDriver]?.trim() : '';

    if (province && !isNaN(year)) {
      resultado.push({
        province,
        idSvg: normalizarNombreProvincia(province),
        year,
        lossHa,
        extent2000Ha,
        driver
      });
    }
  }
  return resultado;
}

async function inicializarDataset() {
  try {
    const resCsv = await fetch(CSV_PATH);
    if (resCsv.ok) {
      const texto = await resCsv.text();
      filasDataset = parsearCSV(texto);
      recalcularYActualizarVista();
    }
  } catch (err) {
    console.error("Error al leer el archivo CSV:", err);
  }
}

function actualizarCronicaHistorica(anioReferencia) {
  const hitos = window.HITOS_CRONOLOGICOS || [];
  const hito = hitos.find(h => anioReferencia >= h.rango[0] && anioReferencia <= h.rango[1]) || hitos[hitos.length - 1];
  if (!hito) return;

  document.getElementById('hito-epigrafe').textContent = hito.epigrafe;
  document.getElementById('hito-titulo').textContent = hito.titulo;
  document.getElementById('hito-resumen').textContent = hito.resumen;
  const link = document.getElementById('hito-link');
  if (link) {
    link.href = hito.fuenteUrl;
    link.textContent = `↗ Fuente: ${hito.fuenteTexto}`;
  }
}

function recalcularYActualizarVista() {
  if (filasDataset.length === 0) return;

  const { modo, anioBase, anioSeleccionado } = filtroTiempo;
  const agrupadoPorProv = {};

  Object.keys(NOMBRES_OFICIALES_DB).forEach(idSvg => {
    agrupadoPorProv[idSvg] = {
      idSvg,
      nombreOriginal: NOMBRES_OFICIALES_DB[idSvg],
      lossHa: 0,
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
    if (kpiTitulo) kpiTitulo.textContent = `PÉRDIDA ARBÓREA EN EL AÑO`;
  } else {
    if (kpiTitulo) kpiTitulo.textContent = `PÉRDIDA ARBÓREA ACUMULADA`;
    etiquetaPeriodo = anioSeleccionado === 2001 ? `AÑO 2001` : `2001 – ${anioSeleccionado}`;
  }

  datosCalculados = {
    etiquetaPeriodo,
    totalNacional,
    porProvincia: agrupadoPorProv
  };

  actualizarCronicaHistorica(anioSeleccionado);
  animarTransicionDelta(totalNacional, nuevasProvinciasHa);

  const provActiva = document.querySelector('#mapa-contenedor path.provincia-path.activa');
  if (provActiva) {
    abrirInspectorProvincia(provActiva.getAttribute('id'));
  }
}

function animarTransicionDelta(totalDestino, mapaProvinciasDestino) {
  if (idAnimacionActiva) cancelAnimationFrame(idAnimacionActiva);

  const totalOrigen = estadoVisualActual.totalNacional;
  const provinciasOrigen = { ...estadoVisualActual.porProvinciaHa };

  const duracionMs = 260;
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

    const elAnio = document.getElementById('indicador-anio');
    const elDato = document.getElementById('dato-narrativo');
    if (elAnio) elAnio.textContent = datosCalculados.etiquetaPeriodo;
    if (elDato) elDato.textContent = `${totalInterpolado.toLocaleString("es-AR")} ha`;

    if (t < 1) {
      idAnimacionActiva = requestAnimationFrame(frame);
    }
  }

  idAnimacionActiva = requestAnimationFrame(frame);
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

    // Inyecta el SVG como nodo real del DOM
    contenedor.innerHTML = svgTexto;

    // Inicializa los listeners y el centrado geométrico una vez inyectado
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
