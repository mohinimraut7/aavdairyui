import { useState, useEffect } from "react";
import { Plus, HeartHandshake } from "lucide-react";
import Modal from "../../components/Modal";
import { getAnimals } from "../../api/animals";
import { getBreedingRecords, createBreedingRecord } from "../../api/breeding";

const tabs = ["All", "Heat Detected", "AI", "Pregnancy Diagnosis", "Calving"];

const typeColor = {
  "Heat Detected": "bg-farm-golden/10 text-farm-golden",
  AI: "bg-blue-50 text-blue-500",
  "Pregnancy Diagnosis": "bg-farm-brown/10 text-farm-brown",
  Calving: "bg-farm-green/10 text-farm-green",
};

const GESTATION_DAYS = { Cow: 283, Buffalo: 310 };

function calcExpectedCalving(aiDate, species) {
  if (!aiDate) return "";
  const date = new Date(aiDate);
  date.setDate(date.getDate() + (GESTATION_DAYS[species] || 283));
  return date.toISOString().split("T")[0];
}

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

const emptyForm = {
  animalId: "",
  type: "Heat Detected",
  heatDate: "",
  signs: "",
  aiDate: "",
  bullSemen: "",
  technician: "",
  pdDate: "",
  pdResult: "Positive",
  calvingDate: "",
  calfGender: "",
  notes: "",
};

export default function Breeding() {
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await getBreedingRecords();
      setRecords(res.data || []);
    } catch (err) {
      console.error("Failed to load breeding records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
    getAnimals()
      .then((res) => setAnimals(res.data || []))
      .catch((err) => console.error("Failed to load animals", err));
  }, []);

  const filtered = activeTab === "All" ? records : records.filter((r) => r.type === activeTab);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createBreedingRecord(form);
      await loadRecords();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save breeding record");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  const selectedAnimal = animals.find((a) => a._id === form.animalId);
  const previewCalvingDate =
    form.type === "AI" && form.aiDate && selectedAnimal
      ? calcExpectedCalving(form.aiDate, selectedAnimal.species)
      : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🤰 Breeding</h2>
          <p className="text-sm text-gray-400">{records.length} breeding records tracked</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
        >
          <Plus size={18} /> Add Record
        </button>
      </div>

      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm w-fit overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab ? "bg-farm-green text-white" : "text-gray-500 hover:text-farm-green"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <HeartHandshake className="mx-auto mb-2" size={28} />
            No records in this category.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Animal</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Details</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Expected Calving</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{r.animalName}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColor[r.type]}`}>
                      {r.type}
                    </span>
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

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Breeding Record">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Animal</label>
            <select name="animalId" value={form.animalId} onChange={handleChange} className={inputClass} required>
              <option value="">Select animal</option>
              {animals.map((a) => (
                <option key={a._id} value={a._id}>{a.name} ({a.tag}) — {a.species}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Record Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              <option>Heat Detected</option>
              <option>AI</option>
              <option>Pregnancy Diagnosis</option>
              <option>Calving</option>
            </select>
          </div>

          {form.type === "Heat Detected" && (
            <>
              <div>
                <label className={labelClass}>Heat Date</label>
                <input type="date" name="heatDate" value={form.heatDate} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Signs Observed</label>
                <input name="signs" value={form.signs} onChange={handleChange} placeholder="e.g. Mucus discharge, restlessness" className={inputClass} />
              </div>
            </>
          )}

          {form.type === "AI" && (
            <>
              <div>
                <label className={labelClass}>AI Date</label>
                <input type="date" name="aiDate" value={form.aiDate} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Bull / Semen Straw</label>
                <input name="bullSemen" value={form.bullSemen} onChange={handleChange} placeholder="e.g. Murrah Elite #4521" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Technician</label>
                <input name="technician" value={form.technician} onChange={handleChange} placeholder="e.g. Dr. Patil" className={inputClass} />
              </div>
              {previewCalvingDate && (
                <div className="bg-farm-green/10 text-farm-green text-sm rounded-2xl px-4 py-3">
                  Expected Calving Date: <strong>{previewCalvingDate}</strong>
                  {" "}({selectedAnimal.species === "Buffalo" ? "310" : "283"} days gestation)
                </div>
              )}
            </>
          )}

          {form.type === "Pregnancy Diagnosis" && (
            <>
              <div>
                <label className={labelClass}>PD Date</label>
                <input type="date" name="pdDate" value={form.pdDate} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Result</label>
                <select name="pdResult" value={form.pdResult} onChange={handleChange} className={inputClass}>
                  <option>Positive</option>
                  <option>Negative</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="e.g. Confirmed via rectal palpation" className={inputClass} />
              </div>
            </>
          )}

          {form.type === "Calving" && (
            <>
              <div>
                <label className={labelClass}>Calving Date</label>
                <input type="date" name="calvingDate" value={form.calvingDate} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Calf Gender</label>
                <select name="calfGender" value={form.calfGender} onChange={handleChange} className={inputClass}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="e.g. Normal delivery, no complications" className={inputClass} />
              </div>
            </>
          )}

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
