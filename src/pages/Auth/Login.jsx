import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const result = await login(email, password);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else if (result.user.role === 'customer') {
        navigate('/customer');
      }
    } else {
      setError(result.message || 'Kredensial tidak valid. Silakan coba lagi.');
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8] px-4 font-['DM_Sans',sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white p-10 md:p-12 rounded-sm shadow-sm border border-[#e8ecf1] max-w-md w-full relative overflow-hidden"
        >
          {/* Latar Belakang Dekoratif Subtle di dalam card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4f6f8] rounded-bl-full opacity-50 z-0 transform translate-x-10 -translate-y-10" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-3">
                Selamat Datang
              </h2>
              <p className="text-[#5a6a7e] text-[14px] font-light">
                Silakan masuk untuk mengakses layanan The Rose Clinic.
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#FFF0F0] border border-[#FFD6D6] text-[#D32F2F] text-[13px] px-4 py-3 rounded-sm mb-6 text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[13px] font-medium text-[#293A52] uppercase tracking-wider mb-2">
                  Alamat Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#CCD4E1] bg-white text-[#293A52] rounded-sm focus:outline-none focus:border-[#293A52] focus:ring-1 focus:ring-[#293A52] transition-colors placeholder-[#a8b5c7]"
                  placeholder="contoh@email.com"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-[#293A52] uppercase tracking-wider mb-2">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#CCD4E1] bg-white text-[#293A52] rounded-sm focus:outline-none focus:border-[#293A52] focus:ring-1 focus:ring-[#293A52] transition-colors placeholder-[#a8b5c7]"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full bg-[#293A52] border border-[#293A52] text-[#FCFCFC] py-3.5 rounded-sm font-medium tracking-wide hover:bg-[#344a66] hover:border-[#344a66] transition-all duration-300 mt-4"
              >
                Masuk Sekarang
              </motion.button>
            </form>

            <div className="mt-10 pt-6 border-t border-[#e8ecf1]">
              <p className="text-center text-[#a8b5c7] text-[12px] font-light tracking-wide">
                &copy; {new Date().getFullYear()} The Rose Clinic. Hak cipta dilindungi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;