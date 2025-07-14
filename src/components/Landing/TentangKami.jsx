// src/pages/TentangKami.jsx
import React from "react";

const TentangKami = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">Tentang Mahacare</h1>
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        Mahacare adalah klinik kecantikan modern yang menggabungkan teknologi terkini dengan pelayanan profesional dan ramah. Kami berkomitmen untuk memberikan perawatan terbaik bagi kesehatan dan kecantikan kulit Anda. 
        Dengan tim dokter berpengalaman, produk berkualitas tinggi, dan layanan yang terstandarisasi, Mahacare hadir untuk menjawab kebutuhan perawatan kulit Anda dari remaja hingga dewasa.
      </p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Visi</h2>
          <p className="text-gray-700">Menjadi klinik kecantikan terpercaya yang menghadirkan inovasi dan kenyamanan terbaik dalam perawatan kulit di Indonesia.</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold text-indigo-600 mb-2">Misi</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Menghadirkan layanan berkualitas tinggi dengan harga terjangkau.</li>
            <li>Memberikan edukasi kepada pelanggan tentang pentingnya kesehatan kulit.</li>
            <li>Menggunakan teknologi terkini yang aman dan teruji.</li>
            <li>Menumbuhkan kepercayaan diri setiap pelanggan.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TentangKami;
