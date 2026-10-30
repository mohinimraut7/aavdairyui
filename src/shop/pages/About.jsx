import { Link } from "react-router-dom";
import { LuHeart, LuLeaf, LuShieldCheck, LuUsers } from "react-icons/lu";
import PageHeader from "../components/common/PageHeader";
import usePageTitle from "../hooks/usePageTitle";
import { SITE } from "../config/site";

const VALUES = [
  { icon: LuLeaf, title: "Natural", text: "Simple dairy, made from our own farm milk." },
  { icon: LuShieldCheck, title: "Hygienic", text: "Clean handling from milking to packing." },
  { icon: LuHeart, title: "Caring", text: "Our cattle are family — healthy cows, better milk." },
  { icon: LuUsers, title: "Local", text: `Proudly serving families in ${SITE.serviceArea}.` },
];

export default function About() {
  usePageTitle("About Us");
  return (
    <>
      <PageHeader title="About Us" subtitle={SITE.tagline} crumbs={[{ label: "About Us" }]} />
      <section className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Who we are</p>
          <h2 className="section-title mt-2">A desi cattle farm with a simple promise</h2>
          <p className="mt-4 leading-relaxed text-muted">
            {SITE.name} started with a love for India’s desi cattle breeds. Today we breed and care for our own herd and
            share what it gives us — fresh milk, paneer, cheese, curd and ghee — with families near the farm.
          </p>
          <p className="mt-3 leading-relaxed text-muted">
            Our mission is to make honest, farm-fresh dairy easy to order, and to keep the connection between the farm and
            your kitchen as short as possible.
          </p>
          <Link to="/contact" className="btn-primary mt-6">Get in touch</Link>
        </div>
        <img src="/images/village-farm.webp" alt="The AAV Dairy farmyard with cattle sheds and milk cans" loading="lazy" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift" />
      </section>
      <section className="bg-cream py-14">
        <div className="container-x">
          <h2 className="section-title mb-8 text-center">What we stand for</h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <li key={title} className="card p-6 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-leaf/50 bg-white text-farm-800"><Icon className="h-6 w-6" aria-hidden /></span>
                <h3 className="mt-4 font-display text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
