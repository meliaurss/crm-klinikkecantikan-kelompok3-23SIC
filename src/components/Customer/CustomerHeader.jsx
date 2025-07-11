// src/components/LandingHeader.jsx
import { Link } from 'react-router-dom';
import { SparklesIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'; // Import ShoppingCartIcon

const CustomerHeader = () => (
  <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center group">
          <SparklesIcon className="h-8 w-8 text-indigo-600 transition-transform group-hover:rotate-12 duration-300" />
          <span className="ml-2 text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Mahacare
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          {/* Ubah link "Produk" menjadi Link to="/products-all" */}
          <Link
            to="/customer/produk" // <--- Ini adalah path ke halaman ProductAll.jsx
            className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
          >
            Produk
          </Link>

          {/* Link lainnya tetap ke scroll section jika itu yang Anda inginkan */}
          {["Layanan", "Tentang", "Promo"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Auth & Cart Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Tombol Keranjang */}
          <Link
            to="/cart" // Mengarahkan ke halaman CartPage.jsx
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-300 relative"
            title="Keranjang Belanja"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {/* Opsional: Tambahkan badge jumlah item di keranjang */}
            {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">3</span> */}
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300 hover:shadow-md"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md hover:brightness-110 shadow-md transition-all duration-300"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  </header>
);

export default CustomerHeader;