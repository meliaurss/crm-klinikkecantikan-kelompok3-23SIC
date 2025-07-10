import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedback = async () => {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (!error) setFeedbacks(data);
    };

    loadFeedback();
  }, []);

  return (
    <section className="py-10 px-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Apa Kata Mereka?</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="bg-white p-4 rounded-xl shadow border">
            <p className="font-semibold text-indigo-700">{fb.name}</p>
            <p className="text-sm text-gray-600 italic mb-2">"{fb.message}"</p>
            <p className="text-xs text-gray-500">
              Treatment: {fb.treatment} | ⭐ Dokter: {fb.doctor_rating}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
