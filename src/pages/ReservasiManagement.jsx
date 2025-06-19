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

  const [searchNama, setSearchNama] = useState("");
  const [searchDokter, setSearchDokter] = useState("");

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

  const filteredData = reservasi.filter((item) =>
    item.nama.toLowerCase().includes(searchNama.toLowerCase()) &&
    item.dokter.toLowerCase().includes(searchDokter.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 px-4 py-10">
      <div className="max-w-[95%] mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Manajemen Data Reservasi
        </h1>

        {/* Search Inputs Di Bawah Judul */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari nama pelanggan"
            className="px-4 py-2 border rounded shadow-sm w-full sm:w-80 focus:outline-none focus:ring focus:border-blue-400"
            value={searchNama}
            onChange={(e) => setSearchNama(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cari berdasarkan dokter..."
            className="px-4 py-2 border rounded shadow-sm w-full sm:w-80 focus:outline-none focus:ring focus:border-blue-400"
            value={searchDokter}
            onChange={(e) => setSearchDokter(e.target.value)}
          />
        </div>

        <div className="overflow-auto bg-white shadow-md rounded-xl">
          <table className="min-w-[2000px] table-auto text-sm text-gray-800">
            <thead className="bg-indigo-50 text-indigo-800 text-xs uppercase font-semibold">
              <tr>
                <th className="px-5 py-3">Nama</th>
                <th className="px-5 py-3">Tanggal Lahir</th>
                <th className="px-5 py-3">Jenis Kelamin</th>
                <th className="px-5 py-3">No HP</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Alamat</th>
                <th className="px-5 py-3">Tanggal Reservasi</th>
                <th className="px-5 py-3">Layanan</th>
                <th className="px-5 py-3">Dokter</th>
                <th className="px-5 py-3">Catatan</th>
                <th className="px-5 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {Object.entries(item).map(([key, val]) => {
                      if (key === "id") return null;
                      return (
                        <td key={key} className="px-5 py-3 align-top">
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
                    <td className="px-5 py-3 text-center">
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
                        <div className="flex justify-center gap-4">
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
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-6 text-gray-500">
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
