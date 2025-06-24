import { useEffect, useState } from 'react';
import { supabase } from '../../supabase';
import PelangganForm from '../../components/PelangganForm';


function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);
  const [editingPelanggan, setEditingPelanggan] = useState(null);

  const fetchPelanggan = async () => {
    const { data, error } = await supabase.from('pelanggan').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setPelanggan(data);
  };

  const addPelanggan = async (pelanggan) => {
    const { error } = await supabase.from('pelanggan').insert(pelanggan);
    if (error) console.error(error);
    else fetchPelanggan();
  };

  const updatePelanggan = async (pelanggan) => {
    const { error } = await supabase.from('pelanggan').update(pelanggan).eq('id', pelanggan.id);
    if (error) console.error(error);
    else {
      fetchPelanggan();
      setEditingPelanggan(null);
    }
  };

  const deletePelanggan = async (id) => {
    const { error } = await supabase.from('pelanggan').delete().eq('id', id);
    if (error) console.error(error);
    else fetchPelanggan();
  };

  useEffect(() => {
    fetchPelanggan();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Pengguna dengan Supabase</h1>
      <PelangganForm
        addPelanggan={addPelanggan}
        updatePelanggan={updatePelanggan}
        editingPelanggan={editingPelanggan}
      />
      <ul className="mt-4">
        {pelanggan.map(pelanggan => (
          <li key={pelanggan.id} className="border p-2 my-2 flex justify-between">
            <div>
              <p className="font-semibold">{pelanggan.name}</p>
              <p className="text-sm text-gray-600">{pelanggan.email} - {pelanggan.role}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingPelanggan(pelanggan)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => deletePelanggan(pelanggan.id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pelanggan;


