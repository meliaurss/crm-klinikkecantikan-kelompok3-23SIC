import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/outline';

const LandingHeader = () => (
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
          {["Produk", "Layanan", "Tentang", "Promo", "Feedback"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200 after:content-[''] after:block after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
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

export default LandingHeader;
