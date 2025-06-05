import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logoo.png";
import product from "../assets/product.jpg";
import FormReservasi from "./FormReservasi";

const LandingPage = () => {
    const [showReservasiForm, setShowReservasiForm] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        const savedFaqs = JSON.parse(localStorage.getItem("faqs")) || [];
        setFaqs(savedFaqs);
    }, []);


    const handleOpenReservasiForm = () => {
        setShowReservasiForm(true);
    };

    const handleCloseReservasiForm = () => {
        setShowReservasiForm(false);
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
                    <a href="#produk" className="text-[#181C68] font-medium hover:underline">
                        Produk
                    </a>
                    <a href="#layanan" className="text-[#181C68] font-medium hover:underline">
                        Layanan
                    </a>
                    <a href="#tentang" className="text-[#181C68] font-medium hover:underline">
                        Tentang Kami
                    </a>
                    <a href="#feedback" className="text-[#181C68] font-medium hover:underline">
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
                        <a
                            href="#produk"
                            className="text-[#181C68] font-medium"
                            onClick={() => setShowMenu(false)}
                        >
                            Produk
                        </a>
                        <a
                            href="#layanan"
                            className="text-[#181C68] font-medium"
                            onClick={() => setShowMenu(false)}
                        >
                            Layanan
                        </a>
                        <a
                            href="#tentang"
                            className="text-[#181C68] font-medium"
                            onClick={() => setShowMenu(false)}
                        >
                            Tentang Kami
                        </a>
                        <a
                            href="#feedback"
                            className="text-[#181C68] font-medium"
                            onClick={() => setShowMenu(false)}
                        >
                            Feedback
                        </a>
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
                    <button
                        className="btn-login"
                        onClick={handleOpenReservasiForm}
                    >
                        <span className="icon">📅</span>
                        Reservasi Sekarang
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
                    MAHACARE menggunakan teknologi kecantikan terkini yang
                    ditangani oleh dokter kecantikan yang ramah dan profesional.
                </p>

                <div className="produk-list grid grid-cols-1 md:grid-cols-4 gap-4">
                    {Array(4)
                        .fill(0)
                        .map((_, idx) => (
                            <div
                                key={idx}
                                className="produk-card border rounded shadow-md p-4 flex flex-col items-center"
                            >
                                <img
                                    src={product}
                                    alt="Produk"
                                    className="h-40 object-cover mb-2"
                                />
                                <h3 className="font-semibold text-gray-800">
                                    Kylab Hydra Barrier Skin
                                </h3>
                                <p className="font-bold" style={{ color: "#181C68" }}>
                                    $120.00
                                </p>
                                <button
                                    className="mt-2 text-white px-3 py-1 rounded"
                                    style={{ backgroundColor: "#181C68" }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                </div>
            </section>

            {/* Layanan Section */}
            <section id="layanan" className="p-8 bg-gray-100">
                <h2 className="judul-hero2 mb-4">Layanan Unggulan Kami</h2>
                <p className="text-center text-gray-600">
                    Berbagai layanan untuk kebutuhan kecantikan dan kesehatan kulit Anda.
                </p>
            </section>

            {/* Tentang Kami Section */}
            <section id="tentang" className="p-8 bg-white">
                <h2 className="judul-hero2 mb-4">Tentang Mahacare</h2>
                <p className="text-center text-gray-600">
                    Mahacare Clinic berkomitmen untuk memberikan layanan terbaik dan
                    terpercaya bagi kesehatan kulit Anda.
                </p>
            </section>

            {/* Feedback Section */}
            <section id="feedback" className="p-8 bg-gray-100">
                <h2 className="judul-hero2 mb-4">Feedback Pelanggan</h2>
                <p className="text-center text-gray-600">
                    Kami selalu terbuka untuk menerima saran dan kritik yang membangun.
                </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="p-12 bg-white max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#181C68]">Frequently Asked Questions (FAQ)</h2>
                {faqs.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada FAQ yang tersedia.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 bg-gray-50"
                            >
                                <p className="font-semibold text-lg mb-3">{faq.question}</p>
                                <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Popup FormReservasi */}
            {showReservasiForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="relative bg-white rounded-3xl shadow-2xl p-4 max-w-3xl w-full">
                        {/* Tombol Close */}
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
