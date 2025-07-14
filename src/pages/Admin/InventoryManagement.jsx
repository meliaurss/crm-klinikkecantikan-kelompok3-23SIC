import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js";

// Helper function to format currency
function formatCurrency(num) {
  const parsed = parseFloat(num);
  if (isNaN(parsed)) {
    return "Rp 0"; // Return a default formatted value if not a valid number
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(parsed);
}

// Framer Motion variants for fade-in/pop-in animations
const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
  exit: { opacity: 0, scale: 0.9 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 },
};

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // State for delete confirmation modal

  const [formData, setFormData] = useState({
    name: "",
    kategori: "",
    tanggal_masuk: "",
    stok_saat_ini: "",
    total_jual: "",
    harga: "",
    status: "Tersedia", // Set default for new items
    tanggal_update: "",
  });

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  // Fetches all inventory items from the 'inventory' table in Supabase
  const fetchInventory = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("created_at", { ascending: false }); // Assuming 'created_at' exists for ordering
      if (error) throw error;
      setInventory(data);
    } catch (err) {
      setError("Gagal memuat data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handles input changes for the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Resets the form to its initial empty state
  const resetForm = () => {
    setFormData({
      name: "",
      kategori: "",
      tanggal_masuk: "",
      stok_saat_ini: "",
      total_jual: "",
      harga: "",
      status: "Tersedia", // Reset to default status
      tanggal_update: "",
    });
    setEditId(null); // Clear edit ID
  };

  // Toggles the visibility of the add/edit form
  const toggleForm = () => {
    if (!showForm) {
      resetForm(); // Reset form when opening for a new addition
      setShowForm(true);
    } else {
      setShowForm(false);
      resetForm(); // Also reset when canceling
    }
    setError(null); // Clear any previous errors when toggling form
  };

  // Handles adding a new inventory item
  const handleAddItem = async () => {
    const { name, kategori, tanggal_masuk, stok_saat_ini, total_jual, harga, status } = formData;

    // Client-side validation
    if (!name || !kategori || !tanggal_masuk || stok_saat_ini === "" || total_jual === "" || harga === "" || !status) {
      setError("Semua kolom harus diisi!");
      return;
    }

    setLoading(true);
    try {
      // Format date for Supabase (YYYY-MM-DD)
      const formattedDateMasuk = new Date(tanggal_masuk).toISOString().split("T")[0];
      const formattedDateUpdate = new Date().toISOString().split("T")[0];

      // Convert status string to boolean (assuming Supabase 'status' column is boolean)
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

      setInventory((prev) => [...prev, data[0]]);
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError("Gagal menambah item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Pre-fills the form with item data for editing
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      kategori: item.kategori,
      tanggal_masuk: item.tanggal_masuk,
      stok_saat_ini: item.stok_saat_ini,
      total_jual: item.total_jual,
      harga: item.harga,
      status: item.status ? "Tersedia" : "Habis", // Convert boolean back to string
      tanggal_update: item.tanggal_update,
    });
    setEditId(item.id);
    setShowForm(true);
    setError(null); // Clear any previous errors when editing
  };

  // Handles updating an existing inventory item
  const handleUpdateItem = async () => {
    const { name, kategori, tanggal_masuk, stok_saat_ini, total_jual, harga, status } = formData;

    // Client-side validation
    if (!name || !kategori || !tanggal_masuk || stok_saat_ini === "" || total_jual === "" || harga === "" || !status) {
      setError("Isi semua data penting dengan benar.");
      return;
    }

    setLoading(true);
    try {
      // Format date for Supabase (YYYY-MM-DD)
      const formattedDateMasuk = new Date(tanggal_masuk).toISOString().split("T")[0];
      const formattedDateUpdate = new Date().toISOString().split("T")[0];

      // Convert status string to boolean
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
      setError(null);
    } catch (err) {
      setError("Gagal memperbarui item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handles deleting an inventory item after confirmation
  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("inventory").delete().eq("id", deleteId);
      if (error) throw error;
      setInventory((prev) => prev.filter((i) => i.id !== deleteId));
      setDeleteId(null); // Close the confirmation modal
      setError(null);
    } catch (err) {
      setError("Gagal menghapus item: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filters inventory items based on the search term (by name or category)
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Inventory</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Cari produk atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
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
                  Tambah Produk
                </>
              )}
            </motion.button>
          </div>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{editId ? "Edit Produk" : "Tambah Produk Baru"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Nama Produk" value={formData.name} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
                <input type="text" name="kategori" placeholder="Kategori" value={formData.kategori} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" />
                <input type="date" name="tanggal_masuk" placeholder="Tanggal Masuk" value={formData.tanggal_masuk} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" /> {/* Changed placeholder */}
                <input type="number" name="stok_saat_ini" placeholder="Stok Saat Ini" value={formData.stok_saat_ini} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" inputMode="numeric" pattern="[0-9]*" />
                <input type="number" name="total_jual" placeholder="Total Terjual" value={formData.total_jual} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" inputMode="numeric" pattern="[0-9]*" />
                <input type="number" name="harga" placeholder="Harga" value={formData.harga} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" inputMode="numeric" pattern="[0-9]*" />
                <input type="date" name="tanggal_update" placeholder="Tanggal Update" value={formData.tanggal_update} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm" /> {/* Changed placeholder */}
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                >
                  <option value="">Pilih Status</option>
                  <option value="Tersedia">Tersedia</option>
                  <option value="Habis">Habis</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={toggleForm} className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">Batal</motion.button>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={editId ? handleUpdateItem : handleAddItem} disabled={loading} className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${editId ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700" : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"}`}>
                  {loading ? (<><ArrowPathIcon className="w-4 h-4 animate-spin" /> Memproses...</>) : editId ? "Update Produk" : "Simpan Produk"}
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
                    <th className="px-6 py-4 text-left font-medium">Nama Produk</th>
                    <th className="px-4 py-4 text-left font-medium">Kategori</th>
                    <th className="px-4 py-4 text-center font-medium">Tgl Masuk</th>
                    <th className="px-4 py-4 text-center font-medium">Stok</th>
                    <th className="px-4 py-4 text-center font-medium">Terjual</th>
                    <th className="px-4 py-4 text-right font-medium">Harga</th>
                    <th className="px-4 py-4 text-center font-medium">Status</th>
                    <th className="px-4 py-4 text-center font-medium">Tgl Update</th>
                    <th className="px-4 py-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-white/20">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{item.name}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600">{item.kategori}</td>
                        <td className="px-4 py-4 text-center text-gray-600">{item.tanggal_masuk}</td>
                        <td className="px-4 py-4 text-center text-gray-600">{item.stok_saat_ini}</td>
                        <td className="px-4 py-4 text-center text-gray-600">{item.total_jual}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(item.harga)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.status ? "Tersedia" : "Habis"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center text-gray-600">{item.tanggal_update}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all" title="Edit Produk"><PencilIcon className="w-5 h-5" /></motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteId(item.id)} className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-all" title="Hapus Produk"><TrashIcon className="w-5 h-5" /></motion.button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                        {loading ? "Memuat data..." : "Tidak ada produk ditemukan."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div variants={popIn} initial="hidden" animate="visible" exit="exit" className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Konfirmasi Hapus</h2>
                  <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600" title="Tutup"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <p className="mb-6 text-gray-600">
                  Anda akan menghapus produk <span className="font-semibold text-red-600">{inventory.find((i) => i.id === deleteId)?.name}</span>. Tindakan ini tidak dapat dibatalkan.
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

        {/* Loading Spinner for initial load and table data loading */}
        {loading && !showForm && (
          <div className="flex justify-center items-center py-8 text-blue-600">
            <ArrowPathIcon className="w-8 h-8 animate-spin mr-3" />
            <p className="text-lg">Memuat data inventory...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}