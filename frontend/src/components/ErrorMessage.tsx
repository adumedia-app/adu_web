// src/components/ErrorMessage.tsx
/**
 * Error Message Component
 */

import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg text-foreground">{message}</p>
      <p className="text-sm text-muted-foreground">
        {t("error_connection", language)}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors"
        >
          {t("try_again", language)}
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;