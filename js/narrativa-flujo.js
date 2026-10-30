// ============================================================================
// CONTROLADOR DE NARRATIVA, RADIOGRAFÍA COMPACTA DE LA LEY Y TIMELAPSE
// ============================================================================
import { ETAPAS_HISTORIA_LEY, FUENTES_DOCUMENTALES } from './cronica-historica.js';
import { abrirZoomGaleria } from './zoom-modal.js';

let etapaLeyActiva = "todas";
let serieNacionalCache = {};
let timerTimelapse = null;
let idxTimelapse = 0;
let timelapsePausado = false;

// 1. ANIMACIONES DE APARICIÓN ONE-WAY (SOLO AL BAJAR)
function inicializarScrollAnimations() {
  const elementosReveal = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementosReveal.forEach(el => observer.observe(el));

  const barraProgreso = document.getElementById('reading-progress');
  window.addEventListener('scroll', () => {
    if (!barraProgreso) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
    barraProgreso.style.width = `${pct}%`;
  }, { passive: true });
}

// 2. COMPARADOR INTERACTIVO DE SALTA (MECANISMO ORIGINAL FIABLE CON WIDTH)
function inicializarComparadorSalta() {
  const box = document.getElementById('comparador-salta');
  const slider = document.getElementById('slider-salta');
  const capaAntes = document.getElementById('capa-salta-antes');
  const imgAntes = document.getElementById('img-salta-antes');
  const imgDespues = document.getElementById('img-salta-despues');
  const divisor = document.getElementById('divisor-salta');
  const btnZoomSalta = document.getElementById('btn-zoom-salta');

  if (!box || !slider || !capaAntes || !imgAntes) return;

  const sincronizarAncho = () => {
    if (box.offsetWidth > 0) {
      imgAntes.style.width = `${box.offsetWidth}px`;
    }
  };
  window.addEventListener('resize', sincronizarAncho);
  setTimeout(sincronizarAncho, 80);

  let xInicio = 0;
  let huboArrastre = false;

  slider.addEventListener('pointerdown', (e) => {
    xInicio = e.clientX;
    huboArrastre = false;
  });

  slider.addEventListener('pointermove', (e) => {
    if (Math.abs(e.clientX - xInicio) > 6) {
      huboArrastre = true;
    }
  });

  slider.addEventListener('input', (e) => {
    sincronizarAncho();
    const val = e.target.value;
    capaAntes.style.width = `${val}%`;
    if (divisor) divisor.style.left = `${val}%`;
  });

  const abrirGaleriaSalta = (idx = 0) => {
    abrirZoomGaleria([
      { src: imgAntes.src, fecha: 'SALTA · DICIEMBRE 2000 (Bosque Nativo)', alt: 'Salta Año 2000' },
      { src: imgDespues.src, fecha: 'SALTA · DICIEMBRE 2019 (Lotes Desmontados)', alt: 'Salta Año 2019' }
    ], idx);
  };

  slider.addEventListener('click', (e) => {
    if (!huboArrastre) {
      const rect = box.getBoundingClientRect();
      const clicX = e.clientX - rect.left;
      const corteX = (parseFloat(slider.value) / 100) * rect.width;
      abrirGaleriaSalta(clicX < corteX ? 0 : 1);
    }
  });

  btnZoomSalta?.addEventListener('click', () => abrirGaleriaSalta(0));
}

// 3. PULSO ANUAL COMPACTO Y COMPARATIVA DE ETAPAS DE LA LEY (CAPÍTULO III)
export function construirGraficoHistoriaLey(serieNacionalAnual) {
  serieNacionalCache = serieNacionalAnual || {};
  const contenedor = document.getElementById('grafico-nacional-barras');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  const valores = Object.values(serieNacionalCache);
  const maxAnual = Math.max(...valores, 1);
  const lecturaHover = document.getElementById('barra-hover-lectura');

  for (let y = 2001; y <= 2025; y++) {
    const ha = Math.round(serieNacionalCache[y] || 0);
    const pctAltura = Math.max(8, Math.round((ha / maxAnual) * 100));

    const col = document.createElement('div');
    col.className = `nac-bar-col ${y === 2007 ? 'marca-ley-2007' : ''} ${y === 2008 ? 'pico-2008' : ''}`;
    col.setAttribute('data-anio', y);

    const fill = document.createElement('div');
    fill.className = 'nac-bar-fill';
    fill.style.height = `${pctAltura}%`;

    const labelAnio = document.createElement('span');
    labelAnio.className = 'nac-bar-anio';
    labelAnio.textContent = String(y).slice(-2);

    col.appendChild(fill);
    col.appendChild(labelAnio);

    const mostrarDetalleBarra = () => {
      if (lecturaHover) {
        const notaExtra = y === 2007
          ? ' (Sanción Ley 26.331)'
          : (y === 2008 ? ' (Récord histórico del dataset)' : (y === 2009 ? ' (Reglamentación Decreto 91/2009)' : ''));
        lecturaHover.textContent = `Año ${y}: ${ha.toLocaleString("es-AR")} ha de cobertura arbórea perdidas${notaExtra}`;
      }
    };

    col.addEventListener('mouseenter', mostrarDetalleBarra);
    col.addEventListener('touchstart', mostrarDetalleBarra, { passive: true });
    col.addEventListener('click', mostrarDetalleBarra);

    contenedor.appendChild(col);
  }

  aplicarEtapaGraficoLey(etapaLeyActiva);
}

