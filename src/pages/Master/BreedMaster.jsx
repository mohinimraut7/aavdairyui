import { useState, useEffect } from "react";
import { Plus, Dna } from "lucide-react";
import Modal from "../../components/Modal";
import { getBreeds, createBreed } from "../../api/masterData";

const emptyForm = {
  name: "", species: "Cow", origin: "Indian", milkCapacity: "",
  avgFatPercent: "", avgWeight: "", lifespan: "", description: "",
};

export default function BreedMaster() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getBreeds();
      setBreeds(res.data || []);
    } catch (err) {
      console.error("Failed to load breeds", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createBreed(form);
      await load();
      setShowModal(false);
      setForm(emptyForm);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save breed");
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
          <h2 className="text-xl font-bold text-gray-800">🧬 Breed Master</h2>
          <p className="text-sm text-gray-400">{breeds.length} breeds registered</p>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-farm-green text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors">
          <Plus size={18} /> Add Breed
        </button>
      </div>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : breeds.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><Dna className="mx-auto mb-2" size={28} />No breeds registered yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Species</th>
                <th className="px-5 py-3 font-medium">Origin</th>
                <th className="px-5 py-3 font-medium">Milk Capacity</th>
                <th className="px-5 py-3 font-medium">Avg Fat %</th>
                <th className="px-5 py-3 font-medium">Avg Weight</th>
              </tr>
            </thead>
            <tbody>
              {breeds.map((b) => (
                <tr key={b._id} className="border-b border-gray-50 last:border-0 hover:bg-farm-cream/20">
                  <td className="px-5 py-3 font-medium text-gray-800">{b.name}</td>
                  <td className="px-5 py-3 text-gray-500">{b.species}</td>
                  <td className="px-5 py-3 text-gray-500">{b.origin}</td>
                  <td className="px-5 py-3 text-gray-500">{b.milkCapacity || "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{b.avgFatPercent ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-500">{b.avgWeight ? `${b.avgWeight} kg` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Breed">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Breed Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Gir" className={inputClass} required />
          </div>
          <div>
            <label className={labelClass}>Species</label>
            <select name="species" value={form.species} onChange={handleChange} className={inputClass}>
              <option>Cow</option>
              <option>Buffalo</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Origin</label>
            <select name="origin" value={form.origin} onChange={handleChange} className={inputClass}>
              <option>Indian</option>
              <option>International</option>
              <option>Cross</option>
              <option>Custom</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Milk Capacity</label>
            <input name="milkCapacity" value={form.milkCapacity} onChange={handleChange} placeholder="e.g. 10-15 L/day" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Avg Fat %</label>
              <input type="number" step="0.1" name="avgFatPercent" value={form.avgFatPercent} onChange={handleChange} placeholder="e.g. 4.5" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Avg Weight (kg)</label>
              <input type="number" name="avgWeight" value={form.avgWeight} onChange={handleChange} placeholder="e.g. 350" className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <input name="description" value={form.description} onChange={handleChange} placeholder="Short notes" className={inputClass} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="bg-farm-green text-white px-6 py-2.5 rounded-2xl text-sm font-medium hover:bg-farm-green-dark transition-colors disabled:opacity-60">
              {saving ? "Saving..." : "Save Breed"}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 rounded-2xl border border-gray-200 text-gray-600 text-sm font-medium">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
