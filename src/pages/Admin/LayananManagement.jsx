import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js";

// ✅ Perbaikan fungsi formatCurrency
function formatCurrency(num) {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parsed);
}

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
  exit: { opacity: 0, scale: 0.9 },
};

export default function LayananManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    gambar: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("treatments").select("*").order("id", { ascending: true });
      if (error) throw error;
      setServices(data);
    } catch (err) {
      setError("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ name: "", gambar: "", price: "", description: "" });
    setEditId(null);
  };

  const toggleForm = () => {
    if (!showForm) {
      resetForm();
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleAddService = async () => {
    const priceAsNumber = parseFloat(formData.price);
    if (!formData.name || !formData.gambar || !formData.description || isNaN(priceAsNumber)) {
      setError("Semua kolom harus diisi dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.from("treatments").insert([
        {
          name: formData.name,
          gambar: formData.gambar,
          price: priceAsNumber,
          description: formData.description,
        },
      ]).select();

      if (error) throw error;

      setServices((prev) => [...prev, data[0]]);
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError("Gagal menambah layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      gambar: service.gambar,
      price: service.price.toString(), // Ensure price is string for input
      description: service.description,
    });
    setEditId(service.id);
    setShowForm(true);
  };

  const handleUpdateService = async () => {
    const priceAsNumber = parseFloat(formData.price);
    if (!formData.name || !formData.gambar || !formData.description || isNaN(priceAsNumber)) {
      setError("Isi semua data dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("treatments")
        .update({
          name: formData.name,
          gambar: formData.gambar,
          price: priceAsNumber,
          description: formData.description,
        })
        .eq("id", editId)
        .select();

      if (error) throw error;

      setServices((prev) => prev.map((s) => (s.id === editId ? data[0] : s)));
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError("Gagal memperbarui layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("treatments").delete().eq("id", deleteId);
      if (error) throw error;

      setServices((prev) => prev.filter((s) => s.id !== deleteId));
      setDeleteId(null);
      setError(null);
    } catch (err) {
      setError("Gagal menghapus layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Layanan</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Cari layanan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleForm}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              {showForm ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  Batal
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  Tambah Layanan
                </>
              )}
            </motion.button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{editId ? "Edit Layanan" : "Tambah Layanan Baru"}</h2>
              <div className="grid grid-cols-1 gap-4">
                <input type="text" name="name" placeholder="Nama Layanan" value={formData.name} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
                <input type="text" name="gambar" placeholder="URL Gambar" value={formData.gambar} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
                <input type="number" name="price" placeholder="Harga" value={formData.price} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
                <input type="text" name="description" placeholder="Deskripsi" value={formData.description} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={toggleForm} className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">Batal</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={editId ? handleUpdateService : handleAddService} disabled={loading} className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${editId ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"}`}>
                  {loading ? (<><ArrowPathIcon className="w-4 h-4 animate-spin" /> Memproses...</>) : editId ? "Update Layanan" : "Simpan Layanan"}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && (
          <motion.div variants={popIn} initial="hidden" animate="visible" className="overflow-hidden rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Layanan</th>
                    <th className="px-4 py-4 text-left font-medium">Deskripsi</th> {/* Added Description Header */}
                    <th className="px-4 py-4 text-left font-medium">Gambar</th>
                    <th className="px-4 py-4 text-right font-medium">Harga</th>
                    <th className="px-4 py-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredServices.length > 0 ? (
                    filteredServices.map((service) => (
                      <tr key={service.id} className="hover:bg-white/20">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{service.name}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600"> {/* New Description cell */}
                          {service.description}
                        </td>
                        <td className="px-4 py-4">
                          <div className="w-16 h-16 mx-auto overflow-hidden rounded-lg bg-white/50 border border-white/30">
                            <img src={service.gambar} alt={service.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=No+Image"; }} />
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(service.price)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(service)} className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"><PencilIcon className="w-5 h-5" /></motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteId(service.id)} className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-all"><TrashIcon className="w-5 h-5" /></motion.button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Tidak ada layanan ditemukan.</td> {/* Adjusted colspan */}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {deleteId !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div variants={popIn} initial="hidden" animate="visible" exit="exit" className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Konfirmasi Hapus</h2>
                  <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <p className="mb-6 text-gray-600">
                  Anda akan menghapus layanan <span className="font-semibold text-red-600">{services.find((s) => s.id === deleteId)?.name}</span>. Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">Batal</motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={confirmDelete} disabled={loading} className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-2">
                    {loading ? (<><ArrowPathIcon className="w-4 h-4 animate-spin" /> Menghapus...</>) : "Hapus"}
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