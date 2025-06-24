// src/pages/Admin/CustomerManagement.jsx
import React, { useState, useEffect } from "react";
import { TrashIcon, PencilIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../supabase";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telepon: "",
    status: "",
    membership_tier: "",
    riwayat: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    handleSearch(searchTerm);
  }, [customers, searchTerm]);

  const fetchCustomers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "customer");

    if (!error) {
      setCustomers(data);
    } else {
      console.error("Error fetching customers:", error.message);
    }
    setLoading(false);
  };

  const handleSearch = (term) => {
    const lowerTerm = term.toLowerCase();
    const filtered = customers.filter((c) =>
      c.name.toLowerCase().includes(lowerTerm) ||
      c.status.toLowerCase().includes(lowerTerm) ||
      c.membership_tier.toLowerCase().includes(lowerTerm) ||
      c.email.toLowerCase().includes(lowerTerm) ||
      c.telepon.toLowerCase().includes(lowerTerm)
    );
    setFilteredCustomers(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.telepon || !formData.status || !formData.membership_tier || !formData.riwayat) {
      setErrorMessage("Semua kolom wajib diisi.");
      return;
    }

    let result;
    if (editMode) {
      result = await supabase.from("users").update({ ...formData }).eq("id", editId);
    } else {
      result = await supabase.from("users").insert([{ ...formData, role: "customer" }]);
    }

    const { error } = result;
    if (error) {
      console.error("Error saving customer:", error.message);
      setErrorMessage(error.message);
      return;
    }

    fetchCustomers();
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
    setFormData({ name: "", email: "", telepon: "", status: "", membership_tier: "", riwayat: "" });
  };

  const handleDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    const { error } = await supabase.from("users").delete().eq("id", deleteId);
    if (!error) {
      fetchCustomers();
      setShowDeletePopup(false);
      setDeleteId(null);
      setDeleteName("");
    }
  };

  const handleEdit = (customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      telepon: customer.telepon,
      status: customer.status,
      membership_tier: customer.membership_tier,
      riwayat: customer.riwayat,
    });
    setEditMode(true);
    setEditId(customer.id);
    setShowForm(true);
  };

  const statusBadgeColor = (status) => {
    switch (status) {
      case "Member":
        return "bg-green-100 text-green-800";
      case "Baru":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tierBadgeColor = (tier) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800";
      case "Gold":
        return "bg-yellow-100 text-yellow-800";
      case "Silver":
        return "bg-gray-100 text-gray-800";
      case "Basic":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Pelanggan MAHACARE</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2 md:gap-4">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditMode(false);
            setEditId(null);
            setFormData({ name: "", email: "", telepon: "", status: "", membership_tier: "", riwayat: "" });
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full md:w-auto"
        >
          {showForm ? "Batal" : "Tambah Pelanggan"}
        </button>

        {!showForm && (
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{editMode ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "telepon"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="">Pilih Status</option>
                <option value="Baru">Baru</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Membership</label>
              <select name="membership_tier" value={formData.membership_tier} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="">Pilih Membership</option>
                <option value="Basic">Basic</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Riwayat</label>
              <textarea name="riwayat" value={formData.riwayat} onChange={handleInputChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              {editMode ? "Update" : "Simpan"}
            </button>

            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Memuat data...</div>
      ) : (
        <div className="w-full overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Nama", "Email", "Telepon", "Status", "Tier", "Riwayat", "Aksi"].map((head) => (
                  <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="text-sm">
                  <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.telepon}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${statusBadgeColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${tierBadgeColor(customer.membership_tier)}`}>
                      {customer.membership_tier}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.riwayat}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <button onClick={() => handleEdit(customer)} className="text-indigo-600 hover:text-indigo-900">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(customer.id, customer.name)} className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCustomers.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-4">Data tidak ditemukan.</div>
          )}
        </div>
      )}

      {showDeletePopup && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-6 text-center">
              Yakin ingin menghapus <span className="text-red-600">"{deleteName}"</span>?
            </h3>
            <div className="flex justify-center space-x-4">
              <button onClick={() => setShowDeletePopup(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                Batal
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
