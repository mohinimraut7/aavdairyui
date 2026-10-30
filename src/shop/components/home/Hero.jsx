import { Link } from "react-router-dom";
import { LuArrowRight, LuShoppingCart, LuPlay, LuLeaf, LuShieldCheck } from "react-icons/lu";
import { FaCow } from "react-icons/fa6";

const TRUST = [
  { icon: LuLeaf, title: "100% Natural", text: "No Preservatives" },
  { icon: FaCow, title: "Desi Cattle Milk", text: "A2 Rich Nutrition" },
  { icon: LuShieldCheck, title: "Fresh & Hygienic", text: "Quality Assured" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream" aria-labelledby="hero-title">
      {/* Product + farm photography (right side on desktop, top on mobile) */}
      <div className="relative aspect-[16/9] max-h-80 w-full sm:max-h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:max-h-none lg:w-[58%]">
        <img
          src="/images/hero-products.webp"
          alt="AAV Dairy milk bottle, paneer, desi ghee and curd on a wooden table with desi cows grazing behind"
          fetchpriority="high"
          className="h-full w-full object-cover object-[35%_center] lg:object-[20%_center]"
        />
        <div className="absolute inset-y-0 left-0 hidden w-56 bg-gradient-to-r from-cream to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream to-transparent lg:hidden" />
      </div>

      <div className="container-x relative">
        <div className="pt-2 pb-10 lg:flex lg:min-h-[400px] lg:max-w-[50%] lg:flex-col lg:justify-center lg:py-7">
          <p className="eyebrow mb-3">Pure • Natural • Farm Fresh</p>
          <h1 id="hero-title" className="font-display text-[36px] leading-[1.06] font-extrabold tracking-tight text-farm-800 sm:text-[54px] lg:text-[48px] xl:text-[60px]">
            <span className="sm:whitespace-nowrap">Pure Desi Goodness,</span>
            <br />
            <span className="text-leaf">Delivered Fresh.</span>
          </h1>
          <p className="mt-4 max-w-[540px] text-[17px] leading-relaxed text-ink/85">
            Farm-fresh milk, creamy paneer, traditional ghee and more — made with care, delivered with trust.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
            <Link to="/products" className="btn-primary h-[52px] px-7 text-base">
              <LuShoppingCart className="h-5 w-5" aria-hidden /> Shop All Products <LuArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link to="/our-farm" className="btn-outline h-[52px] px-7 text-base">
              Our Farm Story
              <span className="grid h-6 w-6 place-items-center rounded-full bg-leaf text-white">
                <LuPlay className="h-3 w-3 fill-current" aria-hidden />
              </span>
            </Link>
          </div>

          <ul className="mt-7 grid grid-cols-1 gap-4 min-[420px]:grid-cols-3 sm:gap-3">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-leaf/50 bg-leaf-soft/60 text-farm-800">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-ink">{title}</span>
                  <span className="text-xs text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
