// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { Search, Plus, Filter } from "lucide-react";
// // import Modal from "../../components/Modal";
// // import AnimalAvatar from "../../components/AnimalAvatar";
// // import { getAnimals, createAnimal } from "../../api/animals";

// // const statusColor = {
// //   Lactating: "bg-farm-green/10 text-farm-green",
// //   Milking: "bg-farm-green/10 text-farm-green",
// //   Pregnant: "bg-farm-golden/10 text-farm-golden",
// //   Dry: "bg-gray-100 text-gray-500",
// // };

// // const breedOptions = {
// //   Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
// //   Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
// // };

// // const emptyForm = {
// //   tag: "",
// //   name: "",
// //   species: "Cow",
// //   breed: "",
// //   gender: "Female",
// //   dob: "",
// //   weight: "",
// //   color: "",
// //   purchaseDate: "",
// //   status: "Dry",
// //   photo: "",
// // };

// // export default function Animals() {
// //   const [animals, setAnimals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [speciesFilter, setSpeciesFilter] = useState("All");
// //   const [showModal, setShowModal] = useState(false);
// //   const [form, setForm] = useState(emptyForm);
// //   const [saving, setSaving] = useState(false);
// //   const navigate = useNavigate();

// //   const loadAnimals = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAnimals();
// //       setAnimals(res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load animals", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadAnimals();
// //   }, []);

// //   const filtered = animals.filter((a) => {
// //     const matchesSearch =
// //       a.name.toLowerCase().includes(search.toLowerCase()) ||
// //       a.tag.toLowerCase().includes(search.toLowerCase());
// //     const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
// //     return matchesSearch && matchesSpecies;
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //       ...(name === "species" ? { breed: "" } : {}),
// //     }));
// //   };

// //   const handlePhotoUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     try {
// //       await createAnimal(form);
// //       await loadAnimals();
// //       setShowModal(false);
// //       setForm(emptyForm);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save animal");
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
// //           <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
// //           <p className="text-sm text-gray-400">{animals.length} animals registered</p>
// //         </div>
// //         <button
// //           onClick={() => setShowModal(true)}
// //           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
// //         >
// //           <Plus size={18} /> Add Animal
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-[20px] p-5 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
// //         <div className="relative flex-1">
// //           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Search by name or tag..."
// //             className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //           />
// //         </div>
// //         <div className="flex items-center gap-2 bg-farm-cream rounded-2xl px-3">
// //           <Filter size={16} className="text-gray-400" />
// //           <select
// //             value={speciesFilter}
// //             onChange={(e) => setSpeciesFilter(e.target.value)}
// //             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
// //           >
// //             <option>All</option>
// //             <option>Cow</option>
// //             <option>Buffalo</option>
// //           </select>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //         <table className="w-full text-sm">
// //           <thead>
// //             <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //               <th className="px-5 py-3 font-medium">Tag</th>
// //               <th className="px-5 py-3 font-medium">Name</th>
// //               <th className="px-5 py-3 font-medium">Species</th>
// //               <th className="px-5 py-3 font-medium">Breed</th>
// //               <th className="px-5 py-3 font-medium">Gender</th>
// //               <th className="px-5 py-3 font-medium">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading && (
// //               <tr>
// //                 <td colSpan={6} className="text-center py-8 text-gray-400">Loading animals...</td>
// //               </tr>
// //             )}
// //             {!loading &&
// //               filtered.map((a) => (
// //                 <tr
// //                   key={a._id}
// //                   onClick={() => navigate(`/animals/${a._id}`)}
// //                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
// //                 >
// //                   <td className="px-5 py-3 text-gray-700">{a.tag}</td>
// //                   <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.species}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.breed}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.gender}</td>
// //                   <td className="px-5 py-3">
// //                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
// //                       {a.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             {!loading && filtered.length === 0 && (
// //               <tr>
// //                 <td colSpan={6} className="text-center py-8 text-gray-400">No animals found.</td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <div className="flex items-center gap-4">
// //               <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
// //               <div>
// //                 <label className={labelClass}>Animal Photo</label>
// //                 <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
// //               </div>
// //             </div>
// //             <label className={labelClass}>Tag Number</label>
// //             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Name</label>
// //             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Species</label>
// //             <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
// //               <option>Cow</option>
// //               <option>Buffalo</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Breed</label>
// //             <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
// //               <option value="">Select breed</option>
// //               {breedOptions[form.species].map((b) => (
// //                 <option key={b} value={b}>{b}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Gender</label>
// //             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
// //               <option>Female</option>
// //               <option>Male</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Status</label>
// //             <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
// //               <option>Dry</option>
// //               <option>Lactating</option>
// //               <option>Pregnant</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Date of Birth</label>
// //             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Weight (kg)</label>
// //             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Color</label>
// //             <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
// //             <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
// //           </div>

