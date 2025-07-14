// src/components/Admin/FeedbackManagement.jsx
import React, { useEffect, useState, useCallback } from "react"; // Tambahkan useCallback

const StarDisplay = ({ rating }) => {
  if (rating === null || rating === undefined || rating === 0) {
    return <span className="text-gray-400 italic text-sm">-</span>;
  }
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={`text-xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

// Ubah menjadi komponen yang dapat menerima props jika Anda ingin menggunakannya
// untuk menambahkan feedback dari komponen lain (seperti modal)
export default function FeedbackManagement({ onNewFeedback }) { // Tambahkan props onNewFeedback
  const initialDummyFeedbacks = [
    {
      id: 'fb-dummy-1',
      feedback_text: 'Dokter sangat profesional dan tempatnya nyaman sekali!',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 5,
      product_rating: null,
      is_approved: true,
      created_at: '2025-07-13T10:00:00Z',
      users: { name: 'Budi Santoso', email: 'budi@example.com' }
    },
    {
      id: 'fb-dummy-2',
      feedback_text: 'Layanan customer service perlu ditingkatkan, respons agak lambat.',
      doctor_rating: 4,
      service_rating: 3,
      place_rating: 4,
      product_rating: null,
      is_approved: false,
      created_at: '2025-07-12T14:30:00Z',
      users: { name: 'Siti Aminah', email: 'siti@example.com' }
    },
    {
      id: 'fb-dummy-3',
      feedback_text: 'Produk rekomendasi dokter sangat bagus, jerawat saya membaik.',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 5,
      product_rating: 5,
      is_approved: true,
      created_at: '2025-07-11T09:15:00Z',
      users: { name: 'Rina Wijaya', email: 'rina@example.com' }
    },
    {
      id: 'fb-dummy-4',
      feedback_text: 'Ruang tunggu agak sempit saat ramai.',
      doctor_rating: 4,
      service_rating: 4,
      place_rating: 3,
      product_rating: null,
      is_approved: false,
      created_at: '2025-07-10T11:00:00Z',
      users: { name: 'Doni Pratama', email: 'doni@example.com' }
    },
    {
      id: 'fb-dummy-5',
      feedback_text: 'Tidak ada keluhan, semuanya baik.',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 5,
      product_rating: null,
      is_approved: true,
      created_at: '2025-07-09T16:00:00Z',
      users: { name: 'Eka Putri', email: 'eka@example.com' }
    },
  ];

  const [feedbacks, setFeedbacks] = useState(initialDummyFeedbacks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk menambahkan feedback baru
  const addFeedback = useCallback((newFeedback) => {
    setFeedbacks(prevFeedbacks => [
      {
        ...newFeedback,
        id: fb-dummy-${prevFeedbacks.length + 1}-${Date.now()}, // ID unik dummy
        created_at: new Date().toISOString(),
        is_approved: false, // Feedback baru biasanya menunggu persetujuan
        users: { name: newFeedback.name || 'Anonymous', email: 'user@example.com' } // Asumsi user
      },
      ...prevFeedbacks, // Tambahkan di paling atas
    ]);
  }, []);

  const toggleApproval = (id, currentApprovedStatus) => {
    setFeedbacks(prevFeedbacks =>
      prevFeedbacks.map(fb =>
        fb.id === id ? { ...fb, is_approved: !currentApprovedStatus } : fb
      )
    );
  };

  useEffect(() => {
    console.log("Feedback Management dengan data dummy siap.");
    // Jika onNewFeedback diberikan, maka kita bisa mendaftarkan fungsi addFeedback
    // ke event handler di komponen induk (jika ada).
    // Dalam kasus ini, kita akan melewati ini dan memanggilnya langsung dari modal
    // atau komponen yang merender FeedbackManagement ini.
  }, []); // Array dependensi kosong agar hanya berjalan sekali

  if (loading) {
    return <div className="p-6 text-center text-gray-700">Memuat feedback...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-full overflow-x-auto">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Manajemen Feedback Pelanggan (Dummy Data)</h1>
      
      {/* Tombol untuk membuka modal feedback - Contoh saja, Anda bisa menempatkannya di tempat lain */}
      {/* Ini hanya contoh jika Anda ingin tombol "Tambah Feedback" di sini */}
      <div className="mb-4 text-right">
        {/* Tombol ini akan memicu modal dari komponen induk */}
        {/* <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => { /* Logika untuk membuka modal di komponen induk */}
          {/* Tambah Feedback Dummy */}
        {/* </button> */}
      </div>

      {feedbacks.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Belum ada feedback yang tersedia.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Nama Pelanggan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Feedback Text
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Rating Dokter
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Rating Layanan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Rating Tempat
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Rating Produk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((fb) => (
              <tr key={fb.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {fb.users ? fb.users.name || fb.users.email : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis">
                  {fb.feedback_text || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <StarDisplay rating={fb.doctor_rating} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <StarDisplay rating={fb.service_rating} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <StarDisplay rating={fb.place_rating} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <StarDisplay rating={fb.product_rating} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      fb.is_approved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {fb.is_approved ? "Disetujui" : "Menunggu"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {new Date(fb.created_at).toLocaleDateString('id-ID', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => toggleApproval(fb.id, fb.is_approved)}
                    className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 ${
                      fb.is_approved ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {fb.is_approved ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}