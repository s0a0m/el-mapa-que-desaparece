import { inicializarModalZoom } from './zoom-modal.js';
import {
  inicializarDataset,
  registrarCallbackInspector,
  registrarCallbackDatasetListo
} from './datos-motor.js';
import {
  inicializarFlujoPresentacion,
  construirGraficoHistoriaLey
} from './narrativa-flujo.js';
import {
  cargarSvgMapa,
  inicializarControlesTiempo,
  actualizarLimitesControles,
  abrirInspectorProvincia
} from './mapa-interactivo.js';

registrarCallbackInspector(() => {
  abrirInspectorProvincia(null, false);
});

registrarCallbackDatasetListo((datos) => {
  construirGraficoHistoriaLey(datos.serieNacionalAnual);
  abrirInspectorProvincia('Santiago del Estero', false);
});

window.addEventListener('DOMContentLoaded', async () => {
  inicializarModalZoom();
  inicializarFlujoPresentacion();
  inicializarControlesTiempo();
  await cargarSvgMapa();
  actualizarLimitesControles();
  await inicializarDataset();
});
