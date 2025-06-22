import { useState, useEffect } from "react";

export default function AdminFAQ() {
    const [faqs, setFaqs] = useState([]);
    const [form, setForm] = useState({ question: "", answer: "" });
    const [editingIndex, setEditingIndex] = useState(null);

    // Load dari localStorage saat halaman pertama kali dibuka
    useEffect(() => {
        const storedFaqs = localStorage.getItem("faqs");
        if (storedFaqs) {
            setFaqs(JSON.parse(storedFaqs));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("faqs", JSON.stringify(faqs));
    }, [faqs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.question.trim() || !form.answer.trim()) return;

        if (editingIndex !== null) {
            const updatedFaqs = [...faqs];
            updatedFaqs[editingIndex] = form;
            setFaqs(updatedFaqs);
            setEditingIndex(null);
        } else {
            setFaqs([...faqs, form]);
        }

        setForm({ question: "", answer: "" });
    };

    const handleEdit = (index) => {
        setForm(faqs[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedFaqs = faqs.filter((_, i) => i !== index);
        setFaqs(updatedFaqs);
        // jika sedang edit, batalkan
        if (editingIndex === index) {
            setForm({ question: "", answer: "" });
            setEditingIndex(null);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Kelola FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="question"
                    value={form.question}
                    onChange={handleChange}
                    placeholder="Pertanyaan"
                    className="w-full border p-2"
                    required
                />
                <textarea
                    name="answer"
                    value={form.answer}
                    onChange={handleChange}
                    placeholder="Jawaban"
                    className="w-full border p-2"
                    required
                />
                <button
                    type="submit"
                    className="bg-[#181C68] text-white px-4 py-2 rounded"
                >
                    {editingIndex !== null ? "Update FAQ" : "Tambah FAQ"}
                </button>
            </form>

            <div className="mt-6 space-y-2">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="p-4 border rounded flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{faq.question}</p>
                            <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
