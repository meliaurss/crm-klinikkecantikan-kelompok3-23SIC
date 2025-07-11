import React, { useState, useEffect } from 'react';
import HeroSection from '../components/Landing/HeroSection';
import WhyChooseUs from '../components/Landing/WhyChooseUs';
import ServicesSection from '../components/Landing/ServicesSection';
import ProductsSection from '../components/Landing/ProductsSection';
import PromoSection from '../components/Landing/PromoSection';
import FeedbackSection from '../components/Landing/FeedbackSection';
import FAQSection from '../components/Landing/FAQSection';
import AboutUsSection from '../components/Landing/AboutUsSection';
import { supabase } from '../supabase'; // pastikan path ini sesuai

// import ReservasiForm from '../components/ReservasiForm'; // aktifkan jika formulir sudah siap

const LandingPage = () => {
  const [showReservasiForm, setShowReservasiForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const handleOpenReservasi = () => setShowReservasiForm(true);
  const handleCloseReservasi = () => setShowReservasiForm(false);

  // Fetch produk dari Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      const { data, error } = await supabase
        .from('produk')
        .select('id, nama, gambar, harga, keterangan, show_on_landing')
        .eq('show_on_landing', true);

      if (error) {
        console.error("Error fetching products:", error);
        setProductsError(error.message);
      } else {
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.nama,
          image: item.gambar,
          price: parseFloat(item.harga), // pastikan harga number
          description: item.keterangan,
          show_on_landing: item.show_on_landing,
        }));
        setProducts(mapped);
      }

      setLoadingProducts(false);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <HeroSection onOpenReservasi={handleOpenReservasi} />
      <WhyChooseUs />
      <ServicesSection onOpenReservasi={handleOpenReservasi} />

      {/* Loading atau error state */}
      {loadingProducts && (
        <p className="text-center text-sm py-6 text-gray-500">Memuat produk...</p>
      )}
      {productsError && (
        <p className="text-center text-sm py-6 text-red-500">Gagal memuat produk: {productsError}</p>
      )}

      {/* Produk Unggulan */}
      {!loadingProducts && !productsError && (
        <ProductsSection
          products={products}
        
        />
      )}

      <PromoSection />
      <FeedbackSection />
      <FAQSection />
      <AboutUsSection />

      {/* Modal Reservasi */}
      {showReservasiForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-3xl w-full">
            <button
              onClick={handleCloseReservasi}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
            {/* Ganti dengan komponen reservasi asli jika sudah ada */}
            {/* <ReservasiForm onClose={handleCloseReservasi} /> */}
            <p className="text-center text-gray-600">Formulir reservasi belum diaktifkan.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
