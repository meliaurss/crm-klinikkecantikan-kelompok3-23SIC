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
    <>
      <style>{`
        .products-section {
          background-color: #FFFFFF; /* Putih bersih */
          font-family: 'Jost', sans-serif;
          position: relative;
        }

        .luxury-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(201,169,110,0.15), rgba(184,184,184,0.12));
          border: 1px solid rgba(201,169,110,0.4);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 20px;
        }

        .luxury-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C9A96E;
        }

        .luxury-badge-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #7B4A2D;
        }

        .products-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .products-title .accent-italic {
          font-style: italic;
          color: #7B4A2D;
        }

        /* Styling untuk Kartu Produk di dalam Map */
        .product-card {
          background: #FAF6F1; /* Latar kartu sedikit krem agar kontras dengan background putih */
          border-radius: 24px;
          border: 1px solid rgba(201, 169, 110, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(44, 26, 14, 0.02);
          transition: all 0.4s ease;
          height: 100%;
          max-width: 380px;
          margin: 0 auto;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(44, 26, 14, 0.06);
          border-color: rgba(201, 169, 110, 0.4);
        }

        .product-image-wrapper {
          position: relative;
          height: 260px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .product-content {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: left;
        }

        .product-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #2C1A0E;
          margin-bottom: 8px;
        }

        .product-desc {
          font-size: 14px;
          color: #6B4F3A;
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 24px;
          flex: 1;
        }

        .product-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-top: 1px solid rgba(201, 169, 110, 0.2);
          padding-top: 20px;
          margin-top: auto;
        }

        .price-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #A0623A;
          margin-bottom: 4px;
        }

        .product-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #2C1A0E;
        }

        .btn-solid-luxury {
          background: linear-gradient(135deg, #7B4A2D, #4A2C17);
          color: #E2C99A;
          padding: 10px 20px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn-solid-luxury:hover {
          background: linear-gradient(135deg, #8A5636, #5A351C);
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(123, 74, 45, 0.2);
        }
      `}</style>

      <section id="products" className="products-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="luxury-badge"
            >
              <span className="luxury-badge-dot" />
              <span className="luxury-badge-text">Skincare Eksklusif</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="products-title text-3xl md:text-4xl lg:text-5xl mb-6"
            >
              Produk <span className="accent-italic">Unggulan</span> Bahebak
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#6B4F3A] max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed"
            >
              Temukan solusi perawatan kulit terbaik. Produk kami terbuat dari bahan premium berkualitas tinggi dan telah teruji secara klinis untuk hasil yang optimal.
            </motion.p>
          </div>

          {/* Grid Products */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="product-card"
                >
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />
                  </div>
                  
                  <div className="product-content">
                    <div>
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>
                    </div>

                    <div className="product-footer">
                      <div>
                        <div className="price-label">Harga Spesial</div>
                        <div className="product-price">{formatCurrency(product.price)}</div>
                      </div>
                      <button
                        onClick={onOpenReservasi}
                        className="btn-solid-luxury"
                      >
                        Beli <span>→</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-[#A0623A] font-light">
                Koleksi produk sedang dipersiapkan.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;