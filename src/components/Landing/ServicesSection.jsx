import React from 'react';
import gambar1 from '../../assets/gambar1.png';
import gambar2 from '../../assets/gambar2.png';
import gambar3 from '../../assets/gambar3.png';
import { motion } from 'framer-motion';

const ServicesSection = ({ onOpenReservasi }) => {
  const services = [
    {
      id: 1,
      name: "Facial Glow Treatment",
      description: "Membantu mencerahkan wajah kusam dan membuat kulit tampak lebih segar dan glowing.",
      image: gambar1
    },
    {
      id: 2,
      name: "Acne Cure Treatment",
      description: "Perawatan khusus untuk kulit berjerawat yang efektif membersihkan pori dan mengurangi inflamasi.",
      image: gambar2
    },
    {
      id: 3,
      name: "Anti-Aging Laser",
      description: "Teknologi laser modern untuk mengurangi garis halus dan meremajakan kulit wajah Anda.",
      image: gambar3
    }
  ];

  return (
    <section id="services" className="py-20 px-4 md:px-12">
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-[#181C68] mb-4"
        >
          Layanan Unggulan Kami
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Klinik Mahacare menghadirkan berbagai layanan perawatan kulit dan wajah
          yang aman, modern, dan terbukti memberikan hasil terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={index}
            onOpenReservasi={onOpenReservasi}
          />
        ))}
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index, onOpenReservasi }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 transform hover:scale-[1.03] transition-all duration-300 flex flex-col"
  >
    <img
      src={service.image}
      alt={service.name}
      className="w-full h-56 object-cover"
    />
    <div className="p-6 text-center flex-1 flex flex-col">
      <h3 className="text-xl font-semibold text-indigo-700 mb-3">
        {service.name}
      </h3>
      <p className="text-sm text-gray-600 flex-1">{service.description}</p>
      <button
        onClick={onOpenReservasi}
        className="mt-6 px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-sm rounded-full hover:brightness-110 shadow transition-all duration-300"
      >
        Reservasi Sekarang
      </button>
    </div>
  </motion.div>
);

export default ServicesSection;
