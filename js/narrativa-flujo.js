import { DIAPOSITIVAS_INTRO, DIAPOSITIVAS_CONCLUSION, FUENTES_DOCUMENTALES } from './cronica-historica.js';
import { abrirZoomImagen, abrirZoomGaleria } from './zoom-modal.js';
import { filtroTiempo, recalcularYActualizarVista } from './datos-motor.js';

export let escenaActiva = 'narrativa';
export let indiceNarrativa = 0;

let navegandoPorPopstate = false;
let galeriasMontadas = false;
let timerTimelapse = null;
let frameTimelapseActual = 0;
let timelapsePausado = false;
let callbackAlCambiarEscena = null;

function setTexto(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setHtml(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = val;
}

function setAtributo(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, val);
}

function setEstilo(id, prop, val) {
  const el = document.getElementById(id);
  if (el) el.style[prop] = val;
}

export function registrarCallbackEscena(fn) {
  callbackAlCambiarEscena = fn;
}

export function guardarEstadoEnHistorial(reemplazar = false) {
  if (navegandoPorPopstate) return;
  const estado = { escena: escenaActiva, indiceNarrativa };
  if (reemplazar) {
    window.history.replaceState(estado, '');
  } else {
    window.history.pushState(estado, '');
  }
}

export function irAEscena(nombreEscena, empujarHistorial = true) {
  escenaActiva = nombreEscena;
  document.getElementById('escena-narrativa')?.classList.toggle('activa', nombreEscena === 'narrativa');
  document.getElementById('escena-mapa')?.classList.toggle('activa', nombreEscena === 'mapa');

  if (typeof callbackAlCambiarEscena === 'function') {
    callbackAlCambiarEscena(nombreEscena);
  }

  if (empujarHistorial) {
    guardarEstadoEnHistorial();
  }
}

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

