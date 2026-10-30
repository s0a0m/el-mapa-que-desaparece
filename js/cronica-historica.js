// ============================================================================
// BASE DOCUMENTAL VERIFICADA: HITOS, ETAPAS DE LA LEY Y 24 PROVINCIAS
// ============================================================================

export const ETAPAS_HISTORIA_LEY = {
  "1": {
    rango: [2001, 2006],
    kicker: "ETAPA 1 · 2001 A 2006 (6 AÑOS)",
    titulo: "El boom agropecuario sin ley nacional de protección",
    explicacion: "Tras la salida de la convertibilidad en 2002, el alto valor internacional de la soja, la siembra directa y el desplazamiento de la ganadería hacia el norte impulsaron el desmonte intensivo con topadoras en Santiago del Estero, Salta y Chaco sin que existiera un marco regulatorio nacional.",
    fuenteTexto: "NASA Earth Observatory (#146731 · Gran Chaco)",
    fuenteUrl: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/"
  },
  "2": {
    rango: [2007, 2008],
    kicker: "ETAPA 2 · 2007 A 2008 (EL PICO HISTÓRICO)",
    titulo: "La 'carrera del desmonte' mientras se votaba la Ley 26.331",
    explicacion: "Mientras el Congreso debatía la Ley de Bosques (sancionada en noviembre de 2007 y recién reglamentada en febrero de 2009), los gobiernos provinciales autorizaron permisos masivos por adelantado. Eso provocó que 2007 y especialmente 2008 registraran el récord absoluto de deforestación de toda la serie satelital.",
    fuenteTexto: "Texto oficial Ley 26.331 y Decreto 91/2009 (InfoLEG)",
    fuenteUrl: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm"
  },
  "3": {
    rango: [2009, 2025],
    kicker: "ETAPA 3 · 2009 A 2025 (POST-REGLAMENTACIÓN)",
    titulo: "¿Por qué se perdieron más de 4,1 millones de ha después de la ley?",
    explicacion: "Aunque el promedio anual bajó respecto del pico de 2008, la pérdida acumulada siguió creciendo sin pausa por tres mecanismos: recategorizaciones prediales por decreto (Salta y Chaco), multas bajas que el agronegocio absorbía como costo operativo, y megaincendios agravados por sequías en Córdoba, Corrientes y Patagonia.",
    fuenteTexto: "Nature Sustainability (2026) · Subnational mechanisms",
    fuenteUrl: "https://www.nature.com/articles/s41893-026-01917-5"
  },
  "todas": {
    rango: [2001, 2025],
    kicker: "SERIE COMPLETA · 2001 A 2025 (25 AÑOS)",
    titulo: "7,16 millones de hectáreas de cobertura arbórea perdidas (dosel >30%)",
    explicacion: "En un cuarto de siglo, Argentina perdió una superficie equivalente a más de tres veces la provincia de Tucumán. El 76,3% de toda la pérdida nacional se concentró en cuatro provincias del Gran Chaco: Santiago del Estero, Salta, Chaco y Formosa.",
    fuenteTexto: "Global Forest Watch / Monitoreo Satelital",
    fuenteUrl: "https://www.globalforestwatch.org/dashboards/country/ARG/"
  }
};

