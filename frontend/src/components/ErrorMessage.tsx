// src/components/ErrorMessage.tsx
/**
 * Error Message Component
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className="text-lg text-foreground">{message}</p>
      <p className="text-sm text-muted-foreground">
        Please check your connection and try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm border border-border rounded hover:bg-secondary transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;