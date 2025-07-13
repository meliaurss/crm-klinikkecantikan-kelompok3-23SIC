import React, { useState, useEffect } from "react";
import { PencilIcon, ArrowPathIcon } from "@heroicons/react/24/outline"; // Added ArrowPathIcon for loading
import { motion, AnimatePresence } from "framer-motion";

function formatCurrency(num) {
  // Ensure num is a number before formatting
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return "Rp 0"; // Return a default value for invalid numbers
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

// Framer Motion variants
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

export default function OrderHistoryManagement() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [editEntryId, setEditEntryId] = useState(null); // This will now refer to the orderId for status updates
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
        address: order.address, // Include address from localStorage
      }));
      setOrderHistory(flattened);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setIsLoading(true);
    const updatedHistory = orderHistory.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderHistory(updatedHistory);

    const localOrders = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const updatedLocalOrders = localOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedLocalOrders));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
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
      setIsLoading(false); // Set loading to false after update
    }, 500);
  };

  const filteredOrderHistory = orderHistory.filter((order) =>
    String(order.orderId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.address && order.address.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
            Manajemen Pesanan
          </motion.h1>
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
              placeholder="Cari ID pesanan, produk, atau alamat..."
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
          {showEditForm && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Edit Status Pesanan
              </h2>

              <div className="mb-3">
                <label className="block mb-2 font-medium text-sm text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
                >
                  <option value="">Pilih Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowEditForm(false)}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleUpdateOrder}
                  disabled={isLoading}
                  className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Update Status"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isLoading && !showEditForm ? ( // Only show loading spinner for initial data load
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
                    <th className="px-6 py-4 text-left font-medium">ID Pesanan</th>
                    <th className="px-4 py-4 text-left font-medium">Produk</th>
                    <th className="px-4 py-4 text-right font-medium">Total Pembayaran</th>
                    <th className="px-4 py-4 text-center font-medium">Tanggal</th>
                    <th className="px-6 py-4 text-left font-medium">Alamat Pengiriman</th> {/* New Table Header */}
                    <th className="px-4 py-4 text-center font-medium">Status</th>
                    <th className="px-4 py-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredOrderHistory.length > 0 ? (
                    filteredOrderHistory.map((order) => (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-white/20"
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                          {order.orderId}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-gray-600">
                          {order.items.map(item => (
                            <div key={item.id}>
                              {item.name} (x{item.quantity})
                            </div>
                          ))}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(order.totalPayment)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-600">
                          {order.orderDate}
                        </td>
                        <td className="px-6 py-4 text-left text-gray-600"> {/* Adjusted padding and alignment */}
                          {order.address}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Selesai"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Sedang Diantar"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(order)}
                              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                            {/* The select for status change is now handled by the edit form */}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7" // Updated colspan to include the new column
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        Tidak ada riwayat pesanan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}