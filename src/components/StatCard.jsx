export default function StatCard({ icon: Icon, label, value, color = "green" }) {
  const colorMap = {
    green: "bg-farm-green/10 text-farm-green",
    golden: "bg-farm-golden/10 text-farm-golden",
    brown: "bg-farm-brown/10 text-farm-brown",
  };
  return (
    <div className="bg-white rounded-[20px] p-5 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
