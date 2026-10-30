import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuX, LuPhone } from "react-icons/lu";
import Logo from "../common/Logo";
import { NAV_LINKS } from "./navLinks";
import { setMobileMenu } from "../../redux/slices/uiSlice";
import { selectAccountLink, selectIsLoggedIn } from "../../redux/slices/authSlice";
import { SITE } from "../../config/site";

export default function MobileMenu() {
  const open = useSelector((s) => s.ui.mobileMenuOpen);
  const loggedIn = useSelector(selectIsLoggedIn);
  const accountLink = useSelector(selectAccountLink);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const close = () => dispatch(setMobileMenu(false));

  useEffect(() => {
    dispatch(setMobileMenu(false));
  }, [pathname, dispatch]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && dispatch(setMobileMenu(false));
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dispatch]);

  if (!open) return null;

  const links = [
    ...NAV_LINKS,
    loggedIn
      ? { to: "/account", label: "My Account" }
      : accountLink === "/dashboard"
        ? { to: "/dashboard", label: "Admin Panel" }
        : { to: "/login", label: "Login / Register" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <button className="absolute inset-0 bg-farm-900/40" aria-label="Close menu" onClick={close} />
      <div className="absolute inset-y-0 left-0 flex w-[84%] max-w-sm flex-col bg-cream-light shadow-lift">
        <div className="flex items-center justify-between border-b border-line p-4">
          <Logo compact />
          <button onClick={close} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream">
            <LuX className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 font-display font-semibold ${isActive ? "bg-farm-800 text-white" : "text-ink hover:bg-cream"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="m-4 flex items-center justify-center gap-2 rounded-xl bg-cream py-3 text-sm font-semibold text-farm-800">
          <LuPhone className="h-4 w-4" /> {SITE.phone}
        </a>
      </div>
    </div>
  );
}
