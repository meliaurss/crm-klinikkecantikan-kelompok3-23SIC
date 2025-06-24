import {
  LayoutDashboard,     // Dashboard
  Boxes,               // Inventory (lebih cocok daripada Package)
  FileBarChart,        // Laporan (lebih representatif untuk laporan/graph)
  ShoppingBag,         // Produk
  CalendarCheck,       // Reservasi
  Users2,              // Data Pelanggan
  MessageCircle,       // Feedback
  CircleHelp,          // FAQ
  Settings,
  LogOut,
  UserPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/Admin/dashboard" },
  { name: "Inventory", icon: <Boxes size={20} />, path: "/Admin/inventory" },
  { name: "Laporan", icon: <FileBarChart size={20} />, path: "/Admin/laporan" },
  { name: "Produk", icon: <ShoppingBag size={20} />, path: "/Admin/produk" },
  { name: "Reservasi", icon: <CalendarCheck size={20} />, path: "/Admin/reservations" },
  { name: "Data Pelanggan", icon: <Users2 size={20} />, path: "/Admin/customers" },
  { name: "Kelola Feedback", icon: <MessageCircle size={20} />, path: "/Admin/feedback" },
  { name: "Kelola FAQ", icon: <CircleHelp size={20} />, path: "/Admin/faqs" },
];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings size={20} />, path: "/akun" },
  { name: "Kembali", icon: <LogOut size={20} />, path: "/" },
  { name: "Sign Up", icon: <UserPlus size={20} />, path: "/signup" },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gradient-to-b from-indigo-600 to-purple-700 text-white w-64 h-screen shadow-lg hidden md:flex flex-col justify-between p-6">
      {/* Branding */}
      <div>
        <div className="text-2xl font-extrabold tracking-tight mb-8 text-white drop-shadow-sm">
          ✨ Mahacare Admin
        </div>

        {/* Main Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive(item.path)
                  ? "bg-white text-purple-800 font-semibold shadow-md"
                  : "hover:bg-white/10 hover:backdrop-blur-sm hover:text-white/90 text-white/70"
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 rounded-r-full ${
                  isActive(item.path) ? "bg-white" : "group-hover:bg-white/30"
                } transition-all`}
              />
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Account Section */}
      <div className="pt-6">
        <div className="text-xs font-semibold uppercase text-white/50 mb-3">
          Akun
        </div>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 relative ${
                isActive(item.path)
                  ? "bg-white text-purple-800 font-semibold shadow-md"
                  : "hover:bg-white/10 hover:backdrop-blur-sm hover:text-white/90 text-white/70"
              }`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1 rounded-r-full ${
                  isActive(item.path) ? "bg-white" : "group-hover:bg-white/30"
                } transition-all`}
              />
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
