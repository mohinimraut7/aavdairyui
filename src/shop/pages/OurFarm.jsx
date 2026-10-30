import { Link } from "react-router-dom";
import { LuArrowRight, LuSprout, LuDroplet, LuShieldCheck, LuTruck } from "react-icons/lu";
import usePageTitle from "../hooks/usePageTitle";

const JOURNEY = [
  { icon: LuSprout, title: "Cared-for desi cattle", text: "Our herd is bred and raised at the farm, with daily feeding, clean sheds and regular veterinary care." },
  { icon: LuDroplet, title: "Hygienic milking", text: "Cows are milked in the farm shed and the milk is filtered and chilled soon after." },
  { icon: LuShieldCheck, title: "Small-batch products", text: "Paneer, cheese, curd and ghee are prepared in small batches from the same milk." },
  { icon: LuTruck, title: "Farm to your home", text: "Orders are packed at the farm and delivered in morning and evening slots across Vasai Virar." },
];

const GALLERY = [
  { src: "/images/farm-shed.webp", alt: "Cattle feeding in the farm shed at sunrise" },
  { src: "/images/village-farm.webp", alt: "Traditional cattle shed with milk cans in the farmyard" },
  { src: "/images/milk-processing.webp", alt: "Fresh milk being poured into steel cans" },
  { src: "/images/cattle-walk.webp", alt: "Desi cattle returning to the farm along a village road" },
];

export default function OurFarm() {
  usePageTitle("Our Farm", "Meet the desi cattle and the people behind AAV Desi Cattle Breeding Dairy Farm.");
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src="/images/farm-pasture.webp" alt="Cows grazing in the green pasture of AAV Dairy Farm at sunrise" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-farm-900/85 via-farm-900/55 to-transparent" />
        <div className="container-x py-24 text-white sm:py-32">
          <p className="font-display text-xs font-bold tracking-[0.2em] text-leaf-light uppercase">Our Farm</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl leading-tight font-extrabold sm:text-5xl">Where every drop begins</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            AAV Desi Cattle Breeding Dairy Farm breeds and cares for desi cattle near Vasai Virar — and brings their milk
            straight to your family.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Farm to home</p>
          <h2 className="section-title mt-2">How your milk reaches you</h2>
        </div>
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JOURNEY.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card p-6">
              <span className="text-xs font-bold text-leaf">STEP {i + 1}</span>
              <span className="mt-3 grid h-12 w-12 place-items-center rounded-xl bg-cream text-farm-800"><Icon className="h-6 w-6" aria-hidden /></span>
              <h3 className="mt-4 font-display text-lg font-bold text-farm-900">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream py-16">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <img src="/images/milking.webp" alt="Milking a desi cow in the farm shed" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
          <div>
            <p className="eyebrow">Quality &amp; hygiene</p>
            <h2 className="section-title mt-2">Care at every step</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Clean sheds, clean utensils and quick chilling are the simple habits that keep our milk fresh. Our team
              records every animal’s health, feeding and milk yield, so we always know how our herd is doing.
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              Have a question about how we work? We’re happy to talk — or arrange a visit to the farm.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products" className="btn-primary">Shop farm products <LuArrowRight className="h-4 w-4" aria-hidden /></Link>
              <Link to="/contact" className="btn-outline">Contact the farm</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="section-title mb-6">Life on the farm</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {GALLERY.map((g) => (
            <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover" />
          ))}
        </div>
      </section>
    </>
  );
}
