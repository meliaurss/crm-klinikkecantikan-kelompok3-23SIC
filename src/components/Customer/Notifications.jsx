import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { supabase } from "../../supabase";

export default function Notification({ userId }) {
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const checkPoints = async () => {
      const { data } = await supabase
        .from("point_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        const last = data[0];
        const lastTime = new Date(last.created_at).getTime();
        const now = new Date().getTime();
        const diffMinutes = (now - lastTime) / (1000 * 60);

        if (diffMinutes < 5) setHasNew(true);
      }
    };

    checkPoints();
  }, [userId]);

  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-indigo-600" />
      {hasNew && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full animate-ping" />
      )}
    </div>
  );
}
