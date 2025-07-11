import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'customer', // dikirim ke trigger
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, role } = form;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(`Registrasi gagal: ${error.message}`);
      setLoading(false);
      return;
    }

    const userId = data?.user?.id;

    if (!userId) {
      toast.success('Registrasi berhasil! Silakan verifikasi email Anda.');
      navigate('/login');
      setLoading(false);
      return;
    }

    // ✅ Simpan profil dengan role yang dipilih
    const { error: profileError } = await supabase.from('profiles').insert  ([
      {
        id: userId,
        email,
        role, // Ambil langsung dari form
        created_at: new Date().toISOString(),
      },
    ]);

    if (profileError) {
      toast.error('Akun dibuat, tapi gagal menyimpan role ke profiles.');
      console.error(profileError);
    } else {
      toast.success('Registrasi berhasil! Silakan verifikasi email Anda.');
      setTimeout(() => navigate('/login'), 2000);
    }

    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <div className="flex items-center justify-center space-x-2">
          <SparklesIcon className="h-8 w-8 text-indigo-600 animate-pulse" />
          <h1 className="text-2xl font-extrabold text-indigo-700">Daftar Mahacare</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold rounded-lg hover:brightness-110 shadow-md transition duration-300"
          >
            {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
