import React, { useState } from "react";
import { supabase } from "../../supabase";

export default function FeedbackModal({ userId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    treatment: "",
    doctor_rating: 5,
    service_rating: 5,
    place_rating: 5,
    message: "",
    is_approved: false,
    user_id: userId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("feedbacks").insert([formData]);
    if (error) {
      alert("Gagal mengirim feedback: " + error.message);
    } else {
      // Tambahkan poin ke user
      await supabase.rpc("add_feedback_point", { uid: userId });
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-center text-indigo-700">
          Kirim Feedback
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Nama" required value={formData.name} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
          <input name="treatment" placeholder="Treatment yang diambil" required value={formData.treatment}
            onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <textarea name="message" placeholder="Masukan" required value={formData.message}
            onChange={handleChange} className="w-full border rounded px-3 py-2" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}
