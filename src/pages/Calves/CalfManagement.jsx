// // import { useState, useEffect } from "react";
// // import { Plus, PawPrint } from "lucide-react";
// // import Modal from "../../components/Modal";
// // import { getAnimals } from "../../api/animals";
// // import { getCalves, createCalf } from "../../api/calves";

// // const statusColor = {
// //   "Not Weaned": "bg-farm-golden/10 text-farm-golden",
// //   Weaned: "bg-farm-green/10 text-farm-green",
// // };

// // const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// // const emptyForm = {
// //   tag: "", name: "", damId: "", sireInfo: "", gender: "Female",
// //   dob: "", weight: "", weaningStatus: "Not Weaned",
// // };

// // export default function CalfManagement() {
// //   const [calves, setCalves] = useState([]);
// //   const [animals, setAnimals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [showModal, setShowModal] = useState(false);
// //   const [form, setForm] = useState(emptyForm);
// //   const [saving, setSaving] = useState(false);

// //   const loadCalves = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getCalves();
// //       setCalves(res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load calves", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadCalves();
// //     getAnimals()
// //       .then((res) => setAnimals(res.data || []))
// //       .catch((err) => console.error("Failed to load animals", err));
// //   }, []);

// //   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     try {
// //       await createCalf(form);
// //       await loadCalves();
// //       setShowModal(false);
// //       setForm(emptyForm);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save calf");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const inputClass =
// //     "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
// //   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

// //   return (
// //     <div>
// //       <div className="flex items-center justify-between mb-6">
// //         <div>
// //           <h2 className="text-xl font-bold text-gray-800">🐄 Calf Management</h2>
// //           <p className="text-sm text-gray-400">{calves.length} calves on record</p>
// //         </div>
// //         <button
// //           onClick={() => setShowModal(true)}
// //           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
// //         >
// //           <Plus size={18} /> Add Calf
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //         {loading ? (
// //           <div className="text-center py-12 text-gray-400">Loading...</div>
// //         ) : calves.length === 0 ? (
// //           <div className="text-center py-12 text-gray-400">
// //             <PawPrint className="mx-auto mb-2" size={28} />
// //             No calves on record yet.
// //           </div>
// //         ) : (
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                 <th className="px-5 py-3 font-medium">Tag</th>
// //                 <th className="px-5 py-3 font-medium">Name</th>
// //                 <th className="px-5 py-3 font-medium">Species</th>
// //                 <th className="px-5 py-3 font-medium">Gender</th>
// //                 <th className="px-5 py-3 font-medium">Dam (Mother)</th>
// //                 <th className="px-5 py-3 font-medium">Sire</th>
// //                 <th className="px-5 py-3 font-medium">DOB</th>
// //                 <th className="px-5 py-3 font-medium">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {calves.map((c) => (
// //                 <tr key={c._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
// //                   <td className="px-5 py-3 text-gray-700">{c.tag}</td>
// //                   <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
// //                   <td className="px-5 py-3 text-gray-500">{c.species}</td>
// //                   <td className="px-5 py-3 text-gray-500">{c.gender}</td>
// //                   <td className="px-5 py-3 text-gray-500">{c.damName}</td>
// //                   <td className="px-5 py-3 text-gray-500">{c.sireInfo}</td>
// //                   <td className="px-5 py-3 text-gray-500">{fmt(c.dob)}</td>
// //                   <td className="px-5 py-3">
// //                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus]}`}>
// //                       {c.weaningStatus}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>

