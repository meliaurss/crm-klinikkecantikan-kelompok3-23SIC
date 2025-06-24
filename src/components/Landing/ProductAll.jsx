// src/pages/ProductAll.jsx
import React from 'react';
import { motion } from 'framer-motion'; // Jika Anda ingin animasi
// Import fungsi formatCurrency dari tempat yang konsisten,
// atau definisikan ulang di sini jika ProductAll.jsx adalah standalone
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

// Komponen ProductAll akan menerima props products, loading, dan error
const ProductAll = ({ products, loading, error }) => {
  return (
    <div className="py-16 px-4 md:px-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#181C68] mb-4">
            Jelajahi Semua Produk Kami
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Temukan rangkaian lengkap produk perawatan kulit Mahacare. Setiap produk dirancang untuk memberikan hasil terbaik dan memancarkan kecantikan alami Anda.
          </p>
        </motion.div>

        {/* Loading and Error States */}
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

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Product Image and Price Tag */}
                <div className="relative h-64 overflow-hidden flex items-center justify-center bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Price Tag, inspired by Screenshot 2025-06-23 022955.png */}
                  <div className="absolute top-4 left-4 bg-[#181C68] text-white px-4 py-2 rounded-lg font-bold text-lg shadow-md">
                    {formatCurrency(product.price)}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#181C68] mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  
                  {/* Action Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => alert(`Anda tertarik dengan produk ${product.name}! Ini akan mengarah ke halaman detail produk atau proses pembelian.`)}
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105"
                    >
                      Lihat Detail Produk
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductAll;