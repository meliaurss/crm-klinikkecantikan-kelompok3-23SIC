import React, { useState } from "react";

const StarRating = ({ name, value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(name, star)}
          className={`text-xl ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("feedbacks");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: "",
    treatment: "",
    doctorRating: 0,
    serviceRating: 0,
    placeRating: 0,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.treatment || !form.message) {
      alert("Nama, treatment, dan pesan wajib diisi.");
      return;
    }

    const newFeedback = {
      ...form,
      id: Date.now(),
      isApproved: false, // ditambahkan untuk keperluan admin
    };

    const updated = [newFeedback, ...feedbacks];
    setFeedbacks(updated);
    localStorage.setItem("feedbacks", JSON.stringify(updated));

    // Simpan ke 'allFeedbacks' agar bisa dikelola admin
    const existing = JSON.parse(localStorage.getItem("allFeedbacks")) || [];
    const updatedAll = [newFeedback, ...existing];
    localStorage.setItem("allFeedbacks", JSON.stringify(updatedAll));

    setForm({
      name: "",
      treatment: "",
      doctorRating: 0,
      serviceRating: 0,
      placeRating: 0,
      message: "",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Feedback Pelanggan</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Jenis Treatment</label>
          <select
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">-- Pilih Treatment --</option>
            <option value="Facial">Facial</option>
            <option value="Botox">Botox</option>
            <option value="Filler">Filler</option>
            <option value="Peeling">Peeling</option>
            <option value="Laser">Laser</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Dokter</label>
          <StarRating
            name="doctorRating"
            value={form.doctorRating}
            onChange={handleRatingChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Pelayanan</label>
          <StarRating
            name="serviceRating"
            value={form.serviceRating}
            onChange={handleRatingChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Tempat</label>
          <StarRating
            name="placeRating"
            value={form.placeRating}
            onChange={handleRatingChange}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Pesan Singkat</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tulis pesan Anda..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Kirim Feedback
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Feedback Masuk</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">Belum ada feedback.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb) => (
              <li key={fb.id} className="border p-4 rounded">
                <p className="text-indigo-700 font-bold">{fb.name}</p>
                <p className="text-sm text-gray-600">Treatment: {fb.treatment}</p>
                <div className="text-sm text-gray-700 mt-1">
                  <p>⭐ Dokter: {fb.doctorRating}/5</p>
                  <p>⭐ Pelayanan: {fb.serviceRating}/5</p>
                  <p>⭐ Tempat: {fb.placeRating}/5</p>
                </div>
                <p className="mt-2 text-gray-800 italic">"{fb.message}"</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
