// ============================================================================
// MODAL ZOOM / LIGHTBOX (BOTÓN 'X' LIMPIO Y SIN DESBORDE EN MÓVIL)
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
  modal.innerHTML = `
    <button type="button" class="btn-cerrar-zoom" aria-label="Cerrar vista ampliada">&times;</button>
    <div class="zoom-galeria-centro">
      <span class="zoom-galeria-fecha">${altTexto || 'Vista ampliada'}</span>
      <img id="modal-zoom-img" src="${src}" alt="${altTexto || 'Imagen ampliada'}">
    </div>
  `;
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
      <button type="button" class="btn-cerrar-zoom" aria-label="Cerrar galería">&times;</button>
      <div class="zoom-galeria-wrap">
        <button type="button" class="zoom-flecha izq" aria-label="Imagen anterior">&lsaquo;</button>
        <div class="zoom-galeria-centro">
          <span class="zoom-galeria-fecha">${f.fecha || ''}</span>
          <img id="modal-zoom-img" src="${f.src}" alt="${f.alt || ('Satélite ' + (f.fecha || ''))}">
        </div>
        <button type="button" class="zoom-flecha der" aria-label="Imagen siguiente">&rsaquo;</button>
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

  document.body.addEventListener('click', (e) => {
    const marco = e.target.closest('.marco-imagen-zoom');
    if (marco) {
      const img = marco.querySelector('img');
      const src = marco.getAttribute('data-zoom-src') || img?.src;
      const cap = marco.getAttribute('data-zoom-caption') || img?.alt;
      abrirZoomImagen(src, cap);
    }
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
