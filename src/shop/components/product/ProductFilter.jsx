import { LuSearch } from "react-icons/lu";
import { CATEGORIES } from "../../data/catalog";

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "best", label: "Best selling" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function ProductFilter({ category, onCategory, sort, onSort, inStockOnly, onInStock, counts, query, onQuery }) {
  const chip = (active) =>
    `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
      active ? "border-farm-800 bg-farm-800 text-white" : "border-line bg-white text-ink hover:border-farm-800"
    }`;
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="tablist" aria-label="Categories">
        <button role="tab" aria-selected={!category} className={chip(!category)} onClick={() => onCategory("")}>
          All ({counts.all})
        </button>
        {CATEGORIES.map((c) => (
          <button key={c.slug} role="tab" aria-selected={category === c.slug} className={chip(category === c.slug)} onClick={() => onCategory(c.slug)}>
            {c.name} ({counts[c.slug] || 0})
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <form role="search" onSubmit={(e) => { e.preventDefault(); onQuery(new FormData(e.currentTarget).get("q").trim()); }} className="relative">
          <label htmlFor="plp-q" className="sr-only">Search products</label>
          <LuSearch className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input key={query} id="plp-q" name="q" type="search" defaultValue={query} placeholder="Search…" className="input w-44 py-2.5 pl-9" />
        </form>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStock(e.target.checked)} className="h-4 w-4 accent-farm-800" />
          In stock
        </label>
        <label htmlFor="sort" className="sr-only">Sort products</label>
        <select id="sort" value={sort} onChange={(e) => onSort(e.target.value)} className="input w-auto py-2.5">
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
