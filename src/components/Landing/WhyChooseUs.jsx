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
  // Menghapus class warna Tailwind dari dalam icon agar bisa di-style dari wrapper
  const features = [
    {
      icon: <Award strokeWidth={1.5} />,
      title: "Pengalaman Profesional",
      description: "Tim ahli Bahebak Clinic memiliki pengalaman bertahun-tahun di bidang estetika dan dermatologi."
    },
    {
      icon: <UserPlus strokeWidth={1.5} />,
      title: "Ribuan Pelanggan Puas",
      description: "Lebih dari 10.000 pelanggan telah merasakan perawatan terbaik kami di seluruh cabang Bahebak Clinic."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} />,
      title: "Aman & Terpercaya",
      description: "Produk dan perawatan kami telah bersertifikasi BPOM dan diawasi langsung oleh tenaga medis."
    },
    {
      icon: <Smile strokeWidth={1.5} />,
      title: "Hasil Nyata",
      description: "Perubahan yang terlihat dan dirasakan langsung setelah perawatan secara rutin di Bahebak Clinic."
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
        .wcu-section {
          background-color: #FFFFFF; /* Latar belakang putih sesuai permintaan */
          font-family: 'Jost', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .wcu-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E; /* --brown-deep */
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .wcu-title .accent-italic {
          font-style: italic;
          color: #7B4A2D; /* --brown-warm */
        }

        .wcu-card {
          background: #FFFFFF;
          border: 1px solid rgba(201, 169, 110, 0.25); /* Aksen gold tipis */
          border-radius: 24px;
          padding: 32px 24px;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(44, 26, 14, 0.04); /* Shadow coklat sangat tipis */
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: 100%;
        }

        .wcu-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(44, 26, 14, 0.08);
          border-color: rgba(201, 169, 110, 0.5);
        }

        /* Lingkaran pembungkus ikon yang mewah */
        .wcu-icon-wrapper {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(201,169,110,0.15), rgba(184,184,184,0.12));
          border: 1px solid rgba(201,169,110,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          color: #7B4A2D; /* --brown-warm */
          transition: all 0.3s ease;
        }

        .wcu-card:hover .wcu-icon-wrapper {
          background: linear-gradient(135deg, rgba(201,169,110,0.25), rgba(184,184,184,0.15));
          color: #4A2C17; /* --brown-rich */
          transform: scale(1.05);
        }

        .wcu-icon-wrapper svg {
          width: 32px;
          height: 32px;
        }

        .wcu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #2C1A0E;
          margin-bottom: 12px;
          line-height: 1.2;
        }

        .wcu-card-desc {
          font-size: 14px;
          color: #6B4F3A;
          line-height: 1.7;
          font-weight: 300;
        }
      `}</style>

      <section id="why-choose-us" className="wcu-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[rgba(201,169,110,0.3)] bg-[rgba(201,169,110,0.05)] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]"></span>
              <span className="text-[10px] uppercase tracking-[2px] text-[#7B4A2D] font-medium">Keunggulan Kami</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="wcu-title text-3xl md:text-4xl lg:text-5xl"
            >
              Kenapa Memilih <br className="md:hidden" />
              <span className="accent-italic">Bahebak Clinic?</span>
            </motion.h2>
          </div>

          {/* Grid Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="wcu-card"
              >
                <div className="wcu-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="wcu-card-title">{feature.title}</h3>
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