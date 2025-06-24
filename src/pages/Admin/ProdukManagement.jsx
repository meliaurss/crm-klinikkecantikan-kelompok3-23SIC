import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../supabase.js";

function formatCurrency(num) {
  if (typeof num !== "number" || isNaN(num) || num === null) {
    return "Rp 0,00";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export default function ProdukManagement({ products, setProducts }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    showOnLanding: false,
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
      image: "",
      price: "",
      description: "",
      showOnLanding: false,
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

  const handleAddProduct = async () => {
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      alert("Semua kolom harus diisi dengan benar.");
      return;
    }

    setLoading(true);
    const { data, error: insertError } = await supabase
      .from("produk")
      .insert([
        {
          nama: name,
          gambar: image,
          harga: priceAsNumber,
          keterangan: description,
          show_on_landing: showOnLanding,
        },
      ])
      .select();

    if (insertError) {
      setError("Gagal menambahkan produk: " + insertError.message);
    } else {
      const newProduct = {
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      setProducts((prev) => [...prev, newProduct]);
      setShowForm(false);
      resetForm();
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      image: product.image,
      price: product.price.toString(),
      description: product.description,
      showOnLanding: product.show_on_landing || false,
    });
    setEditId(product.id);
    setShowForm(true);
  };

  const handleUpdateProduct = async () => {
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      alert("Isi semua data dengan benar.");
      return;
    }

    setLoading(true);
    const { data, error: updateError } = await supabase
      .from("produk")
      .update({
        nama: name,
        gambar: image,
        harga: priceAsNumber,
        keterangan: description,
        show_on_landing: showOnLanding,
      })
      .eq("id", editId)
      .select();

    if (updateError) {
      setError("Gagal memperbarui produk: " + updateError.message);
    } else {
      const updatedProduct = {
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? updatedProduct : p))
      );
      setShowForm(false);
      resetForm();
    }
    setLoading(false);
  };

  const confirmDelete = async () => {
    setLoading(true);
    const { error: deleteError } = await supabase
      .from("produk")
      .delete()
      .eq("id", deleteId);

    if (deleteError) {
      setError("Gagal menghapus produk: " + deleteError.message);
    } else {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      setDeleteId(null);
    }
    setLoading(false);
  };

  const toggleLandingVisibility = async (id, newStatus) => {
    setLoading(true);
    const { data, error: updateError } = await supabase
      .from("produk")
      .update({ show_on_landing: newStatus })
      .eq("id", id)
      .select();

    if (updateError) {
      setError("Gagal mengubah visibilitas: " + updateError.message);
    } else {
      const updated = data[0];
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, show_on_landing: updated.show_on_landing } : p
        )
      );
    }
    setLoading(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Manajemen Produk
      </h1>

      {loading && <p className="text-blue-600 mb-4">Memproses...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Cari produk..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-72"
        />
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-indigo-600 text-white rounded"
        >
          {showForm ? "Batal" : "Tambah Produk"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded bg-white shadow">
          <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="URL Gambar"
            value={formData.image}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={formData.price}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Keterangan"
            value={formData.description}
            onChange={handleChange}
            className="w-full mb-2 px-3 py-2 border rounded"
          />
          <label className="inline-flex items-center mb-3">
            <input
              type="checkbox"
              name="showOnLanding"
              checked={formData.showOnLanding}
              onChange={handleChange}
              className="mr-2"
            />
            Tampilkan di Landing Page
          </label>
          <br />
          <button
            onClick={editId ? handleUpdateProduct : handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={loading}
          >
            {editId ? "Update Produk" : "Simpan Produk"}
          </button>
        </div>
      )}

      <div className="overflow-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Gambar</th>
              <th className="px-4 py-2">Harga</th>
              <th className="px-4 py-2">Keterangan</th>
              <th className="px-4 py-2">Visibilitas</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">
                  <img src={product.image} alt="" className="w-16 h-16 mx-auto" />
                </td>
                <td className="px-4 py-2">{formatCurrency(product.price)}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() =>
                      toggleLandingVisibility(product.id, !product.show_on_landing)
                    }
                    className={`text-xs px-2 py-1 rounded ${
                      product.show_on_landing
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {product.show_on_landing ? "Ditampilkan" : "Disembunyikan"}
                  </button>
                </td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button onClick={() => handleEdit(product)}>
                    <PencilIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button onClick={() => setDeleteId(product.id)}>
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full text-center">
            <p className="mb-4">
              Hapus produk{" "}
              <strong>{products.find((p) => p.id === deleteId)?.name}</strong>?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                {loading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
