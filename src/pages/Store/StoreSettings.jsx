import { useEffect, useState } from "react";
import { getShopSettings, updateShopSettings } from "../../api/store";

export default function StoreSettings() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getShopSettings()
      .then((r) => setForm({
        ...r.data,
        serviceablePincodePrefixes: (r.data.serviceablePincodePrefixes || []).join(", "),
        deliverySlots: (r.data.deliverySlots || []).join("\n"),
      }))
      .catch((err) => alert(err.response?.data?.message || "Failed to load settings"));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateShopSettings({
        freeDeliveryThreshold: Number(form.freeDeliveryThreshold),
        deliveryFee: Number(form.deliveryFee),
        codEnabled: form.codEnabled,
        serviceablePincodePrefixes: form.serviceablePincodePrefixes.split(",").map((s) => s.trim()).filter(Boolean),
        deliverySlots: form.deliverySlots.split("\n").map((s) => s.trim()).filter(Boolean),
      });
      alert("Store settings saved");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div className="text-center py-12 text-gray-400">Loading...</div>;
  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">⚙️ Store Settings</h2>
        <p className="text-sm text-gray-400">Delivery charges, delivery areas and slots for the customer website</p>
      </div>
      <form onSubmit={save} className="bg-white rounded-[20px] shadow-xs p-6 max-w-xl space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelClass}>Free delivery above (₹)</label><input type="number" min="0" value={form.freeDeliveryThreshold} onChange={set("freeDeliveryThreshold")} className={inputClass} /></div>
          <div><label className={labelClass}>Delivery fee (₹)</label><input type="number" min="0" value={form.deliveryFee} onChange={set("deliveryFee")} className={inputClass} /></div>
        </div>
        <div>
          <label className={labelClass}>Delivery PIN code prefixes (comma separated)</label>
          <input value={form.serviceablePincodePrefixes} onChange={set("serviceablePincodePrefixes")} className={inputClass} placeholder="4012, 4013" />
          <p className="text-xs text-gray-400 mt-1">“4012” allows every PIN starting with 4012 (e.g. 401202). Use full 6-digit codes for exact areas.</p>
        </div>
        <div>
          <label className={labelClass}>Delivery slots (one per line)</label>
          <textarea rows={3} value={form.deliverySlots} onChange={set("deliverySlots")} className={inputClass} />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" checked={form.codEnabled} onChange={set("codEnabled")} /> Allow Cash on Delivery</label>
        <p className="text-xs text-gray-400">Online payments switch on automatically when RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set on the server.</p>
        <button disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-semibold hover:bg-farm-green-dark disabled:opacity-60">{saving ? "Saving..." : "Save Settings"}</button>
      </form>
    </div>
  );
}
