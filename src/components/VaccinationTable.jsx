import { useState, useEffect } from "react";
import { getVaccinations } from "../api/vaccination";

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : "";

export default function VaccinationTable() {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVaccinations({ filter: "Due Soon", limit: 3 })
      .then((res) => setUpcoming(res.data || []))
      .catch((err) => console.error("Failed to load upcoming vaccinations", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-xs">
      <h3 className="font-semibold text-gray-800 mb-4">💉 Upcoming Vaccinations</h3>
      {loading ? (
        <div className="text-center py-6 text-gray-400 text-sm">Loading...</div>
      ) : upcoming.length === 0 ? (
        <div className="text-center py-6 text-gray-400 text-sm">No vaccinations due soon.</div>
      ) : (
        <div className="space-y-3">
          {upcoming.map((v) => (
            <div key={v._id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium text-gray-800">{v.animalName}</p>
                <p className="text-gray-400 text-xs">{v.vaccine}</p>
              </div>
              <span className="text-xs bg-farm-golden/10 text-farm-golden px-2.5 py-1 rounded-full font-medium">
                {fmt(v.dueDate)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
