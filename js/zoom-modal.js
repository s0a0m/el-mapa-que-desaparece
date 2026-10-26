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
