
import { Link } from 'react-router-dom';
import { SparklesIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

const CustomerHeader = ({ cartItems }) => {
  // Hitung jumlah produk unik (bukan total quantity)
  const uniqueItemsCount = cartItems.length;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <SparklesIcon className="h-8 w-8 text-indigo-600 transition-transform group-hover:rotate-12 duration-300" />
            <span className="ml-2 text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Mahacare
            </span>
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            <Link
              to="/customer/produk"
              className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Produk
            </Link>
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

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/cart"
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-indigo-600 transition-all duration-300 relative"
              title="Keranjang Belanja"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {uniqueItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {uniqueItemsCount}
                </span>
              )}
            </Link>

            <Link
              to="/" // Changed from "/logout" to "/"
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-all duration-300 hover:shadow-md"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;