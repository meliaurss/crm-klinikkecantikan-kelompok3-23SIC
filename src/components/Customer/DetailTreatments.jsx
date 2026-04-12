// src/pages/DetailTreatments.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from "../../supabase.js";
import { HeartIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

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

const DetailTreatments = () => {
  const { treatmentId } = useParams();
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreatment = async () => {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('treatments')
        .select('*')
        .eq('id', treatmentId)
        .single();

      if (fetchError) {
        console.error("Error fetching treatment:", fetchError);
        setError("Gagal memuat detail perawatan: " + fetchError.message);
        setTreatment(null);
      } else if (data) {
        setTreatment({
          id: data.id,
          name: data.name,
          image: data.gambar,
          price: data.price,
          description: data.description,
        });
      } else {
        setError("Perawatan tidak ditemukan.");
        setTreatment(null);
      }
      setLoading(false);
    };

    if (treatmentId) {
      fetchTreatment();
    }
  }, [treatmentId]);

  const handleMakeReservation = () => {
    if (treatment) {
      navigate('/customer/reservasi', { state: { treatment: treatment } });
    }
  };

  if (loading) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
        <div className="flex justify-center items-center min-h-screen bg-[#f4f6f8] font-['DM_Sans',sans-serif]">
          <p className="text-center text-[#5a6a7e] text-[13px] uppercase tracking-widest font-medium flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3 text-[#293A52]" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat detail perawatan...
          </p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#f4f6f8] font-['DM_Sans',sans-serif] px-4">
          <p className="text-center bg-[#FFF0F0] border border-[#FFD6D6] text-[#D32F2F] text-[14px] px-6 py-4 rounded-sm shadow-sm inline-block mb-4">
            Error: {error}
          </p>
          <Link to="/treatments" className="text-[#293A52] font-medium text-[13px] hover:underline hover:text-[#344a66] transition-colors">
            Kembali ke Semua Perawatan
          </Link>
        </div>
      </>
    );
  }

  if (!treatment) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>
        <div className="flex flex-col justify-center items-center min-h-screen bg-[#f4f6f8] font-['DM_Sans',sans-serif]">
          <p className="text-[15px] text-[#5a6a7e] mb-4">Perawatan tidak ditemukan.</p>
          <Link to="/treatments" className="px-6 py-2.5 bg-[#293A52] text-white text-[12px] uppercase tracking-widest font-medium rounded-sm hover:bg-[#344a66] transition-colors">
            Kembali ke Semua Perawatan
          </Link>
        </div>
      </>
    );
  }

  // ✅ Pisahkan paragraf deskripsi awal
  const lines = treatment.description.split("\n").filter(line => line.trim() !== "");
  const firstSectionIndex = lines.findIndex(line => line.endsWith(":"));

  const paragraphDescription = firstSectionIndex !== -1
    ? lines.slice(0, firstSectionIndex).join(" ")
    : lines.join(" ");

  // ✅ Parsing section
  const sections = lines.slice(firstSectionIndex).reduce((acc, line) => {
    if (line.endsWith(":")) {
      acc.push({ title: line.slice(0, -1), points: [] });
    } else if (line.trim() !== "" && acc.length > 0) {
      acc[acc.length - 1].points.push(line.trim());
    }
    return acc;
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="bg-[#f4f6f8] min-h-screen font-['DM_Sans',sans-serif] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="text-[#5a6a7e] text-[12px] uppercase tracking-wider font-medium mb-10 flex items-center gap-2">
            <Link to="/" className="hover:text-[#293A52] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/treatments" className="hover:text-[#293A52] transition-colors">Perawatan</Link>
            <span>/</span>
            <span className="text-[#293A52] font-semibold">{treatment.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Image Area */}
            <div className="lg:w-1/2">
              <div className="bg-[#FCFCFC] border border-[#e8ecf1] p-8 md:p-12 rounded-sm shadow-sm flex justify-center items-center h-full min-h-[400px]">
                <img
                  src={treatment.image}
                  alt={treatment.name}
                  className="max-w-full max-h-[450px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                  }}
                />
              </div>
            </div>

            {/* Details Area */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52] leading-tight">
                  {treatment.name}
                </h1>
                <button
                  className="p-2 -mr-2 rounded-full hover:bg-[#e8ecf1] transition duration-300 text-[#a8b5c7] hover:text-[#D32F2F]"
                  title="Tambahkan ke Wishlist"
                >
                  <HeartIcon className="h-7 w-7" />
                </button>
              </div>

              <div className="w-12 h-[1px] bg-[#CCD4E1] mb-6" />

              <p className="text-2xl font-['Playfair_Display',serif] font-bold text-[#293A52] mb-8">
                {formatCurrency(treatment.price)}
              </p>

              {/* ✅ Paragraf deskripsi umum */}
              <p className="text-[#5a6a7e] text-[15px] font-light leading-relaxed mb-8">
                {paragraphDescription}
              </p>

              {/* ✅ Section subjudul & poin */}
              <div className="text-[#5a6a7e] text-[15px] font-light leading-relaxed mb-10">
                {sections.map((section, idx) => (
                  <div key={idx} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-[#293A52] mb-3">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.points.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#293A52] mr-3 font-bold mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                onClick={handleMakeReservation}
                className="w-full sm:w-auto px-8 py-4 bg-[#293A52] text-white font-['DM_Sans',sans-serif] text-[12px] font-medium tracking-widest uppercase rounded-sm hover:bg-[#344a66] shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <CalendarDaysIcon className="h-5 w-5" />
                Buat Reservasi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTreatments;