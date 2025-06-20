import { useState, useEffect } from 'react';

const PelangganForm = ({ addPelanggan, updatePelanggan, editingPelanggan }) => {
  const [form, setForm] = useState({ name: '', email: '',  telepon: '',  status: '', role: '',  riwayat: '' });

  useEffect(() => {
    if (editingPelanggan) setForm(editingPelanggan);
    else setForm({ name: '', email: '',  telepon: '',  status: '', role: '',  riwayat: '' });
  }, [editingPelanggan]);

  const handleSubmit = (e) => {
    e.preventDefault();
  console.log("ok")
    if (!form.name || !form.email || !form.telepon || !form.status || !form.role || !form.riwayat) return;
   
    editingPelanggan ? updatePelanggan(form) : addPelanggan(form);
    setForm({ name: '', email: '',  telepon: '',  status: '', role: '',  riwayat: '' });
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Nama"
        className="w-full p-2 border rounded"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
        <input
        type="text"
        placeholder="Telephone"
        className="w-full p-2 border rounded"
        value={form.telepon}
        onChange={e => setForm({ ...form, telepon: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <select
        className="w-full p-2 border rounded"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="">Pilih Status</option>
        <option value="Baru">Baru</option>
        <option value="Member">Member</option>
      </select>
      <select
        className="w-full p-2 border rounded"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="">Pilih Role</option>
        <option value="Bronze">Bronze</option>
        <option value="Silver">Silver</option>
        <option value="Gold">Gold</option>
      </select>
      <input
        type="text"
        placeholder="Riwayat"
        className="w-full p-2 border rounded"
        value={form.riwayat}
        onChange={e => setForm({ ...form, riwayat: e.target.value })}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {editingPelanggan ? 'Perbarui' : 'Tambah'}
      </button>
    </form>
  );
};

export default PelangganForm;