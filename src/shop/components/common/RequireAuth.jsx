import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slices/authSlice";

export default function RequireAuth({ children }) {
  const loggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  if (!loggedIn) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  return children;
}
