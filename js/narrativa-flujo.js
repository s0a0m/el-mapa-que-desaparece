// ============================================================================
// NARRATIVA Y FLUJO DE PRESENTACIÓN
// ============================================================================
let escenaActiva = 'intro';
let indiceIntro = 0;
let indiceConclusion = 0;
let navegandoPorPopstate = false;

let galeriasIntroMontadas = false;
let timerTimelapse = null;
let frameTimelapseActual = 0;
let timelapsePausado = false;

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
