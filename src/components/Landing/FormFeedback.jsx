import React, { useState } from "react";
import { supabase } from "../../supabase";

export default function FormFeedback({ userId, onSubmitted }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("feedbacks").insert([
      {
        user_id: userId,
        message,
        is_approved: false,
      },
    ]);

    if (!error) {
      // Tambahkan poin otomatis
      await supabase.rpc("add_feedback_point", { uid: userId });
      onSubmitted();
    } else {
      alert("Gagal mengirim feedback: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="w-full border px-4 py-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tulis feedback Anda..."
        required
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
      >
        Kirim Feedback
      </button>
    </form>
  );
}
