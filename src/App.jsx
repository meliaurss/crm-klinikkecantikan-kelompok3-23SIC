// src/App.jsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout.jsx";

import Dashboard from "./pages/Dashboard";
import FormReservasi from "./pages/FormReservasi";
import FormDataDiri from "./pages/FormDataDiri";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";
import Feedback from "./pages/feedback";
import ReservasiManagement from "./pages/ReservasiManagement";
import FaqManagement from "./pages/FaqManagement";
import InventoryManagement from "./pages/InventoryManagement.jsx";

export default function App() {
  return (
    <Routes>
      {/* Landing Page Layout */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      {/* Admin Dashboard Layout */}
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/reservasi" element={<FormReservasi />} />
        <Route path="/data-diri" element={<FormDataDiri />} />
        <Route path="/datapelanggan" element={<SalesManagement />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/reservasi-management" element={<ReservasiManagement />} />
        <Route path="/faq" element={<FaqManagement />} />
      </Route>
    </Routes>
  );
}