// //           <div className="flex gap-3 pt-2">
// //             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
// //               {saving ? "Saving..." : "Save Animal"}
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














// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Search, Plus, Filter, LayoutGrid, List, Heart, User, Milk,
// //   Calendar, HeartPulse, Beef, ArrowRight,
// // } from "lucide-react";
// // import Modal from "../../components/Modal";
// // import AnimalAvatar from "../../components/AnimalAvatar";
// // import { getAnimals, createAnimal } from "../../api/animals";

// // const statusColor = {
// //   Lactating: "bg-farm-green/10 text-farm-green",
// //   Milking: "bg-farm-green/10 text-farm-green",
// //   Pregnant: "bg-farm-golden/10 text-farm-golden",
// //   Dry: "bg-gray-100 text-gray-500",
// // };

// // const breedOptions = {
// //   Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
// //   Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
// // };

// // const emptyForm = {
// //   tag: "",
// //   name: "",
// //   species: "Cow",
// //   breed: "",
// //   gender: "Female",
// //   dob: "",
// //   weight: "",
// //   color: "",
// //   purchaseDate: "",
// //   status: "Dry",
// //   photo: "",
// // };


// // function getAge(dob) {
// //   if (!dob) return "—";
// //   const birth = new Date(dob);
// //   if (Number.isNaN(birth.getTime())) return "—";
// //   const years = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
// //   return `${years.toFixed(1)} Years`;
// // }

// // function formatDate(value) {
// //   if (!value) return "—";
// //   const d = new Date(value);
// //   if (Number.isNaN(d.getTime())) return "—";
// //   return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// // }

// // export default function Animals() {
// //   const [animals, setAnimals] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState("");
// //   const [speciesFilter, setSpeciesFilter] = useState("All");
// //   const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
// //   const [showModal, setShowModal] = useState(false);
// //   const [form, setForm] = useState(emptyForm);
// //   const [saving, setSaving] = useState(false);
// //   const navigate = useNavigate();

// //   const loadAnimals = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await getAnimals();
// //       setAnimals(res.data || []);
// //     } catch (err) {
// //       console.error("Failed to load animals", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadAnimals();
// //   }, []);

// //   const filtered = animals.filter((a) => {
// //     const matchesSearch =
// //       a.name.toLowerCase().includes(search.toLowerCase()) ||
// //       a.tag.toLowerCase().includes(search.toLowerCase());
// //     const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
// //     return matchesSearch && matchesSpecies;
// //   });

// //   const totalCount = animals.length;
// //   const milkingCount = animals.filter((a) => a.status === "Milking" || a.status === "Lactating").length;
// //   const dryCount = animals.filter((a) => a.status === "Dry").length;
// //   // nextHeat isn't in the schema yet — this will always read 0 until that field exists
// //   const dueForHeatCount = animals.filter((a) => a.nextHeat).length;

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //       ...(name === "species" ? { breed: "" } : {}),
// //     }));
// //   };

// //   const handlePhotoUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
// //     reader.readAsDataURL(file);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
// //     try {
// //       await createAnimal(form);
// //       await loadAnimals();
// //       setShowModal(false);
// //       setForm(emptyForm);
// //     } catch (err) {
// //       alert(err.response?.data?.message || "Failed to save animal");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const inputClass =
// //     "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
// //   const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

// //   return (
// //     <div>
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
// //         <div className="flex items-center gap-3">
// //           <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
// //           <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
// //             {totalCount} animals registered
// //           </span>
// //         </div>
// //         <button
// //           onClick={() => setShowModal(true)}
// //           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
// //         >
// //           <Plus size={18} /> Add Animal
// //         </button>
// //       </div>

// //       {/* Search + filter + view toggle */}
// //       <div className="bg-white rounded-[20px] p-5 shadow-xs mb-6 flex flex-col sm:flex-row gap-3">
// //         <div className="relative flex-1">
// //           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
// //           <input
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Search by name or tag..."
// //             className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green"
// //           />
// //         </div>

