import React, { useState, useEffect } from "react";

const FAQManagement = () => {
  const [faqs, setFaqs] = useState([]);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
    setFaqs(savedFaqs);
  }, []);

  const saveFaqsToStorage = (data) => {
    localStorage.setItem("faqs", JSON.stringify(data));
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return alert("Isi semua field!");
    const updatedFaqs = [...faqs, newFaq];
    setFaqs(updatedFaqs);
    saveFaqsToStorage(updatedFaqs);
    setNewFaq({ question: "", answer: "" });
  };

  const handleEditFaq = (index) => {
    setEditIndex(index);
    setNewFaq(faqs[index]);
  };

  const handleUpdateFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) return alert("Isi semua field!");
    const updatedFaqs = faqs.map((faq, idx) => (idx === editIndex ? newFaq : faq));
    setFaqs(updatedFaqs);
    saveFaqsToStorage(updatedFaqs);
    setEditIndex(null);
    setNewFaq({ question: "", answer: "" });
  };

  const handleDeleteFaq = (index) => {
    if (!window.confirm("Yakin ingin menghapus FAQ ini?")) return;
    const updatedFaqs = faqs.filter((_, idx) => idx !== index);
    setFaqs(updatedFaqs);
    saveFaqsToStorage(updatedFaqs);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#181C68]">Kelola FAQ</h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Masukkan pertanyaan"
          value={newFaq.question}
          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#181C68]"
        />
        <textarea
          placeholder="Masukkan jawaban"
          value={newFaq.answer}
          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-3 mb-4 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#181C68]"
        />
        {editIndex === null ? (
          <button
            onClick={handleAddFaq}
            className="bg-[#181C68] hover:bg-[#10144f] text-white font-semibold px-6 py-3 rounded-md transition duration-300 w-full"
          >
            Tambah FAQ
          </button>
        ) : (
          <button
            onClick={handleUpdateFaq}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300 w-full"
          >
            Update FAQ
          </button>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#181C68]">Daftar FAQ</h3>
        {faqs.length === 0 ? (
          <p className="text-gray-500 text-center">Belum ada FAQ yang tersedia.</p>
        ) : (
          <ul className="space-y-4">
            {faqs.map((faq, index) => (
              <li
                key={index}
                className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300 bg-gray-50"
              >
                <p className="font-semibold text-lg mb-2">{faq.question}</p>
                <p className="text-gray-700 mb-3 whitespace-pre-line">{faq.answer}</p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditFaq(index)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md font-semibold transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteFaq(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md font-semibold transition duration-300"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FAQManagement;
