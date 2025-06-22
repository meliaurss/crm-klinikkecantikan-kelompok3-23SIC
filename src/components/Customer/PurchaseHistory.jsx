import React from 'react';

const PurchaseHistory = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-indigo-600 mb-4">Riwayat Pembelian Produk</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-indigo-100 text-indigo-700">
            <th className="p-2 text-left">Produk</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Serum Vitamin C</td>
            <td className="p-2">20 Juni 2025</td>
            <td className="p-2">1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;