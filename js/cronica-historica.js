// ============================================================================
// NARRATIVA DIRECTA CENTRADA EN ARGENTINA (CON LISTAS LIMPIAS Y DATOS CHEQUEADOS)
// ============================================================================

const URL_FALLBACK_TOPADORAS = "https://commons.wikimedia.org/wiki/Special:FilePath/Quebracho_colorado_wood.jpg?width=900";
const URL_FALLBACK_AEREA = "https://commons.wikimedia.org/wiki/Special:FilePath/Fabrica_de_extracto_de_quebracho_%27La_Chaque%C3%B1a%27_S._A.,_en_Villa_%C3%81ngela.jpg?width=900";
const URL_SALTA_2000_NASA = "https://eoimages.gsfc.nasa.gov/images/imagerecords/146000/146731/granchaco_tm5_2000353.jpg";
const URL_SALTA_2019_NASA = "https://eoimages.gsfc.nasa.gov/images/imagerecords/146000/146731/granchaco_oli_2019357.jpg";

export const DIAPOSITIVAS_INTRO = [
  {
    titulo: "La pérdida de bosques en Argentina avanza a un ritmo crítico",
    texto: "En el último cuarto de siglo, Argentina perdió más de 7,1 millones de hectáreas de cobertura arbórea. No es un fenómeno natural: como muestra esta comparación en la provincia de Salta (2000 vs. 2019), cada rectángulo claro que devora el verde son cientos de hectáreas de bosque nativo arrasadas para expandir la frontera agropecuaria.",
    tipoVisual: "comparador",
    antesSrc: "img/salta-2000.jpg",
    antesFallback: URL_SALTA_2000_NASA,
    despuesSrc: "img/salta-2019.jpg",
    despuesFallback: URL_SALTA_2019_NASA,
    etiquetaAntes: "SALTA · 2000",
    etiquetaDespues: "SALTA · 2019",
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li><strong>Concentración extrema:</strong> Santiago del Estero, Salta, Chaco y Formosa concentran el 76% de toda la pérdida del país.</li>
        <li><strong>Alerta global:</strong> El Gran Chaco figura hoy entre los 11 frentes de deforestación más graves del planeta (WWF).</li>
      </ul>
    `
  },
  {
    titulo: "Más de un siglo de presión: del quebracho a las topadoras y el fuego",
    texto: "La transformación de nuestros bosques empezó mucho antes del año 2000: en la primera mitad del siglo XX se talaron millones de hectáreas de quebracho colorado para el ferrocarril y la industria del tanino. Desde los años 90, el avance de la soja y la ganadería intensiva multiplicó la presión en todo el país bajo tres procesos muy distintos:",
    tipoVisual: "imagen",
    imagenSrc: "img/topadoras.jpg",
    imagenFallback: URL_FALLBACK_TOPADORAS,
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li><strong>Gran Chaco y Yungas:</strong> Desmonte permanente con dos topadoras unidas por cadenas de acero para sembrar soja y pasturas ganaderas.</li>
        <li><strong>Patagonia y Sierras de Córdoba:</strong> Megaincendios forestales que destruyen bosques nativos centenarios.</li>
        <li><strong>Misiones y Corrientes:</strong> Tala y replantación industrial de pino y eucalipto comercial.</li>
      </ul>
    `
  },
  {
    titulo: "¿Por qué cada año hay inundaciones más graves?",
    texto: "El bosque nativo funciona como una esponja natural: cada vez que llueve, el monte absorbe el agua y resguarda millones de toneladas de carbono bajo tierra. Si no hay bosque, el suelo se compacta y absorbe hasta 10 veces menos agua (INTA/CONICET), haciendo que las lluvias fluyan sin freno y arrasen rutas y pueblos enteros.",
    tipoVisual: "imagen",
    imagenSrc: "img/aerea-desmonte.jpg",
    imagenFallback: URL_FALLBACK_AEREA,
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li><strong>No es reemplazable:</strong> Plantar pinos comerciales en otro lugar no recupera un ecosistema nativo que tarda siglos en regenerarse.</li>
        <li><strong>Extinción en curso:</strong> En todo el Gran Chaco argentino ya quedan menos de 20 yaguaretés estimados por la destrucción de su hábitat.</li>
      </ul>
    `
  },
  {
    titulo: "La Ley de Bosques de 2007 y lo que sigue pasando hoy",
    texto: "Tras el récord histórico de desmontes de 2007, la Ley 26.331 obligó a las provincias a ordenar sus bosques nativos en tres zonas como un semáforo. Aunque logró bajar aquel pico extremo, hoy más de la mitad de los desmontes siguen ocurriendo de forma ilegal donde la ley lo prohíbe. Explora a continuación el mapa interactivo de 2001 a 2025 para descubrir qué pasó en cada provincia.",
    tipoVisual: "semaforo",
    htmlFijo: `
      <div class="semaforo-ley-box">
        <div class="semaforo-item rojo">
          <span class="sem-dot"></span>
          <div>
            <strong>Zona Roja (Categoría I · No se toca)</strong>
            <p>Bosques de muy alto valor de conservación. Prohibido desmontar.</p>
          </div>
        </div>
        <div class="semaforo-item amarillo">
          <span class="sem-dot"></span>
          <div>
            <strong>Zona Amarilla (Categoría II · Uso sostenible)</strong>
            <p>Prohibido desmontar; solo turismo y aprovechamiento sustentable.</p>
          </div>
        </div>
        <div class="semaforo-item verde">
          <span class="sem-dot"></span>
          <div>
            <strong>Zona Verde (Categoría III · Desmonte permitido)</strong>
            <p>Sectores de menor conservación donde se autoriza transformar el suelo.</p>
          </div>
        </div>
      </div>
    `,
    extraHtml: ``
  }
];

// ============================================================================
// CONCLUSIONES CON GALERÍA DE FLECHAS (2000–2026) Y PANTALLA COMPLETA
// ============================================================================
export const DIAPOSITIVAS_CONCLUSION = [
  {
    titulo: "7,16 millones de hectáreas menos entre 2001 y 2025",
    texto: "Usa las flechas sobre la imagen (o tócala para abrirla en pantalla completa) y observa cómo avanzó el desmonte sobre el norte argentino entre 2000 y 2026. En todo el país, la superficie perdida equivale a más de 3 veces la provincia de Tucumán entera (o 353 veces la Ciudad de Buenos Aires): un promedio de 785 hectáreas perdidas por día durante 25 años.",
    tipoVisual: "timelapse",
    frames: [
      { anio: "2000", fecha: "Agosto 2000", src: "img/sat-2000.jpg" },
      { anio: "2005", fecha: "Mayo 2005", src: "img/sat-2005.jpg" },
      { anio: "2010", fecha: "Mayo 2010", src: "img/sat-2010.jpg" },
      { anio: "2015", fecha: "Agosto 2015", src: "img/sat-2015.jpg" },
      { anio: "2020", fecha: "Agosto 2020", src: "img/sat-2020.jpg" },
      { anio: "2026", fecha: "Sept. 2026", src: "img/sat-2026.jpg" }
    ],
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li>Tocá la imagen satelital para recorrer la secuencia 2000–2026 en pantalla completa.</li>
      </ul>
    `
  },
  {
    titulo: "Por qué no podemos permitir que este mapa siga desapareciendo",
    texto: "Cuando se destruye y quema el bosque, todo el dióxido de carbono que guardaban los árboles vuelve a la atmósfera calentando el planeta y agravando sequías e inundaciones. Si no detenemos este avance ahora, perderemos de forma irreversible la esponja natural que protege a nuestras ciudades de las inundaciones y llevaremos a la extinción a especies únicas de nuestra fauna. Todavía estamos a tiempo de exigir que se cumpla la Ley de Bosques y frenar el desmonte ilegal en las zonas Rojas y Amarillas.",
    visualHtml: `
      <div class="semaforo-ley-box">
        <div class="kpi-conc-card">
          <strong>1.739,5 millones t CO₂e</strong>
          <span>liberadas a la atmósfera por la pérdida arbórea en Argentina entre 2001 y 2025</span>
        </div>
        <div class="kpi-conc-card">
          <strong>378 millones de autos</strong>
          <span>circulando durante un año entero (equivalencia de esas emisiones acumuladas)</span>
        </div>
        <div class="kpi-conc-card">
          <strong>10 veces menos absorción</strong>
          <span>de agua de lluvia en suelos desmontados para monocultivo frente al bosque nativo (INTA/CONICET)</span>
        </div>
      </div>
    `,
    extraHtml: ``
  },
  {
    titulo: "Fuentes científicas y documentación verificada",
    texto: "Todos los datos de esta plataforma provienen de registros satelitales abiertos, organismos públicos y publicaciones científicas revisadas por pares:",
    visualHtml: `<div id="contenedor-fuentes-final" style="width:100%;"></div>`,
    extraHtml: ``
  }
];