// //         <div className="flex items-center gap-2 bg-farm-cream rounded-2xl px-3">
// //           <Filter size={16} className="text-gray-400" />
// //           <select
// //             value={speciesFilter}
// //             onChange={(e) => setSpeciesFilter(e.target.value)}
// //             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
// //           >
// //             <option value="All">All Animals</option>
// //             <option>Cow</option>
// //             <option>Buffalo</option>
// //           </select>
// //         </div>

// //         <div className="flex items-center gap-1 bg-farm-cream rounded-2xl p-1">
// //           <button
// //             onClick={() => setViewMode("grid")}
// //             className={`p-2 rounded-xl transition-colors ${
// //               viewMode === "grid" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
// //             }`}
// //             aria-label="Grid view"
// //           >
// //             <LayoutGrid size={18} />
// //           </button>
// //           <button
// //             onClick={() => setViewMode("list")}
// //             className={`p-2 rounded-xl transition-colors ${
// //               viewMode === "list" ? "bg-farm-green/15 text-farm-green" : "text-gray-400 hover:text-gray-600"
// //             }`}
// //             aria-label="List view"
// //           >
// //             <List size={18} />
// //           </button>
// //         </div>
// //       </div>

// //       {loading && (
// //         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
// //           Loading animals...
// //         </div>
// //       )}

// //       {!loading && filtered.length === 0 && (
// //         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
// //           No animals found.
// //         </div>
// //       )}

// //       {/* Grid (card) view */}
// //       {!loading && filtered.length > 0 && viewMode === "grid" && (
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //           {filtered.map((a) => (
// //             <div
// //               key={a._id}
// //               className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow"
// //             >
// //               <div className="relative h-56">
// //                 {a.photo ? (
// //                   <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
// //                 ) : (
// //                   <div className="w-full h-full bg-farm-cream flex items-center justify-center">
// //                     <Beef size={40} className="text-gray-300" />
// //                   </div>
// //                 )}
// //                 <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
// //                   {a.tag}
// //                 </span>
// //               </div>

// //               <div className="p-5">
// //                 <div className="flex items-center gap-2 mb-1">
// //                   <h3 className="font-bold text-gray-800 text-lg">{a.name}</h3>
// //                   <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
// //                     {a.status}
// //                   </span>
// //                 </div>
// //                 <p className="text-sm text-gray-400 mb-4">
// //                   {a.species} • {a.breed} Breed
// //                 </p>

// //                 <div className="grid grid-cols-4 gap-2 pb-4 border-b border-gray-50">
// //                   <div>
// //                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
// //                       <User size={13} /> Age
// //                     </div>
// //                     <p className="text-sm font-semibold text-gray-800">{getAge(a.dob)}</p>
// //                   </div>
                  
                  
// //                   <div>
// //                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
// //                       <HeartPulse size={13} /> Status
// //                     </div>
// //                     <p className="text-sm font-semibold text-gray-800">{a.status}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex  rounded-xl px-4 py-3 mt-4">
// //                 <button
// //                   onClick={() => navigate(`/animals/${a._id}`)}
// //                   className="ml-auto flex items-center gap-1 text-farm-green text-sm font-medium hover:underline"
// //                 >
// //                   View Details <ArrowRight size={14} />
// //                 </button>
// //               </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* List (table) view */}
// //       {!loading && filtered.length > 0 && viewMode === "list" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden mb-6">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                 <th className="px-5 py-3 font-medium">Tag</th>
// //                 <th className="px-5 py-3 font-medium">Name</th>
// //                 <th className="px-5 py-3 font-medium">Species</th>
// //                 <th className="px-5 py-3 font-medium">Breed</th>
// //                 <th className="px-5 py-3 font-medium">Gender</th>
// //                 <th className="px-5 py-3 font-medium">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filtered.map((a) => (
// //                 <tr
// //                   key={a._id}
// //                   onClick={() => navigate(`/animals/${a._id}`)}
// //                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
// //                 >
// //                   <td className="px-5 py-3 text-gray-700">{a.tag}</td>
// //                   <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.species}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.breed}</td>
// //                   <td className="px-5 py-3 text-gray-500">{a.gender}</td>
// //                   <td className="px-5 py-3">
// //                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
// //                       {a.status}
// //                     </span>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

      
// //       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <div className="flex items-center gap-4">
// //               <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
// //               <div>
// //                 <label className={labelClass}>Animal Photo</label>
// //                 <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
// //               </div>
// //             </div>
// //             <label className={labelClass}>Tag Number</label>
// //             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Name</label>
// //             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Species</label>
// //             <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
// //               <option>Cow</option>
// //               <option>Buffalo</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Breed</label>
// //             <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
// //               <option value="">Select breed</option>
// //               {breedOptions[form.species].map((b) => (
// //                 <option key={b} value={b}>{b}</option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Gender</label>
// //             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
// //               <option>Female</option>
// //               <option>Male</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Status</label>
// //             <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
// //               <option>Dry</option>
// //               <option>Lactating</option>
// //               <option>Pregnant</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className={labelClass}>Date of Birth</label>
// //             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Weight (kg)</label>
// //             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Color</label>
// //             <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
// //           </div>

