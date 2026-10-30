import { LuLoader } from "react-icons/lu";

export default function Loader({ label = "Loading…", full = false }) {
  return (
    <div
      role="status"
      className={`flex items-center justify-center gap-3 text-muted ${full ? "min-h-[50vh]" : "py-10"}`}
    >
      <LuLoader className="h-5 w-5 animate-spin text-leaf" aria-hidden />
      <span className="text-sm">{label}</span>
    </div>
  );
}
