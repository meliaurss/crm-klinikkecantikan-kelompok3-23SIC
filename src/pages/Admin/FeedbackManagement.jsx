// src/pages/Admin/FeedbackManagement.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";

export default function FeedbackManagement() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) {
      setFeedbacks(data);
    }
    setLoading(false);
  };

  const toggleApproval = async (id, currentStatus) => {
    const { error } = await supabase
      .from('feedbacks')
      .update({ is_approved: !currentStatus })
      .eq('id', id);
    
    if (!error) {
      fetchFeedbacks();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Feedback</h1>
      
      {loading ? (
        <div className="text-center py-8">Memuat data...</div>
      ) : (
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Belum ada feedback</div>
          ) : (
            feedbacks.map(feedback => (
              <div key={feedback.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{feedback.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(feedback.created_at).toLocaleString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    feedback.is_approved ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {feedback.is_approved ? 'Disetujui' : 'Menunggu'}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{feedback.message}</p>
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-yellow-500">Rating: {feedback.rating}/5</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => toggleApproval(feedback.id, feedback.is_approved)}
                    className={`px-3 py-1 text-sm rounded ${
                      feedback.is_approved 
                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {feedback.is_approved ? 'Batalkan Persetujuan' : 'Setujui'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
