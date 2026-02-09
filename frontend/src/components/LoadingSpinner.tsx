// src/components/LoadingSpinner.tsx
/**
 * Loading Spinner Component
 */

import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const LoadingSpinner = () => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm">{t("loading", language)}</p>
    </div>
  );
};

export default LoadingSpinner;