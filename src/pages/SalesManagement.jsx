import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

const reservationData = [
  {
    id: 1,
    name: "Siti Aminah",
    gender: "Perempuan",
    phone: "081234567890",
    email: "siti@example.com",
    status: "Pelanggan",
  },
  {
    id: 2,
    name: "Dewi Lestari",
    gender: "Perempuan",
    phone: "081987654321",
    email: "dewi@example.com",
    status: "Baru",
  },
  {
    id: 3,
    name: "Rizal Fadli",
    gender: "Laki-laki",
    phone: "082112223333",
    email: "rizal@example.com",
    status: "Pelanggan",
  },
];

const extractUniqueCustomers = (reservations) => {
  const map = new Map();
  reservations.forEach((r) => {
    if (!map.has(r.phone)) {
      map.set(r.phone, { ...r });
    }
  });
  return Array.from(map.values());
};

export default function CustomerManagement() {
  const [customers, setCustomers] = useState(
    extractUniqueCustomers(reservationData)
  );
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    gender: "",
    phone: "",
    email: "",
    status: "",
  });

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setEditData(customer);
  };

  const handleSave = () => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === editingId ? { ...c, ...editData } : c))
    );
    setEditingId(null);
    setEditData({ name: "", gender: "", phone: "", email: "", status: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data pelanggan ini?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Manajemen Data Pelanggan
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">Jenis Kelamin</th>
              <th className="px-6 py-4 text-left">Telepon</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-800">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  {editingId === customer.id ? (
                    <input
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      className="border px-3 py-1 rounded w-full"
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === customer.id ? (
                    <select
                      name="gender"
                      value={editData.gender}
                      onChange={handleChange}
                      className="border px-3 py-1 rounded w-full"
                    >
                      <option value="" disabled>
                        Pilih jenis kelamin
                      </option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  ) : (
                    customer.gender
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === customer.id ? (
                    <input
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      className="border px-3 py-1 rounded w-full"
                    />
                  ) : (
                    customer.phone
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === customer.id ? (
                    <input
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      className="border px-3 py-1 rounded w-full"
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td className="px-6 py-3">
                  {editingId === customer.id ? (
                    <select
                      name="status"
                      value={editData.status}
                      onChange={handleChange}
                      className="border px-3 py-1 rounded w-full"
                    >
                      <option value="" disabled>
                        Pilih status
                      </option>
                      <option value="Pelanggan">Pelanggan</option>
                      <option value="Baru">Baru</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        customer.status === "Pelanggan"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  {editingId === customer.id ? (
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-800"
                        title="Simpan"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-gray-500 hover:text-gray-700"
                        title="Batal"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(customer)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  Tidak ada data pelanggan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
