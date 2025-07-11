import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Enhanced Framer Motion animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const floatingVariants = {
  floating: {
    y: [-10, 10],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  },
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    reservasi: 23,
    pelangganBaru: 12,
    pendapatan: 3500000,
    pembelianProduk: 17,
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        reservasi: prev.reservasi + Math.floor(Math.random() * 3),
        pelangganBaru: prev.pelangganBaru + Math.floor(Math.random() * 2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      label: "Reservasi Hari Ini", 
      value: stats.reservasi, 
      icon: "📅",
      gradient: "from-blue-400 to-blue-600",
      change: "+12%"
    },
    { 
      label: "Pelanggan Baru", 
      value: stats.pelangganBaru, 
      icon: "👥",
      gradient: "from-cyan-400 to-blue-500",
      change: "+8%"
    },
    { 
      label: "Pendapatan", 
      value: `Rp${stats.pendapatan.toLocaleString("id-ID")}`, 
      icon: "💰",
      gradient: "from-indigo-400 to-purple-500",
      change: "+15%"
    },
    { 
      label: "Pembelian Produk", 
      value: stats.pembelianProduk, 
      icon: "🛒",
      gradient: "from-teal-400 to-blue-500",
      change: "+5%"
    },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan Produk",
        data: [10, 14, 18, 22, 28, 35, 38, 34, 40, 44, 48, 52],
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
          gradient.addColorStop(1, 'rgba(29, 78, 216, 0.4)');
          return gradient;
        },
        borderRadius: 12,
        barThickness: 25,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(30, 58, 138, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 12,
        padding: 12,
        displayColors: false,
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        ticks: { 
          color: 'rgba(30, 58, 138, 0.7)', 
          beginAtZero: true,
          font: { size: 12 }
        },
        grid: { 
          color: 'rgba(59, 130, 246, 0.1)',
          drawBorder: false
        },
        border: { display: false }
      },
      x: {
        ticks: { 
          color: 'rgba(30, 58, 138, 0.7)',
          font: { size: 12 }
        },
        grid: { display: false },
        border: { display: false }
      },
    },
  };

  const lineData = {
    labels: barData.labels,
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 80, 120, 160, 190, 220, 250, 280, 310, 340, 370, 400],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.01)');
          return gradient;
        },
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const lineOptions = {
    ...barOptions,
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full blur-3xl opacity-10"
          variants={floatingVariants}
          animate="floating"
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full blur-3xl opacity-10"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 1.5 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-200 rounded-full blur-3xl opacity-5"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 0.8 }}
        />
      </div>

      <motion.div
        className="relative z-10 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          className="backdrop-blur-xl bg-white/80 border border-gray-200 rounded-3xl p-6 shadow-lg"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                📊 Dashboard Klinik MAHACARE
              </motion.h1>
              <motion.p 
                className="text-slate-600 mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                Pantau kinerja klinik Anda secara real-time dengan teknologi terdepan
              </motion.p>
            </div>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                ⚡
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              className="group relative backdrop-blur-xl bg-white/90 border border-gray-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-slate-600 text-sm font-medium mb-1">{card.label}</p>
                  <motion.h2 
                    className="text-xl font-bold text-slate-800 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    {card.value}
                  </motion.h2>
                  <div className="flex items-center">
                    <span className="text-green-500 text-sm font-semibold">{card.change}</span>
                    <span className="text-slate-500 text-xs ml-1">vs last month</span>
                  </div>
                </div>
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {card.icon}
                </motion.div>
              </div>
              
              {/* Decorative gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} rounded-b-2xl opacity-60`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          <motion.div
            className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📦 Penjualan Produk
              </h3>
              <motion.div
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="h-64">
              <Bar data={barData} options={barOptions} />
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📈 Perkembangan Pelanggan
              </h3>
              <motion.div
                className="w-3 h-3 bg-blue-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
            <div className="h-64">
              <Line data={lineData} options={lineOptions} />
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Stats Row */}
        <motion.div
          className="backdrop-blur-xl bg-white/90 border border-gray-200 rounded-3xl p-6 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            📊 Ringkasan Performa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <motion.div
                className="text-2xl font-bold text-slate-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
              >
                98.5%
              </motion.div>
              <p className="text-slate-600 text-sm">Tingkat Kepuasan</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-2xl font-bold text-slate-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 }}
              >
                4.8/5
              </motion.div>
              <p className="text-slate-600 text-sm">Rating Pelayanan</p>
            </div>
            <div className="text-center">
              <motion.div
                className="text-2xl font-bold text-slate-800"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 }}
              >
                24/7
              </motion.div>
              <p className="text-slate-600 text-sm">Layanan Aktif</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;