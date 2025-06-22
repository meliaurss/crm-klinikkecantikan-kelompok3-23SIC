import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from "../../supabase";


const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchApprovedFeedbacks = async () => {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error) {
        setFeedbacks(data);
      } else {
        console.error('Gagal memuat feedback:', error.message);
      }
    };

    fetchApprovedFeedbacks();
  }, []);

  const renderStars = (count = 5) => (
    <div className="flex gap-1 mb-3 justify-center text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 transition-all duration-300 ${
            i < count ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <section id="feedback" className="py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-[#181C68] mb-4"
        >
          Apa Kata Mereka 💬
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
          Inilah testimoni dari para pelanggan Mahacare Clinic yang telah merasakan perubahan nyata.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 place-items-center">
          {feedbacks.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              Belum ada feedback yang ditampilkan.
            </p>
          ) : (
            feedbacks.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="w-full max-w-xs bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.02] transition-all duration-300"
              >
                {renderStars(item.rating || 5)}
                <p className="text-gray-700 mb-4 text-sm leading-relaxed text-center italic">
                  “{item.message}”
                </p>
                <div className="text-sm font-semibold text-indigo-700 text-right">
                  — {item.name}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;