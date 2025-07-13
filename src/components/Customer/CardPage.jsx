import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { XCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// Fungsi pembantu untuk memformat mata uang
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

// Data dummy untuk metode pembayaran dan pengiriman
const paymentMethods = [
  { id: 'transfer_bank', name: 'Transfer Bank', icon: '🏦' },
  { id: 'ewallet', name: 'E-Wallet (OVO, GoPay, Dana)', icon: '📱' },
  { id: 'kartu_kredit', name: 'Kartu Kredit / Debit', icon: '💳' },
];

const deliveryOptions = [
  { id: 'jnt', name: 'J&T Express', cost: 15000, estimatedTime: '2-3 hari' },
  { id: 'jne', name: 'JNE Reguler', cost: 18000, estimatedTime: '2-4 hari' },
  { id: 'gojek_instant', name: 'Gojek Instant', cost: 25000, estimatedTime: '1-2 jam' },
  { id: 'grab_express', name: 'GrabExpress Sameday', cost: 20000, estimatedTime: '3-6 jam' },
];

const CartPage = ({ cartItems, handleUpdateQuantity, handleRemoveItem }) => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const [coinInput, setCoinInput] = useState('');
  const [appliedCoin, setAppliedCoin] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);
  const [removedItemMessage, setRemovedItemMessage] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');
  const [address, setAddress] = useState('');

  // States for toggling visibility of options
  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);

  // Derive selected method display names
  const selectedDeliveryName = deliveryOptions.find(opt => opt.id === selectedDeliveryOption)?.name;
  const selectedPaymentName = paymentMethods.find(method => method.id === selectedPaymentMethod)?.name;

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
    setSubtotal(newSubtotal);

    const selectedOption = deliveryOptions.find(opt => opt.id === selectedDeliveryOption);
    const newShippingCost = selectedOption ? selectedOption.cost : 0;
    setShippingCost(newShippingCost);

    // Ensure appliedCoin doesn't make total negative if subtotal + shipping is less than appliedCoin
    const calculatedTotal = newSubtotal + newShippingCost - appliedCoin;
    setTotal(calculatedTotal < 0 ? 0 : calculatedTotal);
  }, [cartItems, selectedDeliveryOption, appliedCoin]);

  const handleRemoveItemWithFeedback = (id, itemName) => {
    handleRemoveItem(id);
    setRemovedItemMessage(`"${itemName}" removed. Undo?`);
    toast.success(`"${itemName}" dihapus dari keranjang!`);
    setTimeout(() => setRemovedItemMessage(''), 5000);
  };

  const handleApplyCoin = () => {
    const coinValue = parseInt(coinInput);
    if (isNaN(coinValue) || coinValue <= 0) {
      toast.error('Masukkan jumlah koin yang valid.');
      setAppliedCoin(0);
      return;
    }

    if (coinValue > subtotal) {
      toast.error(`Koin yang digunakan tidak boleh melebihi subtotal (${formatCurrency(subtotal)}).`);
      setAppliedCoin(subtotal); // Cap applied coins at subtotal
    } else {
      setAppliedCoin(coinValue);
      toast.success(`Berhasil menerapkan ${coinValue} Koin! `);
    }
  };

  const handleUpdateCart = () => {
    toast.success("Keranjang diperbarui!");
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Keranjang Anda kosong, tidak bisa checkout.");
      return;
    }
    if (!address.trim()) {
      toast.error("Alamat pengiriman harus diisi.");
      return;
    }
    if (!selectedDeliveryOption) {
      toast.error("Pilih metode pengiriman.");
      return;
    }
    if (!selectedPaymentMethod) {
      toast.error("Pilih metode pembayaran.");
      return;
    }

    toast.loading("Memproses pesanan Anda...", { id: 'checkoutToast' });

    setTimeout(() => {
      // Dapatkan data riwayat sebelumnya
      const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

      // Buat data pesanan baru
      const newOrder = {
        id: Date.now(), // Pakai timestamp supaya unik
        items: cartItems,
        subtotal,
        shippingCost,
        appliedCoin,
        total,
        paymentMethod: selectedPaymentMethod,
        deliveryOption: selectedDeliveryOption,
        address,
        status: "Diproses",
        date: new Date().toLocaleDateString("id-ID", {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      };

      // Simpan ke localStorage
      localStorage.setItem("purchaseHistory", JSON.stringify([newOrder, ...existingHistory]));

      toast.success("Pesanan berhasil dibuat!", { id: 'checkoutToast' });

      // Redirect ke halaman ProdukHistory.jsx
      navigate("/customer/riwayat-pesanan"); // Baris ini yang ditambahkan/diperbaiki
    }, 2000);
  };

  return (
    <div className="cart-page bg-gray-50 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {removedItemMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{removedItemMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setRemovedItemMessage('')}>
              <XCircleIcon className="fill-current h-6 w-6 text-green-500" />
            </span>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-xl mb-4">Keranjang Anda kosong. Yuk, tambahkan produk favorit Anda!</p>
            <Link to="/products-all" className="text-blue-600 hover:underline inline-flex items-center gap-1">
              <span className="font-semibold">Mulai belanja sekarang!</span> <span className="text-xl">🛍️</span>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Bagian Produk di Keranjang */}
            <div className="w-full bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Produk di Keranjang</h2>
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
                            aria-label="Kurangi kuantitas"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                            className="w-16 text-center border-t border-b border-gray-200 py-1"
                            min="1"
                            aria-label={`Kuantitas ${item.name}`}
                          />
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r hover:bg-gray-300"
                            aria-label="Tambah kuantitas"
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
                    type="number"
                    placeholder="Jumlah Koin"
                    value={coinInput}
                    onChange={(e) => setCoinInput(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <button
                    onClick={handleApplyCoin}
                    className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                  >
                    Terapkan Koin
                  </button>
                </div>
                <button
                  onClick={handleUpdateCart}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full sm:w-auto"
                >
                  Perbarui Keranjang
                </button>
              </div>
            </div>

            {/* Bagian Detail Pengiriman */}
            <div className="w-full bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Detail Pengiriman</h2>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Alamat Pengiriman Lengkap *</label>
                <textarea
                  id="address"
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                  placeholder="Contoh: Jl. Sudirman No. 123, Pekanbaru, Riau, 28282"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Pilihan Pengiriman (Toggleable) */}
              <button
                onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                className="w-full text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between font-semibold text-gray-700"
              >
                Pilih Metode Pengiriman
                {showDeliveryOptions ? <ChevronUpIcon className="h-5 w-5 ml-auto" /> : <ChevronDownIcon className="h-5 w-5 ml-auto" />}
              </button>
              {showDeliveryOptions ? (
                <div className="space-y-3 p-2 border border-gray-200 rounded-md mt-3">
                  {deliveryOptions.map(option => (
                    <div key={option.id} className="flex items-center">
                      <input
                        id={`delivery-${option.id}`}
                        name="deliveryOption"
                        type="radio"
                        value={option.id}
                        checked={selectedDeliveryOption === option.id}
                        onChange={(e) => {
                          setSelectedDeliveryOption(e.target.value);
                          setShowDeliveryOptions(false); // Close after selection
                        }}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor={`delivery-${option.id}`} className="ml-3 block text-base font-medium text-gray-700">
                        {option.name} <span className="text-gray-500 text-sm">({formatCurrency(option.cost)} - {option.estimatedTime})</span>
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                selectedDeliveryOption && (
                  <div className="mt-3 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-gray-900 font-semibold">
                      {selectedDeliveryName} <span className="text-gray-600 text-sm">
                        ({formatCurrency(deliveryOptions.find(opt => opt.id === selectedDeliveryOption)?.cost)})
                      </span>
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Bagian Metode Pembayaran */}
            <div className="w-full bg-white rounded-lg shadow p-6">
              <button
                onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                className="w-full text-left py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center justify-between font-semibold text-gray-700"
              >
                Pilih Metode Pembayaran
                {showPaymentMethods ? <ChevronUpIcon className="h-5 w-5 ml-auto" /> : <ChevronDownIcon className="h-5 w-5 ml-auto" />}
              </button>
              {showPaymentMethods ? (
                <div className="space-y-3 p-2 border border-gray-200 rounded-md mt-3">
                  {paymentMethods.map(method => (
                    <div key={method.id} className="flex items-center">
                      <input
                        id={`payment-${method.id}`}
                        name="paymentMethod"
                        type="radio"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => {
                          setSelectedPaymentMethod(e.target.value);
                          setShowPaymentMethods(false); // Close after selection
                        }}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor={`payment-${method.id}`} className="ml-3 block text-base font-medium text-gray-700">
                        {method.icon} {method.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                selectedPaymentMethod && (
                  <div className="mt-3 p-2 border border-gray-200 rounded-md bg-gray-50">
                    <p className="text-gray-900 font-semibold">
                      {paymentMethods.find(method => method.id === selectedPaymentMethod)?.icon} {selectedPaymentName}
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Ringkasan Keranjang Final */}
            <div className="w-full bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
              <div className="divide-y divide-gray-200">
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Subtotal Produk</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-gray-700">Ongkos Kirim</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(shippingCost)}</span>
                </div>
                {appliedCoin > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">Koin Diterapkan</span>
                    <span className="text-red-500 font-semibold">- {formatCurrency(appliedCoin)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2">
                  <span className="font-bold text-gray-800 text-xl">Total Pembayaran</span>
                  <span className="font-bold text-gray-900 text-xl">{formatCurrency(total)}</span>
                </div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="mt-6 w-full bg-[#6a902c] text-white py-3 rounded-lg font-semibold hover:bg-[#5a7d25] transition shadow-md"
              >
                Buat Pesanan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;