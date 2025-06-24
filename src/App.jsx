// src/App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import ReservasiManagement from "./pages/Admin/ReservasiManagement";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import InventoryManagement from "./pages/InventoryManagement";
import CustomerManagement from "./pages/Customer/CustomerManagement";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./pages/Customer/CustomerProducts";
import Login from "./pages/Auth/Login";
import ProdukManagement from "./pages/Admin/ProdukManagement";

import { supabase } from './supabase.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      setLoadingProducts(true);
      setErrorProducts(null); // Perbaiki: set errorProducts bukan setError
      const { data, error } = await supabase
        .from('produk')
        .select('id, nama, gambar, harga, keterangan');

      if (error) {
        console.error("Error fetching products in App.jsx:", error);
        setErrorProducts("Gagal memuat produk: " + error.message);
        setProducts([]);
      } else {
        const fetchedProducts = data.map(item => ({
          id: item.id,
          name: item.nama,
          image: item.gambar,
          // *** PERBAIKAN PENTING DI SINI ***
          // Pastikan item.harga dikonversi menjadi angka.
          // Gunakan parseFloat() dan berikan default 0 jika konversi gagal (misal jika data null/undefined)
          price: parseFloat(item.harga) || 0, //
          description: item.keterangan,
        }));
        setProducts(fetchedProducts);
      }
      setLoadingProducts(false);
    }

    getProducts();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Landing Page Layout */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/products-all"
            element={
              <AllProducts
                products={products}
                loading={loadingProducts}
                error={errorProducts}
              />
            }
          />
        </Route>

        {/* Login Page without layout */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            // <ProtectedRoute requiredRoles={['admin']}>
              <MainLayout />
            // </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route
            path="produk"
            element={<ProdukManagement products={products} setProducts={setProducts} />}
          />
          <Route path="reservations" element={<ReservasiManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="faqs" element={<AdminFAQ />} />
        </Route>

        {/* Customer Routes */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route
            path="products"
            element={
              <CustomerProducts
                products={products}
                loading={loadingProducts}
                error={errorProducts}
              />
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}