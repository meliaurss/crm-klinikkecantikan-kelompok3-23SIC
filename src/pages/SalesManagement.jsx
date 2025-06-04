import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const initialCustomers = [
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@mail.com",
    phone: "081234567890",
    status: "Member",
  },
  {
    id: 2,
    name: "Siti Aminah",
    email: "siti@mail.com",
    phone: "089876543210",
    status: "Baru",
  },
  {
    id: 3,
    name: "Andi Wijaya",
    email: "andi@mail.com",
    phone: "081299988877",
    status: "Member",
  },
];

export default function SalesManagement() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", status: "Baru" });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (editId !== null) {
      setCustomers(customers.map((c) => (c.id === editId ? { ...formData, id: editId } : c)));
    } else {
      const newCustomer = { id: customers.length + 1, ...formData };
      setCustomers([...customers, newCustomer]);
    }

    setFormData({ name: "", email: "", phone: "", status: "Baru" });
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditId(customer.id);
    setShowForm(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="p-6 w-full max-w-screen-xl mx-auto relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Data Pelanggan</h1>

      <button
        onClick={() => {
          setShowForm((prev) => !prev);
          setFormData({ name: "", email: "", phone: "", status: "Baru" });
          setEditId(null);
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {showForm ? "Batal" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg shadow bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Nama</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama pelanggan" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email pelanggan" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block font-medium mb-1">Telepon</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nomor telepon" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <div>
              <label className="block font-medium mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="Baru">Baru</option>
                <option value="Member">Member</option>
              </select>
            </div>
          </div>
          <button onClick={handleAddOrEditCustomer} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            {editId !== null ? "Update" : "Simpan"}
          </button>
        </div>
      )}

      <div className="w-full overflow-x-auto mt-6">
        <table className="w-full text-sm text-left text-gray-700 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-indigo-50 text-indigo-800 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Telepon</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{cust.name}</td>
                <td className="px-6 py-4">{cust.email}</td>
                <td className="px-6 py-4">{cust.phone}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${cust.status === "Member" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{cust.status}</span>
                </td>
                <td className="px-6 py-4 text-center space-x-2 flex justify-center">
                  <button onClick={() => handleEdit(cust)} className="text-blue-600 hover:text-blue-800">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button onClick={() => setDeleteId(cust.id)} className="text-red-600 hover:text-red-800">
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">Tidak ada data pelanggan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Hapus */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Konfirmasi Hapus</h2>
            <p className="mb-4 text-gray-600">
              Yakin ingin menghapus pelanggan{" "}
              <span className="font-semibold text-red-600">
                {customers.find((c) => c.id === deleteId)?.name}
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