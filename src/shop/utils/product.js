import { categoryName } from "../data/catalog";
import { API_BASE_URL } from "../config/site";

// Admin uploads may be absolute URLs, data URIs, server-relative "/uploads/.."
// paths or bundled "/images/.." paths — resolve each to something <img> can load.
const SERVER_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export const productImage = (product, index = 0) => {
  const src = product?.images?.[index] || product?.image;
  if (!src) return "/images/a2-cow-milk.webp";
  if (/^(https?:|data:|blob:)/.test(src) || src.startsWith("/images/")) return src;
  if (src.startsWith("/")) return `${SERVER_ORIGIN}${src}`;
  return src;
};

export const effectivePrice = (product) =>
  product?.salePrice && product.salePrice < product.price ? product.salePrice : product?.price || 0;

export const productId = (product) => product?._id || product?.slug;

export const isInStock = (product) => (product?.stockQuantity ?? 1) > 0;

export const matchProduct = (p, q) => {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return [p.name, p.category, categoryName(p.category), p.packageSize, ...(p.highlights || [])]
    .join(" ")
    .toLowerCase()
    .includes(s);
};
