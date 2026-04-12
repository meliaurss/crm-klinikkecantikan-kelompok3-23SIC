import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js";

function formatCurrency(num) {
  if (typeof num !== "number" || isNaN(num) || num === null) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
};

export default function ProdukManagement({ products, setProducts }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    showOnLanding: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      image: "",
      price: "",
      description: "",
      showOnLanding: false,
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

  const handleAddProduct = async () => {
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      setError("Semua kolom harus diisi dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from("produk")
        .insert([{
          nama: name,
          gambar: image,
          harga: priceAsNumber,
          keterangan: description,
          show_on_landing: showOnLanding,
        }])
        .select();

      if (insertError) throw insertError;

      const newProduct = {
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      
      setProducts((prev) => [...prev, newProduct]);
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError("Gagal menambahkan produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price.toString(),
      description: product.description,
      showOnLanding: product.show_on_landing || false,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const handleUpdateProduct = async () => {
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      setError("Isi semua data dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from("produk")
        .update({
          nama: name,
          gambar: image,
          harga: priceAsNumber,
          keterangan: description,
          show_on_landing: showOnLanding,
        })
        .eq("id", editId)
        .select();

      if (updateError) throw updateError;

      const updatedProduct = {
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      
      setProducts((prev) => prev.map((p) => (p.id === editId ? updatedProduct : p)));
      setShowForm(false);
      resetForm();
    } catch (err) {
      setError("Gagal memperbarui produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from("produk")
        .delete()
        .eq("id", deleteId);

      if (deleteError) throw deleteError;

      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      setError("Gagal menghapus produk: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLandingVisibility = async (id, newStatus) => {
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from("produk")
        .update({ show_on_landing: newStatus })
        .eq("id", id)
        .select();

      if (updateError) throw updateError;

      const updated = data[0];
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, show_on_landing: updated.show_on_landing } : p
        )
      );
    } catch (err) {
      setError("Gagal mengubah visibilitas: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Produk</h1>
            <p className="text-sm text-slate-500">Kelola katalog produk fisik The Rose Clinic</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari produk..."
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
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-6 rounded-full ${editId ? 'bg-amber-500' : 'bg-[#101828]'}`}></div>
                  {editId ? "Edit Detail Produk" : "Tambah Produk Baru"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama Produk</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Harga (Rp)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">URL Gambar Produk</label>
                    <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Keterangan Produk</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="showOnLanding" checked={formData.showOnLanding} onChange={handleChange} className="w-4 h-4 text-[#101828] border-slate-300 rounded focus:ring-[#101828]" />
                      <span className="ml-2 text-sm font-medium text-slate-700">Tampilkan di Landing Page</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button onClick={toggleForm} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-all text-sm">Batal</button>
                  <button 
                    onClick={editId ? handleUpdateProduct : handleAddProduct} 
                    disabled={loading}
                    className="px-8 py-2 text-white font-bold rounded-lg shadow-lg bg-[#101828] hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                  >
                    {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : (editId ? "Update Produk" : "Simpan Produk")}
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
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Produk</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Gambar</th>
                  <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider">Harga</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Status Landing</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && !showForm && !deleteId ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <ArrowPathIcon className="w-8 h-8 animate-spin" />
                        <p>Memperbarui katalog...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors text-sm">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-700">{product.name}</div>
                        <div className="text-xs text-slate-400 mt-1 max-w-xs truncate">{product.description}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="w-12 h-12 mx-auto rounded-lg overflow-hidden border border-slate-200">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-slate-900">{formatCurrency(product.price)}</td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => toggleLandingVisibility(product.id, !product.show_on_landing)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            product.show_on_landing
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-500 border border-slate-200"
                          }`}
                        >
                          {product.show_on_landing ? <EyeIcon className="w-3 h-3 mr-1" /> : <EyeSlashIcon className="w-3 h-3 mr-1" />}
                          {product.show_on_landing ? "Ditampilkan" : "Disembunyikan"}
                        </button>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(product)} className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all" title="Edit"><PencilIcon className="w-4 h-4" /></button>
                          <button onClick={() => setDeleteId(product.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Hapus"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 italic">Tidak ada produk ditemukan.</td>
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
                <p className="text-slate-500 text-sm mb-8">Produk <span className="font-bold text-slate-800">"{products.find(p => p.id === deleteId)?.name}"</span> akan dihapus permanen.</p>
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