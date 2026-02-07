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
      "is a curated daily digest of the most important stories in architecture, design, and urbanism, available as a web app and on",
    about_editorial:
      "Each day, our AI-powered editorial system scans dozens of publications to bring you 7 essential reads. We prioritize major publicly significant projects from established architectural firms.,
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
      "es un resumen diario seleccionado de las noticias m\u00e1s importantes sobre arquitectura, dise\u00f1o y urbanismo, disponible como aplicaci\u00f3n web y en",
    about_editorial:
      "Cada día, nuestro sistema editorial basado en inteligencia artificial analiza docenas de publicaciones para ofrecerte siete lecturas imprescindibles. Priorizamos grandes proyectos de importancia pública de estudios de arquitectura reconocidos.",
    about_sources:
      "Entre nuestras fuentes se incluyen ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review y muchas otras. Nuestro objetivo es representar perspectivas globales y voces emergentes junto con publicaciones consolidadas.",
    about_schedule:
      "Las ediciones semanales aparecen cada lunes con una selecci\u00f3n m\u00e1s amplia de lecturas m\u00e1s largas. Las ediciones de fin de semana, que se publican los martes, cubren todo lo que te hayas podido perder.",
    about_install_text:
      "a/d/u tambi\u00e9n est\u00e1 disponible en una aplicaci\u00f3n, que proporciona un acceso r\u00e1pido y una experiencia nativa.",
    about_contact: "Para sugerencias, correcciones o consultas:",

    archive_title: "Archivo",
    archive_empty: "A\u00fan no hay ediciones.",
    archive_articles: "art\u00edculos",

    edition_daily: "Diaria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumen del fin de semana",

    intro_daily: "Nuestra selecci\u00f3n editorial para hoy.",
    intro_weekly: "Nuestra selecci\u00f3n semanal de lecturas esenciales.",
    intro_weekend: "Ponte al d\u00eda con lo m\u00e1s destacado de la semana.",

    loading: "Cargando...",
    error_load_archive: "No se pudo cargar el archivo",
    error_load_digest: "No se pudo cargar el resumen de hoy",
    error_retry: "Intentar de nuevo",
    error_connection: "Verifica tu conexi\u00f3n e intenta de nuevo.",
    back: "Volver",
    read_original: "Leer art\u00edculo original",
    previous: "Anterior",
    next: "Siguiente",
    no_articles: "No hay art\u00edculos en esta edici\u00f3n.",
    no_summary: "Resumen no disponible.",

    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Mi\u00e9rcoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "S\u00e1bado",
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
      "est un condens\u00e9 quotidien des articles les plus importants dans les domaines de l'architecture, du design et de l'urbanisme, disponible sous forme d'application web et sur",
    about_editorial:
      "Chaque jour, notre système éditorial alimenté par l'IA passe au crible des dizaines de publications pour vous proposer 7 articles incontournables. Nous privilégions les discours critiques aux annonces de produits, les analyses approfondies aux communiqués de presse.",
    about_sources:
      "Nos sources comprennent ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review et bien d'autres. Notre objectif est de repr\u00e9senter les perspectives mondiales et les voix \u00e9mergentes en compl\u00e9ment des publications \u00e9tablies.",
    about_schedule:
      "Les \u00e9ditions hebdomadaires paraissent chaque lundi avec une s\u00e9lection plus large d'articles plus longs. Les \u00e9ditions de rattrapage du week-end, publi\u00e9es le mardi, couvrent tout ce que vous avez pu manquer.",
    about_install_text:
      "a/d/u existe \u00e9galement sous forme d'application, offrant un acc\u00e8s rapide et une exp\u00e9rience fluide.",
    about_contact: "Pour toute suggestion, correction ou demande de renseignements :",

    archive_title: "Archives",
    archive_empty: "Aucune \u00e9dition pour le moment.",
    archive_articles: "articles",

    edition_daily: "Quotidienne",
    edition_weekly: "Hebdomadaire",
    edition_weekend: "Rattrapage du week-end",

    intro_daily: "Notre s\u00e9lection \u00e9ditoriale du jour.",
    intro_weekly: "Notre s\u00e9lection hebdomadaire de lectures essentielles.",
    intro_weekend: "Rattrapez les temps forts de la semaine.",

    loading: "Chargement...",
    error_load_archive: "Impossible de charger les archives",
    error_load_digest: "Impossible de charger le r\u00e9sum\u00e9 du jour",
    error_retry: "R\u00e9essayer",
    error_connection: "V\u00e9rifiez votre connexion et r\u00e9essayez.",
    back: "Retour",
    read_original: "Lire l'article original",
    previous: "Pr\u00e9c\u00e9dent",
    next: "Suivant",
    no_articles: "Aucun article dans cette \u00e9dition.",
    no_summary: "R\u00e9sum\u00e9 non disponible.",

    monday: "Lundi",
    tuesday: "Mardi",
    wednesday: "Mercredi",
    thursday: "Jeudi",
    friday: "Vendredi",
    saturday: "Samedi",
    sunday: "Dimanche",

    january: "Janvier",
    february: "F\u00e9vrier",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Ao\u00fbt",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "D\u00e9cembre",
  },

  "pt-br": {
    about_intro:
      "\u00e9 um resumo di\u00e1rio com curadoria das not\u00edcias mais importantes sobre arquitetura, design e urbanismo, dispon\u00edvel como aplicativo web e no",
    about_editorial:
      "Todos os dias, nosso sistema editorial alimentado por IA analisa dezenas de publicações para trazer a você 7 leituras essenciais. Priorizamos o discurso crítico em vez de anúncios de produtos, análises longas em vez de comunicados à imprensa.",
    about_sources:
      "Nossas fontes incluem ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review e muitas outras. Nosso objetivo \u00e9 representar perspectivas globais e vozes emergentes, juntamente com publica\u00e7\u00f5es estabelecidas.",
    about_schedule:
      "As edi\u00e7\u00f5es semanais s\u00e3o publicadas todas as segundas-feiras, com uma sele\u00e7\u00e3o mais ampla de leituras mais longas. As edi\u00e7\u00f5es de atualiza\u00e7\u00e3o do fim de semana, \u00e0s ter\u00e7as-feiras, cobrem tudo o que voc\u00ea pode ter perdido.",
    about_install_text:
      "a/d/u tamb\u00e9m est\u00e1 dispon\u00edvel em um aplicativo, proporcionando acesso r\u00e1pido e uma experi\u00eancia nativa.",
    about_contact: "Para sugest\u00f5es, corre\u00e7\u00f5es ou d\u00favidas:",

    archive_title: "Arquivo",
    archive_empty: "Nenhuma edi\u00e7\u00e3o ainda.",
    archive_articles: "artigos",

    edition_daily: "Di\u00e1ria",
    edition_weekly: "Semanal",
    edition_weekend: "Resumo do fim de semana",

    intro_daily: "Nossa sele\u00e7\u00e3o editorial para hoje.",
    intro_weekly: "Nossa sele\u00e7\u00e3o semanal de leituras essenciais.",
    intro_weekend: "Fique por dentro dos destaques da semana.",

    loading: "Carregando...",
    error_load_archive: "N\u00e3o foi poss\u00edvel carregar o arquivo",
    error_load_digest: "N\u00e3o foi poss\u00edvel carregar o resumo de hoje",
    error_retry: "Tentar novamente",
    error_connection: "Verifique sua conex\u00e3o e tente novamente.",
    back: "Voltar",
    read_original: "Ler artigo original",
    previous: "Anterior",
    next: "Pr\u00f3ximo",
    no_articles: "Nenhum artigo nesta edi\u00e7\u00e3o.",
    no_summary: "Resumo n\u00e3o dispon\u00edvel.",

    monday: "Segunda-feira",
    tuesday: "Ter\u00e7a-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "S\u00e1bado",
    sunday: "Domingo",

    january: "Janeiro",
    february: "Fevereiro",
    march: "Mar\u00e7o",
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
      "-- \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0439 \u0434\u0430\u0439\u0434\u0436\u0435\u0441\u0442 \u0441\u0430\u043c\u044b\u0445 \u0432\u0430\u0436\u043d\u044b\u0445 \u043d\u043e\u0432\u043e\u0441\u0442\u0435\u0439 \u0432 \u043e\u0431\u043b\u0430\u0441\u0442\u0438 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u044b, \u0434\u0438\u0437\u0430\u0439\u043d\u0430 \u0438 \u0443\u0440\u0431\u0430\u043d\u0438\u0441\u0442\u0438\u043a\u0438, \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b\u0439 \u043a\u0430\u043a \u0432\u0435\u0431-\u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0438 \u0432",
    about_editorial:
      "\u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u0435\u043d\u044c \u043d\u0430\u0448\u0430 \u0440\u0435\u0434\u0430\u043a\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u0441\u0438\u0441\u0442\u0435\u043c\u0430 \u043d\u0430 \u0431\u0430\u0437\u0435 \u0438\u0441\u043a\u0443\u0441\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0433\u043e \u0438\u043d\u0442\u0435\u043b\u043b\u0435\u043a\u0442\u0430 \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u0434\u0435\u0441\u044f\u0442\u043a\u0438 \u0438\u0437\u0434\u0430\u043d\u0438\u0439, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0438\u0442\u044c 7 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u043f\u0443\u0431\u043b\u0438\u043a\u0430\u0446\u0438\u0439. \u041c\u044b \u043e\u0442\u0434\u0430\u0451\u043c \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u043a\u0440\u0443\u043f\u043d\u044b\u043c \u043e\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043d\u043d\u043e \u0437\u043d\u0430\u0447\u0438\u043c\u044b\u043c \u043f\u0440\u043e\u0435\u043a\u0442\u0430\u043c \u0438 \u0440\u0430\u0431\u043e\u0442\u0430\u043c \u0430\u0432\u0442\u043e\u0440\u0438\u0442\u0435\u0442\u043d\u044b\u0445 \u0430\u0440\u0445\u0438\u0442\u0435\u043a\u0442\u0443\u0440\u043d\u044b\u0445 \u0431\u044e\u0440\u043e.",
    about_sources:
      "\u0421\u0440\u0435\u0434\u0438 \u043d\u0430\u0448\u0438\u0445 \u0438\u0441\u0442\u043e\u0447\u043d\u0438\u043a\u043e\u0432 -- ArchDaily, Dezeen, Domus, Designboom, Architectural Record, The Architectural Review \u0438 \u043c\u043d\u043e\u0433\u0438\u0435 \u0434\u0440\u0443\u0433\u0438\u0435. \u041c\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u043c \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u0443\u044e \u043f\u043e\u0432\u0435\u0441\u0442\u043a\u0443, \u043e\u0431\u044a\u0435\u0434\u0438\u043d\u044f\u044f \u0432\u0435\u0434\u0443\u0449\u0438\u0435 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u043c\u0435\u0434\u0438\u0430 \u0438 \u043d\u0438\u0448\u0435\u0432\u044b\u0435 \u0440\u0435\u0433\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0435 \u0438\u0437\u0434\u0430\u043d\u0438\u044f.",
    about_schedule:
      "\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0434\u0430\u0439\u0434\u0436\u0435\u0441\u0442\u044b \u0432\u044b\u0445\u043e\u0434\u044f\u0442 \u043f\u043e \u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a\u0430\u043c \u0438 \u043f\u043e\u0434\u0432\u043e\u0434\u044f\u0442 \u0438\u0442\u043e\u0433\u0438 \u043d\u0435\u0434\u0435\u043b\u0438. \u0412\u044b\u043f\u0443\u0441\u043a\u0438, \u043f\u043e\u0441\u0432\u044f\u0449\u0451\u043d\u043d\u044b\u0435 \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u043c, \u043f\u0443\u0431\u043b\u0438\u043a\u0443\u044e\u0442\u0441\u044f \u043f\u043e \u0432\u0442\u043e\u0440\u043d\u0438\u043a\u0430\u043c \u0438 \u043e\u0445\u0432\u0430\u0442\u044b\u0432\u0430\u044e\u0442 \u0432\u0441\u0451, \u0447\u0442\u043e \u0432\u044b \u043c\u043e\u0433\u043b\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c.",
    about_install_text:
      "a/d/u \u0442\u0430\u043a\u0436\u0435 \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u0432 \u0444\u043e\u0440\u043c\u0430\u0442\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f, \u043e\u0431\u0435\u0441\u043f\u0435\u0447\u0438\u0432\u0430\u044e\u0449\u0435\u0433\u043e \u0431\u044b\u0441\u0442\u0440\u044b\u0439 \u0434\u043e\u0441\u0442\u0443\u043f \u0438 \u0443\u0434\u043e\u0431\u0441\u0442\u0432\u043e \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f.",
    about_contact: "\u0414\u043b\u044f \u043f\u0440\u0435\u0434\u043b\u043e\u0436\u0435\u043d\u0438\u0439, \u0438\u0441\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0439 \u0438 \u0437\u0430\u043f\u0440\u043e\u0441\u043e\u0432:",

    archive_title: "\u0410\u0440\u0445\u0438\u0432",
    archive_empty: "\u0412\u044b\u043f\u0443\u0441\u043a\u043e\u0432 \u043f\u043e\u043a\u0430 \u043d\u0435\u0442.",
    archive_articles: "\u0441\u0442\u0430\u0442\u0435\u0439",

    edition_daily: "\u0415\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u044b\u0439",
    edition_weekly: "\u0415\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u044b\u0439",
    edition_weekend: "\u041e\u0431\u0437\u043e\u0440 \u0432\u044b\u0445\u043e\u0434\u043d\u044b\u0445",

    intro_daily: "\u041d\u0430\u0448\u0430 \u0440\u0435\u0434\u0430\u043a\u0446\u0438\u043e\u043d\u043d\u0430\u044f \u043f\u043e\u0434\u0431\u043e\u0440\u043a\u0430 \u043d\u0430 \u0441\u0435\u0433\u043e\u0434\u043d\u044f.",
    intro_weekly: "\u041d\u0430\u0448\u0430 \u0435\u0436\u0435\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0430\u044f \u043f\u043e\u0434\u0431\u043e\u0440\u043a\u0430 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0445 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u043e\u0432.",
    intro_weekend: "\u041e\u0431\u0437\u043e\u0440 \u0433\u043b\u0430\u0432\u043d\u043e\u0433\u043e \u0437\u0430 \u043d\u0435\u0434\u0435\u043b\u044e.",

    loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430...",
    error_load_archive: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0430\u0440\u0445\u0438\u0432",
    error_load_digest: "\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u0435\u0433\u043e\u0434\u043d\u044f\u0448\u043d\u0438\u0439 \u0432\u044b\u043f\u0443\u0441\u043a",
    error_retry: "\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0441\u043d\u043e\u0432\u0430",
    error_connection: "\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0435 \u0438 \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u043e\u0432\u0430.",
    back: "\u041d\u0430\u0437\u0430\u0434",
    read_original: "\u0427\u0438\u0442\u0430\u0442\u044c \u0441\u0442\u0430\u0442\u044c\u044e \u043f\u043e\u043b\u043d\u043e\u0441\u0442\u044c\u044e",
    previous: "\u041f\u0440\u0435\u0434\u044b\u0434\u0443\u0449\u0430\u044f",
    next: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0430\u044f",
    no_articles: "\u0412 \u044d\u0442\u043e\u043c \u0432\u044b\u043f\u0443\u0441\u043a\u0435 \u043d\u0435\u0442 \u0441\u0442\u0430\u0442\u0435\u0439.",
    no_summary: "\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u043d\u0435\u0434\u043e\u0441\u0442\u0443\u043f\u043d\u043e.",

    monday: "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a",
    tuesday: "\u0412\u0442\u043e\u0440\u043d\u0438\u043a",
    wednesday: "\u0421\u0440\u0435\u0434\u0430",
    thursday: "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
    friday: "\u041f\u044f\u0442\u043d\u0438\u0446\u0430",
    saturday: "\u0421\u0443\u0431\u0431\u043e\u0442\u0430",
    sunday: "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435",

    january: "\u042f\u043d\u0432\u0430\u0440\u044c",
    february: "\u0424\u0435\u0432\u0440\u0430\u043b\u044c",
    march: "\u041c\u0430\u0440\u0442",
    april: "\u0410\u043f\u0440\u0435\u043b\u044c",
    may: "\u041c\u0430\u0439",
    june: "\u0418\u044e\u043d\u044c",
    july: "\u0418\u044e\u043b\u044c",
    august: "\u0410\u0432\u0433\u0443\u0441\u0442",
    september: "\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c",
    october: "\u041e\u043a\u0442\u044f\u0431\u0440\u044c",
    november: "\u041d\u043e\u044f\u0431\u0440\u044c",
    december: "\u0414\u0435\u043a\u0430\u0431\u0440\u044c",
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