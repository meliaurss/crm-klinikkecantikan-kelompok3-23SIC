import React from 'react';
import { motion } from 'framer-motion';

// Fungsi bantu format harga ke Rupiah
const formatCurrency = (price) => {
  if (typeof price !== 'number') return 'Rp 0';
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductsSection = ({ products = [], onOpenReservasi }) => {
  return (
    <section id="products" className="py-20 px-4 md:px-12">
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
        {products.length > 0 ? (
          products.map((product, index) => (
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
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h3 className="text-xl font-semibold text-[#181C68] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4">
                  <div>
                    <p className="text-gray-500 text-xs font-medium uppercase">Harga</p>
                    <p className="text-2xl font-bold text-[#181C68] mt-1">
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <button
                    onClick={onOpenReservasi}
                    className="bg-gradient-to-r from-[#4f46e5] to-[#60a5fa] text-white py-2 px-6 rounded-full hover:brightness-110 hover:scale-105 transition-all font-medium text-sm"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Belum ada produk yang ditampilkan.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
