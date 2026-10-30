import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ShopRoutes from "./routes/AppRoutes";
// Store styles are only loaded for store pages, so the admin panel's look is never affected.
import "./index.css";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@500;600;700;800&display=swap";

export default function ShopApp() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  return (
    <Provider store={store}>
      <ShopRoutes />
    </Provider>
  );
}