// //           <div>
// //             <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
// //             <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
// //           </div>

// //           <div className="flex gap-3 pt-2">
// //             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
// //               {saving ? "Saving..." : "Save Animal"}
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
// import { useNavigate } from "react-router-dom";
// import {
//   Search, Plus, Filter, LayoutGrid, List, User, Milk,
//   Calendar, HeartPulse, Beef, ArrowRight,
// } from "lucide-react";
// import Modal from "../../components/Modal";
// import AnimalAvatar from "../../components/AnimalAvatar";
// import { getAnimals, createAnimal } from "../../api/animals";

// const statusColor = {
//   Lactating: "bg-farm-green/10 text-farm-green",
//   Milking: "bg-farm-green/10 text-farm-green",
//   Pregnant: "bg-farm-golden/10 text-farm-golden",
//   Dry: "bg-gray-100 text-gray-500",
// };

// const breedOptions = {
//   Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
//   Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
// };

// const emptyForm = {
//   tag: "",
//   name: "",
//   species: "Cow",
//   breed: "",
//   gender: "Female",
//   dob: "",
//   weight: "",
//   color: "",
//   purchaseDate: "",
//   status: "Dry",
//   photo: "",
// };

// function getAge(dob) {
//   if (!dob) return "—";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "—";
//   const years = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//   return `${years.toFixed(1)} Years`;
// }

// export default function Animals() {
//   const [animals, setAnimals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [speciesFilter, setSpeciesFilter] = useState("All");
//   const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const loadAnimals = async () => {
//     setLoading(true);
//     try {
//       const res = await getAnimals();
//       setAnimals(res.data || []);
//     } catch (err) {
//       console.error("Failed to load animals", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAnimals();
//   }, []);

//   const filtered = animals.filter((a) => {
//     const matchesSearch =
//       a.name.toLowerCase().includes(search.toLowerCase()) ||
//       a.tag.toLowerCase().includes(search.toLowerCase());
//     const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
//     return matchesSearch && matchesSpecies;
//   });

//   const totalCount = animals.length;
//   const milkingCount = animals.filter((a) => a.status === "Milking" || a.status === "Lactating").length;
//   const dryCount = animals.filter((a) => a.status === "Dry").length;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "species" ? { breed: "" } : {}),
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createAnimal(form);
//       await loadAnimals();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save animal");
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
//           <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
//           <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
//             {totalCount} animals registered
//           </span>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//         >
//           <Plus size={18} /> Add Animal
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
//             value={speciesFilter}
//             onChange={(e) => setSpeciesFilter(e.target.value)}
//             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
//           >
//             <option value="All">All Animals</option>
//             <option>Cow</option>
//             <option>Buffalo</option>
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
//           Loading animals...
//         </div>
//       )}

//       {!loading && filtered.length === 0 && (
//         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
//           No animals found.
//         </div>
//       )}

//       {/* Grid (card) view */}
//       {!loading && filtered.length > 0 && viewMode === "grid" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {filtered.map((a) => (
//             <div
//               key={a._id}
//               onClick={() => navigate(`/animals/${a._id}`)}
//               className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
//             >
//               <div className="relative h-56">
//                 {a.photo ? (
//                   <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full bg-farm-cream flex items-center justify-center">
//                     <Beef size={40} className="text-gray-300" />
//                   </div>
//                 )}
//                 <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
//                   {a.tag}
//                 </span>
//               </div>

