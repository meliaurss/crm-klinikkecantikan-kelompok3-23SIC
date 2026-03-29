// src/components/Landing/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import gambar1 from '../../assets/gambar1.png';
import gambar2 from '../../assets/gambar2.png';
import gambar3 from '../../assets/gambar3.png';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ onReservasiClick }) => {
  const images = [gambar1, gambar2, gambar3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleReservasiClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      if (onReservasiClick) {
        onReservasiClick();
      } else {
        navigate('/customer');
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500&display=swap');

        :root {
          --brown-deep:    #2C1A0E;
          --brown-rich:    #4A2C17;
          --brown-warm:    #7B4A2D;
          --brown-mid:     #A0623A;
          --brown-light:   #C8906A;
          --brown-pale:    #E8D5C4;
          --brown-cream:   #F5EDE4;
          --silver-dark:   #8A8A8A;
          --silver-mid:    #B8B8B8;
          --silver-light:  #D8D8D8;
          --silver-pale:   #EFEFEF;
          --gold-accent:   #C9A96E;
          --gold-light:    #E2C99A;
          --ivory:         #FAF6F1;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            var(--ivory) 0%,
            #F0E6D8 30%,
            #E8D5C4 60%,
            #F5EDE4 100%
          );
          overflow: hidden;
          font-family: 'Jost', sans-serif;
          padding: 0;
        }

        /* Dekoratif noise texture overlay */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 200px;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        /* Orb dekoratif 1 - coklat hangat besar */
        .orb-1 {
          position: absolute;
          top: -120px;
          left: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(160, 98, 58, 0.22) 0%, rgba(74, 44, 23, 0.08) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 1;
          animation: orbFloat 8s ease-in-out infinite;
        }

        /* Orb dekoratif 2 - silver kanan bawah */
        .orb-2 {
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(184, 184, 184, 0.25) 0%, rgba(138, 138, 138, 0.08) 60%, transparent 100%);
          border-radius: 50%;
          z-index: 1;
          animation: orbFloat 10s ease-in-out infinite reverse;
        }

        /* Orb kecil gold */
        .orb-3 {
          position: absolute;
          top: 40%;
          left: 35%;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(201, 169, 110, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 1;
          animation: orbFloat 12s ease-in-out infinite 2s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }

        /* Garis dekoratif diagonal */
        .deco-lines {
          position: absolute;
          top: 0;
          right: 0;
          width: 45%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .deco-lines::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -5%;
          width: 120%;
          height: 120%;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 48px,
            rgba(201, 169, 110, 0.06) 48px,
            rgba(201, 169, 110, 0.06) 50px
          );
        }

        /* Badge mewah atas */
        .luxury-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(201,169,110,0.15), rgba(184,184,184,0.12));
          border: 1px solid rgba(201,169,110,0.4);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: 20px;
          backdrop-filter: blur(8px);
        }

        .luxury-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-accent), var(--brown-light));
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }

        .luxury-badge-text {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--brown-warm);
        }

        /* Heading utama */
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.15;
          color: var(--brown-deep);
          margin-bottom: 18px;
          letter-spacing: -0.5px;
        }

        .hero-title .accent-italic {
          font-style: italic;
          color: var(--brown-warm);
          position: relative;
        }

        /* Underline dekoratif emas di bawah kata kunci */
        .hero-title .underline-deco {
          position: relative;
          display: inline-block;
        }

        .hero-title .underline-deco::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold-accent), var(--silver-mid), var(--gold-accent));
          border-radius: 2px;
        }

        /* Subtitle */
        .hero-sub {
          font-size: 14px;
          line-height: 1.8;
          color: #6B4F3A;
          margin-bottom: 32px;
          font-weight: 300;
          max-width: 420px;
        }

        .hero-sub .highlight {
          font-weight: 500;
          color: var(--brown-warm);
          position: relative;
        }

        /* Promo badge inline */
        .promo-pill {
          display: inline-block;
          background: linear-gradient(135deg, var(--brown-rich), var(--brown-warm));
          color: var(--gold-light);
          font-size: 12px;
          font-weight: 500;
          padding: 2px 10px;
          border-radius: 100px;
          letter-spacing: 0.5px;
        }

        /* Tombol CTA utama */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--brown-deep) 0%, var(--brown-rich) 50%, var(--brown-warm) 100%);
          color: var(--gold-light);
          border: none;
          padding: 14px 30px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 4px 20px rgba(44, 26, 14, 0.35),
            inset 0 1px 0 rgba(255,255,255,0.1);
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.25), transparent);
          transition: left 0.5s ease;
        }

        .btn-primary:hover::before {
          left: 100%;
        }

        .btn-primary:hover {
          box-shadow:
            0 8px 32px rgba(44, 26, 14, 0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .btn-icon {
          font-size: 16px;
          filter: drop-shadow(0 0 4px rgba(201,169,110,0.6));
        }

        /* Tombol sekunder outline */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--brown-warm);
          border: 1px solid rgba(160, 98, 58, 0.4);
          padding: 14px 24px;
          border-radius: 100px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(4px);
        }

        .btn-secondary:hover {
          background: rgba(160, 98, 58, 0.08);
          border-color: rgba(160, 98, 58, 0.7);
        }

        /* Grup tombol */
        .btn-group {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* Stats row */
        .stats-row {
          display: flex;
          gap: 28px;
          margin-top: 44px;
          padding-top: 32px;
          border-top: 1px solid rgba(160, 98, 58, 0.15);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 700;
          color: var(--brown-deep);
          line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          color: var(--brown-mid);
          letter-spacing: 1px;
          text-transform: uppercase;
          font-weight: 400;
        }

        .stat-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(160,98,58,0.25), transparent);
          align-self: stretch;
        }

        /* Frame gambar mewah */
        .image-frame {
          position: relative;
          width: 100%;
          max-width: 430px;
        }

        /* Frame border dekoratif */
        .image-frame::before {
          content: '';
          position: absolute;
          top: -12px;
          right: -12px;
          bottom: 12px;
          left: 12px;
          border: 1.5px solid rgba(201, 169, 110, 0.45);
          border-radius: 32px;
          z-index: 0;
          pointer-events: none;
        }

        /* Corner ornament kiri atas */
        .frame-ornament {
          position: absolute;
          z-index: 4;
          pointer-events: none;
        }

        .frame-ornament.tl {
          top: -4px;
          left: -4px;
          width: 32px;
          height: 32px;
          border-top: 2px solid var(--gold-accent);
          border-left: 2px solid var(--gold-accent);
          border-radius: 4px 0 0 0;
        }

        .frame-ornament.br {
          bottom: -4px;
          right: -4px;
          width: 32px;
          height: 32px;
          border-bottom: 2px solid var(--gold-accent);
          border-right: 2px solid var(--gold-accent);
          border-radius: 0 0 4px 0;
        }

        .image-main {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 480px;
          object-fit: cover;
          border-radius: 24px;
          box-shadow:
            0 24px 60px rgba(44, 26, 14, 0.3),
            0 8px 20px rgba(44, 26, 14, 0.15),
            inset 0 0 0 1px rgba(255,255,255,0.5);
          display: block;
        }

        /* Overlay shimmer pada gambar */
        .image-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: 24px;
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.12) 0%,
            transparent 40%,
            rgba(44, 26, 14, 0.08) 100%
          );
          pointer-events: none;
        }

        /* Badge mengambang di gambar */
        .floating-badge {
          position: absolute;
          z-index: 5;
          background: rgba(250, 246, 241, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(201, 169, 110, 0.35);
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow: 0 8px 24px rgba(44, 26, 14, 0.15);
        }

        .badge-left {
          bottom: 40px;
          left: -24px;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 160px;
        }

        .badge-right {
          top: 40px;
          right: -20px;
          text-align: center;
          min-width: 90px;
        }

        .badge-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--brown-rich), var(--brown-warm));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }

        .badge-label {
          font-size: 10px;
          color: var(--silver-dark);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 400;
          line-height: 1;
          margin-bottom: 3px;
        }

        .badge-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--brown-deep);
          line-height: 1;
        }

        .badge-rating {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: var(--brown-deep);
          line-height: 1;
          margin-bottom: 2px;
        }

        .badge-stars {
          font-size: 11px;
          color: var(--gold-accent);
          letter-spacing: 1px;
        }

        /* Dot indicators slideshow */
        .slide-dots {
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 6;
        }

        .slide-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--silver-light);
          transition: all 0.35s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        .slide-dot.active {
          width: 20px;
          border-radius: 3px;
          background: linear-gradient(90deg, var(--brown-warm), var(--gold-accent));
        }

        /* Scroll hint */
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          z-index: 10;
          opacity: 0.5;
          pointer-events: none;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--brown-warm), transparent);
          animation: scrollDown 2s ease-in-out infinite;
        }

        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        .scroll-text {
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--brown-warm);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-section {
            padding-bottom: 60px;
          }

          .hero-title {
            font-size: 2rem;
          }

          .stats-row {
            gap: 20px;
          }

          .badge-left {
            left: 8px;
            bottom: 24px;
          }

          .badge-right {
            right: 8px;
            top: 24px;
          }

          .image-frame::before {
            display: none;
          }

          .btn-group {
            justify-content: center;
          }

          .stats-row {
            justify-content: center;
          }
        }
      `}</style>

      <section className="hero-section">
        {/* Orbs dekoratif */}
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />
        <div className="deco-lines" />

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 32px',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '64px',
              width: '100%',
              paddingTop: '80px',
              paddingBottom: '80px',
              flexWrap: 'wrap-reverse',
            }}
          >
            {/* ── KOLOM KIRI: teks ── */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: '1 1 380px', minWidth: 0 }}
            >
              {/* Badge atas */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="luxury-badge"
              >
                <span className="luxury-badge-dot" />
                <span className="luxury-badge-text">Premium Beauty Clinic</span>
              </motion.div>

              {/* Heading */}
              <h1 className="hero-title">
                Klinik Kecantikan
                <br />
                <span className="accent-italic">Modern</span>{' '}
                untuk{' '}
                <span className="underline-deco">Wajah Cerah</span>
                <br />
                &amp; <span className="accent-italic">Glowing</span>
              </h1>

              {/* Subtitle */}
              <p className="hero-sub">
                Dapatkan{' '}
                <span className="promo-pill">Diskon Rp100.000</span>
                {' '}untuk semua treatment spesial bulan ini.
                Kunjungi{' '}
                <span className="highlight">Bahebak Clinic</span>
                {' '}dan rasakan pengalaman perawatan premium yang mewah.
              </p>

              {/* Tombol CTA */}
              <div className="btn-group">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  onClick={handleReservasiClick}
                >
                  <span className="btn-icon">✦</span>
                  RESERVASI SEKARANG
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary"
                  onClick={() => navigate('/treatments')}
                >
                  Lihat Treatment →
                </motion.button>
              </div>

              {/* Stats row */}
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-number">5K+</span>
                  <span className="stat-label">Pelanggan</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Treatment</span>
                </div>
                <div className="stat-divider" />
                <div className="stat-item">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </motion.div>

            {/* ── KOLOM KANAN: gambar ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              style={{ flex: '1 1 380px', display: 'flex', justifyContent: 'center' }}
            >
              <div className="image-frame">
                {/* Corner ornaments */}
                <div className="frame-ornament tl" />
                <div className="frame-ornament br" />

                {/* Gambar slideshow */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt="Bahebak Clinic"
                    className="image-main"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Overlay shimmer */}
                <div className="image-overlay" />

                {/* Badge mengambang kiri bawah */}
                <motion.div
                  className="floating-badge badge-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="badge-icon">✦</div>
                  <div>
                    <div className="badge-label">Treatment Bulan Ini</div>
                    <div className="badge-value">Hemat Rp100K</div>
                  </div>
                </motion.div>

                {/* Badge mengambang kanan atas */}
                <motion.div
                  className="floating-badge badge-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <div className="badge-label">Rating</div>
                  <div className="badge-rating">4.9</div>
                  <div className="badge-stars">★★★★★</div>
                </motion.div>

                {/* Dot indikator slideshow */}
                <div className="slide-dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      className={`slide-dot ${i === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(i)}
                      aria-label={`Gambar ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <span className="scroll-text">scroll</span>
          <div className="scroll-line" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;