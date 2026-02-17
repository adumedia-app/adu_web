// src/lib/translations.ts
/**
 * Static UI translations for ADUmedia website
 * Covers About page, Archive page, and shared UI elements
 */

import type { Language } from "./cookies";

type TranslationKeys = {
  // About page
  about_intro: string;
  about_editorial: string;
  about_sources: string;
  about_schedule: string;
  about_install_text: string;
  about_contact: string;

  // Privacy page
  privacy_title: string;
  privacy_intro: string;
  privacy_cookie_heading: string;
  privacy_cookie_text: string;
  privacy_analytics_heading: string;
  privacy_analytics_text: string;
  privacy_no_tracking: string;
  privacy_contact: string;
  privacy_updated: string;

  // Archive page
  archive_title: string;
  archive_empty: string;
  archive_articles: string;
  archive_read_time: string; // "~{time} min"

  // Edition types
  edition_daily: string;
  edition_weekly: string;
  edition_weekend: string;

  // Index page intro
  intro_daily: string;
  intro_weekly: string;
  intro_weekend: string;

  // Navigation
  back: string;
  today: string;
  archive: string;
  about: string;
  telegram: string;
  previous: string;
  next: string;
  dashboard: string;

  // Actions
  read_original: string;
  install_app: string;
  try_again: string;

  // Status messages
  loading: string;
  error_load_archive: string;
  error_load_digest: string;
  error_connection: string;
  no_articles: string;
  no_summary: string;
  page_not_found: string;
  page_not_found_description: string;
  go_to_today: string;

  // Day names (for archive display)
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;

  // Month names (genitive case for dates)
  january_gen: string;
  february_gen: string;
  march_gen: string;
  april_gen: string;
  may_gen: string;
  june_gen: string;
  july_gen: string;
  august_gen: string;
  september_gen: string;
  october_gen: string;
  november_gen: string;
  december_gen: string;

  // Month names (nominative case for standalone use)
  january: string;
  february: string;
  march: string;
  april: string;
  may: string;
  june: string;
  july: string;
  august: string;
  september: string;
  october: string;
  november: string;
  december: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    about_intro:
      "is a curated daily digest of the most important stories in architecture, design, and urbanism, available as a web app and on",
    about_editorial:
      "Each day, our AI-powered editorial system scans dozens of publications to bring you 7 essential reads. We prioritize major publicly significant projects from established architectural firms.",
    about_sources:
      "Our sources include ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review, and many others. We aim to represent global perspectives and emerging voices alongside established publications.",
    about_schedule:
      "Daily editions are published every weekday. A Monday catch-up edition highlights key stories from the weekend you may have missed.",
    about_install_text:
      "a/d/u also lives in an app, providing quick access and a native experience.",
    about_contact: "For suggestions, corrections, or inquiries:",

    privacy_title: "Privacy Policy",
    privacy_intro: "ADUmedia (adu.media) is a news curation service. We are committed to keeping things simple and respecting your privacy.",
    privacy_cookie_heading: "Cookies",
    privacy_cookie_text: "We use a single cookie (adu_language) to remember your preferred reading language. It contains no personal information, is not shared with anyone, and expires after one year. You can clear it at any time through your browser settings.",
    privacy_analytics_heading: "Analytics",
    privacy_analytics_text: "We collect anonymous page view statistics to understand which content is most useful. No personal data, IP addresses, or device fingerprints are stored.",
    privacy_no_tracking: "We do not require registration, do not collect personal data, and do not use any third-party advertising or tracking services.",
    privacy_contact: "Questions about privacy?",
    privacy_updated: "Last updated: February 2026",

    archive_title: "Archive",
    archive_empty: "No editions yet",
    archive_articles: "articles",
    archive_read_time: "~{time} min",

    edition_daily: "Daily",
    edition_weekly: "Weekly",
    edition_weekend: "Weekend Catch-Up",

    intro_daily: "Our editorial selection for today",
    intro_weekly: "Our weekly selection of essential reads",
    intro_weekend: "Catch up on the week's highlights",

    back: "Back",
    today: "Today",
    archive: "Archive",
    about: "About",
    telegram: "Telegram",
    previous: "Previous",
    next: "Next",
    dashboard: "Dashboard",

    read_original: "Read original article",
    install_app: "Install App",
    try_again: "Try again",

    loading: "Loading...",
    error_load_archive: "Could not load archive",
    error_load_digest: "Could not load today's digest",
    error_connection: "Please check your connection and try again",
    no_articles: "No articles in this edition",
    no_summary: "No summary available",
    page_not_found: "Page not found",
    page_not_found_description: "The page you're looking for doesn't exist",
    go_to_today: "Go to today's digest",

    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

    // English uses same form for both cases
    january_gen: "January",
    february_gen: "February",
    march_gen: "March",
    april_gen: "April",
    may_gen: "May",
    june_gen: "June",
    july_gen: "July",
    august_gen: "August",
    september_gen: "September",
    october_gen: "October",
    november_gen: "November",
    december_gen: "December",

    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },

  es: {
    about_intro:
      "es un resumen diario seleccionado de las noticias mÃ¡s importantes sobre arquitectura, diseÃ±o y urbanismo, disponible como aplicaciÃ³n web y en",
    about_editorial:
      "Cada dÃ­a, nuestro sistema editorial basado en inteligencia artificial analiza docenas de publicaciones para ofrecerte siete lecturas imprescindibles. Priorizamos grandes proyectos de importancia pÃºblica de estudios de arquitectura reconocidos",
    about_sources:
      "Entre nuestras fuentes se incluyen ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review y muchas otras. Nuestro objetivo es representar perspectivas globales y voces emergentes junto con publicaciones consolidadas",
    about_schedule:
      "Las ediciones diarias se publican todos los días laborables. La edición del lunes recopila las noticias más importantes del fin de semana que quizá te hayas perdido",
    about_install_text:
      "a/d/u tambiÃ©n estÃ¡ disponible en una aplicaciÃ³n, que proporciona un acceso rÃ¡pido y una experiencia nativa",
    about_contact: "Para sugerencias, correcciones o consultas:",

    privacy_title: "PolÃ­tica de privacidad",
    privacy_intro: "ADUmedia (adu.media) es un servicio de noticias de arquitectura. Nos comprometemos a mantener las cosas simples y respetar su privacidad.",
    privacy_cookie_heading: "Cookies",
    privacy_cookie_text: "Usamos una Ãºnica cookie (adu_language) para recordar su idioma de lectura preferido. No contiene informaciÃ³n personal, no se comparte con nadie y caduca despuÃ©s de un aÃ±o. Puede eliminarla en cualquier momento desde la configuraciÃ³n de su navegador.",
    privacy_analytics_heading: "EstadÃ­sticas",
    privacy_analytics_text: "Recopilamos estadÃ­sticas anÃ³nimas de visitas a pÃ¡ginas para entender quÃ© contenido es mÃ¡s Ãºtil. No se almacenan datos personales, direcciones IP ni huellas digitales de dispositivos.",
    privacy_no_tracking: "No requerimos registro, no recopilamos datos personales y no utilizamos servicios de publicidad ni rastreo de terceros.",
    privacy_contact: "Â¿Preguntas sobre privacidad?",
    privacy_updated: "Ãšltima actualizaciÃ³n: febrero de 2026",

    archive_title: "Archivo",
    archive_empty: "AÃºn no hay ediciones",
    archive_articles: "artÃ­culos",
    archive_read_time: "~{time} min",

    edition_daily: "Diaria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumen del fin de semana",

    intro_daily: "Nuestra selecciÃ³n editorial para hoy",
    intro_weekly: "Nuestra selecciÃ³n semanal de lecturas esenciales",
    intro_weekend: "Ponte al dÃ­a con lo mÃ¡s destacado de la semana",

    back: "Volver",
    today: "Hoy",
    archive: "Archivo",
    about: "Acerca de",
    telegram: "Telegram",
    previous: "Anterior",
    next: "Siguiente",
    dashboard: "Panel",

    read_original: "Leer artÃ­culo original",
    install_app: "Instalar aplicaciÃ³n",
    try_again: "Intentar de nuevo",

    loading: "Cargando...",
    error_load_archive: "No se pudo cargar el archivo",
    error_load_digest: "No se pudo cargar el resumen de hoy",
    error_connection: "Verifica tu conexiÃ³n e intenta de nuevo",
    no_articles: "No hay artÃ­culos en esta ediciÃ³n",
    no_summary: "Resumen no disponible",
    page_not_found: "PÃ¡gina no encontrada",
    page_not_found_description: "La pÃ¡gina que buscas no existe",
    go_to_today: "Ir al resumen de hoy",

    monday: "lunes",
    tuesday: "martes",
    wednesday: "miÃ©rcoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sÃ¡bado",
    sunday: "domingo",

    // Genitive case (de enero, de febrero, etc.)
    january_gen: "enero",
    february_gen: "febrero",
    march_gen: "marzo",
    april_gen: "abril",
    may_gen: "mayo",
    june_gen: "junio",
    july_gen: "julio",
    august_gen: "agosto",
    september_gen: "septiembre",
    october_gen: "octubre",
    november_gen: "noviembre",
    december_gen: "diciembre",

    // Nominative case
    january: "Enero",
    february: "Febrero",
    march: "Marzo",
    april: "Abril",
    may: "Mayo",
    june: "Junio",
    july: "Julio",
    august: "Agosto",
    september: "Septiembre",
    october: "Octubre",
    november: "Noviembre",
    december: "Diciembre",
  },

  fr: {
    about_intro:
      "est un condensÃ© quotidien des articles les plus importants dans les domaines de l'architecture, du design et de l'urbanisme, disponible sous forme d'application web et sur",
    about_editorial:
      "Chaque jour, notre systÃ¨me Ã©ditorial alimentÃ© par l'IA passe au crible des dizaines de publications pour vous proposer 7 articles incontournables. Nous privilÃ©gions les discours critiques aux annonces de produits, les analyses approfondies aux communiquÃ©s de presse",
    about_sources:
      "Nos sources comprennent ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review et bien d'autres. Notre objectif est de reprÃ©senter les perspectives mondiales et les voix Ã©mergentes en complÃ©ment des publications Ã©tablies",
    about_schedule:
      "Les éditions quotidiennes sont publiées tous les jours de la semaine. Une édition spéciale du lundi reprend les principaux articles du week-end que vous avez peut-être manqués",
    about_install_text:
      "a/d/u existe Ã©galement sous forme d'application, offrant un accÃ¨s rapide et une expÃ©rience fluide",
    about_contact: "Pour toute suggestion, correction ou demande de renseignements :",

    privacy_title: "Politique de confidentialitÃ©",
    privacy_intro: "ADUmedia (adu.media) est un service d'actualitÃ©s en architecture. Nous nous engageons Ã  faire simple et Ã  respecter votre vie privÃ©e.",
    privacy_cookie_heading: "Cookies",
    privacy_cookie_text: "Nous utilisons un seul cookie (adu_language) pour retenir votre langue de lecture prÃ©fÃ©rÃ©e. Il ne contient aucune donnÃ©e personnelle, n'est partagÃ© avec personne et expire aprÃ¨s un an. Vous pouvez le supprimer Ã  tout moment via les paramÃ¨tres de votre navigateur.",
    privacy_analytics_heading: "Statistiques",
    privacy_analytics_text: "Nous collectons des statistiques anonymes de pages vues pour comprendre quel contenu est le plus utile. Aucune donnÃ©e personnelle, adresse IP ou empreinte numÃ©rique n'est stockÃ©e.",
    privacy_no_tracking: "Nous ne demandons pas d'inscription, ne collectons pas de donnÃ©es personnelles et n'utilisons aucun service de publicitÃ© ou de suivi tiers.",
    privacy_contact: "Questions sur la confidentialitÃ© ?",
    privacy_updated: "DerniÃ¨re mise Ã  jour : fÃ©vrier 2026",

    archive_title: "Archives",
    archive_empty: "Aucune Ã©dition pour le moment",
    archive_articles: "articles",
    archive_read_time: "~{time} min",

    edition_daily: "Quotidienne",
    edition_weekly: "Hebdomadaire",
    edition_weekend: "Rattrapage du week-end",

    intro_daily: "Notre sÃ©lection Ã©ditoriale du jour",
    intro_weekly: "Notre sÃ©lection hebdomadaire de lectures essentielles",
    intro_weekend: "Rattrapez les temps forts de la semaine",

    back: "Retour",
    today: "Aujourd'hui",
    archive: "Archives",
    about: "Ã€ propos",
    telegram: "Telegram",
    previous: "PrÃ©cÃ©dent",
    next: "Suivant",
    dashboard: "Tableau de bord",

    read_original: "Lire l'article original",
    install_app: "Installer l'application",
    try_again: "RÃ©essayer",

    loading: "Chargement...",
    error_load_archive: "Impossible de charger les archives",
    error_load_digest: "Impossible de charger le rÃ©sumÃ© du jour",
    error_connection: "VÃ©rifiez votre connexion et rÃ©essayez",
    no_articles: "Aucun article dans cette Ã©dition",
    no_summary: "RÃ©sumÃ© non disponible",
    page_not_found: "Page non trouvÃ©e",
    page_not_found_description: "La page que vous recherchez n'existe pas",
    go_to_today: "Aller au rÃ©sumÃ© du jour",

    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    saturday: "samedi",
    sunday: "dimanche",

    // Genitive case (not used in French)
    january_gen: "janvier",
    february_gen: "fÃ©vrier",
    march_gen: "mars",
    april_gen: "avril",
    may_gen: "mai",
    june_gen: "juin",
    july_gen: "juillet",
    august_gen: "aoÃ»t",
    september_gen: "septembre",
    october_gen: "octobre",
    november_gen: "novembre",
    december_gen: "dÃ©cembre",

    // Nominative case
    january: "Janvier",
    february: "FÃ©vrier",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "AoÃ»t",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "DÃ©cembre",
  },

  "pt-br": {
    about_intro:
      "Ã© um resumo diÃ¡rio com curadoria das notÃ­cias mais importantes sobre arquitetura, design e urbanismo, disponÃ­vel como aplicativo web e no",
    about_editorial:
      "Todos os dias, nosso sistema editorial alimentado por IA analisa dezenas de publicaÃ§Ãµes para trazer a vocÃª 7 leituras essenciais. Priorizamos o discurso crÃ­tico em vez de anÃºncios de produtos, anÃ¡lises longas em vez de comunicados Ã  imprensa",
    about_sources:
      "Nossas fontes incluem ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review e muitas outras. Nosso objetivo Ã© representar perspectivas globais e vozes emergentes, juntamente com publicaÃ§Ãµes estabelecidas",
    about_schedule:
      "As edições diárias são publicadas todos os dias úteis. A edição de segunda-feira destaca as principais notícias do fim de semana que você pode ter perdido",
    about_install_text:
      "a/d/u tambÃ©m estÃ¡ disponÃ­vel em um aplicativo, proporcionando acesso rÃ¡pido e uma experiÃªncia nativa",
    about_contact: "Para sugestÃµes, correÃ§Ãµes ou dÃºvidas:",

    privacy_title: "PolÃ­tica de privacidade",
    privacy_intro: "ADUmedia (adu.media) Ã© um serviÃ§o de notÃ­cias de arquitetura. Estamos comprometidos em manter as coisas simples e respeitar sua privacidade.",
    privacy_cookie_heading: "Cookies",
    privacy_cookie_text: "Usamos um Ãºnico cookie (adu_language) para lembrar seu idioma de leitura preferido. Ele nÃ£o contÃ©m informaÃ§Ãµes pessoais, nÃ£o Ã© compartilhado com ninguÃ©m e expira apÃ³s um ano. VocÃª pode removÃª-lo a qualquer momento nas configuraÃ§Ãµes do seu navegador.",
    privacy_analytics_heading: "EstatÃ­sticas",
    privacy_analytics_text: "Coletamos estatÃ­sticas anÃ´nimas de visualizaÃ§Ãµes de pÃ¡ginas para entender qual conteÃºdo Ã© mais Ãºtil. Nenhum dado pessoal, endereÃ§o IP ou impressÃ£o digital de dispositivo Ã© armazenado.",
    privacy_no_tracking: "NÃ£o exigimos cadastro, nÃ£o coletamos dados pessoais e nÃ£o utilizamos serviÃ§os de publicidade ou rastreamento de terceiros.",
    privacy_contact: "DÃºvidas sobre privacidade?",
    privacy_updated: "Ãšltima atualizaÃ§Ã£o: fevereiro de 2026",

    archive_title: "Arquivo",
    archive_empty: "Nenhuma ediÃ§Ã£o ainda",
    archive_articles: "artigos",
    archive_read_time: "~{time} min",

    edition_daily: "DiÃ¡ria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumo do fim de semana",

    intro_daily: "Nossa seleÃ§Ã£o editorial para hoje",
    intro_weekly: "Nossa seleÃ§Ã£o semanal de leituras essenciais",
    intro_weekend: "Fique por dentro dos destaques da semana",

    back: "Voltar",
    today: "Hoje",
    archive: "Arquivo",
    about: "Sobre",
    telegram: "Telegram",
    previous: "Anterior",
    next: "PrÃ³ximo",
    dashboard: "Painel",

    read_original: "Ler artigo original",
    install_app: "Instalar aplicativo",
    try_again: "Tentar novamente",

    loading: "Carregando...",
    error_load_archive: "NÃ£o foi possÃ­vel carregar o arquivo",
    error_load_digest: "NÃ£o foi possÃ­vel carregar o resumo de hoje",
    error_connection: "Verifique sua conexÃ£o e tente novamente",
    no_articles: "Nenhum artigo nesta ediÃ§Ã£o",
    no_summary: "Resumo nÃ£o disponÃ­vel",
    page_not_found: "PÃ¡gina nÃ£o encontrada",
    page_not_found_description: "A pÃ¡gina que vocÃª procura nÃ£o existe",
    go_to_today: "Ir para o resumo de hoje",

    monday: "segunda-feira",
    tuesday: "terÃ§a-feira",
    wednesday: "quarta-feira",
    thursday: "quinta-feira",
    friday: "sexta-feira",
    saturday: "sÃ¡bado",
    sunday: "domingo",

    // Genitive case (de janeiro, de fevereiro, etc.)
    january_gen: "janeiro",
    february_gen: "fevereiro",
    march_gen: "marÃ§o",
    april_gen: "abril",
    may_gen: "maio",
    june_gen: "junho",
    july_gen: "julho",
    august_gen: "agosto",
    september_gen: "setembro",
    october_gen: "outubro",
    november_gen: "novembro",
    december_gen: "dezembro",

    // Nominative case
    january: "Janeiro",
    february: "Fevereiro",
    march: "MarÃ§o",
    april: "Abril",
    may: "Mayo",
    june: "Junho",
    july: "Julho",
    august: "Agosto",
    september: "Setembro",
    october: "Outubro",
    november: "Novembro",
    december: "Dezembro",
  },

  ru: {
    about_intro:
      "â€” ÐµÐ¶ÐµÐ´Ð½ÐµÐ²Ð½Ñ‹Ð¹ Ð´Ð°Ð¹Ð´Ð¶ÐµÑÑ‚ ÑÐ°Ð¼Ñ‹Ñ… Ð²Ð°Ð¶Ð½Ñ‹Ñ… Ð½Ð¾Ð²Ð¾ÑÑ‚ÐµÐ¹ Ð² Ð¾Ð±Ð»Ð°ÑÑ‚Ð¸ Ð°Ñ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚ÑƒÑ€Ñ‹, Ð´Ð¸Ð·Ð°Ð¹Ð½Ð° Ð¸ ÑƒÑ€Ð±Ð°Ð½Ð¸ÑÑ‚Ð¸ÐºÐ¸, Ð´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ñ‹Ð¹ ÐºÐ°Ðº Ð²ÐµÐ±-Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ Ð¸ Ð²",
    about_editorial:
      "ÐšÐ°Ð¶Ð´Ñ‹Ð¹ Ð´ÐµÐ½ÑŒ Ð½Ð°ÑˆÐ° Ñ€ÐµÐ´Ð°ÐºÑ†Ð¸Ð¾Ð½Ð½Ð°Ñ ÑÐ¸ÑÑ‚ÐµÐ¼Ð° Ð½Ð° Ð±Ð°Ð·Ðµ Ð¸ÑÐºÑƒÑÑÑ‚Ð²ÐµÐ½Ð½Ð¾Ð³Ð¾ Ð¸Ð½Ñ‚ÐµÐ»Ð»ÐµÐºÑ‚Ð° Ð°Ð½Ð°Ð»Ð¸Ð·Ð¸Ñ€ÑƒÐµÑ‚ Ð´ÐµÑÑÑ‚ÐºÐ¸ Ð¸Ð·Ð´Ð°Ð½Ð¸Ð¹, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶Ð¸Ñ‚ÑŒ 7 ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ñ… Ð¿ÑƒÐ±Ð»Ð¸ÐºÐ°Ñ†Ð¸Ð¹. ÐœÑ‹ Ð¾Ñ‚Ð´Ð°Ñ‘Ð¼ Ð¿Ñ€Ð¸Ð¾Ñ€Ð¸Ñ‚ÐµÑ‚ ÐºÑ€ÑƒÐ¿Ð½Ñ‹Ð¼ Ð¾Ð±Ñ‰ÐµÑÑ‚Ð²ÐµÐ½Ð½Ð¾ Ð·Ð½Ð°Ñ‡Ð¸Ð¼Ñ‹Ð¼ Ð¿Ñ€Ð¾ÐµÐºÑ‚Ð°Ð¼ Ð¸ Ñ€Ð°Ð±Ð¾Ñ‚Ð°Ð¼ Ð°Ð²Ñ‚Ð¾Ñ€Ð¸Ñ‚ÐµÑ‚Ð½Ñ‹Ñ… Ð°Ñ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚ÑƒÑ€Ð½Ñ‹Ñ… Ð±ÑŽÑ€Ð¾",
    about_sources:
      "Ð¡Ñ€ÐµÐ´Ð¸ Ð½Ð°ÑˆÐ¸Ñ… Ð¸ÑÑ‚Ð¾Ñ‡Ð½Ð¸ÐºÐ¾Ð² â€” ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review Ð¸ Ð¼Ð½Ð¾Ð³Ð¸Ðµ Ð´Ñ€ÑƒÐ³Ð¸Ðµ. ÐœÑ‹ ÑÐ¾Ð±Ð¸Ñ€Ð°ÐµÐ¼ Ð³Ð»Ð¾Ð±Ð°Ð»ÑŒÐ½ÑƒÑŽ Ð¿Ð¾Ð²ÐµÑÑ‚ÐºÑƒ, Ð¾Ð±ÑŠÐµÐ´Ð¸Ð½ÑÑ Ð²ÐµÐ´ÑƒÑ‰Ð¸Ðµ Ð¿Ñ€Ð¾Ñ„ÐµÑÑÐ¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð¼ÐµÐ´Ð¸Ð° Ð¸ Ð½Ð¸ÑˆÐµÐ²Ñ‹Ðµ Ñ€ÐµÐ³Ð¸Ð¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð¸Ð·Ð´Ð°Ð½Ð¸Ñ",
    about_schedule:
      "Ежедневные выпуски публикуются каждый будний день. По понедельникам выходит подборка ключевых событий выходных, которые вы могли пропустить",
    about_install_text:
      "a/d/u Ñ‚Ð°ÐºÐ¶Ðµ Ð´Ð¾ÑÑ‚ÑƒÐ¿ÐµÐ½ Ð² Ñ„Ð¾Ñ€Ð¼Ð°Ñ‚Ðµ Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ñ, Ð¾Ð±ÐµÑÐ¿ÐµÑ‡Ð¸Ð²Ð°ÑŽÑ‰ÐµÐ³Ð¾ Ð±Ñ‹ÑÑ‚Ñ€Ñ‹Ð¹ Ð´Ð¾ÑÑ‚ÑƒÐ¿ Ð¸ ÑƒÐ´Ð¾Ð±ÑÑ‚Ð²Ð¾ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·Ð¾Ð²Ð°Ð½Ð¸Ñ",
    about_contact: "Ð”Ð»Ñ Ð¿Ñ€ÐµÐ´Ð»Ð¾Ð¶ÐµÐ½Ð¸Ð¹, Ð¸ÑÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ð¹ Ð¸ Ð·Ð°Ð¿Ñ€Ð¾ÑÐ¾Ð²:",

    privacy_title: "ÐŸÐ¾Ð»Ð¸Ñ‚Ð¸ÐºÐ° ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸",
    privacy_intro: "ADUmedia (adu.media) -- Ð½Ð¾Ð²Ð¾ÑÑ‚Ð½Ð¾Ð¹ ÑÐµÑ€Ð²Ð¸Ñ Ð¾Ð± Ð°Ñ€Ñ…Ð¸Ñ‚ÐµÐºÑ‚ÑƒÑ€Ðµ. ÐœÑ‹ ÑÑ‚Ð°Ñ€Ð°ÐµÐ¼ÑÑ Ð±Ñ‹Ñ‚ÑŒ Ð¼Ð°ÐºÑÐ¸Ð¼Ð°Ð»ÑŒÐ½Ð¾ Ð¿Ñ€Ð¾ÑÑ‚Ñ‹Ð¼Ð¸ Ð¸ ÑƒÐ²Ð°Ð¶Ð°Ñ‚ÑŒ Ð²Ð°ÑˆÑƒ Ð¿Ñ€Ð¸Ð²Ð°Ñ‚Ð½Ð¾ÑÑ‚ÑŒ.",
    privacy_cookie_heading: "Ð¤Ð°Ð¹Ð»Ñ‹ cookie",
    privacy_cookie_text: "ÐœÑ‹ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼ Ð¾Ð´Ð¸Ð½ cookie-Ñ„Ð°Ð¹Ð» (adu_language) Ð´Ð»Ñ ÑÐ¾Ñ…Ñ€Ð°Ð½ÐµÐ½Ð¸Ñ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð²Ð°Ð¼Ð¸ ÑÐ·Ñ‹ÐºÐ° Ñ‡Ñ‚ÐµÐ½Ð¸Ñ. ÐžÐ½ Ð½Ðµ ÑÐ¾Ð´ÐµÑ€Ð¶Ð¸Ñ‚ Ð»Ð¸Ñ‡Ð½Ñ‹Ñ… Ð´Ð°Ð½Ð½Ñ‹Ñ…, Ð½Ðµ Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÑ‚ÑÑ Ñ‚Ñ€ÐµÑ‚ÑŒÐ¸Ð¼ Ð»Ð¸Ñ†Ð°Ð¼ Ð¸ Ð´ÐµÐ¹ÑÑ‚Ð²ÑƒÐµÑ‚ Ð¾Ð´Ð¸Ð½ Ð³Ð¾Ð´. Ð’Ñ‹ Ð¼Ð¾Ð¶ÐµÑ‚Ðµ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ ÐµÐ³Ð¾ Ð² Ð½Ð°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ°Ñ… Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð°.",
    privacy_analytics_heading: "ÐÐ½Ð°Ð»Ð¸Ñ‚Ð¸ÐºÐ°",
    privacy_analytics_text: "ÐœÑ‹ ÑÐ¾Ð±Ð¸Ñ€Ð°ÐµÐ¼ Ð°Ð½Ð¾Ð½Ð¸Ð¼Ð½ÑƒÑŽ ÑÑ‚Ð°Ñ‚Ð¸ÑÑ‚Ð¸ÐºÑƒ Ð¿Ñ€Ð¾ÑÐ¼Ð¾Ñ‚Ñ€Ð¾Ð² ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ð¾Ð½Ð¸Ð¼Ð°Ñ‚ÑŒ, ÐºÐ°ÐºÐ¾Ð¹ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚ Ð½Ð°Ð¸Ð±Ð¾Ð»ÐµÐµ Ð¿Ð¾Ð»ÐµÐ·ÐµÐ½. ÐŸÐµÑ€ÑÐ¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ, IP-Ð°Ð´Ñ€ÐµÑÐ° Ð¸ Ñ†Ð¸Ñ„Ñ€Ð¾Ð²Ñ‹Ðµ Ð¾Ñ‚Ð¿ÐµÑ‡Ð°Ñ‚ÐºÐ¸ ÑƒÑÑ‚Ñ€Ð¾Ð¹ÑÑ‚Ð² Ð½Ðµ ÑÐ¾Ñ…Ñ€Ð°Ð½ÑÑŽÑ‚ÑÑ.",
    privacy_no_tracking: "ÐœÑ‹ Ð½Ðµ Ñ‚Ñ€ÐµÐ±ÑƒÐµÐ¼ Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð°Ñ†Ð¸Ð¸, Ð½Ðµ ÑÐ¾Ð±Ð¸Ñ€Ð°ÐµÐ¼ Ð¿ÐµÑ€ÑÐ¾Ð½Ð°Ð»ÑŒÐ½Ñ‹Ðµ Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¸ Ð½Ðµ Ð¸ÑÐ¿Ð¾Ð»ÑŒÐ·ÑƒÐµÐ¼ ÑÑ‚Ð¾Ñ€Ð¾Ð½Ð½Ð¸Ðµ Ñ€ÐµÐºÐ»Ð°Ð¼Ð½Ñ‹Ðµ Ð¸Ð»Ð¸ Ð¾Ñ‚ÑÐ»ÐµÐ¶Ð¸Ð²Ð°ÑŽÑ‰Ð¸Ðµ ÑÐµÑ€Ð²Ð¸ÑÑ‹.",
    privacy_contact: "Ð’Ð¾Ð¿Ñ€Ð¾ÑÑ‹ Ð¾ ÐºÐ¾Ð½Ñ„Ð¸Ð´ÐµÐ½Ñ†Ð¸Ð°Ð»ÑŒÐ½Ð¾ÑÑ‚Ð¸?",
    privacy_updated: "ÐŸÐ¾ÑÐ»ÐµÐ´Ð½ÐµÐµ Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ: Ñ„ÐµÐ²Ñ€Ð°Ð»ÑŒ 2026",

    archive_title: "ÐÑ€Ñ…Ð¸Ð²",
    archive_empty: "Ð’Ñ‹Ð¿ÑƒÑÐºÐ¾Ð² Ð¿Ð¾ÐºÐ° Ð½ÐµÑ‚",
    archive_articles: "ÑÑ‚Ð°Ñ‚ÐµÐ¹",
    archive_read_time: "~{time} Ð¼Ð¸Ð½",

    edition_daily: "Ð•Ð¶ÐµÐ´Ð½ÐµÐ²Ð½Ñ‹Ð¹",
    edition_weekly: "Ð•Ð¶ÐµÐ½ÐµÐ´ÐµÐ»ÑŒÐ½Ñ‹Ð¹",
    edition_weekend: "ÐžÐ±Ð·Ð¾Ñ€ Ð²Ñ‹Ñ…Ð¾Ð´Ð½Ñ‹Ñ…",

    intro_daily: "ÐÐ°ÑˆÐ° Ñ€ÐµÐ´Ð°ÐºÑ†Ð¸Ð¾Ð½Ð½Ð°Ñ Ð¿Ð¾Ð´Ð±Ð¾Ñ€ÐºÐ° Ð½Ð° ÑÐµÐ³Ð¾Ð´Ð½Ñ",
    intro_weekly: "ÐÐ°ÑˆÐ° ÐµÐ¶ÐµÐ½ÐµÐ´ÐµÐ»ÑŒÐ½Ð°Ñ Ð¿Ð¾Ð´Ð±Ð¾Ñ€ÐºÐ° ÐºÐ»ÑŽÑ‡ÐµÐ²Ñ‹Ñ… Ð¼Ð°Ñ‚ÐµÑ€Ð¸Ð°Ð»Ð¾Ð²",
    intro_weekend: "ÐžÐ±Ð·Ð¾Ñ€ Ð³Ð»Ð°Ð²Ð½Ð¾Ð³Ð¾ Ð·Ð° Ð²Ñ‹Ñ…Ð¾Ð´Ð½Ñ‹Ðµ",

    back: "ÐÐ°Ð·Ð°Ð´",
    today: "Ð¡ÐµÐ³Ð¾Ð´Ð½Ñ",
    archive: "ÐÑ€Ñ…Ð¸Ð²",
    about: "Ðž Ð¿Ñ€Ð¾ÐµÐºÑ‚Ðµ",
    telegram: "Telegram",
    previous: "ÐŸÑ€ÐµÐ´Ñ‹Ð´ÑƒÑ‰Ð°Ñ",
    next: "Ð¡Ð»ÐµÐ´ÑƒÑŽÑ‰Ð°Ñ",
    dashboard: "ÐŸÐ°Ð½ÐµÐ»ÑŒ ÑƒÐ¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ",

    read_original: "Ð§Ð¸Ñ‚Ð°Ñ‚ÑŒ ÑÑ‚Ð°Ñ‚ÑŒÑŽ Ð¿Ð¾Ð»Ð½Ð¾ÑÑ‚ÑŒÑŽ",
    install_app: "Ð£ÑÑ‚Ð°Ð½Ð¾Ð²Ð¸Ñ‚ÑŒ Ð¿Ñ€Ð¸Ð»Ð¾Ð¶ÐµÐ½Ð¸Ðµ",
    try_again: "ÐŸÐ¾Ð¿Ñ€Ð¾Ð±Ð¾Ð²Ð°Ñ‚ÑŒ ÑÐ½Ð¾Ð²Ð°",

    loading: "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°...",
    error_load_archive: "ÐÐµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ Ð°Ñ€Ñ…Ð¸Ð²",
    error_load_digest: "ÐÐµ ÑƒÐ´Ð°Ð»Ð¾ÑÑŒ Ð·Ð°Ð³Ñ€ÑƒÐ·Ð¸Ñ‚ÑŒ ÑÐµÐ³Ð¾Ð´Ð½ÑÑˆÐ½Ð¸Ð¹ Ð²Ñ‹Ð¿ÑƒÑÐº",
    error_connection: "ÐŸÑ€Ð¾Ð²ÐµÑ€ÑŒÑ‚Ðµ Ð¿Ð¾Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¸ Ð¿Ð¾Ð¿Ñ€Ð¾Ð±ÑƒÐ¹Ñ‚Ðµ ÑÐ½Ð¾Ð²Ð°",
    no_articles: "Ð’ ÑÑ‚Ð¾Ð¼ Ð²Ñ‹Ð¿ÑƒÑÐºÐµ Ð½ÐµÑ‚ ÑÑ‚Ð°Ñ‚ÐµÐ¹",
    no_summary: "ÐžÐ¿Ð¸ÑÐ°Ð½Ð¸Ðµ Ð½ÐµÐ´Ð¾ÑÑ‚ÑƒÐ¿Ð½Ð¾",
    page_not_found: "Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ð° Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð°",
    page_not_found_description: "Ð¡Ñ‚Ñ€Ð°Ð½Ð¸Ñ†Ð°, ÐºÐ¾Ñ‚Ð¾Ñ€ÑƒÑŽ Ð²Ñ‹ Ð¸Ñ‰ÐµÑ‚Ðµ, Ð½Ðµ ÑÑƒÑ‰ÐµÑÑ‚Ð²ÑƒÐµÑ‚",
    go_to_today: "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº ÑÐµÐ³Ð¾Ð´Ð½ÑÑˆÐ½ÐµÐ¼Ñƒ Ð²Ñ‹Ð¿ÑƒÑÐºÑƒ",

    monday: "Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº",
    tuesday: "Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº",
    wednesday: "ÑÑ€ÐµÐ´Ð°",
    thursday: "Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³",
    friday: "Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°",
    saturday: "ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°",
    sunday: "Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ",

    // Genitive case (ÑÐ½Ð²Ð°Ñ€Ñ, Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ, etc. - used in dates)
    january_gen: "ÑÐ½Ð²Ð°Ñ€Ñ",
    february_gen: "Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ",
    march_gen: "Ð¼Ð°Ñ€Ñ‚Ð°",
    april_gen: "Ð°Ð¿Ñ€ÐµÐ»Ñ",
    may_gen: "Ð¼Ð°Ñ",
    june_gen: "Ð¸ÑŽÐ½Ñ",
    july_gen: "Ð¸ÑŽÐ»Ñ",
    august_gen: "Ð°Ð²Ð³ÑƒÑÑ‚Ð°",
    september_gen: "ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ",
    october_gen: "Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ",
    november_gen: "Ð½Ð¾ÑÐ±Ñ€Ñ",
    december_gen: "Ð´ÐµÐºÐ°Ð±Ñ€Ñ",

    // Nominative case (Ð¯Ð½Ð²Ð°Ñ€ÑŒ, Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ, etc. - used standalone)
    january: "Ð¯Ð½Ð²Ð°Ñ€ÑŒ",
    february: "Ð¤ÐµÐ²Ñ€Ð°Ð»ÑŒ",
    march: "ÐœÐ°Ñ€Ñ‚",
    april: "ÐÐ¿Ñ€ÐµÐ»ÑŒ",
    may: "ÐœÐ°Ð¹",
    june: "Ð˜ÑŽÐ½ÑŒ",
    july: "Ð˜ÑŽÐ»ÑŒ",
    august: "ÐÐ²Ð³ÑƒÑÑ‚",
    september: "Ð¡ÐµÐ½Ñ‚ÑÐ±Ñ€ÑŒ",
    october: "ÐžÐºÑ‚ÑÐ±Ñ€ÑŒ",
    november: "ÐÐ¾ÑÐ±Ñ€ÑŒ",
    december: "Ð”ÐµÐºÐ°Ð±Ñ€ÑŒ",
  },
};