function aplicarEtapaGraficoLey(claveEtapa) {
  etapaLeyActiva = claveEtapa;
  const infoEtapa = ETAPAS_HISTORIA_LEY[claveEtapa] || ETAPAS_HISTORIA_LEY["todas"];
  const [inicio, fin] = infoEtapa.rango;

  document.querySelectorAll('.btn-etapa-ley').forEach(btn => {
    btn.classList.toggle('activo', btn.getAttribute('data-etapa') === claveEtapa);
  });

  document.querySelectorAll('.etapa-comparada-card').forEach(card => {
    const numCard = card.getAttribute('data-card-etapa');
    if (claveEtapa === 'todas') {
      card.classList.remove('atenuada-card', 'activa-card');
    } else {
      card.classList.toggle('activa-card', numCard === claveEtapa);
      card.classList.toggle('atenuada-card', numCard !== claveEtapa);
    }
  });

  const elKicker = document.getElementById('ley-etapa-kicker');
  const elTitulo = document.getElementById('ley-etapa-titulo');
  const elTexto = document.getElementById('ley-etapa-texto');
  const elLink = document.getElementById('ley-etapa-link');

  if (elKicker) elKicker.textContent = infoEtapa.kicker;
  if (elTitulo) {
    elTitulo.textContent = claveEtapa === 'todas'
      ? '7,16 millones de hectáreas de cobertura arbórea perdidas (dosel >30%)'
      : infoEtapa.titulo;
  }
  if (elTexto) elTexto.textContent = infoEtapa.explicacion;
  if (elLink) {
    elLink.href = infoEtapa.fuenteUrl;
    elLink.textContent = `Fuente: ${infoEtapa.fuenteTexto}`;
  }

  document.querySelectorAll('#grafico-nacional-barras .nac-bar-col').forEach(col => {
    const anio = parseInt(col.getAttribute('data-anio'), 10);
    const activo = anio >= inicio && anio <= fin;
    col.classList.toggle('resaltada', activo);
    col.classList.toggle('atenuada', !activo);
  });
}

function inicializarBotonesLey() {
  document.querySelectorAll('.btn-etapa-ley').forEach(btn => {
    btn.addEventListener('click', () => {
      const etapa = btn.getAttribute('data-etapa');
      aplicarEtapaGraficoLey(etapa);
    });
  });

  document.querySelectorAll('.etapa-comparada-card').forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 1024) return;
      const etapa = card.getAttribute('data-card-etapa');
      if (etapa) aplicarEtapaGraficoLey(etapa);
    });
  });
}

// 4. REPRODUCTOR TIMELAPSE EN GRANDE (2000–2026) EN EL CAPÍTULO V
function inicializarTimelapseConclusion() {
  const imgs = document.querySelectorAll('#timelapse-stage .tl-img');
  const badge = document.getElementById('tl-badge-fecha');
  const btnPlay = document.getElementById('tl-btn-play');
  const btnAnt = document.getElementById('tl-btn-ant');
  const btnSig = document.getElementById('tl-btn-sig');
  const btnsAnio = document.querySelectorAll('.btn-tl-anio');
  const stage = document.getElementById('timelapse-stage');

  if (imgs.length === 0) return;

  const mostrarFrame = (nuevoIdx) => {
    idxTimelapse = ((nuevoIdx % imgs.length) + imgs.length) % imgs.length;
    imgs.forEach((img, i) => img.classList.toggle('activa', i === idxTimelapse));
    btnsAnio.forEach((b, i) => b.classList.toggle('activo', i === idxTimelapse));
    if (badge && imgs[idxTimelapse]) {
      badge.textContent = imgs[idxTimelapse].getAttribute('data-fecha');
    }
  };

  const togglePausa = (forzarPausa = null) => {
    timelapsePausado = forzarPausa !== null ? forzarPausa : !timelapsePausado;
    if (btnPlay) {
      btnPlay.textContent = timelapsePausado ? 'Reanudar secuencia' : 'Pausar secuencia';
    }
  };

  btnPlay?.addEventListener('click', () => togglePausa());
  btnAnt?.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePausa(true);
    mostrarFrame(idxTimelapse - 1);
  });
  btnSig?.addEventListener('click', (e) => {
    e.stopPropagation();
    togglePausa(true);
    mostrarFrame(idxTimelapse + 1);
  });

  btnsAnio.forEach(btn => {
    btn.addEventListener('click', () => {
      togglePausa(true);
      mostrarFrame(parseInt(btn.getAttribute('data-idx'), 10));
    });
  });

  stage?.addEventListener('click', (e) => {
    if (e.target.closest('.tl-flecha')) return;
    togglePausa(true);
    const frames = Array.from(imgs).map(img => ({
      src: img.src,
      fecha: `GRAN CHACO · ${img.getAttribute('data-fecha')}`,
      alt: img.alt
    }));
    abrirZoomGaleria(frames, idxTimelapse);
  });

  timerTimelapse = setInterval(() => {
    if (!timelapsePausado) {
      mostrarFrame(idxTimelapse + 1);
    }
  }, 1800);
}

// 5. RENDERIZAR FUENTES EN EL FOOTER
function renderizarFuentesFooter() {
  const ul = document.getElementById('contenedor-fuentes-final');
  if (!ul || !FUENTES_DOCUMENTALES) return;
  ul.innerHTML = '';
  FUENTES_DOCUMENTALES.forEach(f => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = f.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = f.titulo;
    li.appendChild(a);
    ul.appendChild(li);
  });
}

export function inicializarFlujoPresentacion() {
  inicializarScrollAnimations();
  inicializarComparadorSalta();
  inicializarBotonesLey();
  inicializarTimelapseConclusion();
  renderizarFuentesFooter();
}
