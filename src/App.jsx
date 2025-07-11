import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import CustomerLayout from "./layouts/CustomerLayout";

// Context
import { AuthProvider } from "./context/AuthContext";

// Pages - General
import Dashboard from "./pages/another/Dashboard";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/RegisterPage";

// Admin Pages
import ReservasiManagement from "./pages/Admin/ReservasiManagement";
import ProdukManagement from "./pages/Admin/ProdukManagement";
import InventoryManagement from "./pages/Admin/InventoryManagement";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import FAQManagement from "./pages/Admin/FAQManagement"; // Jika digunakan

// Customer Pages
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import HeroPrediksiPage from "./components/Customer/HeroPrediksiPage";
import FormPrediksiPage from "./pages/Customer/FormPrediksiPage";
import FormReservasi from "./components/Landing/FormReservasi";

// Produk & Keranjang
import AllProducts from "./pages/AllProducts";
import DetailProduct from "./components/Customer/DetailProduk";
import CartPage from "./components/Customer/CardPage";


// Supabase
import { supabase } from './supabase';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Tambah ke keranjang
  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Ambil produk dari Supabase
  useEffect(() => {
    async function getProducts() {
      setLoadingProducts(true);
      setErrorProducts(null);
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
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* 🌐 Public Routes - Landing */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products-all" element={
            <AllProducts
              products={products}
              loading={loadingProducts}
              error={errorProducts}
              handleAddToCart={handleAddToCart}
              isCustomerRoute={false}
            />
          } />
          <Route path="/prediksi" element={<HeroPrediksiPage />} />
          <Route path="/prediksi/form" element={<FormPrediksiPage />} />
        </Route>

        {/* 🔍 Detail Produk */}
        <Route path="/product/:productId" element={
          <DetailProduct handleAddToCart={handleAddToCart} />
        } />

        {/* 🛒 Keranjang */}
        <Route path="/cart" element={
          <CartPage
            cartItems={cartItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        } />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🧑‍💼 Admin */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryManagement />} />
          <Route path="produk" element={
            <ProdukManagement
              products={products}
              setProducts={setProducts}
            />
          } />
          <Route path="reservations" element={<ReservasiManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="faqs" element={<AdminFAQ />} />
          {/* <Route path="faq-management" element={<FAQManagement />} /> */}
        </Route>

        {/* 👩‍⚕️ Customer */}
        <Route path="/customer" element={<CustomerLayout cartItems={cartItems} />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="reservasi" element={<FormReservasi />} />
          <Route path="produk" element={
            <AllProducts
              products={products}
              loading={loadingProducts}
              error={errorProducts}
              handleAddToCart={handleAddToCart}
              isCustomerRoute={true}
            />
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
