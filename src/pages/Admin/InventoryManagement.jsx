// src/pages/Admin/InventoryManagement.jsx
import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const initialProducts = [
  {
    id: 1,
    name: "Laptop ABC",
    category: "Elektronik",
    stock: 10,
    totalTerjual: 3,
    price: 7500000,
    active: true,
    tanggalMasuk: "2024-06-01",
    tanggalUpdate: "2024-06-10",
  },
  {
    id: 2,
    name: "Kursi Gaming",
    category: "Furniture",
    stock: 5,
    totalTerjual: 2,
    price: 1250000,
    active: false,
    tanggalMasuk: "2024-06-05",
    tanggalUpdate: "2024-06-11",
  },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
  exit: { opacity: 0, scale: 0.9 },
};

export default function InventoryManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    totalTerjual: "",
    price: "",
    tanggalMasuk: "",
    tanggalUpdate: "",
    active: true,
  });

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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
      category: "",
      stock: "",
      totalTerjual: "",
      price: "",
      tanggalMasuk: "",
      tanggalUpdate: "",
      active: true,
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

  const handleAddProduct = () => {
    const {
      name,
      category,
      stock,
      totalTerjual,
      price,
      tanggalMasuk,
      tanggalUpdate,
    } = formData;

    if (
      !name ||
      !category ||
      !stock ||
      !totalTerjual ||
      !price ||
      !tanggalMasuk ||
      !tanggalUpdate
    ) {
      alert("Semua kolom harus diisi");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newProduct = {
        ...formData,
        id: products.length + 1,
        stock: parseInt(stock),
        totalTerjual: parseInt(totalTerjual),
        price: parseFloat(price),
        tanggalUpdate: new Date().toISOString().split('T')[0],
      };

      setProducts([...products, newProduct]);
      setShowForm(false);
      resetForm();
      setIsLoading(false);
    }, 800);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      totalTerjual: product.totalTerjual.toString(),
      price: product.price.toString(),
      tanggalMasuk: product.tanggalMasuk,
      tanggalUpdate: product.tanggalUpdate,
      active: product.active,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const handleUpdateProduct = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editId
            ? {
                ...formData,
                id: editId,
                stock: parseInt(formData.stock),
                totalTerjual: parseInt(formData.totalTerjual),
                price: parseFloat(formData.price),
                tanggalUpdate: new Date().toISOString().split('T')[0],
              }
            : product
        )
      );
      setShowForm(false);
      resetForm();
      setIsLoading(false);
    }, 800);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProducts(products.filter((p) => p.id !== deleteId));
      setDeleteId(null);
      setIsLoading(false);
    }, 800);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen p-6 w-full mx-auto bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-800"
          >
            Manajemen Inventaris
          </motion.h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleForm}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center"
        >
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
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
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-4xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editId ? "Edit Produk" : "Tambah Produk Baru"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Nama Produk", name: "name", type: "text", required: true },
                  { label: "Kategori", name: "category", type: "select", options: categories, required: true },
                  { label: "Tanggal Masuk", name: "tanggalMasuk", type: "date", required: true },
                  { label: "Stok", name: "stock", type: "number", min: 0, required: true },
                  { label: "Total Terjual", name: "totalTerjual", type: "number", min: 0, required: true },
                  { label: "Harga", name: "price", type: "number", min: 0, required: true },
                  { label: "Tanggal Update", name: "tanggalUpdate", type: "date", required: true },
                ].map(({ label, name, type, options, min, required }) => (
                  <div className="mb-3" key={name}>
                    <label className="block mb-2 font-medium text-sm text-gray-700">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
                        required={required}
                      >
                        <option value="">Pilih Kategori</option>
                        {options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        name={name}
                        min={min}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
                        required={required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-4 mb-6">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium">Produk Aktif</span>
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
                  disabled={isLoading}
                  className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
                    editId
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  }`}
                >
                  {isLoading ? (
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

        {isLoading && !showForm && !deleteId ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
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
                    <th className="px-6 py-4 text-left font-medium">Nama</th>
                    <th className="px-4 py-4 text-left font-medium">Kategori</th>
                    <th className="px-4 py-4 text-center font-medium">Stok</th>
                    <th className="px-4 py-4 text-center font-medium">Terjual</th>
                    <th className="px-4 py-4 text-right font-medium">Harga</th>
                    <th className="px-4 py-4 text-center font-medium">Status</th>
                    <th className="px-6 py-4 text-center font-medium">Update</th>
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
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                          {product.category}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-600">
                          {product.stock}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-600">
                          {product.totalTerjual}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(product.price)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.active
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {product.active ? "Aktif" : "Nonaktif"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-gray-600">
                          {product.tanggalUpdate}
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
                      <td
                        colSpan="8"
                        className="px-6 py-8 text-center text-gray-500"
                      >
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
                    disabled={isLoading}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-2"
                  >
                    {isLoading ? (
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