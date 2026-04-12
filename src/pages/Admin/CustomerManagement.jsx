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

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
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

  const resetFormState = () => {
    setEditMode(false);
    setEditId(null);
    setFormData({ name: "", email: "", telepon: "", status: "", membership_tier: "", riwayat: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!formData.name || !formData.email || !formData.telepon || !formData.status || !formData.membership_tier || !formData.riwayat) {
      setErrorMessage("Semua kolom wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      if (editMode) {
        await supabase.from("users").update(formData).eq("id", editId);
      } else {
        await supabase.from("users").insert([{ ...formData, role: "customer" }]);
      }
      await fetchCustomers();
      setShowForm(false);
      resetFormState();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      await supabase.from("users").delete().eq("id", deleteId);
      await fetchCustomers();
      setDeleteId(null);
    } catch (error) {
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
    return status === "Member" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700";
  };

  const tierBadgeColor = (tier) => {
    switch (tier) {
      case "Platinum": return "bg-purple-100 text-purple-700";
      case "Gold": return "bg-amber-100 text-amber-700";
      case "Silver": return "bg-slate-200 text-slate-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Pelanggan</h1>
            <p className="text-sm text-slate-500">Kelola data pelanggan The Rose Clinic</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pelanggan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-72 px-4 py-2 pl-10 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none transition-all text-sm"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (showForm) resetFormState();
                setShowForm(!showForm);
              }}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl shadow-sm font-semibold text-sm transition-all ${
                showForm 
                ? "bg-slate-100 text-slate-600 border border-slate-200" 
                : "bg-[#101828] text-white hover:bg-slate-800"
              }`}
            >
              {showForm ? <XMarkIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              {showForm ? "Batal" : "Tambah Pelanggan"}
            </motion.button>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm">
            {errorMessage}
          </div>
        )}

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-6 rounded-full ${editMode ? 'bg-amber-500' : 'bg-[#101828]'}`}></div>
                  {editMode ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Telepon</label>
                    <input type="text" name="telepon" value={formData.telepon} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm">
                      <option value="">Pilih Status</option>
                      <option value="Baru">Baru</option>
                      <option value="Member">Member</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Membership</label>
                    <select name="membership_tier" value={formData.membership_tier} onChange={handleInputChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm">
                      <option value="">Pilih Tier</option>
                      <option value="Basic">Basic</option>
                      <option value="Silver">Silver</option>
                      <option value="Gold">Gold</option>
                      <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Riwayat</label>
                    <textarea name="riwayat" value={formData.riwayat} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm resize-none" />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 text-slate-500 font-medium text-sm hover:bg-slate-50 rounded-lg transition-all">Batal</button>
                  <button type="submit" disabled={loading} className="px-8 py-2 bg-[#101828] text-white font-bold rounded-xl shadow-lg text-sm hover:bg-slate-800 transition-all flex items-center gap-2">
                    {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : (editMode ? "Update Pelanggan" : "Simpan Pelanggan")}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#101828] text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Telepon</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Membership</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Riwayat</th>
                  <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading && !showForm && !deleteId ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                      <ArrowPathIcon className="w-8 h-8 animate-spin mx-auto mb-2" />
                      Memuat data...
                    </td>
                  </tr>
                ) : filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors text-sm">
                      <td className="px-6 py-4 font-bold text-slate-700">{customer.name}</td>
                      <td className="px-6 py-4 text-slate-600">{customer.email}</td>
                      <td className="px-6 py-4 text-slate-600">{customer.telepon}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusBadgeColor(customer.status)}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tierBadgeColor(customer.membership_tier)}`}>
                          {customer.membership_tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">{customer.riwayat}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleEdit(customer)} className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all" title="Edit"><PencilIcon className="w-4 h-4" /></button>
                          <button onClick={() => { setDeleteId(customer.id); setDeleteName(customer.name); }} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Hapus"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400 italic">Tidak ada data ditemukan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div variants={popIn} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrashIcon className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Hapus Pelanggan?</h2>
                <p className="text-slate-500 text-sm mb-8">Data <span className="font-bold text-slate-800">"{deleteName}"</span> akan dihapus permanen.</p>
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