// src/pages/AllProducts.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import "./AllProducts.css";

// Fungsi untuk memformat mata uang Rupiah
function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return "Rp 0,00";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

// Tambahkan currentUser dan isCustomerRoute sebagai props
const AllProducts = ({ products, loading, error, handleAddToCart, currentUser, isCustomerRoute }) => {
  const [notification, setNotification] = useState(null);
  const [isNotifVisible, setIsNotifVisible] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    if (notification) {
      setIsNotifVisible(true);
      const timer = setTimeout(() => {
        setIsNotifVisible(false);
        setTimeout(() => setNotification(null), 400); // Waktu untuk animasi keluar
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);
  // Ganti handleAddToCartAndNotify dengan logika kondisional
  const handleAddToCartConditional = (product) => {
    // Logika: Jika tidak ada currentUser (belum login) DAN ini bukan rute customer
    // Maka user berada di halaman publik dan harus login terlebih dahulu
    if (!currentUser && !isCustomerRoute) {
      setNotification({ message: "Silakan login terlebih dahulu!", type: "error" });
      setTimeout(() => {
        navigate('/login'); // Redirect ke halaman login setelah notifikasi terlihat
      }, 1500); // Beri waktu 1.5 detik agar notifikasi terbaca
    } else {
      // Jika user sudah login (currentUser ada) ATAU ini adalah rute customer
      // Maka produk bisa langsung ditambahkan ke keranjang
      handleAddToCart(product);
      setNotification({ message: "Produk berhasil ditambahkan!", type: "success" });
    }
  };

  return (
    <div className="all-products-page min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header dengan judul, notifikasi, dan tombol kembali */}
        <div className="flex justify-between items-center mb-8 h-14"> {/* Beri tinggi agar layout stabil */}
          {/* Judul */}
          <h1 className="text-3xl font-bold text-[#181C68]">Semua Produk</h1>

          {/* --- LOKASI NOTIFIKASI --- */}
          <div className="flex-1 flex justify-center px-4">
            {notification && (
              <div
                className={`flex items-center gap-3 w-full max-w-sm p-3 rounded-lg shadow-md text-white font-semibold transition-all duration-300 ease-in-out
                ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}
                ${isNotifVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                {notification.type === 'success' ? (
                  <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                ) : (
                  // Icon untuk error, misalnya Exclamation Circle Icon
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <span className="text-sm">{notification.message}</span>
              </div>
            )}
          </div>
          
          {/* Tombol Kembali */}
          <Link
            to="/"
            className="px-4 py-2 bg-[#181C68] text-white rounded-lg hover:bg-[#141a59] transition whitespace-nowrap"
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* Status Loading */}
        {loading && (
          <p className="text-center text-blue-600 text-xl font-medium mt-10 flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat produk...
          </p>
        )}

        {/* Status Error */}
        {error && (
          <p className="text-center text-red-600 text-xl font-medium mt-10">
            Oups! Gagal memuat produk: {error}. Silakan coba lagi nanti.
          </p>
        )}

        {/* Status Produk Tidak Tersedia */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center mt-10 p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Produk Belum Tersedia</h2>
            <p className="text-gray-500">
              Maaf, saat ini belum ada produk yang bisa ditampilkan. Silakan kembali nanti!
            </p>
          </div>
        )}

        {/* Grid Produk */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden
                               transition-all duration-300 ease-in-out transform
                               flex flex-col group h-[380px] sm:h-[400px] md:h-[420px]"
              >
                {/* Area Gambar Produk */}
                <div className="relative bg-white p-4 flex items-center justify-center h-48 md:h-56 overflow-hidden
                                 transform transition-transform duration-300 group-hover:scale-105 group-hover:z-10">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-500"
                  />
                  {item.price && (
                    <div className="absolute top-4 left-4 bg-[#181C68] text-white text-base font-bold py-1 px-3 rounded-md">
                      {formatCurrency(item.price)}
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCartConditional(item); // Panggil fungsi kondisional yang baru
                    }}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg
                                 transition-all duration-300 transform
                                 hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    title="Tambahkan ke Keranjang"
                  >
                    <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
                  </button>
                </div>

                {/* Detail Produk */}
                <div className="p-4 pt-6 pb-4 flex flex-col flex-grow">
                  <h3 className="text-[#181C68] font-bold text-lg mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                    {item.description}
                  </p>

                  <div className="relative h-12 mt-1 overflow-hidden">
                    <Link
                      to={`/product/${item.id}`}
                      className="w-full bg-[#181C68] text-white py-3 rounded-lg font-semibold
                                   transform translate-y-full group-hover:translate-y-0
                                   transition-transform duration-500 ease-out shadow-lg hover:bg-[#181C68]
                                   absolute bottom-0 left-0 right-0 flex items-center justify-center"
                    >
                      VIEW PRODUCTS
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;