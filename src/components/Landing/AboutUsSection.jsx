import React from 'react';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <>
      <style>{`
        /* Latar belakang putih bersih agar berselang-seling cantik dengan section sebelumnya */
        .about-section {
          background-color: #FFFFFF;
          font-family: 'Jost', sans-serif;
        }

        .about-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          letter-spacing: -0.5px;
        }

        .about-desc {
          color: #6B4F3A;
          font-weight: 300;
          line-height: 1.7;
        }

        /* Styling untuk kartu Visi, Misi, Nilai */
        .about-card {
          background: #FAF6F1;
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-top: 4px solid #C9A96E; /* Aksen emas di atas */
          transition: all 0.4s ease;
        }

        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(44, 26, 14, 0.05);
          border-color: rgba(201, 169, 110, 0.5);
        }

        .about-card-title {
          font-family: 'Cormorant Garamond', serif;
          color: #7B4A2D;
          font-weight: 700;
        }

        /* Styling untuk kartu Kontak */
        .contact-card {
          background: #FAF6F1;
          border: 1px solid rgba(201, 169, 110, 0.2);
        }

        .contact-link {
          color: #A0623A;
          font-weight: 500;
          transition: color 0.3s;
        }

        .contact-link:hover {
          color: #C9A96E;
          text-decoration: none;
        }
      `}</style>

      <section id="about" className="about-section py-20 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Judul & Deskripsi */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 about-title">
              Tentang Bahebak Clinic 
            </h2>
            <p className="max-w-3xl mx-auto text-base md:text-lg about-desc">
              Bahebak Clinic adalah klinik kecantikan modern yang didedikasikan untuk membantu Anda tampil lebih percaya diri melalui perawatan kulit dan wajah terbaik. Kami mengutamakan keamanan, kenyamanan, dan hasil nyata untuk setiap pelanggan.
            </p>
          </motion.div>

          {/* Visi, Misi, Nilai */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "Visi",
                content: "Menjadi klinik kecantikan terpercaya dan terdepan di Indonesia yang mengedepankan hasil nyata dan pelayanan maksimal."
              },
              {
                title: "Misi",
                content: "Memberikan pelayanan personal dengan teknologi terkini untuk mendukung kesehatan dan kecantikan kulit Anda."
              },
              {
                title: "Nilai",
                content: "Profesionalisme, kepercayaan, kenyamanan, dan inovasi dalam setiap tindakan dan pelayanan."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="about-card p-8 rounded-2xl shadow-sm text-center"
              >
                <h3 className="text-2xl mb-4 about-card-title">{item.title}</h3>
                <p className="text-sm md:text-base about-desc">{item.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Kontak & Lokasi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-card p-8 rounded-2xl shadow-sm"
            >
              <h3 className="text-3xl mb-6 about-title">Kontak & Lokasi</h3>
              <div className="space-y-4 about-desc">
                <p>
                  <strong className="text-[#2C1A0E] font-medium">Alamat:</strong><br/>
                  Jl. Sehat Cantik No. 123, Pekanbaru, Riau
                </p>
                <p>
                  <strong className="text-[#2C1A0E] font-medium">Telepon:</strong><br/>
                  <a href="tel:+6281234567890" className="contact-link">
                    +62 812-3456-7890
                  </a>
                </p>
                <p>
                  <strong className="text-[#2C1A0E] font-medium">Jam Operasional:</strong><br />
                  Senin - Sabtu: 09.00 - 20.00 WIB<br />
                  Minggu & Libur: Tutup
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-sm border border-[rgba(201,169,110,0.3)] bg-gray-100"
            >
              <iframe
                title="Lokasi Bahebak Clinic"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15962.923927076382!2d101.43763949260249!3d0.507067499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afefcb77e8c7%3A0x6d47acb4ad9fffd2!2sPekanbaru%2C%20Riau!5e0!3m2!1sen!2sid!4v1718944559301!5m2!1sen!2sid"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;