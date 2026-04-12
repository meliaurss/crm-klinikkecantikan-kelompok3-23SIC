import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase.js";
import { ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

// Helper function to format currency
function formatCurrency(num) {
  const numberValue = parseFloat(num);
  if (typeof numberValue !== "number" || isNaN(numberValue) || numberValue === null) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberValue);
}

// Helper function to truncate text
function truncateText(text, maxLength) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export default function AllTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isNotifVisible, setIsNotifVisible] = useState(false);

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("treatments")
          .select("id, name, gambar, price, description");

        if (fetchError) throw fetchError;

        setTreatments(data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data perawatan: " + err.message);
        console.error("Fetch treatments error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  useEffect(() => {
    if (notification) {
      setIsNotifVisible(true);
      const timer = setTimeout(() => {
        setIsNotifVisible(false);
        setTimeout(() => setNotification(null), 400);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleAddToCartForTreatment = (treatment) => {
    console.log("Add treatment to cart:", treatment.name);
    setNotification({ message: `Perawatan "${treatment.name}" ditambahkan ke keranjang!`, type: "success" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="font-['DM_Sans',sans-serif] bg-[#f4f6f8] min-h-screen py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with title and notification area */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 h-auto md:h-14 gap-4">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
              Semua Perawatan
            </h1>

            {/* --- NOTIFICATION LOCATION --- */}
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                  <span>{notification.message}</span>
                </div>
              )}
            </div>
          </div>

          {/* Loading Status */}
          {loading && (
            <p className="text-center text-[#5a6a7e] text-[13px] uppercase tracking-widest font-medium mt-16 flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-[#293A52]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memuat perawatan...
            </p>
          )}

          {/* Error Status */}
          {error && (
            <div className="flex justify-center mt-16">
              <p className="text-center bg-[#FFF0F0] border border-[#FFD6D6] text-[#D32F2F] text-[14px] px-6 py-4 rounded-sm shadow-sm inline-block">
                Oups! Gagal memuat perawatan: {error}. Silakan coba lagi nanti.
              </p>
            </div>
          )}

          {/* No Treatments Available Status */}
          {!loading && !error && treatments.length === 0 && (
            <div className="text-center mt-16 p-10 bg-[#FCFCFC] border border-[#CCD4E1] rounded-sm max-w-md mx-auto">
              <h2 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-2">Perawatan Belum Tersedia</h2>
              <p className="text-[#5a6a7e] text-[14px] font-light">
                Maaf, saat ini belum ada perawatan yang bisa ditampilkan. Silakan kembali nanti!
              </p>
            </div>
          )}

          {/* Treatments Grid */}
          {!loading && !error && treatments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="group bg-[#FCFCFC] border border-[#e8ecf1] rounded-sm shadow-sm hover:shadow-xl hover:shadow-[#293a52]/10 hover:border-[#a8b5c7] overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  {/* Treatment Image Area */}
                  <div className="relative overflow-hidden h-60 bg-[#e8ecf1]">
                    <img
                      src={treatment.gambar}
                      alt={treatment.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image"; // Fallback image
                      }}
                    />
                    {treatment.price && (
                      <div className="absolute top-4 left-4 bg-[#293A52] text-white text-[13px] font-medium py-1.5 px-3 rounded-sm tracking-wide z-10 shadow-sm">
                        {formatCurrency(treatment.price)}
                      </div>
                    )}
                  </div>

                  {/* Details Area */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-2">
                      {treatment.name}
                    </h3>
                    <div className="w-8 h-[1px] bg-[#CCD4E1] mb-4" />
                    
                    <p className="text-[13.5px] text-[#5a6a7e] font-light leading-relaxed flex-1 mb-6">
                      {truncateText(treatment.description, 100)} {/* Truncate to 100 characters */}
                    </p>
                    
                    <Link
                      to={`/treatments/${treatment.id}`}
                      className="mt-auto px-4 py-3 bg-[#293A52] text-white font-['DM_Sans',sans-serif] text-[11px] font-medium tracking-widest uppercase rounded-sm hover:bg-[#344a66] transition-colors duration-200 text-center flex items-center justify-center w-full"
                    >
                      Lihat Detail Perawatan
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}