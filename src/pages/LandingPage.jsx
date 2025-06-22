import React, { useState } from 'react';
import HeroSection from '../components/Landing/HeroSection';
import WhyChooseUs from '../components/Landing/WhyChooseUs';
import ServicesSection from '../components/Landing/ServicesSection';
import ProductsSection from '../components/Landing/ProductsSection';
import PromoSection from '../components/Landing/PromoSection';
import FeedbackSection from '../components/Landing/FeedbackSection';
import FAQSection from '../components/Landing/FAQSection';
import AboutUsSection from '../components/Landing/AboutUsSection';

const LandingPage = () => {
  const [showReservasiForm, setShowReservasiForm] = useState(false);

  const handleOpenReservasi = () => setShowReservasiForm(true);
  const handleCloseReservasi = () => setShowReservasiForm(false);

  return (
    <>
      {/* Hero Section */}
      <HeroSection onOpenReservasi={handleOpenReservasi} />

      {/* Mengapa Memilih Kami */}
      <WhyChooseUs />

      {/* Layanan */}
      <ServicesSection onOpenReservasi={handleOpenReservasi} />

      {/* Produk Unggulan */}
      <ProductsSection onOpenReservasi={handleOpenReservasi} />

      {/* Promo */}
      <PromoSection />

      {/* Feedback */}
      <FeedbackSection />

      {/* FAQ */}
      <FAQSection />

      {/* Tentang Kami */}
      <AboutUsSection />

      {/* Modal Reservasi */}
      {showReservasiForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-3xl w-full">
            <button
              onClick={handleCloseReservasi}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
            <ReservasiForm onClose={handleCloseReservasi} />
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
