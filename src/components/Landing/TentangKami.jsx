// src/pages/TentangKami.jsx
import React from "react";

const TentangKami = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
      `}</style>

      <div className="bg-[#f4f6f8] min-h-screen font-['DM_Sans',sans-serif] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header & Deskripsi */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-4">
              Tentang The Rose Clinic
            </h1>
            <div className="w-12 h-[1px] bg-[#CCD4E1] mx-auto mb-6" />
            <p className="text-[15px] md:text-[16px] text-[#5a6a7e] font-light leading-relaxed max-w-3xl mx-auto text-center">
              The Rose Clinic adalah klinik kecantikan modern yang menggabungkan teknologi terkini dengan pelayanan profesional dan ramah. Kami berkomitmen untuk memberikan perawatan terbaik bagi kesehatan dan kecantikan kulit Anda. 
              Dengan tim dokter berpengalaman, produk berkualitas tinggi, dan layanan yang terstandarisasi, The Rose Clinic hadir untuk menjawab kebutuhan perawatan kulit Anda dari remaja hingga dewasa.
            </p>
          </div>

          {/* Grid Visi & Misi */}
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Kartu Visi */}
            <div className="bg-[#FCFCFC] border border-[#e8ecf1] rounded-sm p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-[#293a52]/10 hover:border-[#a8b5c7] transform hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-3 text-center md:text-left">
                Visi
              </h2>
              <div className="w-8 h-[1px] bg-[#CCD4E1] mb-5 mx-auto md:mx-0" />
              <p className="text-[#5a6a7e] font-light leading-relaxed text-[15px]">
                Menjadi klinik kecantikan terpercaya yang menghadirkan inovasi dan kenyamanan terbaik dalam perawatan kulit di Indonesia.
              </p>
            </div>

            {/* Kartu Misi */}
            <div className="bg-[#FCFCFC] border border-[#e8ecf1] rounded-sm p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-[#293a52]/10 hover:border-[#a8b5c7] transform hover:-translate-y-1 transition-all duration-300">
              <h2 className="text-2xl font-['Playfair_Display',serif] font-semibold text-[#293A52] mb-3 text-center md:text-left">
                Misi
              </h2>
              <div className="w-8 h-[1px] bg-[#CCD4E1] mb-5 mx-auto md:mx-0" />
              <ul className="text-[#5a6a7e] font-light leading-relaxed text-[15px] space-y-3">
                <li className="flex items-start">
                  <span className="text-[#293A52] mr-3 font-bold mt-0.5">•</span>
                  <span>Menghadirkan layanan berkualitas tinggi dengan harga terjangkau.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#293A52] mr-3 font-bold mt-0.5">•</span>
                  <span>Memberikan edukasi kepada pelanggan tentang pentingnya kesehatan kulit.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#293A52] mr-3 font-bold mt-0.5">•</span>
                  <span>Menggunakan teknologi terkini yang aman dan teruji.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#293A52] mr-3 font-bold mt-0.5">•</span>
                  <span>Menumbuhkan kepercayaan diri setiap pelanggan.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default TentangKami;