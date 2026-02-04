// src/lib/cookies.ts
/**
 * Cookie utilities for ADUmedia website
 * Handles language preference storage
 */

const LANGUAGE_COOKIE = "adu_language";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export type Language = "en" | "es" | "fr" | "pt-br" | "ru";

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  "pt-br": "Português",
  ru: "Русский",
};

export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Get language preference from cookie
 */
export function getLanguagePreference(): Language {
  if (typeof document === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const cookies = document.cookie.split("; ");
  const languageCookie = cookies.find((c) => c.startsWith(`${LANGUAGE_COOKIE}=`));

  if (!languageCookie) {
    return DEFAULT_LANGUAGE;
  }

  const value = languageCookie.split("=")[1] as Language;

  // Validate it's a supported language
  if (value in LANGUAGES) {
    return value;
  }

  return DEFAULT_LANGUAGE;
}

/**
 * Set language preference in cookie
 */
export function setLanguagePreference(language: Language): void {
  if (typeof document === "undefined") {
    return;
  }

  // Set cookie with 1 year expiration
  document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Clear language preference cookie
 */
export function clearLanguagePreference(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LANGUAGE_COOKIE}=; path=/; max-age=0`;
}
