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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Memuat detail perawatan...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-600">Error: {error}</p>
        <Link to="/treatments" className="ml-4 text-blue-600 hover:underline">Kembali ke Semua Perawatan</Link>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Perawatan tidak ditemukan.</p>
        <Link to="/treatments" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Kembali ke Semua Perawatan</Link>
      </div>
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
    <div className="container mx-auto px-4 py-8 md:py-16">
      <nav className="text-gray-600 text-sm mb-6">
        <Link to="/" className="hover:underline">Home</Link>
        <span className="mx-2">→</span>
        <Link to="/treatments" className="hover:underline">Perawatan</Link>
        <span className="mx-2">→</span>
        <span className="font-semibold text-gray-800">{treatment.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
        <div className="md:w-1/2 flex justify-center items-center p-6 rounded-lg shadow-md">
          <img
            src={treatment.image}
            alt={treatment.name}
            className="max-w-full max-h-[500px] object-contain rounded-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150?text=No+Image";
            }}
          />
        </div>

        <div className="md:w-1/2 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-gray-900">{treatment.name}</h1>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
              title="Tambahkan ke Wishlist"
            >
              <HeartIcon className="h-7 w-7 text-gray-500 hover:text-red-500" />
            </button>
          </div>

          <p className="text-3xl font-semibold text-gray-800 mb-6">
            {formatCurrency(treatment.price)}
          </p>

          {/* ✅ Paragraf deskripsi umum */}
          <p className="text-gray-700 leading-relaxed mb-6">{paragraphDescription}</p>

          {/* ✅ Section subjudul & poin */}
          <div className="text-gray-700 leading-relaxed mb-8">
            {sections.map((section, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold text-gray-800">{section.title}</h3>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  {section.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            onClick={handleMakeReservation}
            className="w-full md:w-3/4 lg:w-1/2 px-6 py-3 bg-[#181C68] text-white font-semibold rounded-lg
                       transition duration-300
                       hover:bg-[#5055a8] shadow-md
                       flex items-center justify-center gap-2"
          >
            <CalendarDaysIcon className="h-6 w-6" />
            BUAT RESERVASI
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailTreatments;
