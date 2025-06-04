import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";


const initialProducts = [
  {
    id: 1,
    name: "Laptop ABC",
    category: "Elektronik",
    stock: 10,
    price: 7500000,
    active: true,
  },
  {
    id: 2,
    name: "Kursi Gaming",
    category: "Furniture",
    stock: 5,
    price: 1250000,
    active: false,
  },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    price: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddProduct = () => {
    if (
      !formData.name ||
      !formData.category ||
      !formData.stock ||
      !formData.price
    ) {
      alert("Semua kolom harus diisi");
      return;
    }

    const newProduct = {
      ...formData,
      id: products.length + 1,
      stock: parseInt(formData.stock),
      price: parseFloat(formData.price),
    };

    setProducts([...products, newProduct]);
    resetForm();
  };

  const handleUpdateProduct = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editId
          ? {
            ...formData,
            id: editId,
            stock: parseInt(formData.stock),
            price: parseFloat(formData.price),
          }
          : product
      )
    );
    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      price: product.price.toString(),
      active: product.active,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", category: "", stock: "", price: "", active: true });
    setEditId(null);
    setShowForm(false);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Produk</h1>

      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          if (!showForm) resetForm();
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Batal" : "Tambah Produk"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded bg-white shadow-sm">
          <div className="mb-2">
            <label className="block mb-1 font-medium">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              placeholder="Masukkan nama produk"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Kategori</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              placeholder="Contoh: Elektronik"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Stok</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              min="0"
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1 font-medium">Harga</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none"
              min="0"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="mr-2"
              />
              Aktif
            </label>
          </div>

          <button
            onClick={editId ? handleUpdateProduct : handleAddProduct}
            className={`px-4 py-2 ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-700"
              } text-white rounded`}
          >
            {editId ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-[2000px] table-fixed">
          <thead className="bg-[#dbeafe] text-[#1e3a8a]">
        <tr>
      <th className="w-[150px] px-4 py-3 text-left">Nama</th>
      <th className="w-[120px] px-4 py-3 text-left">Kategori</th>
      <th className="w-[80px] px-4 py-3 text-right">Stok</th>
      <th className="w-[100px] px-4 py-3 text-right">Harga</th>
      <th className="w-[100px] px-4 py-3 text-center">Status</th>
      <th className="w-[100px] px-4 py-3 text-center">Aksi</th>
    </tr>


          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3 text-right">{product.stock}</td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(product.price)}
                </td>
                <td className="px-4 py-3 text-center">
                  {product.active ? (
                    <span className="inline-block px-2 py-1 text-xs text-green-800 bg-green-100 rounded">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-200 rounded">
                      Nonaktif
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-5">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Hapus"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada produk tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Konfirmasi Hapus</h2>
            <p className="mb-4 text-gray-600">
              Yakin ingin menghapus produk{" "}
              <span className="font-semibold text-red-600">
                {products.find((p) => p.id === deleteId)?.name}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
