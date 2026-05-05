import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarIcon, 
  UsersIcon, 
  StarIcon, 
  ArrowUpIcon,
  CheckBadgeIcon, // Icon baru untuk tombol selesai
  ClockIcon
} from "@heroicons/react/24/outline";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedYear, setSelectedYear] = useState("2026");
  
  // 1. Data Dummy (Disesuaikan agar ada yang Menunggu dan Dikonfirmasi)
  const [reservasiData, setReservasiData] = useState([
    { id: 1, name: "Siti Aminah", email: "siti@mail.com", layanan: "Facial Glow Premium", dokter: "dr. Tengku Rose", status: "Dikonfirmasi", jam: "09:00" },
    { id: 2, name: "Budi Santoso", email: "budi@mail.com", layanan: "Acne Cure Treatment", dokter: "dr. Andi Wijaya", status: "Menunggu", jam: "11:30" },
    { id: 3, name: "Dewi Lestari", email: "dewi@mail.com", layanan: "Anti-Aging Laser", dokter: "dr. Maya Indah", status: "Dikonfirmasi", jam: "14:00" },
    { id: 4, name: "Rian Hidayat", email: "rian@mail.com", layanan: "Brightening Skinbooster", dokter: "dr. Rina Kusuma", status: "Dikonfirmasi", jam: "16:00" },
  ]);

  // FILTER: Hanya menampilkan yang berstatus 'Dikonfirmasi'
  const confirmedReservations = reservasiData.filter(item => item.status === "Dikonfirmasi");

  // 2. Fungsi Aksi Selesai
  const handleComplete = (id) => {
    setReservasiData(prev => 
      prev.map(item => item.id === id ? { ...item, status: "Selesai" } : item)
    );
    alert("Pasien telah ditandai Selesai Treatment.");
  };

  const [dynamicStats, setDynamicStats] = useState({
    reservasiCount: 31,
    totalPelanggan: 5161,
    treatmentFavorit: "Facial Glow Premium",
    produkTerlaris: "Rose Brightening Serum"
  });

  // Visualisasi Data (Sama seperti sebelumnya)
  const colors = { navy: "#1e293b", slate: "#64748b" };
  const generateChartData = (year) => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [{
      label: `Total Pasien ${year}`,
      data: [400, 420, 450, 410, 480, 520, 580, 600, 620, 0, 0, 0],
      borderColor: colors.navy,
      backgroundColor: "rgba(30, 41, 59, 0.05)",
      fill: true,
      tension: 0.4,
    }],
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-sans text-slate-800">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <h1 className="text-3xl font-serif font-bold text-[#1e293b]">
            The Rose Aesthetic Clinic <span className="font-light italic text-slate-400 text-xl ml-2">Admin Dashboard</span>
          </h1>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cek Tanggal</span>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="outline-none text-sm font-bold bg-transparent" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Reservasi Terfilter</p>
            <h2 className="text-4xl font-bold text-[#1e293b]">{dynamicStats.reservasiCount}</h2>
            <p className="text-slate-500 text-[10px] mt-2 font-medium">Periode: April 2026</p>
            <CalendarIcon className="absolute -right-2 -bottom-2 w-16 h-16 text-slate-50" />
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
            <p className="text-slate-400 text-xs font-bold uppercase mb-2">Total Pelanggan</p>
            <h2 className="text-4xl font-bold text-[#1e293b]">{dynamicStats.totalPelanggan.toLocaleString()}</h2>
            <p className="text-green-500 text-xs mt-2 font-bold">↑ 12% Month over Month</p>
            <UsersIcon className="absolute -right-2 -bottom-2 w-16 h-16 text-slate-50" />
          </div>
          <div className="bg-[#1e293b] p-6 rounded-3xl shadow-xl text-white">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-4">Treatment Terpopuler</p>
            <h2 className="text-xl font-serif font-bold leading-tight">{dynamicStats.treatmentFavorit}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-400 text-xs">★★★★★</span>
              <span className="text-slate-400 text-[10px]">High Demand</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-4">Produk Terlaris</p>
            <h2 className="text-xl font-serif font-bold text-[#1e293b] leading-tight">{dynamicStats.produkTerlaris}</h2>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4"><div className="bg-slate-400 h-1.5 rounded-full w-[85%]"></div></div>
          </div>
        </div>

        {/* TABEL: Diperbaiki agar lebih kontras & Menampilkan hanya 'Dikonfirmasi' */}
        <div className="bg-white p-0 rounded-[2rem] shadow-md border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-xl font-serif font-bold text-slate-800 italic">Antrian Treatment Hari Ini</h3>
              <p className="text-slate-400 text-xs font-medium mt-1">Hanya menampilkan reservasi yang telah dikonfirmasi oleh Admin.</p>
            </div>
            <div className="bg-blue-600 text-white text-[10px] px-4 py-2 rounded-xl font-black uppercase tracking-widest">
              {confirmedReservations.length} Pasien Terdaftar
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-slate-200">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Jam</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Pasien</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Treatment & Dokter</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {confirmedReservations.length > 0 ? (
                  confirmedReservations.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-black text-slate-700">{item.jam}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1e293b]">{item.name}</span>
                          <span className="text-[11px] text-slate-400 font-medium">{item.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-700">{item.layanan}</span>
                          <span className="text-[11px] text-slate-400 uppercase tracking-tight">{item.dokter}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-blue-100 text-blue-700 shadow-sm">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <button 
                          onClick={() => handleComplete(item.id)}
                          className="flex items-center gap-2 mx-auto bg-white border border-slate-200 text-[#1e293b] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-300 shadow-sm"
                        >
                          <CheckBadgeIcon className="w-4 h-4" />
                          Selesai Treatment
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center text-slate-400 italic font-medium">
                      Belum ada reservasi yang dikonfirmasi untuk hari ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik Section (Tetap sama sesuai kode awal kamu) */}
        <div className="grid lg:grid-cols-3 gap-8 pb-12">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-xl font-serif font-bold text-slate-800 italic mb-8">Trafik Kunjungan Pasien</h3>
            <div className="h-[300px] w-full"><Line data={generateChartData(selectedYear)} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col justify-between">
            <h3 className="font-serif font-bold text-lg text-slate-800 border-b pb-4">Status Operasional</h3>
            <div className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Tingkat Kepuasan</span>
                <span className="text-yellow-500">★★★★★ (4.9)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Staf Aktif</span>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div><span className="text-sm font-bold text-slate-700">12 Spesialis</span></div>
              </div>
            </div>
            <button className="w-full mt-10 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Ekspor Laporan Bulanan</button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Dashboard;