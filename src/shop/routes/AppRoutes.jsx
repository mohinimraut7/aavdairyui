import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import RequireAuth from "../components/common/RequireAuth";
import Home from "../pages/Home";

// Route-level code splitting: everything except Home loads on demand.
const Products = lazy(() => import("../pages/Products"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const Cart = lazy(() => import("../pages/Cart"));
const Checkout = lazy(() => import("../pages/Checkout"));
const OrderSuccess = lazy(() => import("../pages/OrderSuccess"));
const OurFarm = lazy(() => import("../pages/OurFarm"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Policy = lazy(() => import("../pages/Policy"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Account = lazy(() => import("../pages/Account"));
const ProfileTab = lazy(() => import("../pages/Account").then((m) => ({ default: m.ProfileTab })));
const OrdersTab = lazy(() => import("../pages/Account").then((m) => ({ default: m.OrdersTab })));
const OrderDetailTab = lazy(() => import("../pages/Account").then((m) => ({ default: m.OrderDetailTab })));
const AddressesTab = lazy(() => import("../pages/Account").then((m) => ({ default: m.AddressesTab })));

// Online store routes. Mounted under "/*" by the root App; /login and /register are the
// shared role-based pages from the admin panel (src/pages/Auth).
export default function ShopRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success/:orderNumber" element={<OrderSuccess />} />
        <Route path="our-farm" element={<OurFarm />} />
        <Route path="about-us" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="policies/:type" element={<Policy />} />
        <Route path="account" element={<RequireAuth><Account /></RequireAuth>}>
          <Route index element={<ProfileTab />} />
          <Route path="orders" element={<OrdersTab />} />
          <Route path="orders/:id" element={<OrderDetailTab />} />
          <Route path="addresses" element={<AddressesTab />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
