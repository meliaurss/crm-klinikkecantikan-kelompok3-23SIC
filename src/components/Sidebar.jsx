import { BsCalendar } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai"; 
import { SlCalender } from "react-icons/sl";

import {
  LayoutDashboard,
  Users, // untuk pelanggan
  Box, // untuk produk
  Megaphone, // untuk laporan
  Settings, // untuk pengaturan akun
  LogIn,
  UserPlus,
  ShoppingCart,
  BarChart2,
  
  ChartArea,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard />, path: "/admin" },
  { name: "Produk", icon: <Box />, path: "/produk" },
  {name: "Data Pelanggan", icon: <ShoppingCart/>, path: "/datapelanggan"},
  { name: "Laporan", icon: <BarChart2 />, path: "/laporan" },
  { name: "Reservasi", icon: <BsCalendar />, path: "/reservasi" },
  { name: "Reservasi", icon: <SlCalender />, path: "/reservasi" },
  { name: "Reservasi", icon: <SlCalender />, path: "/reservasi-management" },
  {name: "Data Pelanggan", icon: <Users/>, path: "/datapelanggan"},
  { name: "Feedback", icon: <Megaphone />, path: "/feedback" },
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
    <aside className="bg-white w-64 h-screen shadow-lg px-4 py-6 hidden md:block">
      <div className="text-xl font-bold mb-8 text-purple-700">Klinik Kecantikan</div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? "bg-purple-200 text-purple-800 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 text-xs font-semibold text-gray-500">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-100 transition ${
              isActive(item.path)
                ? "bg-purple-200 text-purple-800 font-semibold"
                : "text-gray-700"
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
