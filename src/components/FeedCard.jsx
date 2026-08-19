import { useState, useEffect } from "react";
import { getFeedStock } from "../api/feed";

export default function FeedCard() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedStock()
      .then((res) => setStock(res.data || []))
      .catch((err) => console.error("Failed to load feed stock", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">🌾 Feed Stock</h3>
      {loading ? (
        <div className="text-center py-6 text-gray-400 text-sm">Loading...</div>
      ) : (
        <div className="space-y-4">
          {stock.map((s) => {
            const pct = Math.round((s.currentStock / s.capacity) * 100);
            return (
              <div key={s._id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{s.name}</span>
                  <span className="text-gray-400">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color || "bg-farm-green"} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
