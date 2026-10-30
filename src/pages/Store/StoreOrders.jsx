import { useEffect, useState } from "react";
import { Search, ShoppingBag, X } from "lucide-react";
import { getShopOrders, updateShopOrderStatus, getShopDashboard } from "../../api/store";

const STATUSES = ["pending", "confirmed", "processing", "out-for-delivery", "delivered", "cancelled"];
const STATUS_STYLE = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  processing: "bg-blue-50 text-blue-700",
  "out-for-delivery": "bg-lime-50 text-lime-700",
  delivered: "bg-farm-cream text-farm-green",
  cancelled: "bg-red-50 text-red-600",
};
const inr = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const when = (d) => new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default function StoreOrders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", q: "", from: "", to: "" });
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
      const [res, dash] = await Promise.all([getShopOrders(params), getShopDashboard()]);
      setOrders(res.data || []);
      setTotal(res.total || 0);
      setStats(dash.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [filters.status, filters.from, filters.to]);

  const changeStatus = async (order, orderStatus) => {
    if (orderStatus === "cancelled" && !window.confirm(`Cancel order ${order.orderNumber}? Stock will be returned.`)) return;
    try {
      const res = await updateShopOrderStatus(order._id, { orderStatus });
      setSelected((s) => (s && s._id === order._id ? res.data : s));
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update order");
    }
  };

  const inputClass = "px-4 py-2.5 rounded-2xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-farm-green/30 focus:border-farm-green";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">📦 Store Orders</h2>
        <p className="text-sm text-gray-400">Orders placed on the customer website</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            ["Orders today", stats.ordersToday],
            ["Pending", stats.ordersByStatus?.pending || 0],
            ["Out for delivery", stats.ordersByStatus?.["out-for-delivery"] || 0],
            ["Revenue (excl. cancelled)", inr(stats.revenue)],
          ].map(([label, value]) => (
            <div key={label} className="bg-white rounded-[20px] shadow-xs p-5">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            </div>
          ))}
        </div>
      )}
      {stats?.lowStock?.length > 0 && (
        <div className="mb-6 rounded-2xl bg-red-50 text-red-700 text-sm px-5 py-3">
          Low stock: {stats.lowStock.map((p) => `${p.name} ${p.packageSize} (${p.stockQuantity})`).join(", ")}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-4">
        <form onSubmit={(e) => { e.preventDefault(); load(); }} className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input placeholder="Order no., name or phone" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} className={`${inputClass} pl-9 w-64`} />
        </form>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className={inputClass}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/-/g, " ")}</option>)}
        </select>
        <input type="date" value={filters.from} onChange={(e) => setFilters({ ...filters, from: e.target.value })} className={inputClass} aria-label="From date" />
        <input type="date" value={filters.to} onChange={(e) => setFilters({ ...filters, to: e.target.value })} className={inputClass} aria-label="To date" />
      </div>

      <div className="bg-white rounded-[20px] shadow-xs overflow-x-auto">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-gray-400"><ShoppingBag className="mx-auto mb-2" size={28} />No orders found.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100 bg-farm-cream/40">
                <th className="px-5 py-3 font-medium">Order</th>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Area</th>
                <th className="px-5 py-3 font-medium">Amount</th>
                <th className="px-5 py-3 font-medium">Payment</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} onClick={() => setSelected(o)} className="border-b border-gray-50 last:border-0 cursor-pointer hover:bg-farm-cream/40">
                  <td className="px-5 py-3"><p className="font-semibold text-gray-800">{o.orderNumber}</p><p className="text-xs text-gray-400">{when(o.createdAt)}</p></td>
                  <td className="px-5 py-3"><p className="text-gray-800">{o.contact?.name}</p><p className="text-xs text-gray-400">{o.contact?.phone}</p></td>
                  <td className="px-5 py-3 text-gray-600">{o.deliveryAddress?.area} · {o.deliveryAddress?.pincode}</td>
                  <td className="px-5 py-3 font-semibold">{inr(o.totalAmount)}</td>
                  <td className="px-5 py-3 text-gray-600">{o.paymentMethod === "cod" ? "COD" : "Online"} · <span className={o.paymentStatus === "paid" ? "text-farm-green" : ""}>{o.paymentStatus}</span></td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <select value={o.orderStatus} onChange={(e) => changeStatus(o, e.target.value)} disabled={o.orderStatus === "cancelled"}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border-0 capitalize ${STATUS_STYLE[o.orderStatus]}`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/-/g, " ")}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-3">{total} order(s)</p>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />
          <aside className="relative w-full max-w-md bg-white h-full overflow-y-auto p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Order {selected.orderNumber}</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            <p className="text-sm text-gray-500">{when(selected.createdAt)} · Slot: {selected.deliverySlot || "—"}</p>
            <div className="mt-4 rounded-2xl bg-farm-cream/60 p-4 text-sm">
              <p className="font-semibold text-gray-800">{selected.contact?.name} · <a href={`tel:${selected.contact?.phone}`} className="text-farm-green">{selected.contact?.phone}</a></p>
              <p className="text-gray-600 mt-1">{selected.deliveryAddress?.line1}, {selected.deliveryAddress?.area}, {selected.deliveryAddress?.city} – {selected.deliveryAddress?.pincode}</p>
              {selected.deliveryAddress?.instructions && <p className="text-gray-500 mt-1">Note: {selected.deliveryAddress.instructions}</p>}
              {selected.notes && <p className="text-gray-500 mt-1">Order note: {selected.notes}</p>}
            </div>
            <ul className="mt-4 divide-y divide-gray-100 text-sm">
              {selected.items.map((i) => (
                <li key={i.product} className="flex justify-between py-2"><span>{i.name} ({i.packageSize}) × {i.quantity}</span><span className="font-semibold">{inr(i.lineTotal)}</span></li>
              ))}
            </ul>
            <dl className="mt-2 border-t border-gray-100 pt-3 text-sm space-y-1">
              <div className="flex justify-between"><dt className="text-gray-500">Subtotal</dt><dd>{inr(selected.subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Delivery</dt><dd>{inr(selected.deliveryFee)}</dd></div>
              <div className="flex justify-between font-bold"><dt>Total</dt><dd>{inr(selected.totalAmount)}</dd></div>
            </dl>
            <p className="mt-4 text-sm text-gray-600">Payment: {selected.paymentMethod === "cod" ? "Cash on Delivery" : "Online (Razorpay)"} — <b>{selected.paymentStatus}</b></p>
            <h4 className="mt-6 mb-2 text-sm font-semibold text-gray-700">History</h4>
            <ul className="text-xs text-gray-500 space-y-1">
              {(selected.statusHistory || []).map((h, i) => <li key={i} className="capitalize">{when(h.at)} — {h.status.replace(/-/g, " ")}{h.note ? ` (${h.note})` : ""}</li>)}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