export const HITOS_CRONOLOGICOS = [
  {
    rango: [2000, 2006],
    epigrafe: "CRÓNICA 2001–2006 · FRONTERA AGROPECUARIA",
    titulo: "Expansión de la soja y ganadería sobre el Chaco Seco",
    resumen: "El avance de cultivos extensivos y pasturas ganaderas aceleró el desmonte con topadoras y cadenas en Santiago del Estero, Salta y Chaco.",
    fuenteTexto: "NASA Earth Observatory (#146731)",
    fuenteUrl: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/"
  },
  {
    rango: [2007, 2009],
    epigrafe: "CRÓNICA 2007–2009 · LEY 26.331 Y RÉCORD EN 2008",
    titulo: "Sanción de la Ley de Bosques, pico en 2008 y fallo de la Corte",
    resumen: "A fines de 2007 se sancionó la Ley 26.331 tras una ola récord de permisos preventivos que hizo estallar el pico de 2008. En 2009 se reglamentó la ley y la Corte Suprema frenó talas en Salta (fallo Dino Salas).",
    fuenteTexto: "Ley 26.331 (InfoLEG)",
    fuenteUrl: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm"
  },
  {
    rango: [2010, 2019],
    epigrafe: "CRÓNICA 2010–2019 · ZONAS PROTEGIDAS VULNERADAS",
    titulo: "Recategorizaciones prediales y avance silvopastoril",
    resumen: "Las provincias implementaron sus mapas (Rojo, Amarillo y Verde), pero persistieron los desmontes ilegales y las recategorizaciones por decreto en Salta, Chaco y Santiago del Estero.",
    fuenteTexto: "La Nación / Relevamiento de Bosques",
    fuenteUrl: "https://www.lanacion.com.ar/sociedad/deforestacion-relevamiento-alerta-perdida-bosques-protegidos-nid2217968/"
  },
  {
    rango: [2020, 2022],
    epigrafe: "CRÓNICA 2020–2022 · PANDEMIA, SEQUÍA E INCENDIOS",
    titulo: "Topadoras en cuarentena y megaincendios en Córdoba y Corrientes",
    resumen: "En 2020 los desmontes ilegales no se detuvieron durante el aislamiento. Entre 2020 y 2022 la sequía de 'La Niña' desató incendios críticos en Córdoba, el Delta y los Esteros del Iberá.",
    fuenteTexto: "Infobae / Reportes Anuales",
    fuenteUrl: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/"
  },
  {
    rango: [2023, 2026],
    epigrafe: "CRÓNICA 2023–2026 · JUSTICIA FEDERAL Y NATURE",
    titulo: "Causas penales en el norte y evidencia en Nature Sustainability",
    resumen: "Casación Penal reactivó causas contra 'la mafia de los desmontes' en Chaco (2025) y en 2026 la revista Nature Sustainability documentó cómo los mecanismos subnacionales socavaron la Ley de Bosques.",
    fuenteTexto: "Nature Sustainability (2026)",
    fuenteUrl: "https://www.nature.com/articles/s41893-026-01917-5"
  }
];

