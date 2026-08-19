import { useState, useEffect } from "react";
import { Plus, Syringe } from "lucide-react";
import Modal from "../../components/Modal";
import { getAnimals } from "../../api/animals";
import { getVaccinations, getVaccinationSummary, createVaccination } from "../../api/vaccination";

const vaccineTypes = ["FMD", "HS", "BQ", "Brucellosis", "Theileriosis"];

const statusStyle = {
  Overdue: "bg-red-50 text-red-500",
  "Due Soon": "bg-farm-golden/10 text-farm-golden",
  Upcoming: "bg-farm-green/10 text-farm-green",
};

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

const emptyForm = { animalId: "", vaccine: "FMD", lastGiven: "", dueDate: "", vet: "" };

export default function Vaccination() {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [summary, setSummary] = useState({ overdue: 0, dueSoon: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [recRes, sumRes] = await Promise.all([getVaccinations(), getVaccinationSummary()]);
      setRecords(recRes.data || []);
      setSummary(sumRes.data || { overdue: 0, dueSoon: 0, total: 0 });
    } catch (err) {
      console.error("Failed to load vaccinations", err);
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

  const filtered = filter === "All" ? records : records.filter((r) => r.status === filter);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createVaccination(form);
      await loadAll();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save vaccination record");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">💉 Vaccination</h2>
          <p className="text-sm text-gray-400">{records.length} vaccination records tracked</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
        >
          <Plus size={18} /> Add Vaccination
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Overdue</p>
          <p className="text-2xl font-bold text-red-500">{summary.overdue}</p>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Due Soon (≤7 days)</p>
          <p className="text-2xl font-bold text-farm-golden">{summary.dueSoon}</p>
        </div>
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
          <p className="text-sm text-gray-400">Total Tracked</p>
          <p className="text-2xl font-bold text-farm-green">{summary.total}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
        {["All", "Overdue", "Due Soon", "Upcoming"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f ? "bg-farm-green text-white" : "text-gray-500 hover:text-farm-green"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Syringe className="mx-auto mb-2" size={28} />
            No records in this category.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Animal</th>
                <th className="px-5 py-3 font-medium">Vaccine</th>
                <th className="px-5 py-3 font-medium">Last Given</th>
                <th className="px-5 py-3 font-medium">Due Date</th>
                <th className="px-5 py-3 font-medium">Vet</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{r.animalName}</td>
                  <td className="px-5 py-3 text-gray-500">{r.vaccine}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(r.lastGiven)}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(r.dueDate)}</td>
                  <td className="px-5 py-3 text-gray-500">{r.vet}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Vaccination Record">
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
            <label className={labelClass}>Vaccine</label>
            <select name="vaccine" value={form.vaccine} onChange={handleChange} className={inputClass}>
              {vaccineTypes.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Last Given</label>
              <input type="date" name="lastGiven" value={form.lastGiven} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Next Due Date</label>
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          <div>
            <label className={labelClass}>Vet</label>
            <input name="vet" value={form.vet} onChange={handleChange} placeholder="e.g. Dr. Patil" className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Record"}
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
