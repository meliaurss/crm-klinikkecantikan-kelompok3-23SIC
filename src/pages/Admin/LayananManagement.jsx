import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon, EyeIcon, EyeSlashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../supabase.js"; // Assuming supabase.js is in the parent directory

// Helper function to format currency
function formatCurrency(num) {
  if (typeof num !== "number" || isNaN(num) || num === null) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
}

// Framer Motion animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20 }
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", damping: 20 } },
  exit: { opacity: 0, scale: 0.9 }
};

export default function LayananManagement() { // Changed from ProdukManagement
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [services, setServices] = useState([]); // State for services, initialized as empty

  // Fetch services on component mount (similar to how products would be fetched)
  // You'll likely want to call this from a parent component or useEffect
  // For demonstration, let's include a useEffect for fetching
  React.useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("layanan") // Changed table name to 'layanan'
          .select("*");

        if (fetchError) throw fetchError;
        
        // Map data to match expected shape if needed (e.g., 'nama' to 'name')
        setServices(data.map(item => ({
          id: item.id,
          name: item.nama,        // Renamed 'nama' to 'name'
          image: item.gambar,      // Renamed 'gambar' to 'image'
          price: item.harga,       // Renamed 'harga' to 'price'
          description: item.keterangan, // Renamed 'keterangan' to 'description'
          show_on_landing: item.show_on_landing,
        })));
        setError(null);
      } catch (err) {
        setError("Gagal memuat layanan: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Empty dependency array means this runs once on mount

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

  const handleAddService = async () => { // Changed from handleAddProduct
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      setError("Semua kolom harus diisi dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: insertError } = await supabase
        .from("layanan") // Changed table name to 'layanan'
        .insert([{
          nama: name,
          gambar: image,
          harga: priceAsNumber,
          keterangan: description,
          show_on_landing: showOnLanding,
        }])
        .select();

      if (insertError) throw insertError;

      const newService = { // Changed to newService
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      
      setServices((prev) => [...prev, newService]); // Changed setProducts to setServices
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError("Gagal menambahkan layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => { // Changed handleEdit to accept service
    setFormData({
      name: service.name,
      image: service.image,
      price: service.price.toString(),
      description: service.description,
      showOnLanding: service.show_on_landing || false,
    });
    setEditId(service.id);
    setShowForm(true);
  };

  const handleUpdateService = async () => { // Changed from handleUpdateProduct
    const { name, image, price, description, showOnLanding } = formData;
    const priceAsNumber = parseFloat(price);
    
    if (!name || !image || !price || !description || isNaN(priceAsNumber)) {
      setError("Isi semua data dengan benar.");
      return;
    }

    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from("layanan") // Changed table name to 'layanan'
        .update({
          nama: name,
          gambar: image,
          harga: priceAsNumber,
          keterangan: description,
          show_on_landing: showOnLanding,
        })
        .eq("id", editId)
        .select();

      if (updateError) throw updateError;

      const updatedService = { // Changed to updatedService
        id: data[0].id,
        name: data[0].nama,
        image: data[0].gambar,
        price: data[0].harga,
        description: data[0].keterangan,
        show_on_landing: data[0].show_on_landing,
      };
      
      setServices((prev) => prev.map((s) => (s.id === editId ? updatedService : s))); // Changed setProducts to setServices
      setShowForm(false);
      resetForm();
      setError(null);
    } catch (err) {
      setError("Gagal memperbarui layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from("layanan") // Changed table name to 'layanan'
        .delete()
        .eq("id", deleteId);

      if (deleteError) throw deleteError;

      setServices((prev) => prev.filter((s) => s.id !== deleteId)); // Changed setProducts to setServices
      setDeleteId(null);
      setError(null);
    } catch (err) {
      setError("Gagal menghapus layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLandingVisibility = async (id, newStatus) => {
    setLoading(true);
    try {
      const { data, error: updateError } = await supabase
        .from("layanan") // Changed table name to 'layanan'
        .update({ show_on_landing: newStatus })
        .eq("id", id)
        .select();

      if (updateError) throw updateError;

      const updated = data[0];
      setServices((prev) => // Changed setProducts to setServices
        prev.map((s) =>
          s.id === id ? { ...s, show_on_landing: updated.show_on_landing } : s
        )
      );
      setError(null);
    } catch (err) {
      setError("Gagal mengubah visibilitas layanan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) => // Changed filteredProducts to filteredServices
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-gray-800"
          >
            Manajemen Layanan {/* Changed title to Manajemen Layanan */}
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:w-64">
              <input
                type="text"
                placeholder="Cari layanan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border-0 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/90 transition-all text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleForm}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              {showForm ? (
                <>
                  <XMarkIcon className="w-5 h-5" />
                  <span>Batal</span>
                </>
              ) : (
                <>
                  <PlusIcon className="w-5 h-5" />
                  <span>Tambah Layanan</span> {/* Changed button text */}
                </>
              )}
            </motion.button>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        {loading && !showForm && !deleteId && (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mb-8 p-6 rounded-2xl bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editId ? "Edit Layanan" : "Tambah Layanan Baru"} {/* Changed form title */}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { label: "Nama Layanan", name: "name", type: "text", required: true }, // Changed label
                  { label: "URL Gambar", name: "image", type: "text", required: true },
                  { label: "Harga", name: "price", type: "number", min: 0, required: true },
                  { label: "Keterangan", name: "description", type: "text", required: true },
                ].map(({ label, name, type, min, required }) => (
                  <div className="mb-2" key={name}>
                    <label className="block mb-1 font-medium text-sm text-gray-700">
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type={type}
                      name={name}
                      min={min}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white/80 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm transition-all"
                      required={required}
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-4 mb-6">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="showOnLanding"
                    checked={formData.showOnLanding}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium">Tampilkan di Landing Page</span>
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleForm}
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Batal
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={editId ? handleUpdateService : handleAddService} 
                  disabled={loading}
                  className={`px-5 py-2.5 text-white rounded-lg transition-all flex items-center gap-2 ${
                    editId
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <ArrowPathIcon className="w-4 h-4 animate-spin" />
                      Memproses...
                    </>
                  ) : editId ? (
                    "Update Layanan" // Changed button text
                  ) : (
                    "Simpan Layanan" // Changed button text
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !showForm && (
          <motion.div 
            variants={popIn}
            initial="hidden"
            animate="visible"
            className="overflow-hidden rounded-2xl shadow-xl bg-white/30 backdrop-blur-lg border border-white/40"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-medium">Layanan</th> {/* Changed header text */}
                    <th className="px-4 py-4 text-left font-medium">Gambar</th>
                    <th className="px-4 py-4 text-right font-medium">Harga</th>
                    <th className="px-4 py-4 text-center font-medium">Desrkripsi</th>
                    <th className="px-4 py-4 text-center font-medium">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredServices.length > 0 ? ( // Changed filteredProducts to filteredServices
                    filteredServices.map((service) => ( // Changed product to service
                      <motion.tr
                        key={service.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-white/20"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{service.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                        </td>
                        <td className="px-4 py-4">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 mx-auto overflow-hidden rounded-lg bg-white/50 border border-white/30"
                          >
                            <img 
                              src={service.image} // Changed product.image to service.image
                              alt={service.name} // Changed product.name to service.name
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/100?text=No+Image";
                              }}
                            />
                          </motion.div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right font-medium text-gray-800">
                          {formatCurrency(service.price)} {/* Changed product.price to service.price */}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleLandingVisibility(service.id, !service.show_on_landing)} // Changed product to service
                            disabled={loading}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              service.show_on_landing // Changed product.show_on_landing to service.show_on_landing
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {service.show_on_landing ? ( // Changed product.show_on_landing to service.show_on_landing
                              <>
                                <EyeIcon className="w-3 h-3 mr-1" />
                                Ditampilkan
                              </>
                            ) : (
                              <>
                                <EyeSlashIcon className="w-3 h-3 mr-1" />
                                Disembunyikan
                              </>
                            )}
                          </motion.button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(service)} // Changed handleEdit(product) to handleEdit(service)
                              className="p-1.5 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-100 transition-all"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => setDeleteId(service.id)} // Changed setDeleteId(product.id) to setDeleteId(service.id)
                              className="p-1.5 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100 transition-all"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        Tidak ada layanan ditemukan. {/* Changed message */}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {deleteId !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                variants={popIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-6 rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Konfirmasi Hapus
                  </h2>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <p className="mb-6 text-gray-600">
                  Anda akan menghapus layanan{" "} {/* Changed text */}
                  <span className="font-semibold text-red-600">
                    {services.find((s) => s.id === deleteId)?.name} {/* Changed products to services */}
                  </span>
                  . Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Batal
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={confirmDelete}
                    disabled={loading}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <ArrowPathIcon className="w-4 h-4 animate-spin" />
                        Menghapus...
                      </>
                    ) : (
                      "Hapus"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
