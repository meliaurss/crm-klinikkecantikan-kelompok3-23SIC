export const ProductAll = ({ products = [], loading, error }) => {
  const fmt = (n) => typeof n === 'number' && !isNaN(n)
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)
    : 'Rp 0';
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700&family=DM+Sans:wght@300;400;500&display=swap');
 
        .pa-root { background: #f4f6f8; min-height: 100vh; font-family: 'DM Sans', sans-serif; }
        .pa-title { font-family: 'Playfair Display', serif; color: #020202; font-weight: 500; letter-spacing: -0.4px; }
        .pa-desc { color: #5a6a7e; font-weight: 300; line-height: 1.8; }
 
        .pa-card { background: #FCFCFC; border: 1px solid #CCD4E1; border-radius: 3px; overflow: hidden; display: flex; flex-direction: column; transition: all 0.3s ease; }
        .pa-card:hover { transform: translateY(-6px); box-shadow: 0 20px 44px rgba(41,58,82,0.10); border-color: #a8b5c7; }
        .pa-img-wrap { position: relative; height: 220px; overflow: hidden; background: #e8ecf1; }
        .pa-img { width: 100%; height: 100%; object-fit: contain; transition: transform 0.5s ease; }
        .pa-card:hover .pa-img { transform: scale(1.04); }
        .pa-price-tag { position: absolute; top: 12px; left: 12px; background: #293A52; color: #FCFCFC; padding: 6px 12px; border-radius: 3px; font-size: 13px; font-weight: 500; }
        .pa-body { padding: 20px; flex: 1; display: flex; flex-direction: column; }
        .pa-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 500; color: #020202; margin-bottom: 8px; }
        .pa-divider { width: 28px; height: 1px; background: #CCD4E1; margin-bottom: 10px; }
        .pa-text { font-size: 13px; color: #5a6a7e; font-weight: 300; line-height: 1.7; flex: 1; margin-bottom: 16px; }
        .pa-btn { background: #293A52; color: #FCFCFC; border: none; border-radius: 3px; padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; width: 100%; transition: background 0.2s; }
        .pa-btn:hover { background: #344a66; }
      `}</style>
 
      <div className="pa-root" style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 className="pa-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
              Jelajahi Semua Produk
            </h1>
            <div style={{ width: 40, height: 1, background: '#CCD4E1', margin: '0 auto 16px' }} />
            <p className="pa-desc" style={{ maxWidth: 600, margin: '0 auto', fontSize: 14 }}>
              Rangkaian lengkap produk perawatan kulit The Rose Clinic — dirancang untuk hasil terbaik.
            </p>
          </div>
 
          {loading && <p style={{ textAlign: 'center', color: '#293A52', fontSize: 15 }}>Memuat produk...</p>}
          {error && <p style={{ textAlign: 'center', color: '#c0392b', fontSize: 15 }}>Gagal memuat produk: {error}</p>}
 
          {!loading && !error && products.length === 0 && (
            <div style={{ textAlign: 'center', background: '#FCFCFC', border: '1px solid #CCD4E1', borderRadius: '3px', padding: 40, maxWidth: 480, margin: '0 auto' }}>
              <p style={{ color: '#5a6a7e', fontWeight: 300 }}>Belum ada produk yang tersedia. Silakan kembali nanti.</p>
            </div>
          )}
 
          {!loading && !error && products.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {products.map((p) => (
                <div key={p.id} className="pa-card">
                  <div className="pa-img-wrap">
                    <img src={p.image} alt={p.name} className="pa-img" />
                    <div className="pa-price-tag">{fmt(p.price)}</div>
                  </div>
                  <div className="pa-body">
                    <h3 className="pa-name">{p.name}</h3>
                    <div className="pa-divider" />
                    <p className="pa-text">{p.description}</p>
                    <button className="pa-btn" onClick={() => alert(`Detail produk: ${p.name}`)}>
                      Lihat Detail →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};