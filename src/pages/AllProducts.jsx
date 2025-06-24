// src/pages/AllProducts.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./AllProducts.css"; // Pastikan file CSS ini ada jika Anda memiliki styling kustom di dalamnya

// Fungsi formatCurrency (tetap dipertahankan)
function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return "Rp 0,00"; // Default jika angka tidak valid
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2, // Memastikan selalu ada dua angka desimal
    maximumFractionDigits: 2, // Memastikan selalu ada dua angka desimal
  }).format(num);
}

// Menerima products, loading, dan error sebagai props dari App.jsx
const AllProducts = ({ products, loading, error }) => {
  return (
    <div className="all-products-page min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#181C68]">Semua Produk</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-[#181C68] text-white rounded-lg hover:bg-[#141a59] transition"
          >
            Kembali ke Beranda
          </Link>
        </div>

        {/* Loading and Error States (dari props) */}
        {loading && (
          <p className="text-center text-blue-600 text-xl font-medium mt-10">
            <svg className="animate-spin h-6 w-6 mr-3 inline-flex" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat produk...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 text-xl font-medium mt-10">
            Oups! Gagal memuat produk: {error}. Silakan coba lagi nanti.
          </p>
        )}

        {/* No Products Found State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center mt-10 p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Produk Belum Tersedia</h2>
            <p className="text-gray-500">
              Maaf, saat ini belum ada produk yang bisa ditampilkan. Silakan kembali nanti!
            </p>
          </div>
        )}

        {/* Products Grid (hanya render jika tidak loading/error dan ada produk) */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                // *** PERUBAHAN DI SINI ***
                // Memastikan `group` ada di elemen parent yang ingin di-hover untuk memicu perubahan.
                // Kelas `group-hover:scale-105` dan `group-hover:z-10` harus berada di sini
                // jika Anda ingin seluruh kartu membesar.
                className="relative bg-white rounded-lg shadow-md hover:shadow-xl
                           transition duration-300 transform group
                           flex flex-col overflow-hidden"
              >
                {/* Product Image and Price Tag */}
                <div className="relative bg-white p-4 pt-8 pb-8 flex items-center justify-center h-72 overflow-hidden
                            transform transition-transform duration-300 group-hover:scale-105 group-hover:z-10"> {/* <-- Animasi scaling diterapkan di sini */}
                  <img
                    src={item.image}
                    alt={item.name}
                    // Kelas `group-hover:scale-105` dihapus dari `img` agar tidak ada scaling ganda
                    className="w-full h-full object-contain transition-transform duration-500"
                  />
                  {item.price && (
                    <div className="absolute top-4 left-4 bg-[#181C68] text-white text-base font-bold py-1 px-3 rounded-md">
                      {formatCurrency(item.price)}
                    </div>
                  )}
                  {/* Heart Icon (Love/Wishlist) - Muncul saat hover */}
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 22.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                </div>

                {/* Product Details */}
                <div className="p-4 pt-6 pb-4 flex flex-col flex-grow">
                  <h3 className="text-[#181C68] font-bold text-lg mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
                    {item.description}
                  </p>

                  {/* Swipe Button Container */}
                  <div className="relative h-12 mt-1 overflow-hidden">
                    <button
                      onClick={() => alert(`Anda tertarik dengan produk ${item.name}! Ini akan mengarah ke halaman detail produk atau proses pembelian.`)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold
                                 transform translate-y-full group-hover:translate-y-0
                                 transition-transform duration-500 ease-out shadow-lg hover:bg-indigo-700
                                 absolute bottom-0 left-0 right-0"
                    >
                      VIEW PRODUCTS
                    </button>
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