// import { useState, useEffect } from "react";
// import { Plus, Pill, AlertTriangle } from "lucide-react";
// import Modal from "../../components/Modal";
// import { getMedicines, createMedicine } from "../../api/masterData";

// const emptyForm = {
//   name: "", genericName: "", type: "", purpose: "", dosage: "",
//   stock: "", minStock: "", expiryDate: "", batchNumber: "", manufacturer: "",
// };

// const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// export default function MedicineInventory() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await getMedicines();
//       setMedicines(res.data || []);
//     } catch (err) {
//       console.error("Failed to load medicines", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(); }, []);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createMedicine(form);
//       await load();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save medicine");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const isLowStock = (m) => m.minStock && m.stock <= m.minStock;
//   const isExpiringSoon = (m) => {
//     if (!m.expiryDate) return false;
//     const days = Math.ceil((new Date(m.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
//     return days <= 30;
//   };

//   const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
//   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">💊 Medicine Inventory</h2>
//           <p className="text-sm text-gray-400">{medicines.length} medicines in stock</p>
//         </div>
//         <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
//           <Plus size={18} /> Add Medicine
//         </button>
//       </div>

//       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//         {loading ? (
//           <div className="text-center py-12 text-gray-400">Loading...</div>
//         ) : medicines.length === 0 ? (
//           <div className="text-center py-12 text-gray-400"><Pill className="mx-auto mb-2" size={28} />No medicines in stock yet.</div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                 <th className="px-5 py-3 font-medium">Name</th>
//                 <th className="px-5 py-3 font-medium">Type</th>
//                 <th className="px-5 py-3 font-medium">Stock</th>
//                 <th className="px-5 py-3 font-medium">Expiry</th>
//                 <th className="px-5 py-3 font-medium">Batch</th>
//                 <th className="px-5 py-3 font-medium">Alerts</th>
//               </tr>
//             </thead>
//             <tbody>
//               {medicines.map((m) => (
//                 <tr key={m._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
//                   <td className="px-5 py-3 font-medium text-gray-800">{m.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{m.type || "—"}</td>
//                   <td className="px-5 py-3 text-gray-500">{m.stock}</td>
//                   <td className="px-5 py-3 text-gray-500">{fmt(m.expiryDate) || "—"}</td>
//                   <td className="px-5 py-3 text-gray-500">{m.batchNumber || "—"}</td>
//                   <td className="px-5 py-3">
//                     <div className="flex gap-1.5">
//                       {isLowStock(m) && (
//                         <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
//                           <AlertTriangle size={12} /> Low
//                         </span>
//                       )}
//                       {isExpiringSoon(m) && (
//                         <span className="text-xs text-farm-golden bg-farm-golden/10 px-2 py-1 rounded-full">Expiring</span>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Medicine">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Medicine Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Albendazole" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Generic Name</label>
//             <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="e.g. Albendazole" className={inputClass} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Type</label>
//               <input name="type" value={form.type} onChange={handleChange} placeholder="e.g. Antibiotic" className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Dosage</label>
//               <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="e.g. 10ml oral" className={inputClass} />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Current Stock</label>
//               <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 50" className={inputClass} required />
//             </div>
//             <div>
//               <label className={labelClass}>Low Stock Threshold</label>
//               <input type="number" name="minStock" value={form.minStock} onChange={handleChange} placeholder="e.g. 10" className={inputClass} />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Expiry Date</label>
//               <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Batch Number</label>
//               <input name="batchNumber" value={form.batchNumber} onChange={handleChange} placeholder="e.g. B2026-045" className={inputClass} />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Manufacturer</label>
//             <input name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="e.g. Zydus" className={inputClass} />
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Medicine"}
//             </button>
//             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Plus, Pill, AlertTriangle } from "lucide-react";
import Modal from "../../components/Modal";
import { getMedicines, createMedicine } from "../../api/masterData";
import { can } from "../../utils/permissions";

const emptyForm = {
  name: "", genericName: "", type: "", purpose: "", dosage: "",
  stock: "", minStock: "", expiryDate: "", batchNumber: "", manufacturer: "",
};

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

export default function MedicineInventory() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getMedicines();
      setMedicines(res.data || []);
    } catch (err) {
      console.error("Failed to load medicines", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createMedicine(form);
      await load();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save medicine");
    } finally {
      setSaving(false);
    }
  };

  const isLowStock = (m) => m.minStock && m.stock <= m.minStock;
  const isExpiringSoon = (m) => {
    if (!m.expiryDate) return false;
    const days = Math.ceil((new Date(m.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days <= 30;
  };

  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">💊 Medicine Inventory</h2>
          <p className="text-sm text-gray-400">{medicines.length} medicines in stock</p>
        </div>
        {can("medicines", "create") && (
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
            <Plus size={18} /> Add Medicine
          </button>
        )}
      </div>

      <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : medicines.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><Pill className="mx-auto mb-2" size={28} />No medicines in stock yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Stock</th>
                <th className="px-5 py-3 font-medium">Expiry</th>
                <th className="px-5 py-3 font-medium">Batch</th>
                <th className="px-5 py-3 font-medium">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m) => (
                <tr key={m._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{m.name}</td>
                  <td className="px-5 py-3 text-gray-500">{m.type || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{m.stock}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(m.expiryDate) || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{m.batchNumber || "—"}</td>
                  <td className="px-5 py-3">
                    <div className="flex gap-1.5">
                      {isLowStock(m) && (
                        <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                          <AlertTriangle size={12} /> Low
                        </span>
                      )}
                      {isExpiringSoon(m) && (
                        <span className="text-xs text-farm-golden bg-farm-golden/10 px-2 py-1 rounded-full">Expiring</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Medicine">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Medicine Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Albendazole" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Generic Name</label>
            <input name="genericName" value={form.genericName} onChange={handleChange} placeholder="e.g. Albendazole" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Type</label>
              <input name="type" value={form.type} onChange={handleChange} placeholder="e.g. Antibiotic" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Dosage</label>
              <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="e.g. 10ml oral" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current Stock</label>
              <input type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="e.g. 50" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Low Stock Threshold</label>
              <input type="number" name="minStock" value={form.minStock} onChange={handleChange} placeholder="e.g. 10" className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Expiry Date</label>
              <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Batch Number</label>
              <input name="batchNumber" value={form.batchNumber} onChange={handleChange} placeholder="e.g. B2026-045" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Manufacturer</label>
            <input name="manufacturer" value={form.manufacturer} onChange={handleChange} placeholder="e.g. Zydus" className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Medicine"}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

