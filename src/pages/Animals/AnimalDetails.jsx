// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { ArrowLeft, Milk, Stethoscope, Syringe, HeartHandshake, Tag } from "lucide-react";
// // import AnimalAvatar from "../../components/AnimalAvatar";
// // import { getAnimalById } from "../../api/animals";
// // import { getMedicalRecords } from "../../api/medical";
// // import { getVaccinations } from "../../api/vaccination";
// // import { getMilkRecords } from "../../api/milk";
// // import { getBreedingRecords } from "../../api/breeding";

// // const typeColor = {
// //   Treatment: "bg-farm-brown/10 text-farm-brown",
// //   Mastitis: "bg-red-50 text-red-500",
// //   Deworming: "bg-farm-golden/10 text-farm-golden",
// //   BCS: "bg-farm-green/10 text-farm-green",
// //   Vaccination: "bg-blue-50 text-blue-500",
// //   "Heat Detected": "bg-farm-golden/10 text-farm-golden",
// //   AI: "bg-blue-50 text-blue-500",
// //   "Pregnancy Diagnosis": "bg-farm-brown/10 text-farm-brown",
// //   Calving: "bg-farm-green/10 text-farm-green",
// // };

// // const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// // export default function AnimalDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   const [animal, setAnimal] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [medicalRecords, setMedicalRecords] = useState([]);
// //   const [vaccinationRecords, setVaccinationRecords] = useState([]);
// //   const [milkRecords, setMilkRecords] = useState([]);
// //   const [breedingRecords, setBreedingRecords] = useState([]);
// //   const [activeSection, setActiveSection] = useState(null);
// //   const [categoryHistory, setCategoryHistory] = useState([]);

// //   useEffect(() => {
// //     let cancelled = false;
// //     (async () => {
// //       setLoading(true);
// //       try {
// //         const [animalRes, medicalRes, vaccRes, milkRes, breedingRes] = await Promise.all([
// //           getAnimalById(id),
// //           getMedicalRecords({ animalId: id }),
// //           getVaccinations({ animalId: id }),
// //           getMilkRecords({ animalId: id }),
// //           getBreedingRecords({ animalId: id }),
// //         ]);
// //         if (cancelled) return;
// //         setAnimal(animalRes.data);
// //         setCategoryHistory(animalRes.data?.categoryHistory || []);
// //         setMedicalRecords(medicalRes.data || []);
// //         setVaccinationRecords(vaccRes.data || []);
// //         setMilkRecords(milkRes.data || []);
// //         setBreedingRecords(breedingRes.data || []);
// //       } catch (err) {
// //         console.error("Failed to load animal details", err);
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     })();
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [id]);

// //   if (loading) {
// //     return <div className="text-center py-12 text-gray-400">Loading...</div>;
// //   }

// //   if (!animal) {
// //     return (
// //       <div className="text-center py-12 text-gray-400">
// //         Animal not found.
// //         <button onClick={() => navigate("/animals")} className="block mx-auto mt-3 text-farm-green font-medium">
// //           Back to Animals
// //         </button>
// //       </div>
// //     );
// //   }

// //   const fullMedicalHistory = [
// //     ...medicalRecords.map((r) => ({ ...r, category: r.type, date: r.date })),
// //     ...vaccinationRecords.map((r) => ({
// //       ...r,
// //       category: "Vaccination",
// //       type: "Vaccination",
// //       date: r.lastGiven,
// //     })),
// //   ].sort((a, b) => new Date(b.date) - new Date(a.date));

// //   const shortcuts = [
// //     { key: "medical", icon: Stethoscope, label: "Medical History", count: fullMedicalHistory.length },
// //     { key: "vaccination", icon: Syringe, label: "Vaccinations", count: vaccinationRecords.length },
// //     { key: "milk", icon: Milk, label: "Milk Records", count: milkRecords.length },
// //     { key: "breeding", icon: HeartHandshake, label: "Breeding", count: breedingRecords.length },
// //     { key: "category", icon: Tag, label: "Category History", count: categoryHistory.length },
// //   ];

// //   const toggle = (key) => setActiveSection(activeSection === key ? null : key);

// //   return (
// //     <div>
// //       <button
// //         onClick={() => navigate("/animals")}
// //         className="flex items-center gap-2 text-gray-500 hover:text-farm-green text-sm mb-4"
// //       >
// //         <ArrowLeft size={16} /> Back to Animals
// //       </button>

// //       {/* Animal Profile */}
// // <div className="bg-white rounded-[24px] shadow-xs p-10 mb-6">

// //   {/* Photo */}
// //   <div className="flex flex-col items-center">

// //     <div className="relative">
// //       <AnimalAvatar
// //         photo={animal.photo}
// //         name={animal.name}
// //         size={150}
// //       />
// //     </div>

// //     <h2 className="mt-5 text-3xl font-bold text-gray-900">
// //       {animal.name}
// //     </h2>

// //     <p className="mt-2 text-gray-500 text-lg">
// //       Tag No : {animal.tag}
// //     </p>

// //     <div className="mt-4">
// //       <span className="inline-flex items-center rounded-full bg-farm-green/10 text-farm-green px-4 py-2 text-sm font-semibold">
// //         {animal.category || "Milking"}
// //       </span>
// //     </div>

// //   </div>

// //   {/* Divider */}

// //   <div className="border-t border-gray-100 my-10"></div>

// //   {/* Animal Details */}

// //   <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Species
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.species || "—"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Breed
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.breed || "—"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Gender
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.gender || "—"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Date of Birth
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {fmt(animal.dob) || "—"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Weight
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.weight ? `${animal.weight} kg` : "—"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Status
// //       </p>

// //       <span className="inline-flex rounded-full bg-green-100 text-green-700 px-4 py-1.5 text-sm font-medium">
// //         {animal.status || "Active"}
// //       </span>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         Category
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.category || "Milking"}
// //       </p>
// //     </div>

// //     <div>
// //       <p className="text-gray-400 text-sm mb-2">
// //         RFID / Tag
// //       </p>

// //       <p className="text-lg font-semibold text-gray-900">
// //         {animal.tag}
// //       </p>
// //     </div>

// //   </div>

// // </div>

// //       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
// //         {shortcuts.map(({ key, icon: Icon, label, count }) => (
// //           <button
// //             key={key}
// //             onClick={() => toggle(key)}
// //             className={`bg-white rounded-[20px] p-5 shadow-xs text-left hover:shadow-md transition-shadow border-2 ${
// //               activeSection === key ? "border-farm-green" : "border-transparent"
// //             }`}
// //           >
// //             <Icon className="text-farm-green mb-2" size={22} />
// //             <p className="text-sm font-medium text-gray-700">{label}</p>
// //             <p className="text-xs text-gray-400 mt-0.5">{count} record{count !== 1 ? "s" : ""}</p>
// //           </button>
// //         ))}
// //       </div>

