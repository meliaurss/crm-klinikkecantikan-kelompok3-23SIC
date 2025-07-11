import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
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
    }
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
      setError(null);
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
      setError(null);
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
      setError(null);
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
      setError(null);
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
            Manajemen Produk
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all text-sm"
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
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleForm}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              {showForm ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  <span>Batal</span>
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  <span>Tambah Produk</span>
                </>
              )}
            </motion.button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {loading && !showForm && !deleteId && (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editId ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Nama Produk", name: "name", type: "text", required: true },
                  { label: "URL Gambar", name: "image", type: "text", required: true },
                  { label: "Harga", name: "price", type: "number", min: 0, required: true },
                  { label: "Keterangan", name: "description", type: "text", required: true },
                ].map(({ label, name, type, min, required }) => (
                  <div className="mb-2" key={name}>
                    <label className="block mb-1 font-medium text-sm text-gray-700">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type}
                      name={name}
                      min={min}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
                      required={required}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-4 mb-6">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="showOnLanding"
                    checked={formData.showOnLanding}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium">Tampilkan di Landing Page</span>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleForm}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={editId ? handleUpdateProduct : handleAddProduct}
                  disabled={loading}
                  className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
                    editId
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Memproses...
                    </>
                  ) : editId ? (
                    "Update Produk"
                  ) : (
                    "Simpan Produk"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !showForm && (
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
                    <th className="px-6 py-4 text-left font-medium">Produk</th>
                    <th className="px-4 py-4 text-left font-medium">Gambar</th>
                    <th className="px-4 py-4 text-right font-medium">Harga</th>
                    <th className="px-4 py-4 text-center font-medium">Status</th>
                    <th className="px-4 py-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-white/20"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{product.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{product.description}</div>
                        </td>
                        <td className="px-4 py-4">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 mx-auto overflow-hidden rounded-lg bg-white/50 border border-white/30"
                          >
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/100?text=No+Image";
                              }}
                            />
                          </motion.div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleLandingVisibility(product.id, !product.show_on_landing)}
                            disabled={loading}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              product.show_on_landing
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.show_on_landing ? (
                              <>
                                <EyeIcon className="w-3 h-3 mr-1" />
                                Ditampilkan
                              </>
                            ) : (
                              <>
                                <EyeSlashIcon className="w-3 h-3 mr-1" />
                                Disembunyikan
                              </>
                            )}
                          </motion.button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(product)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setDeleteId(product.id)}
                              className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-all"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        Tidak ada produk ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {deleteId !== null && (
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
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Konfirmasi Hapus
                  </h2>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <p className="mb-6 text-gray-600">
                  Anda akan menghapus produk{" "}
                  <span className="font-semibold text-red-600">
                    {products.find((p) => p.id === deleteId)?.name}
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
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Menghapus...
                      </>
                    ) : (
                      "Hapus"
                    )}
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