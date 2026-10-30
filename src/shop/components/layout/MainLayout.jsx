import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toaster from "../common/Toaster";
import Loader from "../common/Loader";
import ScrollToTop from "../common/ScrollToTop";
import { fetchProducts, fetchStoreConfig } from "../../redux/slices/productSlice";
import { syncCartWithProducts } from "../../redux/slices/cartSlice";
import { loadMe } from "../../redux/slices/authSlice";

export default function MainLayout() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.product);
  const token = useSelector((s) => s.auth.token);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchStoreConfig());
  }, [dispatch]);

  useEffect(() => {
    if (token) dispatch(loadMe());
  }, [token, dispatch]);

  useEffect(() => {
    if (status === "succeeded") dispatch(syncCartWithProducts(items));
  }, [status, items, dispatch]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="flex-1">
        <Suspense fallback={<Loader full />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
