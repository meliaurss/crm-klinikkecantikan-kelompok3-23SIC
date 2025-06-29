import React, { useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell, Legend, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";

const FormPrediksi = () => {
  const [formData, setFormData] = useState({
    mudah_berjerawat: "",
    kulit_berminyak: "",
    kulit_kering_mengelupas: "",
    kulit_kemerahan: "",
    sensitif_terhadap_produk: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "https://58b1-34-125-202-176.ngrok-free.app/predict",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error("❌ Error saat memanggil API:", error);
      alert("Terjadi error saat prediksi. Pastikan backend & URL ngrok aktif.");
    } finally {
      setLoading(false);
    }
  };

  const pieData = result?.composition
    ? [
      { name: "Ya", value: Object.values(result.composition).filter((v) => v === 1).length },
      { name: "Tidak", value: Object.values(result.composition).filter((v) => v === 0).length },
    ]
    : [];

  const COLORS = ["#007bff", "#ffc107"];

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-blue-100 via-white to-blue-200 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative z-10"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          ✨ Prediksi Rekomendasi Produk Kulit
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block font-medium text-gray-700 capitalize mb-1">
                {key.replace(/_/g, " ")}
              </label>
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Pilih</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            {loading ? "Memproses..." : "Prediksi Sekarang"}
          </button>
        </form>

        {/* HASIL PREDIKSI */}
        {result && result.status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-xl text-center text-green-600 font-semibold">
              Hasil Prediksi: {result.predicted_label}
            </h3>

            {/* Pie Chart */}
            <div className="mt-4 flex justify-center">
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Confidence Chart */}
            {result.confidence && (
              <div className="mt-8">
                <h4 className="text-center font-semibold text-blue-600 mb-2">
                  📊 Confidence Prediksi
                </h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    layout="vertical"
                    data={Object.entries(result.confidence).map(([label, value]) => ({
                      name: label,
                      confidence: value * 100,
                    }))}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(v) => `${v.toFixed(2)}%`} />
                    <Legend />
                    <Bar
                      dataKey="confidence"
                      fill="#4285F4"
                      label={{
                        position: "right",
                        formatter: (value) => `${value.toFixed(2)}%`,
                        fill: "#000",
                        fontSize: 14,
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>  
              </div>
            )}

            <div className="bg-green-100 text-green-700 border border-green-400 rounded-md p-4 mt-4 text-center">
              ✅ Rekomendasi produk untuk kamu adalah <strong>{result.predicted_label}</strong>.
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FormPrediksi;
