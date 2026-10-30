import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Styles are loaded per area: admin CSS in routes/AppRoutes.jsx, store CSS in shop/ShopApp.jsx.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);