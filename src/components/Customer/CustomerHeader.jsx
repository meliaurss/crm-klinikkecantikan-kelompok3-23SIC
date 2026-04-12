import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

const CustomerHeader = ({ cartItems }) => {
  const uniqueItemsCount = cartItems?.length || 0;

  return (
    <>
      <style>{`
        /* ... (CSS tidak ada yang diubah, tetap sama seperti sebelumnya) ... */
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --primary:     #293A52;
          --primary-90: #344a66;
          --primary-20: #d0d8e3;
          --primary-10: #e8ecf1;
          --primary-05: #f4f6f8;
          --secondary:  #CCD4E1;
          --sec-dark:   #a8b5c7;
          --white:      #FCFCFC;
          --black:      #020202;
          --gray-text:  #5a6a7e;
          --danger:     #e53e3e;
          --danger-light:#fff5f5;
          --danger-border:#fc8181;
        }

        .header-root {
          background: rgba(252, 252, 252, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--secondary);
          position: sticky;
          top: 0;
          z-index: 50;
          font-family: 'DM Sans', sans-serif;
        }

        .header-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .header-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 3px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .header-logo-mark svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: var(--white);
          stroke-width: 1.5;
          stroke-linecap: round;
        }

        .header-logo:hover .header-logo-mark {
          background: var(--primary-90);
        }

        .header-brand-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          line-height: 1;
        }

        .header-brand-eyebrow {
          font-size: 8px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--sec-dark);
        }

        .header-brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 500;
          color: var(--primary);
          letter-spacing: 0.2px;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .header-nav a {
          font-size: 13px;
          font-weight: 400;
          color: var(--gray-text);
          text-decoration: none;
          letter-spacing: 0.3px;
          position: relative;
          padding-bottom: 2px;
          transition: color 0.2s;
        }

        .header-nav a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--primary);
          border-radius: 1px;
          transition: width 0.25s ease;
        }

        .header-nav a:hover {
          color: var(--primary);
        }

        .header-nav a:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .btn-action {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 8px 16px;
          border-radius: 3px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-action svg {
          width: 16px;
          height: 16px;
        }

        .btn-outline-primary {
          color: var(--primary);
          background: transparent;
          border: 1px solid var(--secondary);
        }

        .btn-outline-primary:hover {
          border-color: var(--primary);
          background: var(--primary-05);
        }

        .btn-solid-primary {
          color: var(--white);
          background: var(--primary);
          border: 1px solid var(--primary);
          position: relative;
        }

        .btn-solid-primary:hover {
          background: var(--primary-90);
        }

        .btn-outline-danger {
          color: var(--danger);
          background: transparent;
          border: 1px solid var(--danger-border);
        }

        .btn-outline-danger:hover {
          background: var(--danger-light);
          border-color: var(--danger);
        }

        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--danger);
          color: var(--white);
          font-size: 10px;
          font-weight: 700;
          height: 18px;
          min-width: 18px;
          padding: 0 4px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid var(--white);
          line-height: 1;
        }

        @media (max-width: 768px) {
          .header-nav { display: none; }
          .header-actions { display: none; }
        }
      `}</style>

      <header className="header-root">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            <div className="header-logo-mark">
              <svg viewBox="0 0 16 16">
                <path d="M8 2C8 2 6 6 2 8C6 10 8 14 8 14C8 14 10 10 14 8C10 6 8 2 8 2Z" />
              </svg>
            </div>
            <div className="header-brand-text">
              <span className="header-brand-eyebrow">by dr. Tengku Rose</span>
              <span className="header-brand-name">The Rose Clinic</span>
            </div>
          </Link>

          {/* PERUBAHAN DI SINI */}
          <nav className="header-nav">
            <Link to="/customer">Beranda</Link>
            <Link to="/customer/produk">Produk</Link>
            <Link to="/customer/layanan-kami">Layanan</Link>
            <Link to="/customer/tentang">Tentang</Link>
            <Link to="/customer/promo">Promo</Link>
          </nav>

          <div className="header-actions">
            <Link to="/customer/riwayat-pesanan" className="btn-action btn-outline-primary" title="Pesanan Saya">
              <ShoppingBagIcon />
              <span>Pesanan Saya</span>
            </Link>

            <Link to="/cart" className="btn-action btn-solid-primary" title="Keranjang Belanja">
              <ShoppingCartIcon />
              <span>Keranjang</span>
              {uniqueItemsCount > 0 && (
                <span className="cart-badge">{uniqueItemsCount}</span>
              )}
            </Link>

            <Link to="/" className="btn-action btn-outline-danger">
              Logout
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default CustomerHeader;