//               <div className="p-5">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-gray-800 text-lg">{a.name}</h3>
//                   <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
//                     {a.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-4">
//                   {a.species} • {a.breed} Breed
//                 </p>

//                 <div className="grid grid-cols-4 gap-2 pb-4 border-b border-gray-50">
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <User size={13} /> Age
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{getAge(a.dob)}</p>
//                   </div>

//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <HeartPulse size={13} /> Status
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{a.status}</p>
//                   </div>
//                 </div>

//                 <div className="flex rounded-xl px-4 py-3 mt-4">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate(`/animals/${a._id}`);
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
//                 <th className="px-5 py-3 font-medium">Breed</th>
//                 <th className="px-5 py-3 font-medium">Gender</th>
//                 <th className="px-5 py-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((a) => (
//                 <tr
//                   key={a._id}
//                   onClick={() => navigate(`/animals/${a._id}`)}
//                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
//                 >
//                   <td className="px-5 py-3 text-gray-700">{a.tag}</td>
//                   <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.species}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.breed}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.gender}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
//                       {a.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <div className="flex items-center gap-4">
//               <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
//               <div>
//                 <label className={labelClass}>Animal Photo</label>
//                 <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
//               </div>
//             </div>
//             <label className={labelClass}>Tag Number</label>
//             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Species</label>
//             <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
//               <option>Cow</option>
//               <option>Buffalo</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Breed</label>
//             <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
//               <option value="">Select breed</option>
//               {breedOptions[form.species].map((b) => (
//                 <option key={b} value={b}>{b}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Gender</label>
//             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//               <option>Female</option>
//               <option>Male</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Status</label>
//             <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
//               <option>Dry</option>
//               <option>Lactating</option>
//               <option>Pregnant</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Weight (kg)</label>
//             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Color</label>
//             <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
//             <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Animal"}
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
// import { useNavigate } from "react-router-dom";
// import { Search, Plus, Filter } from "lucide-react";
// import Modal from "../../components/Modal";
// import AnimalAvatar from "../../components/AnimalAvatar";
// import { getAnimals, createAnimal } from "../../api/animals";

// const statusColor = {
//   Lactating: "bg-farm-green/10 text-farm-green",
//   Milking: "bg-farm-green/10 text-farm-green",
//   Pregnant: "bg-farm-golden/10 text-farm-golden",
//   Dry: "bg-gray-100 text-gray-500",
// };

// const breedOptions = {
//   Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
//   Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
// };

// const emptyForm = {
//   tag: "",
//   name: "",
//   species: "Cow",
//   breed: "",
//   gender: "Female",
//   dob: "",
//   weight: "",
//   color: "",
//   purchaseDate: "",
//   status: "Dry",
//   photo: "",
// };

// export default function Animals() {
//   const [animals, setAnimals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [speciesFilter, setSpeciesFilter] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const loadAnimals = async () => {
//     setLoading(true);
//     try {
//       const res = await getAnimals();
//       setAnimals(res.data || []);
//     } catch (err) {
//       console.error("Failed to load animals", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAnimals();
//   }, []);

//   const filtered = animals.filter((a) => {
//     const matchesSearch =
//       a.name.toLowerCase().includes(search.toLowerCase()) ||
//       a.tag.toLowerCase().includes(search.toLowerCase());
//     const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
//     return matchesSearch && matchesSpecies;
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "species" ? { breed: "" } : {}),
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createAnimal(form);
//       await loadAnimals();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save animal");
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
//           <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
//           <p className="text-sm text-gray-400">{animals.length} animals registered</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//         >
//           <Plus size={18} /> Add Animal
//         </button>
//       </div>

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
//             value={speciesFilter}
//             onChange={(e) => setSpeciesFilter(e.target.value)}
//             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
//           >
//             <option>All</option>
//             <option>Cow</option>
//             <option>Buffalo</option>
//           </select>
//         </div>
//       </div>

