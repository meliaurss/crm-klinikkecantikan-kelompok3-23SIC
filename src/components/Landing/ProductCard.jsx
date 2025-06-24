// import React from 'react';

// const ProductCard = ({ nama, harga, rating, review, gambar, onReservasi }) => (
//   <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl flex flex-col h-full transition-all duration-300">
//     <div className="bg-gray-100 h-48 flex items-center justify-center rounded-md overflow-hidden mb-4">
//       <img src={gambar} alt={nama} className="w-full h-full object-cover" />
//     </div>
//     <div className="flex justify-between items-start mb-2">
//       <div>
//         <h3 className="text-gray-800 font-semibold text-sm mb-1">{nama}</h3>
//         <p className="text-indigo-700 font-semibold text-sm">Rp{harga.toLocaleString()}</p>
//       </div>
//       <button className="text-gray-400 hover:text-red-400 text-xl">♡</button>
//     </div>
//     <div className="flex items-center text-sm text-gray-600 mb-4">
//       <span className="text-yellow-400 mr-1">
//         {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
//       </span>
//       <span>({review})</span>
//     </div>
//     <button
//       onClick={onReservasi}
//       className="mt-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-2 rounded-md hover:brightness-110 transition"
//     >
//       Beli Sekarang
//     </button>
//   </div>
// );

// export default ProductCard;
