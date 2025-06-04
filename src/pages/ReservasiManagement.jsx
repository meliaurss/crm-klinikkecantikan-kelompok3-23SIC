import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const initialData = [
  {
    id: 1,
    nama: "Siti Aminah",
    tanggalLahir: "1995-08-12",
    jenisKelamin: "Perempuan",
    nohp: "081234567890",
    email: "siti@example.com",
    alamat: "Jl. Melati No. 10",
    tanggal: "2025-06-05",
    layanan: "Konsultasi Umum",
    dokter: "dr. Rina Kusuma",
    catatan: "Butuh pemeriksaan lanjutan",
  },
  {
    id: 2,
    nama: "Rizal Fadli",
    tanggalLahir: "1990-02-25",
    jenisKelamin: "Laki-laki",
    nohp: "082112223333",
    email: "rizal@example.com",
    alamat: "Jl. Kenanga No. 5",
    tanggal: "2025-06-06",
    layanan: "Periksa Gigi",
    dokter: "drg. Andi Wijaya",
    catatan: "Ada keluhan nyeri gigi belakang",
  },
];

export default function ReservasiManagement() {
  const [reservasi, setReservasi] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    nama: "",
    tanggalLahir: "",
    jenisKelamin: "",
    nohp: "",
    email: "",
    alamat: "",
    tanggal: "",
    layanan: "",
    dokter: "",
    catatan: "",
  });

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData(item);
  };

  const handleSave = () => {
    setReservasi((prev) =>
      prev.map((item) => (item.id === editingId ? { ...item, ...editData } : item))
    );
    setEditingId(null);
    setEditData({
      nama: "",
      tanggalLahir: "",
      jenisKelamin: "",
      nohp: "",
      email: "",
      alamat: "",
      tanggal: "",
      layanan: "",
      dokter: "",
      catatan: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data reservasi ini?")) {
      setReservasi(reservasi.filter((r) => r.id !== id));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Manajemen Data Reservasi
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-[2000px] table-fixed">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="w-[200px] px-4 py-3 text-left">Nama</th>
                <th className="w-[160px] px-4 py-3 text-left">Tanggal Lahir</th>
                <th className="w-[140px] px-4 py-3 text-left">Jenis Kelamin</th>
                <th className="w-[180px] px-4 py-3 text-left">No HP</th>
                <th className="w-[220px] px-4 py-3 text-left">Email</th>
                <th className="w-[250px] px-4 py-3 text-left">Alamat</th>
                <th className="w-[160px] px-4 py-3 text-left">Tanggal Reservasi</th>
                <th className="w-[220px] px-4 py-3 text-left">Layanan</th>
                <th className="w-[200px] px-4 py-3 text-left">Dokter</th>
                <th className="w-[250px] px-4 py-3 text-left">Catatan</th>
                <th className="w-[100px] px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-800">
              {reservasi.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  {Object.entries(item).map(([key, val]) => {
                    if (key === "id") return null;
                    return (
                      <td key={key} className="px-4 py-2">
                        {editingId === item.id ? (
                          key === "jenisKelamin" ? (
                            <select
                              name={key}
                              value={editData[key]}
                              onChange={handleChange}
                              className="border px-2 py-1 rounded w-full"
                            >
                              <option value="">Pilih</option>
                              <option value="Laki-laki">Laki-laki</option>
                              <option value="Perempuan">Perempuan</option>
                            </select>
                          ) : (
                            <input
                              name={key}
                              value={editData[key]}
                              onChange={handleChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          )
                        ) : (
                          val
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 text-center">
                    {editingId === item.id ? (
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
                      <div className="flex justify-center gap-5">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Hapus"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {reservasi.length === 0 && (
                <tr>
                  <td colSpan="11" className="text-center py-4 text-gray-500">
                    Tidak ada data reservasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
