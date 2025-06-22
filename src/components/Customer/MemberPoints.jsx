import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const MemberPoints = ({ points = 150, tier = 'Silver' }) => {
  const pointHistory = [
    { id: 1, source: 'Feedback Treatment – Facial Glow', date: '21 Juni 2025', amount: 50 },
    { id: 2, source: 'Pembelian Produk – Serum Vitamin C', date: '20 Juni 2025', amount: 100 },
  ];

  const progress = Math.min(100, (points / 1000) * 100);

  const tierColor = {
    Silver: 'bg-gradient-to-r from-slate-300 to-white text-slate-700 shadow-inner',
    Gold: 'bg-gradient-to-r from-yellow-400 to-yellow-100 text-yellow-900 shadow-md',
    Platinum: 'bg-gradient-to-r from-purple-500 to-indigo-400 text-white shadow-lg',
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-6 border border-indigo-100 relative overflow-hidden transition-all"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Tier Badge */}
      <motion.div
        className={`absolute top-0 right-0 m-4 px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${tierColor[tier]} border border-white backdrop-blur-sm`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <div className="flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          {tier} Member
        </div>
      </motion.div>

      {/* Points Info */}
      <motion.div
        className="flex items-center gap-3 mb-6 justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Star className="text-yellow-400 w-8 h-8 animate-pulse drop-shadow" />
        <h2 className="text-4xl font-extrabold text-indigo-700 drop-shadow">+{points} Poin</h2>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress ke Tier Selanjutnya</span>
          <span>{points}/1000</span>
        </div>
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-blue-400 to-pink-400 shadow-inner"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-sm font-bold text-indigo-600 mb-2">Riwayat Poin</h3>
        <div className="space-y-3">
          {pointHistory.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex justify-between items-center p-3 bg-indigo-50 rounded-xl shadow hover:bg-indigo-100 hover:shadow-md transition cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="text-sm font-medium text-indigo-800">{item.source}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <span className="text-indigo-700 font-bold text-sm">+{item.amount}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberPoints;
