import React from 'react';
import { Link } from 'react-router-dom';

const LandingHeader = () => (
  <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

      :root {
        --primary:    #293A52;
        --primary-90: #344a66;
        --primary-20: #d0d8e3;
        --primary-10: #e8ecf1;
        --primary-05: #f4f6f8;
        --secondary:  #CCD4E1;
        --sec-dark:   #a8b5c7;
        --white:      #FCFCFC;
        --black:      #020202;
        --gray-text:  #5a6a7e;
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

      /* ── Logo ── */
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

      /* ── Nav links ── */
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

      /* ── Auth buttons ── */
      .header-auth {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-shrink: 0;
      }

      .btn-outline-sm {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: var(--primary);
        background: transparent;
        border: 1px solid var(--secondary);
        padding: 8px 18px;
        border-radius: 3px;
        text-decoration: none;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
      }

      .btn-outline-sm:hover {
        border-color: var(--primary);
        background: var(--primary-05);
      }

      .btn-solid-sm {
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: var(--white);
        background: var(--primary);
        border: 1px solid var(--primary);
        padding: 8px 18px;
        border-radius: 3px;
        text-decoration: none;
        transition: background 0.2s ease;
        display: inline-flex;
        align-items: center;
      }

      .btn-solid-sm:hover {
        background: var(--primary-90);
      }

      @media (max-width: 768px) {
        .header-nav { display: none; }
        .header-auth { display: none; }
      }
    `}</style>

    <header className="header-root">
      <div className="header-inner">
        {/* Logo */}
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

        {/* Nav */}
        <nav className="header-nav">
          <Link to="/">Beranda</Link>
          <Link to="/products-all">Produk</Link>
          <Link to="/layanan-kami">Layanan</Link>
          <Link to="/tentang">Tentang</Link>
          <Link to="/promo">Promo</Link>
        </nav>

        {/* Auth */}
        <div className="header-auth">
          <Link to="/login" className="btn-outline-sm">Login</Link>
          <Link to="/register" className="btn-solid-sm">Register</Link>
        </div>
      </div>
    </header>
  </>
);

export default LandingHeader;