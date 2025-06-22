import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MemberPoints from '../../components/Customer/MemberPoints';
import Notifications from '../../components/Customer/Notifications';
import ReservationStatus from '../../components/Customer/ReservationStatus';
import PurchaseHistory from '../../components/Customer/PurchaseHistory';
import FeedbackModal from '../../components/Customer/FeedbackModal';
import HeroSection from '../../components/Landing/HeroSection';
import ServicesSection from '../../components/Landing/ServicesSection';
import PromoSection from '../../components/Landing/PromoSection';
import ProductsSection from '../../components/Landing/ProductsSection';
import AboutUsSection from '../../components/Landing/AboutUsSection';
import FAQSection from '../../components/Landing/FAQSection';
import FormReservasi from '../../components/Landing/FormReservasi';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showReservasiForm, setShowReservasiForm] = useState(false); // 👉 tambahkan state ini

  useEffect(() => {
    const treatmentDone = true;
    if (treatmentDone) setShowFeedback(false);
  }, []);

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    alert('Terima kasih atas feedback Anda! Poin Anda bertambah.');
    setShowFeedback(false);
  };

  return (
    <div className="space-y-12">
      {/* Hero dengan logika reservasi */}
      <HeroSection onReservasiClick={() => setShowReservasiForm(true)} />

      {/* Info Member */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-blue-500 mb-2 drop-shadow">
            Halo, {user?.name || user?.email}
          </h1>
          <p className="text-gray-500 text-sm">Terima kasih telah menjadi bagian dari Mahacare!</p>
        </div>

        <div className="md:col-span-2">
          <MemberPoints points={150} tier="Silver" />
        </div>
      </section>

      <PromoSection />
      <ServicesSection />
      <ProductsSection />

      {showReservasiForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background gelap di belakang form */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowReservasiForm(false)}
          ></div>

          {/* FormReservasi tetap tampil solid di atas */}
          <div className="relative z-10 w-full max-w-2xl">
            <FormReservasi onClose={() => setShowReservasiForm(false)} />
          </div>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
