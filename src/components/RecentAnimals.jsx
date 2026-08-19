import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimalAvatar from "./AnimalAvatar";
import { getAnimals } from "../api/animals";

const statusColor = {
  Lactating: "bg-farm-green/10 text-farm-green",
  Milking: "bg-farm-green/10 text-farm-green",
  Pregnant: "bg-farm-golden/10 text-farm-golden",
  Dry: "bg-gray-100 text-gray-500",
};

export default function RecentAnimals() {
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimals()
      .then((res) => setRecent((res.data || []).slice(0, 4)))
      .catch((err) => console.error("Failed to load recent animals", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Recent Animals</h3>
        <button onClick={() => navigate("/animals")} className="text-farm-green text-xs font-medium">
          View All →
        </button>
      </div>
      {loading ? (
        <div className="text-center py-6 text-gray-400 text-sm">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {recent.map((a) => (
            <button
              key={a._id}
              onClick={() => navigate(`/animals/${a._id}`)}
              className="text-left bg-farm-cream/40 rounded-2xl p-3 hover:bg-farm-cream transition-colors"
            >
              <AnimalAvatar photo={a.photo} name={a.name} size={64} />
              <p className="text-sm font-medium text-gray-800 mt-2 truncate">{a.name}</p>
              <p className="text-xs text-gray-400">{a.tag}</p>
              <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-medium mt-1.5 ${statusColor[a.status] || "bg-gray-100 text-gray-500"}`}>
                {a.status}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
