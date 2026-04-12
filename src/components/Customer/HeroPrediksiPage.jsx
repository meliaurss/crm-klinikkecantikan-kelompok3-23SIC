import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

export default function HeroPrediksiPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="bg-[#FCFCFC] py-24 px-6 text-center relative overflow-hidden font-['DM_Sans',sans-serif] min-h-[60vh] flex flex-col justify-center items-center border-b border-[#CCD4E1]">
        
        {/* Latar belakang yang lebih subtle dan elegan, menggantikan blob warna-warni */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#f4f6f8] to-transparent opacity-70 z-0" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-semibold text-[#293A52] leading-tight"
          >
            Temukan Rekomendasi Produk Kulit Terbaik untukmu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-[16px] md:text-[18px] text-[#5a6a7e] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Berdasarkan kondisi kulitmu, kami bantu temukan rangkaian perawatan yang paling tepat dan terpercaya dari The Rose Clinic.
          </motion.p>

          <motion.button
            onClick={() => navigate("/prediksi/form")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 bg-[#293A52] border border-[#293A52] text-[#FCFCFC] text-[14px] px-8 py-3.5 rounded-sm shadow-sm font-medium tracking-wide hover:bg-[#344a66] hover:border-[#344a66] transition-all duration-300"
          >
            Mulai Prediksi Sekarang
          </motion.button>

          {/* Bintang dekoratif dengan animasi opacity/pulse yang lebih halus (tidak bounce) */}
          <motion.div
            className="flex justify-center items-center gap-3 mt-12 text-[#a8b5c7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <FaStar className="text-[12px]" />
            </motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.3 }}>
              <FaStar className="text-[16px] text-[#293A52]" /> {/* Bintang tengah lebih menonjol */}
            </motion.div>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}>
              <FaStar className="text-[12px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}