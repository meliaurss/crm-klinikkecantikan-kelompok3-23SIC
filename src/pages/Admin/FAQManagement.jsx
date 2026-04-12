import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
};

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setFaqs(data);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let error;
    if (editId) {
      ({ error } = await supabase.from("faqs").update(formData).eq("id", editId));
    } else {
      ({ error } = await supabase
        .from("faqs")
        .insert([{ ...formData, is_visible: false }]));
    }

    if (!error) {
      fetchFAQs();
      setFormData({ question: "", answer: "" });
      setEditId(null);
      setShowForm(false);
    }
    setLoading(false);
  };

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus FAQ ini secara permanen?")) {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (!error) fetchFAQs();
    }
  };

  const toggleVisibility = async (faq) => {
    const { error } = await supabase
      .from("faqs")
      .update({ is_visible: !faq.is_visible })
      .eq("id", faq.id);
    if (!error) fetchFAQs();
  };

  const filteredFaqs = faqs.filter(f => 
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen FAQ</h1>
            <p className="text-sm text-slate-500">Kelola daftar pertanyaan yang sering diajukan</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari FAQ..."
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
                setShowForm(!showForm);
                if (showForm) setEditId(null);
              }}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl shadow-sm font-semibold text-sm transition-all ${
                showForm 
                ? "bg-slate-100 text-slate-600 border border-slate-200" 
                : "bg-[#101828] text-white hover:bg-slate-800"
              }`}
            >
              {showForm ? <XMarkIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
              {showForm ? "Batal" : "Tambah FAQ"}
            </motion.button>
          </div>
        </div>

        {/* Form Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-10">
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-6 rounded-full ${editId ? 'bg-amber-500' : 'bg-[#101828]'}`}></div>
                  {editId ? "Edit FAQ" : "Buat FAQ Baru"}
                </h2>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Pertanyaan</label>
                    <input 
                      type="text" 
                      name="question" 
                      value={formData.question} 
                      onChange={handleInputChange} 
                      required
                      placeholder="Masukkan pertanyaan..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm" 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Jawaban</label>
                    <textarea 
                      name="answer" 
                      value={formData.answer} 
                      onChange={handleInputChange} 
                      required
                      rows={4}
                      placeholder="Masukkan jawaban..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#101828]/10 outline-none text-sm resize-none" 
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-6 py-2 text-slate-500 font-medium hover:bg-slate-50 rounded-lg transition-all text-sm">Batal</button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2 text-white font-bold rounded-lg shadow-lg bg-[#101828] hover:bg-slate-800 transition-all flex items-center gap-2 text-sm"
                  >
                    {loading ? <ArrowPathIcon className="w-4 h-4 animate-spin" /> : (editId ? "Update FAQ" : "Simpan FAQ")}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List Content */}
        {loading && !showForm ? (
          <div className="flex justify-center items-center py-20 text-slate-400">
            <ArrowPathIcon className="w-8 h-8 animate-spin" />
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400 italic">
            Tidak ada FAQ yang ditemukan.
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={popIn}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#101828] mb-2 leading-snug">{faq.question}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        faq.is_visible ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {faq.is_visible ? "Ditampilkan" : "Disembunyikan"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 sm:flex-row">
                    <button 
                      onClick={() => toggleVisibility(faq)} 
                      className={`p-2 rounded-lg transition-all ${faq.is_visible ? 'text-amber-500 hover:bg-amber-50' : 'text-emerald-500 hover:bg-emerald-50'}`}
                      title={faq.is_visible ? "Sembunyikan" : "Tampilkan"}
                    >
                      {faq.is_visible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    <button 
                      onClick={() => handleEdit(faq)} 
                      className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg transition-all"
                      title="Edit"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(faq.id)} 
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      title="Hapus"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}