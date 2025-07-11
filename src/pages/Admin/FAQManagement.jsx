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
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ question: "", answer: "" });

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
    } else {
      console.error("Supabase Error:", error);
    }
  };

  const handleEdit = (faq) => {
    setFormData({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus FAQ ini?")) {
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

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fade}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Manajemen FAQ
        </h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowForm((prev) => !prev);
            setEditId(null);
            setFormData({ question: "", answer: "" });
          }}
          className="flex items-center gap-2 mx-auto mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          {showForm ? (
            <>
              <XMarkIcon className="w-5 h-5" />
              Batal
            </>
          ) : (
            <>
              <PlusIcon className="w-5 h-5" />
              Tambah FAQ
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/30 backdrop-blur-lg border border-white/40 p-6 rounded-2xl shadow-xl mb-6"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Pertanyaan
                  </label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Jawaban
                  </label>
                  <textarea
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-2 border rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                  >
                    {editId ? "Update FAQ" : "Simpan FAQ"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : faqs.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada FAQ</p>
        ) : (
          <div className="grid gap-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={fade}
                initial="hidden"
                animate="visible"
                className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl p-4 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      {faq.answer}
                    </p>
                    <span
                      className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${
                        faq.is_visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {faq.is_visible ? "Ditampilkan" : "Disembunyikan"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleVisibility(faq)} title="Tampilkan / Sembunyikan">
                      {faq.is_visible ? (
                        <EyeSlashIcon className="w-5 h-5 text-yellow-600" />
                      ) : (
                        <EyeIcon className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                    <button onClick={() => handleEdit(faq)} title="Edit">
                      <PencilIcon className="w-5 h-5 text-blue-600" />
                    </button>
                    <button onClick={() => handleDelete(faq.id)} title="Hapus">
                      <TrashIcon className="w-5 h-5 text-red-600" />
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