// //       {activeSection === "medical" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //           {fullMedicalHistory.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">No medical history for {animal.name} yet.</div>
// //           ) : (
// //             <table className="w-full text-sm">
// //               <thead>
// //                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                   <th className="px-5 py-3 font-medium">Type</th>
// //                   <th className="px-5 py-3 font-medium">Details</th>
// //                   <th className="px-5 py-3 font-medium">Doctor / Vet</th>
// //                   <th className="px-5 py-3 font-medium">Date</th>
// //                   <th className="px-5 py-3 font-medium">Follow-up / Next Due</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {fullMedicalHistory.map((r) => (
// //                   <tr key={`${r.category}-${r._id}`} className="border-b border-gray-50 last:border-0">
// //                     <td className="px-5 py-3">
// //                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.category]}`}>
// //                         {r.category}
// //                       </span>
// //                     </td>
// //                     <td className="px-5 py-3 text-gray-500">
// //                       {r.type === "Treatment" && `${r.symptom} → ${r.treatment}`}
// //                       {r.type === "Mastitis" && `${r.quarter} · CMT: ${r.cmtResult} · ${r.treatment}`}
// //                       {r.type === "Deworming" && `${r.medicine} (${r.dosage})`}
// //                       {r.type === "BCS" && `Score: ${r.score} · ${r.notes}`}
// //                       {r.category === "Vaccination" && `${r.vaccine} vaccine`}
// //                     </td>
// //                     <td className="px-5 py-3 text-gray-500">{r.doctor || r.vet}</td>
// //                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
// //                     <td className="px-5 py-3 text-gray-500">{fmt(r.followUp) || fmt(r.dueDate) || "—"}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       )}

// //       {activeSection === "vaccination" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //           {vaccinationRecords.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">No vaccination records for {animal.name} yet.</div>
// //           ) : (
// //             <table className="w-full text-sm">
// //               <thead>
// //                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                   <th className="px-5 py-3 font-medium">Vaccine</th>
// //                   <th className="px-5 py-3 font-medium">Last Given</th>
// //                   <th className="px-5 py-3 font-medium">Due Date</th>
// //                   <th className="px-5 py-3 font-medium">Vet</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {vaccinationRecords.map((r) => (
// //                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
// //                     <td className="px-5 py-3 font-medium text-gray-800">{r.vaccine}</td>
// //                     <td className="px-5 py-3 text-gray-500">{fmt(r.lastGiven)}</td>
// //                     <td className="px-5 py-3 text-gray-500">{fmt(r.dueDate)}</td>
// //                     <td className="px-5 py-3 text-gray-500">{r.vet}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       )}

// //       {activeSection === "milk" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //           {milkRecords.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">No milk records for {animal.name} yet.</div>
// //           ) : (
// //             <table className="w-full text-sm">
// //               <thead>
// //                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                   <th className="px-5 py-3 font-medium">Date</th>
// //                   <th className="px-5 py-3 font-medium">Morning (L)</th>
// //                   <th className="px-5 py-3 font-medium">Evening (L)</th>
// //                   <th className="px-5 py-3 font-medium">Total (L)</th>
// //                   <th className="px-5 py-3 font-medium">Fat %</th>
// //                   <th className="px-5 py-3 font-medium">SNF %</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {milkRecords.map((r) => (
// //                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
// //                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
// //                     <td className="px-5 py-3 text-gray-500">{r.morning}</td>
// //                     <td className="px-5 py-3 text-gray-500">{r.evening}</td>
// //                     <td className="px-5 py-3 font-medium text-farm-green">
// //                       {(Number(r.morning) + Number(r.evening)).toFixed(1)}
// //                     </td>
// //                     <td className="px-5 py-3 text-gray-500">{r.fat || "—"}</td>
// //                     <td className="px-5 py-3 text-gray-500">{r.snf || "—"}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       )}

// //       {activeSection === "breeding" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //           {breedingRecords.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">No breeding records for {animal.name} yet.</div>
// //           ) : (
// //             <table className="w-full text-sm">
// //               <thead>
// //                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                   <th className="px-5 py-3 font-medium">Type</th>
// //                   <th className="px-5 py-3 font-medium">Details</th>
// //                   <th className="px-5 py-3 font-medium">Date</th>
// //                   <th className="px-5 py-3 font-medium">Expected Calving</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {breedingRecords.map((r) => (
// //                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
// //                     <td className="px-5 py-3">
// //                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.type]}`}>{r.type}</span>
// //                     </td>
// //                     <td className="px-5 py-3 text-gray-500">
// //                       {r.type === "Heat Detected" && r.signs}
// //                       {r.type === "AI" && `${r.bullSemen} · ${r.technician}`}
// //                       {r.type === "Pregnancy Diagnosis" && `${r.pdResult}${r.notes ? " · " + r.notes : ""}`}
// //                       {r.type === "Calving" && `${r.calfGender || ""} calf`}
// //                     </td>
// //                     <td className="px-5 py-3 text-gray-500">
// //                       {fmt(r.heatDate) || fmt(r.aiDate) || fmt(r.pdDate) || fmt(r.calvingDate)}
// //                     </td>
// //                     <td className="px-5 py-3 text-farm-green font-medium">{fmt(r.expectedCalving) || "—"}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       )}

// //       {activeSection === "category" && (
// //         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
// //           {categoryHistory.length === 0 ? (
// //             <div className="text-center py-10 text-gray-400">No category changes recorded for {animal.name} yet.</div>
// //           ) : (
// //             <table className="w-full text-sm">
// //               <thead>
// //                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
// //                   <th className="px-5 py-3 font-medium">Category</th>
// //                   <th className="px-5 py-3 font-medium">Reason</th>
// //                   <th className="px-5 py-3 font-medium">Changed By</th>
// //                   <th className="px-5 py-3 font-medium">Date</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {categoryHistory.map((h, i) => (
// //                   <tr key={i} className="border-b border-gray-50 last:border-0">
// //                     <td className="px-5 py-3 font-medium text-gray-800">{h.category}</td>
// //                     <td className="px-5 py-3 text-gray-500">{h.reason || "—"}</td>
// //                     <td className="px-5 py-3 text-gray-500">{h.changedBy || "—"}</td>
// //                     <td className="px-5 py-3 text-gray-500">{fmt(h.date)}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
















// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   ArrowLeft, Milk, Stethoscope, Syringe, HeartHandshake, Tag, Pencil,
//   Dna, User, Calendar, Weight, HeartPulse, CheckCircle2, AlertCircle,
//   Flame, Leaf, MoreVertical, Camera, X, Trash2, Copy, Activity,
// } from "lucide-react";
// import { getAnimalById } from "../../api/animals";
// import { getMedicalRecords } from "../../api/medical";
// import { getVaccinations } from "../../api/vaccination";
// import { getMilkRecords } from "../../api/milk";
// import { getBreedingRecords } from "../../api/breeding";

// const typeColor = {
//   Treatment: "bg-farm-brown/10 text-farm-brown",
//   Mastitis: "bg-red-50 text-red-500",
//   Deworming: "bg-farm-golden/10 text-farm-golden",
//   BCS: "bg-farm-green/10 text-farm-green",
//   Vaccination: "bg-blue-50 text-blue-500",
//   "Heat Detected": "bg-farm-golden/10 text-farm-golden",
//   AI: "bg-blue-50 text-blue-500",
//   "Pregnancy Diagnosis": "bg-farm-brown/10 text-farm-brown",
//   Calving: "bg-farm-green/10 text-farm-green",
// };

