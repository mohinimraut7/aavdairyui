import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getMilkChart } from "../api/milk";

const ranges = ["Daily", "Weekly", "Monthly"];

export default function MilkChart() {
  const [range, setRange] = useState("Daily");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getMilkChart(range)
      .then((res) => {
        if (!cancelled) setData(res.data || []);
      })
      .catch((err) => console.error("Failed to load milk chart", err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [range]);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">🥛 Milk Production</h3>
        <div className="flex gap-2 bg-farm-cream rounded-xl p-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                range === r ? "bg-farm-green text-white" : "text-gray-500"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="h-[260px] flex items-center justify-center text-gray-400 text-sm">Loading chart...</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#999" />
            <YAxis tick={{ fontSize: 12 }} stroke="#999" />
            <Tooltip />
            <Line type="monotone" dataKey="liters" stroke="#2E7D32" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
