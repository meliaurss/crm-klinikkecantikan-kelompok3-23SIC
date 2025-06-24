import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

const StarRating = ({ name, value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(name, star)}
          className={`text-xl ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Feedback = () => {
  const [form, setForm] = useState({
    name: "",
    treatment: "",
    doctorRating: 0,
    serviceRating: 0,
    placeRating: 0,
    productRating: 0,
    message: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const POINT_VALUE = 50;

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Gagal mengambil user:", error.message);
      } else {
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Harap login terlebih dahulu.");
      return;
    }

    const { name, treatment, doctorRating, serviceRating, placeRating, productRating, message } = form;

    if (!name || !treatment || !message) {
      alert("Nama, jenis treatment, dan pesan wajib diisi.");
      return;
    }

    setLoading(true);

    // 1. Insert feedback
    const { error: feedbackError } = await supabase.from("feedbacks").insert([
      {
        user_id: user.id,
        name,
        treatment,
        doctor_rating: doctorRating,
        service_rating: serviceRating,
        place_rating: placeRating,
        product_rating: productRating,
        feedback_text: message,
        point_awarded: POINT_VALUE,
        is_approved: false,
      },
    ]);

    if (feedbackError) {
      alert("Gagal menyimpan feedback: " + feedbackError.message);
      setLoading(false);
      return;
    }

    // 2. Insert ke point_history
    const { error: historyError } = await supabase.from("point_history").insert([
      {
        user_id: user.id,
        type: "feedback",
        description: `Feedback untuk ${treatment}`,
        point: POINT_VALUE,
      },
    ]);

    if (historyError) {
      alert("Gagal menyimpan riwayat poin: " + historyError.message);
      setLoading(false);
      return;
    }

    // 3. Tambahkan total poin via RPC
    const { error: pointError } = await supabase.rpc("increment_user_points", {
      uid: user.id,
      point_delta: POINT_VALUE,
    });

    if (pointError) {
      alert("Gagal menambahkan poin: " + pointError.message);
      setLoading(false);
      return;
    }

    // 4. Hapus notifikasi feedback
    await supabase
      .from("notifications")
      .delete()
      .eq("user_id", user.id)
      .eq("type", "feedback");

    alert("Feedback berhasil dikirim! +50 poin ditambahkan.");

    setForm({
      name: "",
      treatment: "",
      doctorRating: 0,
      serviceRating: 0,
      placeRating: 0,
      productRating: 0,
      message: "",
    });
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#181C68]">Feedback Pelanggan</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama Anda"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Jenis Treatment</label>
          <select
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
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

        <div>
          <label className="block mb-1 font-medium">Rating Dokter</label>
          <StarRating name="doctorRating" value={form.doctorRating} onChange={handleRatingChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Pelayanan</label>
          <StarRating name="serviceRating" value={form.serviceRating} onChange={handleRatingChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Tempat</label>
          <StarRating name="placeRating" value={form.placeRating} onChange={handleRatingChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Produk</label>
          <StarRating name="productRating" value={form.productRating} onChange={handleRatingChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Pesan Singkat</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tulis pesan Anda..."
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {loading ? "Mengirim..." : "Kirim Feedback"}
        </button>
      </form>
    </div>
  );
};

export default Feedback;