/**
 * Get a translated string by key for the current language.
 */
export function t(key: keyof TranslationKeys, language: Language): string {
  return translations[language]?.[key] || translations.en[key] || key;
}

/**
 * Translate a day name from English to the current language.
 * Input: "Monday", "Tuesday", etc. (as returned from the API)
 * Output: Lowercase day name in target language
 */
export function translateDay(englishDay: string, language: Language): string {
  if (language === "en") return englishDay;

  const dayMap: Record<string, keyof TranslationKeys> = {
    Monday: "monday",
    Tuesday: "tuesday",
    Wednesday: "wednesday",
    Thursday: "thursday",
    Friday: "friday",
    Saturday: "saturday",
    Sunday: "sunday",
  };

  const key = dayMap[englishDay];
  return key ? t(key, language) : englishDay;
}

/**
 * Translate a date string like "30 January 2026" to the current language.
 * Handles proper grammatical cases for each language.
 * 
 * Examples:
 * - English: "30 January 2026" (unchanged)
 * - Spanish: "30 de enero de 2026" (genitive with "de")
 * - French: "30 janvier 2026" (lowercase month)
 * - Portuguese: "30 de janeiro de 2026" (genitive with "de")
 * - Russian: "30 ÑÐ½Ð²Ð°Ñ€Ñ 2026" (genitive case)
 */
