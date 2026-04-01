import { useState, useEffect } from 'react';
 
export const PelangganForm = ({ addPelanggan, updatePelanggan, editingPelanggan }) => {
  const empty = { name: '', email: '', telepon: '', status: '', role: '', riwayat: '' };
  const [form, setForm] = useState(empty);
 
  useEffect(() => {
    setForm(editingPelanggan || empty);
  }, [editingPelanggan]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, telepon, status, role, riwayat } = form;
    if (!name || !email || !telepon || !status || !role || !riwayat) return;
    editingPelanggan ? updatePelanggan(form) : addPelanggan(form);
    setForm(empty);
  };
 
  const fieldStyle = {
    width: '100%', borderRadius: '3px', border: '1px solid #CCD4E1',
    padding: '10px 13px', fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: '#020202', background: '#FCFCFC', outline: 'none',
  };
  const selectStyle = {
    ...fieldStyle, appearance: 'none', cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23293A52' d='M2 0L0 2h4L2 0zM2 5L0 3h4L2 5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '8px 10px',
  };
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');
        .pf-input:focus { border-color: #293A52 !important; box-shadow: 0 0 0 3px rgba(41,58,82,0.08); }
      `}</style>
 
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: "'DM Sans', sans-serif" }}>
        <input className="pf-input" style={fieldStyle} type="text" placeholder="Nama" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="pf-input" style={fieldStyle} type="text" placeholder="Telepon" value={form.telepon} onChange={e => setForm({ ...form, telepon: e.target.value })} />
        <input className="pf-input" style={fieldStyle} type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <select className="pf-input" style={selectStyle} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option value="">Pilih Status</option>
          <option value="Baru">Baru</option>
          <option value="Member">Member</option>
        </select>
        <select className="pf-input" style={selectStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="">Pilih Role</option>
          <option value="Bronze">Bronze</option>
          <option value="Silver">Silver</option>
          <option value="Gold">Gold</option>
        </select>
        <input className="pf-input" style={fieldStyle} type="text" placeholder="Riwayat" value={form.riwayat} onChange={e => setForm({ ...form, riwayat: e.target.value })} />
 
        <button type="submit" style={{ background: '#293A52', color: '#FCFCFC', border: 'none', borderRadius: '3px', padding: '11px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginTop: 4, transition: 'background 0.2s' }}>
          {editingPelanggan ? 'Perbarui Data' : 'Tambah Pelanggan'}
        </button>
      </form>
    </>
  );
};