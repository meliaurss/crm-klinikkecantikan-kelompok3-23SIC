import React from "react";
import { Sparkles } from "lucide-react";

export default function MembershipCard({ tier = "Basic", points = 0 }) {
  const tierColor = {
    Basic: "bg-gray-100 text-gray-700",
    Silver: "bg-slate-200 text-slate-700",
    Gold: "bg-yellow-300 text-yellow-900",
    Platinum: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
  };

  return (
    <div className={`rounded-2xl p-4 shadow-md w-full ${tierColor[tier]}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold uppercase tracking-wide">
          {tier} Member
        </span>
        <Sparkles className="w-5 h-5" />
      </div>
      <h2 className="text-2xl font-bold">{points} Poin</h2>
    </div>
  );
}