export function translateDate(englishDate: string, language: Language): string {
  if (language === "en") return englishDate;

  const monthMap: Record<string, keyof TranslationKeys> = {
    January: "january_gen",
    February: "february_gen",
    March: "march_gen",
    April: "april_gen",
    May: "may_gen",
    June: "june_gen",
    July: "july_gen",
    August: "august_gen",
    September: "september_gen",
    October: "october_gen",
    November: "november_gen",
    December: "december_gen",
  };

  // Parse the date: "30 January 2026"
  const parts = englishDate.split(" ");
  if (parts.length !== 3) return englishDate;

  const [day, monthEn, year] = parts;
  const monthKey = monthMap[monthEn];
  if (!monthKey) return englishDate;

  const monthTranslated = t(monthKey, language);

  // Format according to language conventions
  switch (language) {
    case "es":
    case "pt-br":
      // Spanish and Portuguese use "de" preposition: "30 de enero de 2026"
      return `${day} de ${monthTranslated} de ${year}`;
    case "fr":
      // French: "30 janvier 2026" (lowercase month, no preposition)
      return `${day} ${monthTranslated} ${year}`;
    case "ru":
      // Russian: "30 ÑÐ½Ð²Ð°Ñ€Ñ 2026" (genitive case, no preposition)
      return `${day} ${monthTranslated} ${year}`;
    default:
      return englishDate;
  }
}

