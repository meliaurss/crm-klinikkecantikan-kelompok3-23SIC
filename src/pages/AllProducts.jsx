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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="all-products-page min-h-screen bg-[#f4f6f8] px-6 py-12 font-['DM_Sans',sans-serif]">
        <div className="max-w-7xl mx-auto">
          {/* Header dengan judul, notifikasi, dan tombol kembali */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 h-auto md:h-14 gap-4"> 
            {/* Judul */}
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
              Semua Produk
            </h1>

            {/* --- LOKASI NOTIFIKASI --- */}
            <div className="flex-1 flex justify-center md:justify-end px-4 w-full md:w-auto">
              {notification && (
                <div
                  className={`flex items-center gap-3 w-full max-w-sm p-3.5 rounded-sm shadow-sm font-medium text-[13px] tracking-wide transition-all duration-300 ease-in-out border
                  ${notification.type === 'success' ? 'bg-[#EEF7F2] text-[#287D3C] border-[#CDE7D5]' : 'bg-[#FFF0F0] text-[#D32F2F] border-[#FFD6D6]'}
                  ${isNotifVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
                >
                  {notification.type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    // Icon untuk error, misalnya Exclamation Circle Icon
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  <span>{notification.message}</span>
                </div>
              )}
            </div>
            
          </div>

          {/* Status Loading */}
          {loading && (
            <p className="text-center text-[#5a6a7e] text-[13px] uppercase tracking-widest font-medium mt-16 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-[#293A52]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat produk...
            </p>
          )}

          {/* Status Error */}
          {error && (
            <div className="flex justify-center mt-16">
              <p className="text-center bg-[#FFF0F0] border border-[#FFD6D6] text-[#D32F2F] text-[14px] px-6 py-4 rounded-sm shadow-sm inline-block">
                Oups! Gagal memuat produk: {error}. Silakan coba lagi nanti.
              </p>
            </div>
          )}

          {/* Status Produk Tidak Tersedia */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center mt-16 p-10 bg-[#FCFCFC] border border-[#CCD4E1] rounded-sm max-w-md mx-auto">
              <h2 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-2">Produk Belum Tersedia</h2>
              <p className="text-[#5a6a7e] text-[14px] font-light">
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
                  className="group relative bg-[#FCFCFC] border border-[#e8ecf1] rounded-sm overflow-hidden
                             transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#293a52]/10 hover:border-[#a8b5c7]
                             flex flex-col h-[380px] sm:h-[400px] md:h-[420px]"
                >
                  {/* Area Gambar Produk */}
                  <div className="relative bg-[#e8ecf1] p-4 flex items-center justify-center h-48 md:h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 group-hover:z-10"
                    />
                    {item.price && (
                      <div className="absolute top-3 left-3 bg-[#293A52] text-white text-[12px] font-medium py-1.5 px-3 rounded-sm tracking-wide z-20">
                        {formatCurrency(item.price)}
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCartConditional(item); // Panggil fungsi kondisional yang baru
                      }}
                      className="absolute top-3 right-3 bg-white rounded-sm p-2 shadow-sm border border-[#e8ecf1] text-[#293A52]
                                 transition-colors duration-200 z-20 hover:bg-[#f4f6f8] focus:outline-none"
                      title="Tambahkan ke Keranjang"
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Detail Produk */}
                  <div className="p-5 flex flex-col flex-grow bg-white">
                    <h3 className="text-[#293A52] font-['Playfair_Display',serif] font-semibold text-lg mb-2">
                      {item.name}
                    </h3>
                    <div className="w-8 h-[1px] bg-[#CCD4E1] mb-3" />
                    <p className="text-[#5a6a7e] text-[13px] font-light mb-3 line-clamp-3 flex-grow leading-relaxed">
                      {item.description}
                    </p>

                    <div className="relative h-12 mt-1 overflow-hidden">
                      <Link
                        to={`/product/${item.id}`}
                        className="w-full bg-[#293A52] text-white py-3 rounded-sm font-['DM_Sans',sans-serif] text-[11px] font-medium tracking-widest uppercase
                                   transform translate-y-full group-hover:translate-y-0
                                   transition-all duration-300 ease-out hover:bg-[#344a66]
                                   absolute bottom-0 left-0 right-0 flex items-center justify-center"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllProducts;