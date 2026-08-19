import { useState, useEffect } from "react";
import { Plus, Milk as MilkIcon } from "lucide-react";
import Modal from "../../components/Modal";
import { getAnimals } from "../../api/animals";
import { getMilkRecords, getMilkSummary, createMilkRecord } from "../../api/milk";

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

const emptyForm = { animalId: "", date: "", morning: "", evening: "", fat: "", snf: "" };

export default function MilkProduction() {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [summary, setSummary] = useState({ todaysTotal: 0, animalsMilking: 0, totalEntries: 0 });
  const [loading, setLoading] = useState(true);
  const [animalFilter, setAnimalFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [recRes, sumRes] = await Promise.all([getMilkRecords(), getMilkSummary()]);
      setRecords(recRes.data || []);
      setSummary(sumRes.data || { todaysTotal: 0, animalsMilking: 0, totalEntries: 0 });
    } catch (err) {
      console.error("Failed to load milk records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
    getAnimals()
      .then((res) => setAnimals(res.data || []))
      .catch((err) => console.error("Failed to load animals", err));
  }, []);

  const filtered =
    animalFilter === "All" ? records : records.filter((r) => String(r.animal) === animalFilter);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createMilkRecord(form);
      await loadAll();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save milk entry");
    } finally {
      setSaving(false);
    }
  };

  const totalFor = (r) => (Number(r.morning) + Number(r.evening)).toFixed(1);

  const inputClass =
    "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🥛 Milk Production</h2>
          <p className="text-sm text-gray-400">{records.length} entries logged</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
        >
          <Plus size={18} /> Add Entry
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Today's Total</p>
          <p className="text-2xl font-bold text-farm-green">{summary.todaysTotal.toFixed(1)} L</p>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Animals Milking</p>
          <p className="text-2xl font-bold text-gray-800">{summary.animalsMilking}</p>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Total Entries</p>
          <p className="text-2xl font-bold text-farm-golden">{summary.totalEntries}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm w-fit overflow-x-auto">
        <button
          onClick={() => setAnimalFilter("All")}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
            animalFilter === "All" ? "bg-farm-green text-white" : "text-gray-500 hover:text-farm-green"
          }`}
        >
          All Animals
        </button>
        {animals.map((a) => (
          <button
            key={a._id}
            onClick={() => setAnimalFilter(a._id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              animalFilter === a._id ? "bg-farm-green text-white" : "text-gray-500 hover:text-farm-green"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <MilkIcon className="mx-auto mb-2" size={28} />
            No milk records yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Animal</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Morning (L)</th>
                <th className="px-5 py-3 font-medium">Evening (L)</th>
                <th className="px-5 py-3 font-medium">Total (L)</th>
                <th className="px-5 py-3 font-medium">Fat %</th>
                <th className="px-5 py-3 font-medium">SNF %</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{r.animalName}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
                  <td className="px-5 py-3 text-gray-500">{r.morning}</td>
                  <td className="px-5 py-3 text-gray-500">{r.evening}</td>
                  <td className="px-5 py-3 font-medium text-farm-green">{totalFor(r)}</td>
                  <td className="px-5 py-3 text-gray-500">{r.fat || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{r.snf || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Milk Entry">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Animal</label>
            <select name="animalId" value={form.animalId} onChange={handleChange} className={inputClass} required>
              <option value="">Select animal</option>
              {animals.map((a) => (
                <option key={a._id} value={a._id}>{a.name} ({a.tag})</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Morning (Liters)</label>
              <input type="number" step="0.1" name="morning" value={form.morning} onChange={handleChange} placeholder="e.g. 8.5" className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Evening (Liters)</label>
              <input type="number" step="0.1" name="evening" value={form.evening} onChange={handleChange} placeholder="e.g. 7.2" className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Fat % (optional)</label>
              <input type="number" step="0.1" name="fat" value={form.fat} onChange={handleChange} placeholder="e.g. 6.2" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>SNF % (optional)</label>
              <input type="number" step="0.1" name="snf" value={form.snf} onChange={handleChange} placeholder="e.g. 9.0" className={inputClass} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Entry"}
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