// const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");
// const fmtPretty = (d) =>
//   d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// // A record counts as "up to date" if it falls within this many days — no real business rule
// // exists for this yet, so this is a placeholder threshold until you tell us the real interval.
// const FRESHNESS_DAYS = 90;
// // Standard bovine estrus cycle length used only to *estimate* the next heat window — real
// // breeding software usually lets a vet override this per-animal.
// const ESTRUS_CYCLE_DAYS = 21;

// export default function AnimalDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [animal, setAnimal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [vaccinationRecords, setVaccinationRecords] = useState([]);
//   const [milkRecords, setMilkRecords] = useState([]);
//   const [breedingRecords, setBreedingRecords] = useState([]);
//   const [activeSection, setActiveSection] = useState(null);
//   const [categoryHistory, setCategoryHistory] = useState([]);
//   const [showPhoto, setShowPhoto] = useState(false);
//   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       try {
//         const [animalRes, medicalRes, vaccRes, milkRes, breedingRes] = await Promise.all([
//           getAnimalById(id),
//           getMedicalRecords({ animalId: id }),
//           getVaccinations({ animalId: id }),
//           getMilkRecords({ animalId: id }),
//           getBreedingRecords({ animalId: id }),
//         ]);
//         if (cancelled) return;
//         setAnimal(animalRes.data);
//         setCategoryHistory(animalRes.data?.categoryHistory || []);
//         setMedicalRecords(medicalRes.data || []);
//         setVaccinationRecords(vaccRes.data || []);
//         setMilkRecords(milkRes.data || []);
//         setBreedingRecords(breedingRes.data || []);
//       } catch (err) {
//         console.error("Failed to load animal details", err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   if (loading) {
//     return <div className="text-center py-12 text-gray-400">Loading...</div>;
//   }

//   if (!animal) {
//     return (
//       <div className="text-center py-12 text-gray-400">
//         Animal not found.
//         <button onClick={() => navigate("/animals")} className="block mx-auto mt-3 text-farm-green font-medium">
//           Back to Animals
//         </button>
//       </div>
//     );
//   }

//   const fullMedicalHistory = [
//     ...medicalRecords.map((r) => ({ ...r, category: r.type, date: r.date })),
//     ...vaccinationRecords.map((r) => ({
//       ...r,
//       category: "Vaccination",
//       type: "Vaccination",
//       date: r.lastGiven,
//     })),
//   ].sort((a, b) => new Date(b.date) - new Date(a.date));

//   const shortcuts = [
//     { key: "medical", icon: Stethoscope, label: "Medical History", count: fullMedicalHistory.length },
//     { key: "vaccination", icon: Syringe, label: "Vaccinations", count: vaccinationRecords.length },
//     { key: "milk", icon: Milk, label: "Milk Records", count: milkRecords.length },
//     { key: "breeding", icon: HeartHandshake, label: "Breeding", count: breedingRecords.length },
//     { key: "category", icon: Tag, label: "Category History", count: categoryHistory.length },
//   ];

//   const toggle = (key) => setActiveSection(activeSection === key ? null : key);

//   // ---- Milk Production: weekly bars from real milkRecords ----
//   const sortedMilk = [...milkRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
//   const last7 = sortedMilk.slice(-7);
//   const weeklyBars = last7.map((r) => ({
//     day: new Date(r.date).toLocaleDateString("en-US", { weekday: "narrow" }),
//     total: Number(r.morning || 0) + Number(r.evening || 0),
//   }));
//   const maxBar = Math.max(...weeklyBars.map((b) => b.total), 1);
//   const latestMilk = last7[last7.length - 1];
//   const avgMilk =
//     last7.length > 0
//       ? last7.reduce((sum, r) => sum + Number(r.morning || 0) + Number(r.evening || 0), 0) / last7.length
//       : 0;

//   // ---- Health Overview: real dates, substituting your actual record categories ----
//   const latestOfType = (type) =>
//     fullMedicalHistory.find((r) => r.category === type || r.type === type)?.date || null;

//   const isFresh = (date) => {
//     if (!date) return false;
//     const days = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
//     return days <= FRESHNESS_DAYS;
//   };

//   // Note: "Hoof Trimming" in the reference has no matching record type in your schema,
//   // so this uses "BCS Check" (a category that actually exists) in its place.
//   const healthChecks = [
//     { label: "Regular Checkup", date: latestOfType("Treatment") },
//     { label: "Vaccination", date: latestOfType("Vaccination") },
//     { label: "Deworming", date: latestOfType("Deworming") },
//     { label: "BCS Check", date: latestOfType("BCS") },
//   ];
//   const healthScore = Math.round(
//     (healthChecks.filter((c) => isFresh(c.date)).length / healthChecks.length) * 100
//   );

//   // ---- Reproductive Status: derived from real breedingRecords ----
//   const sortedBreeding = [...breedingRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
//   const lastHeatRecord = breedingRecords
//     .filter((r) => r.type === "Heat Detected")
//     .sort((a, b) => new Date(b.heatDate) - new Date(a.heatDate))[0];
//   const lastPD = breedingRecords
//     .filter((r) => r.type === "Pregnancy Diagnosis")
//     .sort((a, b) => new Date(b.pdDate) - new Date(a.pdDate))[0];
//   const lastCalving = breedingRecords
//     .filter((r) => r.type === "Calving")
//     .sort((a, b) => new Date(b.calvingDate) - new Date(a.calvingDate))[0];

//   const isPregnant =
//     lastPD?.pdResult?.toLowerCase() === "positive" &&
//     (!lastCalving || new Date(lastPD.pdDate) > new Date(lastCalving.calvingDate));

//   const nextHeatExpected = lastHeatRecord?.heatDate
//     ? new Date(new Date(lastHeatRecord.heatDate).getTime() + ESTRUS_CYCLE_DAYS * 24 * 60 * 60 * 1000)
//     : null;

//   // ---- Next Schedule: real upcoming due dates ----
//   const upcoming = [
//     ...vaccinationRecords
//       .filter((r) => r.dueDate && new Date(r.dueDate) >= new Date())
//       .map((r) => ({ label: `${r.vaccine} Vaccination`, date: r.dueDate, icon: Syringe })),
//     ...medicalRecords
//       .filter((r) => (r.followUp || r.dueDate) && new Date(r.followUp || r.dueDate) >= new Date())
//       .map((r) => ({ label: `${r.type} Follow-up`, date: r.followUp || r.dueDate, icon: Stethoscope })),
//     ...(nextHeatExpected && !isPregnant
//       ? [{ label: "Heat Period (est.)", date: nextHeatExpected, icon: Flame }]
//       : []),
//   ]
//     .sort((a, b) => new Date(a.date) - new Date(b.date))
//     .slice(0, 3);