export function crearElementoVisual(slide) {
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

    stage.addEventListener('click', () => {
      timelapsePausado = true;
      abrirZoomGaleria(slide.frames, frameTimelapseActual);
    });

    wrapper.appendChild(stage);
    itemDom.appendChild(wrapper);

  } else if (slide.tipoVisual === 'comparador') {
    const stack = document.createElement('div');
    stack.className = 'visual-stack';

    const tagAntes = slide.etiquetaAntes || 'SALTA · 2000';
    const tagDespues = slide.etiquetaDespues || 'SALTA · 2019';

    stack.innerHTML = `
      <div class="nasa-comparador">
        <img src="${slide.despuesSrc}" onerror="this.onerror=null;this.src='${slide.despuesFallback}';" alt="${slide.titulo} (${tagDespues})" class="nasa-img">
        <div class="nasa-capa-antes" style="width: 50%;">
          <img src="${slide.antesSrc}" onerror="this.onerror=null;this.src='${slide.antesFallback}';" alt="${slide.titulo} (${tagAntes})" class="nasa-img">
        </div>
        <span class="nasa-tag izq">${tagAntes}</span>
        <span class="nasa-tag der">${tagDespues}</span>
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

    // Toque o clic sin arrastrar: abre la galería con flechas y el año centrado arriba
    rangeInput.addEventListener('click', (e) => {
      if (!huboArrastre) {
        const rect = boxComparador.getBoundingClientRect();
        const clicX = e.clientX - rect.left;
        const corteX = (parseFloat(rangeInput.value) / 100) * rect.width;

        const framesComparador = [
          { src: slide.antesSrc || imgAntes.src, fecha: tagAntes, alt: `${slide.titulo} (${tagAntes})` },
          { src: slide.despuesSrc || imgDespues.src, fecha: tagDespues, alt: `${slide.titulo} (${tagDespues})` }
        ];

        const idxInicial = clicX < corteX ? 0 : 1;
        abrirZoomGaleria(framesComparador, idxInicial);
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

export function montarGaleriaNarrativaEnDOM() {
  if (galeriasMontadas) return;
  const contenedor = document.getElementById('narrativa-visual');
  if (!contenedor) return;

  const lista = DIAPOSITIVAS_INTRO || [];
  contenedor.innerHTML = '';

  lista.forEach((slide, idx) => {
    const itemDom = crearElementoVisual(slide);
    itemDom.classList.toggle('activa', idx === 0);
    itemDom.setAttribute('data-slide-idx', idx);
    contenedor.appendChild(itemDom);
  });

  galeriasMontadas = true;
  iniciarMotorTimelapse();
}

export function renderizarNarrativa() {
  const lista = DIAPOSITIVAS_INTRO || [];
  const slide = lista[indiceNarrativa];
  if (!slide) return;

  montarGaleriaNarrativaEnDOM();

  document.querySelectorAll('#narrativa-visual .slide-media-item').forEach((el, idx) => {
    el.classList.toggle('activa', idx === indiceNarrativa);
  });

  const boxComp = document.querySelector('#narrativa-visual .slide-media-item.activa .nasa-comparador');
  if (boxComp) {
    const imgInterna = boxComp.querySelector('.nasa-capa-antes img');
    if (imgInterna && boxComp.offsetWidth > 0) {
      imgInterna.style.width = `${boxComp.offsetWidth}px`;
    }
  }

  setTexto('narrativa-titulo', slide.titulo);
  setTexto('narrativa-texto', slide.texto);
  setHtml('narrativa-extra', slide.extraHtml || '');
  setTexto('narrativa-acto-actual', `ACTO ${indiceNarrativa + 1} DE ${lista.length}`);
  setTexto('narrativa-contador', `${indiceNarrativa + 1} / ${lista.length}`);

  const btnAnt = document.getElementById('btn-narrativa-ant');
  if (btnAnt) btnAnt.style.visibility = indiceNarrativa === 0 ? 'hidden' : 'visible';

  const btnSig = document.getElementById('btn-narrativa-sig');
  if (btnSig) {
    btnSig.textContent =
      indiceNarrativa === lista.length - 1 ? 'Explorar el Mapa (2001–2025) →' : 'Siguiente paso →';
  }

  // Actualizar barra de progreso
  const barraRelleno = document.getElementById('narrativa-barra-relleno');
  if (barraRelleno) {
    const porcentaje = ((indiceNarrativa + 1) / lista.length) * 100;
    barraRelleno.style.width = `${porcentaje}%`;
  }
}


export function inicializarFlujoPresentacion() {
  const btnTemaViejo = document.getElementById('btn-cambiar-tema');
  if (btnTemaViejo) btnTemaViejo.remove();

  guardarEstadoEnHistorial(true);
  renderizarNarrativa();

  document.getElementById('btn-narrativa-sig')?.addEventListener('click', () => {
    const lista = DIAPOSITIVAS_INTRO || [];
    if (indiceNarrativa < lista.length - 1) {
      indiceNarrativa++;
      renderizarNarrativa();
      guardarEstadoEnHistorial();
    } else {
      irAEscena('mapa');
    }
  });

  document.getElementById('btn-narrativa-ant')?.addEventListener('click', () => {
    if (indiceNarrativa > 0) {
      indiceNarrativa--;
      renderizarNarrativa();
      guardarEstadoEnHistorial();
    }
  });

  document.getElementById('btn-saltar-al-mapa')?.addEventListener('click', () => irAEscena('mapa'));
  document.getElementById('btn-volver-intro')?.addEventListener('click', () => {
    indiceNarrativa = 0;
    renderizarNarrativa();
    irAEscena('narrativa');
  });

  document.getElementById('btn-ir-conclusion')?.addEventListener('click', () => {
    irAEscena('mapa');
  });

  document.getElementById('btn-ir-conclusion-mobile')?.addEventListener('click', () => {
    irAEscena('mapa');
  });

  window.addEventListener('keydown', (e) => {
    const modalZoom = document.getElementById('modal-zoom');
    if (modalZoom && !modalZoom.classList.contains('oculto')) return;

    if (escenaActiva === 'narrativa') {
      if (e.key === 'ArrowRight') document.getElementById('btn-narrativa-sig')?.click();
      if (e.key === 'ArrowLeft') document.getElementById('btn-narrativa-ant')?.click();
    }
  });

  window.addEventListener('popstate', (e) => {
    const modal = document.getElementById('modal-zoom');
    if (modal && !modal.classList.contains('oculto')) {
      modal.classList.add('oculto');
      return;
    }

    if (e.state && e.state.escena) {
      navegandoPorPopstate = true;
      indiceNarrativa = e.state.indiceNarrativa ?? 0;
      irAEscena(e.state.escena, false);
      renderizarNarrativa();
      navegandoPorPopstate = false;
    }
  });
}
