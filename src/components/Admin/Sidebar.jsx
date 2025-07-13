import {
  LayoutDashboard,
  Boxes,
  FileBarChart,
  ShoppingBag,
  CalendarCheck,
  Users2,
  MessageCircle,
  CircleHelp,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/Admin/dashboard" },
  { name: "Inventory", icon: <Boxes size={18} />, path: "/Admin/inventory" },
  { name: "Order", icon: <ShoppingBag size={18} />, path: "/Admin/order" },
  { name: "Produk", icon: <ShoppingBag size={18} />, path: "/Admin/produk" },
  { name: "Reservasi", icon: <CalendarCheck size={18} />, path: "/Admin/reservations" },
  { name: "Data Pelanggan", icon: <Users2 size={18} />, path: "/Admin/customers" },
  { name: "Kelola Feedback", icon: <MessageCircle size={18} />, path: "/Admin/feedback" },
  { name: "Kelola FAQ", icon: <CircleHelp size={18} />, path: "/Admin/faqs" },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gradient-to-br from-sky-400 via-blue-500 to-blue-800 text-white w-60 min-h-screen shadow-xl hidden md:flex flex-col relative p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-2xl" />

      {/* Sidebar Content */}
      <div className="flex flex-col justify-between h-full relative z-10">
        {/* Header */}
        <div className="mb-4">
          <div className="text-xl font-bold text-white drop-shadow-lg bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
              ✨ Mahacare
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                isActive(item.path)
                  ? "bg-white/20 text-white font-semibold shadow-sm border border-white/30"
                  : "hover:bg-white/10 hover:text-white/90 text-white/80"
              }`}
            >
              <div className={`p-1 rounded-md ${
                isActive(item.path) ? "bg-white/20" : "group-hover:bg-white/10"
              }`}>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Footer Section (Back to Dashboard only) */}
        <div className="pt-4 border-t border-white/10 mt-4">
          <Link
            to="/"
            className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm text-white/80 hover:bg-white/10 hover:text-white"
          >
            <div className="p-1 rounded-md group-hover:bg-white/10">
              <LogOut size={18} />
            </div>
            <span>Kembali ke Dashboard</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
