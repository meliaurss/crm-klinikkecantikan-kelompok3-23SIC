import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function FeedbackSection() {
  const dummyFeedbacks = [
    { id: 'dummy-1', name: "Amanda Syifa", message: "Pelayanannya sangat luar biasa! Kulitku terasa jauh lebih sehat dan bersinar setelah melakukan treatment di sini. Dokter sangat ramah dan informatif.", treatment: "Facial Acne Treatment", doctor_rating: 5 },
    { id: 'dummy-2', name: "Clarissa Putri", message: "Klinik langgananku. Suasananya sangat mewah dan menenangkan. Hasil treatment-nya sangat natural, benar-benar memuaskan!", treatment: "Botox Injection", doctor_rating: 5 },
    { id: 'dummy-3', name: "Siti Nurhaliza", message: "Konsultasi kulitnya sangat detail. Skincare yang direkomendasikan sangat cocok untuk tipe kulit sensitifku. Terima kasih The Rose Clinic!", treatment: "Skin Consultation", doctor_rating: 4 },
    { id: 'dummy-4', name: "Nadine C.", message: "Tempatnya bersih, wangi, dan pelayanannya sekelas hotel bintang lima. Sangat direkomendasikan untuk me-time dan memanjakan diri.", treatment: "Glowing Peeling", doctor_rating: 5 },
  ];

  const [feedbacks, setFeedbacks] = useState(dummyFeedbacks);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) setFeedbacks(data);
    };
    load();
  }, []);

  const renderStars = (n) =>
    Array.from({ length: 5 }).map((_, i) => (
      <span key={i} style={{ color: i < n ? '#293A52' : '#CCD4E1', fontSize: 12 }}>★</span>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .feedback-section {
          background-color: #f4f6f8;
          font-family: 'DM Sans', sans-serif;
        }

        .feedback-title {
          font-family: 'Playfair Display', serif;
          color: #020202;
          font-weight: 500;
          letter-spacing: -0.4px;
        }

        .feedback-title .accent-italic {
          font-style: italic;
          color: #293A52;
        }

        .feedback-card {
          background: #FCFCFC;
          border-radius: 3px;
          border: 1px solid #CCD4E1;
          padding: 32px 28px;
          transition: all 0.35s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feedback-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(41, 58, 82, 0.09);
          border-color: #a8b5c7;
        }

        /* Large quote mark */
        .quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 72px;
          color: #e3e8f0;
          position: absolute;
          top: 6px;
          right: 20px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .feedback-name {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 500;
          color: #293A52;
        }

        .feedback-message {
          font-size: 14px;
          color: #5a6a7e;
          line-height: 1.75;
          font-weight: 300;
          font-style: italic;
          flex: 1;
        }

        .feedback-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border-top: 1px solid #e3e8f0;
          padding-top: 14px;
          margin-top: auto;
          flex-wrap: wrap;
        }

        .feedback-treatment {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #a8b5c7;
          font-weight: 400;
        }

        .feedback-stars {
          display: flex;
          gap: 2px;
        }
      `}</style>

      <section className="feedback-section py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl feedback-title">
              Apa Kata <span className="accent-italic">Mereka?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="feedback-card">
                <span className="quote-mark">"</span>
                <div className="feedback-name">{fb.name}</div>
                <p className="feedback-message">"{fb.message}"</p>
                <div className="feedback-meta">
                  <span className="feedback-treatment">{fb.treatment}</span>
                  <div className="feedback-stars">{renderStars(fb.doctor_rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}