// src/components/Customer/ReservationStatus.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import FormFeedback from './FormFeedback';

const ReservationStatus = ({ customerId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!customerId) {
        setLoading(false);
        setError("Customer ID tidak tersedia. Mohon login terlebih dahulu.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reservasi')
          .select('id, layanan, dokter, tanggal_reservasi, catatan, status, created_at')
          .eq('user_id', customerId)
          .order('tanggal_reservasi', { ascending: false });

        if (error) throw error;
        setReservations(data);
      } catch (err) {
        setError("Gagal memuat data reservasi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();

    const subscription = supabase
      .channel('public:reservasi')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reservasi',
        filter: `user_id=eq.${customerId}`
      }, () => {
        fetchReservations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [customerId]);

  const handleFeedbackClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmitted = () => {
    setShowFeedbackModal(false);
    setSelectedReservation(null);
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-600">
        Memuat data reservasi...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Riwayat Reservasi Anda</h2>

      {reservations.length === 0 ? (
        <p className="text-gray-600 text-center">Belum ada riwayat reservasi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-indigo-50 text-indigo-700">
              <tr>
                <th className="px-6 py-3 text-left uppercase font-medium">No</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Layanan</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Dokter</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Tanggal</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Status</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Catatan</th>
                <th className="px-6 py-3 text-left uppercase font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r, index) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{r.layanan}</td>
                  <td className="px-6 py-4 text-gray-600">{r.dokter}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(r.tanggal_reservasi).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      r.status === 'Selesai' ? 'bg-green-100 text-green-800' :
                      r.status === 'Dikonfirmasi' ? 'bg-blue-100 text-blue-800' :
                      r.status === 'Menunggu' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{r.catatan || '-'}</td>
                  <td className="px-6 py-4">
                    {r.status === 'Selesai' && (
                      <button
                        onClick={() => handleFeedbackClick(r)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Ayo isi feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showFeedbackModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <FormFeedback
              userId={customerId}
              reservationId={selectedReservation.id}
              treatmentName={selectedReservation.layanan}
              onSubmitted={handleFeedbackSubmitted}
              onClose={() => setShowFeedbackModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;
