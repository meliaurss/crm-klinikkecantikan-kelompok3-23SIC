// src/App.jsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout.jsx";

import Dashboard from "./pages/Dashboard";
import FormReservasi from "./pages/FormReservasi";
import FormDataDiri from "./pages/FormDataDiri";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";
import ReservasiManagement from "./pages/ReservasiManagement";
import AllProducts from "./pages/AllProducts.jsx";
import Feedback from "./pages/feedback.jsx";
import AdminFeedback from "./pages/AdminFeedback.jsx";
import AdminFAQ from "./pages/AdminFaq.jsx";
import InventoryManagement from "./pages/InventoryManagement.jsx";
import ManajemenProduk from "./pages/ProdukManagement.jsx";

export default function App() {
  return (
    <Routes>
      {/* Landing Page Layout */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<AllProducts />} />
      </Route>

      {/* Admin Dashboard Layout */}
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/produk" element={<ManajemenProduk />} />
        <Route path="/reservasi" element={<FormReservasi />} />
        <Route path="/data-diri" element={<FormDataDiri />} />
        <Route path="/datapelanggan" element={<SalesManagement />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/adminfeedback" element={<AdminFeedback />} />
        <Route path="/reservasi-management" element={<ReservasiManagement />} />
        <Route path="/adminfaq" element={<AdminFAQ />} />
      </Route>
    </Routes>
  );
}
