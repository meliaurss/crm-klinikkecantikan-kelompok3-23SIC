import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { supabase } from "../../supabase";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUserEmail(data.user.email);
      }
    };
    getCurrentUser();
  }, []);

  const getDisplayName = (email) => {
    if (!email) return "Guest";
    const name = email.split("@")[0].split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const adminData = {
    name: getDisplayName(userEmail),
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=32",
  };

  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.map((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      return (
        <span key={index} className="text-gray-500 font-medium">
          {isLast ? label : <>{label} / </>}
        </span>
      );
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-700 tracking-wide">
          <span className="font-bold text-indigo-600">Mahacare</span>
          <span>/</span>
          {generateBreadcrumb()}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          {userEmail ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 text-gray-800 hover:text-indigo-600 transition"
              >
                <img
                  src={adminData.avatar}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border border-indigo-300 shadow-sm"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-semibold text-sm">{adminData.name}</span>
                  <span className="text-xs text-gray-500">{adminData.role}</span>
                </div>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 bg-white/90 backdrop-blur-xl text-gray-800 rounded-xl shadow-xl z-50 border border-gray-100 animate-fade-in-down">
                  <ul className="py-2 text-sm">
                    <li>
                      <a
                        href="/akun"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <Settings className="w-4 h-4" />
                        Pengaturan Akun
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Keluar
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 text-sm font-medium cursor-pointer text-gray-700 hover:text-indigo-600 transition"
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
