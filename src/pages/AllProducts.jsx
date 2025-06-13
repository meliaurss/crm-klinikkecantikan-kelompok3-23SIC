import React from "react";
import { Link } from "react-router-dom";
import product from "../assets/product.jpg";
import "./AllProducts.css";

const AllProducts = () => {
  const products = Array(12).fill({
    name: "Kylab Hydra Barrier Skin",
    price: "$120.00",
    rating: 4,
    reviews: 131,
    image: product,
  });

  return (
    <div className="all-products-page min-h-screen bg-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#181C68]">Semua Produk</h1>
          <Link
            to="/"
            className="px-4 py-2 bg-[#181C68] text-white rounded-lg hover:bg-[#141a59] transition"
          >
            Kembali ke Beranda
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-contain mb-4"
              />
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#181C68] font-semibold text-sm">
                    {item.price}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-pink-500 text-xl">
                  ♡
                </button>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="text-yellow-400 mr-1">★★★★☆</span>
                <span>({item.reviews})</span>
              </div>

              <button className="mt-auto bg-gray-100 text-[#181C68] font-semibold py-2 rounded-md hover:bg-[#181C68] hover:text-white transition">
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
