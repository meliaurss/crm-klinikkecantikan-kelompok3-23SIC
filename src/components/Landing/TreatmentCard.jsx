import React from 'react';
import { motion } from 'framer-motion';

const TreatmentCard = ({ service, index, onReservasi }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700&family=DM+Sans:wght@300;400;500&display=swap');

        .service-card {
          background: #FCFCFC;
          border-radius: 3px;
          border: 1px solid #CCD4E1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.35s ease;
          height: 100%;
          position: relative;
        }

        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 44px rgba(41, 58, 82, 0.12);
          border-color: #a8b5c7;
        }

        .card-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #e8ecf1;
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

        /* Gradient overlay on image */
        .card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(41, 58, 82, 0.35) 0%, transparent 55%);
          pointer-events: none;
        }

        /* Tag on image */
        .card-image-tag {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(252, 252, 252, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid #CCD4E1;
          border-radius: 3px;
          padding: 4px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #293A52;
        }

        .card-content {
          padding: 28px 24px 24px;
          text-align: left;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #020202;
          margin-bottom: 10px;
          line-height: 1.2;
        }

        .card-divider {
          width: 32px;
          height: 1px;
          background: #CCD4E1;
          margin-bottom: 14px;
          transition: background 0.3s;
        }

        .service-card:hover .card-divider {
          background: #293A52;
          width: 48px;
        }

        .card-desc {
          font-size: 13.5px;
          color: #5a6a7e;
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 24px;
          flex: 1;
        }

        .btn-card {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: #293A52;
          border: 1px solid #CCD4E1;
          padding: 11px 20px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          transition: all 0.25s ease;
        }

        .btn-card:hover {
          background: #293A52;
          color: #FCFCFC;
          border-color: #293A52;
        }

        .btn-card-arrow {
          font-size: 14px;
          transition: transform 0.2s ease;
        }

        .btn-card:hover .btn-card-arrow {
          transform: translateX(4px);
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="service-card"
      >
        <div className="card-image-wrapper">
          <img src={service.image} alt={service.name} className="card-image" />
          <div className="card-image-overlay" />
          <div className="card-image-tag">Treatment</div>
        </div>

        <div className="card-content">
          <h3 className="card-title">{service.name}</h3>
          <div className="card-divider" />
          <p className="card-desc">{service.description}</p>

          <button onClick={onReservasi} className="btn-card">
            Reservasi Sekarang
            <span className="btn-card-arrow">→</span>
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default TreatmentCard;