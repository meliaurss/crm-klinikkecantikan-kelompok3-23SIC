// src/pages/Customer/CustomerDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MemberPoints from '../../components/Customer/MemberPoints';
import ReservationStatus from '../../components/Customer/ReservationStatus';
// import FeedbackModal from '../../components/Customer/FeedbackModal'; // (Jika tidak dipakai bisa dihapus)
import HeroSection from '../../components/Landing/HeroSection';
import ServicesSection from '../../components/Landing/ServicesSection';
import ProductsSection from '../../components/Landing/ProductsSection';
import AboutUsSection from '../../components/Landing/AboutUsSection';
import FAQSection from '../../components/Landing/FAQSection';
import HeroPrediksiPage from '../../components/Customer/HeroPrediksiPage';
import CustomerFeedbackDisplay from '../../components/Customer/CustomerFeedbackDisplay';
import FormFeedback from '../../components/Customer/FormFeedback';
import PromoPage from '../../components/Landing/PromoPage';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Mengambil nama depan dari email jika nama tidak tersedia
  const displayName = user?.name || user?.email?.split('@')[0] || 'Pelanggan';

  const handleOpenFeedback = (reservation) => {
    setSelectedReservation(reservation);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedReservation(null);
  };

  const handleFeedbackSuccess = () => {
    alert('Terima kasih atas ulasan Anda!');
    handleCloseFeedback();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="bg-[#fcfcfc] min-h-screen font-['DM_Sans',sans-serif]">
        <HeroSection onReservasiClick={() => navigate('/customer/reservasi')} />
        
        <div className="space-y-16 pb-16">
          <HeroPrediksiPage />

          {/* Info Member & Sapaan */}
          <section className="max-w-7xl mx-auto px-4 pt-10">
            <div className="mb-10 text-center md:text-left">
              <p className="text-[13px] font-medium text-[#5a6a7e] uppercase tracking-widest mb-2">
                Selamat Datang di The Rose Clinic
              </p>
              <h1 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
                Halo, <span className="capitalize">{displayName}</span>
              </h1>
            </div>

            <div className="w-full">
              <MemberPoints points={user?.points || 0} tier={user?.membership_tier || 'Basic'} />
            </div>
          </section>

          {/* Status Reservasi */}
          <section className="max-w-7xl mx-auto px-4">
            <ReservationStatus customerId={user?.id} onGiveFeedback={handleOpenFeedback} />
          </section>

          {/* Customer Feedback Display */}
          <section className="max-w-7xl mx-auto px-4">
            <CustomerFeedbackDisplay />
          </section>

          {/* Landing Sections */}
          <PromoPage />
          <ServicesSection />
          <ProductsSection />
          <AboutUsSection />
          <FAQSection />
        </div>

        {/* Modal Feedback (Desain Elegan) */}
        {showFeedbackModal && selectedReservation && (
          <div className="fixed inset-0 z-50 bg-[#293A52]/70 backdrop-blur-sm flex items-center justify-center px-4 transition-opacity">
            <div className="bg-white rounded-sm shadow-2xl w-full max-w-xl relative p-8 border border-[#e8ecf1]">
              <button
                onClick={handleCloseFeedback}
                className="absolute top-4 right-5 text-[#a8b5c7] hover:text-[#293A52] text-3xl font-light transition-colors leading-none"
                aria-label="Tutup"
              >
                &times;
              </button>
              
              <div className="mb-6">
                <h3 className="text-2xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-1">
                  Ulasan Perawatan
                </h3>
                <p className="text-[14px] text-[#5a6a7e]">
                  Bagikan pengalaman Anda untuk perawatan <span className="font-semibold text-[#293A52]">{selectedReservation.treatment_name}</span>.
                </p>
              </div>

              <FormFeedback
                userId={user?.id}
                reservationId={selectedReservation.id}
                treatmentName={selectedReservation.treatment_name}
                onSubmitted={handleFeedbackSuccess}
                onClose={handleCloseFeedback}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}