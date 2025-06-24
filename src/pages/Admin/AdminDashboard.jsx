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
  Filler,
} from 'chart.js';

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
    { label: "Pendapatan Hari Ini", value: `Rp${stats.pendapatan.toLocaleString("id-ID")}`, icon: "💰", bgColor: "border-[#181C68]" },
    { label: "Pembelian Produk Hari Ini", value: stats.pembelianProduk, icon: "🛒", bgColor: "border-[#181C68]" },
  ];

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan Produk",
        data: [12, 19, 14, 17, 22, 30, 28, 26, 32, 35, 40, 45],
        backgroundColor: "rgba(24, 28, 104, 0.7)",
        borderRadius: 6,
        hoverBackgroundColor: "rgba(24, 28, 104, 0.9)",
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#181C68",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 10,
      },
    },
    animation: {
      duration: 1200,
      easing: 'easeOutQuart',
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          color: "#555",
          font: { size: 12 },
        },
        grid: {
          drawBorder: false,
          color: "#eee",
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  const lineData = {
    labels: barData.labels,
    datasets: [
      {
        label: "Jumlah Pelanggan",
        data: [50, 75, 120, 180, 220, 260, 300, 350, 400, 430, 460, 500],
        borderColor: "#181C68",
        backgroundColor: "rgba(24, 28, 104, 0.15)",
        pointBackgroundColor: "#181C68",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#181C68",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 6,
        padding: 10,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic',
    },
    scales: {
      y: {
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
        grid: {
          drawBorder: false,
          color: "#eee",
        },
      },
      x: {
        ticks: {
          color: "#555",
          font: { size: 12 },
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#181C68]">Dashboard Klinik MAHACARE</h1>
        <p className="text-gray-600 text-sm mt-1">Pantau statistik dan kinerja klinik Anda secara real-time.</p>
      </div>

      {/* Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon, bgColor }) => (
          <div
            key={label}
            className={`rounded-xl shadow-md p-5 flex items-center justify-between bg-white border-l-8 ${bgColor} hover:scale-[1.03] transform transition duration-300 ease-in-out`}
          >
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl bg-[#181C68] shadow-md">
              {icon}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-[#181C68] mb-4">Grafik Penjualan Produk</h3>
          <Bar data={barData} options={barOptions} />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-[#181C68] mb-4">Perkembangan Jumlah Pelanggan</h3>
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