//   // ---- Recent Activity Timeline: latest item from each real record source ----
//   const timeline = [
//     vaccinationRecords.length > 0 && {
//       label: "Vaccination",
//       detail: [...vaccinationRecords].sort((a, b) => new Date(b.lastGiven) - new Date(a.lastGiven))[0].vaccine,
//       date: [...vaccinationRecords].sort((a, b) => new Date(b.lastGiven) - new Date(a.lastGiven))[0].lastGiven,
//       icon: CheckCircle2,
//       color: "bg-green-100 text-green-600",
//     },
//     medicalRecords.filter((r) => r.type === "Deworming").length > 0 && {
//       label: "Deworming",
//       detail: [...medicalRecords].filter((r) => r.type === "Deworming").sort((a, b) => new Date(b.date) - new Date(a.date))[0].medicine,
//       date: [...medicalRecords].filter((r) => r.type === "Deworming").sort((a, b) => new Date(b.date) - new Date(a.date))[0].date,
//       icon: Syringe,
//       color: "bg-blue-100 text-blue-600",
//     },
//     medicalRecords.filter((r) => r.type === "Treatment" || r.type === "BCS").length > 0 && {
//       label: "Health Checkup",
//       detail: [...medicalRecords]
//         .filter((r) => r.type === "Treatment" || r.type === "BCS")
//         .sort((a, b) => new Date(b.date) - new Date(a.date))[0].type === "Treatment"
//         ? [...medicalRecords].filter((r) => r.type === "Treatment").sort((a, b) => new Date(b.date) - new Date(a.date))[0].symptom
//         : "Routine Checkup",
//       date: [...medicalRecords]
//         .filter((r) => r.type === "Treatment" || r.type === "BCS")
//         .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date,
//       icon: HeartPulse,
//       color: "bg-orange-100 text-orange-600",
//     },
//     milkRecords.length > 0 && {
//       label: "Milk Recording",
//       detail: `${(Number(sortedMilk[sortedMilk.length - 1].morning) + Number(sortedMilk[sortedMilk.length - 1].evening)).toFixed(1)} L / Day`,
//       date: sortedMilk[sortedMilk.length - 1].date,
//       icon: Milk,
//       color: "bg-purple-100 text-purple-600",
//     },
//   ].filter(Boolean);

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <button
//           onClick={() => navigate("/animals")}
//           className="flex items-center gap-2 text-gray-500 hover:text-farm-green text-sm"
//         >
//           <ArrowLeft size={16} /> Back to Animals
//         </button>
//         <div className="flex items-center gap-2 relative">
//           <button
//             onClick={() => navigate(`/animals/${id}/edit`)}
//             className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
//           >
//             <Pencil size={16} /> Edit Animal
//           </button>
//           <button
//             onClick={() => setShowMenu((v) => !v)}
//             className="w-11 h-11 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-center text-gray-500 hover:text-gray-700"
//             aria-label="More actions"
//           >
//             <MoreVertical size={18} />
//           </button>
//           {showMenu && (
//             <div className="absolute right-0 top-14 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 w-44 z-30">
//               <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
//                 <Copy size={15} /> Duplicate
//               </button>
//               <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
//                 <Trash2 size={15} /> Delete Animal
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Hero profile */}
//       <div className="relative rounded-[28px] bg-linear-to-br from-farm-cream to-farm-green/10 p-8 mb-6 overflow-hidden">

//         <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//           {/* Left: name + quote + added info */}
//           <div className="lg:col-span-4">
//             <span className="inline-flex items-center gap-1.5 bg-farm-green/10 text-farm-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
//               <CheckCircle2 size={14} /> {animal.category || animal.status || "Milking"}
//             </span>
//             <h2 className="text-4xl font-extrabold text-farm-green mb-2">{animal.name}</h2>
//             <p className="text-gray-600 mb-4">
//               Tag No : <span className="font-semibold">{animal.tag}</span>
//             </p>
//           </div>

//           {/* Center: circular photo */}
//           <div className="lg:col-span-4 flex flex-col items-center">
//             <div className="w-64 h-64 rounded-full overflow-hidden ring-8 ring-white shadow-lg">
//               {animal.photo ? (
//                 <img src={animal.photo} alt={animal.name} className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full bg-farm-cream flex items-center justify-center">
//                   <Dna size={48} className="text-gray-300" />
//                 </div>
//               )}
//             </div>
//             {animal.photo && (
//               <button
//                 onClick={() => setShowPhoto(true)}
//                 className="mt-4 flex items-center gap-2 bg-white shadow-xs px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 <Camera size={15} /> View Full Photo
//               </button>
//             )}
//           </div>

//           {/* Right: details grid */}
//           <div className="lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-6">
//             {[
//               { icon: Dna, label: "Species", value: animal.species },
//               { icon: Dna, label: "Breed", value: animal.breed },
//               { icon: User, label: "Gender", value: animal.gender },
//               { icon: Calendar, label: "Date of Birth", value: fmtPretty(animal.dob) },
//               { icon: Weight, label: "Weight", value: animal.weight ? `${animal.weight} kg` : "—" },
//               { icon: Tag, label: "Category", value: animal.category || animal.status || "—" },
//             ].map(({ icon: Icon, label, value }) => (
//               <div key={label} className="flex items-start gap-3">
//                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
//                   <Icon size={17} className="text-farm-green" />
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400 mb-0.5">{label}</p>
//                   <p className="font-semibold text-gray-900 text-sm">{value || "—"}</p>
//                 </div>
//               </div>
//             ))}
//             <div className="flex items-start gap-3">
//               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
//                 <HeartPulse size={17} className="text-farm-green" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 mb-0.5">Status</p>
//                 <span className="inline-flex rounded-full bg-farm-green/10 text-farm-green px-3 py-0.5 text-xs font-medium">
//                   {animal.status || "—"}
//                 </span>
//               </div>
//             </div>
//             <div className="flex items-start gap-3">
//               <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
//                 <Tag size={17} className="text-farm-green" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-400 mb-0.5">RFID / Tag</p>
//                 <p className="font-semibold text-gray-900 text-sm">{animal.tag}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Photo lightbox */}
//       {showPhoto && (
//         <div
//           className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
//           onClick={() => setShowPhoto(false)}
//         >
//           <button className="absolute top-6 right-6 text-white" aria-label="Close">
//             <X size={28} />
//           </button>
//           <img src={animal.photo} alt={animal.name} className="max-w-full max-h-full rounded-2xl" />
//         </div>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//         {shortcuts.map(({ key, icon: Icon, label, count }) => (
//           <button
//             key={key}
//             onClick={() => toggle(key)}
//             className={`bg-white rounded-[20px] p-5 shadow-xs text-left hover:shadow-md transition-shadow border-2 ${
//               activeSection === key ? "border-farm-green" : "border-transparent"
//             }`}
//           >
//             <Icon className="text-farm-green mb-2" size={22} />
//             <p className="text-sm font-medium text-gray-700">{label}</p>
//             <p className="text-xs text-gray-400 mt-0.5">{count} record{count !== 1 ? "s" : ""}</p>
//           </button>
//         ))}
//       </div>

