import React from 'react';
import { motion } from 'framer-motion';

const AboutUsSection = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Judul & Deskripsi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#181C68] mb-4">
            Tentang Mahacare Clinic
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base">
            Mahacare adalah klinik kecantikan modern yang didedikasikan untuk membantu Anda tampil lebih percaya diri melalui perawatan kulit dan wajah terbaik. Kami mengutamakan keamanan, kenyamanan, dan hasil nyata untuk setiap pelanggan.
          </p>
        </motion.div>

        {/* Visi, Misi, Nilai */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
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
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg text-center border border-indigo-100"
            >
              <h3 className="text-xl font-semibold text-indigo-700 mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.content}</p>
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
            className="bg-white p-6 rounded-2xl shadow-md"
          >
            <h3 className="text-2xl font-bold text-[#181C68] mb-4">Kontak & Lokasi</h3>
            <p className="text-gray-700 mb-2">
              <strong>Alamat:</strong> Jl. Sehat Cantik No. 123, Pekanbaru, Riau
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Telepon:</strong>{' '}
              <a href="tel:+6281234567890" className="text-indigo-600 hover:underline">
                +62 812-3456-7890
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Jam Operasional:</strong><br />
              Senin - Sabtu: 09.00 - 20.00<br />
              Minggu & Libur: Tutup
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-md border border-indigo-100"
          >
            <iframe
              title="Lokasi Mahacare Clinic"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15962.923927076382!2d101.43763949260249!3d0.507067499999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5afefcb77e8c7%3A0x6d47acb4ad9fffd2!2sPekanbaru%2C%20Riau!5e0!3m2!1sen!2sid!4v1718944559301!5m2!1sen!2sid"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
