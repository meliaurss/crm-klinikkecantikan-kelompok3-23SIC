import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { motion } from 'framer-motion';

// --- Komponen Bintang ---
const StarDisplay = ({ rating }) => {
  if (rating === null || rating === undefined || rating === 0) {
    return <span className="feedback-no-rating">Belum ada rating</span>;
  }
  return (
    <div className="feedback-stars" aria-label={`Rating: ${rating} dari 5 bintang`}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`feedback-star ${index < rating ? 'active' : ''}`}
          aria-hidden="true"
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

// --- Data Dummy ---
const dummyFeedbacks = [
  {
    id: 'feedback-1',
    feedback_text: 'Pelayanan dokter sangat ramah dan informatif. Klinik juga bersih!',
    doctor_rating: 5,
    service_rating: 5,
    place_rating: 4,
    product_rating: null,
    is_approved: true,
    created_at: '2025-07-10T10:00:00Z',
    treatment: 'Facial Whitening',
    users: { name: 'Customer The Rose Clinic', email: 'customer@example.com' }
  },
  {
    id: 'feedback-2',
    feedback_text: 'Produk yang direkomendasikan sangat cocok untuk kulit saya. Terima kasih!',
    doctor_rating: 4,
    service_rating: 4,
    place_rating: 5,
    product_rating: 5,
    is_approved: true,
    created_at: '2025-07-08T14:30:00Z',
    treatment: 'Acne Treatment',
    users: { name: 'Sarah Konami', email: 'sarah@example.com' }
  },
  {
    id: 'feedback-3',
    feedback_text: 'Antrian agak panjang, tapi hasilnya memuaskan.',
    doctor_rating: 4,
    service_rating: 3,
    place_rating: 3,
    product_rating: null,
    is_approved: true,
    created_at: '2025-07-05T09:15:00Z',
    treatment: 'Laser Rejuvenation',
    users: { name: 'Budi Santoso', email: 'budi@example.com' }
  }
];

// --- Komponen Utama ---
export default function CustomerFeedbackDisplay() {
  const approvedFeedbacks = dummyFeedbacks.filter(fb => fb.is_approved);

  return (
    <>
      <style>{`
        /* Mengambil variabel warna yang sama dengan HeroSection jika belum ada di global scope */
        :root {
          --primary:      #293A52;
          --primary-90:   #344a66;
          --primary-70:   #4a6a94;
          --primary-20:   #d0d8e3;
          --primary-10:   #e8ecf1;
          --primary-05:   #f4f6f8;
          --secondary:    #CCD4E1;
          --sec-dark:     #a8b5c7;
          --sec-light:    #e3e8f0;
          --white:        #FCFCFC;
          --black:        #020202;
          --gray-text:    #5a6a7e;
        }

        .feedback-section {
          position: relative;
          background-color: var(--white);
          padding: 88px 36px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── Background: fine dot-grid texture ── */
        .feedback-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--secondary) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Blushes (Soft Glow) ── */
        .feedback-blush-tr {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(41, 58, 82, 0.05) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        .feedback-blush-bl {
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(204, 212, 225, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Container ── */
        .feedback-container {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: 0 auto;
        }

        /* ── Header Section ── */
        .feedback-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .feedback-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--white);
          border: 1px solid var(--secondary);
          border-radius: 4px;
          padding: 6px 16px;
          margin-bottom: 20px;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gray-text);
          box-shadow: 0 1px 6px rgba(41, 58, 82, 0.05);
        }

        .feedback-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 500;
          color: var(--black);
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .feedback-title i {
          color: var(--primary);
          font-style: italic;
        }

        .feedback-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .feedback-divider-line {
          width: 40px;
          height: 1px;
          background: var(--secondary);
        }

        .feedback-divider-icon {
          font-size: 12px;
          color: var(--secondary);
        }

        /* ── Grid Cards ── */
        .feedback-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .feedback-card {
          background: rgba(252, 252, 252, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid var(--sec-light);
          border-radius: 4px;
          padding: 28px;
          box-shadow: 0 4px 20px rgba(41, 58, 82, 0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .feedback-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(41, 58, 82, 0.08);
          border-color: var(--secondary);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }

        .customer-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 500;
          color: var(--primary);
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .feedback-date {
          font-size: 11px;
          color: var(--sec-dark);
          letter-spacing: 0.5px;
        }

        /* ── Treatment Ribbon (Meniru Promo Ribbon) ── */
        .treatment-ribbon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-05);
          border: 1px solid var(--primary-20);
          border-radius: 3px;
          padding: 3px 10px;
          font-size: 11px;
          font-weight: 500;
          color: var(--primary-70);
          margin-bottom: 20px;
          align-self: flex-start;
        }

        .treatment-ribbon .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--primary-70);
        }

        /* ── Review Text ── */
        .review-text {
          font-size: 14px;
          line-height: 1.7;
          color: var(--gray-text);
          font-style: italic;
          margin-bottom: 24px;
          flex-grow: 1;
        }

        /* ── Ratings Breakdown ── */
        .ratings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid var(--sec-light);
        }

        .rating-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .rating-label {
          font-size: 10px;
          font-weight: 500;
          color: var(--sec-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* ── Stars ── */
        .feedback-stars {
          display: flex;
          gap: 2px;
        }

        .feedback-star {
          font-size: 14px;
          color: var(--sec-light);
          line-height: 1;
        }

        .feedback-star.active {
          color: var(--primary);
        }

        .feedback-no-rating {
          font-size: 11px;
          font-style: italic;
          color: var(--sec-dark);
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--sec-dark);
          font-size: 14px;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .feedback-section { padding: 60px 20px; }
          .ratings-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="feedback-section">
        <div className="feedback-blush-tr" />
        <div className="feedback-blush-bl" />

        <div className="feedback-container">
          <motion.div
            className="feedback-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="feedback-badge">Testimonial</div>
            <h2 className="feedback-title">
              Apa Kata <i>Mereka</i>
            </h2>
            <div className="feedback-divider">
              <div className="feedback-divider-line" />
              <span className="feedback-divider-icon">✦</span>
              <div className="feedback-divider-line" />
            </div>
          </motion.div>

          {approvedFeedbacks.length === 0 ? (
            <div className="empty-state">
              Belum ada ulasan pelanggan yang ditampilkan saat ini.
            </div>
          ) : (
            <div className="feedback-grid">
              {approvedFeedbacks.map((fb, index) => (
                <motion.div
                  key={fb.id}
                  className="feedback-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="card-header">
                    <div>
                      <h3 className="customer-name">
                        {fb.users?.name || fb.users?.email || 'Anonim'}
                      </h3>
                      <span className="feedback-date">
                        {format(new Date(fb.created_at), 'dd MMMM yyyy', { locale: id })}
                      </span>
                    </div>
                  </div>

                  {fb.treatment && (
                    <div className="treatment-ribbon">
                      <span className="dot" />
                      {fb.treatment}
                    </div>
                  )}

                  {fb.feedback_text && (
                    <p className="review-text">"{fb.feedback_text}"</p>
                  )}

                  <div className="ratings-grid">
                    {fb.doctor_rating > 0 && (
                      <div className="rating-item">
                        <span className="rating-label">Dokter</span>
                        <StarDisplay rating={fb.doctor_rating} />
                      </div>
                    )}
                    {fb.service_rating > 0 && (
                      <div className="rating-item">
                        <span className="rating-label">Layanan</span>
                        <StarDisplay rating={fb.service_rating} />
                      </div>
                    )}
                    {fb.place_rating > 0 && (
                      <div className="rating-item">
                        <span className="rating-label">Tempat</span>
                        <StarDisplay rating={fb.place_rating} />
                      </div>
                    )}
                    {fb.product_rating > 0 && (
                      <div className="rating-item">
                        <span className="rating-label">Produk</span>
                        <StarDisplay rating={fb.product_rating} />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}