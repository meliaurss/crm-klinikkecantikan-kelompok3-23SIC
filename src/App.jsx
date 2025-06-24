// src/App.jsx
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import ReservasiManagement from "./pages/Admin/ReservasiManagement";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import InventoryManagement from "./pages/Admin/InventoryManagement";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import InventoryManagement from "./pages/InventoryManagement";
import ListPelanggan from "./pages/ListPelanggan";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./pages/Customer/CustomerProducts";
import Login from "./pages/Auth/Login";
import CustomerManagement from "./pages/Admin/CustomerManagement";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Landing Page Layout */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        {/* Login Page without layout */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes (Tetap Terproteksi) */}
        <Route
          path="/admin"
          element={
              <MainLayout />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard/>} />
          <Route path="inventory" element={<InventoryManagement/>} />
          <Route path="reservations" element={<ReservasiManagement/>} />
          <Route path="customers" element={<CustomerManagement/>} />
          <Route path="feedback" element={<AdminFeedback/>} />
          <Route path="faqs" element={<AdminFAQ/>} />
        </Route>

        {/* Customer Routes (Tanpa Login) */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="products" element={<CustomerProducts />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
