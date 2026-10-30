import { useState } from "react";
import { LuPhone, LuMail, LuMapPin, LuClock, LuSend } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import PageHeader from "../components/common/PageHeader";
import ErrorMessage from "../components/common/ErrorMessage";
import { SITE } from "../config/site";
import { sendContactApi } from "../api/contactApi";
import { errorMessage } from "../api/axios";
import { isValidEmail, isValidPhone } from "../utils/validation";
import usePageTitle from "../hooks/usePageTitle";

export default function Contact() {
  usePageTitle("Contact");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [state, setState] = useState({ sending: false, done: false, error: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2 || !isValidPhone(form.phone) || !isValidEmail(form.email) || form.message.trim().length < 5)
      return setState({ ...state, error: "Please enter your name, a valid mobile number and a message." });
    setState({ sending: true, done: false, error: "" });
    try {
      await sendContactApi(form);
      setState({ sending: false, done: true, error: "" });
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setState({ sending: false, done: false, error: errorMessage(err) });
    }
  };

  const info = [
    { icon: LuPhone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
    { icon: LuMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: LuMapPin, label: "Farm location", value: SITE.address },
    { icon: LuClock, label: "Business hours", value: SITE.hours },
  ];

  return (
    <>
      <PageHeader title="Contact Us" subtitle="Questions about an order, bulk requirements or a farm visit? We’d love to hear from you." crumbs={[{ label: "Contact" }]} />
      <div className="container-x grid gap-8 py-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          {info.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="card flex items-center gap-4 p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-farm-800"><Icon className="h-5 w-5" aria-hidden /></span>
              <div>
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</p>
                {href ? <a href={href} className="font-semibold text-ink hover:text-farm-800">{value}</a> : <p className="font-semibold">{value}</p>}
              </div>
            </div>
          ))}
          {SITE.whatsapp && (
            <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn w-full bg-[#25D366] py-3 text-white hover:brightness-95">
              <FaWhatsapp className="h-5 w-5" /> Chat on WhatsApp
            </a>
          )}
          {SITE.mapEmbedUrl && (
            <iframe title="Farm location map" src={SITE.mapEmbedUrl} loading="lazy" className="h-64 w-full rounded-2xl border border-line" referrerPolicy="no-referrer-when-downgrade" />
          )}
        </div>

        <form onSubmit={submit} className="card grid gap-4 p-6 sm:grid-cols-2 sm:p-8" noValidate>
          <h2 className="font-display text-xl font-bold text-farm-900 sm:col-span-2">Send us a message</h2>
          <div><label htmlFor="cn" className="label">Name *</label><input id="cn" className="input" autoComplete="name" value={form.name} onChange={set("name")} /></div>
          <div><label htmlFor="cp" className="label">Mobile *</label><input id="cp" className="input" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} /></div>
          <div className="sm:col-span-2"><label htmlFor="ce" className="label">Email</label><input id="ce" type="email" className="input" autoComplete="email" value={form.email} onChange={set("email")} /></div>
          <div className="sm:col-span-2"><label htmlFor="cm" className="label">Message *</label><textarea id="cm" rows={5} className="input" value={form.message} onChange={set("message")} /></div>
          <div className="sm:col-span-2"><ErrorMessage message={state.error} /></div>
          {state.done && <p role="status" className="rounded-xl bg-leaf/10 p-3 text-sm font-medium text-farm-800 sm:col-span-2">Thank you! We’ve received your message and will get back to you soon.</p>}
          <button className="btn-primary w-fit" disabled={state.sending}><LuSend className="h-4 w-4" aria-hidden /> {state.sending ? "Sending…" : "Send message"}</button>
        </form>
      </div>
    </>
  );
}
