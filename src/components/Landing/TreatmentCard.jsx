import React from 'react';
import { motion } from 'framer-motion';

const TreatmentCard = ({ service, index, onReservasi }) => {
  return (
    <>
      <style>{`
        /* Card Styling */
        .service-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(44, 26, 14, 0.03);
          transition: all 0.4s ease;
          height: 100%;
        }

        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(44, 26, 14, 0.08);
          border-color: rgba(201, 169, 110, 0.5);
        }

        /* Image Wrapper & Efek Hover */
        .card-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .service-card:hover .card-image {
          transform: scale(1.05);
        }

        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(44,26,14,0.4) 0%, transparent 50%);
          pointer-events: none;
        }

        /* Card Content */
        .card-content {
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 700;
          color: #2C1A0E;
          margin-bottom: 12px;
        }

        .card-desc {
          font-size: 14px;
          color: #6B4F3A;
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 24px;
          flex: 1;
        }

        /* Garis Pemisah Tipis */
        .card-divider {
          width: 40px;
          height: 1px;
          background: #C9A96E;
          margin: 0 auto 20px auto;
        }

        /* Tombol Outline Mewah */
        .btn-card-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #7B4A2D;
          border: 1px solid rgba(160, 98, 58, 0.4);
          padding: 12px 24px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .btn-card-outline:hover {
          background: linear-gradient(135deg, #4A2C17, #7B4A2D);
          color: #E2C99A;
          border-color: transparent;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="service-card"
      >
        <div className="card-image-wrapper">
          <img
            src={service.image}
            alt={service.name}
            className="card-image"
          />
          <div className="card-image-overlay" />
        </div>
        
        <div className="card-content">
          <h3 className="card-title">{service.name}</h3>
          <div className="card-divider" />
          <p className="card-desc">{service.description}</p>
          
          <button
            onClick={onReservasi}
            className="btn-card-outline"
          >
            Reservasi Sekarang <span>→</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default TreatmentCard;