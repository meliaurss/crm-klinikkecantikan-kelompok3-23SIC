// src/components/Customer/FormFeedback.jsx
import React, { useState } from "react";
import { supabase } from "../../supabase"; // PASTIKAN PATH INI TETAP BENAR!

// Komponen StarRating tetap sama
const StarRating = ({ rating, setRating, maxStars = 5 }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={`text-3xl ${starValue <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-500 transition-colors duration-200`}
            onClick={() => setRating(starValue)}
            aria-label={`${starValue} out of ${maxStars} stars`}
          >
            &#9733; {/* Unicode character for a star */}
          </button>
        );
      })}
    </div>
  );
};

export default function FormFeedback({ userId, reservationId, treatmentName, onSubmitted, onClose }) {
  const [message, setMessage] = useState(""); // Ini untuk feedback_text
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

    // Validasi dasar: harus ada minimal 1 rating atau catatan
    if (doctorRating === 0 && serviceRating === 0 && placeRating === 0 && productRating === 0 && message.trim() === '') {
      setFeedbackError("Mohon berikan setidaknya satu rating atau tulis catatan.");
      setSubmitting(false);
      return;
    }

    console.log("Submitting feedback for userId:", userId, "and reservationId:", reservationId);
    console.log("Ratings & Message:", { doctorRating, serviceRating, placeRating, productRating, message, treatmentName });

    try {
      // Menggunakan kolom-kolom sesuai skema tabel 'feedbacks' Anda
      const { error } = await supabase.from("feedbacks").insert([
        {
          user_id: userId,
          // Jika reservationId tidak selalu ada, pastikan tidak dikirim atau biarkan null
          // Supabase akan otomatis mengisi 'created_at' dan 'point_awarded' jika ada default value
          // is_approved juga sudah ada default false di Supabase
          reservation_id: reservationId || null, // Kirim null jika reservationId kosong
          treatment: treatmentName || null, // Gunakan prop treatmentName, kirim null jika kosong
          feedback_text: message,
          doctor_rating: doctorRating > 0 ? doctorRating : null,
          service_rating: serviceRating > 0 ? serviceRating : null,
          place_rating: placeRating > 0 ? placeRating : null,
          product_rating: productRating > 0 ? productRating : null,
        },
      ]);

      if (error) {
        throw error;
      }

      // Panggil RPC untuk menambah poin. Pastikan fungsi ini ada di Supabase.
      await supabase.rpc("add_feedback_point", { uid: userId });
      alert('Feedback berhasil dikirim! Poin Anda telah ditambahkan.');
      onSubmitted();
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setFeedbackError("Gagal mengirim feedback: " + err.message + ". Pastikan skema tabel 'feedbacks' Anda sesuai.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {feedbackError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {feedbackError}</span>
        </div>
      )}

      {/* Menampilkan nama treatment jika ada */}
      {treatmentName && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treatment:
          </label>
          <p className="text-lg font-semibold text-indigo-700">{treatmentName}</p>
        </div>
      )}

      <div>
        <label htmlFor="doctorRating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating Dokter:
        </label>
        <StarRating rating={doctorRating} setRating={setDoctorRating} />
      </div>

      <div>
        <label htmlFor="serviceRating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating Layanan:
        </label>
        <StarRating rating={serviceRating} setRating={setServiceRating} />
      </div>

      <div>
        <label htmlFor="placeRating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating Tempat/Klinik:
        </label>
        <StarRating rating={placeRating} setRating={setPlaceRating} />
      </div>

      <div>
        <label htmlFor="productRating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating Produk (jika ada):
        </label>
        <StarRating rating={productRating} setRating={setProductRating} />
      </div>

      <div>
        <label htmlFor="feedbackMessage" className="block text-sm font-medium text-gray-700 mb-2">
          Catatan Tambahan (opsional):
        </label>
        <textarea
          id="feedbackMessage"
          className="w-full border px-4 py-2 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tulis catatan tambahan Anda di sini..."
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={submitting}
      >
        {submitting ? 'Mengirim...' : 'Kirim Feedback'}
      </button>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition duration-200 ease-in-out"
          disabled={submitting}
        >
          Batal
        </button>
      )}
    </form>
  );
}