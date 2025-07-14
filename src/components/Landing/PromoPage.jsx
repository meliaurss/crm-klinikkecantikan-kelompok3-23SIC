// src/pages/PromoPage.jsx
import React from "react";

const PromoPage = () => {
  const promos = [
    {
      id: 1,
      title: "Diskon 20% untuk Facial Acne Treatment",
      desc: "Dapatkan perawatan wajah bebas jerawat dengan potongan harga spesial selama bulan ini!",
      until: "Berlaku hingga 31 Juli 2025",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free Botox",
      desc: "Nikmati promo spesial Botox untuk Anda dan sahabat Anda. Khusus pelanggan baru!",
      until: "Hanya sampai 25 Juli 2025",
    },
    {
      id: 3,
      title: "Gratis Konsultasi Kulit",
      desc: "Tanpa biaya konsultasi untuk semua layanan hingga akhir bulan.",
      until: "S&K berlaku",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Promo Spesial Mahacare</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {promos.map((promo) => (
          <div key={promo.id} className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500">
            <h2 className="text-xl font-semibold text-indigo-600 mb-1">{promo.title}</h2>
            <p className="text-gray-700 mb-2">{promo.desc}</p>
            <p className="text-sm text-indigo-400">{promo.until}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoPage;
