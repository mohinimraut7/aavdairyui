import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuCircleCheck, LuCircleAlert, LuX } from "react-icons/lu";
import { dismissToast } from "../../redux/slices/uiSlice";

function Toast({ toast }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const t = setTimeout(() => dispatch(dismissToast(toast.id)), 3200);
    return () => clearTimeout(t);
  }, [dispatch, toast.id]);
  const ok = toast.type === "success";
  const Icon = ok ? LuCircleCheck : LuCircleAlert;
  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-xl bg-farm-900 px-4 py-3 text-sm text-white shadow-lift">
      <Icon className={`h-5 w-5 shrink-0 ${ok ? "text-leaf-light" : "text-red-300"}`} aria-hidden />
      <span className="flex-1">{toast.message}</span>
      <button aria-label="Dismiss" onClick={() => dispatch(dismissToast(toast.id))} className="opacity-70 hover:opacity-100">
        <LuX className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function Toaster() {
  const toasts = useSelector((s) => s.ui.toasts);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} />
      ))}
    </div>
  );
}
