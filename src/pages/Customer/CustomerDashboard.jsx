// src/pages/Customer/CustomerDashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import MemberPoints from '../../components/Customer/MemberPoints';
// import Notifications from '../../components/Customer/Notifications'; // Hapus komentar jika diperlukan
// import ReservationStatus from '../../components/Customer/ReservationStatus'; // Hapus komentar jika diperlukan
// import PurchaseHistory from '../../components/Customer/PurchaseHistory'; // Hapus komentar jika diperlukan
import FeedbackModal from '../../components/Customer/FeedbackModal';
import HeroSection from '../../components/Landing/HeroSection';
import ServicesSection from '../../components/Landing/ServicesSection';
import PromoSection from '../../components/Landing/PromoSection';
import ProductsSection from '../../components/Landing/ProductsSection';
import AboutUsSection from '../../components/Landing/AboutUsSection';
import FAQSection from '../../components/Landing/FAQSection';
import FormReservasi from '../../components/Landing/FormReservasi';
import HeroPrediksiPage from '../../components/Customer/HeroPrediksiPage';

// import AboutUsSection from '../../components/Landing/AboutUsSection'; // Hapus komentar jika diperlukan
// import FAQSection from '../../components/Landing/FAQSection'; // Hapus komentar jika diperlukan
import { useNavigate } from 'react-router-dom'; // Ini yang penting!

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [showFeedback, setShowFeedback] = useState(false);
  const navigate = useNavigate(); // Inisialisasi fungsi navigate

  useEffect(() => {
    const treatmentDone = true; // Logika ini perlu disesuaikan dengan status perawatan sebenarnya
    if (treatmentDone) setShowFeedback(false); // Pertimbangkan kapan harus menampilkan feedback
  }, []);

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback submitted:', feedback);
    alert('Terima kasih atas feedback Anda! Poin Anda bertambah.');
    setShowFeedback(false);
  };

  // Fungsi ini sekarang akan mengarahkan ke rute /customer/reservasi
  const handleReservasiClick = () => {
    navigate('/customer/reservasi'); // Mengarahkan ke halaman reservasi
  };

  return (
    <div className="space-y-12">
      {/* Hero section sekarang memicu navigasi */}
      <HeroSection onReservasiClick={handleReservasiClick} />

      <HeroPrediksiPage/>

      {/* Info Member */}
      {/* Informasi Member */}
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
      

      {/* Modal Feedback - hanya tampil jika benar-benar dibutuhkan */}
      {showFeedback && (
        <FeedbackModal
          onClose={() => setShowFeedback(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
}
