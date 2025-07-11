import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrashIcon,
  PencilIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { supabase } from "../../supabase";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 20 },
  },
  exit: { opacity: 0, scale: 0.9 },
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telepon: "",
    status: "",
    membership_tier: "",
    riwayat: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "customer");

      if (error) throw error;
      setCustomers(data || []);
    } catch (error) {
      console.error("Error fetching customers:", error.message);
      setErrorMessage("Gagal memuat data pelanggan");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const filtered = customers.filter(
      (c) =>
        c.name?.toLowerCase().includes(lowerTerm) ||
        c.status?.toLowerCase().includes(lowerTerm) ||
        c.membership_tier?.toLowerCase().includes(lowerTerm) ||
        c.email?.toLowerCase().includes(lowerTerm) ||
        c.telepon?.toLowerCase().includes(lowerTerm)
    );
    setFilteredCustomers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.telepon ||
      !formData.status ||
      !formData.membership_tier ||
      !formData.riwayat
    ) {
      setErrorMessage("Semua kolom wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      let result;
      if (editMode) {
        result = await supabase
          .from("users")
          .update(formData)
          .eq("id", editId);
      } else {
        result = await supabase
          .from("users")
          .insert([{ ...formData, role: "customer" }]);
      }

      const { error } = result;
      if (error) throw error;

      await fetchCustomers();
      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      setFormData({
        name: "",
        email: "",
        telepon: "",
        status: "",
        membership_tier: "",
        riwayat: "",
      });
    } catch (error) {
      console.error("Error saving customer:", error.message);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      await fetchCustomers();
      setDeleteId(null);
      setDeleteName("");
    } catch (error) {
      console.error("Error deleting customer:", error.message);
      setErrorMessage("Gagal menghapus pelanggan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      telepon: customer.telepon || "",
      status: customer.status || "",
      membership_tier: customer.membership_tier || "",
      riwayat: customer.riwayat || "",
    });
    setEditMode(true);
    setEditId(customer.id);
    setShowForm(true);
  };

  const statusBadgeColor = (status) => {
    switch (status) {
      case "Member":
        return "bg-green-100 text-green-800";
      case "Baru":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tierBadgeColor = (tier) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Basic":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen p-4 bg-white ">
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
            Manajemen Pelanggan 
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowForm(!showForm);
                setEditMode(false);
                setEditId(null);
                setFormData({ name: "", email: "", telepon: "", status: "", membership_tier: "", riwayat: "" });
              }}
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
                  <span>Tambah Pelanggan</span>
                </>
              )}
            </motion.button>
            
            {!showForm && (
              <div className="relative flex-grow sm:w-64">
                <input
                  type="text"
                  placeholder="Cari pelanggan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
            >
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>

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
                {editMode ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
              </h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Nama", name: "name", type: "text", required: true },
                  { label: "Email", name: "email", type: "email", required: true },
                  { label: "Telepon", name: "telepon", type: "text", required: true },
                ].map(({ label, name, type, required }) => (
                  <div className="mb-2" key={name}>
                    <label className="block mb-1 font-medium text-sm text-gray-700">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                      required={required}
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1 font-medium text-sm text-gray-700">Status <span className="text-red-500">*</span></label>
                  <select 
                    name="status" 
                    value={formData.status} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="Baru">Baru</option>
                    <option value="Member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm text-gray-700">Membership <span className="text-red-500">*</span></label>
                  <select 
                    name="membership_tier" 
                    value={formData.membership_tier} 
                    onChange={handleInputChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    required
                  >
                    <option value="">Pilih Membership</option>
                    <option value="Basic">Basic</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium text-sm text-gray-700">Riwayat <span className="text-red-500">*</span></label>
                  <textarea 
                    name="riwayat" 
                    value={formData.riwayat} 
                    onChange={handleInputChange} 
                    rows={3} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
                      editMode
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                        : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Memproses...
                      </>
                    ) : editMode ? (
                      "Update Pelanggan"
                    ) : (
                      "Simpan Pelanggan"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && !showForm ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
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
                    {["Nama", "Email", "Telepon", "Status", "Membership", "Riwayat", "Aksi"].map((head) => (
                      <th key={head} className="px-6 py-4 text-left font-medium">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <motion.tr
                        key={customer.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-white/20"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          {customer.name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                          {customer.email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                          {customer.telepon}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeColor(customer.status)}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tierBadgeColor(customer.membership_tier)}`}>
                            {customer.membership_tier}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-600 max-w-xs truncate">
                          {customer.riwayat}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(customer)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDelete(customer.id, customer.name)}
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
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        Tidak ada data pelanggan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

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
                  Anda akan menghapus pelanggan{" "}
                  <span className="font-semibold text-red-600">
                    {deleteName}
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