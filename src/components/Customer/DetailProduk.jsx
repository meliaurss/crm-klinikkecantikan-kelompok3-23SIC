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
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            
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
    }, [productId]);

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
            <div className="flex justify-center items-center min-h-screen bg-[#FCFCFC] font-['DM_Sans',sans-serif]">
                <p className="text-xl text-[#5a6a7e] tracking-wide">Memuat detail produk...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#FCFCFC] font-['DM_Sans',sans-serif]">
                <p className="text-xl text-red-500 mb-4">Error: {error}</p>
                <Link to="/products" className="text-[#293A52] hover:text-[#344a66] underline decoration-[#CCD4E1] underline-offset-4 transition-colors">
                    Kembali ke Semua Produk
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-[#FCFCFC] font-['DM_Sans',sans-serif]">
                <p className="text-xl text-[#5a6a7e] mb-4">Produk tidak ditemukan.</p>
                <Link to="/products" className="px-6 py-2 bg-[#293A52] text-[#FCFCFC] rounded-sm hover:bg-[#344a66] transition duration-200 tracking-wide">
                    Kembali ke Semua Produk
                </Link>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
            `}</style>
            
            <div className="min-h-screen bg-[#FCFCFC] font-['DM_Sans',sans-serif]">
                <div className="max-w-[1160px] mx-auto px-6 py-12 md:py-16">
                    
                    {/* Breadcrumbs */}
                    <nav className="text-[#5a6a7e] text-[13px] font-medium tracking-wide mb-10 flex items-center gap-2">
                        <Link to="/" className="hover:text-[#293A52] transition-colors">Beranda</Link>
                        <span className="text-[#a8b5c7]">/</span>
                        <Link to="/products" className="hover:text-[#293A52] transition-colors">Produk</Link>
                        <span className="text-[#a8b5c7]">/</span>
                        <span className="text-[#293A52]">{product.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                        {/* Image Section - Minimalist styling */}
                        <div className="md:w-1/2 flex justify-center items-center bg-[#f4f6f8] border border-[#e8ecf1] p-10 rounded-sm">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="max-w-full max-h-[500px] object-contain drop-shadow-sm mix-blend-multiply"
                            />
                        </div>

                        {/* Detail Section */}
                        <div className="md:w-1/2 flex flex-col justify-center py-4">
                            
                            <div className="flex justify-between items-start mb-2">
                                {/* Title with Playfair Display */}
                                <h1 className="text-3xl md:text-4xl font-['Playfair_Display',serif] font-semibold text-[#293A52] leading-tight">
                                    {product.name}
                                </h1>
                                <button
                                    className="p-2 rounded-full hover:bg-[#e8ecf1] transition duration-200 group"
                                    title="Tambahkan ke Wishlist"
                                >
                                    <HeartIcon className="h-6 w-6 text-[#a8b5c7] group-hover:text-red-400 transition-colors" />
                                </button>
                            </div>

                            {/* Price */}
                            <p className="text-2xl font-medium text-[#293A52] mb-6">
                                {formatCurrency(product.price)}
                            </p>

                            {/* Divider line */}
                            <hr className="border-[#e8ecf1] mb-6" />

                            {/* Description */}
                            <p className="text-[#5a6a7e] text-[15px] leading-relaxed mb-8 font-light">
                                {product.description}
                            </p>

                            {/* Quantity Selector */}
                            <div className="mb-10">
                                <p className="text-[#5a6a7e] text-[13px] uppercase tracking-wider font-medium mb-3">Kuantitas</p>
                                <div className="flex items-center border border-[#CCD4E1] rounded-sm w-fit bg-white">
                                    <button
                                        onClick={() => handleQuantityChange('decrease')}
                                        className="p-3 text-[#5a6a7e] hover:bg-[#f4f6f8] hover:text-[#293A52] transition-colors focus:outline-none"
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center text-[15px] font-medium text-[#293A52]">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => handleQuantityChange('increase')}
                                        className="p-3 text-[#5a6a7e] hover:bg-[#f4f6f8] hover:text-[#293A52] transition-colors focus:outline-none"
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="w-full md:w-3/4 lg:w-[60%] px-8 py-3.5 bg-[#293A52] text-[#FCFCFC] text-[14px] font-medium tracking-wide rounded-sm
                                           border border-[#293A52]
                                           transition-all duration-300 ease-in-out
                                           hover:bg-[#344a66] hover:border-[#344a66] hover:shadow-lg"
                            >
                                Tambahkan ke Keranjang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailProduct;