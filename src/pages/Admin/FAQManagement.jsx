// src/pages/Admin/FAQManagement.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function FAQManagement() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: ""
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setFaqs(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editId) {
      const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', editId);
      
      if (!error) {
        fetchFAQs();
        setShowForm(false);
        setEditId(null);
        setFormData({ question: "", answer: "" });
      }
    } else {
      const { error } = await supabase
        .from('faqs')
        .insert([formData]);
      
      if (!error) {
        fetchFAQs();
        setShowForm(false);
        setFormData({ question: "", answer: "" });
      }
    }
  };

  const handleEdit = (faq) => {
    setFormData({
      question: faq.question,
      answer: faq.answer
    });
    setEditId(faq.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus FAQ ini?")) {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      
      if (!error) {
        fetchFAQs();
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen FAQ</h1>
      
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditId(null);
              setFormData({ question: "", answer: "" });
            }
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {showForm ? 'Batal' : 'Tambah FAQ'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editId ? 'Edit FAQ' : 'Tambah FAQ Baru'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pertanyaan</label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jawaban</label>
              <textarea
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? 'Update FAQ' : 'Simpan FAQ'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Memuat data...</div>
      ) : (
        <div className="space-y-4">
          {faqs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Belum ada FAQ</div>
          ) : (
            faqs.map(faq => (
              <div key={faq.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(faq)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
