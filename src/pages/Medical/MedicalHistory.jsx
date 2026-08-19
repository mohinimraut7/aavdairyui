import { useState, useEffect } from "react";
import { Plus, Stethoscope } from "lucide-react";
import Modal from "../../components/Modal";
import { getAnimals } from "../../api/animals";
import { getMedicalRecords, createMedicalRecord } from "../../api/medical";

const tabs = ["All", "Treatment", "Mastitis", "Deworming", "BCS"];

const typeColor = {
  Treatment: "bg-farm-brown/10 text-farm-brown",
  Mastitis: "bg-red-50 text-red-500",
  Deworming: "bg-farm-golden/10 text-farm-golden",
  BCS: "bg-farm-green/10 text-farm-green",
};

const fmt = (d) => (d ? new Date(d).toISOString().split("T")[0] : "");

const emptyForm = {
  animalId: "", type: "Treatment", symptom: "", diagnosis: "", quarter: "",
  cmtResult: "", medicine: "", dosage: "", score: "", notes: "", treatment: "",
  doctor: "", date: "", followUp: "",
};

export default function MedicalHistory() {
  const [activeTab, setActiveTab] = useState("All");
  const [records, setRecords] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadRecords = async () => {
    setLoading(true);
    try {
      const res = await getMedicalRecords();
      setRecords(res.data || []);
    } catch (err) {
      console.error("Failed to load medical records", err);
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
      const res = await createMedicalRecord(form);
      if (res.suggestQuarantine) {
        alert(`${form.type} recorded. Consider moving this animal to "Quarantined" status.`);
      }
      await loadRecords();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save medical record");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";
  const labelClass = "text-sm font-medium text-gray-600 mb-1.5 block";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">🩺 Medical History</h2>
          <p className="text-sm text-gray-400">{records.length} records logged</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors"
        >
          <Plus size={18} /> Add Record
        </button>
      </div>

      <div className="flex gap-2 mb-5 bg-white rounded-2xl p-1.5 shadow-sm w-fit">
        {tabs.map((tab) => (
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

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Stethoscope className="mx-auto mb-2" size={28} />
            No {activeTab !== "All" ? activeTab.toLowerCase() : ""} records yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Animal</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Details</th>
                <th className="px-5 py-3 font-medium">Doctor</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Follow-up</th>
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
                    {r.type === "Treatment" && `${r.symptom} → ${r.treatment}`}
                    {r.type === "Mastitis" && `${r.quarter} · CMT: ${r.cmtResult} · ${r.treatment}`}
                    {r.type === "Deworming" && `${r.medicine} (${r.dosage})`}
                    {r.type === "BCS" && `Score: ${r.score} · ${r.notes}`}
                  </td>
                  <td className="px-5 py-3 text-gray-500">{r.doctor}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(r.date)}</td>
                  <td className="px-5 py-3 text-gray-500">{fmt(r.followUp) || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Medical Record">
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
            <label className={labelClass}>Record Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
              <option>Treatment</option>
              <option>Mastitis</option>
              <option>Deworming</option>
              <option>BCS</option>
            </select>
          </div>

          {form.type === "Treatment" && (
            <>
              <div>
                <label className={labelClass}>Symptom</label>
                <input name="symptom" value={form.symptom} onChange={handleChange} placeholder="e.g. Loss of appetite" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Diagnosis</label>
                <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="e.g. Bloat" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Treatment Given</label>
                <input name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g. Antibiotic, 3-day course" className={inputClass} />
              </div>
            </>
          )}

          {form.type === "Mastitis" && (
            <>
              <div>
                <label className={labelClass}>Affected Quarter</label>
                <select name="quarter" value={form.quarter} onChange={handleChange} className={inputClass}>
                  <option value="">Select quarter</option>
                  <option>Front-Left</option>
                  <option>Front-Right</option>
                  <option>Rear-Left</option>
                  <option>Rear-Right</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>CMT Result</label>
                <input name="cmtResult" value={form.cmtResult} onChange={handleChange} placeholder="e.g. Positive (2+)" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Treatment Given</label>
                <input name="treatment" value={form.treatment} onChange={handleChange} placeholder="e.g. Intramammary antibiotic" className={inputClass} />
              </div>
            </>
          )}

          {form.type === "Deworming" && (
            <>
              <div>
                <label className={labelClass}>Medicine</label>
                <input name="medicine" value={form.medicine} onChange={handleChange} placeholder="e.g. Albendazole" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dosage</label>
                <input name="dosage" value={form.dosage} onChange={handleChange} placeholder="e.g. 10ml oral" className={inputClass} />
              </div>
            </>
          )}

          {form.type === "BCS" && (
            <>
              <div>
                <label className={labelClass}>Score (1–5 scale)</label>
                <input name="score" value={form.score} onChange={handleChange} placeholder="e.g. 3.0 / 5" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Notes</label>
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="e.g. Under condition post-calving" className={inputClass} />
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Doctor / Vet</label>
            <input name="doctor" value={form.doctor} onChange={handleChange} placeholder="e.g. Dr. Patil" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Follow-up Date</label>
              <input type="date" name="followUp" value={form.followUp} onChange={handleChange} className={inputClass} />
            </div>
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