//       <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//               <th className="px-5 py-3 font-medium">Tag</th>
//               <th className="px-5 py-3 font-medium">Name</th>
//               <th className="px-5 py-3 font-medium">Species</th>
//               <th className="px-5 py-3 font-medium">Breed</th>
//               <th className="px-5 py-3 font-medium">Gender</th>
//               <th className="px-5 py-3 font-medium">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-400">Loading animals...</td>
//               </tr>
//             )}
//             {!loading &&
//               filtered.map((a) => (
//                 <tr
//                   key={a._id}
//                   onClick={() => navigate(`/animals/${a._id}`)}
//                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
//                 >
//                   <td className="px-5 py-3 text-gray-700">{a.tag}</td>
//                   <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.species}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.breed}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.gender}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
//                       {a.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             {!loading && filtered.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-400">No animals found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <div className="flex items-center gap-4">
//               <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
//               <div>
//                 <label className={labelClass}>Animal Photo</label>
//                 <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
//               </div>
//             </div>
//             <label className={labelClass}>Tag Number</label>
//             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Species</label>
//             <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
//               <option>Cow</option>
//               <option>Buffalo</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Breed</label>
//             <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
//               <option value="">Select breed</option>
//               {breedOptions[form.species].map((b) => (
//                 <option key={b} value={b}>{b}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Gender</label>
//             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//               <option>Female</option>
//               <option>Male</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Status</label>
//             <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
//               <option>Dry</option>
//               <option>Lactating</option>
//               <option>Pregnant</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Weight (kg)</label>
//             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Color</label>
//             <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
//             <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Animal"}
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
// import { useNavigate } from "react-router-dom";
// import {
//   Search, Plus, Filter, LayoutGrid, List, Heart, User, Milk,
//   Calendar, HeartPulse, Beef, ArrowRight,
// } from "lucide-react";
// import Modal from "../../components/Modal";
// import AnimalAvatar from "../../components/AnimalAvatar";
// import { getAnimals, createAnimal } from "../../api/animals";

// const statusColor = {
//   Lactating: "bg-farm-green/10 text-farm-green",
//   Milking: "bg-farm-green/10 text-farm-green",
//   Pregnant: "bg-farm-golden/10 text-farm-golden",
//   Dry: "bg-gray-100 text-gray-500",
// };

// const breedOptions = {
//   Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
//   Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
// };

// const emptyForm = {
//   tag: "",
//   name: "",
//   species: "Cow",
//   breed: "",
//   gender: "Female",
//   dob: "",
//   weight: "",
//   color: "",
//   purchaseDate: "",
//   status: "Dry",
//   photo: "",
// };


// function getAge(dob) {
//   if (!dob) return "—";
//   const birth = new Date(dob);
//   if (Number.isNaN(birth.getTime())) return "—";
//   const years = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//   return `${years.toFixed(1)} Years`;
// }

// function formatDate(value) {
//   if (!value) return "—";
//   const d = new Date(value);
//   if (Number.isNaN(d.getTime())) return "—";
//   return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
// }

// export default function Animals() {
//   const [animals, setAnimals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [speciesFilter, setSpeciesFilter] = useState("All");
//   const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();

//   const loadAnimals = async () => {
//     setLoading(true);
//     try {
//       const res = await getAnimals();
//       setAnimals(res.data || []);
//     } catch (err) {
//       console.error("Failed to load animals", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAnimals();
//   }, []);

//   const filtered = animals.filter((a) => {
//     const matchesSearch =
//       a.name.toLowerCase().includes(search.toLowerCase()) ||
//       a.tag.toLowerCase().includes(search.toLowerCase());
//     const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
//     return matchesSearch && matchesSpecies;
//   });

//   const totalCount = animals.length;
//   const milkingCount = animals.filter((a) => a.status === "Milking" || a.status === "Lactating").length;
//   const dryCount = animals.filter((a) => a.status === "Dry").length;
//   // nextHeat isn't in the schema yet — this will always read 0 until that field exists
//   const dueForHeatCount = animals.filter((a) => a.nextHeat).length;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "species" ? { breed: "" } : {}),
//     }));
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       await createAnimal(form);
//       await loadAnimals();
//       setShowModal(false);
//       setForm(emptyForm);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save animal");
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
//           <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
//           <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
//             {totalCount} animals registered
//           </span>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//         >
//           <Plus size={18} /> Add Animal
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
//             value={speciesFilter}
//             onChange={(e) => setSpeciesFilter(e.target.value)}
//             className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
//           >
//             <option value="All">All Animals</option>
//             <option>Cow</option>
//             <option>Buffalo</option>
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
//           Loading animals...
//         </div>
//       )}

//       {!loading && filtered.length === 0 && (
//         <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
//           No animals found.
//         </div>
//       )}

