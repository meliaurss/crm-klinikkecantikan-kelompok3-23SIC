// src/App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import { AuthProvider } from "./context/AuthContext";

import AdminDashboard from "./pages/Admin/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import ReservasiManagement from "./pages/Admin/ReservasiManagement";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import InventoryManagement from "./pages/Admin/InventoryManagement.jsx";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./pages/Customer/CustomerProducts";
import Login from "./pages/Auth/Login";
import ProdukManagement from "./pages/Admin/ProdukManagement";
import AllProducts from './pages/AllProducts';
import FAQManagement from "./pages/Admin/FAQManagement.jsx";
import HeroPrediksiPage from "./components/Customer/HeroPrediksiPage.jsx";
import FormPrediksiPage from "./pages/Customer/FormPrediksiPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import { supabase } from './supabase.js';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  useEffect(() => {
    async function getProducts() {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from('produk')
        .select('id, nama, gambar, harga, keterangan');

      if (error) {
        setErrorProducts("Gagal memuat produk: " + error.message);
        setProducts([]);
      } else {
        const fetchedProducts = data.map(item => ({
          id: item.id,
          name: item.nama,
          image: item.gambar,
          price: parseFloat(item.harga) || 0,
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
      {/* ⬇️ TOASTER DITEMPATKAN DI SINI */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products-all" element={<AllProducts products={products} loading={loadingProducts} error={errorProducts} />} />
          <Route path="/prediksi" element={<HeroPrediksiPage />} />
          <Route path="/prediksi/form" element={<FormPrediksiPage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="produk" element={<ProdukManagement products={products} setProducts={setProducts} />} />
          <Route path="reservations" element={<ReservasiManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="faqs" element={<FAQManagement />} />
        </Route>

        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="products" element={<CustomerProducts products={products} loading={loadingProducts} error={errorProducts} />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
