import React, { useState, useEffect } from "react";
import { PencilIcon, ArrowPathIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num) || num === null) {
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

export default function OrderHistoryManagement() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editEntryId, setEditEntryId] = useState(null);
  const [formData, setFormData] = useState({ status: "" });
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = ["Diproses", "Sedang Diantar", "Selesai"];

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const localOrders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
      const flattened = localOrders.map((order) => ({
        id: order.id,
        orderId: order.id,
        items: order.items,
        totalPayment: order.total,
        subtotal: order.subtotal,
        shippingCost: order.shippingCost,
        appliedCoin: order.appliedCoin,
        orderDate: order.date,
        status: order.status,
        address: order.address,
      }));
      setOrderHistory(flattened);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedHistory = orderHistory.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderHistory(updatedHistory);

    const localOrders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const updatedLocalOrders = localOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedLocalOrders));
  };

  const handleEdit = (entry) => {
    setFormData({ status: entry.status });
    setEditEntryId(entry.id);
    setShowEditForm(true);
  };

  const handleUpdateOrder = () => {
    if (!formData.status) {
      alert("Status harus diisi!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      handleStatusChange(editEntryId, formData.status);
      setShowEditForm(false);
      setEditEntryId(null);
      setIsLoading(false);
    }, 500);
  };

  const filteredOrderHistory = orderHistory.filter((order) =>
    String(order.orderId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.address && order.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Pesanan</h1>
            <p className="text-sm text-slate-500">Pantau dan kelola status pengiriman pelanggan</p>
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
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Edit Form Section */}
        <AnimatePresence>
          {showEditForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md max-w-xl mx-auto">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full bg-[#101828]"></div>
                  Update Status Pesanan #{editEntryId}
                </h2>

                <div className="space-y-1 mb-6">
                  <label className="text-xs font-bold text-slate-500 uppercase">Status Pengiriman</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ status: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none text-sm"
                  >
                    <option value="">Pilih Status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setShowEditForm(false)} 
                    className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-all text-sm"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleUpdateOrder}
                    disabled={isLoading}
                    className="px-8 py-2 text-white font-bold rounded-lg shadow-lg bg-[#101828] hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                  >
                    {isLoading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : "Simpan Perubahan"}
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
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">ID Pesanan</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Produk</th>
                  <th className="px-4 py-4 text-right text-xs font-bold uppercase tracking-wider">Total Bayar</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Alamat Pengiriman</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading && !showEditForm ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <ArrowPathIcon className="w-8 h-8 animate-spin" />
                        <p>Memuat data pesanan...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrderHistory.length > 0 ? (
                  filteredOrderHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors text-sm">
                      <td className="px-6 py-4 font-bold text-slate-700">#{order.orderId}</td>
                      <td className="px-4 py-4 text-slate-600">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="whitespace-nowrap">
                            {item.name} <span className="text-slate-400 text-xs">x{item.quantity}</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-slate-900">
                        {formatCurrency(order.totalPayment)}
                      </td>
                      <td className="px-4 py-4 text-center text-slate-500 whitespace-nowrap">
                        {order.orderDate}
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                        {order.address}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === "Selesai"
                              ? "bg-emerald-100 text-emerald-700"
                              : order.status === "Sedang Diantar"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <button 
                            onClick={() => handleEdit(order)} 
                            className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all"
                            title="Edit Status"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400 italic">
                      Tidak ada riwayat pesanan ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}