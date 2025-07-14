// src/pages/Customer/CustomerDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MemberPoints from '../../components/Customer/MemberPoints';
import ReservationStatus from '../../components/Customer/ReservationStatus';
// import FeedbackModal from '../../components/Customer/FeedbackModal'; // Ini mungkin bisa dihapus jika feedback hanya lewat ReservationStatus
import FeedbackModal from '../../components/Customer/FeedbackModal';
import HeroSection from '../../components/Landing/HeroSection';
import ServicesSection from '../../components/Landing/ServicesSection';
import PromoSection from '../../components/Landing/PromoSection';
import ProductsSection from '../../components/Landing/ProductsSection';
import AboutUsSection from '../../components/Landing/AboutUsSection';
import FAQSection from '../../components/Landing/FAQSection';
import HeroPrediksiPage from '../../components/Customer/HeroPrediksiPage';
import CustomerFeedbackDisplay from '../../components/Customer/CustomerFeedbackDisplay'; // <--- Tambahkan import ini

import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const { user } = useAuth();
  // const [showFeedback, setShowFeedback] = useState(false); // Ini bisa dihapus jika feedback hanya dari ReservationStatus
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Logika ini mungkin tidak lagi relevan jika feedback hanya dari ReservationStatus
    // const treatmentDone = false;
    // if (treatmentDone) {
    //   setShowFeedback(true);
    // }
  }, []);

  // const handleFeedbackSubmit = (feedback) => { // Ini juga bisa dihapus
  //   console.log('Feedback submitted:', feedback);
  //   alert('Terima kasih atas feedback Anda! Poin Anda bertambah.');
  //   setShowFeedback(false);
  // };

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    alert('Terima kasih atas feedback Anda! Poin Anda bertambah.');
    setShowFeedback(false);
  };

  const handleReservasiClick = () => {
    navigate('/customer/reservasi'); (form reservasi)
  };

  const handleViewReservationHistory = () => {
    navigate('/customer/riwayat-reservasi'); // Mengarahkan ke halaman riwayat reservasi
  };

  const handleViewPurchaseHistory = () => {
    navigate('/customer/riwayat-pesanan'); // Mengarahkan ke halaman riwayat pesanan produk
  };

  return (
    <div className="space-y-12">
      <HeroSection onReservasiClick={handleReservasiClick} />

      <HeroPrediksiPage/>

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

      <section className="max-w-7xl mx-auto px-4 py-10">
        <ReservationStatus customerId={user?.id} />
      </section>

      {/* Tambahkan CustomerFeedbackDisplay di sini */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <CustomerFeedbackDisplay />
      </section>


     
      
      <PromoSection />
      <ServicesSection />
      <ProductsSection />
      <AboutUsSection />
      <FAQSection />

      {/* FeedbackModal di Dashboard sekarang mungkin berlebihan jika feedback hanya dari riwayat reservasi */}
      {/* {showFeedback && (
      
      {/* Modal Feedback - hanya tampil jika benar-benar dibutuhkan */}
      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )} */}
    </div>
  );
}