export const HITOS_CRONOLOGICOS = [
  {
    rango: [2000, 2006],
    epigrafe: "2001–2006 · FRONTERA AGROPECUARIA",
    titulo: "Avance de topadoras por soja y ganadería",
    resumen: "La expansión de la soja, la siembra directa y el desplazamiento ganadero aceleraron el desmonte mecánico en Santiago del Estero, Salta y Chaco.",
    fuenteTexto: "NASA Earth Observatory (#146731)",
    fuenteUrl: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/"
  },
  {
    rango: [2007, 2009],
    epigrafe: "2007–2009 · LEY DE BOSQUES 26.331",
    titulo: "Sanción de la ley tras el récord histórico",
    resumen: "El Congreso sancionó la Ley 26.331 (2007). En 2009 se reglamentó y la Corte Suprema frenó desmontes en Salta por daño ambiental acumulativo.",
    fuenteTexto: "Texto Ley 26.331 (InfoLEG)",
    fuenteUrl: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm"
  },
  {
    rango: [2010, 2019],
    epigrafe: "2010–2019 · ZONAS PROTEGIDAS BAJO PRESIÓN",
    titulo: "Zonas Rojas, Amarillas y Verdes bajo presión",
    resumen: "Se aplicaron los ordenamientos provinciales, pero continuó el avance ganadero e intensivo en el Gran Chaco, incluso sobre áreas protegidas.",
    fuenteTexto: "Monitoreo Oficial UMSEF",
    fuenteUrl: "https://www.argentina.gob.ar/ambiente/bosques/umsef"
  },
  {
    rango: [2020, 2022],
    epigrafe: "2020–2022 · PANDEMIA, SEQUÍA E INCENDIOS",
    titulo: "Desmontes en cuarentena e incendios críticos",
    resumen: "En 2020 Greenpeace denunció que el desmonte en el norte no frenó ni en cuarentena, sumado a megaincendios en Córdoba, Delta y Corrientes (2022).",
    fuenteTexto: "Greenpeace / Infobae",
    fuenteUrl: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/"
  },
  {
    rango: [2023, 2025],
    epigrafe: "2023–2026 · EVIDENCIA RECIENTE",
    titulo: "Aumento del 40% en desmontes y fallas de control",
    resumen: "En 2025 Greenpeace estimó 94.204 ha desmontadas y 116.498 ha quemadas en el norte. En 2026 Nature Sustainability documentó cómo se debilitaron controles en Chaco.",
    fuenteTexto: "Greenpeace Argentina / Nature (2026)",
    fuenteUrl: "https://www.greenpeace.org/argentina/story/problemas/bosques/greenpeace-denuncia-que-aumento-un-40-la-perdida-de-bosques-en-el-norte/"
  }
];

