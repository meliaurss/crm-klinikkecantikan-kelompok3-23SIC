import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { supabase } from '../../supabase'; // PASTIKAN PATH INI BENAR!

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
  const [reservasi, setReservasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    id: null,
    name: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    no_hp: "",
    email: "",
    alamat: "",
    tanggal_reservasi: "", // Pastikan ini sesuai dengan nama kolom di DB Supabase Anda
    layanan: "",
    dokter: "",
    catatan: "",
    status: "",
    user_id: null, // Penting: Pastikan ini disertakan jika ada di DB dan ingin disimpan
  });
  const [searchTerm, setSearchTerm] = useState(""); // Ganti searchNama & searchDokter menjadi searchTerm
  const [deleteId, setDeleteId] = useState(null);

  // --- Ambil Data dari Supabase ---
  useEffect(() => {
    fetchReservasi();
    // Optional: Setup real-time listener if you want updates without manual refresh
    const channel = supabase
      .channel('public:reservasi')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservasi' }, payload => {
        console.log('Change received!', payload);
        fetchReservasi(); // Refetch data on any change
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Cleanup subscription on component unmount
    };
  }, []); // Dependensi kosong agar hanya berjalan sekali saat mount

  const fetchReservasi = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const { data, error } = await supabase
        .from('reservasi')
        .select('*') // Mengambil semua kolom yang ada di tabel 'reservasi'
        .order('created_at', { ascending: false }); // Urutkan berdasarkan tanggal dibuat

      if (error) {
        console.error("Error fetching reservasi:", error); // Log objek error lengkap
        setError(`Gagal memuat data reservasi: ${error.message}. Cek koneksi dan kebijakan RLS.`);
      } else {
        // Penting: Pastikan tanggal_lahir dan tanggal_resen diformat ke 'YYYY-MM-DD'
        // agar input type="date" dapat menampilkannya dengan benar.
        const formattedData = data.map(item => ({
          ...item,
          tanggal_lahir: item.tanggal_lahir ? new Date(item.tanggal_lahir).toISOString().split('T')[0] : '',
          tanggal_reservasi: item.tanggal_reservasi ? new Date(item.tanggal_reservasi).toISOString().split('T')[0] : '',
        }));
        setReservasi(formattedData);
        console.log("Data reservasi berhasil diambil:", formattedData);
      }
    } catch (err) {
      console.error("Unexpected error during fetchReservasi:", err);
      setError("Terjadi kesalahan tak terduga saat memuat data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    // Mengisi editData langsung dengan item dari Supabase.
    // Pastikan nilai tanggal diformat ke 'YYYY-MM-DD' untuk input type="date".
    setEditData({
      id: item.id,
      name: item.name || "",
      tanggal_lahir: item.tanggal_lahir || "",
      jenis_kelamin: item.jenis_kelamin || "",
      no_hp: item.no_hp || "",
      email: item.email || "",
      alamat: item.alamat || "",
      tanggal_reservasi: item.tanggal_reservasi || "", // Gunakan tanggal_resen
      layanan: item.layanan || "",
      dokter: item.dokter || "",
      catatan: item.catatan || "",
      status: item.status || "",
      user_id: item.user_id || null, // Pertahankan user_id
    });
  };

  // --- Simpan Perubahan ke Supabase ---
  const handleSave = async () => {
    if (!editingId) return;

    // Buat salinan data yang akan diupdate
    const dataToUpdate = { ...editData };
    delete dataToUpdate.id; // Hapus ID karena tidak perlu diupdate di payload
    // Opsional: Jika user_id tidak boleh diubah oleh admin, Anda bisa menghapusnya dari dataToUpdate
    // delete dataToUpdate.user_id;

    // Konversi string kosong menjadi null untuk kolom yang memungkinkan null di DB
    for (const key in dataToUpdate) {
        if (dataToUpdate[key] === "") {
            dataToUpdate[key] = null;
        }
    }

    try {
      const { error } = await supabase
        .from('reservasi')
        .update(dataToUpdate)
        .eq('id', editingId);

      if (error) {
        console.error("Error updating reservasi:", error); // Log objek error lengkap
        alert("Gagal menyimpan perubahan: " + error.message);
      } else {
        alert("Perubahan berhasil disimpan!");
        setEditingId(null);
        fetchReservasi(); // Refresh data setelah save
      }
    } catch (err) {
      console.error("Unexpected error during handleSave:", err);
      alert("Terjadi kesalahan tak terduga saat menyimpan data.");
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  // --- Konfirmasi Hapus dari Supabase ---
  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('reservasi')
        .delete()
        .eq('id', deleteId);

      if (error) {
        console.error("Error deleting reservasi:", error); // Log objek error lengkap
        alert("Gagal menghapus reservasi: " + error.message);
      } else {
        alert("Reservasi berhasil dihapus!");
        setDeleteId(null);
        fetchReservasi(); // Refresh data setelah delete
      }
    } catch (err) {
      console.error("Unexpected error during confirmDelete:", err);
      alert("Terjadi kesalahan tak terduga saat menghapus data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Filter data berdasarkan searchTerm di beberapa kolom
  const filteredData = reservasi.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.dokter.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.layanan.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.status.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      item.no_hp.toLowerCase().includes(lowerCaseSearchTerm) ||
      // Tambahkan kolom lain yang relevan untuk pencarian
      item.tanggal_reservasi.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700 text-lg">Memuat data reservasi...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={fetchReservasi}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

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

        {/* Search Input (Unified) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6" // Menghapus grid, jadi satu baris penuh
        >
          <input
            type="text"
            placeholder="Cari nama, dokter, layanan, status, atau lainnya..."
            className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="px-4 py-4 text-left">Tgl Reservasi</th> {/* Judul kolom disingkat */}
                  <th className="px-4 py-4 text-left">Layanan</th>
                  <th className="px-4 py-4 text-left">Dokter</th>
                  <th className="px-4 py-4 text-left">Status</th>
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
                      {/* Menggunakan nama kolom Supabase langsung untuk tampilan dan edit */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="name"
                            value={editData.name}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span className="font-medium text-gray-800">{item.name}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="date"
                            name="tanggal_lahir"
                            value={editData.tanggal_lahir}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.tanggal_lahir}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <select
                            name="jenis_kelamin"
                            value={editData.jenis_kelamin}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          >
                            <option value="">Pilih...</option> {/* Tambah opsi default */}
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        ) : (
                          <span>{item.jenis_kelamin}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="no_hp"
                            value={editData.no_hp}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.no_hp}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="email"
                            name="email"
                            value={editData.email}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.email}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="date"
                            name="tanggal_reservasi"
                            value={editData.tanggal_reservasi}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.tanggal_reservasi}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="layanan"
                            value={editData.layanan}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.layanan}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <input
                            type="text"
                            name="dokter"
                            value={editData.dokter}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          />
                        ) : (
                          <span>{item.dokter}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {editingId === item.id ? (
                          <select
                            name="status"
                            value={editData.status}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                          >
                            <option value="">Pilih...</option> {/* Tambah opsi default */}
                            <option value="Menunggu">Menunggu</option>
                            <option value="Dikonfirmasi">Dikonfirmasi</option>
                            <option value="Selesai">Selesai</option>
                            <option value="Dibatalkan">Dibatalkan</option>
                          </select>
                        ) : (
                          <span>{item.status}</span>
                        )}
                      </td>
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
                    <td colSpan="10" className="px-4 py-6 text-center text-gray-500">
                      Tidak ada data reservasi yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Detail Modal (untuk edit) */}
        <AnimatePresence>
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
                    Edit Detail Reservasi
                  </h3>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Pastikan nama key di sini sesuai dengan editData state (snake_case) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={editData.tanggal_lahir}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                    <select
                      name="jenis_kelamin"
                      value={editData.jenis_kelamin}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    >
                      <option value="">Pilih...</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
                    <input
                      type="text"
                      name="no_hp"
                      value={editData.no_hp}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                    <input
                      type="text"
                      name="alamat"
                      value={editData.alamat}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Reservasi</label>
                    <input
                      type="date"
                      name="tanggal_reservasi"
                      value={editData.tanggal_reservasi}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Layanan</label>
                    <input
                      type="text"
                      name="layanan"
                      value={editData.layanan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dokter</label>
                    <input
                      type="text"
                      name="dokter"
                      value={editData.dokter}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                    <textarea
                      name="catatan"
                      value={editData.catatan}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                      rows="2"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    >
                      <option value="">Pilih...</option>
                      <option value="Menunggu">Menunggu</option>
                      <option value="Dikonfirmasi">Dikonfirmasi</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
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
        </AnimatePresence>

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
                    {reservasi.find((r) => r.id === deleteId)?.name}
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