// //       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Calf">
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className={labelClass}>Tag Number</label>
// //             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-CF-03" className={inputClass} required />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Name</label>
// //             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ganesh" className={inputClass} required />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Dam (Mother)</label>
// //             <select name="damId" value={form.damId} onChange={handleChange} className={inputClass} required>
// //               <option value="">Select mother</option>
// //               {animals.filter((a) => a.gender === "Female").map((a) => (
// //                 <option key={a._id} value={a._id}>{a.name} ({a.tag})</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label className={labelClass}>Sire Info</label>
// //             <input name="sireInfo" value={form.sireInfo} onChange={handleChange} placeholder="e.g. Murrah Elite #4521 (AI) or Local Bull" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Gender</label>
// //             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
// //               <option>Female</option>
// //               <option>Male</option>
// //             </select>
// //           </div>
// //           <div>
// //             <label className={labelClass}>Date of Birth</label>
// //             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} required />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Birth Weight (kg)</label>
// //             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 28" className={inputClass} />
// //           </div>
// //           <div>
// //             <label className={labelClass}>Weaning Status</label>
// //             <select name="weaningStatus" value={form.weaningStatus} onChange={handleChange} className={inputClass}>
// //               <option>Not Weaned</option>
// //               <option>Weaned</option>
// //             </select>
// //           </div>

// //           <div className="flex gap-3 pt-2">
// //             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
// //               {saving ? "Saving..." : "Save Calf"}
// //             </button>
// //             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }















// import { useState, useEffect } from "react";
// import {
//   Plus, PawPrint, Search, Filter, LayoutGrid, List, User, Weight,
//   Calendar, HeartPulse, ArrowRight,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Modal from "../../components/Modal";
// import { getAnimals } from "../../api/animals";
// import { getCalves, createCalf } from "../../api/calves";

// const statusColor = {
//   "Not Weaned": "bg-farm-golden/10 text-farm-golden",
//   Weaned: "bg-farm-green/10 text-farm-green",
// };

// const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// function getAge(dob) {
//   if (!dob) return "—";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "—";
//   const days = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24);
//   if (days < 60) return `${Math.floor(days)} days`;
//   const months = days / 30.44;
//   return `${months.toFixed(1)} months`;
// }

// const emptyForm = {
//   tag: "", name: "", damId: "", sireInfo: "", gender: "Female",
//   dob: "", weight: "", weaningStatus: "Not Weaned",
// };

// export default function CalfManagement() {
//   const [calves, setCalves] = useState([]);
//   const [animals, setAnimals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const loadCalves = async () => {
//     setLoading(true);
//     try {
//       const res = await getCalves();
//       setCalves(res.data || []);
//     } catch (err) {
//       console.error("Failed to load calves", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCalves();
//     getAnimals()
//       .then((res) => setAnimals(res.data || []))
//       .catch((err) => console.error("Failed to load animals", err));
//   }, []);

//   const filtered = calves.filter((c) => {
//     const matchesSearch =
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.tag.toLowerCase().includes(search.toLowerCase());
//     const matchesStatus = statusFilter === "All" || c.weaningStatus === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const totalCount = calves.length;
//   const weanedCount = calves.filter((c) => c.weaningStatus === "Weaned").length;
//   const notWeanedCount = calves.filter((c) => c.weaningStatus === "Not Weaned").length;

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createCalf(form);
//       await loadCalves();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save calf");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
//   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
//         <div className="flex items-center gap-3">
//           <h2 className="text-xl font-bold text-gray-800">Calf Management</h2>
//           <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
//             {totalCount} calves on record
//           </span>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//         >
//           <Plus size={18} /> Add Calf
//         </button>
//       </div>

//       {/* Search + filter + view toggle */}
//       <div className="bg-white rounded-[20px] p-5 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search by name or tag..."
//             className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
//           />
//         </div>

//         <div className="flex items-center gap-2 bg-farm-cream rounded-2xl px-3">
//           <Filter size={16} className="text-gray-400" />
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
//           >
//             <option value="All">All Calves</option>
//             <option>Not Weaned</option>
//             <option>Weaned</option>
//           </select>
//         </div>

