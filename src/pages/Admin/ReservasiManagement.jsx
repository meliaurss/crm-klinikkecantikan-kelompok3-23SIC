import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, TrashIcon, ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { supabase } from '../../supabase'; 

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, scale: 0.95 },
};

export default function ReservasiManagement() {
  const [reservasi, setReservasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    id: null, name: "", tanggal_lahir: "", jenis_kelamin: "", no_hp: "", email: "",
    alamat: "", tanggal_reservasi: "", layanan: "", dokter: "", catatan: "",
    status: "", user_id: null,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchReservasi();
    const channel = supabase
      .channel('public:reservasi')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservasi' }, payload => {
        fetchReservasi();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReservasi = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('reservasi')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(`Gagal memuat data: ${error.message}`);
      } else {
        const formattedData = data.map(item => ({
          ...item,
          tanggal_lahir: item.tanggal_lahir ? new Date(item.tanggal_lahir).toISOString().split('T')[0] : '',
          tanggal_reservasi: item.tanggal_reservasi ? new Date(item.tanggal_reservasi).toISOString().split('T')[0] : '',
        }));
        setReservasi(formattedData);
      }
    } catch (err) {
      setError("Terjadi kesalahan tak terduga.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      id: item.id,
      name: item.name || "",
      tanggal_lahir: item.tanggal_lahir || "",
      jenis_kelamin: item.jenis_kelamin || "",
      no_hp: item.no_hp || "",
      email: item.email || "",
      alamat: item.alamat || "",
      tanggal_reservasi: item.tanggal_reservasi || "",
      layanan: item.layanan || "",
      dokter: item.dokter || "",
      catatan: item.catatan || "",
      status: item.status || "",
      user_id: item.user_id || null,
    });
  };

  // --- FUNGSI KIRIM EMAIL DENGAN LOGIKA ANTRIAN ---
  const sendEmailNotification = async (data) => {
    // 1. Hitung jumlah antrian untuk tanggal tersebut di database
    const { count } = await supabase
      .from('reservasi')
      .select('*', { count: 'exact', head: true })
      .eq('tanggal_reservasi', data.tanggal_reservasi)
      .eq('status', 'Dikonfirmasi');

    const queueNum = (count || 0) + 1;
    const displayQueue = `TRC-${queueNum.toString().padStart(3, '0')}`;
    
    const toEmail = data.email;
    const subject = encodeURIComponent(`✨ Kabar Baik! Reservasi Anda Dikonfirmasi - ${data.name}`);
    
    const body = encodeURIComponent(
      `Halo ${data.name},\n\n` +
      `Kabar bahagia! Permintaan reservasi Anda di The Rose Clinic telah kami tinjau dan kini resmi DIKONFIRMASI. ✨\n\n` +
      `Kami sangat tidak sabar menyambut kehadiran Anda untuk melakukan perawatan terbaik bersama kami.\n\n` +
      `🗓 JADWAL KEDATANGAN:\n` +
      `--------------------------------------------\n` +
      `Nomor Antrian : ${displayQueue}\n` +
      `Tanggal       : ${data.tanggal_reservasi}\n` +
      `Layanan       : ${data.layanan}\n` +
      `Dokter        : dr. ${data.dokter}\n` +
      `--------------------------------------------\n\n` +
      `📍 CATATAN PENTING:\n` +
      `1. Mohon hadir 10-15 menit sebelum jadwal untuk proses administrasi.\n` +
      `2. HARAP TUNJUKKAN EMAIL INI kepada resepsionis kami saat tiba di klinik sebagai bukti konfirmasi.\n\n` +
      `Sampai jumpa di klinik! Mari wujudkan kulit sehat impian Anda bersama The Rose Clinic.\n\n` +
      `Salam hangat,\n` +
      `Admin The Rose Clinic.`
    );
    
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
  };

  const handleSave = async () => {
    if (!editingId) return;

    const oldStatus = reservasi.find(r => r.id === editingId)?.status;
    const dataToUpdate = { ...editData };
    delete dataToUpdate.id;

    for (const key in dataToUpdate) {
      if (dataToUpdate[key] === "") dataToUpdate[key] = null;
    }

    try {
      const { error } = await supabase
        .from('reservasi')
        .update(dataToUpdate)
        .eq('id', editingId);

      if (error) {
        alert("Gagal menyimpan: " + error.message);
      } else {
        // TRIGGER EMAIL: Hanya jika status berubah menjadi 'Dikonfirmasi'
        if (editData.status === "Dikonfirmasi" && oldStatus !== "Dikonfirmasi") {
          await sendEmailNotification(editData);
        }

        setEditingId(null);
        fetchReservasi();
      }
    } catch (err) {
      alert("Kesalahan tak terduga.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const { error } = await supabase.from('reservasi').delete().eq('id', deleteId);
      if (error) {
        alert("Gagal menghapus: " + error.message);
      } else {
        setDeleteId(null);
        fetchReservasi();
      }
    } catch (err) {
      alert("Kesalahan tak terduga.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredData = reservasi.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      (item.dokter && item.dokter.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.layanan && item.layanan.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (item.status && item.status.toLowerCase().includes(lowerCaseSearchTerm))
    );
  });

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-[#f8fafc] font-['Plus_Jakarta_Sans',sans-serif]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Manajemen Reservasi</h1>
            <p className="text-sm text-slate-500">Pantau dan kelola jadwal kunjungan The Rose Clinic</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Cari data reservasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 border border-slate-200 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-[#101828]/10 focus:border-[#101828] outline-none transition-all text-sm"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Form Edit Section */}
        <AnimatePresence>
          {editingId && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
                  <div className="w-2 h-6 rounded-full bg-amber-500"></div>
                  Edit Detail Reservasi
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Nama</label><input type="text" name="name" value={editData.name} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label><input type="date" name="tanggal_lahir" value={editData.tanggal_lahir} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select name="jenis_kelamin" value={editData.jenis_kelamin} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm">
                      <option value="">Pilih...</option><option value="Laki-laki">Laki-laki</option><option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">No HP</label><input type="text" name="no_hp" value={editData.no_hp} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Email</label><input type="email" name="email" value={editData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Alamat</label><input type="text" name="alamat" value={editData.alamat} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Tanggal Reservasi</label><input type="date" name="tanggal_reservasi" value={editData.tanggal_reservasi} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Layanan</label><input type="text" name="layanan" value={editData.layanan} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Dokter</label><input type="text" name="dokter" value={editData.dokter} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1 lg:col-span-2"><label className="text-xs font-bold text-slate-500 uppercase">Catatan</label><input type="text" name="catatan" value={editData.catatan} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm" /></div>
                  <div className="space-y-1"><label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select name="status" value={editData.status} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none text-sm">
                      <option value="Menunggu">Menunggu</option><option value="Dikonfirmasi">Dikonfirmasi</option><option value="Selesai">Selesai</option><option value="Dibatalkan">Dibatalkan</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-8">
                  <button onClick={() => setEditingId(null)} className="px-6 py-2 text-slate-500 font-bold text-sm">Batal</button>
                  <button onClick={handleSave} className="px-8 py-2 bg-[#101828] text-white font-bold rounded-xl shadow-lg text-sm transition-all hover:bg-slate-800">Simpan Perubahan</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabel Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#101828] text-white">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Nama</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Tgl Reservasi</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Layanan</th>
                  <th className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                  <th className="px-4 py-4 text-center text-xs font-bold uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors text-sm">
                    <td className="px-6 py-4 font-bold text-slate-700">{item.name}</td>
                    <td className="px-4 py-4 text-slate-500 font-medium">{item.tanggal_reservasi}</td>
                    <td className="px-4 py-4 text-slate-700 font-semibold">{item.layanan}</td>
                    <td className="px-4 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
                        item.status === 'Dikonfirmasi' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Dibatalkan' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status || 'Menunggu'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-[#101828] hover:bg-slate-100 rounded-lg"><PencilIcon className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteId(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"><TrashIcon className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteId && (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <motion.div variants={popIn} initial="hidden" animate="visible" exit="exit" className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4"><TrashIcon className="w-8 h-8" /></div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Hapus Reservasi?</h2>
                <p className="text-slate-500 text-sm mb-8">Data reservasi atas nama <span className="font-bold text-slate-800">"{reservasi.find(r => r.id === deleteId)?.name}"</span> akan dihapus permanen.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm">Batal</button>
                  <button onClick={confirmDelete} className="flex-1 py-3 bg-rose-500 text-white font-bold rounded-xl shadow-lg text-sm">Hapus</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}