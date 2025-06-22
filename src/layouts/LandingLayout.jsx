import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingHeader from '../components/Landing/Header';
import Footer from '../components/Landing/Footer';
import FormReservasi from '../components/Landing/FormReservasi';

const LandingLayout = ({ children }) => {
  const [showReservasiForm, setShowReservasiForm] = useState(false);
  const { user } = useAuth();

  const openReservasiForm = () => {
    if (!user || user.role !== 'customer') {
      window.location.href = '/login';
    } else {
      setShowReservasiForm(true);
    }
  };

  const closeReservasiForm = () => setShowReservasiForm(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e6edff] via-[#f9f9ff] to-white overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
        <LandingHeader onReservasiClick={openReservasiForm} />
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children || <Outlet context={{ openReservasiForm }} />}
      </main>

      {/* Modal Form Reservasi */}
      {showReservasiForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white p-6 rounded-3xl w-full max-w-3xl overflow-y-auto max-h-[90vh] shadow-2xl relative">
            <FormReservasi onClose={closeReservasiForm} />
            <button
              onClick={closeReservasiForm}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingLayout;
