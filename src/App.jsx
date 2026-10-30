import { lazy, Suspense } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { isAdminPath } from "./utils/areas";

// Two areas in one app, each with its own stylesheet:
//   admin panel  -> /admin, /login, /register, /dashboard, /animals, … (routes/AppRoutes.jsx)
//   online store -> everything else: /, /products, /cart, /checkout, /account … (shop/ShopApp.jsx)
const AppRoutes = lazy(() => import("./routes/AppRoutes"));
const ShopApp = lazy(() => import("./shop/ShopApp"));

let mountedArea = null;

function AreaSwitch() {
  const { pathname } = useLocation();
  const area = isAdminPath(pathname) ? "admin" : "store";
  // Moving between areas reloads the page once, so only that area's CSS is on the page.
  if (mountedArea && mountedArea !== area) {
    window.location.reload();
    return null;
  }
  mountedArea = area;
  return area === "admin" ? <AppRoutes /> : <ShopApp />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <AreaSwitch />
      </Suspense>
    </BrowserRouter>
  );
}