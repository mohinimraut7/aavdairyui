// import { Routes, Route } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import ProtectedRoute from "../components/ProtectedRoute";

// import Home from "../pages/Home/Home";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";

// import Dashboard from "../pages/Dashboard/Dashboard";
// import Animals from "../pages/Animals/Animals";
// import AnimalDetails from "../pages/Animals/AnimalDetails";
// import Breeding from "../pages/Breeding/Breeding";
// import Vaccination from "../pages/Vaccination/Vaccination";
// import MedicalHistory from "../pages/Medical/MedicalHistory";
// import MilkProduction from "../pages/Milk/MilkProduction";
// import FeedManagement from "../pages/Feed/FeedManagement";
// import CalfManagement from "../pages/Calves/CalfManagement";
// import Reports from "../pages/Reports/Reports";

// import BreedMaster from "../pages/Master/BreedMaster";
// import DiseaseMaster from "../pages/Master/DiseaseMaster";
// import MedicineInventory from "../pages/Master/MedicineInventory";
// import SupplierMaster from "../pages/Master/SupplierMaster";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Protected app shell */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/dashboard" element={<Dashboard />} />

//         <Route path="/animals" element={<Animals />} />
//         <Route path="/animals/:id" element={<AnimalDetails />} />

//         <Route path="/breeding" element={<Breeding />} />
//         <Route path="/vaccination" element={<Vaccination />} />
//         <Route path="/medical" element={<MedicalHistory />} />
//         <Route path="/milk" element={<MilkProduction />} />
//         <Route path="/feed" element={<FeedManagement />} />
//         <Route path="/calves" element={<CalfManagement />} />
//         <Route path="/reports" element={<Reports />} />

//         <Route path="/master/breeds" element={<BreedMaster />} />
//         <Route path="/master/diseases" element={<DiseaseMaster />} />
//         <Route path="/master/medicines" element={<MedicineInventory />} />
//         <Route path="/master/suppliers" element={<SupplierMaster />} />
//       </Route>

//       {/* Fallback */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }


import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// Admin panel styles — loaded only for admin pages (the online store has its own CSS).
import "../index.css";
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
import StoreProducts from "../pages/Store/StoreProducts";
import StoreOrders from "../pages/Store/StoreOrders";
import StoreSettings from "../pages/Store/StoreSettings";

export default function AppRoutes() {
  useEffect(() => {
    document.title = "AVV Dairy Farm - Farm Management System";
  }, []);

  return (
    <Routes>
      {/* Public */}
      {/* "/" is now the online store; the farm landing page lives at /admin */}
      <Route path="/admin" element={<Home />} />
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

        <Route path="/animals" element={<ProtectedRoute module="animals"><Animals /></ProtectedRoute>} />
        <Route path="/animals/:id" element={<ProtectedRoute module="animals"><AnimalDetails /></ProtectedRoute>} />

        <Route path="/breeding" element={<ProtectedRoute module="breeding"><Breeding /></ProtectedRoute>} />
        <Route path="/vaccination" element={<ProtectedRoute module="vaccination"><Vaccination /></ProtectedRoute>} />
        <Route path="/medical" element={<ProtectedRoute module="medical"><MedicalHistory /></ProtectedRoute>} />
        <Route path="/milk" element={<ProtectedRoute module="milk"><MilkProduction /></ProtectedRoute>} />
        <Route path="/feed" element={<ProtectedRoute module="feed"><FeedManagement /></ProtectedRoute>} />
        <Route path="/calves" element={<ProtectedRoute module="calves"><CalfManagement /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute module="reports"><Reports /></ProtectedRoute>} />

        <Route path="/master/breeds" element={<ProtectedRoute module="breeds"><BreedMaster /></ProtectedRoute>} />
        <Route path="/master/diseases" element={<ProtectedRoute module="diseases"><DiseaseMaster /></ProtectedRoute>} />
        <Route path="/master/medicines" element={<ProtectedRoute module="medicines"><MedicineInventory /></ProtectedRoute>} />
        <Route path="/master/suppliers" element={<ProtectedRoute module="suppliers"><SupplierMaster /></ProtectedRoute>} />
        <Route path="/store/orders" element={<ProtectedRoute module="store"><StoreOrders /></ProtectedRoute>} />
        <Route path="/store/products" element={<ProtectedRoute module="store"><StoreProducts /></ProtectedRoute>} />
        <Route path="/store/settings" element={<ProtectedRoute module="store"><StoreSettings /></ProtectedRoute>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}