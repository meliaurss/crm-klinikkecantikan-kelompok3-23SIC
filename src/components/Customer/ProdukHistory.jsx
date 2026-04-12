import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return "Rp 0"; // Pastikan default value yang konsisten
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Batasi ke 0 desimal untuk tampilan yang lebih bersih jika harga tidak memiliki sen
  }).format(num);
}

export default function ProdukHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Function to load and sort history from localStorage
  const loadPurchaseHistory = () => {
    const stored = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
    // Urutkan riwayat dari yang terbaru ke terlama
    const sortedHistory = stored.sort((a, b) => b.id - a.id);
    setPurchaseHistory(sortedHistory);
  };

  useEffect(() => {
    // Load history initially
    loadPurchaseHistory();

    // Add an event listener for localStorage changes
    window.addEventListener('storage', loadPurchaseHistory);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', loadPurchaseHistory);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="font-['DM_Sans',sans-serif] bg-[#f4f6f8] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-4">
              Pesanan Saya
            </h1>
            <div className="w-12 h-[1px] bg-[#CCD4E1] mx-auto" />
          </div>

          {purchaseHistory.length === 0 ? (
            <div className="text-center bg-[#FCFCFC] rounded-sm shadow-sm p-12 border border-[#e8ecf1] max-w-2xl mx-auto">
              <h2 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-2">Belum Ada Pesanan</h2>
              <p className="text-[#5a6a7e] text-[14px] font-light mb-8">
                Riwayat pesanan Anda masih kosong. Yuk, mulai belanja produk perawatan kulit terbaik kami!
              </p>
              <Link
                to="/customer/produk"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#293A52] text-white font-['DM_Sans',sans-serif] text-[12px] font-medium tracking-widest uppercase rounded-sm hover:bg-[#344a66] transition-colors duration-200"
              >
                Mulai Belanja
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {purchaseHistory.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-[#FCFCFC] rounded-sm shadow-sm hover:shadow-xl hover:shadow-[#293a52]/5 border border-[#e8ecf1] hover:border-[#a8b5c7] transform hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="bg-white p-6 border-b border-[#e8ecf1] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
                        Pesanan #{order.id}
                      </h2>
                      <p className="text-[#5a6a7e] text-[13px] font-light mt-1">
                        <span className="font-medium">Tanggal Pesan:</span> {order.date}
                      </p>
                    </div>
                    <span
                      className={`inline-block px-4 py-1.5 rounded-sm text-[11px] uppercase tracking-widest font-medium border text-center ${
                        order.status === 'Selesai'
                          ? 'bg-[#EEF7F2] text-[#287D3C] border-[#CDE7D5]'
                          : order.status === 'Diproses'
                          ? 'bg-[#F0F4F8] text-[#293A52] border-[#CCD4E1]'
                          : 'bg-[#FFF0F0] text-[#D32F2F] border-[#FFD6D6]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Info Pengiriman & Pembayaran */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[14px] mb-8">
                      <div>
                        <p className="text-[#293A52] font-semibold mb-1">Alamat Pengiriman</p>
                        <p className="text-[#5a6a7e] font-light leading-relaxed">{order.address}</p>
                      </div>
                      <div>
                        <p className="text-[#293A52] font-semibold mb-1">Metode Pengiriman</p>
                        <p className="text-[#5a6a7e] font-light">{order.deliveryOption}</p>
                      </div>
                      <div>
                        <p className="text-[#293A52] font-semibold mb-1">Metode Pembayaran</p>
                        <p className="text-[#5a6a7e] font-light">{order.paymentMethod}</p>
                      </div>
                    </div>

                    <div className="w-full h-[1px] bg-[#e8ecf1] mb-6" />

                    {/* Detail Produk */}
                    <h3 className="text-[15px] font-semibold text-[#293A52] mb-4">Detail Produk</h3>
                    <div className="flex flex-col gap-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-sm p-4 flex items-center gap-5 border border-[#e8ecf1]">
                          <div className="h-20 w-20 flex-shrink-0 bg-[#f4f6f8] rounded-sm p-2 flex items-center justify-center border border-[#e8ecf1]">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-['Playfair_Display',serif] font-semibold text-lg text-[#293A52]">
                              {item.name}
                            </h4>
                            <p className="text-[#5a6a7e] text-[13px] font-light mt-1">
                              {formatCurrency(item.price)} <span className="mx-1">×</span> {item.quantity}
                            </p>
                            <p className="text-[#293A52] font-medium text-[14px] mt-1">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="w-full h-[1px] bg-[#e8ecf1] my-6" />

                    {/* Rincian Pembayaran */}
                    <div className="flex flex-col gap-3 text-[14px] md:ml-auto md:w-1/2">
                      <div className="flex justify-between items-center text-[#5a6a7e]">
                        <span className="font-light">Subtotal Produk</span>
                        <span className="font-medium text-[#293A52]">{formatCurrency(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center text-[#5a6a7e]">
                        <span className="font-light">Ongkos Kirim</span>
                        <span className="font-medium text-[#293A52]">{formatCurrency(order.shippingCost)}</span>
                      </div>
                      {order.appliedCoin > 0 && (
                        <div className="flex justify-between items-center text-[#D32F2F]">
                          <span className="font-light">Koin Diterapkan</span>
                          <span className="font-medium">- {formatCurrency(order.appliedCoin)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-4 border-t border-[#e8ecf1] mt-1">
                        <span className="font-semibold text-[#293A52]">Total Pembayaran</span>
                        <span className="font-['Playfair_Display',serif] font-bold text-xl text-[#293A52]">
                          {formatCurrency(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}