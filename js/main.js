// ============================================================================
// MAIN ENTRY POINT (INICIALIZACIÓN COMPLETA DE LA APLICACIÓN)
// ============================================================================
import { inicializarModalZoom } from './zoom-modal.js';
import { inicializarDataset, recalcularYActualizarVista, registrarCallbackInspector } from './datos-motor.js';
import { inicializarFlujoPresentacion, registrarCallbackEscena } from './narrativa-flujo.js';
import {
  cargarSvgMapa,
  inicializarControlesTiempo,
  actualizarLimitesControles,
  centrarGeometriaSvg,
  abrirInspectorProvincia,
  cerrarPanelProvincia
} from './mapa-interactivo.js';

// Si el mapa está activo y hay una provincia seleccionada, actualizar su panel al mover el año
registrarCallbackInspector(() => {
  const provActiva = document.querySelector('#mapa-contenedor path.provincia-path.activa');
  if (provActiva) {
    abrirInspectorProvincia(provActiva.getAttribute('id'));
  }
});

// Al cambiar a la escena del mapa, centrar el SVG en el lienzo
registrarCallbackEscena((nombreEscena) => {
  if (nombreEscena === 'mapa') {
    requestAnimationFrame(() => centrarGeometriaSvg());
  }
});

// Listener del botón cerrar panel
document.getElementById('btn-cerrar-panel')?.addEventListener('click', cerrarPanelProvincia);

// Listener global para cerrar panel con Escape
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarPanelProvincia();
  }
});

// Arranque de la aplicación
window.addEventListener('DOMContentLoaded', async () => {
  inicializarModalZoom();
  inicializarFlujoPresentacion();
  inicializarControlesTiempo();
  await cargarSvgMapa();
  actualizarLimitesControles();
  await inicializarDataset();
});
