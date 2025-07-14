// src/components/Customer/ReservationStatus.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase'; // PASTIKAN PATH INI BENAR!
import FormFeedback from './FormFeedback'; // Import FormFeedback component

const ReservationStatus = ({ customerId }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null); // Untuk menandai reservasi mana yang akan di-feedback

  useEffect(() => {
    const fetchReservations = async () => {
      if (!customerId) {
        setLoading(false);
        setError("Customer ID tidak tersedia. Mohon login untuk melihat riwayat reservasi Anda.");
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reservasi')
          .select('id, layanan, dokter, tanggal_reservasi, catatan, status, created_at')
          .eq('user_id', customerId)
          .order('tanggal_reservasi', { ascending: false });

        if (error) {
          throw error;
        }

        setReservations(data);
      } catch (err) {
        console.error("Error fetching reservations:", err.message);
        setError("Gagal memuat riwayat reservasi. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();

    const reservationSubscription = supabase
      .channel('public:reservasi')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'reservasi',
        filter: `user_id=eq.${customerId}`
      }, payload => {
        console.log('Perubahan real-time diterima untuk reservasi!', payload);
        fetchReservations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(reservationSubscription);
    };
  }, [customerId]);

  const handleFeedbackClick = (reservationId) => {
    setSelectedReservationId(reservationId);
    setShowFeedbackModal(true);
  };

  const handleFeedbackSubmitted = () => {
    setShowFeedbackModal(false);
    setSelectedReservationId(null);
    // Mungkin perlu me-refresh daftar reservasi jika status feedback mempengaruhi tampilan
    // fetchReservations(); // Uncomment ini jika perlu refresh setelah feedback
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-gray-700">
        Memuat riwayat reservasi...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Riwayat Reservasi Anda</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Anda belum memiliki riwayat reservasi apapun. Mari buat reservasi pertama Anda!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Layanan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Dokter
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Tanggal & Waktu
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Catatan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r, index) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {r.layanan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {r.dokter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(r.tanggal_reservasi).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        r.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : r.status === 'Dikonfirmasi'
                          ? 'bg-blue-100 text-blue-800'
                          : r.status === 'Menunggu'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {r.catatan || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {r.status === 'Selesai' && (
                      <button
                        onClick={() => handleFeedbackClick(r.id)}
                        className="text-indigo-600 hover:text-indigo-900 ml-2"
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

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Berikan Feedback Anda</h3>
            <FormFeedback
              userId={customerId} // Pastikan customerId diteruskan
              reservationId={selectedReservationId} // Teruskan ID reservasi ke form feedback
              onSubmitted={handleFeedbackSubmitted}
              onClose={() => setShowFeedbackModal(false)} // Tambahkan onClose untuk menutup modal dari dalam form
            />
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStatus;