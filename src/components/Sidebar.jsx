import { MdOutlineInventory2 } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import {
  LayoutDashboard,
  Users,
  Box,
  BarChart2,
  HelpCircle,
  Package,
  Settings,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin/dashboard" },
  { name: "Inventory", icon: <Package />, path: "/admin/inventory" },
  { name: "Laporan", icon: <BarChart2 />, path: "/admin/laporan" },
  { name: "Produk", icon: <Box />, path: "/admin/produk" },
  { name: "Reservasi", icon: <SlCalender />, path: "/admin/reservations" },
  { name: "Data Pelanggan", icon: <Users />, path: "/admin/customers" },
  { name: "Kelola Feedback", icon: <HelpCircle />, path: "/admin/feedback" },
  { name: "Kelola FAQ", icon: <HelpCircle />, path: "/admin/faqs" },
];

const accountItems = [
  { name: "Pengaturan Akun", icon: <Settings />, path: "/akun" },
  { name: "Kembali", icon: <LogIn />, path: "/" },
  { name: "Sign Up", icon: <UserPlus />, path: "/signup" },
];

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-700 text-white w-64 h-screen shadow-xl hidden md:flex flex-col justify-between p-6">
      {/* Top Section */}
      <div>
        {/* Branding */}
        <div className="text-2xl font-extrabold tracking-wide mb-6 text-white drop-shadow-lg">
          ✨ Mahacare Admin
        </div>

        {/* Menu Utama */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-white text-purple-800 font-bold shadow"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        <div className="text-xs font-semibold uppercase text-white/60 mb-2 mt-6">
          Akun
        </div>
        <nav className="space-y-1">
          {accountItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-white text-purple-800 font-bold shadow"
                  : "hover:bg-white/10 text-white/80 hover:text-white"
              }`}
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
