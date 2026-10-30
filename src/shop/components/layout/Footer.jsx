import { Link } from "react-router-dom";
import { LuPhone, LuMail, LuMapPin, LuClock } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa6";
import { SITE } from "../../config/site";
import { NAV_LINKS } from "./navLinks";
import FarmSilhouette from "./FarmSilhouette";

// Links come from .env (VITE_FACEBOOK_URL, VITE_INSTAGRAM_URL, VITE_YOUTUBE_URL, VITE_WHATSAPP_NUMBER).
// Until a link is configured the icon is shown as a disabled placeholder — no invented URLs.
const socials = [
  { key: "facebook", icon: FaFacebookF, label: "Facebook", href: SITE.social.facebook },
  { key: "instagram", icon: FaInstagram, label: "Instagram", href: SITE.social.instagram },
  { key: "youtube", icon: FaYoutube, label: "YouTube", href: SITE.social.youtube },
  { key: "whatsapp", icon: FaWhatsapp, label: "WhatsApp", href: SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : "" },
];

export default function Footer() {
  return (
    <footer className="curve-top mt-16 bg-farm-800 text-white">
      <div className="container-x relative grid gap-10 pt-12 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <img src={SITE.logo} alt="" className="h-20 w-auto rounded-full bg-white/95 p-1" loading="lazy" />
            <div>
              <p className="font-display text-lg leading-tight font-extrabold uppercase">
                AAV Desi Cattle
                <br />
                Breeding Dairy Farm
              </p>
              <p className="mt-1 text-xs text-cream/85">{SITE.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
            Milk, paneer, ghee and curd from our desi cattle — handled with care and delivered fresh across Vasai Virar &amp; nearby areas.
          </p>
        </div>

        <div className="lg:border-l lg:border-white/15 lg:pl-8">
          <h2 className="mb-3 font-display text-sm font-bold">Quick Links</h2>
          <ul className="space-y-2 text-sm text-white/80">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:border-l lg:border-white/15 lg:pl-8">
          <h2 className="mb-3 font-display text-sm font-bold">Customer Support</h2>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <LuPhone className="h-4 w-4 shrink-0" aria-hidden />
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-white">{SITE.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <LuMail className="h-4 w-4 shrink-0" aria-hidden />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <LuMapPin className="h-4 w-4 shrink-0" aria-hidden /> {SITE.address}
            </li>
            <li className="flex items-center gap-3">
              <LuClock className="h-4 w-4 shrink-0" aria-hidden /> {SITE.hours}
            </li>
          </ul>
        </div>

        <div className="relative">
          <h2 className="mb-3 font-display text-sm font-bold">Follow Us</h2>
          <div className="flex gap-3">
            {socials.map(({ key, icon: Icon, label, href }) =>
              href ? (
                <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-farm-800 transition hover:bg-leaf-light hover:text-white">
                  <Icon className="h-4 w-4" />
                </a>
              ) : (
                <span key={key} role="img" aria-label={`${label} (link coming soon)`} title={`${label} link coming soon`}
                  className="grid h-10 w-10 cursor-default place-items-center rounded-full bg-white/90 text-farm-800 opacity-60">
                  <Icon className="h-4 w-4" />
                </span>
              )
            )}
          </div>
          <FarmSilhouette className="mt-6 hidden lg:block" />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-4 text-xs text-white/75 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <nav aria-label="Policies" className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link to="/policies/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/policies/terms" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link to="/policies/shipping" className="hover:text-white">Shipping Policy</Link>
            <Link to="/policies/refund" className="hover:text-white">Refund Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
