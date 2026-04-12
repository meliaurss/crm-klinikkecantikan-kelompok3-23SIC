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
      alert("Terjadi error saat memproses analisis. Pastikan server terhubung.");
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

  // Menggunakan palet warna elegan: Navy Dark Blue & Soft Muted Blue
  const COLORS = ["#293A52", "#a8b5c7"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="relative min-h-screen bg-[#f4f6f8] flex items-center justify-center py-16 px-4 font-['DM_Sans',sans-serif]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white rounded-sm border border-[#e8ecf1] shadow-sm p-8 md:p-12 max-w-2xl w-full relative z-10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-3">
              Analisis Kondisi Kulit
            </h1>
            <p className="text-[#5a6a7e] text-[15px] font-light">
              Lengkapi informasi di bawah ini untuk mendapatkan rekomendasi perawatan terbaik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block font-medium text-[#293A52] text-[14px] capitalize mb-2">
                  {key.replace(/_/g, " ")}?
                </label>
                <select
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border border-[#CCD4E1] bg-white text-[#293A52] p-3 rounded-sm 
                             focus:outline-none focus:border-[#293A52] focus:ring-1 focus:ring-[#293A52] 
                             transition-colors appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                  <option value="Ya">Ya</option>
                  <option value="Tidak">Tidak</option>
                </select>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-[#FCFCFC] font-medium tracking-wide py-3.5 mt-6 rounded-sm 
                         transition-all duration-300 border 
                         ${loading 
                           ? "bg-[#a8b5c7] border-[#a8b5c7] cursor-not-allowed" 
                           : "bg-[#293A52] border-[#293A52] hover:bg-[#344a66] hover:border-[#344a66]"}`}
            >
              {loading ? "Menganalisis..." : "Prediksi Sekarang"}
            </button>
          </form>

          {/* HASIL PREDIKSI */}
          {result && result.status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-12 pt-10 border-t border-[#e8ecf1]"
            >
              <h3 className="text-2xl text-center text-[#293A52] font-['Playfair_Display',serif] font-semibold mb-8">
                Hasil Analisis Anda
              </h3>

              {/* Box Rekomendasi Utama (Dipindah ke atas agar langsung terbaca) */}
              <div className="bg-[#f4f6f8] border border-[#CCD4E1] rounded-sm p-8 mb-10 text-center shadow-sm">
                <p className="text-[#5a6a7e] text-[14px] uppercase tracking-wider font-medium mb-3">
                  Rekomendasi Perawatan
                </p>
                <p className="text-2xl font-['Playfair_Display',serif] font-semibold text-[#293A52]">
                  {result.predicted_label}
                </p>
              </div>

              {/* Grid untuk Grafik */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Pie Chart */}
                <div className="flex flex-col items-center">
                  <h4 className="text-[14px] font-medium text-[#5a6a7e] mb-2 uppercase tracking-wider">Komposisi Jawaban</h4>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      innerRadius={45} // Membuatnya berbentuk Donut Chart agar lebih modern
                      label={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #CCD4E1', borderRadius: '4px' }}
                      itemStyle={{ color: '#293A52' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px', color: '#5a6a7e' }} />
                  </PieChart>
                </div>

                {/* Confidence Chart */}
                {result.confidence && (
                  <div className="flex flex-col">
                    <h4 className="text-[14px] font-medium text-[#5a6a7e] mb-4 text-center uppercase tracking-wider">
                      Tingkat Akurasi Prediksi
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        layout="vertical"
                        data={Object.entries(result.confidence).map(([label, value]) => ({
                          name: label,
                          confidence: value * 100,
                        }))}
                        margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf1" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} stroke="#a8b5c7" fontSize={12} />
                        <YAxis dataKey="name" type="category" stroke="#a8b5c7" fontSize={12} width={80} />
                        <Tooltip 
                          formatter={(v) => `${v.toFixed(2)}%`}
                          cursor={{ fill: '#f4f6f8' }}
                          contentStyle={{ backgroundColor: '#fff', border: '1px solid #CCD4E1', borderRadius: '4px' }}
                        />
                        <Bar
                          dataKey="confidence"
                          fill="#293A52"
                          radius={[0, 4, 4, 0]}
                          barSize={24}
                          label={{
                            position: "right",
                            formatter: (value) => `${value.toFixed(1)}%`,
                            fill: "#5a6a7e",
                            fontSize: 12,
                            fontWeight: 500
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>  
                  </div>
                )}
              </div>
              
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default FormPrediksi;