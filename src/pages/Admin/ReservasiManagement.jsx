import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

const initialData = [
  {
    id: 1,
    nama: "Siti Aminah",
    tanggalLahir: "1995-08-12",
    jenisKelamin: "Perempuan",
    nohp: "081234567890",
    email: "siti@example.com",
    alamat: "Jl. Melati No. 10",
    tanggal: "2025-06-05",
    layanan: "Konsultasi Umum",
    dokter: "dr. Rina Kusuma",
    catatan: "Butuh pemeriksaan lanjutan",
  },
  {
    id: 2,
    nama: "Rizal Fadli",
    tanggalLahir: "1990-02-25",
    jenisKelamin: "Laki-laki",
    nohp: "082112223333",
    email: "rizal@example.com",
    alamat: "Jl. Kenanga No. 5",
    tanggal: "2025-06-06",
    layanan: "Periksa Gigi",
    dokter: "drg. Andi Wijaya",
    catatan: "Ada keluhan nyeri gigi belakang",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
  exit: { opacity: 0, scale: 0.9 }
};

export default function ReservasiManagement() {
  const [reservasi, setReservasi] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nama: "",
    tanggalLahir: "",
    jenisKelamin: "",
    nohp: "",
    email: "",
    alamat: "",
    tanggal: "",
    layanan: "",
    dokter: "",
    catatan: "",
  });
  const [searchNama, setSearchNama] = useState("");
  const [searchDokter, setSearchDokter] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSave = () => {
    setReservasi((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, ...editData } : item))
    );
    setEditingId(null);
    setEditData({
      nama: "",
      tanggalLahir: "",
      jenisKelamin: "",
      nohp: "",
      email: "",
      alamat: "",
      tanggal: "",
      layanan: "",
      dokter: "",
      catatan: "",
    });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setReservasi(reservasi.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = reservasi.filter((item) =>
    item.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
    item.dokter.toLowerCase().includes(searchDokter.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-800"
          >
            Manajemen Data Reservasi
          </motion.h1>
        </div>

        {/* Search Inputs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama pelanggan..."
              className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
              value={searchNama}
              onChange={(e) => setSearchNama(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berdasarkan dokter..."
              className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
              value={searchDokter}
              onChange={(e) => setSearchDokter(e.target.value)}
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div 
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Nama</th>
                  <th className="px-4 py-4 text-left">Tanggal Lahir</th>
                  <th className="px-4 py-4 text-left">Jenis Kelamin</th>
                  <th className="px-4 py-4 text-left">No HP</th>
                  <th className="px-4 py-4 text-left">Email</th>
                  <th className="px-4 py-4 text-left">Tanggal</th>
                  <th className="px-4 py-4 text-left">Layanan</th>
                  <th className="px-4 py-4 text-left">Dokter</th>
                  <th className="px-4 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-white/20"
                    >
                      {['nama', 'tanggalLahir', 'jenisKelamin', 'nohp', 'email', 'tanggal', 'layanan', 'dokter'].map((key) => (
                        <td key={key} className="px-4 py-3 whitespace-nowrap">
                          {editingId === item.id ? (
                            key === 'jenisKelamin' ? (
                              <select
                                name={key}
                                value={editData[key]}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                              >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                              </select>
                            ) : (
                              <input
                                name={key}
                                value={editData[key]}
                                onChange={handleChange}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                              />
                            )
                          ) : (
                            <span className={key === 'nama' ? "font-medium text-gray-800" : "text-gray-600"}>
                              {item[key]}
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {editingId === item.id ? (
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={handleSave}
                              className="p-1.5 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100 transition-all"
                            >
                              <CheckIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setEditingId(null)}
                              className="p-1.5 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-all"
                            >
                              <XMarkIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        ) : (
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(item)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-all"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                      Tidak ada data reservasi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Detail Modal */}
        {editingId && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={popIn}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Detail Reservasi
                </h3>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {Object.entries(editData).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key.split(/(?=[A-Z])/).join(' ')}
                    </label>
                    {key === 'jenisKelamin' ? (
                      <select
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                      >
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    ) : (
                      <input
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                >
                  Simpan Perubahan
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                variants={popIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Konfirmasi Hapus
                  </h3>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <p className="mb-6 text-gray-600">
                  Anda akan menghapus reservasi atas nama{' '}
                  <span className="font-semibold text-red-600">
                    {reservasi.find((r) => r.id === deleteId)?.nama}
                  </span>
                  . Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all"
                  >
                    Hapus
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}