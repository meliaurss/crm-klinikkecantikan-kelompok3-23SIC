// src/pages/Admin/FAQManagement.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

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
      ({ error } = await supabase
        .from("faqs")
        .update(formData)
        .eq("id", editId));
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen FAQ</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditId(null);
          setFormData({ question: "", answer: "" });
        }}
        className="mb-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {showForm ? "Batal" : "Tambah FAQ"}
      </button>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Pertanyaan</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Jawaban</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                rows={4}
                required
                className="mt-1 block w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              {editId ? "Update FAQ" : "Simpan FAQ"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p>Memuat data...</p>
      ) : faqs.length === 0 ? (
        <p>Belum ada FAQ</p>
      ) : (
        faqs.map((faq) => (
          <div key={faq.id} className="bg-white p-4 rounded shadow mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="text-sm text-gray-700 mt-1">{faq.answer}</p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${faq.is_visible ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}
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
          </div>
        ))
      )}
    </div>
  );
}
