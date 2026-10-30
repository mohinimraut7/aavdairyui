// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const token = localStorage.getItem("avv_token");
//   if (!token) return <Navigate to="/login" replace />;
//   return children;
// }



import { Navigate } from "react-router-dom";
import { can, getCurrentUser } from "../utils/permissions";

// <ProtectedRoute>                      -> only needs login
// <ProtectedRoute module="medical">     -> also needs view permission for that module
export default function ProtectedRoute({ children, module }) {
  const token = localStorage.getItem("avv_token");
  if (!token) return <Navigate to="/login" replace />;

  // Old sessions saved before roles existed have no role -> force a fresh login
  const user = getCurrentUser();
  if (!user?.role) {
    localStorage.removeItem("avv_token");
    localStorage.removeItem("avv_user");
    return <Navigate to="/login" replace />;
  }

  // Customers belong to the online store, never the admin panel.
  if (user.role === "customer") return <Navigate to="/" replace />;

  if (module && !can(module, "view")) return <Navigate to="/dashboard" replace />;
  return children;
}