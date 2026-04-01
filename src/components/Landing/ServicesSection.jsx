import React from 'react';
import { motion } from 'framer-motion';
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .services-section {
          background-color: #f4f6f8;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .services-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FCFCFC;
          border: 1px solid #CCD4E1;
          border-radius: 4px;
          padding: 6px 14px;
          margin-bottom: 20px;
        }

        .services-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #293A52;
          flex-shrink: 0;
        }

        .services-badge-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #293A52;
        }

        .services-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }

        .services-title .accent-italic {
          font-style: italic;
          color: #293A52;
        }

        .services-sub {
          color: #5a6a7e;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          max-width: 560px;
          margin: 0 auto;
        }
      `}</style>

      <section id="services" className="services-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'inline-flex' }}
              className="services-badge"
            >
              <span className="services-badge-dot" />
              <span className="services-badge-text">Layanan Premium</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="services-title text-3xl md:text-4xl lg:text-5xl mb-5"
            >
              Treatment <span className="accent-italic">Unggulan</span> Kami
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="services-sub"
            >
              The Rose Clinic menghadirkan berbagai layanan perawatan kulit dan wajah yang aman,
              modern, dan terbukti memberikan hasil terbaik untuk memancarkan kecantikan alami Anda.
            </motion.p>
          </div>

          {/* Grid */}
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