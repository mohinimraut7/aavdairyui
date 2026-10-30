import { Link } from "react-router-dom";
import { LuChevronRight } from "react-icons/lu";

// Slim cream page banner with breadcrumbs, used by inner pages.
export default function PageHeader({ title, subtitle, crumbs = [] }) {
  return (
    <section className="border-b border-line bg-cream">
      <div className="container-x py-8 sm:py-10">
        <nav aria-label="Breadcrumb" className="mb-3 flex flex-wrap items-center gap-1 text-xs text-muted">
          <Link to="/" className="hover:text-farm-800">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1">
              <LuChevronRight className="h-3 w-3" aria-hidden />
              {c.to ? (
                <Link to={c.to} className="hover:text-farm-800">{c.label}</Link>
              ) : (
                <span aria-current="page" className="text-ink">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="font-display text-3xl font-extrabold text-farm-900 sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-muted">{subtitle}</p>}
      </div>
    </section>
  );
}
