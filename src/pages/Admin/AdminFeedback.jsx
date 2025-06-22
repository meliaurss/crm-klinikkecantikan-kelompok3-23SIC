import React, { useState, useEffect } from "react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("allFeedbacks");
    if (stored) {
      setFeedbacks(JSON.parse(stored));
    }
  }, []);

  const toggleApproval = (id) => {
    const updated = feedbacks.map((fb) =>
      fb.id === id ? { ...fb, isApproved: !fb.isApproved } : fb
    );
    setFeedbacks(updated);
    localStorage.setItem("allFeedbacks", JSON.stringify(updated));

    // Simpan feedback yang disetujui untuk ditampilkan di landing page
    const approved = updated.filter((fb) => fb.isApproved);
    localStorage.setItem("approvedFeedbacks", JSON.stringify(approved));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#181C68]">Kelola Feedback Pelanggan</h1>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">Tidak ada feedback masuk.</p>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border p-4 rounded shadow">
              <p className="font-bold text-[#181C68]">{fb.name}</p>
              <p className="text-sm text-gray-600">Treatment: {fb.treatment}</p>
              <p className="text-sm">⭐ Dokter: {fb.doctorRating} | ⭐ Pelayanan: {fb.serviceRating} | ⭐ Tempat: {fb.placeRating}</p>
              <p className="italic mt-2">"{fb.message}"</p>
              <button
                onClick={() => toggleApproval(fb.id)}
                className={`mt-2 inline-block px-4 py-1 rounded text-white transition ${
                  fb.isApproved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {fb.isApproved ? "Sembunyikan" : "Tampilkan di Landing Page"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