export const FUENTES_DOCUMENTALES = [
  { titulo: "Global Forest Watch & GLAD (UMD, Hansen et al. 2013 / WRI & DeepMind, Sims et al. 2025)", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" },
  { titulo: "NASA Earth Observatory: 'Deforestation in Argentina’s Gran Chaco' (ID 146731)", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
  { titulo: "Greenpeace Argentina (2026): Informe Anual 2025 sobre deforestación en el norte argentino (PDF)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
  { titulo: "Greenpeace Argentina: 'Así se ve la deforestación en Argentina en 10 fotos impactantes'", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
  { titulo: "Nature Sustainability (2026): 'Subnational mechanisms undermine anti-deforestation policies'", url: "https://www.nature.com/articles/s41893-026-01917-5" },
  { titulo: "Sistema Nacional de Monitoreo de Bosques Nativos (UMSEF - Argentina.gob.ar)", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" },
  { titulo: "Ley Nacional 26.331 de Bosques Nativos y Decreto 91/2009 (InfoLEG)", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm" },
  { titulo: "Jasinski, A. (2021): Tesis doctoral sobre La Forestal (Repositorio UBA)", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" }
];

export const CONTEXTO_PROVINCIAS = {
  "Santiago del Estero": {
    region: "GRAN CHACO AMERICANO (CHACO SECO)",
    driver: "Desmonte con Topadoras (Soja y Ganadería)",
    explicacion: "Es el epicentro absoluto de la deforestación en Argentina: concentra cerca del 30% de toda la pérdida nacional desde 2001. Los departamentos de Moreno, Alberdi, Copo y Pellegrini sufrieron el avance masivo de topadoras con cadenas sobre quebrachales, gran parte mediante desmontes ilegales en zonas protegidas (Categorías I y II).",
    noticias: [
      { titulo: "Greenpeace denuncia que aumentó un 40% la pérdida de bosques en el Norte", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/story/problemas/bosques/greenpeace-denuncia-que-aumento-un-40-la-perdida-de-bosques-en-el-norte/" },
      { titulo: "Informe Anual 2025 de deforestación en el norte argentino (PDF)", fuente: "Greenpeace (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
      { titulo: "Desmontes en pandemia: se perdieron más hectáreas en 2020 que en 2019", fuente: "Infobae / Greenpeace", url: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/" }
    ]
  },
  "Salta": {
    region: "GRAN CHACO Y SELVA DE YUNGAS",
    driver: "Expansión Agroganadera (Anta, San Martín y Orán)",
    explicacion: "Segunda provincia con mayor pérdida acumulada del país. Tuvo su pico extremo en 2007–2008 mientras se debatía la Ley de Bosques. En 2009, tras el alud de Tartagal y el reclamo de comunidades locales, la Corte Suprema intervino en el fallo histórico 'Salas c/ Salta' frenando permisos por daño ambiental acumulativo.",
    noticias: [
      { titulo: "NASA Earth Observatory (#146731): Imágenes satelitales de desmontes en Salta", fuente: "NASA", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
      { titulo: "Así se ve la deforestación en Argentina en 10 fotos impactantes", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
      { titulo: "Informe Anual 2025 del norte argentino (PDF)", fuente: "Greenpeace (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" }
    ]
  },
  "Chaco": {
    region: "GRAN CHACO AMERICANO (EL IMPENETRABLE)",
    driver: "Desmonte Agroganadero y Extracción Forestal",
    explicacion: "Supera el millón de hectáreas perdidas desde 2001. Tras la explotación histórica del tanino en el siglo XX, hoy enfrenta el avance ilegal de topadoras sobre los corredores biológicos de El Impenetrable. Un estudio en Nature Sustainability (2026) documentó cómo mecanismos locales debilitaron su protección entre 2009 y 2024.",
    noticias: [
      { titulo: "Subnational mechanisms undermine anti-deforestation policies (Caso Chaco)", fuente: "Nature Sustainability (2026)", url: "https://www.nature.com/articles/s41893-026-01917-5" },
      { titulo: "Greenpeace alerta por topadoras y desmontes ilegales en el Chaco", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/story/problemas/bosques/greenpeace-denuncia-que-aumento-un-40-la-perdida-de-bosques-en-el-norte/" },
      { titulo: "Así se ve la deforestación en Argentina en 10 fotos impactantes", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" }
    ]
  },
  "Formosa": {
    region: "GRAN CHACO AMERICANO (CHACO HÚMEDO Y SEMIÁRIDO)",
    driver: "Reconversión Ganadera Intensiva",
    explicacion: "Integra junto a Santiago del Estero, Salta y Chaco el bloque que concentra el 76,3% de la pérdida nacional. Su Ordenamiento Territorial provincial dejó extensas superficies en Categoría III (Verde) en los departamentos Patiño, Bermejo y Matacos, habilitando el desmonte masivo para pasturas ganaderas.",
    noticias: [
      { titulo: "Informe Anual 2025 sobre pérdida de bosques en Formosa, Chaco, Salta y Sgo. del Estero", fuente: "Greenpeace (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
      { titulo: "Sistema Nacional de Monitoreo de Bosques Nativos", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Misiones": {
    region: "SELVA PARANAENSE (BOSQUE ATLÁNTICO)",
    driver: "Silvicultura Comercial Rotativa (Pino/Eucalipto) y Fragmentación",
    notaRotacion: true,
    explicacion: "Misiones conserva el mayor bloque continuo de Selva Paranaense del país. Gran parte de la pérdida de dosel medida por satélite responde a la cosecha y replantación rotativa de pino y eucalipto comercial sobre el corredor del río Paraná (que no equivale a bosque nativo), combinada con desmonte a pequeña escala agrícola.",
    noticias: [
      { titulo: "Deforestación y amenazas sobre la Selva Misionera y el hábitat del yaguareté", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
      { titulo: "Monitoreo oficial de Bosques Nativos vs. Plantaciones", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Corrientes": {
    region: "MESOPOTAMIA, ESPINAL Y ESTEROS DEL IBERÁ",
    driver: "Plantaciones Forestales Comerciales y Megaincendios (2022)",
    notaRotacion: true,
    explicacion: "Es una de las provincias con mayor superficie de forestación industrial de pino y eucalipto. Su serie muestra la rotación maderera anual y un pico extraordinario en 2022, cuando la sequía histórica de 'La Niña' desató incendios que arrasaron humedales, bosques nativos y plantaciones.",
    noticias: [
      { titulo: "Crisis climática e incendios históricos en Corrientes", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" },
      { titulo: "Estadísticas subnacionales de pérdida de dosel por incendios y silvicultura", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "Entre Rios": {
    region: "ESPINAL MESOPOTÁMICO Y DELTA DEL PARANÁ",
    driver: "Rotación Forestal (Eucalipto/Salicáceas), Agricultura e Incendios en el Delta",
    notaRotacion: true,
    explicacion: "En Entre Ríos confluyen tres procesos: la cosecha comercial de eucaliptos sobre el río Uruguay y álamos/sauces en el Delta, el avance agrícola sobre los bosques nativos de ñandubay y algarrobo (Espinal) en el centro-norte provincial, y los grandes incendios en los humedales del Delta (2008 y 2020–2022).",
    noticias: [
      { titulo: "Quemas e incendios en los humedales del Delta del Paraná", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" },
      { titulo: "Monitoreo de la región del Espinal y Delta", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Santa Fe": {
    region: "CUÑA BOSCOSA SANTAFESINA Y ESPINAL",
    driver: "Explotación Histórica del Quebracho y Expansión Agroganadera",
    explicacion: "Su Cuña Boscosa en el norte (Vera, General Obligado y 9 de Julio) fue el epicentro de la extracción devastadora de quebracho colorado y tanino en la primera mitad del siglo XX por La Forestal. Hoy sus bosques remanentes siguen bajo presión por ganadería, extracción de leña/carbón e incendios.",
    noticias: [
      { titulo: "Tesis doctoral sobre La Forestal en el norte santafesino", fuente: "Repositorio UBA (2021)", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" },
      { titulo: "Monitoreo satelital del norte santafesino y Gran Chaco", fuente: "REDAF", url: "https://monitoreodesmonte.com.ar/" }
    ]
  },
  "Cordoba": {
    region: "BOSQUE CHAQUEÑO SERRANO Y ESPINAL",
    driver: "Incendios Forestales Recurrentes y Avance Urbano/Agropecuario",
    explicacion: "Tras perder más del 90% de sus bosques nativos de llanura en el siglo XX por la expansión agrícola, los últimos relictos de bosque serrano en Punilla, Calamuchita, Colón y Traslasierra sufren incendios estacionales devastadores (con picos severos en 2003, 2013, 2020 y 2024) y presión inmobiliaria.",
    noticias: [
      { titulo: "Incendios en Córdoba: alerta por la pérdida crítica de bosque nativo serrano", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" },
      { titulo: "Monitoreo de áreas afectadas por fuego en bosque nativo", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Tucuman": {
    region: "SELVA DE YUNGAS Y LLANURA CHAQUEÑA",
    driver: "Avance Agrícola (Soja, Caña y Citrus) en el Este y Pedemonte",
    explicacion: "Pese a ser la provincia continental más pequeña (2,25 M ha), perdió más de 145.000 ha de cobertura arbórea desde 2001. El desmonte en los departamentos del este (Burruyacú, Leales, Graneros) y en el pedemonte de las Yungas redujo la capacidad de absorción de las cuencas que bajan del Aconquija, agravando inundaciones en el sur tucumano.",
    noticias: [
      { titulo: "El impacto de los desmontes en las inundaciones del norte argentino", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
      { titulo: "Monitoreo de la Selva de Yungas y Parque Chaqueño", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "San Luis": {
    region: "ESPINAL (CALDENAL) Y CHACO ÁRIDO",
    driver: "Expansión Agrícola (Maíz/Soja), Ganadería e Incendios",
    explicacion: "San Luis registró una fuerte transformación de sus bosques nativos de caldén y algarrobo en la llanura central debido al avance de cultivos extensivos y al ascenso de las napas freáticas en la cuenca del Morro, sumado a incendios rurales en las sierras y el monte occidental.",
    noticias: [
      { titulo: "Monitoreo de bosques nativos del Espinal y Chaco Árido", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "La Pampa": {
    region: "ESPINAL (EL CALDENAL) Y MONTE",
    driver: "Grandes Incendios Estivales y Manejo Ganadero en el Caldenal",
    explicacion: "La Pampa resguarda la mayor superficie mundial de bosque de caldén (Prosopis caldenia), un árbol exclusivo de Argentina. Sus picos abruptos en el gráfico anual (como en 2001–2003 y 2016–2018) corresponden a megaincendios de verano desatados por tormentas eléctricas secas sobre pastizales y montes abiertos.",
    noticias: [
      { titulo: "Evaluación de incendios y conservación en el Caldenal pampeano", fuente: "UMSEF / INTA", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Jujuy": {
    region: "SELVA DE YUNGAS (RAMAL JUJEÑO) Y PUNA",
    driver: "Expansión Cañera/Agrícola en el Pedemonte e Incendios Forestales",
    explicacion: "Mientras la Quebrada y la Puna son regiones áridas de altura sin árboles, el oriente jujeño (Ledesma, Santa Bárbara y San Pedro) alberga la Selva de Yungas de altísima biodiversidad. La pérdida responde a desmontes agrícolas en el valle del río San Francisco y a graves incendios forestales como los de 2020 en la zona de Calilegua.",
    noticias: [
      { titulo: "Alerta por los incendios forestales en las Yungas de Jujuy y Calilegua", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" }
    ]
  },
  "Catamarca": {
    region: "YUNGAS AUSTRALES, CHACO ÁRIDO Y MONTE",
    driver: "Desmonte Agroganadero en el Este (Santa Rosa / La Paz) e Incendios",
    explicacion: "Aunque la mayor parte de Catamarca es cordillera árida y bolsones, su franja oriental comparte el bosque chaqueño y la transición de Yungas con Santiago del Estero y Tucumán. En los departamentos Santa Rosa, El Alto y La Paz avanzaron los desmontes mecanizados para agricultura y ganadería.",
    noticias: [
      { titulo: "Informes de monitoreo de bosques nativos en el NOA", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "La Rioja": {
    region: "CHACO ÁRIDO (LOS LLANOS) Y MONTE DE SIERRAS Y BOLSONES",
    driver: "Incendios Estacionales, Extracción de Leña y Estrés Hídrico",
    explicacion: "En La Rioja predominan los bosques xerófilos abiertos de algarrobo y quebracho blanco en la región de Los Llanos (en gran parte con dosel menor al 30% medido por satélite). Las pérdidas registradas obedecen a incendios en temporadas de sequía extrema y tala selectiva.",
    noticias: [
      { titulo: "Estado de conservación del Chaco Árido", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Buenos Aires": {
    region: "DELTA DEL PARANÁ, TALARES RIBEREÑOS Y PASTIZAL PAMPEANO",
    driver: "Rotación de Salicáceas en el Delta, Forestaciones e Incendios",
    notaRotacion: true,
    explicacion: "El ecosistema original de la llanura bonaerense es el pastizal pampeano sin árboles. La pérdida arbórea detectada por satélite se concentra en la cosecha rotativa de álamos y sauces comerciales en el Delta del Paraná, el aprovechamiento de pinos/eucaliptos en la costa y sierras, y la presión urbana sobre los talares nativos.",
    noticias: [
      { titulo: "Monitoreo de talares bonaerenses y humedales del Delta", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Neuquen": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (PEHUÉN, LENGA Y COIHUE)",
    driver: "Incendios Forestales Cordilleranos y Silvicultura de Coníferas",
    explicacion: "Los bosques nativos de Neuquén se ubican sobre la estrecha franja andina occidental (Parques Nacionales Lanín y Nahuel Huapi), hogar del milenario pehuén o araucaria. Sus picos de pérdida responden a incendios forestales en veranos de sequía extrema (como en Aluminé y Quillén en 2021–2024) y manejo de pinos implantados.",
    noticias: [
      { titulo: "Greenpeace advierte por la crisis de incendios forestales en la Patagonia Andina", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" }
    ]
  },
  "Rio Negro": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (BARILOCHE Y EL BOLSÓN)",
    driver: "Megaincendios en la Comarca Andina y Avance de Interfaz Urbana",
    explicacion: "Mientras la meseta oriental es estepa arbustiva, la cordillera rionegrina (Bariloche, El Bolsón y Manso) alberga densos bosques de ciprés, coihue y lenga. Los picos de pérdida reflejan los graves incendios de interfaz urbano-forestal en Cuesta del Ternero / Las Golondrinas (2021) y Nahuel Huapi / Mallín Ahogado (2024–2025).",
    noticias: [
      { titulo: "Informes sobre los incendios forestales en El Bolsón y Bariloche", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" },
      { titulo: "Monitoreo de bosques andino-patagónicos afectados por incendios", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Chubut": {
    region: "BOSQUES PATAGÓNICOS (LOS ALERCES Y COMARCA ANDINA)",
    driver: "Megaincendios Forestales (2015, 2021 y 2024–2025)",
    explicacion: "Chubut sufrió algunos de los incendios de bosque nativo más destructivos de la Patagonia en el siglo XXI: en 2015 el fuego arrasó más de 40.000 ha en Cholila y Epuyén, y entre 2021 y 2025 nuevos incendios golpearon la Comarca Andina y el Parque Nacional Los Alerces, amenazando bosques milenarios.",
    noticias: [
      { titulo: "Alerta por los incendios forestales en Chubut y el Parque Nacional Los Alerces", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/" },
      { titulo: "Informes oficiales de áreas quemadas en Bosques Patagónicos", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Santa Cruz": {
    region: "BOSQUES SUBANTÁRTICOS (LOS GLACIARES) Y ESTEPA",
    driver: "Incendios Localizados y Perturbaciones Naturales en Lenga y Ñire",
    explicacion: "Más del 90% de Santa Cruz es estepa patagónica sin árboles. Sus bosques nativos de lenga, ñire y guindo se recuestan sobre la cordillera austral (El Chaltén, Lago Argentino y Río Turbio), registrando pérdidas bajas asociadas a incendios puntuales y dinámica natural de alta montaña.",
    noticias: [
      { titulo: "Monitoreo de los bosques subantárticos en Santa Cruz", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Tierra del Fuego": {
    region: "BOSQUES SUBANTÁRTICOS DE LENGA, ÑIRE Y GUINDO",
    driver: "Incendio en Tolhuin (2022–2023), Impacto del Castor y Aserraderos",
    explicacion: "Es la única provincia patagónica donde más de un tercio del territorio está cubierto por bosques nativos. Además del daño histórico de los diques de castores introducidos (que inundan y secan valles de lenga), su pico máximo ocurrió en 2022–2023 durante el gran incendio en la Reserva Corazón de la Isla (Tolhuin).",
    noticias: [
      { titulo: "Impacto del incendio forestal en el corazón de Tierra del Fuego (Tolhuin)", fuente: "Greenpeace Argentina / UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Mendoza": {
    region: "MONTE DE LLANURAS Y MESETAS Y CORDILLERA ALTOANDINA",
    driver: "Bosques Abiertos de Algarrobo (<30% de dosel) e Incendios de Monte",
    explicacion: "Por su clima árido y semiárido, los bosques nativos de algarrobo dulce de Mendoza (en Lavalle, Santa Rosa y La Paz) tienen una estructura abierta que rara vez supera el 30% de cobertura de copa que mide el satélite. Los registros puntuales corresponden a recambio de cortinas forestales en oasis agrícolas e incendios.",
    noticias: [
      { titulo: "Conservación de los bosques nativos de algarrobo en el secano de Mendoza", fuente: "UMSEF / IADIZA CONICET", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "San Juan": {
    region: "MONTE ÁRIDO DE SIERRAS Y BOLSONES Y PUNA",
    driver: "Geografía Hiperárida sin Bosques de Dosel Cerrado (>30%)",
    explicacion: "San Juan registra 0 hectáreas de pérdida bajo el umbral satelital de dosel >30% porque su geografía desértica y cordillerana no posee bosques cerrados de esa densidad. Sus formaciones nativas de algarrobo y retamo (como en Valle Fértil) son bosques xerófilos abiertos adaptados a la extrema aridez.",
    noticias: [
      { titulo: "Sistema Nacional de Monitoreo de Bosques Nativos en regiones áridas", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "CABA": {
    region: "ECOSISTEMA URBANO METROPOLITANO Y RIBERA PLATENSE",
    driver: "Jurisdicción 100% Urbanizada (Arbolado Urbano y Reserva Costanera)",
    explicacion: "La Ciudad Autónoma de Buenos Aires (20.300 hectáreas) es un territorio completamente urbanizado sin explotación forestal; su cobertura arbórea corresponde a parques históricos y a la Reserva Ecológica Costanera Sur, usada como referencia de escala para dimensionar lo que se pierde cada mes en el norte del país.",
    noticias: [
      { titulo: "Dashboard de monitoreo satelital de Argentina", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  }
};

// ============================================================================
// COMPATIBILIDAD CON ACCESO GLOBAL (WINDOW)
// ============================================================================
if (typeof window !== 'undefined') {
  window.DIAPOSITIVAS_INTRO = DIAPOSITIVAS_INTRO;
  window.DIAPOSITIVAS_CONCLUSION = DIAPOSITIVAS_CONCLUSION;
  window.HITOS_CRONOLOGICOS = HITOS_CRONOLOGICOS;
  window.FUENTES_DOCUMENTALES = FUENTES_DOCUMENTALES;
  window.CONTEXTO_PROVINCIAS = CONTEXTO_PROVINCIAS;
}
