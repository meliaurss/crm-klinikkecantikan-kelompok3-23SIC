import React from 'react';
import {
  Award,
  UserPlus,
  ShieldCheck,
  Smile,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Pengalaman Profesional",
      description: "Tim ahli Mahacare memiliki pengalaman bertahun-tahun di bidang estetika dan dermatologi."
    },
    {
      icon: <UserPlus className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Ribuan Pelanggan Puas",
      description: "Lebih dari 10.000 pelanggan telah merasakan perawatan terbaik kami di seluruh cabang Mahacare."
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Aman & Terpercaya",
      description: "Produk dan perawatan kami telah bersertifikasi BPOM dan diawasi langsung oleh tenaga medis."
    },
    {
      icon: <Smile className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Hasil Nyata",
      description: "Perubahan yang terlihat dan dirasakan langsung setelah perawatan secara rutin di Mahacare."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-indigo-600 mb-4" />,
      title: "Reservasi Mudah",
      description: "Cukup beberapa klik untuk melakukan reservasi, tanpa antre panjang dan ribet."
    }
  ];

  return (
    <section
      id="why-choose-us"
      className="py-20 px-4 md:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center text-[#181C68] mb-12"
      >
        Kenapa Memilih Klinik Mahacare?
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col items-center text-center"
          >
            <div className="bg-indigo-100 p-4 rounded-full mb-4 shadow-md hover:shadow-indigo-300 transition">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
