// // import { useState, useEffect } from "react";
// // import { Plus, ShieldAlert } from "lucide-react";
// // import Modal from "../../components/Modal";
// // import { getDiseases, createDisease } from "../../api/masterData";

// // const emptyForm = {
// //   name: "", symptoms: "", causes: "", treatment: "",
// //   requiresIsolation: false, recoveryTime: "", preventiveMeasures: "",
// // };

// // export default function DiseaseMaster() {
// //   const [diseases, setDiseases] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [form, setForm] = useState(emptyForm);
// //   const [saving, setSaving] = useState(false);

// //   const load = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getDiseases();
// //       setDiseases(res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load diseases", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => { load(); }, []);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     try {
// //       await createDisease(form);
// //       await load();
// //       setShowModal(false);
// //       setForm(emptyForm);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save disease");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
// //   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

// //   return (
// //     <div>
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h2 className="text-xl font-bold text-gray-800">🦠 Disease Master</h2>
// //           <p className="text-sm text-gray-400">{diseases.length} diseases registered</p>
// //         </div>
// //         <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
// //           <Plus size={18} /> Add Disease
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //         {loading ? (
// //           <div className="text-center py-12 text-gray-400">Loading...</div>
// //         ) : diseases.length === 0 ? (
// //           <div className="text-center py-12 text-gray-400"><ShieldAlert className="mx-auto mb-2" size={28} />No diseases registered yet.</div>
// //         ) : (
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                 <th className="px-5 py-3 font-medium">Name</th>
// //                 <th className="px-5 py-3 font-medium">Symptoms</th>
// //                 <th className="px-5 py-3 font-medium">Treatment</th>
// //                 <th className="px-5 py-3 font-medium">Isolation Required</th>
// //                 <th className="px-5 py-3 font-medium">Recovery Time</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {diseases.map((d) => (
// //                 <tr key={d._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
// //                   <td className="px-5 py-3 font-medium text-gray-800">{d.name}</td>
// //                   <td className="px-5 py-3 text-gray-500">{d.symptoms || "—"}</td>
// //                   <td className="px-5 py-3 text-gray-500">{d.treatment || "—"}</td>
// //                   <td className="px-5 py-3">
// //                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${d.requiresIsolation ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"}`}>
// //                       {d.requiresIsolation ? "Yes" : "No"}
// //                     </span>
// //                   </td>
// //                   <td className="px-5 py-3 text-gray-500">{d.recoveryTime || "—"}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Disease">
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className={labelClass}>Disease Name</label>
// //             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Mastitis" className={inputClass} required />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Symptoms</label>
// //             <input name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="e.g. Swollen udder, reduced milk" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Causes</label>
// //             <input name="causes" value={form.causes} onChange={handleChange} placeholder="e.g. Bacterial infection" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Treatment</label>
// //             <input name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g. Intramammary antibiotic" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Recovery Time</label>
// //             <input name="recoveryTime" value={form.recoveryTime} onChange={handleChange} placeholder="e.g. 5-7 days" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Preventive Measures</label>
// //             <input name="preventiveMeasures" value={form.preventiveMeasures} onChange={handleChange} placeholder="e.g. Regular udder hygiene" className={inputClass} />
// //           </div>
// //           <label className="flex items-center gap-2 text-sm text-gray-600">
// //             <input type="checkbox" name="requiresIsolation" checked={form.requiresIsolation} onChange={handleChange} className="rounded-sm" />
// //             Requires isolation / quarantine
// //           </label>
// //           <div className="flex gap-3 pt-2">
// //             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
// //               {saving ? "Saving..." : "Save Disease"}
// //             </button>
// //             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }



// import { useState, useEffect } from "react";
// import { Plus, ShieldAlert } from "lucide-react";
// import Modal from "../../components/Modal";
// import { getDiseases, createDisease } from "../../api/masterData";
// import { can } from "../../utils/permissions";

// const emptyForm = {
//   name: "", symptoms: "", causes: "", treatment: "",
//   requiresIsolation: false, recoveryTime: "", preventiveMeasures: "",
// };

// export default function DiseaseMaster() {
//   const [diseases, setDiseases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const res = await getDiseases();
//       setDiseases(res.data || []);
//     } catch (err) {
//       console.error("Failed to load diseases", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { load(); }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({ ...form, [name]: type === "checkbox" ? checked : value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createDisease(form);
//       await load();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save disease");
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
//           <h2 className="text-xl font-bold text-gray-800">🦠 Disease Master</h2>
//           <p className="text-sm text-gray-400">{diseases.length} diseases registered</p>
//         </div>
//         {can("diseases", "create") && (
//           <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
//             <Plus size={18} /> Add Disease
//           </button>
//         )}
//       </div>

