import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { User, Settings, LogOut, Bell, ChevronDown, Search } from "lucide-react";
import { supabase } from "../../supabase";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    
    const getCurrentUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserEmail(data.user.email);
    };
    getCurrentUser();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDisplayName = (email) => {
    if (!email) return "Admin Rose";
    const name = email.split("@")[0].split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const generateBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments.map((segment, index) => {
      const isLast = index === pathSegments.length - 1;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      
      return (
        <div key={index} className="flex items-center">
          <span className={`mx-2 text-slate-300 text-xs`}>/</span>
          <span className={`text-xs tracking-wide ${isLast ? "text-slate-900 font-bold" : "text-slate-400 font-medium"}`}>
            {label}
          </span>
        </div>
      );
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm py-3" : "bg-[#fcfcfc] py-5"
    } px-8`}>
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        
        {/* Left Side: Breadcrumb & Search */}
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <Link to="/Admin/dashboard" className="text-xs font-black uppercase tracking-[0.2em] text-[#1e293b] hover:opacity-70 transition-opacity">
              The Rose Clinic
            </Link>
            <div className="hidden md:flex items-center">
              {generateBreadcrumb()}
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:border-blue-400 transition-all">
            <Search size={14} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari data..." 
              className="bg-transparent border-none outline-none text-xs ml-3 w-48 text-slate-600 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-6">
          
          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

          {/* Profile Dropdown */}
          <div className="relative">
            {userEmail ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-slate-100 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={`https://ui-avatars.com/api/?name=${getDisplayName(userEmail)}&background=1e293b&color=fff`}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="font-bold text-sm text-slate-800 leading-tight">
                      {getDisplayName(userEmail)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Administrator</span>
                  </div>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden z-50"
                    >
                      <div className="p-5 border-b border-slate-50 bg-slate-50/50">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{userEmail}</p>
                      </div>
                      
                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                          <User size={16} />
                          <span>Profil Saya</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                          <Settings size={16} />
                          <span>Pengaturan Sistem</span>
                        </button>
                      </div>

                      <div className="p-2 border-t border-slate-50">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                        >
                          <LogOut size={16} />
                          <span>Keluar Aplikasi</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;