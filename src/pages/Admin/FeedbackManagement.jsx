import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    const { data } = await supabase
      .from("feedbacks")
      .select("*")
      .order("created_at", { ascending: false });

    setFeedbacks(data);
  };

  const toggleApproval = async (id, approved) => {
    await supabase
      .from("feedbacks")
      .update({ is_approved: !approved })
      .eq("id", id);
    fetchFeedbacks();
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manajemen Feedback</h1>
      <ul className="space-y-3">
        {feedbacks.map((fb) => (
          <li key={fb.id} className="p-4 border rounded shadow">
            <p className="font-semibold">{fb.name}</p>
            <p className="italic">{fb.message}</p>
            <button
              onClick={() => toggleApproval(fb.id, fb.is_approved)}
              className={`mt-2 px-3 py-1 text-sm rounded ${
                fb.is_approved ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              {fb.is_approved ? "Sembunyikan" : "Tampilkan"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
