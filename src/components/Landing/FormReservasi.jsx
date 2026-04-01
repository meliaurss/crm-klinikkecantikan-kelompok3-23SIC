import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const inputClass = {
  width: '100%',
  borderRadius: '3px',
  border: '1px solid #CCD4E1',
  padding: '11px 14px',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '13px',
  color: '#020202',
  background: '#FCFCFC',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function FormReservasi() {
  const [formData, setFormData] = useState({
    name: '', tanggal_lahir: '', jenis_kelamin: '', no_hp: '', email: '',
    alamat: '', tanggal_reservasi: '', layanan: '', dokter: '', catatan: '',
    status: 'Menunggu',
  });
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      setUserLoading(true);
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) setUserId(data.user.id);
      else setUserId(null);
      setUserLoading(false);
      const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session?.user) setUserId(session.user.id);
        else if (event === 'SIGNED_OUT') setUserId(null);
        setUserLoading(false);
      });
      return () => listener.subscription.unsubscribe();
    };
    init();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userLoading) { alert('Sedang memuat data user, mohon tunggu.'); return; }
    if (!userId) { alert('Anda harus login untuk membuat reservasi.'); navigate('/login'); return; }
    setIsSubmitting(true);
    const { error } = await supabase.from('reservasi').insert([{
      user_id: userId, ...formData,
      tanggal_lahir: formData.tanggal_lahir || null,
      tanggal_reservasi: formData.tanggal_reservasi || null,
      catatan: formData.catatan || '',
    }]);
    setIsSubmitting(false);
    if (error) {
      alert(error.code === '23503' ? 'Masalah akun, coba login ulang.' : 'Gagal mengirim: ' + error.message);
      return;
    }
    setSubmitted(true);
    navigate('/customer/dashboard');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: '', tanggal_lahir: '', jenis_kelamin: '', no_hp: '', email: '', alamat: '', tanggal_reservasi: '', layanan: '', dokter: '', catatan: '', status: 'Menunggu' });
    navigate('/customer/dashboard');
  };

  if (userLoading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", color: '#5a6a7e' }}>
      Memuat data user...
    </div>
  );

  if (!userId) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24, fontFamily: "'DM Sans', sans-serif" }}>
      <p style={{ color: '#293A52', fontSize: 16 }}>Anda harus login untuk membuat reservasi.</p>
      <button onClick={() => navigate('/login')} style={{ background: '#293A52', color: '#FCFCFC', border: 'none', borderRadius: '3px', padding: '12px 28px', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>
        Login Sekarang
      </button>
    </div>
  );

  const selectStyle = {
    ...inputClass,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23293A52' d='M2 0L0 2h4L2 0zM2 5L0 3h4L2 5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '8px 10px',
    cursor: 'pointer',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700&family=DM+Sans:wght@300;400;500&display=swap');

        .form-input:focus {
          border-color: #293A52 !important;
          box-shadow: 0 0 0 3px rgba(41,58,82,0.08);
        }

        .form-section-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #a8b5c7;
          margin-bottom: 14px;
          display: block;
        }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto', background: '#FCFCFC', borderRadius: '3px', padding: '48px 40px', fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 500, color: '#020202', letterSpacing: '-0.4px', marginBottom: 10 }}>
            Buat Reservasi Anda
          </h1>
          <div style={{ width: 40, height: 1, background: '#CCD4E1', margin: '0 auto 14px' }} />
          <p style={{ fontSize: 14, color: '#5a6a7e', fontWeight: 300, lineHeight: 1.7 }}>
            Isi formulir di bawah untuk menjadwalkan konsultasi atau layanan Anda.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Image */}
          <div style={{ flex: '1 1 280px', maxWidth: 340 }}>
            <div style={{ position: 'relative', borderRadius: '3px', overflow: 'hidden', border: '1px solid #CCD4E1' }}>
              <img
                src="https://i.pinimg.com/736x/b1/5f/7a/b15f7ae369932e902c59d63f486c0d49.jpg"
                alt="Aesthetic consultation"
                style={{ width: '100%', display: 'block', objectFit: 'cover' }}
              />
              {/* Overlay tag */}
              <div style={{ position: 'absolute', bottom: 14, left: 14, background: 'rgba(252,252,252,0.92)', backdropFilter: 'blur(8px)', border: '1px solid #CCD4E1', borderRadius: '3px', padding: '5px 12px', fontSize: 10, fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#293A52' }}>
                The Rose Clinic
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: '1 1 320px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Row 1 */}
              <div>
                <span className="form-section-label">Data Diri</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <input className="form-input" style={inputClass} type="text" name="name" placeholder="Nama Lengkap *" value={formData.name} onChange={handleChange} required />
                  <input className="form-input" style={inputClass} type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} required />
                  <select className="form-input" style={selectStyle} name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required>
                    <option value="" disabled hidden>Jenis Kelamin *</option>
                    <option value="Perempuan">Perempuan</option>
                    <option value="Laki-laki">Laki-laki</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <input className="form-input" style={inputClass} type="tel" name="no_hp" placeholder="Nomor HP *" value={formData.no_hp} onChange={handleChange} required />
                <input className="form-input" style={inputClass} type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Alamat */}
              <textarea className="form-input" style={{ ...inputClass, resize: 'vertical' }} name="alamat" rows={3} placeholder="Alamat Lengkap *" value={formData.alamat} onChange={handleChange} required />

              {/* Row reservasi & layanan */}
              <div>
                <span className="form-section-label">Detail Reservasi</span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input className="form-input" style={inputClass} type="date" name="tanggal_reservasi" value={formData.tanggal_reservasi} onChange={handleChange} required />
                  <select className="form-input" style={selectStyle} name="layanan" value={formData.layanan} onChange={handleChange} required>
                    <option value="" disabled hidden>Pilih Layanan *</option>
                    <option>Konsultasi Umum</option>
                    <option>Facial Glow Treatment</option>
                    <option>Acne Cure Treatment</option>
                    <option>Anti-Aging Laser</option>
                    <option>Brightening Skinbooster</option>
                  </select>
                </div>
              </div>

              {/* Dokter & catatan */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <select className="form-input" style={selectStyle} name="dokter" value={formData.dokter} onChange={handleChange} required>
                  <option value="" disabled hidden>Pilih Dokter *</option>
                  <option>dr. Tengku Rose</option>
                  <option>dr. Rina Kusuma</option>
                  <option>dr. Andi Wijaya</option>
                  <option>dr. Maya Indah</option>
                </select>
                <textarea className="form-input" style={{ ...inputClass, resize: 'vertical' }} name="catatan" rows={2} placeholder="Catatan (mis. alergi obat)" value={formData.catatan} onChange={handleChange} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !userId}
                style={{
                  background: isSubmitting ? '#a8b5c7' : '#293A52',
                  color: '#FCFCFC',
                  border: 'none',
                  borderRadius: '3px',
                  padding: '14px 24px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  width: '100%',
                  marginTop: 8,
                  transition: 'background 0.25s',
                }}
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Reservasi →'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success modal */}
      {submitted && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(41,58,82,0.35)', backdropFilter: 'blur(4px)' }}>
          <div style={{ position: 'relative', background: '#FCFCFC', border: '1px solid #CCD4E1', borderRadius: '3px', padding: '40px 32px', maxWidth: 420, width: '90%', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>
            <button onClick={resetAndClose} style={{ position: 'absolute', top: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', color: '#a8b5c7' }}>
              <X size={18} />
            </button>
            <div style={{ width: 40, height: 40, borderRadius: '3px', background: '#e8ecf1', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#293A52" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: '#020202', marginBottom: 12 }}>Reservasi Berhasil!</h2>
            <div style={{ width: 32, height: 1, background: '#CCD4E1', margin: '0 auto 14px' }} />
            <p style={{ fontSize: 14, color: '#5a6a7e', fontWeight: 300, lineHeight: 1.75 }}>
              Terima kasih, <strong style={{ color: '#293A52', fontWeight: 500 }}>{formData.name}</strong>.
              Reservasi untuk <strong style={{ color: '#293A52', fontWeight: 500 }}>{formData.layanan}</strong> bersama{' '}
              <strong style={{ color: '#293A52', fontWeight: 500 }}>{formData.dokter}</strong> pada{' '}
              <strong style={{ color: '#293A52', fontWeight: 500 }}>{formData.tanggal_reservasi}</strong> telah kami terima.
              Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
            </p>
            <button onClick={resetAndClose} style={{ marginTop: 24, background: '#293A52', color: '#FCFCFC', border: 'none', borderRadius: '3px', padding: '11px 28px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}