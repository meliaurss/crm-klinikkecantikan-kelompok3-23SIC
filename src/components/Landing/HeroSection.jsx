// src/components/Landing/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import gambar1 from '../../assets/gambar1.png';
import gambar2 from '../../assets/gambar2.png';
import gambar3 from '../../assets/gambar3.png';
import { motion } from 'framer-motion';

const HeroSection = ({ onReservasiClick }) => {
  const images = [gambar1, gambar2, gambar3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleReservasiClick = () => {
    if (!user) {
      // Belum login: redirect ke halaman login
      navigate('/login');
    } else {
      // Sudah login: trigger form reservasi (jika ada)
      if (onReservasiClick) {
        onReservasiClick();
      } else {
        // fallback jika tidak ada fungsi, bisa arahkan ke dashboard
        navigate('/customer');
      }
    }
  };

  return (
    <section id="hero" className="py-20 px-4 md:px-12">
      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500 rounded-full opacity-30 blur-3xl animate-pulse z-0" />
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col-reverse md:flex-row items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#181C68] leading-tight mb-4">
            Klinik Kecantikan Modern
            <br className="hidden md:block" />
            Untuk Wajah Cerah & Glowing
          </h1>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            Dapatkan <span className="font-semibold text-indigo-600">diskon hingga Rp100.000</span> untuk semua treatment spesial bulan ini. Yuk kunjungi cabang <span className="text-[#181C68] font-semibold">Mahacare</span> sekarang juga!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReservasiClick}
            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-7 py-3 rounded-2xl font-semibold shadow-md transition-transform duration-300 hover:shadow-lg"
          >
            📅 Reservasi Sekarang
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="Slideshow Mahacare"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl shadow-2xl w-full max-w-sm h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
