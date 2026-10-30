import { LuTruck, LuShieldCheck, LuLeaf, LuHeart } from "react-icons/lu";

const ITEMS = [
  { icon: LuTruck, title: "Farm to Home", text: "Freshly delivered" },
  { icon: LuShieldCheck, title: "Quality Assured", text: "Pure & Hygienic" },
  { icon: LuLeaf, title: "No Preservatives", text: "100% Natural" },
  { icon: LuHeart, title: "Healthy Families", text: "Goodness in Every Drop" },
];

// Benefits strip under Best Sellers (reference UI).
export default function WhyChooseUs() {
  return (
    <section aria-label="Why AAV Dairy" className="border-y border-line bg-cream">
      <ul className="container-x grid grid-cols-2 gap-y-8 py-9 lg:grid-cols-4 lg:py-10">
        {ITEMS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className={`flex items-center justify-center gap-4 px-2 ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-leaf/70 bg-white text-leaf">
              <Icon className="h-6 w-6" aria-hidden />
            </span>
            <span>
              <span className="block font-display text-sm font-bold text-ink sm:text-base">{title}</span>
              <span className="text-xs text-muted sm:text-sm">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