//         <div className="flex items-center gap-1 bg-farm-cream rounded-2xl p-1">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded-xl transition-colors ${
//               viewMode === "grid" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
//             }`}
//             aria-label="Grid view"
//           >
//             <LayoutGrid size={18} />
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded-xl transition-colors ${
//               viewMode === "list" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
//             }`}
//             aria-label="List view"
//           >
//             <List size={18} />
//           </button>
//         </div>
//       </div>

//       {loading && (
//         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
//           Loading...
//         </div>
//       )}

//       {!loading && filtered.length === 0 && (
//         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
//           <PawPrint className="mx-auto mb-2" size={28} />
//           No calves on record yet.
//         </div>
//       )}

//       {/* Grid (card) view */}
//       {!loading && filtered.length > 0 && viewMode === "grid" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {filtered.map((c) => (
//             <div
//               key={c._id}
//               onClick={() => navigate(`/calves/${c._id}`)}
//               className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="relative h-40 bg-farm-cream flex items-center justify-center">
//                 <PawPrint size={36} className="text-gray-300" />
//                 <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
//                   {c.tag}
//                 </span>
//               </div>

//               <div className="p-5">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-gray-800 text-lg">{c.name}</h3>
//                   <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus] || "bg-gray-100 text-gray-500"}`}>
//                     {c.weaningStatus}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-4">
//                   {c.species} • {c.gender}
//                 </p>

//                 <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-50">
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <Calendar size={13} /> Age
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{getAge(c.dob)}</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <Weight size={13} /> Birth Weight
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{c.weight ? `${c.weight} kg` : "—"}</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <User size={13} /> Dam (Mother)
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{c.damName || "—"}</p>
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <HeartPulse size={13} /> Sire
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{c.sireInfo || "—"}</p>
//                   </div>
//                 </div>

//                 <div className="flex rounded-xl px-4 py-3 mt-4">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/calves/${c._id}`);
//                     }}
//                     className="ml-auto flex items-center gap-1 text-farm-green text-sm font-medium hover:underline"
//                   >
//                     View Details <ArrowRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* List (table) view */}
//       {!loading && filtered.length > 0 && viewMode === "list" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden mb-6">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                 <th className="px-5 py-3 font-medium">Tag</th>
//                 <th className="px-5 py-3 font-medium">Name</th>
//                 <th className="px-5 py-3 font-medium">Species</th>
//                 <th className="px-5 py-3 font-medium">Gender</th>
//                 <th className="px-5 py-3 font-medium">Dam (Mother)</th>
//                 <th className="px-5 py-3 font-medium">Sire</th>
//                 <th className="px-5 py-3 font-medium">DOB</th>
//                 <th className="px-5 py-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((c) => (
//                 <tr
//                   key={c._id}
//                   onClick={() => navigate(`/calves/${c._id}`)}
//                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20 cursor-pointer transition-colors"
//                 >
//                   <td className="px-5 py-3 text-gray-700">{c.tag}</td>
//                   <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.species}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.gender}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.damName}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.sireInfo}</td>
//                   <td className="px-5 py-3 text-gray-500">{fmt(c.dob)}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus]}`}>
//                       {c.weaningStatus}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Summary stats strip */}
//       {!loading && calves.length > 0 && (
//         <div className="bg-white rounded-[20px] shadow-xs grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
//           <div className="p-5 flex flex-col items-start gap-2">
//             <div className="w-11 h-11 rounded-full bg-farm-green/10 flex items-center justify-center">
//               <PawPrint size={20} className="text-farm-green" />
//             </div>
//             <p className="text-sm text-gray-500">Total Calves</p>
//             <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
//           </div>
//           <div className="p-5 flex flex-col items-start gap-2">
//             <div className="w-11 h-11 rounded-full bg-farm-green/10 flex items-center justify-center">
//               <HeartPulse size={20} className="text-farm-green" />
//             </div>
//             <p className="text-sm text-gray-500">Weaned</p>
//             <p className="text-2xl font-bold text-gray-800">{weanedCount}</p>
//           </div>
//           <div className="p-5 flex flex-col items-start gap-2">
//             <div className="w-11 h-11 rounded-full bg-farm-golden/10 flex items-center justify-center">
//               <Calendar size={20} className="text-farm-golden" />
//             </div>
//             <p className="text-sm text-gray-500">Not Weaned</p>
//             <p className="text-2xl font-bold text-gray-800">{notWeanedCount}</p>
//           </div>
//         </div>
//       )}

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Calf">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Tag Number</label>
//             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-CF-03" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ganesh" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Dam (Mother)</label>
//             <select name="damId" value={form.damId} onChange={handleChange} className={inputClass} required>
//               <option value="">Select mother</option>
//               {animals.filter((a) => a.gender === "Female").map((a) => (
//                 <option key={a._id} value={a._id}>{a.name} ({a.tag})</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className={labelClass}>Sire Info</label>
//             <input name="sireInfo" value={form.sireInfo} onChange={handleChange} placeholder="e.g. Murrah Elite #4521 (AI) or Local Bull" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Gender</label>
//             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//               <option>Female</option>
//               <option>Male</option>
//             </select>
//           </div>
//           <div>
//             <label className={labelClass}>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Birth Weight (kg)</label>
//             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 28" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Weaning Status</label>
//             <select name="weaningStatus" value={form.weaningStatus} onChange={handleChange} className={inputClass}>
//               <option>Not Weaned</option>
//               <option>Weaned</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Calf"}
//             </button>
//             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { Plus, PawPrint } from "lucide-react";
// import Modal from "../../components/Modal";
// import { getAnimals } from "../../api/animals";
// import { getCalves, createCalf } from "../../api/calves";

// const statusColor = {
//   "Not Weaned": "bg-farm-golden/10 text-farm-golden",
//   Weaned: "bg-farm-green/10 text-farm-green",
// };

// const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// const emptyForm = {
//   tag: "", name: "", damId: "", sireInfo: "", gender: "Female",
//   dob: "", weight: "", weaningStatus: "Not Weaned",
// };

// export default function CalfManagement() {
//   const [calves, setCalves] = useState([]);
//   const [animals, setAnimals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);

//   const loadCalves = async () => {
//     setLoading(true);
//     try {
//       const res = await getCalves();
//       setCalves(res.data || []);
//     } catch (err) {
//       console.error("Failed to load calves", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadCalves();
//     getAnimals()
//       .then((res) => setAnimals(res.data || []))
//       .catch((err) => console.error("Failed to load animals", err));
//   }, []);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createCalf(form);
//       await loadCalves();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save calf");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass =
//     "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
//   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">🐄 Calf Management</h2>
//           <p className="text-sm text-gray-400">{calves.length} calves on record</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//         >
//           <Plus size={18} /> Add Calf
//         </button>
//       </div>

//       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//         {loading ? (
//           <div className="text-center py-12 text-gray-400">Loading...</div>
//         ) : calves.length === 0 ? (
//           <div className="text-center py-12 text-gray-400">
//             <PawPrint className="mx-auto mb-2" size={28} />
//             No calves on record yet.
//           </div>
//         ) : (
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                 <th className="px-5 py-3 font-medium">Tag</th>
//                 <th className="px-5 py-3 font-medium">Name</th>
//                 <th className="px-5 py-3 font-medium">Species</th>
//                 <th className="px-5 py-3 font-medium">Gender</th>
//                 <th className="px-5 py-3 font-medium">Dam (Mother)</th>
//                 <th className="px-5 py-3 font-medium">Sire</th>
//                 <th className="px-5 py-3 font-medium">DOB</th>
//                 <th className="px-5 py-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {calves.map((c) => (
//                 <tr key={c._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
//                   <td className="px-5 py-3 text-gray-700">{c.tag}</td>
//                   <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.species}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.gender}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.damName}</td>
//                   <td className="px-5 py-3 text-gray-500">{c.sireInfo}</td>
//                   <td className="px-5 py-3 text-gray-500">{fmt(c.dob)}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus]}`}>
//                       {c.weaningStatus}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Calf">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className={labelClass}>Tag Number</label>
//             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-CF-03" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ganesh" className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Dam (Mother)</label>
//             <select name="damId" value={form.damId} onChange={handleChange} className={inputClass} required>
//               <option value="">Select mother</option>
//               {animals.filter((a) => a.gender === "Female").map((a) => (
//                 <option key={a._id} value={a._id}>{a.name} ({a.tag})</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className={labelClass}>Sire Info</label>
//             <input name="sireInfo" value={form.sireInfo} onChange={handleChange} placeholder="e.g. Murrah Elite #4521 (AI) or Local Bull" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Gender</label>
//             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//               <option>Female</option>
//               <option>Male</option>
//             </select>
//           </div>
//           <div>
//             <label className={labelClass}>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} required />
//           </div>
//           <div>
//             <label className={labelClass}>Birth Weight (kg)</label>
//             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 28" className={inputClass} />
//           </div>
//           <div>
//             <label className={labelClass}>Weaning Status</label>
//             <select name="weaningStatus" value={form.weaningStatus} onChange={handleChange} className={inputClass}>
//               <option>Not Weaned</option>
//               <option>Weaned</option>
//             </select>
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Calf"}
//             </button>
//             <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
//               Cancel
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }















