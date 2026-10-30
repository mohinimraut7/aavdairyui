// Business + storefront configuration.
// Every business-specific value can be overridden from .env (VITE_*), so the
// real phone / email / address are never hard-coded into components.
// NOTE: the defaults below are the placeholder values from the UI reference —
// replace them with the farm's real details before going live.

const env = import.meta.env;

// Same backend as the admin panel (VITE_API_URL in .env).
export const API_BASE_URL = env.VITE_API_URL || env.VITE_API_BASE_URL || "http://localhost:5007/api";

export const SITE = {
  name: "AAV Desi Cattle Breeding Dairy Farm",
  shortName: "AAV Dairy Farm",
  tagline: "Pure Milk • Healthy Life • Stronger Tomorrow",
  logo: "/images/aav-dairy-logo.png",

  phone: env.VITE_CONTACT_PHONE || "+91 98765 43210",
  email: env.VITE_CONTACT_EMAIL || "support@aavdairyfarm.com",
  whatsapp: env.VITE_WHATSAPP_NUMBER || "", // digits only, e.g. 919876543210 — hidden when empty
  address: env.VITE_FARM_ADDRESS || "Vasai Virar, Maharashtra",
  hours: env.VITE_BUSINESS_HOURS || "Mon – Sat : 8 AM – 8 PM",
  mapEmbedUrl: env.VITE_MAP_EMBED_URL || "", // Google Maps "embed" URL — hidden when empty
  serviceArea: "Vasai Virar & Nearby",

  social: {
    facebook: env.VITE_FACEBOOK_URL || "",
    instagram: env.VITE_INSTAGRAM_URL || "",
    youtube: env.VITE_YOUTUBE_URL || "",
  },
};

// Fallback delivery policy. The live values come from GET /api/shop/config
// (the server always recalculates the order total — these are display only).
export const DEFAULT_STORE_CONFIG = {
  currency: "INR",
  freeDeliveryThreshold: 499,
  deliveryFee: 30,
  codEnabled: true,
  onlinePaymentEnabled: false,
  razorpayKeyId: env.VITE_RAZORPAY_KEY_ID || "",
  serviceablePincodePrefixes: ["4012", "4013"],
  deliverySlots: ["Morning (6 AM – 9 AM)", "Evening (5 PM – 8 PM)"],
};
