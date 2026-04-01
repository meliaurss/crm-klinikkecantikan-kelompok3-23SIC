import React from 'react';
import { Award, UserPlus, ShieldCheck, Smile, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award strokeWidth={1.5} />,
      title: "Pengalaman Profesional",
      description: "Tim ahli The Rose Clinic memiliki pengalaman bertahun-tahun di bidang estetika dan dermatologi."
    },
    {
      icon: <UserPlus strokeWidth={1.5} />,
      title: "Ribuan Pelanggan Puas",
      description: "Lebih dari 10.000 pelanggan telah merasakan perawatan terbaik kami di seluruh cabang The Rose Clinic."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} />,
      title: "Aman & Terpercaya",
      description: "Produk dan perawatan kami telah bersertifikasi BPOM dan diawasi langsung oleh tenaga medis."
    },
    {
      icon: <Smile strokeWidth={1.5} />,
      title: "Hasil Nyata",
      description: "Perubahan yang terlihat dan dirasakan langsung setelah perawatan secara rutin di The Rose Clinic."
    },
    {
      icon: <CheckCircle strokeWidth={1.5} />,
      title: "Reservasi Mudah",
      description: "Cukup beberapa klik untuk melakukan reservasi, tanpa antre panjang dan ribet."
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .wcu-section {
          background-color: #FCFCFC;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle dot grid */
        .wcu-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #CCD4E1 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
          pointer-events: none;
        }

        /* Section badge */
        .wcu-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f4f6f8;
          border: 1px solid #d0d8e3;
          border-radius: 4px;
          padding: 6px 14px;
          margin-bottom: 20px;
        }

        .wcu-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #293A52;
          flex-shrink: 0;
        }

        .wcu-badge-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #293A52;
        }

        .wcu-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }

        .wcu-title .accent-italic {
          font-style: italic;
          color: #293A52;
        }

        /* Cards */
        .wcu-card {
          background: #FCFCFC;
          border: 1px solid #CCD4E1;
          border-radius: 4px;
          padding: 36px 28px;
          transition: all 0.35s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
          position: relative;
        }

        /* Top accent line on hover */
        .wcu-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #293A52;
          border-radius: 4px 4px 0 0;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .wcu-card:hover::before {
          transform: scaleX(1);
        }

        .wcu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(41, 58, 82, 0.10);
          border-color: #a8b5c7;
        }

        .wcu-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 3px;
          background: #e8ecf1;
          border: 1px solid #d0d8e3;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: #293A52;
          transition: all 0.3s ease;
        }

        .wcu-card:hover .wcu-icon-wrapper {
          background: #293A52;
          color: #FCFCFC;
          border-color: #293A52;
        }

        .wcu-icon-wrapper svg {
          width: 26px;
          height: 26px;
        }

        /* Card divider */
        .wcu-card-divider {
          width: 32px;
          height: 1px;
          background: #CCD4E1;
          margin: 0 auto 16px;
          transition: background 0.3s;
        }

        .wcu-card:hover .wcu-card-divider {
          background: #293A52;
        }

        .wcu-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #020202;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .wcu-card-desc {
          font-size: 13.5px;
          color: #5a6a7e;
          line-height: 1.75;
          font-weight: 300;
        }
      `}</style>

      <section id="why-choose-us" className="wcu-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="wcu-badge"
              style={{ display: 'inline-flex' }}
            >
              <span className="wcu-badge-dot" />
              <span className="wcu-badge-text">Keunggulan Kami</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="wcu-title text-3xl md:text-4xl lg:text-5xl"
            >
              Kenapa Memilih{' '}
              <span className="accent-italic">The Rose Clinic?</span>
            </motion.h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="wcu-card"
              >
                <div className="wcu-icon-wrapper">{feature.icon}</div>
                <h3 className="wcu-card-title">{feature.title}</h3>
                <div className="wcu-card-divider" />
                <p className="wcu-card-desc">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;