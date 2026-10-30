import { useEffect, useState } from "react";
import { Plus, Pencil, Store, EyeOff, Eye, ImagePlus } from "lucide-react";
import Modal from "../../components/Modal";
import { getShopProducts, createShopProduct, updateShopProduct, shopImageUrl } from "../../api/store";

const CATEGORIES = [
  { value: "milk", label: "Fresh Milk" },
  { value: "paneer", label: "Paneer & Cheese" },
  { value: "ghee", label: "Desi Ghee" },
  { value: "curd", label: "Curd & Dairy" },
];

const emptyForm = {
  name: "", category: "milk", packageSize: "", sku: "", price: "", salePrice: "", stockQuantity: "",
  description: "", highlights: "", ingredients: "", storage: "", image: "", isFeatured: false, isActive: true,
};

const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

// Shrink an uploaded photo to max 900px JPEG so the request stays small.
const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 900 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

export default function StoreProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | product
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getShopProducts();
      setProducts(res.data || []);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing("new"); };
  const openEdit = (p) => {
    setForm({
      ...emptyForm, ...p,
      salePrice: p.salePrice ?? "",
      highlights: (p.highlights || []).join(", "),
      image: p.images?.[0] || "",
    });
    setEditing(p);
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await fileToDataUrl(file);
      setForm((f) => ({ ...f, image: data }));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(), category: form.category, packageSize: form.packageSize.trim(), sku: form.sku.trim() || undefined,
      price: Number(form.price), salePrice: form.salePrice === "" ? null : Number(form.salePrice),
      stockQuantity: Number(form.stockQuantity || 0), description: form.description, ingredients: form.ingredients, storage: form.storage,
      highlights: form.highlights.split(",").map((h) => h.trim()).filter(Boolean).slice(0, 5),
      images: form.image ? [form.image] : [], isFeatured: form.isFeatured, isActive: form.isActive,
    };
    try {
      if (editing === "new") await createShopProduct(payload);
      else await updateShopProduct(editing._id, payload);
      setEditing(null);
      await load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (p) => {
    await updateShopProduct(p._id, { isActive: !p.isActive });
    load();
  };

  const quickStock = async (p, value) => {
    const n = Number(value);
    if (Number.isNaN(n) || n < 0 || n === p.stockQuantity) return;
    await updateShopProduct(p._id, { stockQuantity: n });
    load();
  };

  const shown = products.filter((p) => !filter || p.category === filter);
  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🛒 Store Products</h2>
          <p className="text-sm text-gray-400">Prices, stock and photos shown on the customer website</p>
        </div>
        <div className="flex gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${inputClass} w-auto`}>
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <button onClick={openNew} className="flex items-center gap-2 whitespace-nowrap bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-xs overflow-x-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : shown.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><Store className="mx-auto mb-2" size={28} />No products yet. Run <code>npm run seed:shop</code> on the server or add one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Product</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Sold</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((p) => (
                <tr key={p._id} className="border-b border-gray-50 last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={shopImageUrl(p.images?.[0])} alt="" className="w-11 h-11 rounded-xl object-cover bg-farm-cream" />
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.packageSize}{p.sku ? ` · ${p.sku}` : ""}{p.isFeatured ? " · ⭐ Best seller" : ""}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{CATEGORIES.find((c) => c.value === p.category)?.label}</td>
                  <td className="px-5 py-3 font-semibold">
                    {p.salePrice != null ? <>{inr(p.salePrice)} <span className="text-xs text-gray-400 line-through">{inr(p.price)}</span></> : inr(p.price)}
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="number" min="0" defaultValue={p.stockQuantity} key={p.stockQuantity}
                      onBlur={(e) => quickStock(p, e.target.value)}
                      className={`w-20 px-2 py-1 rounded-xl border text-sm ${p.stockQuantity <= 5 ? "border-red-200 bg-red-50 text-red-600" : "border-gray-200"}`}
                      aria-label={`Stock for ${p.name}`}
                    />
                  </td>
                  <td className="px-5 py-3 text-gray-600">{p.soldCount || 0}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.isActive ? "bg-farm-cream text-farm-green" : "bg-gray-100 text-gray-500"}`}>
                      {p.isActive ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-xl text-gray-500 hover:bg-farm-cream hover:text-farm-green" title="Edit"><Pencil size={16} /></button>
                      <button onClick={() => toggleActive(p)} className="p-2 rounded-xl text-gray-500 hover:bg-farm-cream" title={p.isActive ? "Hide from website" : "Show on website"}>
                        {p.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={Boolean(editing)} onClose={() => setEditing(null)} title={editing === "new" ? "Add Store Product" : "Edit Store Product"}>
        <form onSubmit={submit} className="space-y-4">
          <div><label className={labelClass}>Product name *</label><input name="name" required value={form.name} onChange={onChange} className={inputClass} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Category *</label>
              <select name="category" value={form.category} onChange={onChange} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Pack size *</label><input name="packageSize" required placeholder="1 Litre / 200 g" value={form.packageSize} onChange={onChange} className={inputClass} /></div>
            <div><label className={labelClass}>Price (₹) *</label><input name="price" type="number" min="0" required value={form.price} onChange={onChange} className={inputClass} /></div>
            <div><label className={labelClass}>Offer price (₹)</label><input name="salePrice" type="number" min="0" value={form.salePrice} onChange={onChange} className={inputClass} /></div>
            <div><label className={labelClass}>Stock qty</label><input name="stockQuantity" type="number" min="0" value={form.stockQuantity} onChange={onChange} className={inputClass} /></div>
            <div><label className={labelClass}>SKU</label><input name="sku" value={form.sku} onChange={onChange} className={inputClass} /></div>
          </div>
          <div>
            <label className={labelClass}>Photo</label>
            <div className="flex items-center gap-3">
              {form.image && <img src={shopImageUrl(form.image)} alt="" className="w-16 h-16 rounded-xl object-cover" />}
              <label className="flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-2xl border border-dashed border-gray-300 text-sm text-gray-500 hover:border-farm-green">
                <ImagePlus size={16} /> Upload
                <input type="file" accept="image/*" onChange={onFile} className="hidden" />
              </label>
            </div>
            <input name="image" placeholder="…or paste an image URL" value={form.image.startsWith("data:") ? "" : form.image} onChange={onChange} className={`${inputClass} mt-2`} />
          </div>
          <div><label className={labelClass}>Highlights (comma separated, max 5)</label><input name="highlights" value={form.highlights} onChange={onChange} className={inputClass} /></div>
          <div><label className={labelClass}>Description</label><textarea name="description" rows={3} value={form.description} onChange={onChange} className={inputClass} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelClass}>Ingredients</label><input name="ingredients" value={form.ingredients} onChange={onChange} className={inputClass} /></div>
            <div><label className={labelClass}>Storage</label><input name="storage" value={form.storage} onChange={onChange} className={inputClass} /></div>
          </div>
          <div className="flex gap-5 text-sm text-gray-600">
            <label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={onChange} /> Best seller</label>
            <label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={form.isActive} onChange={onChange} /> Show on website</label>
          </div>
          <button disabled={saving} className="w-full bg-farm-green text-white py-3 rounded-2xl text-sm font-semibold hover:bg-farm-green-dark disabled:opacity-60">
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