//       {activeSection === "medical" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {fullMedicalHistory.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No medical history for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Type</th>
//                   <th className="px-5 py-3 font-medium">Details</th>
//                   <th className="px-5 py-3 font-medium">Doctor / Vet</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Follow-up / Next Due</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fullMedicalHistory.map((r) => (
//                   <tr key={`${r.category}-${r._id}`} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3">
//                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.category]}`}>
//                         {r.category}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {r.type === "Treatment" && `${r.symptom} → ${r.treatment}`}
//                       {r.type === "Mastitis" && `${r.quarter} · CMT: ${r.cmtResult} · ${r.treatment}`}
//                       {r.type === "Deworming" && `${r.medicine} (${r.dosage})`}
//                       {r.type === "BCS" && `Score: ${r.score} · ${r.notes}`}
//                       {r.category === "Vaccination" && `${r.vaccine} vaccine`}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">{r.doctor || r.vet}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.followUp) || fmt(r.dueDate) || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "vaccination" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {vaccinationRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No vaccination records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Vaccine</th>
//                   <th className="px-5 py-3 font-medium">Last Given</th>
//                   <th className="px-5 py-3 font-medium">Due Date</th>
//                   <th className="px-5 py-3 font-medium">Vet</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vaccinationRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 font-medium text-gray-800">{r.vaccine}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.lastGiven)}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.dueDate)}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.vet}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "milk" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {milkRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No milk records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Morning (L)</th>
//                   <th className="px-5 py-3 font-medium">Evening (L)</th>
//                   <th className="px-5 py-3 font-medium">Total (L)</th>
//                   <th className="px-5 py-3 font-medium">Fat %</th>
//                   <th className="px-5 py-3 font-medium">SNF %</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {milkRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.morning}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.evening}</td>
//                     <td className="px-5 py-3 font-medium text-farm-green">
//                       {(Number(r.morning) + Number(r.evening)).toFixed(1)}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">{r.fat || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.snf || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "breeding" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {breedingRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No breeding records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Type</th>
//                   <th className="px-5 py-3 font-medium">Details</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Expected Calving</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {breedingRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3">
//                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.type]}`}>{r.type}</span>
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {r.type === "Heat Detected" && r.signs}
//                       {r.type === "AI" && `${r.bullSemen} · ${r.technician}`}
//                       {r.type === "Pregnancy Diagnosis" && `${r.pdResult}${r.notes ? " · " + r.notes : ""}`}
//                       {r.type === "Calving" && `${r.calfGender || ""} calf`}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {fmt(r.heatDate) || fmt(r.aiDate) || fmt(r.pdDate) || fmt(r.calvingDate)}
//                     </td>
//                     <td className="px-5 py-3 text-farm-green font-medium">{fmt(r.expectedCalving) || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "category" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {categoryHistory.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No category changes recorded for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Category</th>
//                   <th className="px-5 py-3 font-medium">Reason</th>
//                   <th className="px-5 py-3 font-medium">Changed By</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categoryHistory.map((h, i) => (
//                   <tr key={i} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 font-medium text-gray-800">{h.category}</td>
//                     <td className="px-5 py-3 text-gray-500">{h.reason || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{h.changedBy || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(h.date)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Milk, Stethoscope, Syringe, HeartHandshake, Tag } from "lucide-react";
// import AnimalAvatar from "../../components/AnimalAvatar";
// import { getAnimalById } from "../../api/animals";
// import { getMedicalRecords } from "../../api/medical";
// import { getVaccinations } from "../../api/vaccination";
// import { getMilkRecords } from "../../api/milk";
// import { getBreedingRecords } from "../../api/breeding";

// const typeColor = {
//   Treatment: "bg-farm-brown/10 text-farm-brown",
//   Mastitis: "bg-red-50 text-red-500",
//   Deworming: "bg-farm-golden/10 text-farm-golden",
//   BCS: "bg-farm-green/10 text-farm-green",
//   Vaccination: "bg-blue-50 text-blue-500",
//   "Heat Detected": "bg-farm-golden/10 text-farm-golden",
//   AI: "bg-blue-50 text-blue-500",
//   "Pregnancy Diagnosis": "bg-farm-brown/10 text-farm-brown",
//   Calving: "bg-farm-green/10 text-farm-green",
// };

// const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

// export default function AnimalDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [animal, setAnimal] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [medicalRecords, setMedicalRecords] = useState([]);
//   const [vaccinationRecords, setVaccinationRecords] = useState([]);
//   const [milkRecords, setMilkRecords] = useState([]);
//   const [breedingRecords, setBreedingRecords] = useState([]);
//   const [activeSection, setActiveSection] = useState(null);
//   const [categoryHistory, setCategoryHistory] = useState([]);

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       setLoading(true);
//       try {
//         const [animalRes, medicalRes, vaccRes, milkRes, breedingRes] = await Promise.all([
//           getAnimalById(id),
//           getMedicalRecords({ animalId: id }),
//           getVaccinations({ animalId: id }),
//           getMilkRecords({ animalId: id }),
//           getBreedingRecords({ animalId: id }),
//         ]);
//         if (cancelled) return;
//         setAnimal(animalRes.data);
//         setCategoryHistory(animalRes.data?.categoryHistory || []);
//         setMedicalRecords(medicalRes.data || []);
//         setVaccinationRecords(vaccRes.data || []);
//         setMilkRecords(milkRes.data || []);
//         setBreedingRecords(breedingRes.data || []);
//       } catch (err) {
//         console.error("Failed to load animal details", err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, [id]);

//   if (loading) {
//     return <div className="text-center py-12 text-gray-400">Loading...</div>;
//   }

//   if (!animal) {
//     return (
//       <div className="text-center py-12 text-gray-400">
//         Animal not found.
//         <button onClick={() => navigate("/animals")} className="block mx-auto mt-3 text-farm-green font-medium">
//           Back to Animals
//         </button>
//       </div>
//     );
//   }

//   const fullMedicalHistory = [
//     ...medicalRecords.map((r) => ({ ...r, category: r.type, date: r.date })),
//     ...vaccinationRecords.map((r) => ({
//       ...r,
//       category: "Vaccination",
//       type: "Vaccination",
//       date: r.lastGiven,
//     })),
//   ].sort((a, b) => new Date(b.date) - new Date(a.date));

//   const shortcuts = [
//     { key: "medical", icon: Stethoscope, label: "Medical History", count: fullMedicalHistory.length },
//     { key: "vaccination", icon: Syringe, label: "Vaccinations", count: vaccinationRecords.length },
//     { key: "milk", icon: Milk, label: "Milk Records", count: milkRecords.length },
//     { key: "breeding", icon: HeartHandshake, label: "Breeding", count: breedingRecords.length },
//     { key: "category", icon: Tag, label: "Category History", count: categoryHistory.length },
//   ];

//   const toggle = (key) => setActiveSection(activeSection === key ? null : key);

//   return (
//     <div>
//       <button
//         onClick={() => navigate("/animals")}
//         className="flex items-center gap-2 text-gray-500 hover:text-farm-green text-sm mb-4"
//       >
//         <ArrowLeft size={16} /> Back to Animals
//       </button>

//       {/* Animal Profile */}
// <div className="bg-white rounded-[24px] shadow-xs p-10 mb-6">

//   {/* Photo */}
//   <div className="flex flex-col items-center">

//     <div className="relative">
//       <AnimalAvatar
//         photo={animal.photo}
//         name={animal.name}
//         size={150}
//       />
//     </div>

//     <h2 className="mt-5 text-3xl font-bold text-gray-900">
//       {animal.name}
//     </h2>

//     <p className="mt-2 text-gray-500 text-lg">
//       Tag No : {animal.tag}
//     </p>

//     <div className="mt-4">
//       <span className="inline-flex items-center rounded-full bg-farm-green/10 text-farm-green px-4 py-2 text-sm font-semibold">
//         {animal.category || "Milking"}
//       </span>
//     </div>

//   </div>

//   {/* Divider */}

//   <div className="border-t border-gray-100 my-10"></div>

//   {/* Animal Details */}

