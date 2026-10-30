import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { CATEGORIES } from "../../data/catalog";

export default function Categories() {
  return (
    <section aria-label="Shop by category" className="container-x py-10 sm:py-14">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={`/products?category=${c.slug}`}
            className="group relative flex h-44 overflow-hidden rounded-2xl border border-line bg-gradient-to-r from-cream via-cream to-beige shadow-card transition hover:-translate-y-0.5 hover:shadow-lift sm:h-[150px]"
          >
            <img
              src={c.image}
              alt=""
              loading="lazy"
              className="absolute right-0 bottom-0 h-[58%] w-[72%] object-cover transition duration-500 [mask-image:linear-gradient(to_right,transparent,black_35%)] group-hover:scale-105 sm:inset-y-0 sm:h-full sm:w-[54%]"
            />
            <div className="relative z-10 flex flex-col justify-between p-4 sm:max-w-[64%] sm:p-5">
              <div>
                <h3 className="font-display text-[15px] leading-tight font-extrabold text-farm-800 sm:text-lg xl:text-xl">{c.name}</h3>
                <p className="mt-0.5 text-xs text-ink/75 xl:text-sm">{c.subtitle}</p>
              </div>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-farm-800 text-white transition group-hover:bg-leaf" aria-hidden>
                <LuArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
