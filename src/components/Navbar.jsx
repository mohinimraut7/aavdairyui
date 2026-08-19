import {
  Bell,
  Search,
  UserCircle2,
  Sun,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const titleMap = {
  "/dashboard": "Dashboard",
  "/animals": "Animal Management",
  "/medical": "Medical History",
  "/vaccination": "Vaccination",
  "/milk": "Milk Production",
  "/feed": "Feed Management",
  "/breeding": "Breeding",
  "/calves": "Calf Management",
  "/reports": "Reports",
  "/settings": "Settings",
};

export default function Navbar() {
  const { pathname } = useLocation();
  const title = titleMap[pathname] || "AAV Dairy Farm";

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-green-100 shadow-sm">

      <div className="h-20 px-8 flex items-center justify-between">

        {/* Left */}
        <div>
          <h1 className="text-2xl font-bold text-[#1B5E20]">
            {title}
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Manage your dairy farm efficiently.
          </p>
        </div>

      </div>

    </header>
  );
}