//   <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Species
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.species || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Breed
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.breed || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Gender
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.gender || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Date of Birth
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {fmt(animal.dob) || "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Weight
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.weight ? `${animal.weight} kg` : "—"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Status
//       </p>

//       <span className="inline-flex rounded-full bg-green-100 text-green-700 px-4 py-1.5 text-sm font-medium">
//         {animal.status || "Active"}
//       </span>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         Category
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.category || "Milking"}
//       </p>
//     </div>

//     <div>
//       <p className="text-gray-400 text-sm mb-2">
//         RFID / Tag
//       </p>

//       <p className="text-lg font-semibold text-gray-900">
//         {animal.tag}
//       </p>
//     </div>

//   </div>

// </div>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//         {shortcuts.map(({ key, icon: Icon, label, count }) => (
//           <button
//             key={key}
//             onClick={() => toggle(key)}
//             className={`bg-white rounded-[20px] p-5 shadow-xs text-left hover:shadow-md transition-shadow border-2 ${
//               activeSection === key ? "border-farm-green" : "border-transparent"
//             }`}
//           >
//             <Icon className="text-farm-green mb-2" size={22} />
//             <p className="text-sm font-medium text-gray-700">{label}</p>
//             <p className="text-xs text-gray-400 mt-0.5">{count} record{count !== 1 ? "s" : ""}</p>
//           </button>
//         ))}
//       </div>

//       {activeSection === "medical" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {fullMedicalHistory.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No medical history for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Type</th>
//                   <th className="px-5 py-3 font-medium">Details</th>
//                   <th className="px-5 py-3 font-medium">Doctor / Vet</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Follow-up / Next Due</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fullMedicalHistory.map((r) => (
//                   <tr key={`${r.category}-${r._id}`} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3">
//                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.category]}`}>
//                         {r.category}
//                       </span>
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {r.type === "Treatment" && `${r.symptom} → ${r.treatment}`}
//                       {r.type === "Mastitis" && `${r.quarter} · CMT: ${r.cmtResult} · ${r.treatment}`}
//                       {r.type === "Deworming" && `${r.medicine} (${r.dosage})`}
//                       {r.type === "BCS" && `Score: ${r.score} · ${r.notes}`}
//                       {r.category === "Vaccination" && `${r.vaccine} vaccine`}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">{r.doctor || r.vet}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.followUp) || fmt(r.dueDate) || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "vaccination" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {vaccinationRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No vaccination records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Vaccine</th>
//                   <th className="px-5 py-3 font-medium">Last Given</th>
//                   <th className="px-5 py-3 font-medium">Due Date</th>
//                   <th className="px-5 py-3 font-medium">Vet</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {vaccinationRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 font-medium text-gray-800">{r.vaccine}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.lastGiven)}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.dueDate)}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.vet}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "milk" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {milkRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No milk records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Morning (L)</th>
//                   <th className="px-5 py-3 font-medium">Evening (L)</th>
//                   <th className="px-5 py-3 font-medium">Total (L)</th>
//                   <th className="px-5 py-3 font-medium">Fat %</th>
//                   <th className="px-5 py-3 font-medium">SNF %</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {milkRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.morning}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.evening}</td>
//                     <td className="px-5 py-3 font-medium text-farm-green">
//                       {(Number(r.morning) + Number(r.evening)).toFixed(1)}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">{r.fat || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{r.snf || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "breeding" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {breedingRecords.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No breeding records for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Type</th>
//                   <th className="px-5 py-3 font-medium">Details</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                   <th className="px-5 py-3 font-medium">Expected Calving</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {breedingRecords.map((r) => (
//                   <tr key={r._id} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3">
//                       <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.type]}`}>{r.type}</span>
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {r.type === "Heat Detected" && r.signs}
//                       {r.type === "AI" && `${r.bullSemen} · ${r.technician}`}
//                       {r.type === "Pregnancy Diagnosis" && `${r.pdResult}${r.notes ? " · " + r.notes : ""}`}
//                       {r.type === "Calving" && `${r.calfGender || ""} calf`}
//                     </td>
//                     <td className="px-5 py-3 text-gray-500">
//                       {fmt(r.heatDate) || fmt(r.aiDate) || fmt(r.pdDate) || fmt(r.calvingDate)}
//                     </td>
//                     <td className="px-5 py-3 text-farm-green font-medium">{fmt(r.expectedCalving) || "—"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {activeSection === "category" && (
//         <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
//           {categoryHistory.length === 0 ? (
//             <div className="text-center py-10 text-gray-400">No category changes recorded for {animal.name} yet.</div>
//           ) : (
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
//                   <th className="px-5 py-3 font-medium">Category</th>
//                   <th className="px-5 py-3 font-medium">Reason</th>
//                   <th className="px-5 py-3 font-medium">Changed By</th>
//                   <th className="px-5 py-3 font-medium">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {categoryHistory.map((h, i) => (
//                   <tr key={i} className="border-b border-gray-50 last:border-0">
//                     <td className="px-5 py-3 font-medium text-gray-800">{h.category}</td>
//                     <td className="px-5 py-3 text-gray-500">{h.reason || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{h.changedBy || "—"}</td>
//                     <td className="px-5 py-3 text-gray-500">{fmt(h.date)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
















import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Milk, Stethoscope, Syringe, HeartHandshake, Tag, Pencil,
  Dna, User, Calendar, Weight, HeartPulse, CheckCircle2, AlertCircle,
  Flame, Leaf, MoreVertical, Camera, X, Trash2, Copy, Activity,
} from "lucide-react";
import { getAnimalById } from "../../api/animals";
import { getMedicalRecords } from "../../api/medical";
import { getVaccinations } from "../../api/vaccination";
import { getMilkRecords } from "../../api/milk";
import { getBreedingRecords } from "../../api/breeding";
import { can } from "../../utils/permissions";

const typeColor = {
  Treatment: "bg-farm-brown/10 text-farm-brown",
  Mastitis: "bg-red-50 text-red-500",
  Deworming: "bg-farm-golden/10 text-farm-golden",
  BCS: "bg-farm-green/10 text-farm-green",
  Vaccination: "bg-blue-50 text-blue-500",
  "Heat Detected": "bg-farm-golden/10 text-farm-golden",
  AI: "bg-blue-50 text-blue-500",
  "Pregnancy Diagnosis": "bg-farm-brown/10 text-farm-brown",
  Calving: "bg-farm-green/10 text-farm-green",
};

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");
const fmtPretty = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

// A record counts as "up to date" if it falls within this many days — no real business rule
// exists for this yet, so this is a placeholder threshold until you tell us the real interval.
const FRESHNESS_DAYS = 90;
// Standard bovine estrus cycle length used only to *estimate* the next heat window — real
// breeding software usually lets a vet override this per-animal.
const ESTRUS_CYCLE_DAYS = 21;

