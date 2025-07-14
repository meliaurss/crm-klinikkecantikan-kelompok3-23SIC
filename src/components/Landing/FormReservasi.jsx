// src/components/Landing/FormReservasi.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase'; // Pastikan path ini benar
import {
  User, Calendar, Phone, MapPin, Mail, X, HeartPulse, Stethoscope,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FormReservasi() {
  const [formData, setFormData] = useState({
    name: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    no_hp: '',
    email: '',
    alamat: '',
    tanggal_reservasi: '',
    layanan: '',
    dokter: '',
    catatan: '',
    status: 'Menunggu',
  });

  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndListenUser = async () => {
      setUserLoading(true);

      // Ambil user saat ini
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.warn("User belum login atau gagal mengambil data user:", error);
        setUserId(null); // Atur userId ke null jika ada error atau tidak ada user
      } else {
        setUserId(data.user.id);
        console.log("User ID fetched successfully on component mount:", data.user.id);
      }
      setUserLoading(false);

      // Tambahkan listener untuk perubahan state autentikasi
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('Auth event:', event, 'Session:', session);
          if (event === "SIGNED_IN" && session?.user) {
            setUserId(session.user.id);
            console.log("User signed in, ID updated:", session.user.id);
          } else if (event === "SIGNED_OUT") {
            setUserId(null);
            console.log("User signed out, ID set to null.");
            // Opsional: Redirect ke halaman login jika user logout
            // navigate('/login');
          }
          // Pastikan userLoading diatur ke false setelah event auth state berubah
          setUserLoading(false);
        }
      );

      // Cleanup listener saat komponen di-unmount
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    fetchAndListenUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userLoading) {
      alert("Sedang memuat data user, mohon tunggu sebentar.");
      console.log("Submission blocked: User data still loading.");
      return;
    }
    if (!userId) {
      alert("Anda harus login untuk membuat reservasi.");
      console.log("Submission blocked: No user ID found (user not logged in).");
      // Redirect ke halaman login
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    const dataToInsert = {
      user_id: userId, // Pastikan ini selalu terisi dengan ID user yang valid
      name: formData.name,
      tanggal_lahir: formData.tanggal_lahir || null,
      jenis_kelamin: formData.jenis_kelamin,
      no_hp: formData.no_hp,
      email: formData.email,
      alamat: formData.alamat,
      tanggal_reservasi: formData.tanggal_reservasi || null,
      layanan: formData.layanan,
      dokter: formData.dokter, // Nama kolom 'dokter' sesuai tabel Supabase
      catatan: formData.catatan || '',
      status: formData.status,
    };

    console.log("Data akan dikirim ke Supabase:", dataToInsert); // Log data sebelum insert

    const { error } = await supabase.from("reservasi").insert([dataToInsert]);

    setIsSubmitting(false);

    if (error) {
      console.error("Supabase Insert Error Detail:", JSON.stringify(error, null, 2));
      if (error.code === "23503") { // Foreign key violation error code
        alert("Terjadi masalah dengan akun Anda. Silakan coba login ulang atau daftarkan akun baru."); // Pesan lebih spesifik
      } else {
        alert("Gagal mengirim data: " + error.message);
      }
      return;
    }

    setSubmitted(true);
    // Navigasi ke dashboard customer setelah sukses
    navigate('/customer/dashboard');
  };

  const handleCloseSuccessModal = () => {
    setSubmitted(false);
    setFormData({ // Reset form
      name: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      no_hp: '',
      email: '',
      alamat: '',
      tanggal_reservasi: '',
      layanan: '',
      dokter: '',
      catatan: '',
      status: 'Menunggu',
    });
    // Navigasi ke dashboard customer
    navigate('/customer/dashboard');
  };

  // Render kondisional berdasarkan status loading user dan login
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Memuat data user...</p>
      </div>
    );
  }

  // Jika user sudah selesai dimuat tapi userId kosong (tidak login)
  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-red-600 text-xl mb-4 text-center">
          Anda harus login untuk membuat reservasi.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 bg-[#FF6F61] text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-[#E65A52] tracking-wider"
        >
          Login Sekarang
        </button>
      </div>
    );
  }

  // Render formulir jika user sudah login (userId ada)
  return (
    <div className=" mx-auto bg-white rounded-xl p-8 lg:p-10 my-10 max-w-auto">
      <h1 className="font-playfair-display text-4xl lg:text-5xl font-bold text-center text-[#181C68] mb-4">
        Buat Reservasi Anda
      </h1>
      <p className="font-montserrat text-lg text-center text-gray-600 mb-10">
        Isi formulir di bawah untuk menjadwalkan konsultasi atau layanan Anda.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Image Section */}
        <div className="flex-1 w-full lg:max-w-md">
          <img
            src="https://i.pinimg.com/736x/b1/5f/7a/b15f7ae369932e902c59d63f486c0d49.jpg"
            alt="Aesthetic consultation"
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="flex-1 w-full ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Row 1: Nama, Tanggal Lahir, Jenis Kelamin */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="form-group">
                <label htmlFor="name" className="sr-only">Nama Lengkap *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nama Lengkap *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-gray-800 bg-gray-50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="tanggal_lahir" className="sr-only">Tanggal Lahir *</label>
                <input
                  type="date"
                  id="tanggal_lahir"
                  name="tanggal_lahir"
                  placeholder="Tanggal Lahir *"
                  value={formData.tanggal_lahir}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-gray-800 bg-gray-50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="jenis_kelamin" className="sr-only">Jenis Kelamin *</label>
                <select
                  id="jenis_kelamin"
                  name="jenis_kelamin"
                  value={formData.jenis_kelamin}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500 appearance-none bg-white pr-10 bg-gray-50"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%204%205%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M2%200L0%202h4L2%200zM2%205L0%203h4L2%205z%22%2F%3E%3C%2Fsvg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '8px 10px',
                  }}
                >
                  <option value="" disabled hidden>Pilih Jenis Kelamin *</option>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
            </div>

            {/* Form Row 2: Nomor HP, Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label htmlFor="no_hp" className="sr-only">Nomor HP *</label>
                <input
                  type="tel"
                  id="no_hp"
                  name="no_hp"
                  placeholder="Nomor HP *"
                  value={formData.no_hp}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-gray-800 bg-gray-50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email Anda *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Anda *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-gray-800 bg-gray-50"
                />
              </div>
            </div>

            {/* Form Row 3: Alamat */}
            <div className="form-group">
              <label htmlFor="alamat" className="sr-only">Alamat *</label>
              <textarea
                id="alamat"
                name="alamat"
                rows="3"
                placeholder="Alamat Lengkap *"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 resize-y text-gray-800 bg-gray-50"
              ></textarea>
            </div>

            {/* Form Row 4: Tanggal Reservasi, Pilih Layanan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label htmlFor="tanggal_reservasi" className="sr-only">Tanggal Reservasi *</label>
                <input
                  type="date"
                  id="tanggal_reservasi"
                  name="tanggal_reservasi"
                  placeholder="Tanggal Reservasi *"
                  value={formData.tanggal_reservasi}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-gray-800 bg-gray-50"
                />
              </div>
              <div className="form-group">
                <label htmlFor="layanan" className="sr-only">Pilih Layanan *</label>
                <select
                  id="layanan"
                  name="layanan"
                  value={formData.layanan}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500 appearance-none bg-white pr-10 bg-gray-50"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%204%205%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M2%200L0%202h4L2%200zM2%205L0%203h4L2%205z%22%2F%3E%3C%2Fsvg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '8px 10px',
                  }}
                >
                  <option value="" disabled hidden>Pilih Layanan *</option>
                  <option value="Konsultasi Umum">Konsultasi Umum</option>
                  <option value="Perawatan Gigi">Perawatan Gigi</option>
                  <option value="Kontrol Kecantikan">Kontrol Kecantikan</option>
                  <option value="Pemeriksaan Lab">Pemeriksaan Lab</option>
                </select>
              </div>
            </div>

            {/* Form Row 5: Pilih Dokter, Catatan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label htmlFor="dokter" className="sr-only">Pilih Dokter *</label>
                <select
                  id="dokter"
                  name="dokter"
                  value={formData.dokter}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-500 appearance-none bg-white pr-10 bg-gray-50"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%204%205%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M2%200L0%202h4L2%200zM2%205L0%203h4L2%205z%22%2F%3E%3C%2Fsvg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 10px center',
                    backgroundSize: '8px 10px',
                  }}
                >
                  <option value="" disabled hidden>Pilih Dokter *</option>
                  <option value="dr. Rina Kusuma">dr. Rina Kusuma</option>
                  <option value="dr. Andi Wijaya">dr. Andi Wijaya</option>
                  <option value="drg. Sinta Dewi">drg. Sinta Dewi</option>
                  <option value="dr. Maya Indah">dr. Maya Indah</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="catatan" className="sr-only">Catatan</label>
                <textarea
                  id="catatan"
                  name="catatan"
                  rows="2"
                  placeholder="Catatan (Contoh: Alergi obat tertentu)"
                  value={formData.catatan}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 resize-y text-gray-800 bg-gray-50"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !userId}
              className="w-full bg-[#181C68] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-colors hover:bg-[#E65A52] tracking-wider mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Mengirim...' : 'KIRIM RESERVASI'}
            </button>
          </form>
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white border border-pink-200 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <button
              onClick={handleCloseSuccessModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-green-600 mb-3">
              Reservasi Berhasil!
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Terima kasih, <span className="font-semibold">{formData.name}</span>.
              Reservasi Anda untuk layanan <span className="font-semibold">{formData.layanan}</span> bersama <span className="font-semibold">{formData.dokter}</span> pada tanggal <span className="font-semibold">{formData.tanggal_reservasi}</span> telah kami terima.
              Kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi.
            </p>
            <button
              onClick={handleCloseSuccessModal}
              className="mt-6 px-6 py-3 bg-[#4A4A6A] text-white font-semibold rounded-xl hover:bg-[#4A4A6A]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}