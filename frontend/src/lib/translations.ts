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
  archive_articles: string; // "{count} articles" — use with replace

  // Edition types
  edition_daily: string;
  edition_weekly: string;
  edition_weekend: string;

  // Index page intro
  intro_daily: string;
  intro_weekly: string;
  intro_weekend: string;

  // Shared
  loading: string;
  error_load_archive: string;
  error_load_digest: string;
  error_retry: string;
  error_connection: string;
  back: string;
  read_original: string;
  previous: string;
  next: string;
  no_articles: string;
  no_summary: string;

  // Day names (for archive display)
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;

  // Month names
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
      "a/d/u is a curated daily digest of the most important stories in architecture, design, and urbanism, available as a web app and on",
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
    archive_empty: "No editions yet.",
    archive_articles: "articles",

    edition_daily: "Daily",
    edition_weekly: "Weekly",
    edition_weekend: "Weekend Catch-Up",

    intro_daily: "Our editorial selection for today.",
    intro_weekly: "Our weekly selection of essential reads.",
    intro_weekend: "Catch up on the week's highlights.",

    loading: "Loading...",
    error_load_archive: "Could not load archive",
    error_load_digest: "Could not load today's digest",
    error_retry: "Try again",
    error_connection: "Please check your connection and try again.",
    back: "Back",
    read_original: "Read original article",
    previous: "Previous",
    next: "Next",
    no_articles: "No articles in this edition.",
    no_summary: "No summary available.",

    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",

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
      "a/d/u es un resumen diario curado de las noticias mas importantes en arquitectura, diseno y urbanismo, disponible como aplicacion web y en",
    about_editorial:
      "Cada dia, nuestro sistema editorial impulsado por IA analiza decenas de publicaciones para ofrecer 7 lecturas esenciales. Priorizamos grandes proyectos de importancia publica de estudios de arquitectura reconocidos.",
    about_sources:
      "Nuestras fuentes incluyen ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review, y muchas otras. Buscamos representar perspectivas globales y voces emergentes junto a publicaciones consolidadas.",
    about_schedule:
      "Las ediciones semanales aparecen cada lunes con una seleccion mas amplia de lecturas largas. Las ediciones de resumen del fin de semana los martes cubren lo que puedas haber perdido.",
    about_install_text:
      "a/d/u tambien vive en una app, ofreciendo acceso rapido y una experiencia nativa.",
    about_contact: "Para sugerencias, correcciones o consultas:",

    archive_title: "Archivo",
    archive_empty: "Aun no hay ediciones.",
    archive_articles: "articulos",

    edition_daily: "Diaria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumen del fin de semana",

    intro_daily: "Nuestra seleccion editorial para hoy.",
    intro_weekly: "Nuestra seleccion semanal de lecturas esenciales.",
    intro_weekend: "Ponte al dia con lo mas destacado de la semana.",

    loading: "Cargando...",
    error_load_archive: "No se pudo cargar el archivo",
    error_load_digest: "No se pudo cargar el resumen de hoy",
    error_retry: "Intentar de nuevo",
    error_connection: "Verifica tu conexion e intenta de nuevo.",
    back: "Volver",
    read_original: "Leer articulo original",
    previous: "Anterior",
    next: "Siguiente",
    no_articles: "No hay articulos en esta edicion.",
    no_summary: "Resumen no disponible.",

    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miercoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sabado",
    sunday: "Domingo",

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
      "a/d/u est un résumé quotidien des actualités les plus importantes en architecture, design et urbanisme, disponible sous forme d’application web et sur Telegram.",
    about_editorial:
      "Chaque jour, notre systeme editorial alimente par l'IA analyse des dizaines de publications pour vous proposer 7 lectures essentielles. Nous privilegions les grands projets d'importance publique des agences d'architecture etablies.",
    about_sources:
      "Nos sources incluent ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review, entre autres. Nous cherchons à représenter des perspectives mondiales et des voix émergentes, aux côtés de publications établies.",
    about_schedule:
      "Les éditions hebdomadaires paraissent chaque lundi et proposent une sélection élargie de lectures longues. Les éditions de rattrapage du week-end, publiées le mardi, couvrent ce que vous auriez pu manquer.",
    about_install_text:
      "a/d/u existe aussi en application, offrant un acces rapide et une experience native.",
    about_contact: "Pour suggestions, corrections ou questions :",

    archive_title: "Archives",
    archive_empty: "Aucune edition pour le moment.",
    archive_articles: "articles",

    edition_daily: "Quotidienne",
    edition_weekly: "Hebdomadaire",
    edition_weekend: "Rattrapage du week-end",

    intro_daily: "Notre selection editoriale du jour.",
    intro_weekly: "Notre selection hebdomadaire de lectures essentielles.",
    intro_weekend: "Rattrapez les temps forts de la semaine.",

    loading: "Chargement...",
    error_load_archive: "Impossible de charger les archives",
    error_load_digest: "Impossible de charger le resume du jour",
    error_retry: "Reessayer",
    error_connection: "Verifiez votre connexion et reessayez.",
    back: "Retour",
    read_original: "Lire l'article original",
    previous: "Precedent",
    next: "Suivant",
    no_articles: "Aucun article dans cette edition.",
    no_summary: "Resume non disponible.",

    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",

    january: "Janvier",
    february: "Fevrier",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Aout",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Decembre",
  },

  "pt-br": {
    about_intro:
      "a/d/u e um resumo diario curado das noticias mais importantes em arquitetura, design e urbanismo, disponivel como aplicativo web e no",
    about_editorial:
      "Todos os dias, nosso sistema editorial com IA analisa dezenas de publicacoes para trazer 7 leituras essenciais. Priorizamos grandes projetos de importancia publica de escritorios de arquitetura consagrados.",
    about_sources:
      "Nossas fontes incluem ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review, e muitas outras. Buscamos representar perspectivas globais e vozes emergentes ao lado de publicacoes consagradas.",
    about_schedule:
      "As edicoes semanais aparecem toda segunda-feira com uma selecao mais ampla de leituras longas. As edicoes de resumo do fim de semana na terca-feira cobrem o que voce pode ter perdido.",
    about_install_text:
      "a/d/u tambem existe como app, oferecendo acesso rapido e uma experiencia nativa.",
    about_contact: "Para sugestoes, correcoes ou duvidas:",

    archive_title: "Arquivo",
    archive_empty: "Nenhuma edicao ainda.",
    archive_articles: "artigos",

    edition_daily: "Diaria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumo do fim de semana",

    intro_daily: "Nossa selecao editorial para hoje.",
    intro_weekly: "Nossa selecao semanal de leituras essenciais.",
    intro_weekend: "Fique por dentro dos destaques da semana.",

    loading: "Carregando...",
    error_load_archive: "Nao foi possivel carregar o arquivo",
    error_load_digest: "Nao foi possivel carregar o resumo de hoje",
    error_retry: "Tentar novamente",
    error_connection: "Verifique sua conexao e tente novamente.",
    back: "Voltar",
    read_original: "Ler artigo original",
    previous: "Anterior",
    next: "Proximo",
    no_articles: "Nenhum artigo nesta edicao.",
    no_summary: "Resumo nao disponivel.",

    monday: "Segunda-feira",
    tuesday: "Terca-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sabado",
    sunday: "Domingo",

    january: "Janeiro",
    february: "Fevereiro",
    march: "Marco",
    april: "Abril",
    may: "Maio",
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
      "-- ежедневный кураторский дайджест самых важных новостей в области архитектуры, дизайна и урбанистики, доступный как веб-приложение и в",
    about_editorial:
      "Каждый день наша редакционная система на базе ИИ анализирует десятки изданий, чтобы предложить вам 7 ключевых материалов. Мы отдаем приоритет крупным общественно значимым проектам от авторитетных архитектурных бюро.",
    about_sources:
      "Наши источники включают ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review и многие другие издания. Мы стремимся представлять глобальные перспективы и новые голоса наряду с авторитетными изданиями.",
    about_schedule:
      "Еженедельные выпуски выходят каждый понедельник с расширенной подборкой материалов. Выпуски выходного дня выходят по вторникам.",
    about_install_text:
      "a/d/u -- это ещё и приложение, обеспечивающее быстрый доступ и нативный опыт.",
    about_contact: "Для предложений, исправлений или вопросов:",

    archive_title: "Архив",
    archive_empty: "Выпусков пока нет.",
    archive_articles: "статей",

    edition_daily: "Ежедневный",
    edition_weekly: "Еженедельный",
    edition_weekend: "Обзор выходных",

    intro_daily: "Наша редакционная подборка на сегодня.",
    intro_weekly: "Наша еженедельная подборка ключевых материалов.",
    intro_weekend: "Обзор главного за неделю.",

    loading: "Загрузка...",
    error_load_archive: "Не удалось загрузить архив",
    error_load_digest: "Не удалось загрузить сегодняшний выпуск",
    error_retry: "Попробовать снова",
    error_connection: "Проверьте подключение и попробуйте снова.",
    back: "Назад",
    read_original: "Читать статью полностью",
    previous: "Предыдущая",
    next: "Следующая",
    no_articles: "В этом выпуске нет статей.",
    no_summary: "Описание недоступно.",

    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",

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
 * Only translates the month name; day number and year stay the same.
 */
export function translateDate(englishDate: string, language: Language): string {
  if (language === "en") return englishDate;

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

  // Replace the English month name with the translated one
  for (const [eng, key] of Object.entries(monthMap)) {
    if (englishDate.includes(eng)) {
      return englishDate.replace(eng, t(key, language));
    }
  }

  return englishDate;
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