//       {/* Grid (card) view */}
//       {!loading && filtered.length > 0 && viewMode === "grid" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {filtered.map((a) => (
//             <div
//               key={a._id}
//               className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow"
//             >
//               <div className="relative h-56">
//                 {a.photo ? (
//                   <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
//                 ) : (
//                   <div className="w-full h-full bg-farm-cream flex items-center justify-center">
//                     <Beef size={40} className="text-gray-300" />
//                   </div>
//                 )}
//                 <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
//                   {a.tag}
//                 </span>
//               </div>

//               <div className="p-5">
//                 <div className="flex items-center gap-2 mb-1">
//                   <h3 className="font-bold text-gray-800 text-lg">{a.name}</h3>
//                   <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
//                     {a.status}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-400 mb-4">
//                   {a.species} • {a.breed} Breed
//                 </p>

//                 <div className="grid grid-cols-4 gap-2 pb-4 border-b border-gray-50">
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <User size={13} /> Age
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{getAge(a.dob)}</p>
//                   </div>
                  
                  
//                   <div>
//                     <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
//                       <HeartPulse size={13} /> Status
//                     </div>
//                     <p className="text-sm font-semibold text-gray-800">{a.status}</p>
//                   </div>
//                 </div>

//                 <div className="flex  rounded-xl px-4 py-3 mt-4">
//                 <button
//                   onClick={() => navigate(`/animals/${a._id}`)}
//                   className="ml-auto flex items-center gap-1 text-farm-green text-sm font-medium hover:underline"
//                 >
//                   View Details <ArrowRight size={14} />
//                 </button>
//               </div>
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
//                 <th className="px-5 py-3 font-medium">Breed</th>
//                 <th className="px-5 py-3 font-medium">Gender</th>
//                 <th className="px-5 py-3 font-medium">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((a) => (
//                 <tr
//                   key={a._id}
//                   onClick={() => navigate(`/animals/${a._id}`)}
//                   className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
//                 >
//                   <td className="px-5 py-3 text-gray-700">{a.tag}</td>
//                   <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.species}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.breed}</td>
//                   <td className="px-5 py-3 text-gray-500">{a.gender}</td>
//                   <td className="px-5 py-3">
//                     <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
//                       {a.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

      
//       <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <div className="flex items-center gap-4">
//               <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
//               <div>
//                 <label className={labelClass}>Animal Photo</label>
//                 <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
//               </div>
//             </div>
//             <label className={labelClass}>Tag Number</label>
//             <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
//           </div>

//           <div>
//             <label className={labelClass}>Species</label>
//             <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
//               <option>Cow</option>
//               <option>Buffalo</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Breed</label>
//             <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
//               <option value="">Select breed</option>
//               {breedOptions[form.species].map((b) => (
//                 <option key={b} value={b}>{b}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Gender</label>
//             <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
//               <option>Female</option>
//               <option>Male</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Status</label>
//             <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
//               <option>Dry</option>
//               <option>Lactating</option>
//               <option>Pregnant</option>
//             </select>
//           </div>

//           <div>
//             <label className={labelClass}>Date of Birth</label>
//             <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Weight (kg)</label>
//             <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Color</label>
//             <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
//           </div>

//           <div>
//             <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
//             <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
//               {saving ? "Saving..." : "Save Animal"}
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
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, Filter, LayoutGrid, List, User, Milk,
  Calendar, HeartPulse, Beef, ArrowRight,
} from "lucide-react";
import Modal from "../../components/Modal";
import AnimalAvatar from "../../components/AnimalAvatar";
import { getAnimals, createAnimal } from "../../api/animals";
import { can } from "../../utils/permissions";

const statusColor = {
  Lactating: "bg-farm-green/10 text-farm-green",
  Milking: "bg-farm-green/10 text-farm-green",
  Pregnant: "bg-farm-golden/10 text-farm-golden",
  Dry: "bg-gray-100 text-gray-500",
};

const breedOptions = {
  Cow: ["Gir", "Sahiwal", "Red Sindhi", "Tharparkar", "Khillari", "Dangi", "HF Cross", "Jersey Cross"],
  Buffalo: ["Murrah", "Nagpuri", "Pandharpuri", "Mehsana", "Surti", "Jaffarabadi"],
};

