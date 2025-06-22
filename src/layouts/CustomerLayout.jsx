import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerHeader from '../components/Customer/CustomerHeader';
import Footer from '../components/Landing/Footer';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;