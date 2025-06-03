import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";

const SalesManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Baru",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    show: false,
    customerId: null,
    customerName: "",
  });

  // 🚀 Load data dari localStorage saat pertama kali render
  useEffect(() => {
    const stored = localStorage.getItem("customers");
    if (stored) {
      setCustomers(JSON.parse(stored));
    }
  }, []);

  // 💾 Simpan data ke localStorage setiap kali `customers` berubah
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrUpdateCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isEditMode) {
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === editCustomerId ? { ...cust, ...formData } : cust
        )
      );
      setIsEditMode(false);
      setEditCustomerId(null);
    } else {
      const newCustomer = {
        id: Date.now(),
        ...formData,
      };
      setCustomers((prev) => [...prev, newCustomer]);
    }

    setFormData({ name: "", email: "", phone: "", status: "Baru" });
    setShowForm(false);
  };

  const handleEditCustomer = (cust) => {
    setFormData({
      name: cust.name,
      email: cust.email,
      phone: cust.phone,
      status: cust.status,
    });
    setEditCustomerId(cust.id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const confirmDeleteCustomer = (id, name) => {
    setConfirmDelete({ show: true, customerId: id, customerName: name });
  };

  const handleDeleteConfirmed = () => {
    setCustomers((prev) =>
      prev.filter((cust) => cust.id !== confirmDelete.customerId)
    );
    setConfirmDelete({ show: false, customerId: null, customerName: "" });
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Manajemen Data Pelanggan
      </h1>

      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setFormData({ name: "", email: "", phone: "", status: "Baru" });
            setIsEditMode(false);
          }}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Tambah Pelanggan
        </button>
      )}

      {showForm && (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg shadow bg-white">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block font-medium mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama pelanggan"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email pelanggan"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Telepon</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Nomor telepon"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Baru">Baru</option>
                <option value="Member">Member</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => {
                setShowForm(false);
                setIsEditMode(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Batal
            </button>
            <button
              onClick={handleAddOrUpdateCustomer}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {isEditMode ? "Perbarui" : "Simpan"}
            </button>
          </div>
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
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Belum ada data pelanggan.
                </td>
              </tr>
            ) : (
              customers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{cust.name}</td>
                  <td className="px-6 py-4">{cust.email}</td>
                  <td className="px-6 py-4">{cust.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        cust.status === "Member"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {cust.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => handleEditCustomer(cust)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() =>
                          confirmDeleteCustomer(cust.id, cust.name)
                        }
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Hapus Pelanggan
            </h2>
            <p className="text-gray-600 mb-4">
              Apakah kamu yakin ingin menghapus{" "}
              <span className="font-semibold text-red-600">
                {confirmDelete.customerName}
              </span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-700 transition"
              >
                Hapus
              </button>
              <button
                onClick={() =>
                  setConfirmDelete({ show: false, customerId: null })
                }
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesManagement;
