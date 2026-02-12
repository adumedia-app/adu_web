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
      "Weekly editions appear each Monday with a broader selection of longer reads. Weekend catch-up editions on Tuesday cover anything you might have missed.",
    about_install_text:
      "a/d/u also lives in an app, providing quick access and a native experience.",
    about_contact: "For suggestions, corrections, or inquiries:",

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
      "es un resumen diario seleccionado de las noticias más importantes sobre arquitectura, diseño y urbanismo, disponible como aplicación web y en",
    about_editorial:
      "Cada día, nuestro sistema editorial basado en inteligencia artificial analiza docenas de publicaciones para ofrecerte siete lecturas imprescindibles. Priorizamos grandes proyectos de importancia pública de estudios de arquitectura reconocidos",
    about_sources:
      "Entre nuestras fuentes se incluyen ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review y muchas otras. Nuestro objetivo es representar perspectivas globales y voces emergentes junto con publicaciones consolidadas",
    about_schedule:
      "Las ediciones semanales aparecen cada lunes con una selección más amplia de lecturas más largas. Las ediciones de fin de semana, que se publican los martes, cubren todo lo que te hayas podido perder",
    about_install_text:
      "a/d/u también está disponible en una aplicación, que proporciona un acceso rápido y una experiencia nativa",
    about_contact: "Para sugerencias, correcciones o consultas:",

    archive_title: "Archivo",
    archive_empty: "Aún no hay ediciones",
    archive_articles: "artículos",
    archive_read_time: "~{time} min",

    edition_daily: "Diaria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumen del fin de semana",

    intro_daily: "Nuestra selección editorial para hoy",
    intro_weekly: "Nuestra selección semanal de lecturas esenciales",
    intro_weekend: "Ponte al día con lo más destacado de la semana",

    back: "Volver",
    today: "Hoy",
    archive: "Archivo",
    about: "Acerca de",
    telegram: "Telegram",
    previous: "Anterior",
    next: "Siguiente",
    dashboard: "Panel",

    read_original: "Leer artículo original",
    install_app: "Instalar aplicación",
    try_again: "Intentar de nuevo",

    loading: "Cargando...",
    error_load_archive: "No se pudo cargar el archivo",
    error_load_digest: "No se pudo cargar el resumen de hoy",
    error_connection: "Verifica tu conexión e intenta de nuevo",
    no_articles: "No hay artículos en esta edición",
    no_summary: "Resumen no disponible",
    page_not_found: "Página no encontrada",
    page_not_found_description: "La página que buscas no existe",
    go_to_today: "Ir al resumen de hoy",

    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
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
      "est un condensé quotidien des articles les plus importants dans les domaines de l'architecture, du design et de l'urbanisme, disponible sous forme d'application web et sur",
    about_editorial:
      "Chaque jour, notre système éditorial alimenté par l'IA passe au crible des dizaines de publications pour vous proposer 7 articles incontournables. Nous privilégions les discours critiques aux annonces de produits, les analyses approfondies aux communiqués de presse",
    about_sources:
      "Nos sources comprennent ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review et bien d'autres. Notre objectif est de représenter les perspectives mondiales et les voix émergentes en complément des publications établies",
    about_schedule:
      "Les éditions hebdomadaires paraissent chaque lundi avec une sélection plus large d'articles plus longs. Les éditions de rattrapage du week-end, publiées le mardi, couvrent tout ce que vous avez pu manquer",
    about_install_text:
      "a/d/u existe également sous forme d'application, offrant un accès rapide et une expérience fluide",
    about_contact: "Pour toute suggestion, correction ou demande de renseignements :",

    archive_title: "Archives",
    archive_empty: "Aucune édition pour le moment",
    archive_articles: "articles",
    archive_read_time: "~{time} min",

    edition_daily: "Quotidienne",
    edition_weekly: "Hebdomadaire",
    edition_weekend: "Rattrapage du week-end",

    intro_daily: "Notre sélection éditoriale du jour",
    intro_weekly: "Notre sélection hebdomadaire de lectures essentielles",
    intro_weekend: "Rattrapez les temps forts de la semaine",

    back: "Retour",
    today: "Aujourd'hui",
    archive: "Archives",
    about: "À propos",
    telegram: "Telegram",
    previous: "Précédent",
    next: "Suivant",
    dashboard: "Tableau de bord",

    read_original: "Lire l'article original",
    install_app: "Installer l'application",
    try_again: "Réessayer",

    loading: "Chargement...",
    error_load_archive: "Impossible de charger les archives",
    error_load_digest: "Impossible de charger le résumé du jour",
    error_connection: "Vérifiez votre connexion et réessayez",
    no_articles: "Aucun article dans cette édition",
    no_summary: "Résumé non disponible",
    page_not_found: "Page non trouvée",
    page_not_found_description: "La page que vous recherchez n'existe pas",
    go_to_today: "Aller au résumé du jour",

    monday: "lundi",
    tuesday: "mardi",
    wednesday: "mercredi",
    thursday: "jeudi",
    friday: "vendredi",
    saturday: "samedi",
    sunday: "dimanche",

    // Genitive case (not used in French)
    january_gen: "janvier",
    february_gen: "février",
    march_gen: "mars",
    april_gen: "avril",
    may_gen: "mai",
    june_gen: "juin",
    july_gen: "juillet",
    august_gen: "août",
    september_gen: "septembre",
    october_gen: "octobre",
    november_gen: "novembre",
    december_gen: "décembre",

    // Nominative case
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre",
  },

  "pt-br": {
    about_intro:
      "é um resumo diário com curadoria das notícias mais importantes sobre arquitetura, design e urbanismo, disponível como aplicativo web e no",
    about_editorial:
      "Todos os dias, nosso sistema editorial alimentado por IA analisa dezenas de publicações para trazer a você 7 leituras essenciais. Priorizamos o discurso crítico em vez de anúncios de produtos, análises longas em vez de comunicados à imprensa",
    about_sources:
      "Nossas fontes incluem ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review e muitas outras. Nosso objetivo é representar perspectivas globais e vozes emergentes, juntamente com publicações estabelecidas",
    about_schedule:
      "As edições semanais são publicadas todas as segundas-feiras, com uma seleção mais ampla de leituras mais longas. As edições de atualização do fim de semana, às terças-feiras, cobrem tudo o que você pode ter perdido",
    about_install_text:
      "a/d/u também está disponível em um aplicativo, proporcionando acesso rápido e uma experiência nativa",
    about_contact: "Para sugestões, correções ou dúvidas:",

    archive_title: "Arquivo",
    archive_empty: "Nenhuma edição ainda",
    archive_articles: "artigos",
    archive_read_time: "~{time} min",

    edition_daily: "Diária",
    edition_weekly: "Semanal",
    edition_weekend: "Resumo do fim de semana",

    intro_daily: "Nossa seleção editorial para hoje",
    intro_weekly: "Nossa seleção semanal de leituras essenciais",
    intro_weekend: "Fique por dentro dos destaques da semana",

    back: "Voltar",
    today: "Hoje",
    archive: "Arquivo",
    about: "Sobre",
    telegram: "Telegram",
    previous: "Anterior",
    next: "Próximo",
    dashboard: "Painel",

    read_original: "Ler artigo original",
    install_app: "Instalar aplicativo",
    try_again: "Tentar novamente",

    loading: "Carregando...",
    error_load_archive: "Não foi possível carregar o arquivo",
    error_load_digest: "Não foi possível carregar o resumo de hoje",
    error_connection: "Verifique sua conexão e tente novamente",
    no_articles: "Nenhum artigo nesta edição",
    no_summary: "Resumo não disponível",
    page_not_found: "Página não encontrada",
    page_not_found_description: "A página que você procura não existe",
    go_to_today: "Ir para o resumo de hoje",

    monday: "segunda-feira",
    tuesday: "terça-feira",
    wednesday: "quarta-feira",
    thursday: "quinta-feira",
    friday: "sexta-feira",
    saturday: "sábado",
    sunday: "domingo",

    // Genitive case (de janeiro, de fevereiro, etc.)
    january_gen: "janeiro",
    february_gen: "fevereiro",
    march_gen: "março",
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
    march: "Março",
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
      "— ежедневный дайджест самых важных новостей в области архитектуры, дизайна и урбанистики, доступный как веб-приложение и в",
    about_editorial:
      "Каждый день наша редакционная система на базе искусственного интеллекта анализирует десятки изданий, чтобы предложить 7 ключевых публикаций. Мы отдаём приоритет крупным общественно значимым проектам и работам авторитетных архитектурных бюро",
    about_sources:
      "Среди наших источников — ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review и многие другие. Мы собираем глобальную повестку, объединяя ведущие профессиональные медиа и нишевые региональные издания",
    about_schedule:
      "Еженедельные дайджесты выходят по понедельникам и подводят итоги недели. Выпуски, посвящённые выходным, публикуются по вторникам и охватывают всё, что вы могли пропустить",
    about_install_text:
      "a/d/u также доступен в формате приложения, обеспечивающего быстрый доступ и удобство использования",
    about_contact: "Для предложений, исправлений и запросов:",

    archive_title: "Архив",
    archive_empty: "Выпусков пока нет",
    archive_articles: "статей",
    archive_read_time: "~{time} мин",

    edition_daily: "Ежедневный",
    edition_weekly: "Еженедельный",
    edition_weekend: "Обзор выходных",

    intro_daily: "Наша редакционная подборка на сегодня",
    intro_weekly: "Наша еженедельная подборка ключевых материалов",
    intro_weekend: "Обзор главного за выходные",

    back: "Назад",
    today: "Сегодня",
    archive: "Архив",
    about: "О проекте",
    telegram: "Telegram",
    previous: "Предыдущая",
    next: "Следующая",
    dashboard: "Панель управления",

    read_original: "Читать статью полностью",
    install_app: "Установить приложение",
    try_again: "Попробовать снова",

    loading: "Загрузка...",
    error_load_archive: "Не удалось загрузить архив",
    error_load_digest: "Не удалось загрузить сегодняшний выпуск",
    error_connection: "Проверьте подключение и попробуйте снова",
    no_articles: "В этом выпуске нет статей",
    no_summary: "Описание недоступно",
    page_not_found: "Страница не найдена",
    page_not_found_description: "Страница, которую вы ищете, не существует",
    go_to_today: "Перейти к сегодняшнему выпуску",

    monday: "понедельник",
    tuesday: "вторник",
    wednesday: "среда",
    thursday: "четверг",
    friday: "пятница",
    saturday: "суббота",
    sunday: "воскресенье",

    // Genitive case (января, февраля, etc. - used in dates)
    january_gen: "января",
    february_gen: "февраля",
    march_gen: "марта",
    april_gen: "апреля",
    may_gen: "мая",
    june_gen: "июня",
    july_gen: "июля",
    august_gen: "августа",
    september_gen: "сентября",
    october_gen: "октября",
    november_gen: "ноября",
    december_gen: "декабря",

    // Nominative case (Январь, Февраль, etc. - used standalone)
    january: "Январь",
    february: "Февраль",
    march: "Март",
    april: "Апрель",
    may: "Май",
    june: "Июнь",
    july: "Июль",
    august: "Август",
    september: "Сентябрь",
    october: "Октябрь",
    november: "Ноябрь",
    december: "Декабрь",
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
 * - Russian: "30 января 2026" (genitive case)
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
      // Russian: "30 января 2026" (genitive case, no preposition)
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
 * - Russian: "Январь 2026"
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