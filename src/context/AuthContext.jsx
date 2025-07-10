// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(res => {
      if (res.data?.session?.user) fetchProfile(res.data.session.user.id);
    });

    const listener = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) fetchProfile(session.user.id);
      else setUser(null);
    });

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const fetchProfile = async id => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data && !error) setUser(data);
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data.user) return { success: false, message: error?.message || 'Login gagal' };

    const userId = data.user.id;
    const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (profileError || !profile) return { success: false, message: 'Gagal mengambil role pengguna.' };

    setUser(profile);
    return { success: true, user: profile };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
