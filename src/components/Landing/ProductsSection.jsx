import React from 'react';
import { motion } from 'framer-motion';
import acnecleanser from '../../assets/acnecleanser.png';
import hydraserum from '../../assets/hydraserum.png';
import moisturizer from '../../assets/moisturizer.png';

const products = [
  {
    id: 1,
    name: 'Acne Cleanser',
    description:
      'Pembersih wajah lembut yang diformulasikan khusus untuk kulit berjerawat. Membantu mengangkat minyak berlebih tanpa membuat kulit kering.',
    image: acnecleanser,
  },
  {
    id: 2,
    name: 'Hydrating Serum',
    description:
      'Serum ringan dengan kandungan hyaluronic acid untuk menjaga kelembapan kulit sepanjang hari dan memberi efek segar alami.',
    image: hydraserum,
  },
  {
    id: 3,
    name: 'Daily Moisturizer',
    description:
      'Krim pelembap yang cepat meresap, cocok untuk semua jenis kulit. Menjaga kulit tetap lembut dan sehat setiap hari.',
    image: moisturizer,
  },
];

const ProductsSection = ({ onOpenReservasi }) => {
  return (
    <section
      id="products"
      className="py-20 px-4 md:px-12"
    >
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-[#181C68] mb-4"
        >
          Produk Unggulan Mahacare
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base"
        >
          Temukan solusi perawatan kulit terbaik dari Mahacare. Produk kami terbuat dari bahan berkualitas dan telah teruji secara dermatologis.
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden flex flex-col transition-all transform hover:scale-[1.02] max-w-sm mx-auto"
          >
            <div className="overflow-hidden h-[250px]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl font-semibold text-[#181C68] mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              <button
                onClick={onOpenReservasi}
                className="mt-6 bg-gradient-to-r from-[#4f46e5] to-[#60a5fa] text-white py-2 rounded-full hover:brightness-110 hover:scale-105 transition-all font-medium"
              >
                Beli Sekarang
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
