import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ToastData {
  id: number;
  title: string;
  description?: string;
  duration?: number;
}

// Module-level event system to avoid React context (prevents duplicate React issues)
type ToastListener = (toast: ToastData) => void;
const listeners: Set<ToastListener> = new Set();

export function showToast(title: string, description?: string, duration = 4000) {
  const toast: ToastData = { id: Date.now(), title, description, duration };
  listeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const handler: ToastListener = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration || 4000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 pointer-events-none w-full max-w-[400px] px-4">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: number) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const hideTimer = setTimeout(
      () => setVisible(false),
      (toast.duration || 4000) - 300
    );
    return () => clearTimeout(hideTimer);
  }, [toast.duration]);

  return (
    <div
      className={`pointer-events-auto rounded-2xl overflow-hidden flex items-stretch transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-3"
      }`}
      style={{ backgroundColor: "rgba(0, 5, 30, 0.92)", backdropFilter: "blur(12px)" }}
    >
      {/* Gradient accent bar */}
      <div
        className="w-[3px] shrink-0"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(133, 200, 255), rgb(56, 125, 236), rgb(3, 3, 192))",
        }}
      />

      <div className="flex items-start gap-3 px-4 py-3 flex-1 min-w-0">
        {/* Gradient dot indicator */}
        <div
          className="w-[8px] h-[8px] rounded-full shrink-0 mt-[5px]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgb(56, 125, 236), rgb(133, 200, 255))",
          }}
        />

        <div className="flex-1 min-w-0">
          <p
            className="text-white font-['Poppins']"
            style={{ fontSize: "13px" }}
          >
            {toast.title}
          </p>
          {toast.description && (
            <p
              className="mt-0.5 font-['Poppins']"
              style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)" }}
            >
              {toast.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="shrink-0 mt-0.5 rounded-full p-1 transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          <X className="w-[14px] h-[14px]" />
        </button>
      </div>
    </div>
  );
}
