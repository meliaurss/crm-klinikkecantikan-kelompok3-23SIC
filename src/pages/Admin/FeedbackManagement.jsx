// src/components/Admin/FeedbackManagement.jsx
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowPathIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

const StarDisplay = ({ rating }) => {
  if (rating === null || rating === undefined || rating === 0) {
    return <span className="text-slate-400 italic text-xs">-</span>;
  }
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-lg ${index < rating ? "text-amber-400" : "text-slate-200"}`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
};

export default function FeedbackManagement({ onNewFeedback }) {
  const initialDummyFeedbacks = [
    {
      id: 'fb-dummy-1',
      feedback_text: 'Dokter sangat profesional dan tempatnya nyaman sekali!',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 5,
      product_rating: null,
      is_approved: true,
      created_at: '2025-07-13T10:00:00Z',
      users: { name: 'Budi Santoso', email: 'budi@example.com' }
    },
    {
      id: 'fb-dummy-2',
      feedback_text: 'Layanan customer service perlu ditingkatkan, respons agak lambat.',
      doctor_rating: 4,
      service_rating: 3,
      place_rating: 4,
      product_rating: null,
      is_approved: false,
      created_at: '2025-07-12T14:30:00Z',
      users: { name: 'Siti Aminah', email: 'siti@example.com' }
    },
    {
      id: 'fb-dummy-3',
      feedback_text: 'Produk rekomendasi dokter sangat bagus, jerawat saya membaik.',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 5,
      product_rating: 5,
      is_approved: true,
      created_at: '2025-07-11T09:15:00Z',
      users: { name: 'Rina Wijaya', email: 'rina@example.com' }
    }
  ];

  const [feedbacks, setFeedbacks] = useState(initialDummyFeedbacks);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleApproval = (id, currentApprovedStatus) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(fb =>
        fb.id === id ? { ...fb, is_approved: !currentApprovedStatus } : fb
      )
    );
  };

  const filteredFeedbacks = feedbacks.filter((fb) =>
    fb.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb.feedback_text?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Feedback</h1>
            <p className="text-sm text-slate-500">Moderasi ulasan pelanggan The Rose Clinic</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari ulasan atau pelanggan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none transition-all text-sm"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Table Section */}
        <motion.div variants={popIn} initial="hidden" animate="visible" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#101828] text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nama Pelanggan</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Feedback Text</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating Dokter</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating Layanan</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating Tempat</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Rating Produk</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Tanggal</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFeedbacks.length > 0 ? (
                  filteredFeedbacks.map((fb) => (
                    <tr key={fb.id} className="hover:bg-slate-50/50 transition-colors text-sm">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-bold text-slate-700">{fb.users?.name || 'Anonymous'}</div>
                        <div className="text-xs text-slate-400">{fb.users?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600 max-w-xs break-words italic line-clamp-2 leading-relaxed">
                          "{fb.feedback_text || '-'}"
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap"><StarDisplay rating={fb.doctor_rating} /></td>
                      <td className="px-4 py-4 whitespace-nowrap"><StarDisplay rating={fb.service_rating} /></td>
                      <td className="px-4 py-4 whitespace-nowrap"><StarDisplay rating={fb.place_rating} /></td>
                      <td className="px-4 py-4 whitespace-nowrap"><StarDisplay rating={fb.product_rating} /></td>
                      <td className="px-4 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          fb.is_approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {fb.is_approved ? "Disetujui" : "Menunggu"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-xs">
                        {new Date(fb.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => toggleApproval(fb.id, fb.is_approved)}
                            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all shadow-sm ${
                              fb.is_approved 
                              ? "bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100" 
                              : "bg-[#101828] text-white hover:bg-slate-800"
                            }`}
                          >
                            {fb.is_approved ? "Sembunyikan" : "Tampilkan"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <ChatBubbleLeftRightIcon className="w-8 h-8" />
                        <p className="italic">Belum ada feedback yang ditemukan.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}