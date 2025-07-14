// src/pages/Customer/CustomerDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MemberPoints from '../../components/Customer/MemberPoints';
import ReservationStatus from '../../components/Customer/ReservationStatus';
import FeedbackModal from '../../components/Customer/FeedbackModal';
import HeroSection from '../../components/Landing/HeroSection';
import ServicesSection from '../../components/Landing/ServicesSection';
import PromoSection from '../../components/Landing/PromoSection';
import ProductsSection from '../../components/Landing/ProductsSection';
import AboutUsSection from '../../components/Landing/AboutUsSection';
import FAQSection from '../../components/Landing/FAQSection';
import HeroPrediksiPage from '../../components/Customer/HeroPrediksiPage';
import CustomerFeedbackDisplay from '../../components/Customer/CustomerFeedbackDisplay';
// Tambahan import
import FormFeedback from '../../components/Customer/FormFeedback';

import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null); // untuk passing data

  // Saat user klik tombol "Isi Feedback"
  const handleOpenFeedback = (reservation) => {
    setSelectedReservation(reservation);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedReservation(null);
  };

  const handleFeedbackSuccess = () => {
    alert('Terima kasih atas feedback Anda!');
    handleCloseFeedback();
  };

  return (
    <div className="space-y-12">
      <HeroSection onReservasiClick={() => navigate('/customer/reservasi')} />
      <HeroPrediksiPage />

      {/* Info Member */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500 mb-2 drop-shadow">
            Halo, {user?.name || user?.email}
          </h1>
          <p className="text-gray-500 text-sm">Terima kasih telah menjadi bagian dari Mahacare!</p>
        </div>

        <div className="md:col-span-2">
          <MemberPoints points={user?.points || 0} tier={user?.membership_tier || 'Bronze'} />
        </div>
      </section>

      {/* Kirim props handler ke ReservationStatus */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <ReservationStatus customerId={user?.id} onGiveFeedback={handleOpenFeedback} />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <CustomerFeedbackDisplay />
      </section>

      <PromoSection />
      <ServicesSection />
      <ProductsSection />
      <AboutUsSection />
      <FAQSection />

      {/* Modal Feedback */}
      {showFeedbackModal && selectedReservation && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative p-6">
            <button
              onClick={handleCloseFeedback}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
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
  );
}