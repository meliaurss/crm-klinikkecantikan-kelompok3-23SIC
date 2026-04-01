import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../../supabase';

const FAQSection = () => {
  const dummyFAQs = [
    { id: 'dummy-1', question: "Apakah konsultasi dokter dikenakan biaya?", answer: "Untuk kunjungan pertama dan pengambilan paket treatment tertentu, konsultasi dengan dokter spesialis kami tidak dikenakan biaya (gratis). Namun, untuk konsultasi lanjutan tanpa treatment, akan dikenakan biaya standar klinik." },
    { id: 'dummy-2', question: "Berapa lama waktu downtime setelah perawatan laser?", answer: "Downtime bervariasi tergantung jenis laser. Untuk laser pencerah biasanya tidak ada downtime, sedangkan untuk laser resurfacing membutuhkan waktu pemulihan sekitar 3-7 hari dengan sedikit kemerahan ringan." },
    { id: 'dummy-3', question: "Apakah aman melakukan perawatan saat hamil atau menyusui?", answer: "Sebagian besar facial dan treatment ringan aman untuk ibu hamil dan menyusui. Namun, tindakan injeksi dan beberapa jenis laser tidak disarankan. Konsultasikan dengan dokter kami untuk mendapatkan opsi yang paling aman." },
    { id: 'dummy-4', question: "Apakah saya harus melakukan reservasi sebelum datang?", answer: "Sangat disarankan untuk melakukan reservasi maksimal H-1 agar kami dapat memastikan ketersediaan dokter dan terapis, serta meminimalkan waktu tunggu Anda di klinik." },
  ];

  const [faqs, setFaqs] = useState(dummyFAQs);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('faqs').select('*').eq('is_visible', true).order('created_at', { ascending: false });
      if (!error && data && data.length > 0) setFaqs(data);
    };
    fetch();
  }, []);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700&family=DM+Sans:wght@300;400;500&display=swap');

        .faq-section {
          background-color: #FCFCFC;
          font-family: 'DM Sans', sans-serif;
        }

        .faq-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
        }

        .faq-card {
          background: #FCFCFC;
          border: 1px solid #CCD4E1;
          border-left: 3px solid #293A52;
          border-radius: 3px;
          transition: all 0.25s ease;
          overflow: hidden;
        }

        .faq-card:hover {
          border-color: #a8b5c7;
          border-left-color: #293A52;
          box-shadow: 0 8px 24px rgba(41, 58, 82, 0.07);
        }

        .faq-btn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          gap: 16px;
        }

        .faq-question {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 500;
          color: #020202;
          line-height: 1.3;
          flex: 1;
        }

        .faq-chevron {
          width: 20px;
          height: 20px;
          color: #293A52;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .faq-chevron.open {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 24px 20px;
          font-size: 14px;
          color: #5a6a7e;
          font-weight: 300;
          line-height: 1.75;
        }
      `}</style>

      <section id="faq" className="faq-section py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl faq-title">Pertanyaan Umum</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="faq-card"
              >
                <button className="faq-btn" onClick={() => toggle(index)}>
                  <h3 className="faq-question">{faq.question}</h3>
                  <ChevronDown className={`faq-chevron ${openIndex === index ? 'open' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="faq-answer"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;