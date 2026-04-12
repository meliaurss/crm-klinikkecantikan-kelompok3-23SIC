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
      <div className="bg-white p-8 rounded-sm shadow-sm border border-[#e8ecf1] text-center font-['DM_Sans',sans-serif]">
        <p className="text-[13px] text-[#5a6a7e] uppercase tracking-widest">Memuat data reservasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#FFF0F0] border border-[#FFD6D6] p-6 rounded-sm shadow-sm text-center font-['DM_Sans',sans-serif]">
        <p className="text-[#D32F2F] text-[14px]">{error}</p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>
      
      <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-[#e8ecf1] font-['DM_Sans',sans-serif]">
        <h2 className="text-2xl md:text-3xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-8 border-b border-[#e8ecf1] pb-4">
          Riwayat Reservasi Anda
        </h2>

        {reservations.length === 0 ? (
          <p className="text-[#5a6a7e] text-center py-10">Belum ada riwayat reservasi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead className="bg-[#f4f6f8] border-b border-[#e8ecf1]">
                <tr>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">No</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Layanan</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Dokter</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Tanggal</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Status</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Catatan</th>
                  <th className="px-6 py-4 text-[11px] text-[#5a6a7e] uppercase tracking-widest font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8ecf1]">
                {reservations.map((r, index) => (
                  <tr key={r.id} className="hover:bg-[#fcfcfc] transition-colors duration-200">
                    <td className="px-6 py-5 text-[14px] text-[#5a6a7e]">{index + 1}</td>
                    <td className="px-6 py-5 text-[14px] font-medium text-[#293A52]">{r.layanan}</td>
                    <td className="px-6 py-5 text-[14px] text-[#5a6a7e]">{r.dokter}</td>
                    <td className="px-6 py-5 text-[14px] text-[#5a6a7e]">
                      {new Date(r.tanggal_reservasi).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-[10px] font-medium uppercase tracking-widest border rounded-sm ${
                        r.status === 'Selesai' ? 'bg-[#EEF7F2] text-[#287D3C] border-[#CDE7D5]' :
                        r.status === 'Dikonfirmasi' ? 'bg-[#F0F4F8] text-[#293A52] border-[#CCD4E1]' :
                        r.status === 'Menunggu' ? 'bg-[#FCF9F2] text-[#9E730A] border-[#D4AF37]' :
                        'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[14px] text-[#5a6a7e]">{r.catatan || '-'}</td>
                    <td className="px-6 py-5">
                      {r.status === 'Selesai' && (
                        <button
                          onClick={() => handleFeedbackClick(r)}
                          className="text-[13px] font-medium text-[#B8860B] hover:text-[#9E730A] transition-colors border-b border-transparent hover:border-[#9E730A]"
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
          <div className="fixed inset-0 bg-[#293A52]/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity">
            <div className="bg-white w-full max-w-4xl rounded-sm p-8 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative border border-[#e8ecf1]">
              <button
                onClick={() => setShowFeedbackModal(false)}
                className="absolute top-5 right-6 text-[#a8b5c7] hover:text-[#293A52] text-3xl font-light transition-colors leading-none"
                aria-label="Tutup"
              >
                &times;
              </button>
              
              <div className="mb-6 border-b border-[#e8ecf1] pb-4">
                <h3 className="text-2xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
                  Formulir Feedback
                </h3>
                <p className="mt-1 text-[14px] text-[#5a6a7e]">
                  Bagikan pengalaman Anda tentang layanan ini.
                </p>
              </div>

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
    </>
  );
};

export default ReservationStatus;