/**
 * Translate a month-year string like "January 2026" to the current language.
 * Used in Archive page grouping.
 * 
 * Examples:
 * - English: "January 2026"
 * - Spanish: "Enero 2026"
 * - Russian: "Ð¯Ð½Ð²Ð°Ñ€ÑŒ 2026"
 */
export function translateMonthYear(englishMonthYear: string, language: Language): string {
  if (language === "en") return englishMonthYear;

  const monthMap: Record<string, keyof TranslationKeys> = {
    January: "january",
    February: "february",
    March: "march",
    April: "april",
    May: "may",
    June: "june",
    July: "july",
    August: "august",
    September: "september",
    October: "october",
    November: "november",
    December: "december",
  };

  // Parse: "January 2026"
  const parts = englishMonthYear.split(" ");
  if (parts.length !== 2) return englishMonthYear;

  const [monthEn, year] = parts;
  const monthKey = monthMap[monthEn];
  if (!monthKey) return englishMonthYear;

  const monthTranslated = t(monthKey, language);
  return `${monthTranslated} ${year}`;
}

/**
 * Get translated edition type label.
 */
export function getTranslatedEditionTypeLabel(
  type: "daily" | "weekend" | "weekly",
  language: Language
): string {
  switch (type) {
    case "weekly":
      return t("edition_weekly", language);
    case "weekend":
      return t("edition_weekend", language);
    case "daily":
    default:
      return t("edition_daily", language);
  }
}

export type { TranslationKeys };
export default translations;