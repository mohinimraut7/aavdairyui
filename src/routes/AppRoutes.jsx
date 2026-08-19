import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Animals from "../pages/Animals/Animals";
import AnimalDetails from "../pages/Animals/AnimalDetails";
import Breeding from "../pages/Breeding/Breeding";
import Vaccination from "../pages/Vaccination/Vaccination";
import MedicalHistory from "../pages/Medical/MedicalHistory";
import MilkProduction from "../pages/Milk/MilkProduction";
import FeedManagement from "../pages/Feed/FeedManagement";
import CalfManagement from "../pages/Calves/CalfManagement";
import Reports from "../pages/Reports/Reports";

import BreedMaster from "../pages/Master/BreedMaster";
import DiseaseMaster from "../pages/Master/DiseaseMaster";
import MedicineInventory from "../pages/Master/MedicineInventory";
import SupplierMaster from "../pages/Master/SupplierMaster";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected app shell */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/animals" element={<Animals />} />
        <Route path="/animals/:id" element={<AnimalDetails />} />

        <Route path="/breeding" element={<Breeding />} />
        <Route path="/vaccination" element={<Vaccination />} />
        <Route path="/medical" element={<MedicalHistory />} />
        <Route path="/milk" element={<MilkProduction />} />
        <Route path="/feed" element={<FeedManagement />} />
        <Route path="/calves" element={<CalfManagement />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/master/breeds" element={<BreedMaster />} />
        <Route path="/master/diseases" element={<DiseaseMaster />} />
        <Route path="/master/medicines" element={<MedicineInventory />} />
        <Route path="/master/suppliers" element={<SupplierMaster />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