const emptyForm = {
  tag: "",
  name: "",
  species: "Cow",
  breed: "",
  gender: "Female",
  dob: "",
  weight: "",
  color: "",
  purchaseDate: "",
  status: "Dry",
  photo: "",
};

function getAge(dob) {
  if (!dob) return "—";
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return "—";
  const years = (Date.now() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return `${years.toFixed(1)} Years`;
}

export default function Animals() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const loadAnimals = async () => {
    setLoading(true);
    try {
      const res = await getAnimals();
      setAnimals(res.data || []);
    } catch (err) {
      console.error("Failed to load animals", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnimals();
  }, []);

  const filtered = animals.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tag.toLowerCase().includes(search.toLowerCase());
    const matchesSpecies = speciesFilter === "All" || a.species === speciesFilter;
    return matchesSearch && matchesSpecies;
  });

  const totalCount = animals.length;
  const milkingCount = animals.filter((a) => a.status === "Milking" || a.status === "Lactating").length;
  const dryCount = animals.filter((a) => a.status === "Dry").length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "species" ? { breed: "" } : {}),
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAnimal(form);
      await loadAnimals();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save animal");
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
          <h2 className="text-xl font-bold text-gray-800">Animal Management</h2>
          <span className="bg-farm-green/10 text-farm-green text-xs font-medium px-3 py-1 rounded-full">
            {totalCount} animals registered
          </span>
        </div>
        {can("animals", "create") && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
          >
            <Plus size={18} /> Add Animal
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
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
            className="bg-transparent text-sm py-2.5 pr-2 focus:outline-hidden text-gray-600"
          >
            <option value="All">All Animals</option>
            <option>Cow</option>
            <option>Buffalo</option>
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
          Loading animals...
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-[20px] shadow-xs py-12 text-center text-gray-400">
          No animals found.
        </div>
      )}

      {/* Grid (card) view */}
      {!loading && filtered.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {filtered.map((a) => (
            <div
              key={a._id}
              onClick={() => navigate(`/animals/${a._id}`)}
              className="bg-white rounded-[20px] shadow-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-56">
                {a.photo ? (
                  <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-farm-cream flex items-center justify-center">
                    <Beef size={40} className="text-gray-300" />
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-white/95 text-sm font-medium px-3 py-1 rounded-full shadow-xs">
                  {a.tag}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-800 text-lg">{a.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
                    {a.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  {a.species} • {a.breed} Breed
                </p>

                <div className="grid grid-cols-4 gap-2 pb-4 border-b border-gray-50">
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <User size={13} /> Age
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{getAge(a.dob)}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <HeartPulse size={13} /> Status
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{a.status}</p>
                  </div>
                </div>

                <div className="flex rounded-xl px-4 py-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/animals/${a._id}`);
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
                <th className="px-5 py-3 font-medium">Breed</th>
                <th className="px-5 py-3 font-medium">Gender</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a._id}
                  onClick={() => navigate(`/animals/${a._id}`)}
                  className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/30 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3 text-gray-700">{a.tag}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{a.name}</td>
                  <td className="px-5 py-3 text-gray-500">{a.species}</td>
                  <td className="px-5 py-3 text-gray-500">{a.breed}</td>
                  <td className="px-5 py-3 text-gray-500">{a.gender}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Animal">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center gap-4">
              <AnimalAvatar photo={form.photo} name={form.name || "?"} size={64} />
              <div>
                <label className={labelClass}>Animal Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-xs" />
              </div>
            </div>
            <label className={labelClass}>Tag Number</label>
            <input name="tag" value={form.tag} onChange={handleChange} placeholder="e.g. AV-1046" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gauri" className={inputClass} required />
          </div>

          <div>
            <label className={labelClass}>Species</label>
            <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
              <option>Cow</option>
              <option>Buffalo</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Breed</label>
            <select name="breed" value={form.breed} onChange={handleChange} className={inputClass} required>
              <option value="">Select breed</option>
              {breedOptions[form.species].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
              <option>Female</option>
              <option>Male</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
              <option>Dry</option>
              <option>Lactating</option>
              <option>Pregnant</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Weight (kg)</label>
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="e.g. 420" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Color</label>
            <input name="color" value={form.color} onChange={handleChange} placeholder="e.g. Black & White" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Purchase Date (leave blank if born on farm)</label>
            <input type="date" name="purchaseDate" value={form.purchaseDate} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Animal"}
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
