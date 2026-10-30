// import { useState, useEffect } from "react";
// import { Plus, Truck } from "lucide-react";
// import Modal from "../../components/Modal";
// import { getSuppliers, createSupplier } from "../../api/masterData";

// const emptyForm = {
//   name: "", type: "Feed", contactPerson: "", phone: "", email: "", address: "",
// };

// export default function SupplierMaster() {
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await getSuppliers();
//       setSuppliers(res.data || []);
//     } catch (err) {
//       console.error("Failed to load suppliers", err);
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
//       await createSupplier(form);
//       await load();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save supplier");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
//   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">🚚 Supplier Master</h2>
//           <p className="text-sm text-gray-400">{suppliers.length} suppliers registered</p>
//         </div>
//         <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
//           <Plus size={18} /> Add Supplier
//         </button>
//       </div>

//       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//         {loading ? (
//           <div className="text-center py-12 text-gray-400">Loading...</div>
//         ) : suppliers.length === 0 ? (
//           <div className="text-center py-12 text-gray-400"><Truck className="mx-auto mb-2" size={28} />No suppliers registered yet.</div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                 <th className="px-5 py-3 font-medium">Name</th>
//                 <th className="px-5 py-3 font-medium">Type</th>
//                 <th className="px-5 py-3 font-medium">Contact Person</th>
//                 <th className="px-5 py-3 font-medium">Phone</th>
//                 <th className="px-5 py-3 font-medium">Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {suppliers.map((s) => (
//                 <tr key={s._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
//                   <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{s.type}</td>
//                   <td className="px-5 py-3 text-gray-500">{s.contactPerson || "—"}</td>
//                   <td className="px-5 py-3 text-gray-500">{s.phone || "—"}</td>
//                   <td className="px-5 py-3 text-gray-500">{s.email || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Supplier">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Supplier Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Patil Feed Suppliers" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Type</label>
//             <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
//               <option>Medicine</option>
//               <option>Feed</option>
//               <option>Veterinary Doctor</option>
//               <option>Packaging</option>
//               <option>Equipment</option>
//               <option>Transporter</option>
//             </select>
//           </div>
//           <div>
//             <label className={labelClass}>Contact Person</label>
//             <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="e.g. Ramesh Patil" className={inputClass} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Phone</label>
//               <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" className={inputClass} />
//             </div>
//             <div>
//               <label className={labelClass}>Email</label>
//               <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. contact@feed.com" className={inputClass} />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Address</label>
//             <input name="address" value={form.address} onChange={handleChange} placeholder="e.g. Kolhapur, Maharashtra" className={inputClass} />
//           </div>
//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Supplier"}
//             </button>
//             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Plus, Truck } from "lucide-react";
import Modal from "../../components/Modal";
import { getSuppliers, createSupplier } from "../../api/masterData";
import { can } from "../../utils/permissions";

const emptyForm = {
  name: "", type: "Feed", contactPerson: "", phone: "", email: "", address: "",
};

export default function SupplierMaster() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getSuppliers();
      setSuppliers(res.data || []);
    } catch (err) {
      console.error("Failed to load suppliers", err);
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
      await createSupplier(form);
      await load();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save supplier");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🚚 Supplier Master</h2>
          <p className="text-sm text-gray-400">{suppliers.length} suppliers registered</p>
        </div>
        {can("suppliers", "create") && (
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
            <Plus size={18} /> Add Supplier
          </button>
        )}
      </div>

      <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : suppliers.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><Truck className="mx-auto mb-2" size={28} />No suppliers registered yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Contact Person</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{s.name}</td>
                  <td className="px-5 py-3 text-gray-500">{s.type}</td>
                  <td className="px-5 py-3 text-gray-500">{s.contactPerson || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{s.phone || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{s.email || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Supplier">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Supplier Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Patil Feed Suppliers" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              <option>Medicine</option>
              <option>Feed</option>
              <option>Veterinary Doctor</option>
              <option>Packaging</option>
              <option>Equipment</option>
              <option>Transporter</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Contact Person</label>
            <input name="contactPerson" value={form.contactPerson} onChange={handleChange} placeholder="e.g. Ramesh Patil" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="e.g. 9876543210" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. contact@feed.com" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="e.g. Kolhapur, Maharashtra" className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Supplier"}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
