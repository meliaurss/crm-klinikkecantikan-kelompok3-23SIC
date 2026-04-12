import React, { useEffect, useState } from "react";
import { Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../supabase";

const MemberPoints = () => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [tier, setTier] = useState("Basic");
  const [history, setHistory] = useState([]);

  const getTier = (pts) => {
    if (pts >= 1000) return "Platinum";
    if (pts >= 500) return "Gold";
    if (pts >= 250) return "Silver";
    return "Basic";
  };

  const fetchData = async () => {
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      console.error("Gagal mengambil user:", authError?.message);
      return;
    }

    const currentUser = authData.user;
    setUser(currentUser);

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("points")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (userError) {
      console.error("Gagal mengambil poin user:", userError.message);
      return;
    }

    const totalPoints = userData?.points || 0;
    setPoints(totalPoints);
    setTier(getTier(totalPoints));

    const { data: historyData, error: historyError } = await supabase
      .from("point_history")
      .select("id, description, created_at, point")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (historyError) {
      console.error("Gagal mengambil riwayat poin:", historyError.message);
      return;
    }

    const mapped = historyData.map((item) => ({
      id: item.id,
      source: item.description,
      date: new Date(item.created_at).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      amount: item.point,
    }));

    setHistory(mapped);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const progress = Math.min(100, (points / 1000) * 100);

  // Palet warna tier yang lebih elegan & premium
  const tierStyles = {
    Basic: "bg-[#f4f6f8] text-[#5a6a7e] border border-[#CCD4E1]",
    Silver: "bg-[#f4f6f8] text-[#293A52] border border-[#a8b5c7]",
    Gold: "bg-[#FCF9F2] text-[#B8860B] border border-[#D4AF37]",
    Platinum: "bg-[#293A52] text-[#FCFCFC] border border-[#293A52] shadow-sm",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <motion.div
        className="bg-white rounded-sm shadow-sm border border-[#e8ecf1] p-8 md:p-10 relative overflow-hidden font-['DM_Sans',sans-serif]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Latar Belakang Dekoratif Subtle */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4f6f8] rounded-bl-full opacity-50 z-0 transform translate-x-10 -translate-y-10" />

        <div className="relative z-10">
          {/* Header Kartu Poin & Badge Tier */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[#5a6a7e] text-[13px] uppercase tracking-wider font-medium mb-2">
                Total Poin Anda
              </p>
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
                  {points} <span className="text-2xl text-[#a8b5c7] font-light">pts</span>
                </h2>
              </motion.div>
            </div>

            <motion.div
              className={`px-4 py-1.5 text-[12px] font-medium rounded-sm tracking-wide flex items-center gap-2 ${tierStyles[tier]}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="uppercase">{tier}</span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <div className="mb-10 bg-[#f4f6f8] p-5 rounded-sm border border-[#e8ecf1]">
            <div className="flex justify-between text-[13px] text-[#5a6a7e] mb-3 font-medium">
              <span>Progres menuju Tier Berikutnya</span>
              <span className="text-[#293A52]">{points} / 1000 pts</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#CCD4E1] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-[#293A52]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>

          <hr className="border-[#e8ecf1] mb-8" />

          {/* Riwayat Poin */}
          <div>
            <h3 className="text-[16px] font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-4">
              Riwayat Poin
            </h3>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
              {history.length === 0 ? (
                <p className="text-[14px] text-[#a8b5c7] font-light italic py-4 text-center border border-dashed border-[#CCD4E1] rounded-sm">
                  Belum ada aktivitas poin.
                </p>
              ) : (
                history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex justify-between items-center py-4 px-2 border-b border-[#e8ecf1] hover:bg-[#fcfcfc] transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    <div>
                      <p className="text-[14px] font-medium text-[#293A52] mb-1">
                        {item.source}
                      </p>
                      <p className="text-[12px] text-[#5a6a7e]">
                        {item.date}
                      </p>
                    </div>
                    <span className="text-[#293A52] font-semibold text-[15px] bg-[#f4f6f8] px-3 py-1 rounded-sm border border-[#e8ecf1]">
                      +{item.amount}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tambahan CSS untuk scrollbar tipis agar terlihat rapi */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f4f6f8;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CCD4E1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8b5c7;
        }
      `}</style>
    </>
  );
};

export default MemberPoints;