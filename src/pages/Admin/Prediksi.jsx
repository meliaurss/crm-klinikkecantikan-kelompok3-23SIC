export default function Prediksi(){
    // State hooks for form inputs
    const [umur, setUmur] = useState('');
    const [penghasilan, setPenghasilan] = useState('');

    // State hooks for API response and status
    const [predictionResult, setPredictionResult] = useState(null);
    const [predictionLabel, setPredictionLabel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
// API endpoint URL
    const API_URL = 'http://160.187.144.134:5000/predict';

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Reset previous states
        setPredictionResult(null);
        setPredictionLabel('');
        setError(null);
        setIsLoading(true); // Set loading state to true

        try {
            // Send POST request to the Flask API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Convert form data to JSON string
                body: JSON.stringify({
                    umur: parseInt(umur), // Ensure umur is an integer
                    penghasilan: parseInt(penghasilan), 
                }),
            });
                       // Check if the response was successful
            if (!response.ok) {
              // If not successful, throw an error with the status text
                const errorData = await response.json();
                throw new Error(errorData.error || 'Terjadi kesalahan saat memprediksi.');
            }

// Parse the JSON response
            const data = await response.json();

            // Update prediction states
            setPredictionResult(data.prediksi);
            setPredictionLabel(data.label);

        } catch (err) {
            // Catch and set any errors during the fetch operation
            setError(err.message);
        } finally {
            // Always set loading state to false after the request completes
            setIsLoading(false);
        }
    };
    
    return(
        <div className="min-h-screen bg-[#FFF7E1] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-md w-full text-center border-t-4 border-[#00B9AE]">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#00403C] mb-6">
                    Prediksi Loyalitas Pelanggan
                </h1>
                <p className="text-gray-600 mb-8">
                    Masukkan umur dan penghasilan untuk memprediksi loyalitas pelanggan.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="umur" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Umur:
                        </label>
                        <input
                            type="number"
                            id="umur"
                            value={umur}
                            onChange={(e) => setUmur(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#00B9AE] focus:border-[#00B9AE] sm:text-sm"
                            placeholder="Masukkan umur"
                            min="1"
                        />
                    </div>
                    <div>
                        <label htmlFor="penghasilan" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Penghasilan:
                        </label>
                        <input
                            type="number"
                            id="penghasilan"
                            value={penghasilan}
                            onChange={(e) => setPenghasilan(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#00B9AE] focus:border-[#00B9AE] sm:text-sm"
                            placeholder="Masukkan penghasilan"
                            min="0"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading} // Disable button when loading
                        className="w-full bg-[#00B9AE] hover:bg-[#007369] text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Memuat...' : 'Prediksi Loyalitas'}
                    </button>
                </form>

                {/* Display Prediction Result or Error */}
                <div className="mt-8">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {predictionResult !== null && (
                        <div className={`p-4 rounded-lg shadow-md ${predictionResult === 1 ? 'bg-green-100 text-green-700 border border-green-400' : 'bg-red-100 text-red-700 border border-red-400'}`}>
                            <h3 className="text-xl font-semibold mb-2">Hasil Prediksi:</h3>
                            <p className="text-2xl font-bold">
                                {predictionLabel}
                            </p>
                            <p className="text-sm mt-2">
                                (Nilai Prediksi: {predictionResult})
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )

} 