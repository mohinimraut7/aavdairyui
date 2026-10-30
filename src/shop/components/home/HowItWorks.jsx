import { LuShoppingBag, LuCalendarCheck, LuTruck } from "react-icons/lu";
import SectionTitle from "../common/SectionTitle";

const STEPS = [
  { icon: LuShoppingBag, title: "Choose your products", text: "Pick milk, paneer, ghee or curd and add them to your cart." },
  { icon: LuCalendarCheck, title: "Pick a delivery slot", text: "Enter your address and choose a morning or evening slot." },
  { icon: LuTruck, title: "Fresh at your door", text: "We deliver straight from the farm. Pay online or on delivery." },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-16 lg:py-[72px]">
      <div className="container-x">
        <SectionTitle center eyebrow="Simple ordering" title="How it works" />
        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="card relative h-full p-7">
              <span className="absolute top-5 right-5 font-display text-4xl font-extrabold text-beige">{i + 1}</span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-farm-800 text-white">
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-farm-900">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
