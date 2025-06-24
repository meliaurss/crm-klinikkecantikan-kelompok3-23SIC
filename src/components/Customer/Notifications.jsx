import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Ambil data user saat login
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Insert notifikasi otomatis (misalnya setelah treatment selesai)
  useEffect(() => {
    const insertNotificationIfNeeded = async () => {
      if (!user) return;

      const { data: existing, error: existingError } = await supabase
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("type", "feedback");

      // Jika belum pernah dikirim notifikasi feedback
      if (!existingError && existing.length === 0) {
        const treatmentName = "Facial Glow"; // ganti sesuai logic treatment selesai

        const { error: insertError } = await supabase.from("notifications").insert([
          {
            user_id: user.id,
            type: "feedback",
            message: `Jangan lupa isi feedback untuk treatment ${treatmentName}!`,
          },
        ]);

        if (insertError) {
          console.error("Gagal menyimpan notifikasi:", insertError.message);
        } else {
          console.log("Notifikasi feedback berhasil dibuat.");
        }
      }
    };

    insertNotificationIfNeeded();
  }, [user]);

  // Ambil notifikasi dari Supabase
  const fetchNotifications = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat notifikasi:", error.message);
    } else {
      setNotifications(data);
    }
    setLoading(false);
  };

  // Panggil saat user tersedia
  useEffect(() => {
    if (user) fetchNotifications();
  }, [user]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-indigo-600 mb-4">Notifikasi</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Memuat notifikasi...</p>
      ) : notifications.length === 0 ? (
        <p className="text-sm text-gray-400">Tidak ada notifikasi.</p>
      ) : (
        <ul className="list-disc ml-5 text-sm space-y-2">
          {notifications.map((n) => (
            <li key={n.id} className="text-gray-700">
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
