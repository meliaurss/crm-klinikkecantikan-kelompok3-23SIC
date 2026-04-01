import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500&family=DM+Sans:wght@300;400;500&display=swap');

        .footer-root {
          background-color: #293A52;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(204, 212, 225, 0.15);
        }

        .footer-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 48px 32px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* ── Top row ── */
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 32px;
          flex-wrap: wrap;
        }

        /* Brand block */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-logo-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-mark {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          background: rgba(204, 212, 225, 0.15);
          border: 1px solid rgba(204, 212, 225, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .footer-logo-mark svg {
          width: 13px;
          height: 13px;
          fill: none;
          stroke: #CCD4E1;
          stroke-width: 1.5;
          stroke-linecap: round;
        }

        .footer-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 500;
          color: #FCFCFC;
          letter-spacing: 0.2px;
        }

        .footer-tagline {
          font-size: 12px;
          font-weight: 300;
          color: rgba(204, 212, 225, 0.6);
          letter-spacing: 0.5px;
          max-width: 240px;
          line-height: 1.6;
        }

        /* Social icons */
        .footer-socials {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .social-btn {
          width: 36px;
          height: 36px;
          border-radius: 3px;
          background: rgba(204, 212, 225, 0.08);
          border: 1px solid rgba(204, 212, 225, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(252, 252, 252, 0.7);
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .social-btn:hover {
          background: rgba(204, 212, 225, 0.18);
          border-color: rgba(204, 212, 225, 0.35);
          color: #FCFCFC;
          transform: translateY(-2px);
        }

        .social-btn svg {
          width: 15px;
          height: 15px;
        }

        /* ── Divider ── */
        .footer-divider {
          height: 1px;
          background: rgba(204, 212, 225, 0.12);
        }

        /* ── Bottom row ── */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-copy {
          font-size: 11px;
          color: rgba(204, 212, 225, 0.45);
          letter-spacing: 0.5px;
        }

        .footer-links {
          display: flex;
          gap: 20px;
        }

        .footer-links a {
          font-size: 11px;
          color: rgba(204, 212, 225, 0.45);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: rgba(204, 212, 225, 0.8);
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-top">
            {/* Brand */}
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="footer-logo-row">
                <div className="footer-logo-mark">
                  <svg viewBox="0 0 16 16">
                    <path d="M8 2C8 2 6 6 2 8C6 10 8 14 8 14C8 14 10 10 14 8C10 6 8 2 8 2Z" />
                  </svg>
                </div>
                <span className="footer-brand-name">The Rose Clinic</span>
              </div>
              <p className="footer-tagline">
                Healthy Skin, Beautiful You. Perawatan estetika premium bersama dr. Tengku Rose.
              </p>
            </motion.div>

            {/* Socials */}
            <motion.div
              className="footer-socials"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" target="_blank" rel="noopener noreferrer" className="social-btn">
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <p className="footer-copy">
              © {new Date().getFullYear()} The Rose Aesthetic Clinic. All rights reserved.
            </p>
            <div className="footer-links">
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Syarat & Ketentuan</a>
              <a href="#">Kontak</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;