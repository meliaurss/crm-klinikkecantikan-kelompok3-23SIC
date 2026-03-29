import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { supabase } from '../../supabase'; // pastikan path benar

const FAQSection = () => {
  // 1. Data dummy FAQ klinik estetika
  const dummyFAQs = [
    {
      id: 'dummy-1',
      question: "Apakah konsultasi dokter dikenakan biaya?",
      answer: "Untuk kunjungan pertama dan pengambilan paket treatment tertentu, konsultasi dengan dokter spesialis kami tidak dikenakan biaya (gratis). Namun, untuk konsultasi lanjutan tanpa treatment, akan dikenakan biaya standar klinik."
    },
    {
      id: 'dummy-2',
      question: "Berapa lama waktu downtime setelah perawatan laser?",
      answer: "Downtime bervariasi tergantung jenis laser. Untuk laser pencerah biasanya tidak ada downtime, sedangkan untuk laser resurfacing (bopeng/flek dalam) membutuhkan waktu pemulihan sekitar 3-7 hari dengan sedikit kemerahan ringan."
    },
    {
      id: 'dummy-3',
      question: "Apakah aman melakukan perawatan saat hamil atau menyusui?",
      answer: "Sebagian besar facial dan treatment ringan aman untuk ibu hamil dan menyusui. Namun, tindakan injeksi (seperti Botox/Filler) dan beberapa jenis laser tidak disarankan. Konsultasikan dengan dokter kami untuk mendapatkan opsi yang paling aman."
    },
    {
      id: 'dummy-4',
      question: "Apakah saya harus melakukan reservasi sebelum datang?",
      answer: "Sangat disarankan untuk melakukan reservasi (booking) maksimal H-1 agar kami dapat memastikan ketersediaan dokter dan terapis, serta meminimalkan waktu tunggu Anda di klinik."
    }
  ];

  // 2. Masukkan data dummy sebagai state awal
  const [faqs, setFaqs] = useState(dummyFAQs);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchVisibleFAQs();
  }, []);

  const fetchVisibleFAQs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_visible", true)
      .order("created_at", { ascending: false });

    // 3. Timpa data dummy JIKA data Supabase berhasil ditarik dan tidak kosong
    if (!error && data && data.length > 0) {
      setFaqs(data);
    }
  };

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <style>{`
        .faq-section {
          background-color: #FAF6F1; /* Latar krem agar menyatu dengan Promo */
          font-family: 'Jost', sans-serif;
        }

        .faq-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          letter-spacing: -0.5px;
        }

        .faq-card {
          background: #FFFFFF;
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-left: 4px solid #C9A96E; /* Aksen garis kiri emas */
          transition: all 0.3s ease;
        }

        .faq-card:hover {
          border-color: rgba(201, 169, 110, 0.4);
          box-shadow: 0 10px 25px rgba(44, 26, 14, 0.04);
        }

        .faq-question {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          font-weight: 700;
        }

        .faq-answer {
          color: #6B4F3A;
          font-weight: 300;
          line-height: 1.6;
        }
      `}</style>

      {/* STRUKTUR ASLI DIMULAI DARI SINI */}
      <section id="faq" className="faq-section py-20 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12 faq-title"
          >
            Pertanyaan Umum
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="faq-card rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <h3 className="faq-question text-lg md:text-xl pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-6 h-6 text-[#C9A96E] transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 text-base faq-answer"
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