import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function FeedbackSection() {
  // 1. Siapkan data dummy sesuai struktur Supabase
  const dummyFeedbacks = [
    {
      id: 'dummy-1',
      name: "Amanda Syifa",
      message: "Pelayanannya sangat luar biasa! Kulitku terasa jauh lebih sehat dan bersinar setelah melakukan treatment di sini. Dokter sangat ramah dan informatif.",
      treatment: "Facial Acne Treatment",
      doctor_rating: 5
    },
    {
      id: 'dummy-2',
      name: "Clarissa Putri",
      message: "Klinik langgananku. Suasananya sangat mewah dan menenangkan. Hasil botox-nya sangat natural, benar-benar memuaskan!",
      treatment: "Botox Injection",
      doctor_rating: 5
    },
    {
      id: 'dummy-3',
      name: "Siti Nurhaliza",
      message: "Konsultasi kulitnya sangat detail. Skincare yang direkomendasikan sangat cocok untuk tipe kulit sensitifku. Terima kasih Bahebak Clinic!",
      treatment: "Skin Consultation",
      doctor_rating: 4
    },
    {
      id: 'dummy-4',
      name: "Nadine Chandrawinata",
      message: "Tempatnya bersih, wangi, dan pelayanannya sekelas hotel bintang lima. Sangat direkomendasikan untuk me-time dan memanjakan diri.",
      treatment: "Glowing Peeling",
      doctor_rating: 5
    }
  ];

  // 2. Masukkan data dummy sebagai nilai awal state
  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);

  useEffect(() => {
    const loadFeedback = async () => {
      const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      // 3. Jika Supabase berhasil menarik data DAN datanya tidak kosong, timpa data dummy
      if (!error && data && data.length > 0) {
        setFeedbacks(data);
      }
    };

    loadFeedback();
  }, []);

  return (
    <>
      <style>{`
        /* Menggunakan background putih agar berselang-seling cantik dengan kremnya Promo */
        .feedback-section {
          background-color: #FFFFFF;
          font-family: 'Jost', sans-serif;
        }
        
        .feedback-title {
          font-family: 'Cormorant Garamond', serif;
          color: #2C1A0E;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .feedback-title .accent-italic {
          font-style: italic;
          color: #7B4A2D;
        }

        .feedback-card {
          background: #FAF6F1; /* Kartu warna krem */
          border-radius: 20px;
          border: 1px solid rgba(201, 169, 110, 0.2);
          padding: 28px;
          box-shadow: 0 10px 30px rgba(44, 26, 14, 0.02);
          transition: all 0.4s ease;
          position: relative;
        }

        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(44, 26, 14, 0.06);
          border-color: rgba(201, 169, 110, 0.5);
        }

        /* Ikon kutipan cantik di pojok kanan atas kartu */
        .quote-icon {
          font-size: 60px;
          color: rgba(201, 169, 110, 0.15);
          position: absolute;
          top: 10px;
          right: 20px;
          font-family: 'Cormorant Garamond', serif;
          line-height: 1;
        }

        .feedback-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 700;
          color: #7B4A2D; /* Menggantikan warna indigo */
          margin-bottom: 8px;
        }

        .feedback-message {
          font-size: 15px;
          color: #6B4F3A;
          line-height: 1.6;
          font-weight: 300;
          font-style: italic;
          margin-bottom: 20px;
        }

        .feedback-meta {
          font-size: 12px;
          color: #A0623A;
          background: rgba(201, 169, 110, 0.1);
          padding: 8px 14px;
          border-radius: 8px;
          display: inline-block;
          font-weight: 500;
        }
      `}</style>

      {/* STRUKTUR TAG ASLI (Tetap dipertahankan agar tidak error) */}
      <section className="feedback-section py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-12 feedback-title">
            Apa Kata <span className="accent-italic">Mereka?</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="feedback-card">
                <span className="quote-icon">"</span>
                <p className="feedback-name">{fb.name}</p>
                <p className="feedback-message">"{fb.message}"</p>
                <p className="feedback-meta">
                  Treatment: {fb.treatment} &nbsp;|&nbsp; ⭐ Dokter: {fb.doctor_rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}