//       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//         {loading ? (
//           <div className="text-center py-12 text-gray-400">Loading...</div>
//         ) : diseases.length === 0 ? (
//           <div className="text-center py-12 text-gray-400"><ShieldAlert className="mx-auto mb-2" size={28} />No diseases registered yet.</div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                 <th className="px-5 py-3 font-medium">Name</th>
//                 <th className="px-5 py-3 font-medium">Symptoms</th>
//                 <th className="px-5 py-3 font-medium">Treatment</th>
//                 <th className="px-5 py-3 font-medium">Isolation Required</th>
//                 <th className="px-5 py-3 font-medium">Recovery Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {diseases.map((d) => (
//                 <tr key={d._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
//                   <td className="px-5 py-3 font-medium text-gray-800">{d.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{d.symptoms || "—"}</td>
//                   <td className="px-5 py-3 text-gray-500">{d.treatment || "—"}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${d.requiresIsolation ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"}`}>
//                       {d.requiresIsolation ? "Yes" : "No"}
//                     </span>
//                   </td>
//                   <td className="px-5 py-3 text-gray-500">{d.recoveryTime || "—"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Disease">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Disease Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Mastitis" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Symptoms</label>
//             <input name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="e.g. Swollen udder, reduced milk" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Causes</label>
//             <input name="causes" value={form.causes} onChange={handleChange} placeholder="e.g. Bacterial infection" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Treatment</label>
//             <input name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g. Intramammary antibiotic" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Recovery Time</label>
//             <input name="recoveryTime" value={form.recoveryTime} onChange={handleChange} placeholder="e.g. 5-7 days" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Preventive Measures</label>
//             <input name="preventiveMeasures" value={form.preventiveMeasures} onChange={handleChange} placeholder="e.g. Regular udder hygiene" className={inputClass} />
//           </div>
//           <label className="flex items-center gap-2 text-sm text-gray-600">
//             <input type="checkbox" name="requiresIsolation" checked={form.requiresIsolation} onChange={handleChange} className="rounded-sm" />
//             Requires isolation / quarantine
//           </label>
//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Disease"}
//             </button>
//             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Plus, ShieldAlert } from "lucide-react";
import Modal from "../../components/Modal";
import { getDiseases, createDisease } from "../../api/masterData";
import { can } from "../../utils/permissions";

const emptyForm = {
  name: "", symptoms: "", causes: "", treatment: "",
  requiresIsolation: false, recoveryTime: "", preventiveMeasures: "",
};

export default function DiseaseMaster() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getDiseases();
      setDiseases(res.data || []);
    } catch (err) {
      console.error("Failed to load diseases", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createDisease(form);
      await load();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save disease");
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
          <h2 className="text-xl font-bold text-gray-800">🦠 Disease Master</h2>
          <p className="text-sm text-gray-400">{diseases.length} diseases registered</p>
        </div>
        {can("diseases", "create") && (
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
            <Plus size={18} /> Add Disease
          </button>
        )}
      </div>

      <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : diseases.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><ShieldAlert className="mx-auto mb-2" size={28} />No diseases registered yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Symptoms</th>
                <th className="px-5 py-3 font-medium">Treatment</th>
                <th className="px-5 py-3 font-medium">Isolation Required</th>
                <th className="px-5 py-3 font-medium">Recovery Time</th>
              </tr>
            </thead>
            <tbody>
              {diseases.map((d) => (
                <tr key={d._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{d.name}</td>
                  <td className="px-5 py-3 text-gray-500">{d.symptoms || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{d.treatment || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${d.requiresIsolation ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500"}`}>
                      {d.requiresIsolation ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">{d.recoveryTime || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Disease">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Disease Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Mastitis" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Symptoms</label>
            <input name="symptoms" value={form.symptoms} onChange={handleChange} placeholder="e.g. Swollen udder, reduced milk" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Causes</label>
            <input name="causes" value={form.causes} onChange={handleChange} placeholder="e.g. Bacterial infection" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Treatment</label>
            <input name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g. Intramammary antibiotic" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Recovery Time</label>
            <input name="recoveryTime" value={form.recoveryTime} onChange={handleChange} placeholder="e.g. 5-7 days" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Preventive Measures</label>
            <input name="preventiveMeasures" value={form.preventiveMeasures} onChange={handleChange} placeholder="e.g. Regular udder hygiene" className={inputClass} />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" name="requiresIsolation" checked={form.requiresIsolation} onChange={handleChange} className="rounded-sm" />
            Requires isolation / quarantine
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Disease"}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}