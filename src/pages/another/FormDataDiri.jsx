import React, { useState } from 'react';
import {  HeartPulse, Stethoscope } from 'lucide-react';
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
    email: '',
    alamat: '',
    tanggal: '',
    layanan: '',
    dokter: '',
    catatan: ''
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
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
           Reservasi
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-300 transition"
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-300 transition"
            />
          </div>

          {/* Jenis Kelamin */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Jenis Kelamin
            </label>
            <select
              name="jenisKelamin"
              value={formData.jenisKelamin}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Pilih Jenis Kelamin --</option>
              <option value="Perempuan">Perempuan</option>
              <option value="Laki-laki">Laki-laki</option>
            </select>
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-300 transition"
              placeholder="085672"
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-300 transition"
              placeholder="email@domain.com"
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
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 hover:border-pink-300 transition resize-none"
              placeholder="Alamat lengkap"
            />
          </div>

          {/* Tanggal Reservasi */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              <Calendar className="w-4 h-4 mr-2" /> Tanggal Reservasi
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Layanan */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              <HeartPulse className="w-4 h-4 mr-2" /> Pilih Layanan
            </label>
            <select
              name="layanan"
              value={formData.layanan}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Pilih Layanan --</option>
              <option value="Konsultasi Umum">Konsultasi Umum</option>
              <option value="Perawatan Gigi">Perawatan Gigi</option>
              <option value="Kontrol Kecantikan">Kontrol Kecantikan</option>
              <option value="Pemeriksaan Lab">Pemeriksaan Lab</option>
            </select>
          </div>


           {/* Dokter */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              <Stethoscope className="w-4 h-4 mr-2" /> Pilih Layanan
            </label>
            <select
              name="layanan"
              value={formData.dokter}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                 <option value="">-- Pilih Dokter --</option>
                <option value="dr. Rina Kusuma">dr. Rina Kusuma</option>
                <option value="dr. Andi Wijaya">dr. Andi Wijaya</option>
                <option value="drg. Sinta Dewi">drg. Sinta Dewi</option>
                <option value="dr. Maya Indah">dr. Maya Indah</option>
            </select>
          </div>



          {/* Catatan */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Catatan 
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              rows="2"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              placeholder="Contoh: Alergi obat tertentu"
            />
          </div>

          {/* Tombol Submit */}
          <div className="col-span-2 flex justify-center">
            <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold text-lg py-3 rounded-xl shadow-md"
          >
            Simpan Data Diri
          </button>
          </div>
          
        </form>
      </div>

      {/* Popup Konfirmasi */}
      {submitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white border border-pink-200 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-green-600 mb-3">
              Data berhasil dikirim
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Terima kasih, <span className="font-semibold">{formData.nama}</span>.<br />
              Reservasi Anda untuk layanan <span className="font-semibold">{formData.layanan}</span> bersama <span className="font-semibold">{formData.dokter}</span> pada tanggal <span className="font-semibold">{formData.tanggal}</span> telah kami terima.
              Kami akan segera menghubungi Anda melalui WhatsApp.
            </p>

            <button
              onClick={handleClose}
              className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl hover:bg-pink-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
