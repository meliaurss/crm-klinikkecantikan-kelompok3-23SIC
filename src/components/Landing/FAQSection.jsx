import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Apa itu Mahacare?",
    answer: "Mahacare adalah klinik kecantikan yang menyediakan berbagai layanan perawatan kulit, wajah, dan tubuh dengan teknologi modern."
  },
  {
    question: "Apakah perlu reservasi sebelum datang?",
    answer: "Kami menyarankan reservasi terlebih dahulu agar kamu mendapatkan jadwal yang pasti dan tidak menunggu lama di klinik."
  },
  {
    question: "Apakah Mahacare menerima pembayaran non-tunai?",
    answer: "Ya, kami menerima pembayaran via GoPay, DANA, ShopeePay, serta transfer bank."
  },
  {
    question: "Apakah konsultasi dokter dikenakan biaya?",
    answer: "Konsultasi awal di Mahacare adalah GRATIS, terutama untuk pelanggan baru."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-20 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-[#181C68] mb-8"
        >
          Pertanyaan Umum
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left"
              >
                <h3 className="font-semibold text-[#181C68] text-base md:text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-sm text-gray-600"
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
  );
};

export default FAQSection;
