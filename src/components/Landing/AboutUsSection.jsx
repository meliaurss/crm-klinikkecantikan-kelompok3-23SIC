import React from 'react';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700&family=DM+Sans:wght@300;400;500&display=swap');

        .about-section {
          background-color: #f4f6f8;
          font-family: 'DM Sans', sans-serif;
        }

        .about-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
        }

        .about-desc {
          color: #5a6a7e;
          font-weight: 300;
          line-height: 1.8;
        }

        .about-card {
          background: #FCFCFC;
          border: 1px solid #CCD4E1;
          border-top: 3px solid #293A52;
          border-radius: 3px;
          transition: all 0.35s ease;
        }

        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(41, 58, 82, 0.09);
          border-color: #a8b5c7;
          border-top-color: #293A52;
        }

        .about-card-title {
          font-family: 'Playfair Display', serif;
          color: #293A52;
          font-weight: 500;
        }

        .contact-card {
          background: #FCFCFC;
          border: 1px solid #CCD4E1;
          border-radius: 3px;
        }

        .contact-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #a8b5c7;
          margin-bottom: 4px;
          display: block;
        }

        .contact-value {
          color: #293A52;
          font-weight: 400;
        }

        .contact-link {
          color: #293A52;
          font-weight: 400;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contact-link:hover {
          color: #344a66;
          text-decoration: underline;
        }

        .about-divider {
          width: 40px;
          height: 1px;
          background: #CCD4E1;
          margin: 12px 0;
        }
      `}</style>

      <section id="about" className="about-section py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-5 about-title">
              Tentang The Rose Clinic
            </h2>
            <div className="about-divider" style={{ margin: '0 auto 20px' }} />
            <p className="max-w-3xl mx-auto text-base md:text-lg about-desc">
              The Rose Clinic adalah klinik kecantikan modern yang didedikasikan untuk membantu
              Anda tampil lebih percaya diri melalui perawatan kulit dan wajah terbaik. Kami
              mengutamakan keamanan, kenyamanan, dan hasil nyata untuk setiap pelanggan.
            </p>
          </motion.div>

          {/* Visi, Misi, Nilai */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Visi", content: "Menjadi klinik kecantikan terpercaya dan terdepan di Indonesia yang mengedepankan hasil nyata dan pelayanan maksimal." },
              { title: "Misi", content: "Memberikan pelayanan personal dengan teknologi terkini untuk mendukung kesehatan dan kecantikan kulit Anda." },
              { title: "Nilai", content: "Profesionalisme, kepercayaan, kenyamanan, dan inovasi dalam setiap tindakan dan pelayanan." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="about-card p-8 text-center"
              >
                <h3 className="text-2xl mb-3 about-card-title">{item.title}</h3>
                <div className="about-divider" style={{ margin: '0 auto 12px' }} />
                <p className="text-sm md:text-base about-desc">{item.content}</p>
              </motion.div>
            ))}
          </div>

          {/* Kontak & Peta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="contact-card p-8"
            >
              <h3 className="text-2xl mb-6 about-title">Kontak &amp; Lokasi</h3>
              <div className="space-y-5 about-desc">
                <div>
                  <span className="contact-label">Alamat</span>
                  <p className="contact-value">Jl. Sehat Cantik No. 123, Pekanbaru, Riau</p>
                </div>
                <div>
                  <span className="contact-label">Telepon</span>
                  <a href="tel:+6281234567890" className="contact-link">
                    +62 812-3456-7890
                  </a>
                </div>
                <div>
                  <span className="contact-label">Jam Operasional</span>
                  <p className="contact-value">
                    Senin – Sabtu: 09.00 – 20.00 WIB<br />
                    Minggu &amp; Libur: Tutup
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                borderRadius: '3px',
                overflow: 'hidden',
                border: '1px solid #CCD4E1',
              }}
            >
              <iframe
                title="Lokasi The Rose Clinic"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15962.923927076382!2d101.43763949260249!3d0.507067499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afefcb77e8c7%3A0x6d47acb4ad9fffd2!2sPekanbaru%2C%20Riau!5e0!3m2!1sen!2sid!4v1718944559301!5m2!1sen!2sid"
                width="100%"
                height="350"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsSection;