// src/pages/DetailProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "../../supabase.js";
import { HeartIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

function formatCurrency(num) {
    if (typeof num !== 'number' || isNaN(num) || num === null) {
        return "Rp 0,00";
    }
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
}

const DetailProduct = () => {
    const { productId } = useParams(); // Ini akan mengambil ID dari URL, misal '123' dari /product/123
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            // Query Supabase menggunakan productId yang diambil dari URL
            const { data, error: fetchError } = await supabase
                .from('produk')
                .select('*')
                .eq('id', productId)
                .single();

            if (fetchError) {
                console.error("Error fetching product:", fetchError);
                setError("Gagal memuat detail produk: " + fetchError.message);
                setProduct(null);
            } else if (data) {
                setProduct({
                    id: data.id,
                    name: data.nama,
                    image: data.gambar,
                    price: data.harga,
                    description: data.keterangan,
                    show_on_landing: data.show_on_landing,
                });
            } else {
                setError("Produk tidak ditemukan.");
                setProduct(null);
            }
            setLoading(false);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]); // Efek ini akan berjalan lagi jika productId berubah

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            console.log(`Menambahkan ${quantity} unit ${product.name} ke keranjang.`);
            alert(`Berhasil menambahkan ${quantity} unit ${product.name} ke keranjang!`);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-gray-700">Memuat detail produk...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-red-600">Error: {error}</p>
                <Link to="/products" className="ml-4 text-blue-600 hover:underline">Kembali ke Semua Produk</Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
                <p className="text-xl text-gray-700">Produk tidak ditemukan.</p>
                <Link to="/products" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Kembali ke Semua Produk</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 bg-gray">
            <nav className="text-gray-600 text-sm mb-6">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">→</span>
                <Link to="/products" className="hover:underline">Produk</Link>
                <span className="mx-2">→</span>
                <span className="font-semibold text-gray-800">{product.name}</span>
            </nav>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                <div className="md:w-1/2 flex justify-center items-center  p-6 rounded-lg shadow-md">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-w-full max-h-[500px] object-contain rounded-lg"
                    />
                </div>

                <div className="md:w-1/2 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
                        <button
                            className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
                            title="Tambahkan ke Wishlist"
                        >
                            <HeartIcon className="h-7 w-7 text-gray-500 hover:text-red-500" />
                        </button>
                    </div>

                    <p className="text-3xl font-semibold text-gray-800 mb-6">
                        {formatCurrency(product.price)}
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="mb-8">
                        <p className="text-gray-700 text-lg font-medium mb-2">Quantity</p>
                        <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                            <button
                                onClick={() => handleQuantityChange('decrease')}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg focus:outline-none"
                            >
                                <MinusIcon className="h-5 w-5" />
                            </button>
                            <span className="px-4 py-2 text-lg font-semibold text-gray-800">
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange('increase')}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg focus:outline-none"
                            >
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <button
                    onClick={handleAddToCart}
                    className="w-full md:w-3/4 lg:w-1/2 px-6 py-3 bg-[#181C68] text-white font-semibold rounded-lg
                                transition duration-300 // Transisi warna yang halus
                                hover:bg-[#5055a8] // Warna hover yang lebih muda dari #181C68
                                shadow-md"
                    >
                    ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;