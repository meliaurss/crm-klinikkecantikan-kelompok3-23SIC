// src/components/Customer/FormFeedback.jsx
import React, { useState } from "react";
import { supabase } from "../../supabase";

const StarRating = ({ rating, setRating, maxStars = 5 }) => (
  <div className="flex gap-1">
    {[...Array(maxStars)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={starValue}
          type="button"
          className={`text-2xl ${starValue <= rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500`}
          onClick={() => setRating(starValue)}
        >
          ★
        </button>
      );
    })}
  </div>
);

export default function FormFeedback({ userId, reservationId, treatmentName, onSubmitted, onClose }) {
  const [message, setMessage] = useState("");
  const [doctorRating, setDoctorRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [placeRating, setPlaceRating] = useState(0);
  const [productRating, setProductRating] = useState(0);
  const [feedbackError, setFeedbackError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackError(null);

    if (doctorRating === 0 && serviceRating === 0 && placeRating === 0 && productRating === 0 && message.trim() === "") {
      setFeedbackError("Mohon isi minimal satu rating atau masukan.");
      setSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("feedbacks").insert([
        {
          user_id: userId,
          reservation_id: reservationId || null,
          treatment: treatmentName || null,
          feedback_text: message,
          doctor_rating: doctorRating || null,
          service_rating: serviceRating || null,
          place_rating: placeRating || null,
          product_rating: productRating || null,
        },
      ]);

      if (error) throw error;

      await supabase.rpc("add_feedback_point", { uid: userId });
      alert("Feedback berhasil dikirim!");
      onSubmitted();
    } catch (err) {
      console.error(err);
      setFeedbackError("Gagal mengirim feedback: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow space-y-6 overflow-y-auto max-h-[80vh]">
      <h2 className="text-xl font-bold text-indigo-700">Form Feedback</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {treatmentName && (
          <div className="col-span-full">
            <p className="text-lg font-semibold text-indigo-700">Treatment: {treatmentName}</p>
          </div>
        )}

        <div>
          <label className="block mb-1 font-medium">Rating Dokter</label>
          <StarRating rating={doctorRating} setRating={setDoctorRating} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Layanan</label>
          <StarRating rating={serviceRating} setRating={setServiceRating} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Tempat/Klinik</label>
          <StarRating rating={placeRating} setRating={setPlaceRating} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Rating Produk (opsional)</label>
          <StarRating rating={productRating} setRating={setProductRating} />
        </div>

        <div className="col-span-full">
          <label className="block mb-1 font-medium">Catatan Tambahan</label>
          <textarea
            className="w-full border rounded p-2"
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis catatan tambahan..."
          />
        </div>

        {feedbackError && (
          <div className="col-span-full text-red-600 font-medium">{feedbackError}</div>
        )}

        <div className="col-span-full flex flex-col md:flex-row gap-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
            disabled={submitting}
          >
            {submitting ? "Mengirim..." : "Kirim Feedback"}
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded"
              disabled={submitting}
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