export default function AnimalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [milkRecords, setMilkRecords] = useState([]);
  const [breedingRecords, setBreedingRecords] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [categoryHistory, setCategoryHistory] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [animalRes, medicalRes, vaccRes, milkRes, breedingRes] = await Promise.all([
          getAnimalById(id),
          getMedicalRecords({ animalId: id }),
          getVaccinations({ animalId: id }),
          getMilkRecords({ animalId: id }),
          getBreedingRecords({ animalId: id }),
        ]);
        if (cancelled) return;
        setAnimal(animalRes.data);
        setCategoryHistory(animalRes.data?.categoryHistory || []);
        setMedicalRecords(medicalRes.data || []);
        setVaccinationRecords(vaccRes.data || []);
        setMilkRecords(milkRes.data || []);
        setBreedingRecords(breedingRes.data || []);
      } catch (err) {
        console.error("Failed to load animal details", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>;
  }

  if (!animal) {
    return (
      <div className="text-center py-12 text-gray-400">
        Animal not found.
        <button onClick={() => navigate("/animals")} className="block mx-auto mt-3 text-farm-green font-medium">
          Back to Animals
        </button>
      </div>
    );
  }

  const fullMedicalHistory = [
    ...medicalRecords.map((r) => ({ ...r, category: r.type, date: r.date })),
    ...vaccinationRecords.map((r) => ({
      ...r,
      category: "Vaccination",
      type: "Vaccination",
      date: r.lastGiven,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const shortcuts = [
    { key: "medical", icon: Stethoscope, label: "Medical History", count: fullMedicalHistory.length },
    { key: "vaccination", icon: Syringe, label: "Vaccinations", count: vaccinationRecords.length },
    { key: "milk", icon: Milk, label: "Milk Records", count: milkRecords.length },
    { key: "breeding", icon: HeartHandshake, label: "Breeding", count: breedingRecords.length },
    { key: "category", icon: Tag, label: "Category History", count: categoryHistory.length },
  ];

  const toggle = (key) => setActiveSection(activeSection === key ? null : key);

  // ---- Milk Production: weekly bars from real milkRecords ----
  const sortedMilk = [...milkRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
  const last7 = sortedMilk.slice(-7);
  const weeklyBars = last7.map((r) => ({
    day: new Date(r.date).toLocaleDateString("en-US", { weekday: "narrow" }),
    total: Number(r.morning || 0) + Number(r.evening || 0),
  }));
  const maxBar = Math.max(...weeklyBars.map((b) => b.total), 1);
  const latestMilk = last7[last7.length - 1];
  const avgMilk =
    last7.length > 0
      ? last7.reduce((sum, r) => sum + Number(r.morning || 0) + Number(r.evening || 0), 0) / last7.length
      : 0;

  // ---- Health Overview: real dates, substituting your actual record categories ----
  const latestOfType = (type) =>
    fullMedicalHistory.find((r) => r.category === type || r.type === type)?.date || null;

  const isFresh = (date) => {
    if (!date) return false;
    const days = (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
    return days <= FRESHNESS_DAYS;
  };

  // Note: "Hoof Trimming" in the reference has no matching record type in your schema,
  // so this uses "BCS Check" (a category that actually exists) in its place.
  const healthChecks = [
    { label: "Regular Checkup", date: latestOfType("Treatment") },
    { label: "Vaccination", date: latestOfType("Vaccination") },
    { label: "Deworming", date: latestOfType("Deworming") },
    { label: "BCS Check", date: latestOfType("BCS") },
  ];
  const healthScore = Math.round(
    (healthChecks.filter((c) => isFresh(c.date)).length / healthChecks.length) * 100
  );

  // ---- Reproductive Status: derived from real breedingRecords ----
  const sortedBreeding = [...breedingRecords].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastHeatRecord = breedingRecords
    .filter((r) => r.type === "Heat Detected")
    .sort((a, b) => new Date(b.heatDate) - new Date(a.heatDate))[0];
  const lastPD = breedingRecords
    .filter((r) => r.type === "Pregnancy Diagnosis")
    .sort((a, b) => new Date(b.pdDate) - new Date(a.pdDate))[0];
  const lastCalving = breedingRecords
    .filter((r) => r.type === "Calving")
    .sort((a, b) => new Date(b.calvingDate) - new Date(a.calvingDate))[0];

  const isPregnant =
    lastPD?.pdResult?.toLowerCase() === "positive" &&
    (!lastCalving || new Date(lastPD.pdDate) > new Date(lastCalving.calvingDate));

  const nextHeatExpected = lastHeatRecord?.heatDate
    ? new Date(new Date(lastHeatRecord.heatDate).getTime() + ESTRUS_CYCLE_DAYS * 24 * 60 * 60 * 1000)
    : null;

  // ---- Next Schedule: real upcoming due dates ----
  const upcoming = [
    ...vaccinationRecords
      .filter((r) => r.dueDate && new Date(r.dueDate) >= new Date())
      .map((r) => ({ label: `${r.vaccine} Vaccination`, date: r.dueDate, icon: Syringe })),
    ...medicalRecords
      .filter((r) => (r.followUp || r.dueDate) && new Date(r.followUp || r.dueDate) >= new Date())
      .map((r) => ({ label: `${r.type} Follow-up`, date: r.followUp || r.dueDate, icon: Stethoscope })),
    ...(nextHeatExpected && !isPregnant
      ? [{ label: "Heat Period (est.)", date: nextHeatExpected, icon: Flame }]
      : []),
  ]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // ---- Recent Activity Timeline: latest item from each real record source ----
  const timeline = [
    vaccinationRecords.length > 0 && {
      label: "Vaccination",
      detail: [...vaccinationRecords].sort((a, b) => new Date(b.lastGiven) - new Date(a.lastGiven))[0].vaccine,
      date: [...vaccinationRecords].sort((a, b) => new Date(b.lastGiven) - new Date(a.lastGiven))[0].lastGiven,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    medicalRecords.filter((r) => r.type === "Deworming").length > 0 && {
      label: "Deworming",
      detail: [...medicalRecords].filter((r) => r.type === "Deworming").sort((a, b) => new Date(b.date) - new Date(a.date))[0].medicine,
      date: [...medicalRecords].filter((r) => r.type === "Deworming").sort((a, b) => new Date(b.date) - new Date(a.date))[0].date,
      icon: Syringe,
      color: "bg-blue-100 text-blue-600",
    },
    medicalRecords.filter((r) => r.type === "Treatment" || r.type === "BCS").length > 0 && {
      label: "Health Checkup",
      detail: [...medicalRecords]
        .filter((r) => r.type === "Treatment" || r.type === "BCS")
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0].type === "Treatment"
        ? [...medicalRecords].filter((r) => r.type === "Treatment").sort((a, b) => new Date(b.date) - new Date(a.date))[0].symptom
        : "Routine Checkup",
      date: [...medicalRecords]
        .filter((r) => r.type === "Treatment" || r.type === "BCS")
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0].date,
      icon: HeartPulse,
      color: "bg-orange-100 text-orange-600",
    },
    milkRecords.length > 0 && {
      label: "Milk Recording",
      detail: `${(Number(sortedMilk[sortedMilk.length - 1].morning) + Number(sortedMilk[sortedMilk.length - 1].evening)).toFixed(1)} L / Day`,
      date: sortedMilk[sortedMilk.length - 1].date,
      icon: Milk,
      color: "bg-purple-100 text-purple-600",
    },
  ].filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate("/animals")}
          className="flex items-center gap-2 text-gray-500 hover:text-farm-green text-sm"
        >
          <ArrowLeft size={16} /> Back to Animals
        </button>
        <div className="flex items-center gap-2 relative">
          {can("animals", "update") && (
            <button
              onClick={() => navigate(`/animals/${id}/edit`)}
              className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
            >
              <Pencil size={16} /> Edit Animal
            </button>
          )}
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="w-11 h-11 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-center text-gray-500 hover:text-gray-700"
            aria-label="More actions"
          >
            <MoreVertical size={18} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-14 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 w-44 z-30">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                <Copy size={15} /> Duplicate
              </button>
              {can("animals", "remove") && (
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                  <Trash2 size={15} /> Delete Animal
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hero profile */}
      <div className="relative rounded-[28px] bg-linear-to-br from-farm-cream to-farm-green/10 p-8 mb-6 overflow-hidden">

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: name + quote + added info */}
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-1.5 bg-farm-green/10 text-farm-green px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <CheckCircle2 size={14} /> {animal.category || animal.status || "Milking"}
            </span>
            <h2 className="text-4xl font-extrabold text-farm-green mb-2">{animal.name}</h2>
            <p className="text-gray-600 mb-4">
              Tag No : <span className="font-semibold">{animal.tag}</span>
            </p>
          </div>

          {/* Center: circular photo */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden ring-8 ring-white shadow-lg">
              {animal.photo ? (
                <img src={animal.photo} alt={animal.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-farm-cream flex items-center justify-center">
                  <Dna size={48} className="text-gray-300" />
                </div>
              )}
            </div>
            {animal.photo && (
              <button
                onClick={() => setShowPhoto(true)}
                className="mt-4 flex items-center gap-2 bg-white shadow-xs px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Camera size={15} /> View Full Photo
              </button>
            )}
          </div>

          {/* Right: details grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-6">
            {[
              { icon: Dna, label: "Species", value: animal.species },
              { icon: Dna, label: "Breed", value: animal.breed },
              { icon: User, label: "Gender", value: animal.gender },
              { icon: Calendar, label: "Date of Birth", value: fmtPretty(animal.dob) },
              { icon: Weight, label: "Weight", value: animal.weight ? `${animal.weight} kg` : "—" },
              { icon: Tag, label: "Category", value: animal.category || animal.status || "—" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                  <Icon size={17} className="text-farm-green" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="font-semibold text-gray-900 text-sm">{value || "—"}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <HeartPulse size={17} className="text-farm-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Status</p>
                <span className="inline-flex rounded-full bg-farm-green/10 text-farm-green px-3 py-0.5 text-xs font-medium">
                  {animal.status || "—"}
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <Tag size={17} className="text-farm-green" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">RFID / Tag</p>
                <p className="font-semibold text-gray-900 text-sm">{animal.tag}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo lightbox */}
      {showPhoto && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
          onClick={() => setShowPhoto(false)}
        >
          <button className="absolute top-6 right-6 text-white" aria-label="Close">
            <X size={28} />
          </button>
          <img src={animal.photo} alt={animal.name} className="max-w-full max-h-full rounded-2xl" />
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {shortcuts.map(({ key, icon: Icon, label, count }) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`bg-white rounded-[20px] p-5 shadow-xs text-left hover:shadow-md transition-shadow border-2 ${
              activeSection === key ? "border-farm-green" : "border-transparent"
            }`}
          >
            <Icon className="text-farm-green mb-2" size={22} />
            <p className="text-sm font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{count} record{count !== 1 ? "s" : ""}</p>
          </button>
        ))}
      </div>

      {activeSection === "medical" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
          {fullMedicalHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No medical history for {animal.name} yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Details</th>
                  <th className="px-5 py-3 font-medium">Doctor / Vet</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Follow-up / Next Due</th>
                </tr>
              </thead>
              <tbody>
                {fullMedicalHistory.map((r) => (
                  <tr key={`${r.category}-${r._id}`} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.category]}`}>
                        {r.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {r.type === "Treatment" && `${r.symptom} → ${r.treatment}`}
                      {r.type === "Mastitis" && `${r.quarter} · CMT: ${r.cmtResult} · ${r.treatment}`}
                      {r.type === "Deworming" && `${r.medicine} (${r.dosage})`}
                      {r.type === "BCS" && `Score: ${r.score} · ${r.notes}`}
                      {r.category === "Vaccination" && `${r.vaccine} vaccine`}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{r.doctor || r.vet}</td>
                    <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
                    <td className="px-5 py-3 text-gray-500">{fmt(r.followUp) || fmt(r.dueDate) || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === "vaccination" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
          {vaccinationRecords.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No vaccination records for {animal.name} yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Vaccine</th>
                  <th className="px-5 py-3 font-medium">Last Given</th>
                  <th className="px-5 py-3 font-medium">Due Date</th>
                  <th className="px-5 py-3 font-medium">Vet</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationRecords.map((r) => (
                  <tr key={r._id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3 font-medium text-gray-800">{r.vaccine}</td>
                    <td className="px-5 py-3 text-gray-500">{fmt(r.lastGiven)}</td>
                    <td className="px-5 py-3 text-gray-500">{fmt(r.dueDate)}</td>
                    <td className="px-5 py-3 text-gray-500">{r.vet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === "milk" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
          {milkRecords.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No milk records for {animal.name} yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Morning (L)</th>
                  <th className="px-5 py-3 font-medium">Evening (L)</th>
                  <th className="px-5 py-3 font-medium">Total (L)</th>
                  <th className="px-5 py-3 font-medium">Fat %</th>
                  <th className="px-5 py-3 font-medium">SNF %</th>
                </tr>
              </thead>
              <tbody>
                {milkRecords.map((r) => (
                  <tr key={r._id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
                    <td className="px-5 py-3 text-gray-500">{r.morning}</td>
                    <td className="px-5 py-3 text-gray-500">{r.evening}</td>
                    <td className="px-5 py-3 font-medium text-farm-green">
                      {(Number(r.morning) + Number(r.evening)).toFixed(1)}
                    </td>
                    <td className="px-5 py-3 text-gray-500">{r.fat || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{r.snf || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === "breeding" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
          {breedingRecords.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No breeding records for {animal.name} yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Details</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Expected Calving</th>
                </tr>
              </thead>
              <tbody>
                {breedingRecords.map((r) => (
                  <tr key={r._id} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.type]}`}>{r.type}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {r.type === "Heat Detected" && r.signs}
                      {r.type === "AI" && `${r.bullSemen} · ${r.technician}`}
                      {r.type === "Pregnancy Diagnosis" && `${r.pdResult}${r.notes ? " · " + r.notes : ""}`}
                      {r.type === "Calving" && `${r.calfGender || ""} calf`}
                    </td>
                    <td className="px-5 py-3 text-gray-500">
                      {fmt(r.heatDate) || fmt(r.aiDate) || fmt(r.pdDate) || fmt(r.calvingDate)}
                    </td>
                    <td className="px-5 py-3 text-farm-green font-medium">{fmt(r.expectedCalving) || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeSection === "category" && (
        <div className="bg-white rounded-[20px] shadow-xs overflow-hidden">
          {categoryHistory.length === 0 ? (
            <div className="text-center py-10 text-gray-400">No category changes recorded for {animal.name} yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Reason</th>
                  <th className="px-5 py-3 font-medium">Changed By</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {categoryHistory.map((h, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="px-5 py-3 font-medium text-gray-800">{h.category}</td>
                    <td className="px-5 py-3 text-gray-500">{h.reason || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{h.changedBy || "—"}</td>
                    <td className="px-5 py-3 text-gray-500">{fmt(h.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}