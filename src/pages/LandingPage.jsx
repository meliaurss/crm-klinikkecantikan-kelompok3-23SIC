import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logoo.png";
import product from "../assets/product.jpg";
import FormReservasi from "./FormReservasi";
import Feedback from "./feedback";

const LandingPage = () => {
  const [showReservasiForm, setShowReservasiForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const savedFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
    setFaqs(savedFaqs);

    const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setFeedbacks(savedFeedbacks);
  }, []);

  const handleOpenReservasiForm = () => setShowReservasiForm(true);
  const handleCloseReservasiForm = () => setShowReservasiForm(false);

  // Handler untuk menampilkan semua produk
  const handleShowAllProducts = () => {
    setShowAllProducts(true);
  };

  return (
    <div className="landing-page relative">
      {/* Header */}
      <header className="header flex justify-between items-center p-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-[#181C68] font-poppins">
          MAHACARE
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="#produk"
            className="text-[#181C68] font-medium hover:underline"
          >
            Produk
          </a>
          <a
            href="#layanan"
            className="text-[#181C68] font-medium hover:underline"
          >
            Layanan
          </a>
          <a
            href="#tentang"
            className="text-[#181C68] font-medium hover:underline"
          >
            Tentang Kami
          </a>
          <a
            href="#feedback"
            className="text-[#181C68] font-medium hover:underline"
          >
            Feedback
          </a>
          <a href="#faq" className="text-[#181C68] font-medium hover:underline">
            FAQ
          </a>
        </nav>

        {/* Login Button */}
        <Link to="/admin" className="btn-login text-white px-4 py-2 rounded">
          Login
        </Link>

        {/* Hamburger for Mobile */}
        <div
          className="md:hidden flex flex-col cursor-pointer ml-4"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="w-6 h-1 bg-[#181C68] mb-1 rounded"></span>
          <span className="w-6 h-1 bg-[#181C68] mb-1 rounded"></span>
          <span className="w-6 h-1 bg-[#181C68] rounded"></span>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="absolute top-16 right-4 bg-white rounded shadow-md flex flex-col p-4 space-y-2 z-50">
            {["produk", "layanan", "tentang", "feedback", "faq"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-[#181C68] font-medium"
                onClick={() => setShowMenu(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
        <div className="hero-text flex-1">
          <h2 className="judul-hero mb-4">
            Klinik Kecantikan Terdekat untuk Berbagai Masalah Kulit dan Wajah
          </h2>
          <p className="mb-4 text-gray-600">
            Dapatkan potongan hingga 100rb untuk semua treatment dan kunjungi
            cabang klinik kecantikan terdekat!
          </p>
          <button className="btn-login" onClick={handleOpenReservasiForm}>
            <span className="icon">📅</span> Reservasi Sekarang
          </button>
        </div>
        <div className="hero-image flex-1 flex justify-center mt-4 md:mt-0">
          <img src={logo} alt="Mahacare Clinic" className="max-w-xs" />
        </div>
      </section>

      {/* Produk Section */}
      <section id="produk" className="produk p-8 bg-white">
        <h2 className="judul-hero2 mb-4">
          Temukan Perawatan Wajah dan Kulit Terbaik dari Mahacare Clinic
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Mahacare Clinic menggunakan teknologi kecantikan terkini yang
          ditangani oleh dokter kecantikan yang ramah dan profesional. Semua
          perawatan bertujuan untuk hasil terbaik dari permasalahan wajah dan
          kulit Anda.
        </p>
        <div className="produk-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(showAllProducts ? Array(12) : Array(4))
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="relative bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col h-full"
              >
                <img
                  src={product}
                  alt="Produk"
                  className="w-full h-48 object-contain mb-4"
                />

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-gray-800 font-semibold text-sm mb-1">
                      Kylab Hydra Barrier Skin
                    </h3>
                    <p className="text-[#181C68] font-semibold text-sm">
                      $120.00
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-pink-500 text-xl">
                    ♡
                  </button>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <span className="text-yellow-400 mr-1">★★★★☆</span>
                  <span>(131)</span>
                </div>

                <button className="mt-auto bg-gray-100 text-[#181C68] font-semibold py-2 rounded-md hover:bg-[#181C68] hover:text-white transition">
                  Beli Sekarang
                </button>
              </div>
            ))}
        </div>
        
        {/* Perbaikan bagian tombol "Lihat Semua Produk" */}
        {!showAllProducts && (
          <div className="text-center mt-6">
            <Link
              to="/products"
              className="inline-block px-6 py-2 bg-[#181C68] text-white rounded-lg shadow hover:bg-[#141a59] transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </section>

      {/* Layanan */}
      <section id="layanan" className="p-8 bg-gray-100">
        <h2 className="judul-hero2 mb-4">Layanan Unggulan Kami</h2>
        <p className="text-center text-gray-600">
          Berbagai layanan untuk kebutuhan kecantikan dan kesehatan kulit Anda.
        </p>
      </section>

      {/* Tentang */}
      <section id="tentang" className="p-8 bg-white">
        <h2 className="judul-hero2 mb-4">Tentang Mahacare</h2>
        <p className="text-center text-gray-600">
          Mahacare Clinic berkomitmen untuk memberikan layanan terbaik dan
          terpercaya bagi kesehatan kulit Anda.
        </p>
      </section>

      {/* Feedback */}
      <section id="feedback" className="p-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#181C68]">
          Apa Kata Pelanggan Kami?
        </h2>
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Ulasan jujur dari pelanggan kami yang telah merasakan langsung manfaat
          perawatan dari Mahacare Clinic.
        </p>

        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-500 mb-8">
            Belum ada feedback pelanggan.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
            {feedbacks.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#181C68] text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {item.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#181C68]">{item.name}</p>
                    <p className="text-sm text-gray-500">Pelanggan Mahacare</p>
                  </div>
                </div>
                <div className="text-gray-700 space-y-2">
                  <p className="italic">"{item.message}"</p>
                  <div className="text-sm text-gray-600">
                    <p>⭐ Dokter: {item.doctorRating}/5</p>
                    <p>⭐ Pelayanan: {item.serviceRating}/5</p>
                    <p>⭐ Tempat: {item.placeRating}/5</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => setShowFeedbackForm(true)}
            className="px-6 py-2 bg-[#181C68] text-white rounded-lg shadow hover:bg-[#141a59] transition"
          >
            Berikan Feedback Sekarang
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="p-12 bg-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#181C68]">
          Frequently Asked Questions (FAQ)
        </h2>
        {faqs.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada FAQ yang tersedia.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 bg-gray-50"
              >
                <p className="font-semibold text-lg mb-3">{faq.question}</p>
                <p className="text-gray-700 whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFeedbackForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
            <Feedback />
          </div>
        </div>
      )}

      {/* Reservasi Form Modal */}
      {showReservasiForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-3xl w-full">
            <button
              onClick={handleCloseReservasiForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
            <FormReservasi onClose={handleCloseReservasiForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;