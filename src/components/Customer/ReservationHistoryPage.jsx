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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-lg text-gray-700">Memuat riwayat reservasi Anda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <h1 className="text-4xl font-extrabold tracking-tight text-center">
            Riwayat Reservasi Anda 📅
          </h1>
          <p className="mt-4 text-lg leading-6 text-center opacity-90">
            Telusuri semua reservasi Anda, dari yang telah selesai hingga yang akan datang.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {reservations.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">Belum ada riwayat reservasi yang ditemukan.</p>
              <Link to="/customer/reservasi" className="mt-4 inline-block text-blue-600 hover:underline">
                Buat Reservasi Pertama Anda Sekarang!
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id} // Gunakan ID unik dari Supabase
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 transition transform hover:scale-[1.01] hover:shadow-md duration-300 ease-in-out"
                >
                  <div className="flex justify-between items-start mb-2">
                    {/* Menggunakan layanan dari data Supabase */}
                    <h3 className="text-xl font-bold text-gray-900">{reservation.layanan}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        reservation.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : reservation.status === 'Dijadwalkan' || reservation.status === 'Menunggu'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Nama Lengkap:</span> {reservation.name}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">ID Reservasi:</span> {reservation.id}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Tanggal Reservasi:</span> {reservation.tanggal_reservasi}
                  </p>
                  {/* Waktu tidak ada di form, bisa ditambahkan jika diperlukan */}
                  {/* <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Waktu:</span> {reservation.time} 
                  </p> */}
                  <p className="text-gray-600 text-sm mb-1">
                    <span className="font-medium">Dokter/Terapis:</span> {reservation.dokter}
                  </p>
                  {reservation.catatan && (
                    <p className="text-gray-600 text-sm mt-2 italic">
                      Catatan: "{reservation.catatan}"
                    </p>
                  )}
                  {/* Contoh tombol aksi, bisa disesuaikan */}
                  {reservation.status === 'Menunggu' || reservation.status === 'Dijadwalkan' && (
                    <div className="mt-4 flex gap-2">
                      <button className="text-sm px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200">
                        Ubah
                      </button>
                      <button className="text-sm px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200">
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
  );
}