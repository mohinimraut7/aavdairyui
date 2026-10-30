import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";

export default function EmptyState({ icon: Icon = LuShoppingBag, title, text, actionLabel, actionTo }) {
  return (
    <div className="card mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-cream text-farm-800">
        <Icon className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="font-display text-xl font-bold text-farm-900">{title}</h2>
      {text && <p className="mt-2 max-w-sm text-sm text-muted">{text}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn-primary btn-sm mt-6">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
