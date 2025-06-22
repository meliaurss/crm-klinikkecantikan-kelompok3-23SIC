// src/components/Customer/CustomerSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Calendar, Star } from 'lucide-react';

const CustomerSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/customer/dashboard' },
    { name: 'Produk Saya', icon: <ShoppingBag size={20} />, path: '/customer/products' },
    { name: 'Reservasi Saya', icon: <Calendar size={20} />, path: '/customer/reservations' },
    { name: 'Poin & Feedback', icon: <Star size={20} />, path: '/customer/points' },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-lg border-r min-h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-indigo-700">Mahacare</h2>
        <p className="text-sm text-gray-500">Customer Panel</p>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${location.pathname === item.path
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default CustomerSidebar;
