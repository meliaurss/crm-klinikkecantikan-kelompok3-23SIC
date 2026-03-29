import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-section {
          background-color: #2C1A0E; /* Cokelat tua pekat khas klinik mewah */
          color: #FAF6F1; /* Teks warna krem terang */
          font-family: 'Jost', sans-serif;
        }
        
        .footer-brand {
          font-family: 'Cormorant Garamond', serif;
          color: #C9A96E; /* Aksen tulisan emas */
          letter-spacing: 1px;
        }

        .social-link {
          color: rgba(250, 246, 241, 0.8); /* Krem semi-transparan */
          transition: all 0.3s ease;
          display: inline-block;
        }

        .social-link:hover {
          color: #C9A96E; /* Berubah emas saat disentuh kursor */
          transform: translateY(-3px) scale(1.1);
        }
      `}</style>

      {/* Tambahan border atas tipis berwarna emas pudar agar lebih elegan */}
      <footer className="footer-section py-12 border-t border-[#C9A96E]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand & Copyright */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h3 className="text-3xl font-bold footer-brand">Bahebak Clinic</h3>
              <p className="text-sm mt-3 text-[#FAF6F1]/60 tracking-wide font-light">
                © {new Date().getFullYear()} All Rights Reserved.
              </p>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-6 mt-4 md:mt-0"
            >
              {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </motion.div>

          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;