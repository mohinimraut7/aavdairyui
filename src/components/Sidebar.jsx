// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   LayoutGrid, Beef, HeartHandshake, Milk, Wheat, Stethoscope, Syringe,
//   PawPrint, Dna, ShieldAlert, Pill, Truck, FileBarChart, LogOut,
// } from "lucide-react";
// import logo from "../assets/images/logo.png";

// const navItems = [
//   { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
//   { to: "/animals", label: "Animals", icon: Beef },
//   { to: "/breeding", label: "Breeding", icon: HeartHandshake },
//   { to: "/milk", label: "Milk Production", icon: Milk },
//   { to: "/feed", label: "Feed Management", icon: Wheat },
//   { to: "/medical", label: "Health & Care", icon: Stethoscope },
//   { to: "/vaccination", label: "Vaccination", icon: Syringe },
//   { to: "/calves", label: "Calf Management", icon: PawPrint },
// ];

// const masterItems = [
//   { to: "/master/breeds", label: "Breed Master", icon: Dna },
//   { to: "/master/diseases", label: "Disease Master", icon: ShieldAlert },
//   { to: "/master/medicines", label: "Medicine Inventory", icon: Pill },
//   { to: "/master/suppliers", label: "Supplier Master", icon: Truck },
//   { to: "/reports", label: "Reports", icon: FileBarChart },
// ];

// const linkClass = ({ isActive }) =>
//   `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
//     isActive ? "bg-farm-green text-white" : "text-gray-600 hover:bg-farm-cream"
//   }`;

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("avv_user") || "null");

//   const handleLogout = () => {
//     localStorage.removeItem("avv_token");
//     localStorage.removeItem("avv_user");
//     navigate("/login");
//   };

//   return (
//     <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
//       <div className="flex flex-col items-center py-6 px-4 border-b border-gray-50">
//         <img src={logo} alt="AVV Dairy Farm" className="w-16 h-16 object-contain mb-2" />
//         <h1 className="text-farm-green font-extrabold text-lg uppercase tracking-wider text-center leading-tight">
//         AAV DAIRY FARM
//         </h1>

//         <p className="text-xs text-gray-400 text-center mt-1">
//         Farm Management System
//         </p>
//       </div>

//       <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
//         {navItems.map(({ to, label, icon: Icon }) => (
//           <NavLink key={to} to={to} className={linkClass}>
//             <Icon size={18} />
//             {label}
//           </NavLink>
//         ))}

//         <p className="px-4 pt-4 pb-1 text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
//           Master Data
//         </p>
//         {masterItems.map(({ to, label, icon: Icon }) => (
//           <NavLink key={to} to={to} className={linkClass}>
//             <Icon size={18} />
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-3 border-t border-gray-50">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors w-full"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// }




import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid, Beef, HeartHandshake, Milk, Wheat, Stethoscope, Syringe,
  PawPrint, Dna, ShieldAlert, Pill, Truck, FileBarChart, LogOut, Store, ShoppingBag, Settings,
} from "lucide-react";
import logo from "../assets/images/logo.png";
import { can, getCurrentUser } from "../utils/permissions";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, module: "dashboard" },
  { to: "/animals", label: "Animals", icon: Beef, module: "animals" },
  { to: "/breeding", label: "Breeding", icon: HeartHandshake, module: "breeding" },
  { to: "/milk", label: "Milk Production", icon: Milk, module: "milk" },
  { to: "/feed", label: "Feed Management", icon: Wheat, module: "feed" },
  { to: "/medical", label: "Health & Care", icon: Stethoscope, module: "medical" },
  { to: "/vaccination", label: "Vaccination", icon: Syringe, module: "vaccination" },
  { to: "/calves", label: "Calf Management", icon: PawPrint, module: "calves" },
];

const masterItems = [
  { to: "/master/breeds", label: "Breed Master", icon: Dna, module: "breeds" },
  { to: "/master/diseases", label: "Disease Master", icon: ShieldAlert, module: "diseases" },
  { to: "/master/medicines", label: "Medicine Inventory", icon: Pill, module: "medicines" },
  { to: "/master/suppliers", label: "Supplier Master", icon: Truck, module: "suppliers" },
  { to: "/reports", label: "Reports", icon: FileBarChart, module: "reports" },
];

const storeItems = [
  { to: "/store/orders", label: "Store Orders", icon: ShoppingBag, module: "store" },
  { to: "/store/products", label: "Store Products", icon: Store, module: "store" },
  { to: "/store/settings", label: "Store Settings", icon: Settings, module: "store" },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors ${
    isActive ? "bg-farm-green text-white" : "text-gray-600 hover:bg-farm-cream"
  }`;

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const visibleNav = navItems.filter((i) => can(i.module, "view"));
  const visibleMaster = masterItems.filter((i) => can(i.module, "view"));
  const visibleStore = storeItems.filter((i) => can(i.module, "view"));

  const handleLogout = () => {
    localStorage.removeItem("avv_token");
    localStorage.removeItem("avv_user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
      <div className="flex flex-col items-center py-6 px-4 border-b border-gray-50">
        <img src={logo} alt="AVV Dairy Farm" className="w-16 h-16 object-contain mb-2" />
        <h1 className="text-farm-green font-extrabold text-lg uppercase tracking-wider text-center leading-tight">
        AAV DAIRY FARM
        </h1>

        <p className="text-xs text-gray-400 text-center mt-1">
        Farm Management System
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {visibleNav.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {visibleMaster.length > 0 && (
          <p className="px-4 pt-4 pb-1 text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
            Master Data
          </p>
        )}
        {visibleMaster.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}

        {visibleStore.length > 0 && (
          <p className="px-4 pt-4 pb-1 text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
            Online Store
          </p>
        )}
        {visibleStore.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={linkClass}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-50">
        {user && (
          <div className="px-4 py-2 mb-1">
            <p className="text-sm font-semibold text-gray-700 truncate">{user.username || user.email}</p>
            <span className="inline-block mt-0.5 text-[11px] font-medium px-2 py-0.5 rounded-full bg-farm-cream text-farm-green">
              {user.role}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors w-full"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}