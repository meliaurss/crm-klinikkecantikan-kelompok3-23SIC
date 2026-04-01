import React from 'react';
import { motion } from 'framer-motion';

const formatCurrency = (price) => {
  if (typeof price !== 'number') return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductsSection = ({ products = [], onOpenReservasi }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .products-section {
          background-color: #FCFCFC;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }

        .products-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f4f6f8;
          border: 1px solid #d0d8e3;
          border-radius: 4px;
          padding: 6px 14px;
          margin-bottom: 20px;
        }

        .products-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #293A52;
          flex-shrink: 0;
        }

        .products-badge-text {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #293A52;
        }

        .products-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
          line-height: 1.15;
        }

        .products-title .accent-italic {
          font-style: italic;
          color: #293A52;
        }

        .products-sub {
          color: #5a6a7e;
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          max-width: 560px;
          margin: 0 auto;
        }

        /* Product cards */
        .product-card {
          background: #FCFCFC;
          border-radius: 3px;
          border: 1px solid #CCD4E1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.35s ease;
          height: 100%;
          max-width: 380px;
          margin: 0 auto;
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(41, 58, 82, 0.10);
          border-color: #a8b5c7;
        }

        .product-image-wrapper {
          position: relative;
          height: 260px;
          overflow: hidden;
          background: #e8ecf1;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.06);
        }

        .product-content {
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .product-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #020202;
          margin-bottom: 6px;
        }

        .product-divider {
          width: 32px;
          height: 1px;
          background: #CCD4E1;
          margin-bottom: 12px;
        }

        .product-desc {
          font-size: 13.5px;
          color: #5a6a7e;
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 24px;
          flex: 1;
        }

        .product-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-top: 1px solid #e3e8f0;
          padding-top: 18px;
          margin-top: auto;
        }

        .price-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #a8b5c7;
          margin-bottom: 4px;
          font-weight: 400;
        }

        .product-price {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          color: #293A52;
        }

        .btn-buy {
          background: #293A52;
          color: #FCFCFC;
          padding: 10px 18px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          transition: background 0.25s ease;
          border: none;
          cursor: pointer;
        }

        .btn-buy:hover {
          background: #344a66;
        }
      `}</style>

      <section id="products" className="products-section py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'inline-flex' }}
              className="products-badge"
            >
              <span className="products-badge-dot" />
              <span className="products-badge-text">Skincare Eksklusif</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="products-title text-3xl md:text-4xl lg:text-5xl mb-5"
            >
              Produk <span className="accent-italic">Unggulan</span> Kami
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="products-sub"
            >
              Temukan solusi perawatan kulit terbaik. Produk kami terbuat dari bahan premium
              berkualitas tinggi dan telah teruji secara klinis untuk hasil yang optimal.
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="product-card"
                >
                  <div className="product-image-wrapper">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>

                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-divider" />
                    <p className="product-desc">{product.description}</p>

                    <div className="product-footer">
                      <div>
                        <div className="price-label">Harga Spesial</div>
                        <div className="product-price">{formatCurrency(product.price)}</div>
                      </div>
                      <button onClick={onOpenReservasi} className="btn-buy">
                        Beli →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full" style={{ color: '#5a6a7e', fontWeight: 300 }}>
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