import { useState, useEffect } from "react";
import {
  Plus, PawPrint, Search, Filter, LayoutGrid, List, User, Weight,
  Calendar, HeartPulse, ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import { getAnimals } from "../../api/animals";
import { getCalves, createCalf } from "../../api/calves";
import { can } from "../../utils/permissions";

const statusColor = {
  "Not Weaned": "bg-farm-golden/10 text-farm-golden",
  Weaned: "bg-farm-green/10 text-farm-green",
};

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

function getAge(dob) {
  if (!dob) return "—";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "—";
  const days = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24);
  if (days < 60) return `${Math.floor(days)} days`;
  const months = days / 30.44;
  return `${months.toFixed(1)} months`;
}

const emptyForm = {
  tag: "", name: "", damId: "", sireInfo: "", gender: "Female",
  dob: "", weight: "", weaningStatus: "Not Weaned",
};

export default function CalfManagement() {
  const [calves, setCalves] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const loadCalves = async () => {
    setLoading(true);
    try {
      const res = await getCalves();
      setCalves(res.data || []);
    } catch (err) {
      console.error("Failed to load calves", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCalves();
    getAnimals()
      .then((res) => setAnimals(res.data || []))
      .catch((err) => console.error("Failed to load animals", err));
  }, []);

  const filtered = calves.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.tag.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.weaningStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = calves.length;
  const weanedCount = calves.filter((c) => c.weaningStatus === "Weaned").length;
  const notWeanedCount = calves.filter((c) => c.weaningStatus === "Not Weaned").length;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createCalf(form);
      await loadCalves();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save calf");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-800">Calf Management</h2>
          <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
            {totalCount} calves on record
          </span>
        </div>
        {can("calves", "create") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
          >
            <Plus size={18} /> Add Calf
          </button>
        )}
      </div>

      {/* Search + filter + view toggle */}
      <div className="bg-white rounded-[20px] p-5 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or tag..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
          />
        </div>

        <div className="flex items-center gap-2 bg-farm-cream rounded-2xl px-3">
          <Filter size={16} className="text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
          >
            <option value="All">All Calves</option>
            <option>Not Weaned</option>
            <option>Weaned</option>
          </select>
        </div>

        <div className="flex items-center gap-1 bg-farm-cream rounded-2xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === "grid" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-xl transition-colors ${
              viewMode === "list" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
            }`}
            aria-label="List view"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
          Loading...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
          <PawPrint className="mx-auto mb-2" size={28} />
          No calves on record yet.
        </div>
      )}

      {/* Grid (card) view */}
      {!loading && filtered.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {filtered.map((c) => (
            <div
              key={c._id}
              onClick={() => navigate(`/calves/${c._id}`)}
              className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-40 bg-farm-cream flex items-center justify-center">
                <PawPrint size={36} className="text-gray-300" />
                <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
                  {c.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">{c.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus] || "bg-gray-100 text-gray-500"}`}>
                    {c.weaningStatus}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {c.species} • {c.gender}
                </p>

                <div className="grid grid-cols-2 gap-3 pb-4 border-b border-gray-50">
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <Calendar size={13} /> Age
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{getAge(c.dob)}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <Weight size={13} /> Birth Weight
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{c.weight ? `${c.weight} kg` : "—"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <User size={13} /> Dam (Mother)
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{c.damName || "—"}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <HeartPulse size={13} /> Sire
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{c.sireInfo || "—"}</p>
                  </div>
                </div>

                <div className="flex rounded-xl px-4 py-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/calves/${c._id}`);
                    }}
                    className="ml-auto flex items-center gap-1 text-farm-green text-sm font-medium hover:underline"
                  >
                    View Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List (table) view */}
      {!loading && filtered.length > 0 && viewMode === "list" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Tag</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Species</th>
                <th className="px-5 py-3 font-medium">Gender</th>
                <th className="px-5 py-3 font-medium">Dam (Mother)</th>
                <th className="px-5 py-3 font-medium">Sire</th>
                <th className="px-5 py-3 font-medium">DOB</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => navigate(`/calves/${c._id}`)}
                  className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 text-gray-700">{c.tag}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{c.name}</td>
                  <td className="px-5 py-3 text-gray-500">{c.species}</td>
                  <td className="px-5 py-3 text-gray-500">{c.gender}</td>
                  <td className="px-5 py-3 text-gray-500">{c.damName}</td>
                  <td className="px-5 py-3 text-gray-500">{c.sireInfo}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(c.dob)}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[c.weaningStatus]}`}>
                      {c.weaningStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary stats strip */}
      {!loading && calves.length > 0 && (
        <div className="bg-white rounded-[20px] shadow-xs grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="p-5 flex flex-col items-start gap-2">
            <div className="w-11 h-11 rounded-full bg-farm-green/10 flex items-center justify-center">
              <PawPrint size={20} className="text-farm-green" />
            </div>
            <p className="text-sm text-gray-500">Total Calves</p>
            <p className="text-2xl font-bold text-gray-800">{totalCount}</p>
          </div>
          <div className="p-5 flex flex-col items-start gap-2">
            <div className="w-11 h-11 rounded-full bg-farm-green/10 flex items-center justify-center">
              <HeartPulse size={20} className="text-farm-green" />
            </div>
            <p className="text-sm text-gray-500">Weaned</p>
            <p className="text-2xl font-bold text-gray-800">{weanedCount}</p>
          </div>
          <div className="p-5 flex flex-col items-start gap-2">
            <div className="w-11 h-11 rounded-full bg-farm-golden/10 flex items-center justify-center">
              <Calendar size={20} className="text-farm-golden" />
            </div>
            <p className="text-sm text-gray-500">Not Weaned</p>
            <p className="text-2xl font-bold text-gray-800">{notWeanedCount}</p>
          </div>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Calf">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Tag Number</label>
            <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-CF-03" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Ganesh" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Dam (Mother)</label>
            <select name="damId" value={form.damId} onChange={handleChange} className={inputClass} required>
              <option value="">Select mother</option>
              {animals.filter((a) => a.gender === "Female").map((a) => (
                <option key={a._id} value={a._id}>{a.name} ({a.tag})</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Sire Info</label>
            <input name="sireInfo" value={form.sireInfo} onChange={handleChange} placeholder="e.g. Murrah Elite #4521 (AI) or Local Bull" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Birth Weight (kg)</label>
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 28" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Weaning Status</label>
            <select name="weaningStatus" value={form.weaningStatus} onChange={handleChange} className={inputClass}>
              <option>Not Weaned</option>
              <option>Weaned</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Calf"}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}