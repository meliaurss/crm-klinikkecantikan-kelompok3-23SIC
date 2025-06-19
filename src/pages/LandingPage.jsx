import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logoo.png";
import product from "../assets/product.jpg";
import FormReservasi from "./FormReservasi";
import Feedback from "./feedback";
import gambar1 from "../assets/gambar1.png";
import gambar2 from "../assets/gambar2.png";
import gambar3 from "../assets/gambar3.png";
import {
  Award,
  UserPlus,
  ShieldCheck,
  Smile,
  CheckCircle
} from "lucide-react";
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt } from "react-icons/fa";


const LandingPage = () => {
  const [showReservasiForm, setShowReservasiForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]); // tambahkan ini
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imageList = [gambar1, gambar2, gambar3];

  useEffect(() => {
    // Ambil data FAQ dari localStorage
    const savedFaqs = localStorage.getItem("faqs");
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    }

    // Ambil data Feedback dari localStorage
    const savedFeedbacks = localStorage.getItem("feedbacks");
    if (savedFeedbacks) {
      setFeedbacks(JSON.parse(savedFeedbacks));
    }

    // Set interval untuk slideshow
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % imageList.length
      );
    }, 3000);

    return () => clearInterval(interval); // Bersihkan interval saat unmount
  }, []);

  const handleOpenReservasiForm = () => setShowReservasiForm(true);
  const handleCloseReservasiForm = () => setShowReservasiForm(false);
  const handleShowAllProducts = () => setShowAllProducts(true);

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
            href="#tentangkami"
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
      <section id="hero" className="hero flex flex-col md:flex-row items-center justify-between p-8 bg-gray-100">
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
          <img
            src={imageList[currentImageIndex]}
            alt="Slideshow Mahacare"
            className="max-w-xs transition-all duration-500 ease-in-out"
          />
        </div>
      </section>

      {/* Alasan Section */}
      <section id="reason" className="py-16 bg-white text-center px-4 md:px-20">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1E2A78] mb-12">
          Kenapa Klinik Mahacare?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* 1. Pengalaman */}
          <div className="flex flex-col items-center">
            <Award className="w-12 h-12 text-[#1E2A78] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#1E2A78]">Pengalaman</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Klinik Mahacare memiliki pengalaman bertahun-tahun dalam menangani berbagai permasalahan kulit, menjadikannya pilihan utama yang terpercaya.
            </p>
          </div>

          {/* 2. Sumber Daya Manusia */}
          <div className="flex flex-col items-center">
            <UserPlus className="w-12 h-12 text-[#1E2A78] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#1E2A78]">Sumber Daya Manusia</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Didukung oleh tenaga profesional seperti beauty therapist, perawat, dan dokter spesialis estetika yang ramah dan terampil.
            </p>
          </div>

          {/* 3. Aman */}
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-12 h-12 text-[#1E2A78] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#1E2A78]">Aman</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Prosedur perawatan dilakukan dengan standar kebersihan dan keamanan tinggi untuk menjamin kenyamanan dan kesehatan pelanggan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* 4. Nyaman */}
          <div className="flex flex-col items-center">
            <Smile className="w-12 h-12 text-[#1E2A78] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#1E2A78]">Nyaman</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Klinik dirancang agar pelanggan merasa santai, dengan ruang tunggu dan layanan yang menjaga privasi dan kenyamanan.
            </p>
          </div>

          {/* 5. Efektif */}
          <div className="flex flex-col items-center">
            <CheckCircle className="w-12 h-12 text-[#1E2A78] mb-4" />
            <h3 className="text-lg font-bold mb-2 text-[#1E2A78]">Efektif</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Mahacare memberikan hasil nyata berkat teknologi modern dan produk berkualitas yang terus mengikuti perkembangan estetika.
            </p>
          </div>
        </div>
      </section>

      {/* Layanan */}
      <section id="layanan" className="py-16 px-4 bg-white">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181C68] mb-3">Layanan Unggulan Kami</h2>
          <p className="text-gray-600">
            Berbagai layanan untuk kebutuhan kecantikan dan kesehatan kulit Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
            >
              <div className="bg-gray-300 h-48 flex items-center justify-center">
                <div className="w-24 h-24 bg-white border border-gray-400 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Image</span>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">NAMA TREATMENT</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pellentesque convallis accumsan suscipit aliquet eu diam quis nulla turpis.
                  In mus massa lectus laoreet sed semper.
                </p>
                <hr className="mb-2" />
                <a className="text-sm text-blue-600 hover:underline" onClick={handleOpenReservasiForm}>
                  Reservasi Sekarang →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            to="/treatments"
            className="inline-block px-6 py-2 bg-[#181C68] !text-white font-semibold rounded-lg shadow hover:bg-[#141a59] transition"
          >
            Lihat Semua Treatment
          </Link>
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
              className="inline-block px-6 py-2 bg-[#181C68] !text-white font-semibold rounded-lg shadow hover:bg-[#141a59] transition"
            >
              Lihat Semua Produk
            </Link>
          </div>
        )}
      </section>

      {/* Penawaran Terbatas */}
      <section id="promo" className="py-12 bg-white px-4 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#181C68] mb-3">
          Penawaran Terbatas
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Nikmati berbagai promo spesial dari Mahacare Clinic. Promo terbatas untuk
          perawatan pilihan demi kulit sehat dan cantik Anda!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-500">[Gambar Promo]</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500">DD/MM/YYYY</p>
                <p className="text-base font-semibold text-[#181C68] mt-1 mb-2">
                  Pellentesque convallis accumsan suscipit aliquet eu diam quis nulla
                  turpis.
                </p>
                <Link
                  to="/promo-detail"
                  className="text-sm text-[#181C68] font-medium hover:underline"
                >
                  Lihat Selengkapnya →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/promos"
            className="inline-block px-6 py-2 bg-[#181C68] !text-white font-semibold rounded-lg shadow hover:bg-[#141a59] transition"
          >
            Lihat Semua Promo
          </Link>
        </div>
      </section>


      {/* Feedback */}
      <section id="feedback" className="p-8 bg-white">
        <div className="text-center mb-8">
          <p className="text-[#181C68] text-lg font-medium">Apa Kata Pelanggan Kami?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#181C68] mt-2">
            Testimoni dari Pelanggan Setia Mahacare
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(JSON.parse(localStorage.getItem("approvedFeedbacks")) || []).map((fb) => (
            <div key={fb.id} className="bg-white rounded-lg shadow p-6 text-[#181C68]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#181C68]" />
                <div>
                  <p className="font-bold">{fb.name}</p>
                  <p className="text-sm">Pelanggan Mahacare</p>
                </div>
              </div>
              <p className="text-sm italic">"{fb.message}"</p>
              <div className="mt-3 text-sm space-y-1">
                <p>⭐ Dokter: {fb.doctorRating}/5</p>
                <p>⭐ Pelayanan: {fb.serviceRating}/5</p>
                <p>⭐ Tempat: {fb.placeRating}/5</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowFeedbackForm(!showFeedbackForm)}
            className="inline-block px-6 py-2 bg-[#181C68] text-white rounded-lg shadow hover:bg-[#141a59] transition"
          >
            Berikan Feedback
          </button>
        </div>

        {showFeedbackForm && (
          <div className="mt-8">
            <Feedback />
          </div>
        )}
      </section>


      {/* FAQ Section */}
      <section id="faq" className="py-16 px-6 bg-white max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[#181C68] text-lg font-medium">Ada informasi yang kurang jelas?</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#181C68] mt-2">
            Frequently Asked Question
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Logo kiri */}
          <div className="flex-1 flex justify-center">
            <img src={logo} alt="Logo Mahacare" className="max-w-xs w-full" />
          </div>

          {/* Daftar FAQ */}
          <div className="flex-1 space-y-4 w-full">
            {faqs.length === 0 ? (
              <p className="text-gray-500">Belum ada FAQ yang tersedia.</p>
            ) : (
              faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-[#181C68] text-white p-4 rounded-lg shadow-md"
                >
                  <summary className="font-semibold cursor-pointer text-white">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-white/90 whitespace-pre-line">
                    {faq.answer}
                  </p>
                </details>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang-kami" className="bg-[#F9FAFB] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          {/* Kiri: Info Kontak */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#181C68] text-center md:text-left">
              Tentang Kami
            </h2>
            <p className="text-[#181C68] text-center md:text-left">
              Mahacare adalah klinik kecantikan terpercaya yang menyediakan layanan perawatan kulit dan tubuh dengan teknologi terkini serta tenaga ahli profesional untuk hasil yang nyata dan memuaskan.
            </p>

            {/* Alamat */}
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-[#181C68] text-3xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[#181C68]">Alamat Mahacare</h3>
                <p className="text-[#181C68] text-sm">
                  Jl. Riau No.15, Kota Pekanbaru, Riau 123450<br />
                  Jl. Sudirman No.15, Kota Pekanbaru, Riau 123450
                </p>
              </div>
            </div>

            {/* Telepon */}
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-[#181C68] text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[#181C68]">Telepon</h3>
                <p className="text-[#181C68] text-sm">
                  629582897582762<br />
                  620409530693486
                </p>
              </div>
            </div>

            {/* Waktu Operasional */}
            <div className="flex items-start gap-4">
              <FaCalendarAlt className="text-[#181C68] text-2xl mt-1" />
              <div>
                <h3 className="text-lg font-bold text-[#181C68]">Waktu Operasional</h3>
                <p className="text-[#181C68] text-sm">
                  Senin - Sabtu: 08.00 - 20.00<br />
                  Minggu: 09.00 - 15.00
                </p>
              </div>
            </div>
          </div>

          {/* Kanan: Peta / Lokasi */}
          <div className="grid gap-6">
            <div className="bg-gray-200 h-60 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">[Google Maps Lokasi 1]</span>
            </div>
            <div className="bg-gray-200 h-60 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">[Google Maps Lokasi 2]</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181C68] text-white px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">

          {/* Logo / Nama Klinik */}
          <h1 className="text-white font-bold text-xl tracking-wide text-center uppercase">
            MAHACARE
          </h1>


          {/* Menu Navigasi */}
          <div className="flex gap-4 mb-4 md:mb-0 text-sm md:text-base">
            <a href="#hero" className="text-white !text-white hover:underline">Beranda</a>
            <a href="#promo" className="text-white !text-white hover:underline">Promo</a>
            <a href="#layanan" className="text-white !text-white hover:underline">Layanan</a>
            <a href="#tentangkami" className="text-white !text-white hover:underline">Tentang Kami</a>
          </div>

          {/* Sosial Media */}
          <div className="flex gap-4 text-xl">
            <a href="#" aria-label="YouTube">
              <i className="fab fa-youtube text-white"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram text-white"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
               <i className="fab fa-linkedin-in text-white"></i>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-white">
          Mahacare © {new Date().getFullYear()}<br />All rights reserved
        </div>
      </footer>



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