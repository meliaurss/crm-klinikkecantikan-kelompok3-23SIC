// // src/pages/Admin/OrderHistoryManagement.jsx
// import React, { useState, useEffect } from "react";
// import {
//   PencilIcon,
//   XMarkIcon,
//   ArrowPathIcon,
// } from "@heroicons/react/24/outline";
// import { motion, AnimatePresence } from "framer-motion";

// // Asumsi ini adalah data yang Anda maksud dari "history produk"
// // Setiap entri merepresentasikan satu item produk yang terjual dalam sebuah pesanan
// const initialProductHistoryData = [
//   {
//     id: 1, // ID unik untuk entri riwayat produk ini
//     orderId: "ORD001",
//     customerName: "Budi Santoso",
//     productId: "PROD001", // ID produk yang terjual
//     productName: "Laptop ABC",
//     quantity: 1,
//     unitPrice: 7500000, // Harga per unit saat terjual
//     orderDate: "2024-07-01",
//     status: "Diproses", // Status pesanan terkait item ini
//     // Mungkin ada informasi lain seperti alamat pengiriman, metode pembayaran, dll.
//   },
//   {
//     id: 2,
//     orderId: "ORD002",
//     customerName: "Siti Aminah",
//     productId: "PROD002",
//     productName: "Kursi Gaming",
//     quantity: 2,
//     unitPrice: 1250000,
//     orderDate: "2024-07-03",
//     status: "Sedang Diantar",
//   },
//   {
//     id: 3,
//     orderId: "ORD003",
//     customerName: "Joko Susilo",
//     productId: "PROD003",
//     productName: "Keyboard Mekanik",
//     quantity: 1,
//     unitPrice: 800000,
//     orderDate: "2024-07-05",
//     status: "Selesai",
//   },
//   {
//     id: 4,
//     orderId: "ORD004",
//     customerName: "Dewi Lestari",
//     productId: "PROD004",
//     productName: "Mouse Wireless",
//     quantity: 3,
//     unitPrice: 150000,
//     orderDate: "2024-07-06",
//     status: "Diproses",
//   },
//   {
//     id: 5,
//     orderId: "ORD002", // Pesanan yang sama dengan ID 2
//     customerName: "Siti Aminah",
//     productId: "PROD005",
//     productName: "Meja Gaming",
//     quantity: 1,
//     unitPrice: 1800000,
//     orderDate: "2024-07-03",
//     status: "Sedang Diantar", // Status pesanan terkait item ini
//   },
// ];

// // Helper function to format currency
// function formatCurrency(num) {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(num);
// }

// // Framer Motion animation variants
// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   exit: { opacity: 0, y: -20 },
// };

// const popIn = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
//   exit: { opacity: 0, scale: 0.9 },
// };

// export default function OrderHistoryManagement() {
//   const [orderHistory, setOrderHistory] = useState(initialProductHistoryData); // Menggunakan data history produk
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editEntryId, setEditEntryId] = useState(null); // Ubah dari editOrderId menjadi editEntryId
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     orderId: "",
//     customerName: "",
//     productName: "",
//     quantity: "",
//     unitPrice: "", // Menggunakan unitPrice
//     orderDate: "",
//     status: "",
//   });

//   // Simulate loading
//   useEffect(() => {
//     setIsLoading(true);
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       orderId: "",
//       customerName: "",
//       productName: "",
//       quantity: "",
//       unitPrice: "",
//       orderDate: "",
//       status: "",
//     });
//     setEditEntryId(null);
//   };

//   const handleEdit = (entry) => { // Menggunakan 'entry' sebagai parameter
//     setFormData({
//       orderId: entry.orderId,
//       customerName: entry.customerName,
//       productName: entry.productName,
//       quantity: entry.quantity.toString(),
//       unitPrice: entry.unitPrice.toString(),
//       orderDate: entry.orderDate,
//       status: entry.status,
//     });
//     setEditEntryId(entry.id); // Set ID entri yang diedit
//     setShowEditForm(true);
//   };

//   const handleUpdateOrder = () => {
//     const { orderId, customerName, productName, quantity, unitPrice, orderDate, status } = formData;

//     if (!orderId || !customerName || !productName || !quantity || !unitPrice || !orderDate || !status) {
//       alert("Semua kolom harus diisi");
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       setOrderHistory((prev) =>
//         prev.map((entry) => // Mengubah nama variabel dari 'order' menjadi 'entry'
//           entry.id === editEntryId // Menggunakan editEntryId
//             ? {
//                 ...formData,
//                 id: editEntryId,
//                 quantity: parseInt(formData.quantity),
//                 unitPrice: parseFloat(formData.unitPrice),
//               }
//             : entry
//         )
//       );
//       setShowEditForm(false);
//       resetForm();
//       setIsLoading(false);
//     }, 800);
//   };

//   const handleStatusChange = (id, newStatus) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setOrderHistory((prev) =>
//         prev.map((entry) => // Mengubah nama variabel dari 'order' menjadi 'entry'
//           entry.id === id ? { ...entry, status: newStatus } : entry
//         )
//       );
//       setIsLoading(false);
//     }, 500);
//   };

//   const filteredOrderHistory = orderHistory.filter(
//     (entry) => // Mengubah nama variabel dari 'order' menjadi 'entry'
//       entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       entry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       entry.orderId.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const statusOptions = ["Diproses", "Sedang Diantar", "Selesai"];

//   return (
//     <div className="min-h-screen p-6 w-full mx-auto bg-white">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-7xl mx-auto"
//       >
//         <div className="flex justify-between items-center mb-6">
//           <motion.h1
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.1 }}
//             className="text-3xl font-bold text-gray-800"
//           >
//             Manajemen Riwayat Pesanan (Produk Terjual)
//           </motion.h1>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center"
//         >
//           <div className="relative flex-grow">
//             <input
//               type="text"
//               placeholder="Cari nama pelanggan, produk, atau ID pesanan..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-3 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all"
//             />
//             <svg
//               className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>
//         </motion.div>

