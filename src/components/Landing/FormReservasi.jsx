// src/components/Landing/FormReservasi.jsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase'; // Pastikan path ini benar
import {
  User, Calendar, Phone, MapPin, Mail, X, HeartPulse, Stethoscope,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate untuk navigasi

export default function FormReservasi() { // Hapus prop { onClose } karena ini bukan lagi modal
  const [formData, setFormData] = useState({
    name: '', // Nama Lengkap
    tanggal_lahir: '',
    jenis_kelamin: '',
    no_hp: '', // Nomor HP
    email: '',
    alamat: '',
    tanggal_reservasi: '', // Tanggal Reservasi
    layanan: '', // Pilih Layanan
    dokter: '', // Pilih Dokter
    catatan: '', // Catatan
    status: 'Menunggu', // Status default
  });

  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        console.warn("User belum login.");
        // Opsional: Redirect ke halaman login jika user belum login
        // navigate('/login');
        return;
      }
      setUserId(data.user.id);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Silakan login terlebih dahulu untuk melakukan reservasi.");
      return;
    }

    const dataToInsert = { ...formData, user_id: userId };
    const { error } = await supabase.from("reservasi").insert([dataToInsert]);
    if (error) {
      alert("Gagal mengirim data: " + error.message);
      return;
    }
    setSubmitted(true);
    // Tidak perlu reset form langsung di sini jika akan menampilkan pesan sukses di halaman yang sama
  };

  const handleCloseSuccessModal = () => {
    setSubmitted(false);
    // Setelah submit berhasil dan modal pesan sukses ditutup, navigasi kembali ke dashboard customer
    navigate('/customer/dashboard');
  };

  return (
    <div className=" mx-auto bg-white rounded-xl p-8 lg:p-10 my-10 max-w-auto">
      <h1 className="font-playfair-display text-4xl lg:text-5xl font-bold text-center text-[#4A4A6A] mb-4">
        Buat Reservasi Anda
      </h1>
      <p className="font-montserrat text-lg text-center text-gray-600 mb-10">
        Isi formulir di bawah untuk menjadwalkan konsultasi atau layanan Anda.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Image Section */}
        <div className="flex-1 w-full lg:max-w-md">
          {/* Pastikan path gambar ini benar. Jika berada di folder 'public', gunakan path relatif. */}
          <img
            // src="https://i.pinimg.com/736x/b1/5f/7a/b15f7ae369932e902c59d63f486c0d49.jpg" 
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
              className="w-full bg-[#4A4A6A] text-white font-semibold text-lg py-3 rounded-lg shadow-md transition-colors hover:bg-[#E65A52] tracking-wider mt-8"
            >
              KIRIM RESERVASI
            </button>
          </form>
        </div>
      </div>

      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white border border-pink-200 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <button
              onClick={handleCloseSuccessModal} // Mengarahkan ke handleCloseSuccessModal
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
              onClick={handleCloseSuccessModal} // Mengarahkan ke handleCloseSuccessModal
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