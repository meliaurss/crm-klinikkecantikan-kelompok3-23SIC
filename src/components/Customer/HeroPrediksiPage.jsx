// import React from "react";
// import { useNavigate } from "react-router-dom";Add commentMore actions
// import { motion } from "framer-motion";
// import { FaStar } from "react-icons/fa";

// export default function HeroPrediksiPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gradient-to-tr from-blue-100 via-white to-blue-200 py-20 px-6 text-center relative overflow-hidden">
//       <div className="absolute top-[-40px] left-[-40px] w-80 h-80 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute bottom-[-40px] right-[-40px] w-80 h-80 bg-purple-300 opacity-30 rounded-full blur-3xl animate-ping" />

//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-md"
//       >
//         Temukan Rekomendasi Produk Kulit Terbaik untukmu 💫
//       </motion.h1>

//       <motion.p
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5, duration: 1 }}
//         className="mt-4 text-lg text-blue-700"
//       >
//         Berdasarkan kondisi kulitmu, kami bantu cari produk yang cocok & terpercaya
//       </motion.p>

//       <motion.button
//         onClick={() => navigate("/prediksi/form")}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:opacity-90 transition duration-300"
//       >
//         Mulai Prediksi Sekarang
//       </motion.button>

//       <motion.div
//         className="flex justify-center gap-4 mt-6 text-blue-500"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 1, duration: 0.5 }}
//       >
//         <FaStar className="text-xl animate-bounce" />
//         <FaStar className="text-xl animate-bounce delay-200" />
//         <FaStar className="text-xl animate-bounce delay-400" />
//       </motion.div>
//     </div>
//   );
// }