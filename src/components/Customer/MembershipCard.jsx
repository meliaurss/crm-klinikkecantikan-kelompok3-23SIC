import React from "react";
import { Sparkles } from "lucide-react";

export default function MembershipCard({ tier = "Basic", points = 0 }) {
  // Palet warna yang selaras dengan identitas klinik (elegan dan premium)
  const tierStyles = {
    Basic: "bg-[#f4f6f8] text-[#5a6a7e] border-[#CCD4E1]",
    Silver: "bg-[#FCFCFC] text-[#293A52] border-[#a8b5c7]",
    Gold: "bg-[#FCF9F2] text-[#B8860B] border-[#D4AF37]",
    Platinum: "bg-[#293A52] text-[#FCFCFC] border-[#293A52]",
  };

  // Penyesuaian warna teks utama agar tetap kontras dan terbaca
  const textStyles = {
    Basic: "text-[#293A52]",
    Silver: "text-[#293A52]",
    Gold: "text-[#9E730A]",
    Platinum: "text-[#FCFCFC]",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className={`rounded-sm p-6 shadow-sm border w-full relative overflow-hidden font-['DM_Sans',sans-serif] transition-all duration-300 ${tierStyles[tier]}`}>
        {/* Aksen cahaya redup di pojok kanan atas untuk menambah kesan elegan */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 pointer-events-none" />

        <div className="flex justify-between items-center mb-6 relative z-10">
          <span className="text-[12px] font-medium uppercase tracking-widest opacity-80">
            {tier} Member
          </span>
          <Sparkles className="w-4 h-4 opacity-80" />
        </div>
        
        <div className="relative z-10">
          <p className="text-[11px] uppercase tracking-wider opacity-70 mb-1">Total Poin</p>
          <h2 className={`text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold ${textStyles[tier]}`}>
            {points} <span className="text-lg font-light opacity-70">pts</span>
          </h2>
        </div>
      </div>
    </>
  );
}