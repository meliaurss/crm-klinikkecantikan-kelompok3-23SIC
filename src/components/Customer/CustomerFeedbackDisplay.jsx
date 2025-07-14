import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale'; // Untuk format tanggal Indonesia

const StarDisplay = ({ rating }) => {
  if (rating === null || rating === undefined || rating === 0) {
    return <span className="text-gray-400 italic text-sm">Belum ada rating</span>;
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

export default function CustomerFeedbackDisplay() {
  // Data dummy untuk feedback
  const dummyFeedbacks = [
    {
      id: 'feedback-1',
      feedback_text: 'Pelayanan dokter sangat ramah dan informatif. Klinik juga bersih!',
      doctor_rating: 5,
      service_rating: 5,
      place_rating: 4,
      product_rating: null,
      is_approved: true,
      created_at: '2025-07-10T10:00:00Z',
      treatment: 'Facial Whitening',
      users: { name: 'Customer Mahacare', email: 'customer@example.com' } // Dummy user data
    },
    {
      id: 'feedback-2',
      feedback_text: 'Produk yang direkomendasikan sangat cocok untuk kulit saya. Terima kasih!',
      doctor_rating: 4,
      service_rating: 4,
      place_rating: 5,
      product_rating: 5,
      is_approved: true,
      created_at: '2025-07-08T14:30:00Z',
      treatment: 'Acne Treatment',
      users: { name: 'Sarah Konami', email: 'sarah@example.com' }
    },
    {
      id: 'feedback-3',
      feedback_text: 'Antrian agak panjang, tapi hasilnya memuaskan.',
      doctor_rating: 4,
      service_rating: 3,
      place_rating: 3,
      product_rating: null,
      is_approved: true,
      created_at: '2025-07-05T09:15:00Z',
      treatment: 'Laser Rejuvenation',
      users: { name: 'Budi Santoso', email: 'budi@example.com' }
    },
    {
      id: 'feedback-4',
      feedback_text: 'Belum ada catatan tambahan.',
      doctor_rating: 0,
      service_rating: 0,
      place_rating: 0,
      product_rating: 0,
      is_approved: false, // Contoh feedback yang belum disetujui (tidak akan terlihat di sini jika filter on is_approved)
      created_at: '2025-07-01T11:00:00Z',
      treatment: 'Konsultasi Kulit',
      users: { name: 'Dummy User', email: 'dummy@example.com' }
    }
  ].filter(fb => fb.is_approved); // Filter hanya yang sudah disetujui untuk ditampilkan ke customer

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-indigo-800 mb-6 text-center">Feedback Pelanggan</h2>

      {dummyFeedbacks.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Belum ada feedback yang disetujui untuk ditampilkan.</p>
      ) : (
        <div className="space-y-6">
          {dummyFeedbacks.map((fb) => (
            <div key={fb.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {fb.users?.name || fb.users?.email || 'Anonim'}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(fb.created_at), 'dd MMMM yyyy', { locale: id })}
                </p>
              </div>
              {fb.treatment && (
                <p className="text-sm text-indigo-600 font-medium mb-2">
                  Treatment: {fb.treatment}
                </p>
              )}
              {fb.feedback_text && (
                <p className="text-gray-700 mb-3 text-sm italic">"{fb.feedback_text}"</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {fb.doctor_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Dokter:</span>
                    <StarDisplay rating={fb.doctor_rating} />
                  </div>
                )}
                {fb.service_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Layanan:</span>
                    <StarDisplay rating={fb.service_rating} />
                  </div>
                )}
                {fb.place_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Tempat:</span>
                    <StarDisplay rating={fb.place_rating} />
                  </div>
                )}
                {fb.product_rating > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-600">Produk:</span>
                    <StarDisplay rating={fb.product_rating} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}