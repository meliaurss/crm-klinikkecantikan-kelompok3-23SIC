import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import CustomerManagement from "./pages/CustomerManagement";
import ProductManagement from "./pages/ProductManagement";
import SalesManagement from "./pages/SalesManagement";
import LandingPage from "./pages/LandingPage"; // 🟢 Import LandingPage

function App() {
  return (
    <Routes>
      {/* 🟢 Landing Page (halaman awal) di luar MainLayout */}
      <Route path="/" element={<LandingPage />} />

      {/* 🟢 Routes untuk admin (pakai MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/pelanggan" element={<CustomerManagement />} />
        <Route path="/admin/produk" element={<ProductManagement />} />
        <Route path="/admin/penjualan" element={<SalesManagement />} />
      </Route>
    </Routes>
  );
}

export default App;