export const FUENTES_DOCUMENTALES = [
  { titulo: "Global Forest Watch & GLAD (University of Maryland, Hansen et al. 2013 / WRI & Google DeepMind, Sims et al. 2025)", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" },
  { titulo: "NASA Earth Observatory (#146731): 'Deforestation in Argentina’s Gran Chaco' (Imágenes Landsat Salta 2000–2019)", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
  { titulo: "Nature Sustainability (2026): 'Subnational mechanisms undermine transnational anti-deforestation policies'", url: "https://www.nature.com/articles/s41893-026-01917-5" },
  { titulo: "Ley Nacional 26.331 de Presupuestos Mínimos de Protección Ambiental de los Bosques Nativos (InfoLEG)", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/135000-139999/136125/norma.htm" },
  { titulo: "CONICET: Investigaciones ecohidrológicas sobre deforestación, infiltración de suelos y Cuenca del Morro", url: "https://www.conicet.gov.ar/el-rio-nuevo-el-cauce-que-nacio-por-la-deforestacion-en-san-luis/" },
  { titulo: "Greenpeace Argentina (2026): Informe Anual 2025 sobre deforestación e incendios en el norte argentino (PDF)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" },
  { titulo: "Greenpeace Argentina: 'Así se ve la deforestación en Argentina en 10 fotos impactantes'", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
  { titulo: "Jasinski, Alejandro (2021): 'Estrategias empresariales y luchas sociales en La Forestal' (Tesis Doctoral UBA)", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" },
  { titulo: "NASA EOSDIS Worldview: Registro satelital multitemporal MODIS / VIIRS / Landsat (2000–2026)", url: "https://worldview.earthdata.nasa.gov/" }
];

export const CONTEXTO_PROVINCIAS = {
  "Santiago del Estero": {
    region: "GRAN CHACO AMERICANO (CHACO SECO)",
    driver: "Desmonte mecánico en cadena y químico (Soja y Ganadería)",
    fraseEditorial: "El epicentro histórico del desmonte chaqueño, donde el avance de la frontera agropecuaria arrasa sistemáticamente el mayor bosque seco de Sudamérica.",
    explicacion: "Concentra cerca del 30% de toda la pérdida arbórea nacional desde 2001. Los departamentos de Moreno, Alberdi, Copo y Pellegrini sufrieron el avance masivo de topadoras con cadenas y fumigaciones químicas previas, gran parte sobre zonas protegidas (Categorías I y II).",
    noticias: [
      { rango: [2001, 2019], titulo: "Deforestación: un relevamiento alerta sobre la pérdida de bosques protegidos", fuente: "La Nación (2019)", url: "https://www.lanacion.com.ar/sociedad/deforestacion-relevamiento-alerta-perdida-bosques-protegidos-nid2217968/" },
      { rango: [2020, 2022], titulo: "Desmontes en pandemia: se perdieron más hectáreas en 2020 que en 2019", fuente: "Infobae (2021)", url: "https://www.infobae.com/sociedad/2021/02/06/desmontes-greenpeace-denuncia-que-se-perdieron-mas-hectareas-de-bosque-nativo-en-2020-con-pandemia-que-en-2019/" },
      { rango: [2023, 2025], titulo: "En su Informe Anual, Greenpeace denuncia que aumentaron los desmontes en el norte argentino", fuente: "Infobae (2024)", url: "https://www.infobae.com/america/medio-ambiente/2024/01/19/en-su-informe-anual-sobre-deforestacion-greenpeace-denuncia-que-en-2023-aumentaron-los-desmontes-en-el-norte-argentino/" }
    ]
  },
  "Salta": {
    region: "GRAN CHACO Y SELVA DE YUNGAS",
    driver: "Expansión agroganadera y recategorizaciones prediales",
    fraseEditorial: "El laboratorio del agronegocio donde las topadoras y las recategorizaciones a medida desdibujan tanto los bosques nativos como los territorios indígenas.",
    explicacion: "Segunda provincia con mayor pérdida acumulada del país. En 2009 la Corte Suprema intervino en el fallo 'Salas, Dino c/ Salta' ordenando frenar desmontes por daño ambiental acumulativo. En 2024 se cuestionó la actualización del OTBN provincial por habilitar nuevas áreas de desmonte.",
    noticias: [
      { rango: [2001, 2012], titulo: "Salta, capital del desmonte pese al fallo de la Corte Suprema", fuente: "Página/12 (2010)", url: "https://www.pagina12.com.ar/diario/sociedad/3-140716-2010-02-21.html" },
      { rango: [2013, 2021], titulo: "NASA Earth Observatory (#146731): Imágenes satelitales de desmontes en Salta", fuente: "NASA (2020)", url: "https://science.nasa.gov/earth/earth-observatory/deforestation-in-argentinas-gran-chaco-146731/" },
      { rango: [2022, 2025], titulo: "Alerta en los bosques salteños por el nuevo Ordenamiento Territorial", fuente: "Infobae (2024)", url: "https://www.infobae.com/opinion/2024/12/23/alerta-en-los-bosques-saltenos/" }
    ]
  },
  "Chaco": {
    region: "GRAN CHACO AMERICANO (EL IMPENETRABLE)",
    driver: "Desmonte agroganadero y extracción maderera",
    fraseEditorial: "La provincia donde los permisos irregulares se institucionalizaron, mientras la Justicia Federal investiga el desmantelamiento del monte nativo.",
    explicacion: "Supera el millón de hectáreas perdidas desde 2001. En noviembre de 2025 la Cámara Federal de Casación Penal reactivó la megacausa sobre 'la mafia de los desmontes', y en 2026 un estudio en Nature Sustainability documentó los mecanismos subnacionales que debilitaron su protección.",
    noticias: [
      { rango: [2001, 2018], titulo: "Greenpeace denuncia que aumentó un 40% la pérdida de bosques en el Norte", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/story/problemas/bosques/greenpeace-denuncia-que-aumento-un-40-la-perdida-de-bosques-en-el-norte/" },
      { rango: [2019, 2024], titulo: "“La mafia de los desmontes en Chaco”: Casación anuló un fallo local y ordenó que la causa avance", fuente: "Infobae (2025)", url: "https://www.infobae.com/sociedad/2025/11/17/la-mafia-de-los-desmontes-en-chaco-casacion-anulo-un-fallo-de-tribunales-locales-y-ordeno-que-la-causa-avance/" },
      { rango: [2025, 2025], titulo: "Subnational mechanisms undermine anti-deforestation policies (Caso Chaco)", fuente: "Nature Sustainability (2026)", url: "https://www.nature.com/articles/s41893-026-01917-5" }
    ]
  },
  "Formosa": {
    region: "GRAN CHACO AMERICANO (CHACO HÚMEDO Y SEMIÁRIDO)",
    driver: "Conversión ganadera y sistemas silvopastoriles",
    fraseEditorial: "Un paisaje fracturado donde la expansión de la frontera ganadera desplaza de manera silenciosa a las comunidades originarias y al monte.",
    explicacion: "Integra junto a Santiago del Estero, Salta y Chaco el bloque que concentra el 76,3% de la pérdida nacional. Su ordenamiento territorial habilitó extensas áreas para desmonte ganadero y sistemas silvopastoriles que degradan progresivamente el dosel.",
    noticias: [
      { rango: [2001, 2023], titulo: "Greenpeace denuncia el aumento de desmontes en Formosa y el norte argentino", fuente: "Infobae (2024)", url: "https://www.infobae.com/america/medio-ambiente/2024/01/19/en-su-informe-anual-sobre-deforestacion-greenpeace-denuncia-que-en-2023-aumentaron-los-desmontes-en-el-norte-argentino/" },
      { rango: [2024, 2025], titulo: "Informe Anual 2025 sobre deforestación en Formosa, Chaco, Salta y Sgo. del Estero (PDF)", fuente: "Greenpeace (2026)", url: "https://www.greenpeace.org/static/planet4-argentina-stateless/2026/02/5812094a-informe-anual-deforestacion-2025.pdf" }
    ]
  },
  "Cordoba": {
    region: "BOSQUE CHAQUEÑO SERRANO Y ESPINAL",
    driver: "Incendios forestales de interfase y avance urbano",
    fraseEditorial: "El relicto de bosque serrano que agoniza cada año entre la extrema sequía, el fuego intencional y la implacable expansión urbana.",
    explicacion: "Tras perder más del 90% de sus bosques de llanura en el siglo XX por la expansión agrícola, los últimos relictos de bosque nativo en Punilla, Calamuchita y Traslasierra sufren megaincendios recurrentes (2013, 2020 y 2024).",
    noticias: [
      { rango: [2001, 2018], titulo: "El fuego dejó un panorama desolador en las sierras de Córdoba", fuente: "La Nación (2013)", url: "https://www.lanacion.com.ar/sociedad/el-fuego-dejo-un-panorama-desolador-en-las-sierras-de-cordoba-nid1619034/" },
      { rango: [2019, 2025], titulo: "Incendios forestales en 2024: datos oficiales del mapeo provincial en Córdoba", fuente: "IDECOR Córdoba (2024)", url: "https://www.idecor.gob.ar/incendios-forestales-en-2024-datos-del-mapeo-provincial/" }
    ]
  },
  "Corrientes": {
    region: "MESOPOTAMIA, ESPINAL Y ESTEROS DEL IBERÁ",
    driver: "Rotación de plantaciones comerciales (pino/eucalipto) e incendios (2022)",
    notaRotacion: true,
    fraseEditorial: "Humedales bajo asedio, donde el cóctel de megasequías y monocultivos forestales transformó la provincia en un polvorín inflamable en 2022.",
    explicacion: "Principal polo foresto-industrial de pino y eucalipto del país. Su serie refleja tanto la cosecha comercial rotativa como la catástrofe de inicios de 2022, cuando el fuego arrasó humedales, bosques nativos y plantaciones en los Esteros del Iberá.",
    noticias: [
      { rango: [2001, 2021], titulo: "Informe técnico del INTA sobre las áreas quemadas y forestaciones en Corrientes", fuente: "Argentina Forestal / INTA (2022)", url: "https://www.argentinaforestal.com/2022/02/25/informe-tecnico-del-inta/" },
      { rango: [2022, 2025], titulo: "Tragedia ecológica en Corrientes: los incendios llegaron a los Esteros del Iberá", fuente: "La Nación (2022)", url: "https://www.lanacion.com.ar/sociedad/tragedia-ecologica-en-corrientes-los-incendios-llegaron-a-los-esteros-del-ibera-y-amenazan-su-amplia-nid15022022/" }
    ]
  },
  "Misiones": {
    region: "SELVA PARANAENSE (BOSQUE ATLÁNTICO)",
    driver: "Silvicultura comercial rotativa (pino/eucalipto) y roce agrícola",
    notaRotacion: true,
    fraseEditorial: "El último gran bastión de la Selva Paranaense atrapado entre la rotación de la industria maderera y la amenaza de incendios por sequía.",
    explicacion: "Conserva el mayor bloque continuo de Selva Paranaense. Gran parte de la pérdida de cobertura detectada por satélite corresponde a la cosecha y replantación rotativa de pinos comerciales sobre el eje del río Paraná, coexistiendo con fragmentación de selva nativa.",
    noticias: [
      { rango: [2001, 2021], titulo: "Así se ve la deforestación en Argentina y la presión sobre la Selva Misionera", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" },
      { rango: [2022, 2025], titulo: "Incendio en Misiones: operativo para combatir el fuego en la reserva Campo San Juan", fuente: "Infobae (2026)", url: "https://www.infobae.com/sociedad/2026/09/09/incendio-en-misiones-desplegaron-un-operativo-para-combatir-el-avance-del-fuego-en-la-reserva-campo-san-juan/" }
    ]
  },
  "Chubut": {
    region: "BOSQUES PATAGÓNICOS (LOS ALERCES Y COMARCA ANDINA)",
    driver: "Megaincendios forestales en bosque nativo (2015, 2021 y 2024)",
    fraseEditorial: "El patrimonio andino patagónico que arde cada verano bajo la amenaza del cambio climático y los devastadores focos intencionales.",
    explicacion: "Sufrió algunos de los incendios de bosque nativo más destructivos de la Patagonia en el siglo XXI: en 2015 el fuego arrasó más de 40.000 ha en Cholila y Epuyén, y en 2024 quemó casi 7.000 ha dentro del Parque Nacional Los Alerces.",
    noticias: [
      { rango: [2001, 2021], titulo: "Las múltiples causas anunciadas detrás de los incendios en la Patagonia", fuente: "Infobae (2021)", url: "https://www.infobae.com/sociedad/2021/03/13/las-multiples-causas-anunciadas-y-que-no-fueron-tomadas-en-cuenta-detras-de-los-incendios-en-la-patagonia/" },
      { rango: [2022, 2025], titulo: "Extinguieron el incendio que arrasó casi 7.000 hectáreas en el Parque Nacional Los Alerces", fuente: "Infobae (2024)", url: "https://www.infobae.com/sociedad/2024/03/23/extinguieron-el-incendio-en-el-parque-nacional-los-alerces/" }
    ]
  },
  "Rio Negro": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (BARILOCHE Y EL BOLSÓN)",
    driver: "Megaincendios en la Comarca Andina e interfase urbana",
    fraseEditorial: "La cordillera rionegrina sufre la combinación letal de sequía prolongada y focos ígneos en zonas de interfase urbano-forestal.",
    explicacion: "Los densos bosques cordilleranos de ciprés de la cordillera, coihue y lenga en Bariloche y El Bolsón registran picos severos por incendios de interfase como los de Las Golondrinas y Cuesta del Ternero (2021) y Mallín Ahogado (2024–2025).",
    noticias: [
      { rango: [2001, 2025], titulo: "Las múltiples causas anunciadas detrás de los incendios en la Patagonia", fuente: "Infobae (2021)", url: "https://www.infobae.com/sociedad/2021/03/13/las-multiples-causas-anunciadas-y-que-no-fueron-tomadas-en-cuenta-detras-de-los-incendios-en-la-patagonia/" }
    ]
  },
  "Entre Rios": {
    region: "ESPINAL MESOPOTÁMICO Y DELTA DEL PARANÁ",
    driver: "Rotación forestal (eucalipto/salicáceas), agricultura e incendios en el Delta",
    notaRotacion: true,
    fraseEditorial: "Entre la cosecha industrial de eucaliptos sobre el río Uruguay y la recurrencia de quemas masivas en los humedales del Delta.",
    explicacion: "Confluyen tres procesos: la cosecha comercial de eucaliptos y álamos, el avance agrícola sobre los bosques nativos de ñandubay y algarrobo (Espinal), y los grandes incendios en las islas del Delta (2008 y 2020–2022).",
    noticias: [
      { rango: [2001, 2023], titulo: "Incendios en el Delta: se quemaron más de 10 mil hectáreas frente a Rosario", fuente: "Página/12 (2022)", url: "https://www.pagina12.com.ar/472562-incendios-en-el-delta-se-quemaron-mas-de-10-mil-hectareas-fr/" },
      { rango: [2024, 2025], titulo: "Incendio en las islas del Delta del Paraná: el fuego ya consumió 400 hectáreas", fuente: "Infobae (2026)", url: "https://www.infobae.com/sociedad/2026/03/03/incendio-en-las-islas-del-delta-del-parana-el-fuego-ya-consumio-400-hectareas/" }
    ]
  },
  "Santa Fe": {
    region: "CUÑA BOSCOSA SANTAFESINA Y ESPINAL",
    driver: "Explotación histórica del quebracho y expansión agroganadera",
    fraseEditorial: "Marcada por la herencia extractiva de La Forestal en la Cuña Boscosa del norte y el humo de las quemas en los humedales del sur.",
    explicacion: "Los departamentos del norte (Vera, General Obligado y 9 de Julio) sufrieron la devastación histórica de quebracho colorado en el siglo XX. Hoy sus bosques remanentes siguen bajo presión por ganadería, leña/carbón e incendios.",
    noticias: [
      { rango: [2001, 2019], titulo: "Tesis doctoral sobre la explotación forestal de La Forestal en el norte santafesino", fuente: "Repositorio UBA (2021)", url: "https://repositorio.filo.uba.ar/server/api/core/bitstreams/ca770f42-ea50-445a-b3ea-7827e084f9ee/content" },
      { rango: [2020, 2025], titulo: "Incendios en el Delta: se quemaron más de 10 mil hectáreas frente a Rosario", fuente: "Página/12 (2022)", url: "https://www.pagina12.com.ar/472562-incendios-en-el-delta-se-quemaron-mas-de-10-mil-hectareas-fr/" }
    ]
  },
  "Tucuman": {
    region: "SELVA DE YUNGAS Y LLANURA CHAQUEÑA",
    driver: "Avance agrícola (soja, caña y citrus) en el este y pedemonte",
    fraseEditorial: "La provincia continental más pequeña perdió gran parte de su esponja pedemontana, agravando las inundaciones en las cuencas del sur.",
    explicacion: "Pese a su reducido territorio (2,25 M ha), perdió más de 145.000 ha de cobertura arbórea desde 2001. El desmonte en Burruyacú, Leales y Graneros y en el pedemonte de las Yungas redujo la infiltración de las cuencas que bajan del Aconquija.",
    noticias: [
      { rango: [2001, 2017], titulo: "Los seis problemas que pusieron en jaque a Tucumán por las lluvias (70% atribuido al desmonte)", fuente: "La Gaceta (2015)", url: "https://www.lagaceta.com.ar/nota/630123/sociedad/seis-problemas-pusieron-jaque-tucuman-lluvias.html" },
      { rango: [2018, 2025], titulo: "El impacto de los desmontes en las inundaciones del norte argentino", fuente: "Greenpeace Argentina", url: "https://www.greenpeace.org/argentina/blog/problemas/bosques/asi-se-ve-la-deforestacion-en-argentina-en-10-fotos-impactantes/" }
    ]
  },
  "San Luis": {
    region: "ESPINAL (CALDENAL) Y CHACO ÁRIDO",
    driver: "Expansión agrícola, desbalance hídrico (Cuenca del Morro) e incendios",
    fraseEditorial: "El caso testigo donde la eliminación del bosque alteró tanto el suelo que dio nacimiento a un nuevo río en la Cuenca del Morro.",
    explicacion: "La sustitución del bosque nativo de caldén y algarrobo por cultivos anuales de raíces cortas elevó las napas freáticas hasta colapsar los suelos y crear el 'Río Nuevo' en la Cuenca del Morro, sumado a incendios serranos.",
    noticias: [
      { rango: [2001, 2018], titulo: "El Río Nuevo: el cauce que nació por la deforestación y el cambio de uso de suelo", fuente: "CONICET", url: "https://www.conicet.gov.ar/el-rio-nuevo-el-cauce-que-nacio-por-la-deforestacion-en-san-luis/" },
      { rango: [2019, 2025], titulo: "Tablero estadístico subnacional de pérdida arbórea en San Luis", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "La Pampa": {
    region: "ESPINAL (EL CALDENAL) Y MONTE",
    driver: "Megaincendios estivales en el bosque de caldén",
    fraseEditorial: "Hogar del mayor bosque mundial de caldén, un árbol exclusivo de Argentina que enfrenta periódicamente tormentas de fuego en verano.",
    explicacion: "Resguarda el ecosistema del caldén (Prosopis caldenia). Sus picos abruptos en la serie anual (2001–2003 y 2016–2018) responden a megaincendios estivales desatados por tormentas eléctricas secas sobre pastizales y montes abiertos.",
    noticias: [
      { rango: [2001, 2025], titulo: "Los incendios afectan más de un millón de hectáreas en La Pampa, Río Negro y Buenos Aires", fuente: "Infobae (2017)", url: "https://www.infobae.com/sociedad/2017/01/05/sergio-bergman-los-incendios-afectan-mas-de-un-millon-de-hectareas/" }
    ]
  },
  "Jujuy": {
    region: "SELVA DE YUNGAS (RAMAL JUJEÑO) Y PUNA",
    driver: "Expansión agrícola en el pedemonte e incendios en Yungas",
    fraseEditorial: "La biodiversa franja de Yungas del ramal jujeño resiste entre el avance de cultivos intensivos y los incendios en las puertas de Calilegua.",
    explicacion: "Mientras la Puna y Quebrada carecen de bosques densos, el oriente jujeño (Ledesma, Santa Bárbara y San Pedro) alberga la Selva de Yungas. La pérdida responde a desmontes en el valle del río San Francisco y graves incendios como los de 2013, 2020 y 2021.",
    noticias: [
      { rango: [2001, 2020], titulo: "Incendios en Jujuy: ya se perdieron más de cinco mil hectáreas", fuente: "Página/12 (2020)", url: "https://www.pagina12.com.ar/301844-incendios-en-jujuy-ya-se-perdieron-mas-de-cinco-mil-hectarea/" },
      { rango: [2021, 2025], titulo: "Jujuy: los incendios en la región de las Yungas ya afectaron más de 4 mil hectáreas", fuente: "Infobae (2021)", url: "https://www.infobae.com/sociedad/2021/11/03/jujuy-los-incendios-en-la-region-de-las-yungas-ya-afectaron-mas-de-4-mil-hectareas/" }
    ]
  },
  "Catamarca": {
    region: "YUNGAS AUSTRALES, CHACO ÁRIDO Y MONTE",
    driver: "Desmonte agroganadero en el este (Santa Rosa y La Paz) e incendios",
    fraseEditorial: "En los valles orientales, el bosque chaqueño catamarqueño cede terreno frente a las topadoras ganaderas y el fuego serrano.",
    explicacion: "Su franja oriental comparte el bosque chaqueño y la transición de Yungas con Santiago del Estero y Tucumán. En los departamentos Santa Rosa, El Alto y La Paz avanzaron desmontes mecanizados para ganadería y cultivos.",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico subnacional de pérdida arbórea en Catamarca", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "La Rioja": {
    region: "CHACO ÁRIDO (LOS LLANOS) Y MONTE DE SIERRAS Y BOLSONES",
    driver: "Incendios estacionales, extracción leñera y estrés hídrico",
    fraseEditorial: "Ecosistemas áridos donde cada hectárea de algarrobo y quebracho blanco perdida acelera la desertificación del suelo.",
    explicacion: "Predominan bosques xerófilos abiertos en la región de Los Llanos (en gran parte con dosel menor al 30% medido por satélite). Las pérdidas registradas obedecen a incendios en temporadas de sequía y tala selectiva.",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico subnacional de pérdida arbórea en La Rioja", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "Buenos Aires": {
    region: "DELTA DEL PARANÁ, TALARES RIBEREÑOS Y PASTIZAL PAMPEANO",
    driver: "Silvicultura de salicáceas en el Delta, forestaciones e incendios",
    notaRotacion: true,
    fraseEditorial: "Una llanura pampeana donde la pérdida arbórea refleja la cosecha de álamos y sauces en el Delta y el retroceso de los talares nativos.",
    explicacion: "El ecosistema original de la llanura bonaerense es el pastizal sin árboles. La pérdida arbórea detectada por satélite se concentra en la cosecha rotativa de salicáceas comerciales en el Delta del Paraná, pinos costeros y presión inmobiliaria sobre los talares.",
    noticias: [
      { rango: [2001, 2025], titulo: "Más poder para las empresas (avance inmobiliario sobre talares y humedales)", fuente: "Página/12 (2017)", url: "https://www.pagina12.com.ar/19270-mas-poder-para-las-empresas/" }
    ]
  },
  "Neuquen": {
    region: "BOSQUES ANDINO-PATAGÓNICOS (PEHUÉN, LENGA Y COIHUE)",
    driver: "Incendios forestales cordilleranos y silvicultura de coníferas",
    fraseEditorial: "Los milenarios bosques andinos de araucaria (pehuén) enfrentan una frecuencia inédita de incendios en veranos de sequía extrema.",
    explicacion: "Sus bosques nativos se ubican sobre la estrecha franja andina occidental (Parques Nacionales Lanín y Nahuel Huapi). Los picos de pérdida responden a grandes incendios como los de Aluminé (2015) y Quillén (2021–2022) y al manejo de coníferas implantadas.",
    noticias: [
      { rango: [2001, 2025], titulo: "Las múltiples causas anunciadas detrás de los incendios en la Patagonia", fuente: "Infobae (2021)", url: "https://www.infobae.com/sociedad/2021/03/13/las-multiples-causas-anunciadas-y-que-no-fueron-tomadas-en-cuenta-detras-de-los-incendios-en-la-patagonia/" }
    ]
  },
  "Santa Cruz": {
    region: "BOSQUES SUBANTÁRTICOS (LOS GLACIARES) Y ESTEPA",
    driver: "Incendios localizados en ecotono y dinámica de alta montaña",
    fraseEditorial: "La estepa domina el 90% del territorio; sobre la cordillera austral, los bosques de lenga y ñire enfrentan vientos extremos y estrés hídrico.",
    explicacion: "Sus bosques nativos de lenga, ñire y guindo se recuestan sobre la cordillera (El Chaltén, Lago Argentino y Río Turbio), registrando pérdidas absolutas bajas vinculadas a incendios puntuales (Lago Posadas, Lago San Martín y Los Glaciares).",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico subnacional de Santa Cruz", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "Tierra del Fuego": {
    region: "BOSQUES SUBANTÁRTICOS DE LENGA, ÑIRE Y GUINDO",
    driver: "Megaincendio en Tolhuin (2022) e impacto del castor invasor",
    fraseEditorial: "El bosque más austral del planeta, acorralado entre la plaga histórica del castor introducido y el devastador incendio de Tolhuin en 2022.",
    explicacion: "Es la única provincia patagónica con más de un tercio de su superficie cubierta por bosques nativos. Además de la inundación de valles de lenga por diques de castores exóticos, en diciembre de 2022 sufrió un incendio histórico que arrasó más de 9.000 ha en la Reserva Corazón de la Isla (Tolhuin).",
    noticias: [
      { rango: [2001, 2020], titulo: "La biodiversidad fueguina en jaque: desaparecieron 30 mil hectáreas de bosque nativo por los castores exóticos", fuente: "Infobae (2019)", url: "https://www.infobae.com/tendencias/ecologia-y-medio-ambiente/2019/01/06/la-biodiversidad-fueguina-en-jaque-desaparecieron-30-mil-hectareas-de-bosque-nativo-por-los-castores-exoticos/" },
      { rango: [2021, 2022], titulo: "Los incendios en Tierra del Fuego ya afectaron más de 9.000 hectáreas en Tolhuin", fuente: "Infobae (2022)", url: "https://www.infobae.com/sociedad/2022/12/12/los-incendios-en-tierra-del-fuego-ya-afectaron-mas-de-9000-hectareas/" },
      { rango: [2023, 2025], titulo: "Tierra del Fuego: continúa el incendio forestal en la reserva natural Corazón de la Isla", fuente: "Página/12 (2022)", url: "https://www.pagina12.com.ar/507083-tierra-del-fuego-continua-el-incendio-forestal-en-la-reserva" }
    ]
  },
  "Mendoza": {
    region: "MONTE DE LLANURAS Y MESETAS Y CORDILLERA ALTOANDINA",
    driver: "Bosques abiertos de algarrobo (<30% de dosel) e incendios de monte",
    fraseEditorial: "Los algarrobales del secano mendocino sobreviven en el límite de la aridez, con copas abiertas que rara vez superan el umbral satelital del 30%.",
    explicacion: "Nota metodológica: por su clima árido, los bosques nativos de algarrobo dulce en Lavalle, Santa Rosa y La Paz poseen una estructura abierta (<30% de densidad de copa). Los registros corresponden a recambio de cortinas forestales en oasis e incendios en piedemonte.",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico subnacional de Mendoza", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "San Juan": {
    region: "MONTE ÁRIDO DE SIERRAS Y BOLSONES Y PUNA",
    driver: "Geografía hiperárida sin bosques de dosel cerrado (>30%)",
    fraseEditorial: "Territorio desértico donde las formaciones nativas de algarrobo y retamo en Valle Fértil tienen dosel abierto menor al 30% que mide el satélite.",
    explicacion: "San Juan registra 0 hectáreas de pérdida bajo el umbral satelital estándar (>30% de densidad de copa y >5m de altura) porque sus formaciones nativas en Valle Fértil son bosques xerófilos abiertos adaptados a la extrema aridez.",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico subnacional de San Juan", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  },
  "CABA": {
    region: "ECOSISTEMA URBANO METROPOLITANO Y RIBERA PLATENSE",
    driver: "Jurisdicción 100% urbanizada (Reserva Costanera Sur y parques)",
    fraseEditorial: "Ecosistema urbano (20.300 ha totales) que sirve como escala de comparación: cada 26 días Argentina pierde una superficie boscosa equivalente a toda la Capital Federal.",
    explicacion: "La Ciudad Autónoma de Buenos Aires es un distrito íntegramente urbanizado sin explotación forestal; su cobertura arbórea corresponde al arbolado público, Palermo y la Reserva Ecológica Costanera Sur.",
    noticias: [
      { rango: [2001, 2025], titulo: "Tablero estadístico nacional y comparativa jurisdiccional", fuente: "Global Forest Watch", url: "https://www.globalforestwatch.org/dashboards/country/ARG/" }
    ]
  }
};

if (typeof window !== "undefined") {
  window.ETAPAS_HISTORIA_LEY = ETAPAS_HISTORIA_LEY;
  window.HITOS_CRONOLOGICOS = HITOS_CRONOLOGICOS;
  window.FUENTES_DOCUMENTALES = FUENTES_DOCUMENTALES;
  window.CONTEXTO_PROVINCIAS = CONTEXTO_PROVINCIAS;
}
