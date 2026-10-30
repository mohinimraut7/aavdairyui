export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(String(v || "").replace(/\D/g, "").slice(-10));
export const isValidEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isValidPincode = (v) => /^\d{6}$/.test(String(v || ""));
export const normalizePhone = (v) => String(v || "").replace(/\D/g, "").slice(-10);

export const isServiceablePincode = (pin, prefixes = []) =>
  isValidPincode(pin) && (!prefixes.length || prefixes.some((p) => String(pin).startsWith(p)));
