import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, User, Mail, Phone, HeartPulse, Stethoscope } from 'lucide-react';

export default function FormReservasi() {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nohp: '',
    tanggal: '',
    layanan: '',
    dokter: '',
    catatan: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Data Reservasi:', formData);
  navigate('/data-diri'); // ⬅️ Redirect ke FormDataDiri
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-blue-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
           Reservasi 
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
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Masukkan nama Anda"
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
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@domain.com"
            />
          </div>

          {/* Nomor HP */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <Phone className="w-4 h-4 mr-2" /> Nomor HP (WhatsApp)
            </label>
            <input
              type="tel"
              name="nohp"
              value={formData.nohp}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="0852346"
            />
          </div>

          {/* Tanggal */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <CalendarDays className="w-4 h-4 mr-2" /> Tanggal Kunjungan
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Layanan */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <HeartPulse className="w-4 h-4 mr-2" /> Pilih Layanan
            </label>
            <select
              name="layanan"
              value={formData.layanan}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Pilih Layanan --</option>
              <option value="Konsultasi">Konsultasi</option>
              <option value="Perawatan Wajah">Perawatan Wajah</option>
              <option value="Kontrol Behel">Kontrol Behel</option>
            </select>
          </div>

          {/* Dokter */}
          <div>
            <label className="flex items-center text-gray-700 font-medium mb-1">
              <Stethoscope className="w-4 h-4 mr-2" /> Pilih Dokter
            </label>
            <select
              name="dokter"
              value={formData.dokter}
              onChange={handleChange}
              required
              className="w-full rounded-xl border px-4 py-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Pilih Dokter --</option>
              <option value="dr. Ayu">dr. Ayu</option>
              <option value="drg. Budi">drg. Budi</option>
              <option value="dr. Clara">dr. Clara</option>
            </select>
          </div>

          {/* Catatan */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">
              Catatan Tambahan (opsional)
            </label>
            <textarea
              name="catatan"
              value={formData.catatan}
              onChange={handleChange}
              rows="3"
              placeholder="Contoh: Saya alergi bahan tertentu..."
              className="w-full rounded-xl border px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white text-lg font-semibold py-3 rounded-xl shadow-md"
          >
            Kirim Reservasi
          </button>
        </form>
      </div>
    </div>
  );
}
