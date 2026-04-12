import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js";

// Helper function to format currency
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

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    kategori: "",
    tanggal_masuk: "",
    stok_saat_ini: "",
    total_jual: "",
    harga: "",
    status: "Tersedia",
    tanggal_update: "",
  });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setInventory(data);
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
    setFormData({
      name: "",
      kategori: "",
      tanggal_masuk: "",
      stok_saat_ini: "",
      total_jual: "",
      harga: "",
      status: "Tersedia",
      tanggal_update: "",
    });
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

  const handleAddItem = async () => {
    const { name, kategori, tanggal_masuk, stok_saat_ini, total_jual, harga, status } = formData;
    if (!name || !kategori || !tanggal_masuk || stok_saat_ini === "" || total_jual === "" || harga === "" || !status) {
      setError("Semua kolom harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const formattedDateMasuk = new Date(tanggal_masuk).toISOString().split("T")[0];
      const formattedDateUpdate = new Date().toISOString().split("T")[0];
      const statusBoolean = status === "Tersedia";

      const { data, error } = await supabase.from("inventory").insert([
        {
          name,
          kategori,
          tanggal_masuk: formattedDateMasuk,
          stok_saat_ini: Number(stok_saat_ini),
          total_jual: Number(total_jual),
          harga: Number(harga),
          status: statusBoolean,
          tanggal_update: formattedDateUpdate,
        },
      ]).select();
      if (error) throw error;

      setInventory((prev) => [data[0], ...prev]);
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError("Gagal menambah item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      kategori: item.kategori,
      tanggal_masuk: item.tanggal_masuk,
      stok_saat_ini: item.stok_saat_ini,
      total_jual: item.total_jual,
      harga: item.harga,
      status: item.status ? "Tersedia" : "Habis",
      tanggal_update: item.tanggal_update,
    });
    setEditId(item.id);
    setShowForm(true);
  };

  const handleUpdateItem = async () => {
    const { name, kategori, tanggal_masuk, stok_saat_ini, total_jual, harga, status } = formData;
    if (!name || !kategori || !tanggal_masuk || stok_saat_ini === "" || total_jual === "" || harga === "" || !status) {
      setError("Isi semua data dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const formattedDateMasuk = new Date(tanggal_masuk).toISOString().split("T")[0];
      const formattedDateUpdate = new Date().toISOString().split("T")[0];
      const statusBoolean = status === "Tersedia";

      const { data, error } = await supabase
        .from("inventory")
        .update({
          name,
          kategori,
          tanggal_masuk: formattedDateMasuk,
          stok_saat_ini: Number(stok_saat_ini),
          total_jual: Number(total_jual),
          harga: Number(harga),
          status: statusBoolean,
          tanggal_update: formattedDateUpdate,
        })
        .eq("id", editId)
        .select();
      if (error) throw error;

      setInventory((prev) => prev.map((i) => (i.id === editId ? data[0] : i)));
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError("Gagal memperbarui item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("inventory").delete().eq("id", deleteId);
      if (error) throw error;
      setInventory((prev) => prev.filter((i) => i.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Gagal menghapus item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Inventory</h1>
            <p className="text-sm text-slate-500">Kelola stok produk The Rose Clinic Anda</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 pl-10 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none transition-all text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
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
              {showForm ? "Batal" : "Tambah Produk"}
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
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }} 
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-6 rounded-full ${editId ? 'bg-amber-500' : 'bg-[#101828]'}`}></div>
                  {editId ? "Edit Detail Produk" : "Input Produk Baru"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Produk</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Kategori</label>
                    <input type="text" name="kategori" value={formData.kategori} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tanggal Masuk</label>
                    <input type="date" name="tanggal_masuk" value={formData.tanggal_masuk} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Harga Satuan</label>
                    <input type="number" name="harga" value={formData.harga} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Stok</label>
                    <input type="number" name="stok_saat_ini" value={formData.stok_saat_ini} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Total Terjual</label>
                    <input type="number" name="total_jual" value={formData.total_jual} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm">
                      <option value="Tersedia">Tersedia</option>
                      <option value="Habis">Habis</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button onClick={toggleForm} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-all text-sm">Batal</button>
                  <button 
                    onClick={editId ? handleUpdateItem : handleAddItem} 
                    disabled={loading}
                    className="px-8 py-2 text-white font-bold rounded-lg shadow-lg bg-[#101828] hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                  >
                    {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : (editId ? "Update Data" : "Simpan Produk")}
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
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nama Produk</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Kategori</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Tgl Masuk</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Stok</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Terjual</th>
                  <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider">Harga</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Tgl Update</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">{item.name}</td>
                      <td className="px-4 py-4 text-slate-500 text-sm">{item.kategori}</td>
                      <td className="px-4 py-4 text-center text-slate-500 text-sm">{item.tanggal_masuk}</td>
                      <td className="px-4 py-4 text-center font-medium text-slate-700">{item.stok_saat_ini}</td>
                      <td className="px-4 py-4 text-center text-slate-500">{item.total_jual}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-900">{formatCurrency(item.harga)}</td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.status ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {item.status ? "Tersedia" : "Habis"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center text-slate-400 text-xs">{item.tanggal_update}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(item)} className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all" title="Edit"><PencilIcon className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteId(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Hapus"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      {loading ? (
                        <div className="flex flex-col items-center gap-2 text-slate-400">
                          <ArrowPathIcon className="w-8 h-8 animate-spin" />
                          <p>Menghubungkan ke server...</p>
                        </div>
                      ) : (
                        <p className="text-slate-400 italic">Tidak ada data produk ditemukan.</p>
                      )}
                    </td>
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
                <h2 className="text-xl font-bold text-slate-800 mb-2">Hapus Produk?</h2>
                <p className="text-slate-500 text-sm mb-8">Data <span className="font-bold text-slate-800">"{inventory.find(i => i.id === deleteId)?.name}"</span> akan dihapus permanen.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm">Batal</button>
                  <button onClick={confirmDelete} className="flex-1 py-3 bg-[#101828] text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg transition-all text-sm">Hapus</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}