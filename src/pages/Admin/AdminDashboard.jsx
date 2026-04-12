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
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  // 1. State untuk Filter
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedYear, setSelectedYear] = useState("2024");
  
  // 2. Data Dummy Berdasarkan Filter (Simulasi Data Dinamis)
  const [dynamicStats, setDynamicStats] = useState({
    reservasiCount: 12,
    totalPelanggan: 5240,
    treatmentFavorit: "Facial Glow Premium",
    produkTerlaris: "Rose Brightening Serum"
  });

  // Efek simulasi ketika tanggal berubah
  useEffect(() => {
    // Di sini nantinya Anda akan melakukan Fetch API berdasarkan selectedDate
    const randomReservasi = Math.floor(Math.random() * 20) + 5;
    setDynamicStats(prev => ({ ...prev, reservasiCount: randomReservasi }));
  }, [selectedDate]);

  const colors = {
    navy: "#1e293b",
    slate: "#64748b",
    roseBackground: "#fcfcfc",
  };

  // 3. Konfigurasi Grafik Pasien Bulanan
  const generateChartData = (year) => {
    // Dummy data berbeda tiap tahun untuk simulasi
    const dataMap = {
      "2024": [120, 150, 180, 140, 210, 250, 300, 280, 320, 350, 380, 420],
      "2025": [200, 230, 210, 280, 300, 350, 400, 450, 420, 480, 500, 550],
      "2026": [400, 420, 450, 410, 480, 520, 580, 600, 620, 0, 0, 0], // Tahun berjalan
    };

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
      datasets: [
        {
          label: `Total Pasien ${year}`,
          data: dataMap[year] || dataMap["2024"],
          borderColor: colors.navy,
          backgroundColor: "rgba(30, 41, 59, 0.05)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: colors.navy,
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: colors.navy,
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        cornerRadius: 8,
      }
    },
    scales: {
      y: { 
        beginAtZero: true,
        grid: { borderDash: [5, 5], color: '#e2e8f0' },
        ticks: { color: colors.slate, font: { size: 12 } } 
      },
      x: { 
        grid: { display: false },
        ticks: { color: colors.slate, font: { size: 12 } } 
      }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-4 md:p-8 font-sans text-slate-800">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1e293b] tracking-tight">
              The Rose Aesthetic Clinic <span className="font-light italic text-slate-400 text-xl ml-2">Admin Dashboard</span>
            </h1>
           
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 w-full sm:w-auto">
               <span className="text-[10px] font-black text-slate-400 uppercase">Cek Tanggal Reservasi</span>
               <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="outline-none text-sm text-[#1e293b] font-bold cursor-pointer bg-transparent"
               />
            </div>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Reservasi Tanggal Terpilih */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-4">
               <p className="text-slate-400 text-xs font-bold uppercase">Reservasi</p>
               <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-full font-bold">LIVE</span>
            </div>
            <h2 className="text-4xl font-bold text-[#1e293b]">{dynamicStats.reservasiCount}</h2>
            <p className="text-slate-500 text-xs mt-2 font-medium">Pada {new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
            </div>
          </motion.div>

          {/* Card Total Pelanggan */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 group">
            <p className="text-slate-400 text-xs font-bold uppercase mb-4">Total Pelanggan</p>
            <h2 className="text-4xl font-bold text-[#1e293b]">{dynamicStats.totalPelanggan.toLocaleString()}</h2>
            <p className="text-green-500 text-xs mt-2 font-bold">↑ 12% dari bulan lalu</p>
          </motion.div>

          {/* Card Treatment Terpopuler */}
          <motion.div variants={itemVariants} className="bg-[#1e293b] p-6 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-4">Treatment Terpopuler</p>
            <h2 className="text-xl font-serif font-bold leading-tight mb-2">{dynamicStats.treatmentFavorit}</h2>
            <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xs">★★★★★</span>
                <span className="text-slate-400 text-[10px]">Pilihan utama pelanggan</span>
            </div>
            <div className="absolute top-2 right-4 text-2xl opacity-20">✨</div>
          </motion.div>

          {/* Card Produk Terlaris */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-4">Produk Terlaris</p>
            <h2 className="text-xl font-serif font-bold text-[#1e293b] leading-tight mb-2">{dynamicStats.produkTerlaris}</h2>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-4">
                <div className="bg-slate-400 h-1.5 rounded-full w-[85%]"></div>
            </div>
          </motion.div>
        </div>

        {/* Main Content: Chart & Summary */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-800 italic">Kunjungan Pasien</h3>
                <p className="text-slate-400 text-xs font-medium">Laporan trafik pasien per bulan</p>
              </div>
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl outline-none text-slate-600 focus:ring-2 focus:ring-slate-200"
              >
                <option value="2024">Laporan 2024</option>
                <option value="2025">Laporan 2025</option>
                <option value="2026">Laporan 2026</option>
              </select>
            </div>
            
            <div className="h-[380px] w-full">
              <Line data={generateChartData(selectedYear)} options={chartOptions} />
            </div>
          </motion.div>

          {/* Summary & Recommendations */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="font-serif font-bold text-lg text-slate-800 mb-6 border-b border-slate-50 pb-4">Status Operasional</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Slot Tersedia</span>
                    <span className="text-sm font-bold text-slate-700">8 Sesi/Jam</span>
                  </div>
                  <div className="h-10 w-10 rounded-full border-2 border-green-500 flex items-center justify-center text-[10px] font-bold text-green-600">80%</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Staf Aktif</span>
                    <span className="text-sm font-bold text-slate-700">12 Spesialis</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Tingkat Kepuasan</span>
                    <span className="text-sm font-bold text-slate-700">4.9 / 5.0</span>
                  </div>
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>

              <button className="w-full mt-10 bg-slate-50 text-[#1e293b] py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#1e293b] hover:text-white transition-all duration-300 border border-slate-100">
                Ekspor Laporan {selectedYear}
              </button>
            </div>

            {/* Insight Card */}
            <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Insight</p>
                <p className="text-sm leading-relaxed mt-4 italic text-slate-200">
                  "Trend penggunaan <strong>{dynamicStats.treatmentFavorit}</strong> meningkat di akhir pekan. Pertimbangkan untuk menambah stok serum pendukung."
                </p>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;