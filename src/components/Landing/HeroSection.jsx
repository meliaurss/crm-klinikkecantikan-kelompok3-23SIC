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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          /* The Rose Aesthetic Clinic — colour system */
          --primary:      #293A52;
          --primary-90:   #344a66;
          --primary-70:   #4a6a94;
          --primary-20:   #d0d8e3;
          --primary-10:   #e8ecf1;
          --primary-05:   #f4f6f8;
          --secondary:    #CCD4E1;
          --sec-dark:     #a8b5c7;
          --sec-light:    #e3e8f0;
          --sec-pale:     #f0f3f7;
          --white:        #FCFCFC;
          --black:        #020202;
          --gray-text:    #5a6a7e;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          background-color: var(--white);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }

        /* ── Background: fine dot-grid texture ── */
        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--secondary) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Primary blush — top-left ── */
        .blush-tl {
          position: absolute;
          top: -180px;
          left: -180px;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(41, 58, 82, 0.07) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Secondary blush — bottom-right ── */
        .blush-br {
          position: absolute;
          bottom: -120px;
          right: -100px;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(204, 212, 225, 0.35) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Thin vertical rule ── */
        .vertical-rule {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent 0%, var(--secondary) 25%, var(--secondary) 75%, transparent 100%);
          z-index: 0;
          opacity: 0.4;
          pointer-events: none;
        }

        /* ── Clinic logo badge ── */
        .clinic-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--white);
          border: 1px solid var(--secondary);
          border-radius: 4px;
          padding: 7px 16px 7px 10px;
          margin-bottom: 20px;
          box-shadow: 0 1px 6px rgba(41, 58, 82, 0.07);
        }

        .clinic-badge-line {
          width: 3px;
          height: 24px;
          background: var(--primary);
          border-radius: 2px;
          flex-shrink: 0;
        }

        .clinic-badge-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .clinic-badge-eyebrow {
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--gray-text);
          line-height: 1;
        }

        .clinic-badge-name {
          font-family: 'Playfair Display', serif;
          font-size: 13px;
          font-weight: 500;
          color: var(--primary);
          line-height: 1;
          letter-spacing: 0.3px;
        }

        /* ── Main heading ── */
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 4.5vw, 3.8rem);
          font-weight: 500;
          line-height: 1.1;
          color: var(--black);
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .hero-title .italic-rose {
          font-style: italic;
          color: var(--primary);
        }

        .hero-title .block-second {
          display: block;
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 400;
          color: var(--sec-dark);
          letter-spacing: 0;
          margin-top: 4px;
        }

        /* ── Rule under heading ── */
        .heading-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 20px 0 14px;
        }

        .heading-divider-line {
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: var(--secondary);
        }

        .heading-divider-rose {
          font-size: 12px;
          color: var(--secondary);
          line-height: 1;
        }

        /* ── Body copy ── */
        .hero-sub {
          font-size: 14px;
          line-height: 1.85;
          color: var(--gray-text);
          margin-bottom: 32px;
          font-weight: 300;
          max-width: 400px;
        }

        .hero-sub strong {
          font-weight: 500;
          color: var(--primary);
        }

        /* ── Promo ribbon ── */
        .promo-ribbon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--primary-05);
          border: 1px solid var(--primary-20);
          border-radius: 3px;
          padding: 4px 11px;
          font-size: 12px;
          font-weight: 500;
          color: var(--primary);
          letter-spacing: 0.3px;
          margin-bottom: 16px;
        }

        .promo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--primary);
          flex-shrink: 0;
        }

        /* ── Primary CTA ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
          color: var(--white);
          border: none;
          padding: 14px 28px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.15s ease;
        }

        .btn-primary:hover {
          background: var(--primary-90);
        }

        .btn-primary-arrow {
          font-size: 15px;
          transition: transform 0.2s ease;
        }

        .btn-primary:hover .btn-primary-arrow {
          transform: translateX(4px);
        }

        /* ── Secondary CTA ── */
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--secondary);
          padding: 14px 22px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-secondary:hover {
          background: var(--primary-05);
          border-color: var(--primary);
        }

        .btn-group {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ── Stats ── */
        .stats-row {
          display: flex;
          gap: 0;
          margin-top: 44px;
          padding-top: 32px;
          border-top: 1px solid var(--sec-light);
        }

        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-right: 24px;
        }

        .stat-item + .stat-item {
          padding-left: 24px;
          padding-right: 24px;
          border-left: 1px solid var(--sec-light);
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 500;
          color: var(--primary);
          line-height: 1;
        }

        .stat-number sup {
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          color: var(--primary-70);
          vertical-align: super;
        }

        .stat-label {
          font-size: 11px;
          color: var(--sec-dark);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 400;
        }

        /* ── Right column: image frame ── */
        .image-column {
          position: relative;
          flex: 1 1 380px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-frame {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        .image-frame::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 16px;
          right: -16px;
          bottom: -16px;
          border: 1px solid var(--sec-light);
          border-radius: 2px;
          z-index: 0;
          pointer-events: none;
        }

        .corner-tl,
        .corner-br {
          position: absolute;
          z-index: 5;
          pointer-events: none;
        }

        .corner-tl {
          top: -6px;
          left: -6px;
          width: 28px;
          height: 28px;
          border-top: 2px solid var(--primary);
          border-left: 2px solid var(--primary);
        }

        .corner-br {
          bottom: -6px;
          right: -6px;
          width: 28px;
          height: 28px;
          border-bottom: 2px solid var(--primary);
          border-right: 2px solid var(--primary);
        }

        .image-main {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 490px;
          object-fit: cover;
          border-radius: 2px;
          display: block;
        }

        .image-vignette {
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: 2px;
          background: linear-gradient(
            to bottom,
            transparent 55%,
            rgba(41, 58, 82, 0.12) 100%
          );
          pointer-events: none;
        }

        /* ── Floating cards ── */
        .float-card {
          position: absolute;
          z-index: 6;
          background: rgba(252, 252, 252, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid var(--secondary);
          border-radius: 4px;
          padding: 12px 16px;
          box-shadow: 0 4px 20px rgba(41, 58, 82, 0.10);
        }

        .float-bottom-left {
          bottom: 28px;
          left: -28px;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 168px;
        }

        .float-top-right {
          top: 32px;
          right: -20px;
          text-align: center;
          min-width: 88px;
        }

        .float-icon {
          width: 34px;
          height: 34px;
          border-radius: 3px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .float-icon svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: var(--white);
          stroke-width: 1.5;
          stroke-linecap: round;
        }

        .float-eyebrow {
          font-size: 9px;
          color: var(--sec-dark);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 400;
          line-height: 1;
          margin-bottom: 3px;
        }

        .float-value {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--primary);
          line-height: 1;
        }

        .float-rating-num {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 2px;
        }

        .float-stars {
          font-size: 10px;
          color: var(--primary-70);
          letter-spacing: 2px;
        }

        /* ── Slideshow dots ── */
        .slide-dots {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 7;
        }

        .slide-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--secondary);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .slide-dot.active {
          width: 18px;
          border-radius: 3px;
          background: var(--primary);
        }

        /* ── Scroll cue ── */
        .scroll-cue {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          opacity: 0.3;
          pointer-events: none;
        }

        .scroll-cue-text {
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--primary);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .scroll-cue-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(to bottom, var(--primary), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── Hashtag strip ── */
        .hashtag-strip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
          font-size: 11px;
          font-weight: 400;
          color: var(--sec-dark);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hashtag-strip span.sep {
          color: var(--primary-20);
          font-size: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .hero-title { font-size: 2rem; }
          .float-bottom-left { left: 8px; bottom: 20px; }
          .float-top-right  { right: 8px; top: 20px; }
          .image-frame::after { display: none; }
          .btn-group { justify-content: center; }
          .stats-row { justify-content: center; }
        }
      `}</style>

      <section className="hero-section">
        <div className="blush-tl" />
        <div className="blush-br" />
        <div className="vertical-rule" />

        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            padding: '0 36px',
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
              gap: '72px',
              width: '100%',
              paddingTop: '88px',
              paddingBottom: '88px',
              flexWrap: 'wrap-reverse',
            }}
          >
            {/* ── LEFT: copy ── */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{ flex: '1 1 360px', minWidth: 0 }}
            >
              {/* Clinic badge */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
                className="clinic-badge"
              >
                <div className="clinic-badge-line" />
                <div className="clinic-badge-text">
                  <span className="clinic-badge-eyebrow">by dr. Tengku Rose</span>
                  <span className="clinic-badge-name">The Rose Aesthetic Clinic</span>
                </div>
              </motion.div>

              {/* Promo ribbon */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="promo-ribbon">
                  <span className="promo-dot" />
                  Diskon Rp100.000 · Treatment Bulan Ini
                </div>
              </motion.div>

              {/* Heading */}
              <h1 className="hero-title">
                Healthy Skin,
                <br />
                <span className="italic-rose">Beautiful</span> You
                <span className="block-second">The Rose Aesthetic Clinic</span>
              </h1>

              {/* Divider ornament */}
              <div className="heading-divider">
                <div className="heading-divider-line" />
                <span className="heading-divider-rose">✦</span>
              </div>

              {/* Hashtag brand strip */}
              <div className="hashtag-strip">
                <span>#HealthySkin</span>
                <span className="sep">✦</span>
                <span>#BeautifulYou</span>
                <span className="sep">✦</span>
                <span>#TheRoseClinic</span>
              </div>

              {/* Body copy */}
              <p className="hero-sub">
                Rasakan pengalaman perawatan estetika premium bersama{' '}
                <strong>dr. Tengku Rose</strong>. Treatment modern dengan teknologi terkini,
                didesain untuk kulit sehat &amp; bercahaya.
              </p>

              {/* CTA buttons */}
              <div className="btn-group">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  onClick={handleReservasiClick}
                >
                  Reservasi Sekarang
                  <span className="btn-primary-arrow">→</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary"
                  onClick={() => navigate('/treatments')}
                >
                  Lihat Treatment
                </motion.button>
              </div>

              {/* Stats */}
              <div className="stats-row">
                <div className="stat-item">
                  <span className="stat-number">5K<sup>+</sup></span>
                  <span className="stat-label">Pelanggan</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">12</span>
                  <span className="stat-label">Treatment</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: image ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="image-column"
            >
              <div className="image-frame">
                {/* Corner ornaments */}
                <div className="corner-tl" />
                <div className="corner-br" />

                {/* Slideshow */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={images[currentImageIndex]}
                    alt="The Rose Aesthetic Clinic"
                    className="image-main"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, ease: 'easeInOut' }}
                  />
                </AnimatePresence>

                {/* Vignette */}
                <div className="image-vignette" />

                {/* Float card — bottom left */}
                <motion.div
                  className="float-card float-bottom-left"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75, duration: 0.55 }}
                >
                  <div className="float-icon">
                    {/* sparkle / leaf icon */}
                    <svg viewBox="0 0 16 16">
                      <path d="M8 2C8 2 6 6 2 8C6 10 8 14 8 14C8 14 10 10 14 8C10 6 8 2 8 2Z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="float-eyebrow">Promo Bulan Ini</div>
                    <div className="float-value">Hemat Rp100.000</div>
                  </div>
                </motion.div>

                {/* Float card — top right */}
                <motion.div
                  className="float-card float-top-right"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.55 }}
                >
                  <div className="float-eyebrow">Rating</div>
                  <div className="float-rating-num">4.9</div>
                  <div className="float-stars">★★★★★</div>
                </motion.div>

                {/* Dots */}
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

        {/* Scroll cue */}
        <div className="scroll-cue">
          <span className="scroll-cue-text">scroll</span>
          <div className="scroll-cue-line" />
        </div>
      </section>
    </>
  );
};

export default HeroSection;