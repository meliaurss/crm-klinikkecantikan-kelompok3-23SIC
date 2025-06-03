import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import ProductManagement from "./pages/ProductManagement";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (

    <Routes>
      {/* Semua halaman (termasuk LandingPage) pakai MainLayout */}
      <Route element = {<MainLayout/>}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/pelanggan" element={<CustomerManagement />} />
        <Route path="/produk" element={<ProductManagement />} />
        <Route path="/penjualan" element={<SalesManagement />} />
      </Route>
    </Routes>
  );
}

