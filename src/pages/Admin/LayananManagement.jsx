import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js";

function formatCurrency(num) {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) return "Rp 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parsed);
}

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      resetForm();
    }
    setError(null);
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
      price: service.price.toString(),
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
    } catch (err) {
      setError("Gagal menghapus layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Layanan</h1>
            <p className="text-sm text-slate-500">Kelola katalog treatment/layanan The Rose Clinic</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari layanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 pl-10 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none transition-all text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={toggleForm}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl shadow-sm font-semibold text-sm transition-all ${
                showForm 
                ? "bg-slate-100 text-slate-600 border border-slate-200" 
                : "bg-[#101828] text-white hover:bg-slate-800"
              }`}
            >
              {showForm ? <XMarkIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              {showForm ? "Batal" : "Tambah Layanan"}
            </motion.button>
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm flex items-center gap-3">
            <span className="font-bold">Error:</span> {error}
          </motion.div>
        )}

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-6 rounded-full ${editId ? 'bg-amber-500' : 'bg-[#101828]'}`}></div>
                  {editId ? "Edit Detail Layanan" : "Tambah Layanan Baru"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Layanan</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Harga (Rp)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">URL Gambar</label>
                    <input type="text" name="gambar" value={formData.gambar} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi Layanan</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm resize-none" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button onClick={toggleForm} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-all text-sm">Batal</button>
                  <button 
                    onClick={editId ? handleUpdateService : handleAddService} 
                    disabled={loading}
                    className="px-8 py-2 text-white font-bold rounded-lg shadow-lg bg-[#101828] hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                  >
                    {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : (editId ? "Update Layanan" : "Simpan Layanan")}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#101828] text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Layanan</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Deskripsi</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Gambar</th>
                  <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider">Harga</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && !showForm ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <ArrowPathIcon className="w-8 h-8 animate-spin" />
                        <p>Sinkronisasi data...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{service.name}</td>
                      <td className="px-4 py-4 text-slate-500 text-sm max-w-xs truncate">{service.description}</td>
                      <td className="px-4 py-4">
                        <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden border border-slate-200">
                          <img src={service.gambar} alt={service.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-slate-900">{formatCurrency(service.price)}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(service)} className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all"><PencilIcon className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteId(service.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">Tidak ada layanan ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId !== null && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div variants={popIn} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrashIcon className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Hapus Layanan?</h2>
                <p className="text-slate-500 text-sm mb-8">Layanan <span className="font-bold text-slate-800">"{services.find(s => s.id === deleteId)?.name}"</span> akan dihapus permanen.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">Batal</button>
                  <button onClick={confirmDelete} className="flex-1 py-3 bg-[#101828] text-white font-bold rounded-xl shadow-lg text-sm hover:bg-slate-800 transition-all">Hapus</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}