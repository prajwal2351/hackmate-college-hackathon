import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-lg border border-neutral-700/80 bg-neutral-900/95 px-4 py-3 text-neutral-100 shadow-xl shadow-black/40 backdrop-blur-md">
      <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
      <p className="text-xs font-medium leading-relaxed">{message}</p>
      <button
        onClick={onClose}
        className="ml-auto text-neutral-400 hover:text-neutral-200"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
