import { useState, useEffect } from "react";
import { Plus, Wheat, AlertTriangle } from "lucide-react";
import Modal from "../../components/Modal";
import { getFeedStock, createFeedStock, getFeedSchedule, createFeedSchedule } from "../../api/feed";

const emptyStockForm = { name: "", unit: "kg", currentStock: "", capacity: "", dailyUsage: "", minStock: "" };
const emptyScheduleForm = { group: "", feedType: "", quantity: "", time: "" };

export default function FeedManagement() {
  const [stock, setStock] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Stock");
  const [showStockModal, setShowStockModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [stockForm, setStockForm] = useState(emptyStockForm);
  const [scheduleForm, setScheduleForm] = useState(emptyScheduleForm);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [stockRes, scheduleRes] = await Promise.all([getFeedStock(), getFeedSchedule()]);
      setStock(stockRes.data || []);
      setSchedule(scheduleRes.data || []);
    } catch (err) {
      console.error("Failed to load feed data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleStockChange = (e) => setStockForm({ ...stockForm, [e.target.name]: e.target.value });
  const handleScheduleChange = (e) => setScheduleForm({ ...scheduleForm, [e.target.name]: e.target.value });

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createFeedStock({ ...stockForm, color: "bg-farm-green" });
      await loadAll();
      setShowStockModal(false);
      setStockForm(emptyStockForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save stock item");
    } finally {
      setSaving(false);
    }
  };

  const handleScheduleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createFeedSchedule(scheduleForm);
      await loadAll();
      setShowScheduleModal(false);
      setScheduleForm(emptyScheduleForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save feeding schedule");
    } finally {
      setSaving(false);
    }
  };

  const daysRemaining = (item) =>
    item.dailyUsage > 0 ? Math.floor(item.currentStock / item.dailyUsage) : "—";

  // Low stock: uses the item's own minStock threshold when set (SRS FR-5.3),
  // falling back to the original <40% rule for items that don't set one.
  const isLowStock = (item) => {
    if (item.minStock !== undefined && item.minStock !== null && item.minStock !== "") {
      return item.currentStock <= item.minStock;
    }
    return Math.round((item.currentStock / item.capacity) * 100) < 40;
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🌾 Feed Management</h2>
          <p className="text-sm text-gray-400">Stock levels and feeding schedules</p>
        </div>
        <button
          onClick={() => (activeTab === "Stock" ? setShowStockModal(true) : setShowScheduleModal(true))}
          className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
        >
          <Plus size={18} /> {activeTab === "Stock" ? "Add Stock Item" : "Add Schedule"}
        </button>
      </div>

      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
        {["Stock", "Feeding Schedule"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-farm-green text-white" : "text-gray-500 hover:text-farm-green"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : activeTab === "Stock" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stock.map((item) => {
            const pct = Math.round((item.currentStock / item.capacity) * 100);
            const low = isLowStock(item);
            const days = daysRemaining(item);
            return (
              <div key={item._id} className="bg-white rounded-[20px] p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  {low && (
                    <span className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      <AlertTriangle size={12} /> Low Stock
                    </span>
                  )}
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className={`h-full ${item.color || "bg-farm-green"} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>{item.currentStock} / {item.capacity} {item.unit} ({pct}%)</span>
                  <span>~{days} days left</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
          {schedule.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Wheat className="mx-auto mb-2" size={28} />
              No feeding schedules yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                  <th className="px-5 py-3 font-medium">Group</th>
                  <th className="px-5 py-3 font-medium">Feed Type</th>
                  <th className="px-5 py-3 font-medium">Quantity</th>
                  <th className="px-5 py-3 font-medium">Feeding Time</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((s) => (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                    <td className="px-5 py-3 font-medium text-gray-800">{s.group}</td>
                    <td className="px-5 py-3 text-gray-500">{s.feedType}</td>
                    <td className="px-5 py-3 text-gray-500">{s.quantity}</td>
                    <td className="px-5 py-3 text-gray-500">{s.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <Modal isOpen={showStockModal} onClose={() => setShowStockModal(false)} title="Add Stock Item">
        <form onSubmit={handleStockSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Feed Name</label>
            <input name="name" value={stockForm.name} onChange={handleStockChange} placeholder="e.g. Wheat Bran" className={inputClass} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Current Stock</label>
              <input type="number" name="currentStock" value={stockForm.currentStock} onChange={handleStockChange} placeholder="e.g. 500" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Capacity</label>
              <input type="number" name="capacity" value={stockForm.capacity} onChange={handleStockChange} placeholder="e.g. 1000" className={inputClass} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Unit</label>
              <select name="unit" value={stockForm.unit} onChange={handleStockChange} className={inputClass}>
                <option>kg</option>
                <option>quintal</option>
                <option>ton</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Daily Usage</label>
              <input type="number" name="dailyUsage" value={stockForm.dailyUsage} onChange={handleStockChange} placeholder="e.g. 30" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Low Stock Alert Threshold (optional)</label>
            <input type="number" name="minStock" value={stockForm.minStock} onChange={handleStockChange} placeholder="e.g. 200" className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Item"}
            </button>
            <button type="button" onClick={() => setShowStockModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showScheduleModal} onClose={() => setShowScheduleModal(false)} title="Add Feeding Schedule">
        <form onSubmit={handleScheduleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Animal Group</label>
            <select name="group" value={scheduleForm.group} onChange={handleScheduleChange} className={inputClass} required>
              <option value="">Select group</option>
              <option>Lactating Cows</option>
              <option>Lactating Buffaloes</option>
              <option>Dry Cows</option>
              <option>Pregnant Animals</option>
              <option>Calves</option>
              <option>Bulls</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Feed Type</label>
            <input name="feedType" value={scheduleForm.feedType} onChange={handleScheduleChange} placeholder="e.g. Concentrate + Green Fodder" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Quantity per Animal</label>
            <input name="quantity" value={scheduleForm.quantity} onChange={handleScheduleChange} placeholder="e.g. 8 kg/animal" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Feeding Time(s)</label>
            <input name="time" value={scheduleForm.time} onChange={handleScheduleChange} placeholder="e.g. 06:00 AM, 04:00 PM" className={inputClass} required />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Schedule"}
            </button>
            <button type="button" onClick={() => setShowScheduleModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
