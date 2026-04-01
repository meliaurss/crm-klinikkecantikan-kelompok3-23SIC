// src/components/Landing/PromoPage.jsx
import React from "react";
import { motion } from "framer-motion";

const PromoPage = () => {
  const promos = [
    {
      id: 1,
      title: "Diskon 20% Facial Acne",
      desc: "Dapatkan perawatan wajah bebas jerawat dengan potongan harga spesial selama bulan ini!",
      until: "Berlaku hingga 31 Juli 2025",
      tag: "Best Seller"
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free Botox",
      desc: "Nikmati promo spesial Botox untuk Anda dan sahabat Anda. Khusus pelanggan baru!",
      until: "Hanya sampai 25 Juli 2025",
      tag: "Limited"
    },
    {
      id: 3,
      title: "Gratis Konsultasi Kulit",
      desc: "Tanpa biaya konsultasi untuk semua layanan hingga akhir bulan bersama dr. Tengku Rose.",
      until: "S&K berlaku",
      tag: "Free"
    },
  ];

  return (
    <>
      <style>{`
        .promo-container {
          background-color: #FCFCFC; /* var(--white) */
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Dot texture agar sama dengan Hero */
        .promo-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #CCD4E1 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.2;
          z-index: 0;
        }

        .promo-title {
          font-family: 'Playfair Display', serif;
          color: #020202; /* var(--black) */
          letter-spacing: -0.5px;
        }

        .promo-card {
          background: #FFFFFF;
          border-radius: 4px; /* Sesuai dengan btn-primary Hero */
          border: 1px solid #CCD4E1; /* var(--secondary) */
          box-shadow: 0 4px 20px rgba(41, 58, 82, 0.05);
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .promo-card:hover {
          transform: translateY(-6px);
          border-color: #293A52; /* var(--primary) */
          box-shadow: 0 12px 30px rgba(41, 58, 82, 0.12);
        }

        .promo-card-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #293A52;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .promo-card-title {
          font-family: 'Playfair Display', serif;
          color: #293A52; /* var(--primary) */
        }

        .promo-card-desc {
          color: #5a6a7e; /* var(--gray-text) */
          font-weight: 300;
          line-height: 1.7;
          flex: 1;
        }

        .promo-card-until {
          font-size: 11px;
          letter-spacing: 0.5px;
          color: #293A52;
          background: #f4f6f8; /* var(--primary-05) */
          border: 1px solid #e8ecf1; /* var(--primary-10) */
          padding: 8px 14px;
          border-radius: 3px;
          display: inline-block;
          font-weight: 500;
          align-self: flex-start;
        }

        .promo-divider {
           width: 40px;
           height: 1px;
           background: #CCD4E1;
           margin: 1.5rem 0;
        }
      `}</style>

      <div className="promo-container py-24 px-4">
        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-16">
            <span className="uppercase tracking-[3px] text-[10px] font-bold text-[#5a6a7e] mb-3 block">
              Exclusive Offers
            </span>
            <h2 className="text-4xl md:text-5xl font-medium promo-title">
              Penawaran <span className="italic text-[#293A52]">Istimewa</span>
            </h2>
            <div className="flex justify-center mt-4">
               <div className="h-[1px] w-12 bg-[#CCD4E1]"></div>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {promos.map((promo, index) => (
              <motion.div 
                key={promo.id} 
                className="promo-card p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="promo-card-tag">{promo.tag}</span>
                <h3 className="text-2xl font-semibold mb-2 promo-card-title">
                  {promo.title}
                </h3>
                <div className="promo-divider"></div>
                <p className="text-sm md:text-base mb-8 promo-card-desc">
                  {promo.desc}
                </p>
                <p className="promo-card-until">
                  {promo.until}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoPage;