// src/layouts/CustomerLayout.jsx (Contoh)
import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/Customer/CustomerHeader'; // Pastikan path benar
import CustomerSidebar from '../components/Customer/CustomerSidebar'; // Jika ada sidebar

// Asumsi CustomerLayout menerima cartItems dari App.jsx
const CustomerLayout = ({ cartItems }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
   
      <div className="flex-1 flex flex-col">
        <CustomerHeader cartItems={cartItems} /> {/* <--- Teruskan cartItems di sini */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;