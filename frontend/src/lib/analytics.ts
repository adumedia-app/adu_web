// src/lib/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackPageView(path: string) {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
    });
  }
}