// src/pages/Customer/ReservationHistoryPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabase'; // Pastikan path ini benar

export default function ReservationHistoryPage() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mendapatkan user yang sedang login
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          setError("Anda harus login untuk melihat riwayat reservasi.");
          setLoading(false);
          return;
        }
        const userId = userData.user.id;

        // Mengambil data reservasi dari tabel 'reservasi' untuk user_id yang sesuai
        const { data, error: fetchError } = await supabase
          .from('reservasi')
          .select('*') // Ambil semua kolom
          .eq('user_id', userId) // Filter berdasarkan user_id
          .order('tanggal_reservasi', { ascending: false }); // Urutkan dari yang terbaru

        if (fetchError) {
          setError("Gagal mengambil riwayat reservasi: " + fetchError.message);
        } else {
          setReservations(data);
        }
      } catch (err) {
        setError("Terjadi kesalahan tak terduga: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []); // Dependensi kosong agar hanya berjalan sekali saat komponen dimuat

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-['DM_Sans',sans-serif]">
        <p className="text-[14px] text-[#5a6a7e] uppercase tracking-widest">Memuat riwayat reservasi Anda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-['DM_Sans',sans-serif]">
        <div className="bg-[#FFF0F0] border border-[#FFD6D6] text-[#D32F2F] px-6 py-4 rounded-sm shadow-sm text-center" role="alert">
          <strong className="font-medium mr-2">Error!</strong>
          <span className="block sm:inline text-[14px]">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="min-h-screen bg-[#f4f6f8] py-12 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
        <div className="max-w-4xl mx-auto bg-white rounded-sm shadow-sm border border-[#e8ecf1] overflow-hidden">
          <div className="px-6 py-10 sm:px-10 sm:py-12 bg-white text-center border-b border-[#e8ecf1]">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
              Riwayat Reservasi Anda
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-[#5a6a7e] font-light">
              Telusuri semua reservasi Anda, dari yang telah selesai hingga yang akan datang.
            </p>
          </div>

          <div className="p-6 sm:p-10">
            {reservations.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#CCD4E1] rounded-sm">
                <p className="text-[14px] text-[#5a6a7e] mb-4">Belum ada riwayat reservasi yang ditemukan.</p>
                <Link to="/customer/reservasi" className="inline-block px-6 py-3 bg-[#293A52] text-white text-[13px] uppercase tracking-wider font-medium rounded-sm hover:bg-[#344a66] transition-colors">
                  Buat Reservasi Pertama Anda Sekarang!
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id} // Gunakan ID unik dari Supabase
                    className="bg-[#fcfcfc] border border-[#e8ecf1] rounded-sm p-6 transition-all duration-300 hover:shadow-md hover:border-[#CCD4E1]"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-[#e8ecf1] gap-4">
                      {/* Menggunakan layanan dari data Supabase */}
                      <h3 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">{reservation.layanan}</h3>
                      <span
                        className={`px-3 py-1 rounded-sm text-[11px] uppercase tracking-widest font-medium border ${
                          reservation.status === 'Selesai'
                            ? 'bg-[#EEF7F2] text-[#287D3C] border-[#CDE7D5]'
                            : reservation.status === 'Dijadwalkan' || reservation.status === 'Menunggu'
                            ? 'bg-[#F0F4F8] text-[#293A52] border-[#CCD4E1]'
                            : 'bg-[#FFF0F0] text-[#D32F2F] border-[#FFD6D6]'
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                      <p className="text-[#5a6a7e] text-[14px]">
                        <span className="font-medium text-[#293A52]">Nama Lengkap:</span> {reservation.name}
                      </p>
                      <p className="text-[#5a6a7e] text-[14px]">
                        <span className="font-medium text-[#293A52]">ID Reservasi:</span> {reservation.id.substring(0,8).toUpperCase()}
                      </p>
                      <p className="text-[#5a6a7e] text-[14px]">
                        <span className="font-medium text-[#293A52]">Tanggal Reservasi:</span> {reservation.tanggal_reservasi}
                      </p>
                      {/* Waktu tidak ada di form, bisa ditambahkan jika diperlukan */}
                      {/* <p className="text-[#5a6a7e] text-[14px]">
                        <span className="font-medium text-[#293A52]">Waktu:</span> {reservation.time} 
                      </p> */}
                      <p className="text-[#5a6a7e] text-[14px]">
                        <span className="font-medium text-[#293A52]">Dokter/Terapis:</span> {reservation.dokter}
                      </p>
                    </div>
                    
                    {reservation.catatan && (
                      <p className="text-[13px] text-[#5a6a7e] mt-4 pt-4 border-t border-dashed border-[#e8ecf1] italic">
                        Catatan: "{reservation.catatan}"
                      </p>
                    )}
                    {/* Contoh tombol aksi, bisa disesuaikan */}
                    {reservation.status === 'Menunggu' || reservation.status === 'Dijadwalkan' && (
                      <div className="mt-6 flex gap-3">
                        <button className="text-[12px] uppercase tracking-wider px-5 py-2.5 border border-[#293A52] text-[#293A52] rounded-sm hover:bg-[#F0F4F8] transition duration-200">
                          Ubah
                        </button>
                        <button className="text-[12px] uppercase tracking-wider px-5 py-2.5 border border-[#D32F2F] text-[#D32F2F] rounded-sm hover:bg-[#FFF0F0] transition duration-200">
                          Batalkan
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}