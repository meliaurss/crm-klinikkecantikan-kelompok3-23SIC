// src/components/Landing/PromoPage.jsx
import React from "react";

const PromoPage = () => {
  // Data promo ada di sini (satu rumah dengan tampilannya)
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
    <>
      <style>{`
        /* Latar belakang krem mewah */
        .promo-container {
          background-color: #FAF6F1;
          font-family: 'Jost', sans-serif;
          min-height: 100vh;
        }
        
        .promo-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          letter-spacing: -0.5px;
        }

        .promo-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid rgba(201, 169, 110, 0.15);
          border-left: 5px solid #C9A96E; /* Aksen emas */
          box-shadow: 0 10px 30px rgba(44, 26, 14, 0.02);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .promo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(44, 26, 14, 0.06);
          border-color: rgba(201, 169, 110, 0.4);
        }

        .promo-card-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
        }

        .promo-card-desc {
          color: #6B4F3A;
          font-weight: 300;
          line-height: 1.6;
          flex: 1; /* Mendorong masa berlaku ke bawah */
        }

        .promo-card-until {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #A0623A;
          background: rgba(201, 169, 110, 0.1);
          border: 1px solid rgba(201, 169, 110, 0.2);
          padding: 8px 16px;
          border-radius: 6px;
          display: inline-block;
          font-weight: 500;
          align-self: flex-start;
        }
      `}</style>

      <div className="promo-container py-16">
        {/* Struktur tag HTML aslimu */}
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 promo-title">
            Promo Spesial Bahebak Clinic
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            {promos.map((promo) => (
              <div key={promo.id} className="promo-card p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 promo-card-title">
                  {promo.title}
                </h2>
                <p className="text-sm md:text-base mb-6 promo-card-desc">
                  {promo.desc}
                </p>
                <p className="promo-card-until">
                  {promo.until}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoPage;