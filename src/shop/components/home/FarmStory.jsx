import { Link } from "react-router-dom";
import { LuArrowRight, LuCheck } from "react-icons/lu";

const POINTS = [
  "Desi cattle raised and cared for at our own farm",
  "Milked, chilled and packed under hygienic conditions",
  "Paneer, curd and ghee prepared in small batches",
  "Delivered directly to homes across Vasai Virar",
];

export default function FarmStory() {
  return (
    <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-[72px]">
      <div className="relative">
        <img
          src="/images/milking.webp"
          alt="Farm worker milking a desi cow inside the cattle shed"
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
        />
        <img
          src="/images/cattle-walk.webp"
          alt="Desi cattle walking back to the farm along a village path"
          loading="lazy"
          className="absolute -right-3 -bottom-8 hidden w-[42%] rounded-2xl border-4 border-cream-light object-cover shadow-lift sm:block"
        />
      </div>
      <div>
        <p className="eyebrow mb-3">Our Farm Story</p>
        <h2 className="section-title">From our desi cattle to your family’s table</h2>
        <p className="mt-4 leading-relaxed text-muted">
          AAV Desi Cattle Breeding Dairy Farm is a family farm that breeds and looks after desi cattle. Everything we sell
          starts with our own herd — so we know exactly where your milk comes from.
        </p>
        <ul className="mt-6 space-y-3">
          {POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 text-ink">
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-leaf/15 text-leaf">
                <LuCheck className="h-4 w-4" aria-hidden />
              </span>
              {p}
            </li>
          ))}
        </ul>
        <Link to="/our-farm" className="btn-outline mt-8">
          Visit Our Farm <LuArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
