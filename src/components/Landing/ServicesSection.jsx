import React from 'react';
import { motion } from 'framer-motion';
// Pastikan path import ini sesuai dengan struktur folder proyekmu
import TreatmentCard from './TreatmentCard'; 
import gambar1 from '../../assets/gambar1.png';
import gambar2 from '../../assets/gambar2.png';
import gambar3 from '../../assets/gambar3.png';

const ServicesSection = ({ onOpenReservasi }) => {
  const services = [
    {
      id: 1,
      name: "Facial Glow Treatment",
      description: "Membantu mencerahkan wajah kusam dan membuat kulit tampak lebih segar dan glowing alami.",
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
      description: "Teknologi laser modern untuk mengurangi garis halus dan meremajakan sel kulit wajah Anda.",
      image: gambar3
    }
  ];

  return (
    <>
      <style>{`
        .services-section {
          background-color: #FAF6F1; /* Ivory / Krem muda */
          font-family: 'Jost', sans-serif;
          position: relative;
        }

        /* Badge Mewah */
        .luxury-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(201,169,110,0.15), rgba(184,184,184,0.12));
          border: 1px solid rgba(201,169,110,0.4);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 20px;
        }

        .luxury-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C9A96E;
        }

        .luxury-badge-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #7B4A2D;
        }

        /* Tipografi Judul */
        .services-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .services-title .accent-italic {
          font-style: italic;
          color: #7B4A2D;
        }
      `}</style>

      <section id="services" className="services-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="luxury-badge"
            >
              <span className="luxury-badge-dot" />
              <span className="luxury-badge-text">Layanan Premium</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="services-title text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              Treatment <span className="accent-italic">Unggulan</span> Kami
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#6B4F3A] max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed"
            >
              Klinik Bahebak menghadirkan berbagai layanan perawatan kulit dan wajah yang aman, modern, dan terbukti memberikan hasil terbaik untuk memancarkan kecantikan alami Anda.
            </motion.p>
          </div>

          {/* Grid Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <TreatmentCard
                key={service.id}
                service={service}
                index={index}
                onReservasi={onOpenReservasi}
              />
            ))}
          </div>
          
        </div>
      </section>
    </>
  );
};

export default ServicesSection;