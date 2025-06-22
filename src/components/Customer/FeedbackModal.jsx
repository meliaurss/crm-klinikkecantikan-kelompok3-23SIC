import React, { useState } from 'react';

const FeedbackModal = ({ onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (feedback.trim() === '') return;
    onSubmit(feedback);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
        >
          ×
        </button>
        <h3 className="text-lg font-semibold text-indigo-600 mb-4">Feedback untuk Tambah Poin</h3>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="w-full border rounded-md p-3"
          placeholder="Tulis pengalaman Anda setelah treatment atau pembelian produk"
        ></textarea>
        <div className="text-right mt-4">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;