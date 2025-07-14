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

      <div className="max-w-7xl mx-auto">
        {/* Header with title and notification area */}
        <div className="flex justify-between items-center mb-8 h-14">
          <h1 className="text-3xl font-bold text-[#181C68]">Semua Perawatan</h1>

          {/* --- NOTIFICATION LOCATION --- */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <span className="text-sm">{notification.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading Status */}
        {loading && (
          <p className="text-center text-blue-600 text-xl font-medium mt-10 flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 mr-3 text-blue-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat perawatan...
          </p>
        )}

        {/* Error Status */}
        {error && (
          <p className="text-center text-red-600 text-xl font-medium mt-10">
            Oups! Gagal memuat perawatan: {error}. Silakan coba lagi nanti.
          </p>
        )}

        {/* No Treatments Available Status */}
        {!loading && !error && treatments.length === 0 && (
          <div className="text-center mt-10 p-8 bg-white rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">Perawatan Belum Tersedia</h2>
            <p className="text-gray-500">
              Maaf, saat ini belum ada perawatan yang bisa ditampilkan. Silakan kembali nanti!
            </p>
          </div>
        )}

        {/* Treatments Grid */}
        {!loading && !error && treatments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8"> {/* Changed lg:grid-cols-4 to lg:grid-cols-3 */}
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transform hover:scale-[1.03] transition-all duration-300 flex flex-col"
              >
                {/* Treatment Image Area */}
                <img
                  src={treatment.gambar}
                  alt={treatment.name}
                  className="w-full h-56 object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=No+Image"; // Fallback image
                  }}
                />
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                    {treatment.name}
                  </h3>
                  {treatment.price && (
                    <div className="text-lg font-bold text-gray-800 mb-3">
                      {formatCurrency(treatment.price)}
                    </div>
                  )}
                  <p className="text-sm text-gray-600 flex-1">{treatment.description}</p>
                  <Link
                    to={`/treatments/${treatment.id}`}
                    className="mt-6 px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm rounded-full hover:brightness-110 shadow transition-all duration-300 flex items-center justify-center"
                  >
                    LIHAT PERAWATAN
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  
  );
}