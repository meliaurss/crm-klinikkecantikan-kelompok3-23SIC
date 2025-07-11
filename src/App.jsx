// src/App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';


// Layouts
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
import CustomerLayout from "./layouts/CustomerLayout"; // Perhatikan CustomerLayout

// Context
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import useAuth

// Pages - General
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import ReservasiManagement from "./pages/ReservasiManagement";
import AllProducts from "./pages/AllProducts"; // Ini akan digunakan untuk /products-all
import InventoryManagement from "./pages/InventoryManagement";
import CustomerManagement from "./pages/CustomerManagement";
import ReservasiManagement from "./pages/Admin/ReservasiManagement";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import InventoryManagement from "./pages/Admin/InventoryManagement.jsx";
import CustomerManagement from "./pages/Admin/CustomerManagement";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import CustomerLayout from "./layouts/CustomerLayout";
import CustomerProducts from "./pages/Customer/CustomerProducts";
import Login from "./pages/Auth/Login";

// Pages - Admin
import AdminFeedback from "./pages/Admin/AdminFeedback";
import AdminFAQ from "./pages/Admin/AdminFaq";
import ProdukManagement from "./pages/Admin/ProdukManagement";
import AllProducts from './pages/AllProducts';
import FAQManagement from "./pages/Admin/FAQManagement.jsx";
import HeroPrediksiPage from "./components/Customer/HeroPrediksiPage.jsx";
import FormPrediksiPage from "./pages/Customer/FormPrediksiPage.jsx";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import { supabase } from './supabase.js';
import FormReservasi from "./components/Landing/FormReservasi.jsx"

export default function App() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    // Ambil data keranjang dari localStorage saat aplikasi pertama kali dimuat
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan data keranjang ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

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
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      ).filter(item => item.quantity > 0) // Pastikan untuk menghapus item jika kuantitas jadi 0 atau kurang
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

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
      {/* ⬇️ TOASTER DITEMPATKAN DI SINI */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products-all" element={<AllProducts products={products} loading={loadingProducts} error={errorProducts} />} />
          <Route path="/prediksi" element={<HeroPrediksiPage />} />
          <Route path="/prediksi/form" element={<FormPrediksiPage />} />
        </Route>
      <AppContent
        products={products}
        setProducts={setProducts}
        loadingProducts={loadingProducts}
        setLoadingProducts={setLoadingProducts}
        errorProducts={errorProducts}
        setErrorProducts={setErrorProducts}
        cartItems={cartItems} // Teruskan cartItems ke AppContent
        handleAddToCart={handleAddToCart}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />
    </AuthProvider>
  );
}

// Create a new component to consume AuthContext and other props
function AppContent({
  products,
  setProducts,
  loadingProducts,
  errorProducts,
  handleAddToCart,
  handleUpdateQuantity,
  handleRemoveItem,
  cartItems // Terima cartItems dari App
}) {
  const { currentUser } = useAuth(); // Consume currentUser here

  return (
    <Routes>
      {/* Landing Page Routes with LandingLayout (TIDAK ADA PERUBAHAN DI SINI) */}
      <Route element={<LandingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/products-all"
          element={
            <AllProducts
              products={products}
              loading={loadingProducts}
              error={errorProducts}
              handleAddToCart={handleAddToCart}
              currentUser={currentUser}
              isCustomerRoute={false}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={<DetailProduct handleAddToCart={handleAddToCart} currentUser={currentUser} />}
        />
      </Route>

      {/* Cart Page */}
      <Route
        path="/cart"
        element={
          <CartPage
            cartItems={cartItems}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        }
      />

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes with MainLayout (TIDAK ADA PERUBAHAN DI SINI) */}
      <Route
        path="/admin"
        element={<MainLayout />}
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route
          path="produk"
          element={
            <ProdukManagement
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route path="reservations" element={<ReservasiManagement />} />
        <Route path="customers" element={<CustomerManagement />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="faqs" element={<AdminFAQ />} />
      </Route>

      {/* Customer Routes with CustomerLayout (PERUBAHAN DI SINI) */}
      <Route path="/customer" element={<CustomerLayout cartItems={cartItems} />}> {/* <--- cartItems diteruskan ke CustomerLayout */}
        <Route index element={<CustomerDashboard />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="reservasi" element={<FormReservasi />} />
        <Route
          path="produk"
          element={
            <AllProducts
              products={products}
              loading={loadingProducts}
              error={errorProducts}
              handleAddToCart={handleAddToCart}
              currentUser={currentUser}
              isCustomerRoute={true}
            />
          }
        />
      </Route>
    </Routes>
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="products" element={<CustomerProducts products={products} loading={loadingProducts} error={errorProducts} />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
