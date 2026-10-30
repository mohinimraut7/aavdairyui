// URL prefixes that belong to the farm admin panel. Everything else is the online store.
const ADMIN_PREFIXES = [
  "/admin", "/login", "/register", "/dashboard", "/animals", "/breeding", "/vaccination",
  "/medical", "/milk", "/feed", "/calves", "/reports", "/master", "/store",
];

export const isAdminPath = (pathname) =>
  ADMIN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
