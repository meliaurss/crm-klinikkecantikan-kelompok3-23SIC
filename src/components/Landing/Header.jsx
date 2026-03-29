import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'; 

const LandingHeader = () => (
  <>
    <style>{`
      .header-brand {
        font-family: 'Cormorant Garamond', serif;
        letter-spacing: -0.5px;
      }
      .header-nav {
        font-family: 'Jost', sans-serif;
      }
    `}</style>

    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#C9A96E]/20" style={{ boxShadow: '0 4px 30px rgba(44, 26, 14, 0.03)' }}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center group">
            <SparklesIcon className="h-8 w-8 text-[#C9A96E] transition-transform group-hover:rotate-12 duration-300" />
            <span className="ml-2 text-2xl font-bold header-brand text-[#2C1A0E]">
              Bahebak Clinic
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium header-nav tracking-wide">
            <Link
              to="/"
              className="relative text-[#6B4F3A] hover:text-[#2C1A0E] transition-colors duration-200 
                after:content-[''] after:block after:w-0 after:h-[2px] 
                after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              Beranda
            </Link>

            <Link
              to="/products-all"
              className="relative text-[#6B4F3A] hover:text-[#2C1A0E] transition-colors duration-200 
                after:content-[''] after:block after:w-0 after:h-[2px] 
                after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              Produk
            </Link>

            <Link
              to="/layanan-kami"
              className="relative text-[#6B4F3A] hover:text-[#2C1A0E] transition-colors duration-200 
                after:content-[''] after:block after:w-0 after:h-[2px] 
                after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              Layanan
            </Link>

            <Link
              to="/tentang"
              className="relative text-[#6B4F3A] hover:text-[#2C1A0E] transition-colors duration-200 
                after:content-[''] after:block after:w-0 after:h-[2px] 
                after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              Tentang
            </Link>

            <Link
              to="/promo"
              className="relative text-[#6B4F3A] hover:text-[#2C1A0E] transition-colors duration-200 
                after:content-[''] after:block after:w-0 after:h-[2px] 
                after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              Promo
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4 header-nav">
            <Link
              to="/login"
              className="px-5 py-2 text-[#7B4A2D] border border-[#C9A96E] rounded-md 
                hover:bg-[#FAF6F1] transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-[#C9A96E] text-white rounded-md 
                hover:bg-[#B5965D] shadow-md transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  </>
);

export default LandingHeader;