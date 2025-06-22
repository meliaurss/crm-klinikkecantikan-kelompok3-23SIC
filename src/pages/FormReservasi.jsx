import React, { useState } from 'react';
import {
  HeartPulse,
  Stethoscope,
  User,
  Calendar,
  Phone,
  MapPin,
  Mail,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FormReservasi({ onClose }) {
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
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-indigo-800/60 backdrop-blur-md"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        <motion.div
          className="relative z-10 w-full max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
            Reservasi
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Fields */}
            {[
              {
                label: 'Nama Lengkap',
                icon: <User className="w-4 h-4 mr-2" />, name: 'nama', type: 'text', placeholder: 'Masukkan nama lengkap'
              },
              {
                label: 'Tanggal Lahir',
                icon: <Calendar className="w-4 h-4 mr-2" />, name: 'tanggalLahir', type: 'date'
              },
              {
                label: 'Nomor HP',
                icon: <Phone className="w-4 h-4 mr-2" />, name: 'nohp', type: 'tel', placeholder: '085672...'
              },
              {
                label: 'Email',
                icon: <Mail className="w-4 h-4 mr-2" />, name: 'email', type: 'email', placeholder: 'email@domain.com'
              },
              {
                label: 'Alamat',
                icon: <MapPin className="w-4 h-4 mr-2" />, name: 'alamat', type: 'textarea', placeholder: 'Alamat lengkap'
              },
              {
                label: 'Tanggal Reservasi',
                icon: <Calendar className="w-4 h-4 mr-2" />, name: 'tanggal', type: 'date'
              },
            ].map((field, i) => (
              <div key={i} className="col-span-1">
                <label className="flex items-center text-gray-700 font-medium mb-1">
                  {field.icon} {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    rows="2"
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                )}
              </div>
            ))}

            {/* Jenis Kelamin */}
            <div>
              <label className="text-gray-700 font-medium mb-1 block">Jenis Kelamin</label>
              <select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">-- Pilih Jenis Kelamin --</option>
                <option value="Perempuan">Perempuan</option>
                <option value="Laki-laki">Laki-laki</option>
              </select>
            </div>

            {/* Layanan */}
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                <HeartPulse className="w-4 h-4 mr-2 inline" /> Pilih Layanan
              </label>
              <select
                name="layanan"
                value={formData.layanan}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                <Stethoscope className="w-4 h-4 mr-2 inline" /> Pilih Dokter
              </label>
              <select
                name="dokter"
                value={formData.dokter}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="">-- Pilih Dokter --</option>
                <option value="dr. Rina Kusuma">dr. Rina Kusuma</option>
                <option value="dr. Andi Wijaya">dr. Andi Wijaya</option>
                <option value="drg. Sinta Dewi">drg. Sinta Dewi</option>
                <option value="dr. Maya Indah">dr. Maya Indah</option>
              </select>
            </div>

            {/* Catatan */}
            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium mb-1 block">Catatan</label>
              <textarea
                name="catatan"
                value={formData.catatan}
                onChange={handleChange}
                rows="2"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                placeholder="Contoh: Alergi obat tertentu"
              />
            </div>

            {/* Tombol Submit */}
            <div className="md:col-span-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold text-lg py-3 rounded-xl shadow-md transition"
              >
                Simpan Data Diri
              </motion.button>
            </div>
          </form>

          {/* Konfirmasi */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
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
                  Terima kasih, <span className="font-semibold">{formData.nama}</span>. Reservasi Anda untuk layanan <span className="font-semibold">{formData.layanan}</span> bersama <span className="font-semibold">{formData.dokter}</span> pada tanggal <span className="font-semibold">{formData.tanggal}</span> telah kami terima.
                  Kami akan segera menghubungi Anda melalui WhatsApp.
                </p>

                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-pink-700"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
