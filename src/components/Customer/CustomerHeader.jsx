import React, { useState } from 'react';
import { Bell, LogOut, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CustomerHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { id: 1, message: 'Reservasi Facial Glow Anda diterima untuk 22 Juni 2025' },
    { id: 2, message: 'Produk Serum Vitamin C telah dikirim' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const goToLanding = () => {
    navigate('/');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center relative z-50">
      <h1 className="text-lg font-semibold text-indigo-700">Dashboard Customer</h1>

      <div className="flex items-center gap-4">
        <button
          className="text-indigo-600 hover:text-indigo-800"
          onClick={goToLanding}
          title="Kembali ke Beranda"
        >
          <Home className="w-6 h-6" />
        </button>

        <div className="relative">
          <button
            className="relative"
            onClick={() => setShowNotif(!showNotif)}
            title="Notifikasi"
          >
            <Bell className="w-6 h-6 text-indigo-600 hover:text-indigo-800 transition-colors" />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg p-4 space-y-2 z-50"
              >
                <h3 className="text-sm font-semibold text-indigo-700">Notifikasi</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {notifications.map((n) => (
                    <li key={n.id} className="bg-indigo-50 px-3 py-2 rounded-md shadow-sm">
                      {n.message}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-sm text-gray-600 hidden md:block">{user?.email}</div>

        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
          title="Logout"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default CustomerHeader;