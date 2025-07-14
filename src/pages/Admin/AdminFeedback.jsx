import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("feedbacks")
      .select("*, users(name)")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Gagal memuat dari Supabase atau data kosong. Menampilkan data dummy.");
      // Data dummy hanya untuk tampilan sementara
      const dummy = [
        {
          id: "1",
          treatment: "Facial Acne Treatment",
          doctor_rating: 4,
          service_rating: 5,
          place_rating: 5,
          product_rating: 4,
          feedback_text: "Layanan sangat ramah dan hasilnya memuaskan!",
          is_approved: true,
          users: { name: "Amelia Devira" },
        },
        {
          id: "2",
          treatment: "Botox",
          doctor_rating: 5,
          service_rating: 4,
          place_rating: 4,
          product_rating: 5,
          feedback_text: "Dokternya sangat profesional. Tempat juga bersih.",
          is_approved: false,
          users: { name: "Dina Febrianti" },
        },
      ];
      setFeedbacks(dummy);
    } else {
      setFeedbacks(data);
    }
    setLoading(false);
  };

  const toggleApproval = async (id, currentStatus) => {
    const { error } = await supabase
      .from("feedbacks")
      .update({ is_approved: !currentStatus })
      .eq("id", id);

    if (error) {
      alert("Gagal memperbarui status: " + error.message);
    } else {
      fetchFeedbacks();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#181C68]">Kelola Feedback Pelanggan</h1>

      {loading ? (
        <p className="text-gray-500">Memuat data...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">Tidak ada feedback masuk.</p>
      ) : (
        <div className="grid gap-4">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="border p-4 rounded shadow">
              <p className="font-bold text-[#181C68]">{fb.users?.name || "Tidak diketahui"}</p>
              <p className="text-sm text-gray-600">Treatment: {fb.treatment}</p>
              <p className="text-sm">
                ⭐ Dokter: {fb.doctor_rating} | ⭐ Pelayanan: {fb.service_rating} | ⭐ Tempat: {fb.place_rating}
              </p>
              <p className="italic mt-2">"{fb.feedback_text}"</p>
              <button
                onClick={() => toggleApproval(fb.id, fb.is_approved)}
                className={`mt-2 inline-block px-4 py-1 rounded text-white transition ${
                  fb.is_approved ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {fb.is_approved ? "Sembunyikan" : "Tampilkan di Landing Page"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
