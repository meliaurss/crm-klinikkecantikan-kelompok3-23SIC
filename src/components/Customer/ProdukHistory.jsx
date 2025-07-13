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
    <div className="min-h-screen bg-gray-50 py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-sm">
          <span role="img" aria-label="shopping bags"></span>  Pesanan Saya
        </h1>

        {purchaseHistory.length === 0 ? (
          <div className="text-center bg-white rounded-xl shadow-lg py-12 px-6 border border-blue-200">
            <p className="text-gray-700 text-xl mb-6">Belum ada riwayat pesanan. Yuk, mulai belanja!</p>
            <Link
              to="/customer/produk"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              Mulai Belanja Sekarang! <span className="ml-2 text-xl">🛒</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {purchaseHistory.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out border border-blue-200">
                <div className="bg-blue-50 p-6 border-b border-blue-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Pesanan #{order.id}</h2>
                    <p className="text-gray-600 text-sm mt-1">
                      <span className="font-semibold">Tanggal Pesan:</span> {order.date}
                    </p>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
                      order.status === 'Selesai'
                        ? 'bg-green-200 text-green-900'
                        : order.status === 'Diproses'
                        ? 'bg-blue-200 text-blue-900 animate-pulse'
                        : 'bg-red-200 text-red-900'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="p-6">
                  {/* Bagian Alamat Pengiriman, Metode Pengiriman, Metode Pembayaran */}
                  <div className="grid grid-cols-1 gap-y-4 text-gray-700 text-sm mb-6"> {/* Ubah ke grid 1 kolom */}
                    <div>
                      <p className="font-medium mb-1">Alamat Pengiriman:</p>
                      <p className="text-gray-600">{order.address}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Metode Pengiriman:</p>
                      <p className="text-gray-600">{order.deliveryOption}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Metode Pembayaran:</p>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                    </div>
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <h3 className="text-lg font-bold text-gray-800 mb-4">Detail Produk:</h3>
                  <div className="flex flex-col gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4 flex items-center gap-4 border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 object-cover rounded-md border border-gray-300"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-900">{item.name}</h4>
                          <p className="text-gray-600 text-sm mt-1">{formatCurrency(item.price)} x {item.quantity}</p>
                          <p className="text-gray-800 font-extrabold text-md mt-1">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <div className="flex flex-col gap-2 text-gray-700 text-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Subtotal Produk:</span>
                      <span className="font-semibold">{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Ongkos Kirim:</span>
                      <span className="font-semibold">{formatCurrency(order.shippingCost)}</span>
                    </div>
                    {order.appliedCoin > 0 && (
                      <div className="flex justify-between">
                        <span className="font-medium text-red-600">Koin Diterapkan:</span>
                        <span className="font-semibold text-red-600">- {formatCurrency(order.appliedCoin)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-gray-200 mt-3">
                      <span className="font-extrabold text-xl text-gray-900">Total Pembayaran:</span>
                      <span className="font-extrabold text-xl text-blue-600">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}