import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, User, Settings, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate(); // <- Untuk redirect
  const isAdminLoggedIn = true;
  const adminData = {
    name: 'Amelia Devira',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?img=32',
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Tambahkan logika logout, misal hapus token/session
    console.log("Logout clicked");

    setDropdownOpen(false);

    // Redirect ke landing page
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/70 shadow-md border-b border-white/20">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Breadcrumb */}
        <div className="text-sm font-medium text-gray-600 tracking-wide">
          <span className="text-indigo-600 font-semibold">Mahacare</span> / <span className="text-gray-800">Dashboard</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 relative">
          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="w-64 pl-10 pr-4 py-2 text-sm rounded-full bg-white/60 text-gray-800 placeholder-gray-400 shadow-inner ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          {/* Admin Profil */}
          {isAdminLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300"
              >
                <img
                  src={adminData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-indigo-600 shadow-sm"
                />
                <div className="text-left hidden sm:block">
                  <div className="font-semibold">{adminData.name}</div>
                  <div className="text-xs text-gray-500">{adminData.role}</div>
                </div>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50 animate-fade-in-down">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <a
                        href="/akun"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        Pengaturan Profil
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-600 hover:text-indigo-600 hover:scale-105 transition-all duration-300"
            >
              <User className="w-5 h-5" />
              <span className="hover:underline">Sign In</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
