import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAdminLoggedIn = true;
  const adminData = {
    name: "Amelia Devira",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=32",
  };

  // Fungsi untuk membuat breadcrumb dari URL
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.map((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const label =
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

      return (
        <span key={index} className="text-gray-600">
          {isLast ? (
            <span className="text-gray-800 font-medium">{label}</span>
          ) : (
            <>
              <span>{label}</span>
              <span className="mx-1">/</span>
            </>
          )}
        </span>
      );
    });
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-lg shadow border-b border-gray-200">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Breadcrumb */}
        <div className="text-sm tracking-wide text-gray-600 flex items-center gap-1">
          <span className="text-indigo-600 font-bold">Mahacare</span>
          <span>/</span>
          {generateBreadcrumb()}
        </div>

        {/* Admin Profile */}
        <div className="relative">
          {isAdminLoggedIn ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 transition"
              >
                <img
                  src={adminData.avatar}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-indigo-500 shadow-sm"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-semibold">{adminData.name}</span>
                  <span className="text-xs text-gray-500">{adminData.role}</span>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fade-in-down">
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
            </>
          ) : (
            <div className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-600 hover:text-indigo-600 transition">
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
