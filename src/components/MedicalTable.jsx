import { useState, useEffect } from "react";
import { getMedicalRecords } from "../api/medical";

// Derives a "disease" label per record type, the same way MedicalHistory.jsx
// already derives its "Details" column, since the Medical model has no
// literal "disease" field.
const diseaseLabel = (r) => {
  if (r.type === "Mastitis") return `Mastitis${r.quarter ? ` (${r.quarter.replace("-", " ")})` : ""}`;
  if (r.type === "Treatment") return r.diagnosis || r.symptom || "Treatment";
  if (r.type === "Deworming") return "Deworming";
  if (r.type === "BCS") return "Body Condition Check";
  return r.type;
};

export default function MedicalTable() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMedicalRecords({ limit: 2 })
      .then((res) => setRecords(res.data || []))
      .catch((err) => console.error("Failed to load recent medical records", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">🩺 Recent Medical Records</h3>
      {loading ? (
        <div className="text-center py-6 text-gray-400 text-sm">Loading...</div>
      ) : records.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">No medical records yet.</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="pb-2 font-medium">Animal</th>
              <th className="pb-2 font-medium">Disease</th>
              <th className="pb-2 font-medium">Treatment</th>
              <th className="pb-2 font-medium">Doctor</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 font-medium text-gray-800">{r.animalName}</td>
                <td className="py-3 text-gray-500">{diseaseLabel(r)}</td>
                <td className="py-3 text-gray-500">{r.treatment || r.medicine || "—"}</td>
                <td className="py-3 text-gray-500">{r.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
