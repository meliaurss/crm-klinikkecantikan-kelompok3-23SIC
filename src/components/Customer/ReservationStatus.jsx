import React, { useEffect } from 'react';

const ReservationStatus = () => {
  const reservations = [
    {
      layanan: 'Facial Glow',
      tanggal: '22 Juni 2025',
      status: 'Selesai',
    },
    // Tambah data reservasi lain jika diperlukan
  ];

  useEffect(() => {
    const hasCompletedTreatment = reservations.some(r => r.status === 'Selesai');
    if (hasCompletedTreatment) {
      localStorage.setItem('treatmentDone', 'true');
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-semibold text-indigo-600 mb-4">Riwayat Reservasi</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-indigo-100 text-indigo-700">
            <th className="p-2 text-left">Layanan</th>
            <th className="p-2">Tanggal</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((r, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{r.layanan}</td>
              <td className="p-2">{r.tanggal}</td>
              <td
                className={`p-2 font-medium ${
                  r.status === 'Selesai' ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationStatus;
