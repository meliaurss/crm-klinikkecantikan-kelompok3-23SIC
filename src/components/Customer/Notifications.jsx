import React from 'react';

const Notifications = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-indigo-600 mb-4">Notifikasi</h2>
      <ul className="list-disc ml-5 text-sm space-y-2">
        <li>Reservasi Facial Glow Anda diterima untuk 22 Juni 2025</li>
        <li>Produk Serum Vitamin C telah dikirim</li>
      </ul>
    </div>
  );
};

export default Notifications;