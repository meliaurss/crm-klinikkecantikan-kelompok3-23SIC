import React from 'react';
import promoImg from '../../assets/promo1.png';
import { motion } from 'framer-motion';

const PromoSection = () => {
  return (
    <section
      id="promo"
      className="py-20 px-4 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-[#181C68] mb-4"
        >
          🎉 Promo Eksklusif Bulan Ini!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto"
        >
          Nikmati diskon hingga <strong>30%</strong> untuk semua layanan Mahacare! 
          Dapatkan kulit sehat dan glowing dengan perawatan terbaik dari kami.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full overflow-hidden rounded-3xl shadow-2xl max-w-4xl mx-auto group"
        >
          <img
            src={promoImg}
            alt="Promo Mahacare"
            className="w-full h-[300px] md:h-[360px] object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#181C68cc] to-[#3b82f688] backdrop-blur-md flex flex-col items-center justify-center text-white px-6 py-8">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-xl"
            >
              Diskon 30% Semua Treatment!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-sm md:text-base mb-6 max-w-md drop-shadow-md"
            >
              Berlaku hingga <strong>31 Juni 2025</strong> di seluruh cabang Mahacare.
              Yuk, reservasi sekarang dan jangan lewatkan kesempatan emas ini!
            </motion.p>

            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.4 }}
              href="#services"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:brightness-110 px-6 py-2 rounded-full transition text-sm md:text-base font-semibold shadow-lg"
            >
              ✨ Reservasi Sekarang
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoSection;
