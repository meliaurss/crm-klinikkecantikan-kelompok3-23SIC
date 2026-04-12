import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

    const calculatedTotal = newSubtotal + newShippingCost - appliedCoin;
    setTotal(calculatedTotal < 0 ? 0 : calculatedTotal);
  }, [cartItems, selectedDeliveryOption, appliedCoin]);

  const handleRemoveItemWithFeedback = (id, itemName) => {
    handleRemoveItem(id);
    setRemovedItemMessage(`"${itemName}" dihapus dari keranjang.`);
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
      setAppliedCoin(subtotal);
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
      const existingHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
      const newOrder = {
        id: Date.now(),
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

      localStorage.setItem("purchaseHistory", JSON.stringify([newOrder, ...existingHistory]));
      toast.success("Pesanan berhasil dibuat!", { id: 'checkoutToast' });
      navigate("/customer/riwayat-pesanan");
    }, 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --primary:      #293A52;
          --primary-90:   #344a66;
          --primary-70:   #4a6a94;
          --primary-20:   #d0d8e3;
          --primary-10:   #e8ecf1;
          --primary-05:   #f4f6f8;
          --secondary:    #CCD4E1;
          --sec-dark:     #a8b5c7;
          --sec-light:    #e3e8f0;
          --sec-pale:     #f0f3f7;
          --white:        #FCFCFC;
          --black:        #020202;
          --gray-text:    #5a6a7e;
        }

        .cart-page-wrapper {
          position: relative;
          min-height: 100vh;
          background-color: var(--white);
          font-family: 'DM Sans', sans-serif;
          color: var(--black);
        }

        /* Background dot-grid texture */
        .cart-page-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--secondary) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .cart-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 500;
          color: var(--primary);
        }

        .cart-heading i {
          font-style: italic;
          color: var(--primary-70);
        }

        .clinic-card {
          position: relative;
          z-index: 2;
          background: rgba(252, 252, 252, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid var(--sec-light);
          border-radius: 4px;
          box-shadow: 0 4px 20px rgba(41, 58, 82, 0.04);
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: var(--primary);
          color: var(--white);
          border: none;
          padding: 12px 24px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.15s ease;
        }

        .btn-primary:hover {
          background: var(--primary-90);
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          color: var(--primary);
          border: 1px solid var(--secondary);
          padding: 12px 24px;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-secondary:hover {
          background: var(--primary-05);
          border-color: var(--primary);
        }

        .input-clinic {
          background: transparent;
          border: 1px solid var(--secondary);
          border-radius: 3px;
          color: var(--black);
          transition: border-color 0.2s ease;
        }
        
        .input-clinic:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary-20);
        }

        .custom-radio:checked {
          background-color: var(--primary);
          border-color: var(--primary);
        }
      `}</style>

      <div className="cart-page-wrapper py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-10 text-center">
            <h1 className="cart-heading text-4xl md:text-5xl mb-3">
              Keranjang <i>Belanja</i>
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-12 bg-[var(--secondary)]"></div>
              <span className="text-[var(--gray-text)] text-sm tracking-widest uppercase">The Rose Clinic</span>
              <div className="h-[1px] w-12 bg-[var(--secondary)]"></div>
            </div>
          </div>

          {removedItemMessage && (
            <div className="bg-[var(--primary-05)] border border-[var(--primary-20)] text-[var(--primary)] px-4 py-3 rounded-[3px] flex items-center justify-between mb-8 shadow-sm">
              <span className="text-sm font-medium">{removedItemMessage}</span>
              <button onClick={() => setRemovedItemMessage('')} className="text-[var(--primary-70)] hover:text-[var(--primary)]">
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="clinic-card text-center py-16">
              <p className="text-[var(--gray-text)] text-lg mb-6">Keranjang Anda masih kosong.</p>
              <Link to="/products-all" className="btn-primary">
                Eksplorasi Produk
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Kolom Kiri: Daftar Produk */}
              <div className="w-full lg:w-2/3 flex flex-col gap-8">
                <div className="clinic-card p-6 md:p-8">
                  <h2 className="cart-heading text-2xl mb-6 border-b border-[var(--sec-light)] pb-4">Daftar Produk</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[var(--sec-light)]">
                      <thead>
                        <tr>
                          <th className="py-3 text-left text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal w-10"></th>
                          <th className="py-3 text-left text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal w-20"></th>
                          <th className="py-3 text-left text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal">Produk</th>
                          <th className="py-3 text-left text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal">Harga</th>
                          <th className="py-3 text-center text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal">Kuantitas</th>
                          <th className="py-3 text-right text-[11px] text-[var(--gray-text)] uppercase tracking-[1.5px] font-normal">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--sec-light)]">
                        {cartItems.map((item) => (
                          <tr key={item.id} className="hover:bg-[var(--primary-05)] transition-colors duration-150">
                            <td className="py-4 pr-4 whitespace-nowrap">
                              <button
                                onClick={() => handleRemoveItemWithFeedback(item.id, item.name)}
                                className="text-[var(--sec-dark)] hover:text-red-500 transition-colors"
                                title="Hapus Item"
                              >
                                <XCircleIcon className="h-5 w-5" />
                              </button>
                            </td>
                            <td className="py-4 pr-4 whitespace-nowrap">
                              <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-[2px] border border-[var(--sec-light)]" />
                            </td>
                            <td className="py-4 pr-4 whitespace-nowrap text-sm font-medium text-[var(--primary)]">
                              {item.name}
                            </td>
                            <td className="py-4 pr-4 whitespace-nowrap text-sm text-[var(--gray-text)]">
                              {formatCurrency(item.price)}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="flex items-center justify-center border border-[var(--secondary)] rounded-[3px] overflow-hidden w-24 mx-auto">
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  className="bg-[var(--primary-05)] text-[var(--primary)] px-2 py-1 hover:bg-[var(--primary-20)] transition-colors w-8"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                  className="w-8 text-center py-1 text-sm text-[var(--primary)] bg-transparent border-none focus:ring-0 p-0"
                                  min="1"
                                />
                                <button
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  className="bg-[var(--primary-05)] text-[var(--primary)] px-2 py-1 hover:bg-[var(--primary-20)] transition-colors w-8"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="py-4 whitespace-nowrap text-sm font-medium text-[var(--primary)] text-right">
                              {formatCurrency(item.price * item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-[var(--sec-light)]">
                    <div className="flex w-full sm:w-auto">
                      <input
                        type="number"
                        placeholder="Jumlah Koin"
                        value={coinInput}
                        onChange={(e) => setCoinInput(e.target.value)}
                        className="input-clinic px-3 py-2 w-full sm:w-48 text-sm rounded-r-none border-r-0"
                        min="0"
                      />
                      <button
                        onClick={handleApplyCoin}
                        className="btn-secondary rounded-l-none m-0 border-[var(--secondary)] border-l-0"
                        style={{ padding: '10px 16px' }}
                      >
                        Terapkan
                      </button>
                    </div>
                    <button onClick={handleUpdateCart} className="btn-secondary w-full sm:w-auto">
                      Perbarui Keranjang
                    </button>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Detail & Checkout */}
              <div className="w-full lg:w-1/3 flex flex-col gap-6">
                
                {/* Detail Pengiriman */}
                <div className="clinic-card p-6">
                  <h2 className="cart-heading text-xl mb-4">Pengiriman</h2>
                  <div className="mb-5">
                    <label htmlFor="address" className="block text-xs font-medium text-[var(--gray-text)] uppercase tracking-wider mb-2">Alamat Lengkap *</label>
                    <textarea
                      id="address"
                      rows="3"
                      className="input-clinic w-full p-3 text-sm"
                      placeholder="Contoh: Jl. Sudirman No. 123..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button
                    onClick={() => setShowDeliveryOptions(!showDeliveryOptions)}
                    className="w-full text-left py-3 px-4 bg-[var(--primary-05)] border border-[var(--primary-10)] hover:bg-[var(--primary-10)] rounded-[3px] flex items-center justify-between text-sm font-medium text-[var(--primary)] transition-colors"
                  >
                    {selectedDeliveryOption ? 'Ubah Metode Pengiriman' : 'Pilih Kurir'}
                    {showDeliveryOptions ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                  </button>
                  
                  {showDeliveryOptions && (
                    <div className="space-y-2 p-3 border border-[var(--sec-light)] border-t-0 rounded-b-[3px] bg-white">
                      {deliveryOptions.map(option => (
                        <div key={option.id} className="flex items-start gap-3 p-2 hover:bg-[var(--sec-pale)] rounded-[2px] cursor-pointer" onClick={() => { setSelectedDeliveryOption(option.id); setShowDeliveryOptions(false); }}>
                          <input
                            type="radio"
                            name="deliveryOption"
                            value={option.id}
                            checked={selectedDeliveryOption === option.id}
                            onChange={() => {}}
                            className="custom-radio mt-1 h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-[var(--primary)]">{option.name}</p>
                            <p className="text-xs text-[var(--gray-text)]">{formatCurrency(option.cost)} • {option.estimatedTime}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {!showDeliveryOptions && selectedDeliveryOption && (
                    <div className="mt-3 p-3 border border-[var(--secondary)] rounded-[3px] bg-[var(--white)]">
                      <p className="text-sm font-medium text-[var(--primary)]">
                        {selectedDeliveryName}
                      </p>
                      <p className="text-xs text-[var(--gray-text)] mt-1">
                        Biaya: {formatCurrency(deliveryOptions.find(opt => opt.id === selectedDeliveryOption)?.cost)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Metode Pembayaran */}
                <div className="clinic-card p-6">
                  <h2 className="cart-heading text-xl mb-4">Pembayaran</h2>
                  <button
                    onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                    className="w-full text-left py-3 px-4 bg-[var(--primary-05)] border border-[var(--primary-10)] hover:bg-[var(--primary-10)] rounded-[3px] flex items-center justify-between text-sm font-medium text-[var(--primary)] transition-colors"
                  >
                    {selectedPaymentMethod ? 'Ubah Pembayaran' : 'Pilih Metode'}
                    {showPaymentMethods ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                  </button>
                  
                  {showPaymentMethods && (
                    <div className="space-y-2 p-3 border border-[var(--sec-light)] border-t-0 rounded-b-[3px] bg-white">
                      {paymentMethods.map(method => (
                        <div key={method.id} className="flex items-center gap-3 p-2 hover:bg-[var(--sec-pale)] rounded-[2px] cursor-pointer" onClick={() => { setSelectedPaymentMethod(method.id); setShowPaymentMethods(false); }}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method.id}
                            checked={selectedPaymentMethod === method.id}
                            onChange={() => {}}
                            className="custom-radio h-4 w-4 text-[var(--primary)] focus:ring-[var(--primary)]"
                          />
                          <span className="text-sm font-medium text-[var(--primary)]">
                            {method.icon} {method.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {!showPaymentMethods && selectedPaymentMethod && (
                    <div className="mt-3 p-3 border border-[var(--secondary)] rounded-[3px] bg-[var(--white)]">
                      <p className="text-sm font-medium text-[var(--primary)]">
                        {paymentMethods.find(method => method.id === selectedPaymentMethod)?.icon} {selectedPaymentName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Ringkasan Pesanan */}
                <div className="clinic-card p-6 bg-[var(--primary-05)]">
                  <h2 className="cart-heading text-xl mb-4">Ringkasan</h2>
                  <div className="space-y-3 text-sm border-b border-[var(--secondary)] pb-4 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-text)]">Subtotal Produk</span>
                      <span className="font-medium text-[var(--primary)]">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gray-text)]">Ongkos Kirim</span>
                      <span className="font-medium text-[var(--primary)]">{formatCurrency(shippingCost)}</span>
                    </div>
                    {appliedCoin > 0 && (
                      <div className="flex justify-between text-[var(--primary-70)]">
                        <span>Koin Diterapkan</span>
                        <span className="font-medium">- {formatCurrency(appliedCoin)}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[11px] uppercase tracking-[1.5px] font-medium text-[var(--gray-text)]">Total</span>
                    <span className="font-playfair text-2xl font-semibold text-[var(--primary)]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {formatCurrency(total)}
                    </span>
                  </div>
                  
                  <button onClick={handleProceedToCheckout} className="btn-primary w-full py-4 text-sm">
                    Selesaikan Pesanan
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;