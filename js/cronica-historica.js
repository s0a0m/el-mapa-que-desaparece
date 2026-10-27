// ============================================================================
// NARRATIVA EDITORIAL CENTRADA EN ARGENTINA (CON RIGOR CIENTÍFICO Y METODOLÓGICO)
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
    titulo: "Más de un siglo de presión: del quebracho a las cadenas y el desmonte químico",
    texto: "La transformación de nuestros bosques empezó mucho antes del año 2000: en la primera mitad del siglo XX se talaron millones de hectáreas de quebracho colorado para durmientes y tanino. Desde los años 90, la presión sobre el territorio se multiplicó bajo tres procesos regionales muy distintos:",
    tipoVisual: "imagen",
    imagenSrc: "img/topadoras.jpg",
    imagenFallback: URL_FALLBACK_TOPADORAS,
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li><strong>Gran Chaco y Yungas:</strong> Desmonte en cadena (cadenéo con dos topadoras pesadas) y desmonte químico (fumigaciones aéreas para secar el monte en pie antes de quemar).</li>
        <li><strong>Patagonia y Sierras de Córdoba:</strong> Megaincendios forestales que destruyen bosques nativos centenarios y cuencas hídricas.</li>
        <li><strong>Misiones, Corrientes y Entre Ríos:</strong> Tala rasa y replantación industrial de pino y eucalipto comercial.</li>
      </ul>
    `
  },
  {
    titulo: "¿Por qué cada año hay inundaciones más graves?",
    texto: "El bosque nativo funciona como una esponja natural: absorbe las lluvias y resguarda millones de toneladas de carbono. Si el monte desaparece, el suelo se compacta y absorbe hasta 10 veces menos agua (INTA/CONICET), haciendo que las lluvias corran sin freno y provoquen inundaciones en rutas y pueblos.",
    tipoVisual: "imagen",
    imagenSrc: "img/aerea-desmonte.jpg",
    imagenFallback: URL_FALLBACK_AEREA,
    extraHtml: `
      <ul class="lista-editorial-intro">
        <li><strong>No es reemplazable:</strong> Plantar pinos comerciales en otro lugar no recupera un ecosistema nativo que tarda siglos en regenerarse.</li>
        <li><strong>Extinción en curso:</strong> En todo el Gran Chaco argentino ya quedan menos de 20 yaguaretés estimados debido a la fragmentación de su hábitat.</li>
      </ul>
    `
  },
  {
    titulo: "La Ley de Bosques de 2007: avances y mecanismos de evasión",
    texto: "En 2007 la Ley 26.331 obligó a las provincias a ordenar sus bosques en tres zonas (Rojo, Amarillo y Verde). Aunque logró bajar el récord histórico de 2007–2008, la deforestación persistió por tres fallas estructurales: recategorizaciones prediales a medida de terratenientes, multas económicas inferiores al valor de la cosecha y un desfinanciamiento crónico del Fondo Nacional (que recibe históricamente menos del 10% de lo fijado por ley).",
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
            <p>Prohibido desmontar; solo turismo y manejo sustentable.</p>
          </div>
        </div>
        <div class="semaforo-item verde">
          <span class="sem-dot"></span>
          <div>
            <strong>Zona Verde (Categoría III · Desmonte habilitado)</strong>
            <p>Sectores de bajo valor donde la provincia puede autorizar desmonte.</p>
          </div>
        </div>
      </div>
    `,
    extraHtml: ``
  }
];

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
    titulo: "El costo climático: carbono y retención hídrica",
    texto: "La pérdida de cobertura arbórea no solo reduce la capacidad de absorción hídrica de los suelos; también devuelve a la atmósfera el carbono acumulado durante siglos en la biomasa forestal, intensificando sequías y eventos climáticos extremos.",
    visualHtml: `
      <div class="semaforo-ley-box">
        <div class="kpi-conc-card">
          <strong>1.739,5 millones t CO₂e</strong>
          <span>emisiones acumuladas estimadas por pérdida de dosel arbóreo (2001–2025, WRI/GFW)</span>
        </div>
        <div class="kpi-conc-card">
          <strong>378 millones de autos</strong>
          <span>circulando durante un año entero (equivalencia energética de esas emisiones)</span>
        </div>
        <div class="kpi-conc-card">
          <strong>10 veces menos infiltración</strong>
          <span>de agua de lluvia en suelos desmontados respecto al monte nativo (INTA/CONICET)</span>
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
    resumen: "El Congreso sancionó la Ley 26.331 (2007). En 2009 se reglamentó y la Corte Suprema intervino con el fallo 'Salas c/ Salta' frenando desmontes por daño ambiental acumulativo.",
    fuenteTexto: "Texto Ley 26.331 (InfoLEG)",
    fuenteUrl: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm"
  },
  {
    rango: [2010, 2019],
    epigrafe: "2010–2019 · RECATEGORIZACIONES Y PRESIÓN",
    titulo: "Zonas protegidas vulneradas y vacíos locales",
    resumen: "Pese a los mapas provinciales, persistió la conversión mediante recategorizaciones prediales de Amarillo a Verde y avances silvopastoriles en el Chaco seco.",
    fuenteTexto: "Monitoreo Oficial UMSEF",
    fuenteUrl: "https://www.argentina.gob.ar/ambiente/bosques/umsef"
  },
  {
    rango: [2020, 2022],
    epigrafe: "2020–2022 · PANDEMIA, SEQUÍA E INCENDIOS",
    titulo: "Desmontes en cuarentena e incendios críticos",
    resumen: "En 2020 los desmontes en el norte continuaron pese a la cuarentena estricta, sumados a megaincendios en Córdoba, Delta y Corrientes durante la sequía de La Niña.",
    fuenteTexto: "Greenpeace / Infobae",
    fuenteUrl: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/"
  },
  {
    rango: [2023, 2025],
    epigrafe: "2023–2026 · EVIDENCIA CIENTÍFICA RECIENTE",
    titulo: "Investigación en Nature y causas judiciales",
    resumen: "En 2026 Nature Sustainability documentó los mecanismos subnacionales que socavaron la política forestal en Chaco (2009–2024), en paralelo a causas penales federales.",
    fuenteTexto: "Nature Sustainability (2026)",
    fuenteUrl: "https://www.nature.com/articles/s41893-026-01917-5"
  }
];

export const FUENTES_DOCUMENTALES = [
  { titulo: "Global Forest Watch & GLAD (UMD, Hansen et al. 2013 / WRI & DeepMind, Sims et al. 2025)", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" },
  { titulo: "NASA Earth Observatory: 'Deforestation in Argentina’s Gran Chaco' (ID 146731)", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
  { titulo: "Greenpeace Argentina (2026): Informe Anual 2025 sobre deforestación en el norte argentino (PDF)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
  { titulo: "Nature Sustainability (2026): 'Subnational mechanisms undermine anti-deforestation policies'", url: "https://www.nature.com/articles/s41893-026-01917-5" },
  { titulo: "Sistema Nacional de Monitoreo de Bosques Nativos (UMSEF - Argentina.gob.ar)", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" },
  { titulo: "Ley Nacional 26.331 de Bosques Nativos y Decreto 91/2009 (InfoLEG)", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm" },
  { titulo: "Jasinski, A. (2021): Tesis doctoral sobre La Forestal (Repositorio UBA)", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" }
];

export const CONTEXTO_PROVINCIAS = {
  "Santiago del Estero": {
    region: "GRAN CHACO AMERICANO (CHACO SECO)",
    driver: "Desmonte Mecánico en Cadena y Químico (Soja y Ganadería)",
    explicacion: "Epicentro absoluto de la pérdida arbórea en el país (cerca del 30% del total nacional). En departamentos como Moreno, Alberdi y Copo se combinaron el cadenéo con topadoras y el secado químico previo para implantación masiva de cultivos y pasturas, con reiteradas denuncias por incursión en zonas protegidas (Rojas y Amarillas).",
    noticias: [
      { titulo: "Informe Anual 2025 sobre deforestación en el norte argentino (Greenpeace)", fuente: "Greenpeace Argentina (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
      { titulo: "Desmontes en pandemia: más hectáreas perdidas en 2020 que en 2019", fuente: "Infobae / Greenpeace", url: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/" }
    ]
  },
  "Salta": {
    region: "GRAN CHACO Y SELVA DE YUNGAS",
    driver: "Frontera Agroganadera y Recategorizaciones Prediales",
    explicacion: "Segunda jurisdicción con mayor pérdida acumulada. Tras el pico histórico previo a la Ley de Bosques, la Corte Suprema sentó doctrina en 2009 con el fallo 'Salas c/ Salta' al exigir la evaluación de impactos ambientales acumulativos. En la última década se cuestionaron los decretos provinciales de recategorización predial que autorizaban talas en zonas Amarillas.",
    noticias: [
      { titulo: "NASA Earth Observatory (#146731): Análisis satelital de desmontes en Salta", fuente: "NASA", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
      { titulo: "Monitoreo oficial de superficie de bosque nativo en el NOA", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Chaco": {
    region: "GRAN CHACO AMERICANO (EL IMPENETRABLE)",
    driver: "Desmonte Agroganadero y Tala Extractiva",
    explicacion: "Superó el millón de hectáreas perdidas en el siglo XXI. Tras la explotación histórica de tanino, hoy el desmonte avanza sobre corredores de El Impenetrable. Una investigación en Nature Sustainability (agosto 2026) documentó cómo los mecanismos locales y permisos irregulares socavaron la efectividad de la Ley de Bosques.",
    noticias: [
      { titulo: "Subnational mechanisms undermine anti-deforestation policies (Chaco 2009–2024)", fuente: "Nature Sustainability (2026)", url: "https://www.nature.com/articles/s41893-026-01917-5" },
      { titulo: "Desmontes ilegales y denuncias en El Impenetrable chaqueño", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/story/problemas/bosques/greenpeace-denuncia-que-aumento-un-40-la-perdida-de-bosques-en-el-norte/" }
    ]
  },
  "Formosa": {
    region: "GRAN CHACO AMERICANO (CHACO HÚMEDO Y SEMIÁRIDO)",
    driver: "Conversión Silvopastoril y Desmonte Ganadero",
    explicacion: "Integra junto con Santiago, Salta y Chaco el núcleo que concentra el 76% de la pérdida del país. En departamentos como Patiño y Bermejo predomina la habilitación de desmonte selectivo para sistemas silvopastoriles (ganadería bajo monte), proceso que degrada paulatinamente el dosel hasta su eliminación definitiva.",
    noticias: [
      { titulo: "Informe de deforestación en Formosa y el norte argentino (PDF)", fuente: "Greenpeace (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
      { titulo: "Sistema Nacional de Monitoreo de Bosques Nativos", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Misiones": {
    region: "SELVA PARANAENSE (BOSQUE ATLÁNTICO)",
    driver: "Silvicultura Comercial Rotativa (Pino/Eucalipto) y Presión Agrícola",
    notaRotacion: true,
    explicacion: "Misiones conserva el núcleo más continuo de Selva Paranaense del país. El satélite registra una alta pérdida bruta porque mide la cosecha periódica de plantaciones comerciales de pino y eucalipto sobre la cuenca del Paraná (que se talan y replantan), junto con presiones de fragmentación sobre el bosque nativo.",
    noticias: [
      { titulo: "Monitoreo oficial de Bosque Nativo vs. Silvicultura Comercial", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Corrientes": {
    region: "MESOPOTAMIA, ESPINAL Y ESTEROS DEL IBERÁ",
    driver: "Rotación Forestal de Coníferas y Megaincendios (2022)",
    notaRotacion: true,
    explicacion: "Principal polo foresto-industrial del país. Su curva anual refleja tanto la cosecha rotativa de plantaciones comerciales de pino como el pico histórico de 2022, cuando la sequía extrema de La Niña provocó incendios que afectaron tanto plantaciones como pastizales y bosques nativos de humedal.",
    noticias: [
      { titulo: "Pérdida de cobertura por incendios y rotación forestal en Corrientes", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "Entre Rios": {
    region: "ESPINAL MESOPOTÁMICO Y DELTA DEL PARANÁ",
    driver: "Rotación de Eucalipto/Salicáceas e Incendios de Humedal",
    notaRotacion: true,
    explicacion: "La pérdida arbórea combina la silvicultura de eucaliptos sobre el río Uruguay y salicáceas en el Delta, el avance agrícola en el centro-norte (bosques de ñandubay) y los picos de quemas en las islas del Paraná (2008 y 2020–2022).",
    noticias: [
      { titulo: "Quemas e incendios en los humedales del Delta del Paraná", fuente: "UMSEF / Greenpeace", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Santa Fe": {
    region: "CUÑA BOSCOSA SANTAFESINA Y ESPINAL",
    driver: "Explotación Histórica del Quebracho y Expansión Agroganadera",
    explicacion: "El norte santafesino (la Cuña Boscosa) fue el territorio de extracción masiva de quebracho colorado por La Forestal durante la primera mitad del siglo XX. Hoy sus bosques remanentes enfrentan desmonte para ganadería, extracción leñera y quemas estacionales.",
    noticias: [
      { titulo: "Estrategias empresariales y luchas en La Forestal (Tesis UBA, 2021)", fuente: "Repositorio UBA", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" }
    ]
  },
  "Cordoba": {
    region: "BOSQUE CHAQUEÑO SERRANO Y ESPINAL",
    driver: "Incendios Forestales Recurrentes y Avance Urbano",
    explicacion: "Tras perder más del 90% de sus bosques de llanura por agricultura en el siglo XX, los remanentes de bosque serrano (Punilla, Calamuchita y Traslasierra) sufren incendios estacionales críticos (2003, 2013, 2020 y 2024), con daño sobre cuencas hídricas vitales.",
    noticias: [
      { titulo: "Monitoreo de áreas afectadas por fuego en bosques serranos de Córdoba", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Tucuman": {
    region: "SELVA DE YUNGAS Y CHACO SEMIÁRIDO",
    driver: "Expansión Agrícola en el Este y Pedemonte de Yungas",
    explicacion: "Pese a su reducida superficie, perdió más de 145.000 ha de cobertura arbórea desde 2001. La transformación del pedemonte y del este chaqueño redujo la infiltración de agua de las cuencas que bajan del Aconquija, aumentando la gravedad de inundaciones en el sur provincial.",
    noticias: [
      { titulo: "Monitoreo de cuencas y bosques nativos de Yungas", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "San Luis": {
    region: "ESPINAL (CALDENAL) Y CHACO ÁRIDO",
    driver: "Expansión Agrícola, Desbalance Hídrico e Incendios",
    explicacion: "El desmonte del caldenal y algarrobo en la planicie central para agricultura provocó un ascenso generalizado de napas freáticas (caso testigo de la Cuenca del Morro), sumado a incendios en pastizales y sierras.",
    noticias: [
      { titulo: "Monitoreo de bosques del Espinal y Cuenca del Morro", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "La Pampa": {
    region: "ESPINAL (EL CALDENAL) Y MONTE",
    driver: "Megaincendios Estivales en el Caldenal",
    explicacion: "Alberga la mayor superficie mundial de caldén (*Prosopis caldenia*), especie endémica argentina. Sus picos abruptos en la serie temporal responden a megaincendios estivales desatados por tormentas secas sobre pastizales y bosque abierto.",
    noticias: [
      { titulo: "Evaluación de incendios y conservación en el Caldenal", fuente: "UMSEF / INTA", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Jujuy": {
    region: "SELVA DE YUNGAS (RAMAL JUJEÑO) Y PUNA",
    driver: "Agricultura en el Pedemonte e Incendios en Yungas",
    explicacion: "La masa arbórea se concentra en el oriente jujeño (Ledesma, San Pedro y Santa Bárbara). La pérdida se asocia a desmontes agrícolas en el valle del río San Francisco y a incendios forestales críticos que amenazan la zona de amortiguación de Calilegua.",
    noticias: [
      { titulo: "Monitoreo de incendios en las Yungas de Jujuy", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Catamarca": {
    region: "YUNGAS AUSTRALES Y CHACO ÁRIDO",
    driver: "Desmonte Agroganadero en el Este e Incendios de Montaña",
    explicacion: "Su franja oriental (Santa Rosa, El Alto y La Paz) comparte el ecosistema chaqueño con Santiago del Estero y Tucumán, donde avanzaron desmontes mecanizados para ganadería, combinados con quemas de pastizales de altura.",
    noticias: [
      { titulo: "Monitoreo de bosques nativos en el este catamarqueño", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "La Rioja": {
    region: "CHACO ÁRIDO (LOS LLANOS) Y MONTE",
    driver: "Incendios Estacionales, Estrés Hídrico y Tala Dispersa",
    explicacion: "Predominan bosques abiertos xerófilos de algarrobo que rara vez superan el 30% de cobertura de copa. Los registros obedecen a incendios en temporadas de sequía extrema y tala selectiva para leña y postes.",
    noticias: [
      { titulo: "Estado de conservación del bosque nativo en zonas áridas", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Buenos Aires": {
    region: "DELTA DEL PARANÁ, TALARES RIBEREÑOS Y PASTIZAL",
    driver: "Silvicultura en el Delta y Presión Urbana sobre Talares",
    notaRotacion: true,
    explicacion: "La mayor parte del territorio bonaerense es pastizal sin árboles. La pérdida arbórea registrada corresponde a cosechas de álamos y sauces en el Delta del Paraná, plantaciones costeras y la reducción de relictos de talares nativos por urbanización.",
    noticias: [
      { titulo: "Monitoreo de talares bonaerenses y humedales fluviales", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Neuquen": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (PEHUÉN, LENGA Y COIHUE)",
    driver: "Incendios Forestales Cordilleranos y Manejo de Coníferas",
    explicacion: "Sus bosques se recuestan sobre la franja cordillerana, hogar del pehuén milenario. Los registros de pérdida responden a incendios forestales en temporadas de sequía (Aluminé y Quillén) y aprovechamiento de pinos implantados.",
    noticias: [
      { titulo: "Monitoreo de bosques andinos afectados por incendios", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Rio Negro": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (BARILOCHE Y EL BOLSÓN)",
    driver: "Incendios de Interfase Urbano-Forestal",
    explicacion: "Los bosques cordilleranos de ciprés, coihue y lenga enfrentan la recurrencia de incendios en zonas donde la urbanización linda con el bosque, con eventos graves en Cuesta del Ternero y la Comarca Andina.",
    noticias: [
      { titulo: "Informes de áreas quemadas en la Comarca Andina", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Chubut": {
    region: "BOSQUES PATAGÓNICOS (LOS ALERCES Y COMARCA ANDINA)",
    driver: "Megaincendios Forestales (2015, 2021 y 2024)",
    explicacion: "Registró algunos de los incendios de bosque nativo más severos de la Patagonia: más de 40.000 ha en Cholila en 2015 y focos dentro del Parque Nacional Los Alerces en 2024, afectando bosques milenarios de alerce, lenga y coihue.",
    noticias: [
      { titulo: "Informes oficiales de incendios en Parque Nacional Los Alerces", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Santa Cruz": {
    region: "BOSQUES SUBANTÁRTICOS (LOS GLACIARES) Y ESTEPA",
    driver: "Incendios Localizados y Dinámica Natural de Alta Montaña",
    explicacion: "Más del 90% del territorio es estepa sin árboles. Sus bosques de lenga y ñire sobre la cordillera registran pérdidas absolutas bajas asociadas a focos ígneos puntuales y dinámica natural de ecotono.",
    noticias: [
      { titulo: "Monitoreo de bosques subantárticos santacruceños", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Tierra del Fuego": {
    region: "BOSQUES SUBANTÁRTICOS DE LENGA, ÑIRE Y GUINDO",
    driver: "Incendio de Tolhuin (2022) e Impacto del Castor Invasor",
    explicacion: "Única provincia patagónica con más de un tercio de bosque nativo. Su pico máximo responde al incendio en la Reserva Corazón de la Isla (Tolhuin, 2022), junto con el daño biológico continuado por inundación de diques de castor introducido.",
    noticias: [
      { titulo: "Impacto del incendio en la Reserva Corazón de la Isla", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "Mendoza": {
    region: "MONTE DE LLANURAS Y MESETAS",
    driver: "Algarrobales Abiertos (<30% de dosel) e Incendios de Piedemonte",
    explicacion: "Por su aridez, sus formaciones nativas de algarrobo rara vez superan el 30% de cobertura de copa medido por satélite. La pérdida registrada corresponde a recambio de cortinas forestales agrícolas y quemas en el piedemonte.",
    noticias: [
      { titulo: "Conservación de algarrobales en el secano mendocino", fuente: "UMSEF / IADIZA CONICET", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "San Juan": {
    region: "MONTE ÁRIDO DE SIERRAS Y BOLSONES",
    driver: "Geografía Desértica sin Bosques de Dosel Cerrado (>30%)",
    explicacion: "Registra 0 hectáreas de pérdida bajo el umbral satelital de dosel >30% debido a que su vegetación está conformada por algarrobos y retamos abiertos adaptados a la extrema aridez en Valle Fértil.",
    noticias: [
      { titulo: "Monitoreo de formaciones nativas en zonas áridas", fuente: "UMSEF", url: "https://www.argentina.gob.ar/ambiente/bosques/umsef" }
    ]
  },
  "CABA": {
    region: "ECOSISTEMA URBANO METROPOLITANO",
    driver: "Área 100% Urbanizada (Reserva Costanera Sur y Parques)",
    explicacion: "La Ciudad de Buenos Aires no posee explotación forestal; su cobertura arbórea corresponde a arbolado urbano y a la Reserva Costanera Sur, utilizada en la investigación como escala métrica territorial (20.300 ha).",
    noticias: [
      { titulo: "Dashboard de monitoreo satelital de Argentina", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.DIAPOSITIVAS_INTRO = DIAPOSITIVAS_INTRO;
  window.DIAPOSITIVAS_CONCLUSION = DIAPOSITIVAS_CONCLUSION;
  window.HITOS_CRONOLOGICOS = HITOS_CRONOLOGICOS;
  window.FUENTES_DOCUMENTALES = FUENTES_DOCUMENTALES;
  window.CONTEXTO_PROVINCIAS = CONTEXTO_PROVINCIAS;
}
