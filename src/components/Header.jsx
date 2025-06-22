import { Search, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Breadcrumb */}
        <div className="text-sm font-light">
          Pages / <span className="font-semibold text-white">Dashboard</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search anything..."
              className="w-60 pl-10 pr-4 py-2 rounded-full text-sm bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 ease-in-out"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/70" />
          </div>

          {/* Sign In */}
          <div
            className="flex items-center gap-2 text-sm font-medium cursor-pointer text-white hover:text-yellow-300 transition duration-300"
          >
            <User className="w-5 h-5" />
            <span className="hover:underline">Sign In</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
