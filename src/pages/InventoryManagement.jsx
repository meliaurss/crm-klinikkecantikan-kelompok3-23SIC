import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const initialProducts = [
  {
    id: 1,
    name: "Laptop ABC",
    category: "Elektronik",
    stock: 10,
    totalTerjual: 3,
    price: 7500000,
    active: true,
    tanggalMasuk: "2024-06-01",
    tanggalUpdate: "2024-06-10",
  },
  {
    id: 2,
    name: "Kursi Gaming",
    category: "Furniture",
    stock: 5,
    totalTerjual: 2,
    price: 1250000,
    active: false,
    tanggalMasuk: "2024-06-05",
    tanggalUpdate: "2024-06-11",
  },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

export default function InventoryManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    totalTerjual: "",
    price: "",
    tanggalMasuk: "",
    tanggalUpdate: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      stock: "",
      totalTerjual: "",
      price: "",
      tanggalMasuk: "",
      tanggalUpdate: "",
      active: true,
    });
    setEditId(null);
  };

  const toggleForm = () => {
    if (!showForm) {
      resetForm();
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const handleAddProduct = () => {
    const {
      name,
      category,
      stock,
      totalTerjual,
      price,
      tanggalMasuk,
      tanggalUpdate,
    } = formData;

    if (
      !name ||
      !category ||
      !stock ||
      !totalTerjual ||
      !price ||
      !tanggalMasuk ||
      !tanggalUpdate
    ) {
      alert("Semua kolom harus diisi");
      return;
    }

    const newProduct = {
      ...formData,
      id: products.length + 1,
      stock: parseInt(stock),
      totalTerjual: parseInt(totalTerjual),
      price: parseFloat(price),
    };

    setProducts([...products, newProduct]);
    setShowForm(false);
    resetForm();
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock.toString(),
      totalTerjual: product.totalTerjual.toString(),
      price: product.price.toString(),
      tanggalMasuk: product.tanggalMasuk,
      tanggalUpdate: product.tanggalUpdate,
      active: product.active,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const handleUpdateProduct = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editId
          ? {
              ...formData,
              id: editId,
              stock: parseInt(formData.stock),
              totalTerjual: parseInt(formData.totalTerjual),
              price: parseFloat(formData.price),
            }
          : product
      )
    );
    setShowForm(false);
    resetForm();
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Manajemen Inventaris</h1>

      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="text"
          placeholder="Cari nama produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded shadow-sm w-full sm:w-80 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {showForm ? "Batal" : "Tambah Produk"}
        </button>
      </div>

      {showForm && (
        <div className="mb-15 p-4 border border-gray-300 rounded bg-white shadow-sm max-w-6xl">
          {[...[
            { label: "Nama Produk", name: "name", type: "text" },
            { label: "Kategori", name: "category", type: "text" },
            { label: "Tanggal Masuk", name: "tanggalMasuk", type: "date" },
            { label: "Stok", name: "stock", type: "number" },
            { label: "Total Terjual", name: "totalTerjual", type: "number" },
            { label: "Harga", name: "price", type: "number" },
            { label: "Tanggal Update", name: "tanggalUpdate", type: "date" },
          ]].map(({ label, name, type }) => (
            <div className="mb-2" key={name}>
              <label className="block mb-1 font-medium text-sm text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:ring-indigo-400 focus:outline-none text-sm"
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="inline-flex items-center text-sm text-gray-700">
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
            className={`px-4 py-2 text-sm ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white rounded`}
          >
            {editId ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      {/* Tabel yang disesuaikan seperti reservasi.jsx */}
      <div className="overflow-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-indigo-50 text-indigo-800 text-xs uppercase font-semibold">
            <tr>
              <th className="px-4 py-3 text-center">Nama</th>
              <th className="px-4 py-3 text-center">Kategori</th>
              <th className="px-6 py-3 text-center">Tanggal Masuk</th>
              <th className="px-4 py-3 text-center">Stok</th>
              <th className="px-4 py-3 text-center">Total Terjual</th>
              <th className="px-4 py-3 text-center">Harga</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Tanggal Update</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{product.name}</td>
                  <td className="px-4 py-2 text-center">{product.category}</td>
                  <td className="px-6 py-2 text-center">{product.tanggalMasuk}</td>
                  <td className="px-4 py-2 text-center">{product.stock}</td>
                  <td className="px-4 py-2 text-center">{product.totalTerjual}</td>
                  <td className="px-4 py-2 text-center">{formatCurrency(product.price)}</td>
                  <td className="px-4 py-2 text-center">
                    {product.active ? (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                        Nonaktif
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-2 text-center">{product.tanggalUpdate}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-4 py-6 text-center text-gray-500">
                  Tidak ada produk ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Konfirmasi Hapus
            </h2>
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
