import React, { useState } from 'react';
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Mail,
  Venus,
  Mars,
  X
} from 'lucide-react';

export default function FormDataDiri() {
  const [formData, setFormData] = useState({
    nama: '',
    tanggalLahir: '',
    jenisKelamin: '',
    nohp: '',
    alamat: '',
    email: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data Diri:', formData);
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 px-4 py-10 relative">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          📝 Formulir Data Diri
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nama */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <User className="w-4 h-4 mr-2" /> Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Tanggal Lahir */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <Calendar className="w-4 h-4 mr-2" /> Tanggal Lahir
            </label>
            <input
              type="date"
              name="tanggalLahir"
              value={formData.tanggalLahir}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              Jenis Kelamin
            </label>
            <div className="flex gap-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="jenisKelamin"
                  value="Perempuan"
                  checked={formData.jenisKelamin === 'Perempuan'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <Venus className="w-4 h-4 mr-1" /> Perempuan
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="jenisKelamin"
                  value="Laki-laki"
                  checked={formData.jenisKelamin === 'Laki-laki'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <Mars className="w-4 h-4 mr-1" /> Laki-laki
              </label>
            </div>
          </div>

          {/* Nomor HP */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <Phone className="w-4 h-4 mr-2" /> Nomor HP
            </label>
            <input
              type="tel"
              name="nohp"
              value={formData.nohp}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          {/* Alamat */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <MapPin className="w-4 h-4 mr-2" /> Alamat
            </label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows="2"
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
              placeholder="Alamat lengkap"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <Mail className="w-4 h-4 mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="email@example.com"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition text-white text-lg font-semibold py-3 rounded-xl shadow-md"
          >
            Simpan Data Diri
          </button>
        </form>
      </div>

      {/* ✅ POPUP KONFIRMASI */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white border border-pink-200 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-green-600 mb-3 text-center">
            Data berhasil dikirim
            </h2>
            <p className="text-gray-700 text-base text-center leading-relaxed">
            Terima kasih, <span className="font-semibold">{formData.nama}</span>.
            Data reservasi dan informasi diri Anda telah berhasil kami terima
            Kami akan segera menghubungi Anda melalui WhatsApp.
            </p>

            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
