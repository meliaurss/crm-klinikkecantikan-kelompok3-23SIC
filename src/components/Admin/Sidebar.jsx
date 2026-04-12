import {
  LayoutDashboard,
  Boxes,
  ShoppingBag,
  CalendarCheck,
  Users2,
  MessageCircle,
  CircleHelp,
  LogOut,
  Heart,
  Package,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/Admin/dashboard" },
  { name: "Inventory", icon: <Boxes size={20} />, path: "/Admin/inventory" },
  { name: "Order", icon: <ShoppingBag size={20} />, path: "/Admin/order" },
  { name: "Treatment", icon: <Heart size={20} />, path: "/Admin/layanan" },
  { name: "Produk", icon: <Package size={20} />, path: "/Admin/produk" },
  { name: "Reservasi", icon: <CalendarCheck size={20} />, path: "/Admin/reservations" },
  { name: "Data Pelanggan", icon: <Users2 size={20} />, path: "/Admin/customers" },
  { name: "Kelola Feedback", icon: <MessageCircle size={20} />, path: "/Admin/feedback" },
  { name: "Kelola FAQ", icon: <CircleHelp size={20} />, path: "/Admin/faqs" },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-[#0f172a] text-white w-72 min-h-screen shadow-2xl hidden md:flex flex-col relative overflow-hidden">
      {/* Efek Cahaya Dekoratif di Background */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      {/* Logo Section */}
      <div className="relative z-10 pt-10 pb-8 px-8">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 rounded-full"></div>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWaTsxQtP0n_LAgB9YG1McOT2R50QEarrTlw&s" 
              alt="The Rose Logo" 
              className="relative w-30 h-20 object-cover rounded-xl border border-white/10 shadow-2xl"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-serif font-bold tracking-tight leading-none text-white">
              THE ROSE AESTHETIC
            </h1>
            <span className="text-[10px] text-white font-bold tracking-[0.3em] uppercase mt-1">
              Clinic Admin
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex flex-col justify-between h-full relative z-10 px-4 pb-8">
        <nav className="space-y-1">
          <div className="px-4 mb-4">
            
          </div>

          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-white-600 to-white-600 text-white shadow-lg shadow-blue-900/20"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Indicator Line untuk yang aktif */}
                {active && (
                  <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full shadow-[0_0_10px_white]"></div>
                )}
                
                <span className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                
                <span className={`text-sm tracking-wide transition-all ${active ? "font-bold" : "font-medium"}`}>
                  {item.name}
                </span>

                {/* Hover Glow Effect */}
                {!active && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="mt-auto px-2">
          <div className="p-4 rounded-2xl bg-slate-900/50 border border-white/5">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-semibold text-slate-400 hover:bg-red-500/10 hover:text-red-400 group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Keluar Panel</span>
            </Link>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;