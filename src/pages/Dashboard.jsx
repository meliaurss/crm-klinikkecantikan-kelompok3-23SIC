import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    reservasi: 0,
    pelangganBaru: 0,
    pendapatan: 0,
    pembelianProduk: 0,
  });

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem("mahacareStats"));
    if (savedStats) {
      setStats(savedStats);
    }
  }, []);

  const cards = [
    { label: "Reservasi Hari Ini", value: stats.reservasi, icon: "📅", bgColor: "border-[#181C68]" },
    { label: "Pelanggan Baru Hari Ini", value: stats.pelangganBaru, icon: "👥", bgColor: "border-[#181C68]" },
    { label: "Pendapatan Hari Ini", value: `$${stats.pendapatan.toLocaleString()}`, icon: "💰", bgColor: "border-[#181C68]" },
    { label: "Pembelian Produk Hari Ini", value: stats.pembelianProduk, icon: "🛒", bgColor: "border-[#181C68]" },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan MAHACARE",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(24, 28, 104, 0.6)",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan MAHACARE",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "#181C68",
        backgroundColor: "rgba(24, 28, 104, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#181C68] drop-shadow-sm">Klinik MAHACARE</h1>
        <p className="text-gray-600 text-sm mt-1">Selamat datang! Pantau aktivitas harian klinik Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon, bgColor }) => (
          <div
            key={label}
            className={`rounded-xl shadow-lg p-5 flex items-center justify-between bg-white border-l-8 ${bgColor} hover:scale-105 transform transition duration-300`}
          >
            <div>
              <p className="text-sm font-semibold text-gray-600">{label}</p>
              <h2 className="text-3xl font-bold text-gray-800">{value}</h2>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl bg-[#181C68] shadow-inner">
              {icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-[#181C68] mb-4">Grafik Penjualan Produk</h3>
          <Bar data={barData} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-[#181C68] mb-4">Perkembangan Jumlah Pelanggan</h3>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
