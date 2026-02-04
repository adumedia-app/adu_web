// src/components/LanguageSelector.tsx
/**
 * Language Selector Component
 * Dropdown to switch between languages
 */

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { LANGUAGES, Language } from "@/lib/cookies";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm uppercase">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-lg shadow-lg py-1 min-w-[120px] z-50">
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-secondary transition-colors ${
                language === code ? "bg-secondary font-medium" : ""
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
