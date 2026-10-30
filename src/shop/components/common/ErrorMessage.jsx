import { LuCircleAlert } from "react-icons/lu";

export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <LuCircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <div className="flex-1">{message}</div>
      {onRetry && (
        <button onClick={onRetry} className="font-semibold underline underline-offset-2">
          Retry
        </button>
      )}
    </div>
  );
}
