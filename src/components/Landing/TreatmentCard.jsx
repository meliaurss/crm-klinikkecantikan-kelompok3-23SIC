const TreatmentCard = ({ nama, deskripsi, gambar, onReservasi }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200">
    <div className="bg-gray-100 h-48 flex items-center justify-center">
      <img src={gambar} alt={nama} className="w-full h-full object-cover" />
    </div>
    <div className="p-4 text-center">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{nama}</h3>
      <p className="text-sm text-gray-600 mb-4">{deskripsi}</p>
      <hr className="mb-2" />
      <button
        onClick={onReservasi}
        className="text-sm text-blue-600 hover:underline cursor-pointer"
      >
        Reservasi Sekarang →
      </button>
    </div>
  </div>
);
export default TreatmentCard;
