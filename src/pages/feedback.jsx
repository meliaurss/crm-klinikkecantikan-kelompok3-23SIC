import React, { useState, useEffect } from "react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("feedbackList");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) {
      alert("Nama dan pesan harus diisi.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      ...form,
    };

    const updatedList = [newFeedback, ...feedbacks];
    setFeedbacks(updatedList);
    localStorage.setItem("feedbackList", JSON.stringify(updatedList));
    setForm({ name: "", message: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Nama Anda"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Pesan</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Tulis pesan Anda..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Kirim Feedback
        </button>
      </form>

      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Daftar Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">Belum ada feedback yang masuk.</p>
        ) : (
          <ul className="space-y-3">
            {feedbacks.map((fb) => (
              <li key={fb.id} className="border p-3 rounded">
                <p className="font-semibold text-indigo-600">{fb.name}</p>
                <p className="text-gray-700">{fb.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
