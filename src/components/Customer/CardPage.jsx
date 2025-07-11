// src/pages/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/outline'; // Untuk ikon hapus
// import { supabase } from "../../supabase.js"; // Supabase tidak langsung digunakan di sini untuk state keranjang, tapi bisa untuk menyimpan ke DB

// Fungsi pembantu untuk memformat mata uang (gunakan yang sudah ada di AllProducts.jsx jika sama)
function formatCurrency(num) {
  if (typeof num !== 'number' || isNaN(num) || num === null) {
    return "Rp 0,00";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

// Komponen CartPage menerima props cartItems, handleUpdateQuantity, dan handleRemoveItem
const CartPage = ({ cartItems, handleUpdateQuantity, handleRemoveItem }) => { // Menerima props
  const [couponCode, setCouponCode] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [removedItemMessage, setRemovedItemMessage] = useState(''); // State untuk pesan "removed. Undo?"

  // Hitung subtotal dan total setiap kali cartItems berubah
  useEffect(() => {
    // Pastikan item.price dan item.quantity valid sebelum perhitungan
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
    setSubtotal(newSubtotal);
    // Untuk contoh ini, total sama dengan subtotal. Anda bisa menambahkan diskon, ongkir di sini.
    setTotal(newSubtotal);
  }, [cartItems]); // Efek bergantung pada perubahan cartItems

  const handleRemoveItemWithFeedback = (id, itemName) => {
    handleRemoveItem(id); // Panggil fungsi penghapusan dari props
    setRemovedItemMessage(`"${itemName}" removed. Undo?`);
    // Opsional: set timeout untuk menyembunyikan pesan setelah beberapa detik
    setTimeout(() => setRemovedItemMessage(''), 5000);
  };

  const handleApplyCoupon = () => {
    alert(`Menerapkan kupon: ${couponCode}`);
    // TODO: Logika penerapan kupon dan recalculate total
  };

  const handleUpdateCart = () => {
    alert("Keranjang diperbarui!");
    // Dalam kasus ini, kuantitas sudah otomatis diperbarui oleh handleUpdateQuantity
    // Namun, Anda bisa menambahkan logika sinkronisasi dengan backend di sini
  };

  const handleProceedToCheckout = () => {
    alert("Lanjut ke Checkout!");
    // TODO: Navigasi ke halaman checkout
  };

  return (
    <div className="cart-page bg-gray-50 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Cart</h1>

        {removedItemMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{removedItemMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setRemovedItemMessage('')}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.697l-2.651 2.652a1.2 1.2 0 1 1-1.697-1.697L8.303 10 5.651 7.348a1.2 1.2 0 1 1 1.697-1.697L10 8.303l2.651-2.652a1.2 1.2 0 1 1 1.697 1.697L11.697 10l2.652 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-xl mb-4">Keranjang Anda kosong.</p>
            <Link to="/products-all" className="text-blue-600 hover:underline">
              Mulai belanja sekarang!
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="w-full bg-white rounded-lg shadow p-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20"></th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleRemoveItemWithFeedback(item.id, item.name)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Hapus Item"
                        >
                          <XCircleIcon className="h-6 w-6" />
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l hover:bg-gray-300"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 text-center border-t border-b border-gray-200 py-1"
                            min="1"
                          />
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                  >
                    Apply Coupon
                  </button>
                </div>
                <button
                  onClick={handleUpdateCart}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
                >
                  Update Cart
                </button>
              </div>
            </div>

            <div className="w-full bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Cart totals</h2>
              <div className="divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-bold text-gray-800 text-lg">Total</span>
                  <span className="font-bold text-gray-900 text-lg">{formatCurrency(total)}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="mt-6 w-full bg-[#6a902c] text-white py-3 rounded-lg font-semibold hover:bg-[#5a7d25] transition"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;