//         <AnimatePresence>
//           {showEditForm && (
//             <motion.div
//               variants={fadeIn}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//               className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-4xl mx-auto"
//             >
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">
//                 Edit Riwayat Pesanan (Item Produk)
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   {
//                     label: "ID Pesanan",
//                     name: "orderId",
//                     type: "text",
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Nama Pelanggan",
//                     name: "customerName",
//                     type: "text",
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Nama Produk",
//                     name: "productName",
//                     type: "text",
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Jumlah",
//                     name: "quantity",
//                     type: "number",
//                     min: 1,
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Harga Satuan", // Ubah label
//                     name: "unitPrice", // Ubah nama
//                     type: "number",
//                     min: 0,
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Tanggal Pesanan",
//                     name: "orderDate",
//                     type: "date",
//                     required: true,
//                     readOnly: true,
//                   },
//                   {
//                     label: "Status",
//                     name: "status",
//                     type: "select",
//                     options: statusOptions,
//                     required: true,
//                   },
//                 ].map(({ label, name, type, options, min, required, readOnly }) => (
//                   <div className="mb-3" key={name}>
//                     <label className="block mb-2 font-medium text-sm text-gray-700">
//                       {label} {required && <span className="text-red-500">*</span>}
//                     </label>
//                     {type === "select" ? (
//                       <select
//                         name={name}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
//                         required={required}
//                         disabled={readOnly}
//                       >
//                         <option value="">Pilih Status</option>
//                         {options?.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     ) : (
//                       <input
//                         type={type}
//                         name={name}
//                         min={min}
//                         value={formData[name]}
//                         onChange={handleChange}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
//                         required={required}
//                         readOnly={readOnly}
//                         disabled={readOnly}
//                       />
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-end gap-3 mt-4">
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={() => setShowEditForm(false)}
//                   className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
//                 >
//                   Batal
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.97 }}
//                   onClick={handleUpdateOrder}
//                   disabled={isLoading}
//                   className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
//                     "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <>
//                       <ArrowPathIcon className="w-4 h-4 animate-spin" />
//                       Memproses...
//                     </>
//                   ) : (
//                     "Update Item Pesanan"
//                   )}
//                 </motion.button>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {isLoading && !showEditForm ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//           </div>
//         ) : (
//           <motion.div
//             variants={popIn}
//             initial="hidden"
//             animate="visible"
//             className="overflow-hidden rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40"
//           >
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm">
//                 <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//                   <tr>
//                     <th className="px-6 py-4 text-left font-medium">ID Pesanan</th>
//                     <th className="px-4 py-4 text-left font-medium">Pelanggan</th>
//                     <th className="px-4 py-4 text-left font-medium">Produk</th>
//                     <th className="px-4 py-4 text-center font-medium">Jumlah</th>
//                     <th className="px-4 py-4 text-right font-medium">Harga Satuan</th>
//                     <th className="px-4 py-4 text-center font-medium">Tanggal Pesanan</th>
//                     <th className="px-4 py-4 text-center font-medium">Status</th>
//                     <th className="px-4 py-4 text-center font-medium">Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/20">
//                   {filteredOrderHistory.length > 0 ? (
//                     filteredOrderHistory.map((entry) => ( // Mengubah nama variabel dari 'order' menjadi 'entry'
//                       <motion.tr
//                         key={entry.id}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ duration: 0.3 }}
//                         className="hover:bg-white/20"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
//                           {entry.orderId}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-gray-600">
//                           {entry.customerName}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-gray-600">
//                           {entry.productName}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center text-gray-600">
//                           {entry.quantity}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
//                           {formatCurrency(entry.unitPrice)} {/* Menggunakan unitPrice */}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center text-gray-600">
//                           {entry.orderDate}
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                               entry.status === "Diproses"
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : entry.status === "Sedang Diantar"
//                                 ? "bg-blue-100 text-blue-800"
//                                 : "bg-green-100 text-green-800"
//                             }`}
//                           >
//                             {entry.status}
//                           </span>
//                         </td>
//                         <td className="px-4 py-4 whitespace-nowrap text-center">
//                           <div className="flex justify-center gap-2">
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               onClick={() => handleEdit(entry)}
//                               className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
//                             >
//                               <PencilIcon className="w-5 h-5" />
//                             </motion.button>
//                             <select
//                               className="px-2 py-1 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-xs transition-all"
//                               value={entry.status}
//                               onChange={(e) =>
//                                 handleStatusChange(entry.id, e.target.value)
//                               }
//                               disabled={isLoading}
//                             >
//                               {statusOptions.map((status) => (
//                                 <option key={status} value={status}>
//                                   {status}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="8"
//                         className="px-6 py-8 text-center text-gray-500"
//                       >
//                         Tidak ada riwayat pesanan ditemukan.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     </div>
//   );
// }