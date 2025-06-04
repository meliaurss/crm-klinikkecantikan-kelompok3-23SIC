import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import logo from "../assets/logoo.png"; // logo Mahacare
import product from "../assets/product.jpg"; // contoh produk

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header flex justify-between items-center p-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-[#181C68] font-poppins">MAHACARE</h1>
                <Link
                    to="/admin"
                    className="btn-login text-white px-4 py-2 rounded"
                >
                    Login
                </Link>
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
                    <button class="btn-login">
                        <span class="icon">📅</span>
                        Reservasi Sekarang
                    </button>
                </div>
                <div className="hero-image flex-1 flex justify-center mt-4 md:mt-0">
                    <img src={logo} alt="Mahacare Clinic" className="max-w-xs" />
                </div>
            </section>

            {/* Produk Section */}
            <section className="produk p-8 bg-white">
                <h2 className="judul-hero2 mb-4">
                    Temukan Perawatan Wajah dan Kulit Terbaik dari Mahacare Clinic
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    MAHACARE menggunakan teknologi kecantikan terkini yang
                    ditangani oleh dokter kecantikan yang ramah dan profesional. Semua
                    perawatan bertujuan untuk hasil terbaik dari permasalahan wajah dan
                    kulit Anda.
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
                                <p
                                    className="font-bold"
                                    style={{ color: "#181C68" }}
                                >
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
        </div>
    );
};

export default LandingPage;