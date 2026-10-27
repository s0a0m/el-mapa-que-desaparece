// ============================================================================
// MODAL ZOOM / LIGHTBOX (PANTALLA COMPLETA SIMPLE Y GALERÍA CON FLECHAS)
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

export function abrirZoomImagen(src, altTexto) {
  if (!src) return;
  galeriaZoomFrames = null;
  const modal = asegurarModalZoomEnDOM();
  modal.innerHTML = `<img id="modal-zoom-img" src="${src}" alt="${altTexto || 'Imagen ampliada'}">`;
  modal.classList.remove('oculto');
}

export function abrirZoomGaleria(frames, idxInicial = 0) {
  if (!frames || !frames.length) return;
  galeriaZoomFrames = frames;
  galeriaZoomIdx = Math.max(0, Math.min(idxInicial, frames.length - 1));
  const modal = asegurarModalZoomEnDOM();

  const renderFrameModal = () => {
    const f = galeriaZoomFrames[galeriaZoomIdx];
    modal.innerHTML = `
      <div class="zoom-galeria-wrap">
        <button type="button" class="zoom-flecha izq" aria-label="Imagen anterior">‹</button>
        <div class="zoom-galeria-centro">
          <span class="zoom-galeria-fecha">${f.fecha || ''}</span>
          <img id="modal-zoom-img" src="${f.src}" alt="${f.alt || ('Satélite ' + (f.fecha || ''))}">
        </div>
        <button type="button" class="zoom-flecha der" aria-label="Imagen siguiente">›</button>
      </div>
    `;

    modal.querySelector('.zoom-flecha.izq').addEventListener('click', (e) => {
      e.stopPropagation();
      galeriaZoomIdx = (galeriaZoomIdx - 1 + galeriaZoomFrames.length) % galeriaZoomFrames.length;
      renderFrameModal();
    });

    modal.querySelector('.zoom-flecha.der').addEventListener('click', (e) => {
      e.stopPropagation();
      galeriaZoomIdx = (galeriaZoomIdx + 1) % galeriaZoomFrames.length;
      renderFrameModal();
    });
  };

  renderFrameModal();
  modal.classList.remove('oculto');
}

export function inicializarModalZoom() {
  const modal = asegurarModalZoomEnDOM();

  modal.addEventListener('click', (e) => {
    if (e.target.closest('.zoom-flecha')) return;
    modal.classList.add('oculto');
    galeriaZoomFrames = null;
  });

  window.addEventListener('keydown', (e) => {
    if (modal.classList.contains('oculto')) return;
    if (e.key === 'Escape') {
      modal.classList.add('oculto');
      galeriaZoomFrames = null;
    } else if (e.key === 'ArrowLeft' && galeriaZoomFrames) {
      modal.querySelector('.zoom-flecha.izq')?.click();
    } else if (e.key === 'ArrowRight' && galeriaZoomFrames) {
      modal.querySelector('.zoom-flecha.der')?.click();
    }
  });
}
